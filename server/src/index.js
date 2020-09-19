
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

debugger;

console.log('Connecting to database at host: ' + process.env.PGHOST + ', with options: ' + JSON.stringify(pgPool.options) + '.');
pgPool.on('connect', () => {
  pgPool.query('CREATE TABLE IF NOT EXISTS values (number INT)')
    .catch((error) => {
      console.error('ERROR:PG:creating table values.');
      pgStatus = error;
    });
});

pgPool.on('error', (error, client) => {
  console.error('ERROR:PG', error);
  pgStatus = error;
});
/*
pgPool.connect((error1, client, release) => {
  if(error1) {
    console.error('ERROR:PG:CONNECTING', error1.stack);
    pgStatus = error1.stack;
  } else {
    console.log('Connected to: ' + process.env.PGHOST + '.');
    client.query('CREATE TABLE IF NOT EXISTS values (number INT)', (error2, response)=>{
      if(error2) {
        console.error('ERROR:PG:CREATE_TABLE', error2.stack);
        pgStatus = error2.stack;
      }
      if(response) {
        console.log('table values created.');
      }
    });
  }
});
*/
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
  pgPool.query('INSERT INTO values (number) VALUES ($1)', [requestedIndex], (error, response)=>{
    if(error) {
      console.error(error.stack);
    }
    if(response) {
      console.log('value inserted: ' + JSON.stringify(response));
    }
  });
  res.send({ working: true, index: requestedIndex });
});

httpsrv.listen(8080, function() {
  console.log("server started.");
});
