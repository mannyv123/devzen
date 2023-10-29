"use client";

import { checkEmail, createUser } from "@/utils/api";
import React, { ChangeEvent, FocusEvent, FormEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import SignUpModalUI from "../SignUpModalUI/SignUpModalUI";
import { SignUpFormErrors, SignUpFormInputs } from "@/types/types";

const ERROR_MSG_BLANK = "Field cannot be blank";
const ERROR_MSG_EMAIL_USED = "Email is already in use";
const ERROR_MSG_EMAIL = "Please input a valid email";
const ERROR_MSG_PASSWORD = "Passwords must match";
const ERROR_MSG_PASSWORD_LENGTH = "Must be at least 8 or more characters";

const initialValues: SignUpFormInputs = {
   name: "",
   email: "",
   password: "",
   confirmPassword: "",
};

const initialInputErrors: SignUpFormErrors = {
   name: {
      error: false,
      errorMessage: "",
   },
   email: {
      error: false,
      errorMessage: "",
   },
   password: {
      error: false,
      errorMessage: "",
   },
   confirmPassword: {
      error: false,
      errorMessage: "",
   },
};

interface SignUpModalFeatureProps {
   isModalOpen: boolean;
   handleSignUpModal: () => void;
}

function SignUpModalFeature({ isModalOpen, handleSignUpModal }: SignUpModalFeatureProps) {
   const [inputValues, setInputValues] = useState(initialValues);
   const [inputErrors, setInputErrors] = useState(initialInputErrors);
   const [inputsValid, setInputsValid] = useState(false);

   const signUpModalRef = useRef<HTMLDialogElement>(null);

   const router = useRouter();

   useEffect(() => {
      if (isModalOpen) {
         signUpModalRef.current?.showModal();
      } else {
         signUpModalRef.current?.close();
      }
   }, [isModalOpen]);

   useEffect(() => {
      if (Object.values(inputErrors).some((errorState) => errorState.error)) {
         setInputsValid(false);
      } else if (Object.values(inputValues).every((input) => input !== "")) {
         setInputsValid(true);
      }
   }, [inputErrors, inputsValid]);

   const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.currentTarget;
      setInputValues({ ...inputValues, [name]: value });

      if (value !== "") {
         const removeError = {
            error: false,
            errorMessage: "",
         };
         setInputErrors({ ...inputErrors, [name]: removeError });
      }
   };

   const handleInputValidation = async (e: FocusEvent<HTMLInputElement>) => {
      const { name, value } = e.currentTarget;

      if (value === "") {
         const error = {
            error: true,
            errorMessage: ERROR_MSG_BLANK,
         };
         setInputErrors({ ...inputErrors, [name]: error });
      }

      if (name === "email") {
         const emailRegex = /^\S+@\S+\.\S+/;
         if (!emailRegex.test(value)) {
            const error = {
               error: true,
               errorMessage: ERROR_MSG_EMAIL,
            };
            setInputErrors({ ...inputErrors, [name]: error });
         } else {
            setInputsValid(false);
            const { isEmailInUse } = await checkEmail(inputValues.email);

            if (isEmailInUse) {
               const error = {
                  error: true,
                  errorMessage: ERROR_MSG_EMAIL_USED,
               };
               setInputErrors({ ...inputErrors, [name]: error });
            } else {
               setInputsValid(true);
            }
         }
      }

      if (name === "password") {
         if (value.length < 8) {
            const error = {
               error: true,
               errorMessage: ERROR_MSG_PASSWORD_LENGTH,
            };
            setInputErrors({ ...inputErrors, [name]: error });
         }
      }

      if (name === "confirmPassword") {
         if (inputValues.password !== value) {
            const error = {
               error: true,
               errorMessage: ERROR_MSG_PASSWORD,
            };
            setInputErrors({ ...inputErrors, [name]: error });
         }
      }
   };

   //Handle new user form submission
   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

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
         className='relative w-full rounded-lg px-4 py-8 lg:w-1/3 lg:px-14'
      >
         <SignUpModalUI
            handleSignUpModal={handleSignUpModal}
            handleSubmit={handleSubmit}
            handleInputChange={handleInputChange}
            inputsValid={inputsValid}
            handleInputValidation={handleInputValidation}
            inputErrors={inputErrors}
            inputValues={inputValues}
         />
      </dialog>
   );
}

export default SignUpModalFeature;
