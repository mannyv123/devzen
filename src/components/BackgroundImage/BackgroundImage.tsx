import { getImage } from "@/utils/api";
import Image from "next/image";
import React from "react";
import { blurhashToBase64 } from "blurhash-base64";

export const revalidate = 3600;

const BackgroundImage = async () => {
   const image: { blur_hash: string; urls: { full: string; thumb: string } } = await getImage();

   return (
      <div className='relative h-full w-full'>
         <Image
            priority={true}
            src={`${image.urls.full}`}
            fill={true}
            alt='background'
            className='animate-fadeIn object-cover object-center'
            placeholder='blur'
            blurDataURL={blurhashToBase64(`${image.blur_hash}`)}
         />
         <div className='absolute inset-x-0 inset-y-0 bg-black opacity-[15%]'></div>
      </div>
   );
};

export default BackgroundImage;
