"use client";

import React, { useRef, useState } from "react";

const Tasks = () => {
    const [expanded, setExpanded] = useState(false);
    const tasksRef = useRef<HTMLDialogElement>(null);

    const handleDialogToggle = () => {
        if (tasksRef.current) {
            setExpanded(!expanded);
            if (!expanded) {
                tasksRef.current.show();
            } else {
                setTimeout(() => {
                    tasksRef.current?.close();
                }, 700);
            }
        }
    };

    return (
        <>
            <dialog
                ref={tasksRef}
                className={`w-1/4 ml-0 bg-transparent pb-6 pt-10 pl-4 focus:outline-none overflow-hidden transition-height duration-700 ease-in-out ${
                    !expanded ? "h-0" : "h-full"
                }`}
            >
                <div className="h-full w-full bg-white rounded-lg bg-opacity-90"></div>
            </dialog>
            <div className="relative w-fit ml-4 p-2 cursor-pointer text-white">
                <div onClick={handleDialogToggle}>
                    <p>Tasks</p>
                </div>
            </div>
        </>
    );
};

export default Tasks;
