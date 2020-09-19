
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const redis = require('redis');

const httpsrv = express();
httpsrv.use(cors());
httpsrv.use(bodyParser.json());

var pgStatus, redisStatus, httpsrvStatus;

const { Pool } = require('pg');
const pgPool = new Pool({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
  idleTimeoutMillis: 2000,
  connectionTimeoutMillis: 5000
});

pgPool.on('error', (error, client) => {
  console.error('ERROR:PG', error);
  pgStatus = error;
});

console.log('Connecting to database at host: ' + pgPool.options.host + ', with options: ' + JSON.stringify(pgPool.options) + '.');
pgPool.connect()
  .then(res => {
    pgPool.query('CREATE TABLE IF NOT EXISTS values (number INT)')
      .then(res => {
        console.log('Table values created');
      })
      .catch((error) => {
        console.error('ERROR:PG:creating table values.');
        pgStatus = error;
      });
  })
  .catch(err => {
    console.error('ERROR:PG:connecting at host: ' + pgPool.options.host + '.');
    console.error(err);
    pgStatus = err;
  });

const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  retry_strategy: function(options) {
    return 1000;
  }
});
const redisPublisher = redisClient.duplicate();

httpsrv.get("/", (req, res) => {
  if(pgStatus) {
    res.send(JSON.stringify(pgStatus));
  }
  res.send("healthly.");
});

httpsrv.get("/values/all", async (req, res) => {
  console.log('fibserver/values/all req.body: ' + JSON.stringify(req.body));
  var result = await pgPool.query('SELECT * FROM values');
  console.log('fibserver/values/all query result: ' + JSON.stringify(result));
  res.send(result.rows);
});

httpsrv.get("/values/current", async (req, res) => {
  console.log('fibserver/values/current req.body: ' + JSON.stringify(req.body));
  redisClient.hgetall('values', (err, values) => {
    if(err) {
      console.error('ERROR:REDIS:GETTING "values": ' + err);
    } else {
      console.log('fibserver/values/current hgetall result: ' +JSON.stringify(values));
      res.send(values);
    }
  });
});

httpsrv.post("/values", async (req, res) => {
  console.log('fibserver/values req.body: ' + JSON.stringify(req.body));
  var requestedIndex = req.body.fibIndex;
  if(parseInt(requestedIndex) > 100) {
    return res.status(422).send('Invalid index (bigger than 100)');
  }
  redisClient.hset('values', requestedIndex, 'N.A.');
  redisPublisher.publish('insert', requestedIndex);
  pgPool.query('INSERT INTO values (number) VALUES ($1)', [requestedIndex])
    .then(res => {
      console.log('value inserted: ' + JSON.stringify(res));
    })
    .catch(e => {
      console.error('ERROR:PG:INSERT into values, number: ' + requestedIndex);
      pgStatus = e;
      console.error(e);
    });
  res.send({ working: true, index: requestedIndex });
});

httpsrv.listen(8080, function() {
  console.log("server started.");
});
