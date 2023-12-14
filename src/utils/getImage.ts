import { redisCache } from "@/redis/redisCache";
import type { Cache } from "@epic-web/cachified";
import { redisClient } from "@/redis/redisClient";
import { cachified } from "@epic-web/cachified";
import { getUnsplashImage } from "./api";

let cache: Cache;

if (redisClient) {
   cache = redisCache(redisClient);
}

export async function getImage() {
   return await cachified({
      key: "image",
      cache: cache,
      async getFreshValue() {
         const response = await getUnsplashImage();
         console.log("got fresh value");
         return response;
      },
   });
}
