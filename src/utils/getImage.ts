import { redisCacheAdapter } from "@/redis/redisCacheAdapter";
import { redisClient } from "@/redis/redisClient";
import { cachified } from "@epic-web/cachified";
import { getUnsplashImage } from "./api";

const cache = redisCacheAdapter(redisClient);

export async function getImage() {
   return cachified({
      key: "image",
      cache,
      async getFreshValue() {
         const response = await getUnsplashImage();
         return response;
      },
      ttl: 3600000,
   });
}
