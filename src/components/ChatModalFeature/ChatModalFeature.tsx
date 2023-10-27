"use client";

import { Message, ModalDetails, ModalOption } from "@/types/types";
import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";

import ChatModalUI from "../ChatModalUI/ChatModalUI";

//TODO: disable submit while waiting for api response
//TODO: message timestamps
//TODO: hover states
//TODO: form validation
//TODO: feature to save conversations
//TODO: feature to reset conversations
//TODO: look into non unique ID issue

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
   const [isInfoOpen, setIsInfoOpen] = useState(false);
   const [messages, setMessages] = useState<Message[]>([
      {
         role: "chatbot",
         content: "Welcome! Please enter your code and language.",
      },
   ]);

   const handleInfoBox = (isOpen: boolean) => {
      setIsInfoOpen(isOpen);
   };

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
         onKeyDown={(e) => {
            if (e.key === "Escape" && isModalOpen === true) {
               handleModal(selectedModal);
            }
         }}
         className='h-full max-h-full w-full max-w-full rounded-lg p-2 md:p-6 lg:h-modal lg:w-modal'
      >
         <ChatModalUI
            handleModal={handleModal}
            selectedModal={selectedModal}
            currentModalDetails={currentModalDetails}
            messages={messages}
            handleInfoBox={handleInfoBox}
            isInfoOpen={isInfoOpen}
            handleSubmit={handleSubmit}
            handleInputs={handleInputs}
            inputValues={inputValues}
            messagesEndRef={messagesEndRef}
         />
      </dialog>
   );
};

export default ChatModalFeature;
