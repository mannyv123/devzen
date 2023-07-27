"use client";

import React, { ChangeEvent, FormEvent, RefObject, useRef, useState } from "react";
import { MdClose, MdInfoOutline } from "react-icons/md";

interface Message {
    role: "user" | "chatbot";
    content: string;
}

interface ComplexityModalProps {
    complexityModalRef: RefObject<HTMLDialogElement>;
}

const initialValues = {
    language: "",
    code: "",
};

const ComplexityModal = ({ complexityModalRef }: ComplexityModalProps) => {
    const [messages, setMessages] = useState<Message[]>([
        {
            role: "chatbot",
            content: "Welcome! Please enter your function and language.",
        },
    ]);

    const [inputValues, setInputValues] = useState(initialValues);

    const infoRef = useRef<HTMLDialogElement>(null);

    const handleInputs = (e: ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.currentTarget;
        setInputValues({ ...inputValues, [name]: value });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        //TODO: add input/form validation

        setMessages((prevMessages) => [...prevMessages, { role: "user", content: inputValues.code }]);
    };

    return (
        <dialog ref={complexityModalRef} className="w-modal h-modal rounded-lg p-6">
            <div
                className="absolute right-7 cursor-pointer"
                onClick={() => complexityModalRef.current?.close()}
            >
                <MdClose size={"1.5rem"} />
            </div>
            <div>
                <div className="flex gap-3 items-baseline">
                    <h1 className="text-2xl">Calculate Time and Space Complexity</h1>
                    <MdInfoOutline onClick={() => infoRef.current?.show()} className="cursor-pointer" />
                    <dialog ref={infoRef} className="w-3/5 h-fit border border-black top-14 p-6 rounded-lg">
                        <div className="absolute top-2 right-2 cursor-pointer">
                            <MdClose onClick={() => infoRef.current?.close()} />
                        </div>
                        <p className="text-sm">
                            Provide a function and the corresponding language it's written in and the ChatGPT
                            API will determine the function's time and space complexity with explanations.
                        </p>
                    </dialog>
                </div>
                <div>
                    {messages.map((message, index) => (
                        <div key={index}>
                            <p>Role: {message.role}</p>
                            <p>Message: {message.content}</p>
                        </div>
                    ))}
                </div>
                <div>
                    <form action="submit" onSubmit={handleSubmit} className="flex flex-col">
                        <label htmlFor="language">Language:</label>
                        <select name="language" id="language" className="border">
                            <option>Select a language</option>
                            <option value="c++">C++</option>
                            <option value="java">Java</option>
                            <option value="python">Python</option>
                            <option value="python3">Python3</option>
                            <option value="c">C</option>
                            <option value="c#">C#</option>
                            <option value="javascript">JavaScript</option>
                            <option value="ruby">Ruby</option>
                            <option value="swift">Swift</option>
                            <option value="go">Go</option>
                            <option value="scala">Scala</option>
                            <option value="kotlin">Kotlin</option>
                            <option value="rust">Rust</option>
                            <option value="php">PHP</option>
                            <option value="typescript">TypeScript</option>
                            <option value="racket">Racket</option>
                            <option value="erlang">Erlang</option>
                            <option value="elixir">Elixir</option>
                            <option value="dart">Dart</option>
                        </select>
                        <label htmlFor="code">Code:</label>
                        <textarea
                            name="code"
                            id="code"
                            className="border resize-none"
                            onChange={handleInputs}
                            value={inputValues.code}
                        ></textarea>
                        <button>Submit</button>
                    </form>
                </div>
            </div>
        </dialog>
    );
};

export default ComplexityModal;
