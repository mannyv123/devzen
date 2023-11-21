"use client";

import Image from "next/image";
import React, { useState } from "react";
import { blurhashToBase64 } from "blurhash-base64";

//need to add width and height
//need to add sizes = 100vw
//set quality to 100

function BgImageUI({
   image,
}: {
   image: { blur_hash: string; urls: { full: string; thumb: string } };
}) {
   const [isReady, setIsReady] = useState(false);

   return (
      <Image
         priority={true}
         src={`${image.urls.full}`}
         fill={true}
         alt='background'
         className={`object-cover object-center transition-all duration-500 ${
            isReady ? "blur-none" : "blur-3xl"
         }`}
         // onLoad={(image) => image.currentTarget.classList.add("opacity-50")}
         onLoad={() => setIsReady(true)}
         placeholder='blur'
         blurDataURL={blurhashToBase64(`${image.blur_hash}`)}
      />
   );
}

export default BgImageUI;
