"use client";

import { createUser } from "@/utils/api";
import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { MdClose } from "react-icons/md";
import { useRouter } from "next/navigation";
import ErrorIcon from "../ErrorIcon/ErrorIcon";

const ERROR_MSG = "Field cannot be blank";
const ERROR_MSG_MOBILE = "Fields cannot be blank";

const initialValues = {
   name: "",
   email: "",
   password: "",
   confirmPassword: "",
};

const initialInputErrors = {
   name: false,
   email: false,
   password: false,
   confirmPassword: false,
};

interface SignUpModalProps {
   isModalOpen: boolean;
   handleSignUpModal: () => void;
}

function SignUpModal({ isModalOpen, handleSignUpModal }: SignUpModalProps) {
   const [inputValues, setInputValues] = useState(initialValues);
   const [inputErrors, setInputErrors] = useState(initialInputErrors);

   const signUpModalRef = useRef<HTMLDialogElement>(null);

   const router = useRouter();

   const validateInputs = () => {
      const errors = initialInputErrors;

      errors.name = inputValues.name === "" ? true : false;
      errors.email = inputValues.email === "" ? true : false;
      errors.password = inputValues.password === "" ? true : false;
      errors.confirmPassword = inputValues.confirmPassword === "" ? true : false;

      return errors;
   };

   useEffect(() => {
      if (isModalOpen) {
         signUpModalRef.current?.showModal();
      } else {
         signUpModalRef.current?.close();
      }
   }, [isModalOpen]);

   const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.currentTarget;
      setInputValues({ ...inputValues, [name]: value });
   };

   //TODO: Check if email already used for an existing account
   // const emailCheck = () => {};

   //Check if any fields are valid
   const isFormValid = () => {
      let isValid = true;

      const errors = validateInputs();

      setInputErrors({ ...errors });
      if (Object.values(errors).some((error) => error)) {
         isValid = false;
      }
      return isValid;
   };

   //Handle new user form submission
   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      //Form validation
      if (!isFormValid()) {
         return;
      }
      //TODO: validate if email already used

      const { name, email, password } = inputValues;

      try {
         await createUser({ newUser: { name, email, password } });

         //Reset values and close modal
         setInputValues(initialValues);

         handleSignUpModal();

         //Redirect to login
         router.push("/api/auth/signin");
      } catch (error) {
         console.error(error);
      }
   };

   return (
      <dialog
         ref={signUpModalRef}
         onKeyDown={(e) => {
            if (e.key === "Escape" && isModalOpen === true) {
               handleSignUpModal();
            }
         }}
         className='relative rounded-lg px-4 lg:px-14 py-8 w-full lg:w-1/3'
      >
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
      </dialog>
   );
}

export default SignUpModal;
