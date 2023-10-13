"use client";

import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { MdLogin } from "react-icons/md";
import Image from "next/image";

function UserAuth() {
   const { data: session } = useSession();

   const handleSignIn = () => {
      if (session) {
         signOut();
      } else {
         signIn();
      }
   };
   return (
      <div
         onClick={handleSignIn}
         className='relative w-fit flex justify-center items-center mr-4 mt-3 cursor-pointer text-white border rounded-full pr-2 lg:pr-0 hover:pr-2 hover:opacity-100 group lg:opacity-40'
      >
         <div className='w-10 h-10 p-2'>
            {session && session.user?.image ? (
               <div className='relative'>
                  <Image src={session.user.image} width={24} height={24} alt='user' />
               </div>
            ) : (
               <MdLogin size={"1.5rem"} />
            )}
         </div>
         <p
            className={`whitespace-nowrap overflow-hidden transition-width duration-300 text-center flex-1 group-hover:w-[2.625rem] group-hover:h-fit lg:w-0 lg:h-0`}
         >
            {session ? session.user?.name : "Login"}
         </p>
      </div>
   );
}

export default UserAuth;
