import { createClient, RedisClientType } from "redis";

//Set Up Redis Client
const getRedisUrl = () => {
   if (process.env.REDIS_URL) {
      return process.env.REDIS_URL;
   }

   throw new Error("Redis url not defined");
};

let redisClient: RedisClientType | null;

const connectToRedis = async () => {
   if (redisClient) {
      console.log("Existing connection to redis");
      return;
   }

   try {
      //connect to redis
      redisClient = createClient({ url: getRedisUrl() });
      await redisClient.connect();
      console.log("New connection to redis");
      return;
   } catch (err) {
      console.log(`Error connecting to redis: ${err}`);
      throw err;
   }
};

export { redisClient, connectToRedis };
