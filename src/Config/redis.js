var redis = require('redis');

var client = redis.createClient({
  port: 6379,
  host: "127.0.0.1"
});

const connectedMessage ="Client connected to redis";
client.on('connect', () => {
  console.log(connectedMessage)
})

client.on('error', (err) => {
  console.log(err.message)
})

client.on('ready', () => {
  console.log(connectedMessage + " and is ready to use...")
})

client.on('end', () => {
  console.log("Client disconnected from redis")
  client.quit()
})

module.exports.client = client;