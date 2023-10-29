"use client";

import React, { useState } from "react";
import ChatModalFeature from "../ChatModalFeature/ChatModalFeature";
import ChatGptUI from "../ChatGptUI/ChatGptUI";
import { Message, ModalOption } from "@/types/types";

const initialMessage: Message = {
   role: "chatbot",
   content: "Welcome! Please enter your code and language.",
};

function ChatGptFeature() {
   const [isComplexityModal, setIsComplexityModal] = useState<boolean>(false);
   const [isBugModal, setIsBugModal] = useState<boolean>(false);
   const [isExplainModal, setIsExplainModal] = useState<boolean>(false);

   const [complexityChat, setComplexityChat] = useState<Message[]>([initialMessage]);
   const [bugChat, setBugChat] = useState<Message[]>([initialMessage]);
   const [explainChat, setExplainChat] = useState<Message[]>([initialMessage]);

   const handleModal = (option: ModalOption) => {
      if (option === "complexity") {
         setIsComplexityModal((prev) => !prev);
      } else if (option === "bug") {
         setIsBugModal((prev) => !prev);
      } else if (option === "explain") {
         setIsExplainModal((prev) => !prev);
      }
   };

   const handleMessages = (message: string, role: "chatbot" | "user") => {
      const newMessage: Message = {
         role: role,
         content: message,
      };
      if (isComplexityModal) {
         setComplexityChat((prev) => [...prev, newMessage]);
      } else if (isBugModal) {
         setBugChat((prev) => [...prev, newMessage]);
      } else if (isExplainModal) {
         setExplainChat((prev) => [...prev, newMessage]);
      }
   };

   return (
      <>
         {isComplexityModal ? (
            <ChatModalFeature
               handleModal={handleModal}
               selectedModal='complexity'
               isModalOpen={isComplexityModal}
               messages={complexityChat}
               handleMessages={handleMessages}
            />
         ) : null}
         {isBugModal ? (
            <ChatModalFeature
               handleModal={handleModal}
               selectedModal='bug'
               isModalOpen={isBugModal}
               messages={bugChat}
               handleMessages={handleMessages}
            />
         ) : null}
         {isExplainModal ? (
            <ChatModalFeature
               handleModal={handleModal}
               selectedModal='explain'
               isModalOpen={isExplainModal}
               messages={explainChat}
               handleMessages={handleMessages}
            />
         ) : null}

         <ChatGptUI handleModal={handleModal} />
      </>
   );
}

export default ChatGptFeature;
