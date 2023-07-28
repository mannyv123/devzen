"use client";

import React, { useRef } from "react";

const Tasks = () => {
    const tasksRef = useRef<HTMLDialogElement>(null);
    return (
        <>
            <dialog ref={tasksRef} className="w-1/4 h-full ml-0 bg-transparent pb-6 pt-10 pl-4">
                <div className="h-full w-full bg-white rounded-lg bg-opacity-90"></div>
            </dialog>
            <div className="relative w-fit ml-4 p-2 cursor-pointer text-white">
                <div onClick={() => tasksRef.current?.show()}>
                    <p>Tasks</p>
                </div>
            </div>
        </>
    );
};

export default Tasks;
