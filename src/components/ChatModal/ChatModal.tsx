"use client";

import React, {
   ChangeEvent,
   FormEvent,
   RefObject,
   useEffect,
   useRef,
   useState,
} from "react";
import { MdClose, MdInfoOutline } from "react-icons/md";

//TODO: disable submit while waiting for api response
//TODO: message timestamps
//TODO: hover states
//TODO: form validation

interface Message {
   role: "user" | "chatbot";
   content: string;
}

interface ChatModalProps {
   modalRef: RefObject<HTMLDialogElement>;
   apiRoute: string;
   content: {
      title: string;
      desc: string;
   };
}

const initialValues = {
   language: "",
   code: "",
};

const ChatModal = ({ modalRef, apiRoute, content }: ChatModalProps) => {
   const [messages, setMessages] = useState<Message[]>([
      {
         role: "chatbot",
         content: "Welcome! Please enter your code and language.",
      },
   ]);

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

   const handleInputs = (
      e: ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>,
   ) => {
      const { name, value } = e.currentTarget;
      setInputValues({ ...inputValues, [name]: value });
   };

   const handleSubmit = async (e: FormEvent) => {
      e.preventDefault();

      setMessages((prevMessages) => [
         ...prevMessages,
         { role: "user", content: inputValues.code },
      ]);

      const result = await fetch(`/api/chatgpt/${apiRoute}`, {
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
            onClick={() => modalRef.current?.close()}
         >
            <MdClose size={"1.5rem"} />
         </div>
         <div className='flex flex-col gap-4 h-full'>
            <div className='flex flex-col md:flex-row gap-3 items-baseline'>
               <h1 className='md:text-2xl'>{content.title}</h1>
               <MdInfoOutline
                  onClick={() => infoRef.current?.show()}
                  className='cursor-pointer'
               />
               <dialog
                  ref={infoRef}
                  className='w-3/5 h-fit border border-black top-14 p-6 rounded-lg'
               >
                  <div className='absolute top-2 right-2 cursor-pointer'>
                     <MdClose onClick={() => infoRef.current?.close()} />
                  </div>
                  <p className='text-sm'>{content.desc}</p>
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
                        message.role === "chatbot"
                           ? "bg-[#d7f2fb]"
                           : "bg-[#eeecec]"
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
                  <button className='border rounded-lg p-2 w-fit'>
                     Submit
                  </button>
               </form>
            </div>
         </div>
      </dialog>
   );
};

export default ChatModal;
