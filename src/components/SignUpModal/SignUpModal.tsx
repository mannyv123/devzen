"use client";

import React, { useEffect, useRef } from "react";

interface SignUpModalProps {
   isModalOpen: boolean;
   handleSignUpModal: () => void;
}

function SignUpModal({ isModalOpen, handleSignUpModal }: SignUpModalProps) {
   const signUpModalRef = useRef<HTMLDialogElement>(null);

   useEffect(() => {
      if (isModalOpen) {
         signUpModalRef.current?.showModal();
      } else {
         signUpModalRef.current?.close();
      }
   }, [isModalOpen]);

   return (
      <dialog
         ref={signUpModalRef}
         onKeyDown={(e) => {
            if (e.key === "Escape" && isModalOpen === true) {
               handleSignUpModal();
            }
         }}
         className='rounded-lg px-4 lg:px-14 py-8 w-full lg:w-1/3'
      >
         <div className='flex flex-col items-center gap-8'>
            <h1 className='text-3xl font-bold'>Sign Up</h1>
            <form className='flex flex-col gap-8 w-full'>
               <div className='flex flex-col w-full gap-2'>
                  <label htmlFor='name'>Name:</label>
                  <input className='border rounded-md h-9' type='text' name='name' id='name' />
                  <label htmlFor='email'>Email:</label>
                  <input className='border rounded-md h-9' type='text' name='email' id='email' />
                  <label htmlFor='password'>Password:</label>
                  <input
                     className='border rounded-md h-9'
                     type='password'
                     name='password'
                     id='password'
                  />
                  <label htmlFor='confirmPassword'>Confirm Password:</label>
                  <input
                     className='border rounded-md h-9'
                     rounded-md
                     type='password'
                     name='confirmPassword'
                     id='confirmPassword'
                  />
               </div>
               <button className='border w-full p-2 rounded-full' type='submit'>
                  Create Account
               </button>
            </form>
         </div>
      </dialog>
   );
}

export default SignUpModal;
