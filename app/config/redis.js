const { createClient } = require("redis");

const client = createClient({
  username: "default", // use your Redis user. More info https://redis.io/docs/latest/operate/oss_and_stack/management/security/acl/
  password: process.env.PASSWORD_REDIS, // use your password here
  socket: {
    host: process.env.HOST_REDIS,
    port: 6379,
    tls: true,
    // key: readFileSync('./redis_user_private.key'),
    // cert: readFileSync('./redis_user.crt'),
    // ca: [readFileSync('./redis_ca.pem')]
  },
});

const tryClient = async () => {
  client.on("error", (err) => console.log("Redis Client Error", err));

  await client.connect();

  await client.set("foo", "bar");
  const value = await client.get("foo");
  console.log(value); // returns 'bar'

  await client.disconnect();
};

// tryClient()
module.exports = client;
