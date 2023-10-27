import { Message, ModalDetails, ModalOption } from "@/types/types";
import React, { ChangeEvent, FormEvent, RefObject } from "react";
import { MdClose, MdInfoOutline } from "react-icons/md";

interface ChatModalUIProps {
   handleModal: (option: ModalOption) => void;
   selectedModal: ModalOption;
   currentModalDetails: ModalDetails;
   messages: Message[];
   handleInfoBox: (isOpen: boolean) => void;
   isInfoOpen: boolean;
   handleSubmit: (e: FormEvent) => Promise<void>;
   handleInputs: (e: ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>) => void;
   inputValues: {
      language: string;
      code: string;
   };
   messagesEndRef: RefObject<HTMLDivElement>;
}

function ChatModalUI({
   handleModal,
   selectedModal,
   currentModalDetails,
   messages,
   handleInfoBox,
   isInfoOpen,
   handleSubmit,
   handleInputs,
   inputValues,
   messagesEndRef,
}: ChatModalUIProps) {
   return (
      <>
         <div
            className='absolute right-2 cursor-pointer md:right-7'
            onClick={() => handleModal(selectedModal)}
         >
            <MdClose size={"1.5rem"} />
         </div>
         <div className='flex h-full flex-col gap-4'>
            <div className='flex flex-col items-baseline gap-3 md:flex-row'>
               <h1 className='md:text-2xl'>{currentModalDetails.title}</h1>
               <MdInfoOutline onClick={() => handleInfoBox(true)} className='cursor-pointer' />
               <dialog
                  open={isInfoOpen}
                  className='top-14 h-fit w-3/5 rounded-lg border border-black p-6'
               >
                  <div className='absolute right-2 top-2 cursor-pointer'>
                     <MdClose onClick={() => handleInfoBox(false)} />
                  </div>
                  <p className='text-sm'>{currentModalDetails?.desc}</p>
               </dialog>
            </div>
            <div
               ref={messagesEndRef}
               className='flex flex-1 flex-col gap-2 overflow-y-auto rounded-lg bg-[#f8f7f7] p-3'
            >
               {messages.map((message, index) => (
                  <div
                     key={index}
                     className={`${
                        message.role === "chatbot" ? "bg-[#d7f2fb]" : "bg-[#eeecec]"
                     } flex w-fit rounded-lg text-sm md:text-base`}
                  >
                     <p className='w-14 border-r-[.0625rem] border-[#cccac9] p-2 text-center'>
                        {message.role === "chatbot" ? "AI" : "User"}
                     </p>
                     <p className='flex-1 p-2'>{message.content}</p>
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
                     className='w-fit rounded-md border p-[.125rem]'
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
                     className='h-32 resize-none rounded-lg border p-2'
                     onChange={handleInputs}
                     value={inputValues.code}
                     placeholder='Enter a function here'
                  ></textarea>
                  <button className='w-fit rounded-lg border p-2'>Submit</button>
               </form>
            </div>
         </div>
      </>
   );
}

export default ChatModalUI;
