import { createClient, RedisClientType } from "redis";

//Set Up Redis Client
// const getRedisUrl = () => {
//    if (process.env.REDIS_URL) {
//       return process.env.REDIS_URL;
//    }

//    throw new Error("Redis url not defined");
// };

// let redisClient: RedisClientType | null = null;

// const connectToRedis = () => {
//    if (redisClient) {
//       console.log("Existing connection to redis");
//       return redisClient;
//    }

//    //connect to redis
//    redisClient = createClient({ url: process.env.REDIS_URL });
//    redisClient.connect();
//    console.log("New connection to redis");
//    return redisClient;
// };

// redisClient = connectToRedis();

// export { redisClient, connectToRedis };

declare global {
   // This prevents us from making multiple connections to the db when the
   // require cache is cleared.
   // eslint-disable-next-line
   var primaryClient: RedisClientType | undefined;
}

function createRedisClient(): RedisClientType {
   let client = global.primaryClient;

   if (!client) {
      // eslint-disable-next-line no-multi-assign
      client = global.primaryClient = createClient({
         url: process.env.REDIS_URL,
      });

      client.on("error", (error: string) => {
         console.error(`REDIS ERROR:`, error);
      });
      console.log("New connection to redis");
      client.connect();
   } else {
      console.log("Existing connection to redis");
   }

   return client;
}

const redisClient = createRedisClient();

export { redisClient };
