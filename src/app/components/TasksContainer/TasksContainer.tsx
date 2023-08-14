"use client";

import React, { ChangeEvent, FormEvent, use, useRef, useState } from "react";
import { MdTaskAlt } from "react-icons/md";
import TaskItem from "../TaskItem/TaskItem";
import { Task } from "@/utils/types";

//temporary
const sampleData: Task[] = [
    {
        id: "1",
        task: "this is task number 1",
        completed: true,
        timestamp: 1690774802633,
    },
    {
        id: "2",
        task: "this is task number 2. this is task number 2. this is task number 2. this is task number 2. this is task number 2",
        completed: false,
        timestamp: 1690774802633,
    },
    {
        id: "3",
        task: "this is task number 3",
        completed: true,
        timestamp: 1690774802633,
    },
];

const TasksContainer = () => {
    const [newTask, setNewTask] = useState("");
    const [expanded, setExpanded] = useState(false);
    const [taskData, setTaskData] = useState(sampleData);
    const tasksRef = useRef<HTMLDialogElement>(null);

    const completedTasks = taskData.filter((task) => task.completed);
    const uncompletedTasks = taskData.filter((task) => !task.completed);

    //handles expanding and closing the task dialog
    const handleTaskOpenToggle = () => {
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

    //handles input of new task
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTask(e.target.value);
    };

    //handles new task submission
    const handleNewTaskSubmit = (e: FormEvent) => {
        e.preventDefault();
        taskData.push({
            id: `${taskData.length + 1}`,
            task: newTask,
            completed: false,
            timestamp: Date.now(),
        });
        setNewTask("");
    };

    //handle task completion change
    const handleTaskCompletion = (taskId: string) => {
        const updatedTasks = taskData.map((taskObj) =>
            taskObj.id === taskId ? { ...taskObj, completed: !taskObj.completed } : taskObj
        );

        setTaskData(updatedTasks);
    };

    return (
        <>
            <dialog
                ref={tasksRef}
                className={`w-full lg:w-1/4  ml-0 bg-transparent pb-6 pt-16 px-4 focus:outline-none overflow-hidden transition-taskContainer duration-500 ease-in-out ${
                    expanded ? "h-full opacity-100" : "h-0 opacity-0"
                }`}
            >
                <div className="h-full w-full bg-white rounded-lg bg-opacity-90 overflow-y-auto">
                    <div className="flex flex-col gap-4 p-4">
                        <section>
                            <form action="submit" onSubmit={handleNewTaskSubmit}>
                                <input
                                    className="rounded-lg w-full px-2 py-1"
                                    placeholder="New task ..."
                                    type="text"
                                    name="newTask"
                                    id="newTask"
                                    onChange={handleInputChange}
                                    value={newTask}
                                />
                            </form>
                        </section>
                        <section className="">
                            <ul>
                                {uncompletedTasks.map((task) => (
                                    <li key={task.id} className="border-b-2 last:border-none">
                                        <TaskItem task={task} handleTaskCompletion={handleTaskCompletion} />
                                    </li>
                                ))}
                            </ul>
                        </section>
                        <section className="">
                            <h3>Completed</h3>
                            <ul>
                                {completedTasks.map((task) => (
                                    <li key={task.id} className="border-b-2 last:border-none">
                                        <TaskItem task={task} handleTaskCompletion={handleTaskCompletion} />
                                    </li>
                                ))}
                            </ul>
                        </section>
                    </div>
                </div>
            </dialog>
            <div
                className={`relative w-fit flex justify-center items-center ml-4 mt-3 cursor-pointer text-white border rounded-full pr-2 lg:pr-0 hover:pr-2 hover:opacity-100 group ${
                    expanded ? "lg:pr-2 lg:opacity-100" : "lg:pr-0 lg:opacity-40"
                }`}
                onClick={handleTaskOpenToggle}
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

export default TasksContainer;
