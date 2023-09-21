import { getImage } from "@/utils/api";
import Image from "next/image";
import React from "react";

const BackgroundImage = async () => {
   const image = await getImage();

   return (
      <div className='relative h-full w-full'>
         <Image
            priority
            src={`${image}`}
            fill={true}
            alt='background'
            className='object-cover object-center'
         />
         <div className='absolute inset-x-0 inset-y-0 bg-black opacity-[15%]'></div>
      </div>
   );
};

export default BackgroundImage;
