const redis = require('redis');
import fib from '../src/fib.js';

console.log('fib is ok: ' + !(fib === 'undefined'));
console.log('fibworker process.env.REDIS_HOST: ' + process.env.REDIS_HOST);
console.log('fibworker process.env.REDIS_PORT: ' + process.env.REDIS_PORT);

const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  retry_strategy: function(options) {
    return 1000;
  }
});
const redisSubClient = redisClient.duplicate();

redisSubClient.on('message', function(channel, message) {
  console.log('fibworker incoming index to compute: ' + message);
  redisClient.hset('values', message, fib.getNumberAt(parseInt(message)));
});
redisSubClient.subscribe('insert');
