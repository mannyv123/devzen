"use client";

import React, { useRef, useState } from "react";
import { MdTaskAlt } from "react-icons/md";

//TODO: figure out why task dialog element doesn't have a smooth transition

interface Task {
    id: string;
    task: string;
    timestamp: number;
}

//temporary
const sampleData: Task[] = [
    {
        id: "1",
        task: "this is task number 1",
        timestamp: 1690774802633,
    },
    {
        id: "2",
        task: "this is task number 2. this is task number 2. this is task number 2. this is task number 2. this is task number 2",
        timestamp: 1690774802633,
    },
    {
        id: "3",
        task: "this is task number 3",
        timestamp: 1690774802633,
    },
];

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
                className={`w-full lg:w-1/4  ml-0 bg-transparent pb-6 pt-16 px-4 focus:outline-none overflow-hidden transition-height duration-700 ease-in-out ${
                    expanded ? "h-full" : "h-0"
                }`}
            >
                <div className="h-full w-full bg-white rounded-lg bg-opacity-90">
                    {/* <h3>Todo</h3>
                    <ul>
                        {sampleData.map((task) => (
                            <li key={task.id} className="border-b-2 last:border-none">
                                {task.task}
                            </li>
                        ))}
                    </ul> */}
                </div>
                {/* <div className="h-full w-full bg-white rounded-lg bg-opacity-90 p-4">
                    <h3>Completed</h3>
                    <ul>
                        {sampleData.map((task) => (
                            <li key={task.id} className="border-b-2 last:border-none">
                                {task.task}
                            </li>
                        ))}
                    </ul>
                </div> */}
            </dialog>
            <div
                className={`relative w-fit flex justify-center items-center ml-4 mt-3 cursor-pointer text-white border rounded-full pr-2 lg:pr-0 hover:pr-2 hover:opacity-100 group ${
                    expanded ? "lg:pr-2 lg:opacity-100" : "lg:pr-0 lg:opacity-40"
                }`}
                onClick={handleDialogToggle}
            >
                <div className="w-10 h-10 p-2">
                    <MdTaskAlt size={"1.5rem"} />
                </div>
                <p
                    className={`whitespace-nowrap overflow-hidden transition-width duration-300 text-center flex-1 group-hover:w-[2.625rem] group-hover:h-fit ${
                        expanded ? "lg:w-[2.625rem] h-fit" : "lg:w-0 lg:h-0"
                    }`}
                >
                    Tasks
                </p>
            </div>
        </>
    );
};

export default Tasks;
