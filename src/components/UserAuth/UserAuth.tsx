"use client";

import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { MdLogin } from "react-icons/md";
import Image from "next/image";

function UserAuth() {
   const { data: session } = useSession();

   const handleSignIn = () => {
      if (!session) {
         signIn();
      }
   };
   return (
      <div className='group relative text-white flex flex-col items-center gap-2 mr-4 mt-3 cursor-pointer z-10 '>
         <div
            onClick={handleSignIn}
            className='relative w-fit flex items-center border rounded-full pr-2 lg:pr-0 group-hover:pr-2'
         >
            <div className='relative w-10 h-10 p-2'>
               {session && session.user?.image ? (
                  <Image
                     src={session.user.image}
                     width={24}
                     height={24}
                     alt='user'
                     className='rounded-full'
                  />
               ) : (
                  <MdLogin size={"1.5rem"} />
               )}
            </div>
            {session ? (
               <div className='overflow-hidden transition-width duration-300 text-center flex-1 group-hover:w-40 group-hover:h-fit lg:w-0 lg:h-0'>
                  <p className='truncate'>{session.user?.name}</p>
               </div>
            ) : (
               <div className='overflow-hidden transition-width duration-300 text-center flex-1 group-hover:w-[2.625rem] group-hover:h-fit lg:w-0 lg:h-0'>
                  <p>Login</p>
               </div>
            )}
         </div>
         {session ? (
            <div
               onClick={() => signOut()}
               className='overflow-hidden transition-width duration-300 flex flex-1 justify-center items-center lg:w-0 lg:h-0 group-hover:w-[12.625rem] rounded-full bg-white'
            >
               <p className='whitespace-nowrap text-black'>Sign Out</p>
            </div>
         ) : null}
      </div>
   );
}

export default UserAuth;
