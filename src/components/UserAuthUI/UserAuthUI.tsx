import React from "react";
import { MdLogin, MdOutlineEmail } from "react-icons/md";
import { VscGithubInverted } from "react-icons/vsc";
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
      <div className='group/options relative text-white flex flex-col items-center gap-3 mr-4 mt-3 z-10 lg:opacity-40 hover:opacity-100'>
         <div className='relative w-fit flex items-center border rounded-full pr-4 lg:pr-0 group-hover/options:pr-4'>
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
               <div className='overflow-hidden transition-width duration-300 text-center flex-1 group-hover/options:w-40 group-hover/options:h-fit w-40 lg:w-0 lg:h-0'>
                  <p className='truncate'>{sessionData.user?.name}</p>
               </div>
            ) : (
               <div className='flex gap-3 lg:gap-0 group-hover/options:gap-3 p-2 lg:p-0 group-hover/options:p-2 items-center'>
                  <div
                     onClick={handleSignIn}
                     className='group/login cursor-pointer overflow-hidden transition-width duration-300 text-center flex-1 group-hover/options:w-[4.75rem] group-hover/options:h-fit w-[4.75rem] lg:w-0 lg:h-0 flex flex-col items-center justify-between gap-1'
                  >
                     <p className='group-hover/login:underline underline-offset-[.375rem]'>Login</p>
                     <div className='flex justify-center gap-2 w-full'>
                        <VscGithubInverted size={"1.3rem"} />
                        <MdOutlineEmail size={"1.3rem"} />
                     </div>
                  </div>
                  <div className='transition-height duration-500 h-[2.75rem] lg:h-0 group-hover/options:h-[2.75rem]'>
                     <svg width='2' height='100%' xmlns='http://www.w3.org/2000/svg'>
                        <line x1='1' y1='0' x2='1' y2='100%' stroke='white' stroke-width='2' />
                     </svg>
                  </div>
                  <div
                     onClick={handleSignUpModal}
                     className='group/signup whitespace-nowrap cursor-pointer overflow-hidden transition-width duration-300 text-center flex-1 group-hover/options:w-[4.75rem] group-hover/options:h-fit w-[4.75rem] lg:w-0 lg:h-0 flex flex-col items-center justify-between gap-1'
                  >
                     <p className='group-hover/signup:underline underline-offset-[.375rem]'>
                        Sign Up
                     </p>
                     <MdOutlineEmail size={"1.3rem"} />
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
