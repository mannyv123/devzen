"use client";

import { checkEmail, createUser } from "@/utils/api";
import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import SignUpModalUI from "../SignUpModalUI/SignUpModalUI";
import { SignUpFormErrors, SignUpFormInputs } from "@/types/types";

const ERROR_MSG = "Field cannot be blank";
const ERROR_MSG_MOBILE = "Fields cannot be blank";
const ERROR_MSG_EMAIL = "Email is already in use";

const initialValues: SignUpFormInputs = {
   name: "",
   email: "",
   password: "",
   confirmPassword: "",
};

const initialInputErrors: SignUpFormErrors = {
   name: false,
   email: false,
   password: false,
   confirmPassword: false,
};

interface SignUpModalFeatureProps {
   isModalOpen: boolean;
   handleSignUpModal: () => void;
}

function SignUpModalFeature({ isModalOpen, handleSignUpModal }: SignUpModalFeatureProps) {
   const [inputValues, setInputValues] = useState(initialValues);
   const [inputErrors, setInputErrors] = useState(initialInputErrors);
   const [emailErrorMessage, setEmailErrorMessage] = useState(ERROR_MSG);

   const signUpModalRef = useRef<HTMLDialogElement>(null);

   const router = useRouter();

   const validateInputs = async () => {
      const errors = initialInputErrors;

      errors.name = inputValues.name === "" ? true : false;
      errors.password = inputValues.password === "" ? true : false;
      errors.confirmPassword = inputValues.confirmPassword === "" ? true : false;
      errors.email = inputValues.email === "" ? true : false;

      if (inputValues.email === "") {
         errors.email = true;
      } else {
         const { isEmailInUse } = await checkEmail(inputValues.email);
         if (isEmailInUse) {
            errors.email = true;
            setEmailErrorMessage(ERROR_MSG_EMAIL);
         }
      }

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

   //Check if any fields are valid
   const formValidation = async () => {
      let isValid = true;

      const errors = await validateInputs();

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
      const isFormValid = await formValidation();
      if (!isFormValid) {
         return;
      }

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
            inputErrors={inputErrors}
            initialInputErrors={initialInputErrors}
            ERROR_MSG={ERROR_MSG}
            ERROR_MSG_MOBILE={ERROR_MSG_MOBILE}
            ERROR_MSG_EMAIL={emailErrorMessage}
            handleSubmit={handleSubmit}
            handleInputChange={handleInputChange}
         />
      </dialog>
   );
}

export default SignUpModalFeature;
