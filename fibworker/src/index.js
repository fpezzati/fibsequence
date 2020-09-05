const keys = require('./keys.js');
const redis = require('redis');
const fib = require('./fib.js');

console.log('fibworker env: ' + JSON.stringify(keys));

const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: function(options) {
    return 1000;
  }
});
const redisSubClient = redisClient.duplicate();

redisSubClient.on('message', function(channel, message) {
  console.log('incoming index to compute: ' + message);
  redisClient.hset('values', message, fib.getNumberAt(parseInt(message)));
});
redisSubClient.subscribe('insert');
