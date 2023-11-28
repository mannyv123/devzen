import React from "react";
import { MdLogin, MdOutlineEmail, MdPerson } from "react-icons/md";
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
      <div className='group/options relative z-10 mr-4 mt-3 flex flex-col items-center gap-3 text-white hover:opacity-100 lg:opacity-40'>
         <div className='relative flex w-fit items-center rounded-full border pr-4 group-hover/options:pr-4 lg:pr-0'>
            <div className='relative h-10 w-10 p-2'>
               {sessionData && typeof userImageExists === "string" ? (
                  <Image
                     src={userImageExists}
                     width={24}
                     height={24}
                     alt='current user'
                     className='rounded-full'
                  />
               ) : null}
               {sessionData && typeof userImageExists !== "string" ? (
                  <MdPerson size={"1.5rem"} />
               ) : null}
               {!sessionData ? <MdLogin size={"1.5rem"} /> : null}
            </div>
            {sessionData ? (
               <div className='w-40 flex-1 overflow-hidden text-center transition-width duration-300 group-hover/options:h-fit group-hover/options:w-40 lg:h-0 lg:w-0'>
                  <p className='truncate'>{sessionData.user?.name}</p>
               </div>
            ) : (
               <div className='flex items-center gap-3 p-2 group-hover/options:gap-3 group-hover/options:p-2 lg:gap-0 lg:p-0'>
                  <div
                     onClick={handleSignIn}
                     className='flex w-[6rem] cursor-pointer items-center justify-between gap-1 overflow-hidden border-b border-b-white border-opacity-0 text-center transition-[width,border] duration-300 hover:border-opacity-100 group-hover/options:h-fit group-hover/options:w-[6rem] lg:h-0 lg:w-0'
                  >
                     <p>Login</p>
                     <div className='flex w-full justify-center gap-2'>
                        <VscGithubInverted size={"1.3rem"} />
                        <MdOutlineEmail size={"1.3rem"} />
                     </div>
                  </div>
                  <div className='h-[1.5rem] transition-height duration-500 group-hover/options:h-[1.5rem] lg:h-0'>
                     <svg width='2' height='100%' xmlns='http://www.w3.org/2000/svg'>
                        <line x1='1' y1='0' x2='1' y2='100%' stroke='white' strokeWidth='2' />
                     </svg>
                  </div>
                  <div
                     onClick={handleSignUpModal}
                     className='flex w-[6rem] cursor-pointer flex-row-reverse items-center justify-around gap-1 overflow-hidden whitespace-nowrap border-b border-b-white border-opacity-0 text-center transition-[width,border] duration-300 hover:border-opacity-100 group-hover/options:h-fit group-hover/options:w-[6rem] lg:h-0 lg:w-0'
                  >
                     <p>Sign Up</p>
                     <MdOutlineEmail size={"1.3rem"} />
                  </div>
               </div>
            )}
         </div>
         {sessionData ? (
            <div
               onClick={handleSignOut}
               className='group/signout relative flex w-[12.625rem] flex-1 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-white transition-width duration-300 group-hover/options:w-[12.625rem] lg:h-0 lg:w-0'
            >
               <div className='peer absolute inset-0 h-full w-0 bg-[#2267F2] transition-width duration-500 group-hover/signout:w-full'></div>
               <p className='relative whitespace-nowrap text-black transition-colors duration-300 group-hover/signout:text-white'>
                  Sign Out
               </p>
            </div>
         ) : null}
      </div>
   );
}

export default UserAuthUI;
