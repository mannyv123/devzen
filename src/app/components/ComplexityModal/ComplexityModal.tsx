"use client";

import React, { FormEvent, RefObject } from "react";

interface ComplexityModalProps {
    complexityModalRef: RefObject<HTMLDialogElement>;
}

const ComplexityModal = ({ complexityModalRef }: ComplexityModalProps) => {
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
    };

    return (
        <dialog ref={complexityModalRef} className="w-modal h-modal rounded-lg p-6">
            <div>
                <form action="submit" onSubmit={handleSubmit}>
                    <label htmlFor="language">Language:</label>
                    <input type="text" name="language" id="language" className="border" />
                    <label htmlFor="code">Code:</label>
                    <textarea name="code" id="code" className="border"></textarea>
                    <button>Submit</button>
                </form>
            </div>
        </dialog>
    );
};

export default ComplexityModal;
