"use client";

import Image from "next/image";
import React, { useState } from "react";
import { blurhashToBase64 } from "blurhash-base64";
import { UnsplashResponse } from "@/types/types";

function ImageUI({ image }: { image: UnsplashResponse }) {
   const [isReady, setIsReady] = useState(false);

   return (
      <Image
         priority={true}
         src={`${image.urls.full}`}
         sizes='100vw'
         fill={true}
         alt={image.alt_description}
         className={`object-cover object-center transition-all duration-500 ${
            isReady ? "blur-none" : "blur-3xl"
         }`}
         onLoad={() => setIsReady(true)}
         placeholder='blur'
         blurDataURL={blurhashToBase64(`${image.blur_hash}`)}
      />
   );
}

export default ImageUI;
