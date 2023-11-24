import { getImage } from "@/utils/api";
import React from "react";
import ImageUI from "../ImageUI/ImageUI";
import { UnsplashResponse } from "@/types/types";
import ImageDetailUI from "../ImageDetailUI/ImageDetailUI";

const ImageFeature = async () => {
   const imageDetails: UnsplashResponse = await getImage();

   return (
      <div className='relative h-full w-full'>
         <ImageUI image={imageDetails} />
         <div className='absolute inset-x-0 inset-y-0 bg-black opacity-[15%]'></div>
         <ImageDetailUI imageDetails={imageDetails} />
      </div>
   );
};

export default ImageFeature;
