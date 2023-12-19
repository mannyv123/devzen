import { UnsplashResponse } from "@/types/types";
import Link from "next/link";
import React from "react";

interface ImageDetailUIProps {
   imageDetails: UnsplashResponse;
}

function ImageDetailUI({ imageDetails }: ImageDetailUIProps) {
   return (
      <div className='group absolute bottom-3 left-4 z-20 capitalize text-white'>
         <div className='relative flex flex-col'>
            <Link href={imageDetails.links.html} target='_blank'>
               <p className='-translate-y-0 opacity-40 transition-all duration-500 hover:underline group-hover:-translate-y-0 group-hover:opacity-100 lg:translate-y-3'>
                  {imageDetails.location.name === null
                     ? imageDetails.alt_description
                     : imageDetails.location.name}
               </p>
            </Link>
            <Link href={imageDetails.user.links.html} target='_blank'>
               <p className='translate-y-0 whitespace-nowrap opacity-40 transition-all duration-500 hover:underline group-hover:translate-y-0 group-hover:opacity-100 lg:-translate-y-3 lg:opacity-0'>
                  {imageDetails.user.name}
               </p>
            </Link>
         </div>
      </div>
   );
}

export default ImageDetailUI;
