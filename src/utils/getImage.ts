import { cache } from "react";

interface UnsplashResponse {
   urls: {
      full: string;
   };
}

const ACCESS_KEY = process.env.ACCESS_KEY;

export const revalidate = 3600;
export const fetchCache = "default-cache";

export const getImage = cache(async () => {
   const result = await fetch(
      "https://api.unsplash.com/photos/random?orientation=landscape&query=nature",
      {
         method: "GET",
         headers: {
            Authorization: "Client-ID " + ACCESS_KEY,
         },
         next: {
            revalidate: 3600,
         },
      },
   );

   if (!result.ok) {
      const errorMessage = await result.text();
      throw new Error(`Unsplash error: ${result.statusText}, ${errorMessage}`);
   }

   const data: UnsplashResponse = await result.json();

   return data.urls.full;
});
