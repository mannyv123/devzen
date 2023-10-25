import React from "react";
import { MdLogin } from "react-icons/md";
import Image from "next/image";
import { Session } from "next-auth";

interface UserAuthUIProps {
   userImageExists: string | boolean;
   sessionData: Session | null;
   handleSignIn: () => void;
   handleSignOut: () => void;
   handleSignUpModal: () => void;
}

function UserAuthUI({
   userImageExists,
   sessionData,
   handleSignIn,
   handleSignOut,
   handleSignUpModal,
}: UserAuthUIProps) {
   return (
      <div className='group relative text-white flex flex-col items-center gap-3 mr-4 mt-3 z-10 lg:opacity-40 hover:opacity-100'>
         <div className='relative w-fit flex items-center border rounded-full pr-2 lg:pr-0 group-hover:pr-2'>
            <div className='relative w-10 h-10 p-2'>
               {typeof userImageExists === "string" ? (
                  <Image
                     src={userImageExists}
                     width={24}
                     height={24}
                     alt='current user'
                     className='rounded-full'
                  />
               ) : (
                  <MdLogin size={"1.5rem"} />
               )}
            </div>
            {sessionData ? (
               <div className='overflow-hidden transition-width duration-300 text-center flex-1 group-hover:w-40 group-hover:h-fit w-40 lg:w-0 lg:h-0'>
                  <p className='truncate'>{sessionData.user?.name}</p>
               </div>
            ) : (
               <div className='flex'>
                  <div
                     onClick={handleSignIn}
                     className='cursor-pointer overflow-hidden transition-width duration-300 text-center flex-1 group-hover:w-[2.6rem] group-hover:h-fit w-[2.6rem] lg:w-0 lg:h-0'
                  >
                     <p>Login</p>
                  </div>
                  <div
                     onClick={handleSignUpModal}
                     className='whitespace-nowrap cursor-pointer overflow-hidden transition-width duration-300 text-center flex-1 group-hover:w-[4.75rem] group-hover:h-fit w-[4.75rem] lg:w-0 lg:h-0'
                  >
                     <p>Sign Up</p>
                  </div>
               </div>
            )}
         </div>
         {sessionData ? (
            <div
               onClick={handleSignOut}
               className='cursor-pointer overflow-hidden transition-width duration-300 flex flex-1 justify-center items-center w-[12.625rem] lg:w-0 lg:h-0 group-hover:w-[12.625rem] rounded-full bg-white'
            >
               <p className='whitespace-nowrap text-black'>Sign Out</p>
            </div>
         ) : null}
      </div>
   );
}

export default UserAuthUI;
