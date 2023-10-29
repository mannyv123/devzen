import React, { ChangeEvent } from "react";

interface InputUIProps {
   isBlank: boolean;
   handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
   inputValue: string;
   identifier: string;
   placeholderText: string;
}

function InputUI({
   isBlank,
   handleInputChange,
   inputValue,
   identifier,
   placeholderText,
}: InputUIProps) {
   return (
      <input
         className={`w-full rounded-lg px-2 py-1 focus:outline-none ${
            isBlank ? "ring-2 ring-red-600" : "focus:ring-2"
         }`}
         placeholder={placeholderText}
         type='text'
         name={identifier}
         id={identifier}
         onChange={handleInputChange}
         value={inputValue}
      />
   );
}

export default InputUI;
