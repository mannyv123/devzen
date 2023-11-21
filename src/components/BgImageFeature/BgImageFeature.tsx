import { getImage } from "@/utils/api";

import React from "react";
import BgImageUI from "../BgImageUI/BgImageUI";

export const revalidate = 3600;

const BgImageFeature = async () => {
   const image: { blur_hash: string; urls: { full: string; thumb: string } } = await getImage();

   return (
      <div className='relative h-full w-full'>
         <BgImageUI image={image} />
         <div className='absolute inset-x-0 inset-y-0 bg-black opacity-[15%]'></div>
      </div>
   );
};

export default BgImageFeature;
