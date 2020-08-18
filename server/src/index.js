
const keys = require('./keys.js');
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
//const redis = require('redis');

const httpsrv = express();
httpsrv.use(cors());
httpsrv.use(bodyParser.json());

/*
var pgStatus, redisStatus, httpsrvStatus;

const {Pool} = require('pg');
const pgClient = new Pool({
  user: keys.pgUser,
  password: keys.pgPassword,
  host: keys.pgHost,
  port: keys.pgPort,
  database: keys.pgDatabase
});
pgClient.on('error', function(err){
  console.error('ERROR:PG', err.stack);
  pgStatus = err;
});
pgClient.query('CREATE TABLE IF NOT EXISTS values (number INT)')
  .catch(function(err){
    console.error('ERROR:PG:CREATE_TABLE', err.stack);
  });

const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: function(options) {
    return 1000;
  }
});
const redisPublisher = redisClient.duplicate();
*/

httpsrv.get("/", (req, res) => {
  res.send("healthly.");
});

httpsrv.get("/values/all", async (req, res) => {
  /*
  var result = await pgClient.query('SELECT * FROM values');
  res.send(result.rows);
  */
  res.send("/values/all");
});

httpsrv.get("/values/current", async (req, res) => {
  /*
  redisClient.hgetall('values', (err, values) => {
    res.send(values);
  });
  */
  res.send("/values/current");
});

httpsrv.post("/values", async (req, res) => {
  var requestedIndex = req.body.index;
  if(parseInt(requestedIndex) > 100) {
    return res.status(422).send('Invalid index (bigger than 100)');
  }
  redisClient.hset('values', requestedIndex, 'N.A.');
  redisPublisher.publish('insert', requestedIndex);
  pgClient.query('INSERT INTO values (number) VALUES ($1)', [requestedIndex]);

  res.send({ working: true});
});

httpsrv.listen(8080, function() {
  console.log("server started.");
});
