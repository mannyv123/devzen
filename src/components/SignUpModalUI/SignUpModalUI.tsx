import React, { ChangeEvent, FormEvent } from "react";
import { MdClose } from "react-icons/md";
import ErrorIcon from "../ErrorIcon/ErrorIcon";
import { SignUpFormErrors } from "@/types/types";

interface SignUpModalUIProps {
   handleSignUpModal: () => void;
   inputErrors: SignUpFormErrors;
   initialInputErrors: SignUpFormErrors;
   ERROR_MSG: string;
   ERROR_MSG_MOBILE: string;
   handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
   handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function SignUpModalUI({
   handleSignUpModal,
   inputErrors,
   initialInputErrors,
   ERROR_MSG,
   ERROR_MSG_MOBILE,
   handleSubmit,
   handleInputChange,
}: SignUpModalUIProps) {
   return (
      <>
         <div onClick={() => handleSignUpModal()} className='absolute right-4 top-4 cursor-pointer'>
            <MdClose size={"1.5rem"} />
         </div>
         <div className='flex flex-col items-center gap-8'>
            <h1 className='text-3xl font-bold'>Sign Up</h1>
            {inputErrors !== initialInputErrors ? (
               <div className='absolute left-4 top-[4.75rem] flex w-full items-center justify-center lg:hidden'>
                  <ErrorIcon errorMsg={ERROR_MSG_MOBILE} />
               </div>
            ) : null}
            <form className='flex w-full flex-col gap-8' onSubmit={handleSubmit}>
               <div className='flex w-full flex-col gap-2'>
                  <label htmlFor='name'>Name:</label>
                  <div className='relative flex w-full items-center'>
                     {inputErrors.name ? (
                        <div className='absolute hidden whitespace-nowrap lg:-left-9 lg:block'>
                           <ErrorIcon errorMsg={ERROR_MSG} />
                        </div>
                     ) : null}
                     <input
                        className={`h-9 w-full rounded-md border px-2 ${
                           inputErrors.name ? "border-red-600" : ""
                        }`}
                        type='text'
                        name='name'
                        id='name'
                        placeholder='Enter your full name'
                        onChange={handleInputChange}
                     />
                  </div>

                  <label htmlFor='email'>Email:</label>
                  <div className='relative flex w-full items-center'>
                     {inputErrors.email ? (
                        <div className='absolute hidden whitespace-nowrap lg:-left-9 lg:block'>
                           <ErrorIcon errorMsg={ERROR_MSG} />
                        </div>
                     ) : null}
                     <input
                        className={`h-9 w-full rounded-md border px-2 ${
                           inputErrors.email ? "border-red-600" : ""
                        }`}
                        type='text'
                        name='email'
                        id='email'
                        placeholder='Enter your email'
                        onChange={handleInputChange}
                     />
                  </div>

                  <label htmlFor='password'>Password:</label>
                  <div className='relative flex w-full items-center'>
                     {inputErrors.password ? (
                        <div className='absolute hidden whitespace-nowrap lg:-left-9 lg:block'>
                           <ErrorIcon errorMsg={ERROR_MSG} />
                        </div>
                     ) : null}
                     <input
                        className={`h-9 w-full rounded-md border px-2 ${
                           inputErrors.password ? "border-red-600" : ""
                        }`}
                        type='password'
                        name='password'
                        id='password'
                        placeholder='Enter a new password'
                        onChange={handleInputChange}
                     />
                  </div>

                  <label htmlFor='confirmPassword'>Confirm Password:</label>
                  <div className='relative flex w-full items-center'>
                     {inputErrors.confirmPassword ? (
                        <div className='absolute hidden whitespace-nowrap lg:-left-9 lg:block'>
                           <ErrorIcon errorMsg={ERROR_MSG} />
                        </div>
                     ) : null}
                     <input
                        className={`h-9 w-full rounded-md border px-2 ${
                           inputErrors.confirmPassword ? "border-red-600" : ""
                        }`}
                        type='password'
                        name='confirmPassword'
                        id='confirmPassword'
                        placeholder='Confirm your new password'
                        onChange={handleInputChange}
                     />
                  </div>
               </div>
               <button
                  className='group relative flex w-full justify-center overflow-hidden rounded-full border p-2'
                  type='submit'
               >
                  <div className='absolute inset-0 h-full w-0 bg-[#2267F2] transition-width duration-500 group-hover:w-full'></div>
                  <span className='relative transition-colors duration-300 group-hover:text-white'>
                     Create Account
                  </span>
               </button>
            </form>
         </div>
      </>
   );
}

export default SignUpModalUI;
