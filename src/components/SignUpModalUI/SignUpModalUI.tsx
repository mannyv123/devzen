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
               <div className='lg:hidden absolute left-4 top-[4.75rem] w-full flex justify-center items-center'>
                  <ErrorIcon errorMsg={ERROR_MSG_MOBILE} />
               </div>
            ) : null}
            <form className='flex flex-col gap-8 w-full' onSubmit={handleSubmit}>
               <div className='flex flex-col w-full gap-2'>
                  <label htmlFor='name'>Name:</label>
                  <div className='relative flex items-center w-full'>
                     {inputErrors.name ? (
                        <div className='hidden lg:block absolute lg:-left-9 whitespace-nowrap'>
                           <ErrorIcon errorMsg={ERROR_MSG} />
                        </div>
                     ) : null}
                     <input
                        className={`border rounded-md h-9 px-2 w-full ${
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
                  <div className='relative flex items-center w-full'>
                     {inputErrors.email ? (
                        <div className='hidden lg:block absolute lg:-left-9 whitespace-nowrap'>
                           <ErrorIcon errorMsg={ERROR_MSG} />
                        </div>
                     ) : null}
                     <input
                        className={`border rounded-md h-9 px-2 w-full ${
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
                  <div className='relative flex items-center w-full'>
                     {inputErrors.password ? (
                        <div className='hidden lg:block absolute lg:-left-9 whitespace-nowrap'>
                           <ErrorIcon errorMsg={ERROR_MSG} />
                        </div>
                     ) : null}
                     <input
                        className={`border rounded-md h-9 px-2 w-full ${
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
                  <div className='relative flex items-center w-full'>
                     {inputErrors.confirmPassword ? (
                        <div className='hidden lg:block absolute lg:-left-9 whitespace-nowrap'>
                           <ErrorIcon errorMsg={ERROR_MSG} />
                        </div>
                     ) : null}
                     <input
                        className={`border rounded-md h-9 px-2 w-full ${
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
                  className='relative border p-2 w-full rounded-full overflow-hidden group flex justify-center'
                  type='submit'
               >
                  <div className='absolute inset-0 bg-[#2267F2] transition-width duration-500 w-0 group-hover:w-full h-full'></div>
                  <span className='relative group-hover:text-white transition-colors duration-300'>
                     Create Account
                  </span>
               </button>
            </form>
         </div>
      </>
   );
}

export default SignUpModalUI;
