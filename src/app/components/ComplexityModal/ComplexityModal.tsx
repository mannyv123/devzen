"use client";

import React, { FormEvent, RefObject, useRef } from "react";
import { MdClose, MdInfoOutline } from "react-icons/md";

interface ComplexityModalProps {
    complexityModalRef: RefObject<HTMLDialogElement>;
}

const ComplexityModal = ({ complexityModalRef }: ComplexityModalProps) => {
    const infoRef = useRef<HTMLDialogElement>(null);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
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
                    <MdInfoOutline onClick={() => infoRef.current?.show()} />
                    <dialog ref={infoRef} className="w-3/5 h-fit border border-black top-14 p-6 rounded-lg">
                        <div className="absolute top-2 right-2 cursor-pointer">
                            <MdClose onClick={() => infoRef.current?.close()} />
                        </div>
                        <div>
                            <p className="text-sm">
                                Provide a function and the corresponding language it's written in and the
                                ChatGPT API will determine the function's time and space complexity with
                                explanations.
                            </p>
                        </div>
                    </dialog>
                </div>
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
                    <textarea name="code" id="code" className="border resize-none"></textarea>
                    <button>Submit</button>
                </form>
            </div>
        </dialog>
    );
};

export default ComplexityModal;
