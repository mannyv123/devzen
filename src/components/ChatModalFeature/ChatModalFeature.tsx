"use client";

import { ModalDetails, ModalOption } from "@/utils/types";
import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { MdClose, MdInfoOutline } from "react-icons/md";

//TODO: disable submit while waiting for api response
//TODO: message timestamps
//TODO: hover states
//TODO: form validation
//TODO: feature to save conversations
//TODO: feature to reset conversations

const modalInfo: ModalDetails[] = [
   {
      option: "complexity",
      title: "Calculate Time and Space Complexity",
      desc: "Provide a function and the corresponding language it's written in and the ChatGPT API will determine the function's time and space complexity with explanations.",
   },
   {
      option: "bug",
      title: "Find and Fix Bugs",
      desc: "Provide code and the corresponding language it's written in and the ChatGPT API will determine if there are any bugs in the code and how to fix them.",
   },
   {
      option: "explain",
      title: "Code Explanation",
      desc: "Provide code and the corresponding language it's written in and the ChatGPT API will help provide a description of what the code does.",
   },
];

interface Message {
   role: "user" | "chatbot";
   content: string;
}

interface ChatModalProps {
   handleModal: (option: ModalOption) => void;
   selectedModal: ModalOption;
   isModalOpen: boolean;
}

const initialValues = {
   language: "",
   code: "",
};

const ChatModalFeature = ({ handleModal, selectedModal, isModalOpen }: ChatModalProps) => {
   const [messages, setMessages] = useState<Message[]>([
      {
         role: "chatbot",
         content: "Welcome! Please enter your code and language.",
      },
   ]);

   const currentModalDetails =
      selectedModal === "complexity"
         ? modalInfo[0]
         : selectedModal === "bug"
         ? modalInfo[1]
         : modalInfo[2];

   const modalRef = useRef<HTMLDialogElement>(null);

   useEffect(() => {
      if (isModalOpen === false) {
         modalRef.current?.close();
      } else {
         modalRef.current?.showModal();
      }
   }, [isModalOpen]);

   const [inputValues, setInputValues] = useState(initialValues);

   const infoRef = useRef<HTMLDialogElement>(null);
   const messagesEndRef = useRef<HTMLDivElement>(null);

   const scrollToBottom = () => {
      if (messagesEndRef.current) {
         const lastMessage = messagesEndRef.current.lastElementChild;
         if (lastMessage) {
            lastMessage.scrollIntoView({ behavior: "smooth" });
         }
      }
   };

   useEffect(() => {
      scrollToBottom();
   }, [messages]);

   const handleInputs = (e: ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.currentTarget;
      setInputValues({ ...inputValues, [name]: value });
   };

   const handleSubmit = async (e: FormEvent) => {
      e.preventDefault();

      setMessages((prevMessages) => [...prevMessages, { role: "user", content: inputValues.code }]);

      const result = await fetch(`/api/chatgpt/${currentModalDetails.option}`, {
         method: "POST",
         body: JSON.stringify({
            inputFunc: inputValues.code,
            language: inputValues.language,
         }),
      });

      const chatbotMessage: string = await result.json();

      setMessages((prevMessages) => [
         ...prevMessages,
         { role: "chatbot", content: chatbotMessage },
      ]);
   };

   return (
      <dialog
         ref={modalRef}
         className='w-full h-full max-h-full max-w-full lg:w-modal lg:h-modal rounded-lg p-2 md:p-6'
      >
         <div
            className='absolute right-2 md:right-7 cursor-pointer'
            onClick={() => handleModal(false)}
         >
            <MdClose size={"1.5rem"} />
         </div>
         <div className='flex flex-col gap-4 h-full'>
            <div className='flex flex-col md:flex-row gap-3 items-baseline'>
               <h1 className='md:text-2xl'>{currentModalDetails.title}</h1>
               <MdInfoOutline onClick={() => infoRef.current?.show()} className='cursor-pointer' />
               <dialog
                  ref={infoRef}
                  className='w-3/5 h-fit border border-black top-14 p-6 rounded-lg'
               >
                  <div className='absolute top-2 right-2 cursor-pointer'>
                     <MdClose onClick={() => infoRef.current?.close()} />
                  </div>
                  <p className='text-sm'>{currentModalDetails?.desc}</p>
               </dialog>
            </div>
            <div
               ref={messagesEndRef}
               className='flex-1 flex flex-col gap-2 overflow-y-auto bg-[#f8f7f7] p-3 rounded-lg'
            >
               {messages.map((message, index) => (
                  <div
                     key={index}
                     className={`${
                        message.role === "chatbot" ? "bg-[#d7f2fb]" : "bg-[#eeecec]"
                     } flex w-fit rounded-lg text-sm md:text-base`}
                  >
                     <p className='w-14 p-2 border-r-[.0625rem] border-[#cccac9] text-center'>
                        {message.role === "chatbot" ? "AI" : "User"}
                     </p>
                     <p className='p-2 flex-1'>{message.content}</p>
                  </div>
               ))}
            </div>
            <div>
               <form
                  action='submit'
                  onSubmit={handleSubmit}
                  className='flex flex-col gap-2 text-sm md:text-base'
               >
                  <label htmlFor='language'>Language:</label>
                  <select
                     name='language'
                     id='language'
                     className='border w-fit rounded-md p-[.125rem]'
                     onChange={handleInputs}
                  >
                     <option>Select a language</option>
                     <option value='c++'>C++</option>
                     <option value='java'>Java</option>
                     <option value='python'>Python</option>
                     <option value='python3'>Python3</option>
                     <option value='c'>C</option>
                     <option value='c#'>C#</option>
                     <option value='javascript'>JavaScript</option>
                     <option value='ruby'>Ruby</option>
                     <option value='swift'>Swift</option>
                     <option value='go'>Go</option>
                     <option value='scala'>Scala</option>
                     <option value='kotlin'>Kotlin</option>
                     <option value='rust'>Rust</option>
                     <option value='php'>PHP</option>
                     <option value='typescript'>TypeScript</option>
                     <option value='racket'>Racket</option>
                     <option value='erlang'>Erlang</option>
                     <option value='elixir'>Elixir</option>
                     <option value='dart'>Dart</option>
                  </select>
                  <label htmlFor='code'>Function:</label>
                  <textarea
                     name='code'
                     id='code'
                     className='border resize-none h-32 rounded-lg p-2'
                     onChange={handleInputs}
                     value={inputValues.code}
                     placeholder='Enter a function here'
                  ></textarea>
                  <button className='border rounded-lg p-2 w-fit'>Submit</button>
               </form>
            </div>
         </div>
      </dialog>
   );
};

export default ChatModalFeature;
