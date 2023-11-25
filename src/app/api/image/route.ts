import { UnsplashResponse } from "@/types/types";
import { NextResponse } from "next/server";

const ACCESS_KEY = process.env.ACCESS_KEY;

export const GET = async () => {
   try {
      const result = await fetch(
         "https://api.unsplash.com/photos/random?orientation=landscape&query=landscape",
         // "https://api.unsplash.com/photos/-nYBR0LFTvQ",
         {
            method: "GET",
            headers: {
               Authorization: "Client-ID " + ACCESS_KEY,
            },
            next: {
               revalidate: 10,
            },
         },
      );

      if (!result.ok) {
         const errorMessage = await result.text();
         return NextResponse.json(`Unsplash error: ${result.statusText}, ${errorMessage}`, {
            status: result.status,
         });
      }

      const data: UnsplashResponse = await result.json();

      return NextResponse.json(data, {
         status: 200,
      });
   } catch (err) {
      return NextResponse.json(`Error occurred ${err}`, { status: 500 });
   }
};
