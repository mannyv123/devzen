"use client";

import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { MdTaskAlt } from "react-icons/md";
import TaskItem from "../TaskItem/TaskItem";
import { Task } from "@/utils/types";
import { createTask, getTasks } from "@/utils/api";

const TasksContainer = () => {
    const [newTask, setNewTask] = useState<string>("");
    const [expanded, setExpanded] = useState<boolean>(false);
    const [taskData, setTaskData] = useState<Task[]>([]);
    const [isBlank, setIsBlank] = useState<boolean>(false);

    const tasksRef = useRef<HTMLDialogElement>(null);

    const completedTasks = taskData?.filter((task) => task.completed);
    const uncompletedTasks = taskData?.filter((task) => !task.completed);

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

    // Get tasks on load
    useEffect(() => {
        getAllTasks();
    }, []);

    // handle getting tasks
    const getAllTasks = async () => {
        const result = await getTasks();
        setTaskData(result);
    };

    //handles input of new task
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTask(e.target.value);

        if (isBlank) {
            setIsBlank(false);
        }
    };

    //handles new task submission
    const handleNewTaskSubmit = async (e: FormEvent) => {
        e.preventDefault();

        //input validation
        if (newTask === "") {
            return setIsBlank(true);
        }

        await createTask(newTask);
        await getAllTasks();
        setNewTask("");
    };

    //handle task completion change
    const handleTaskCompletion = (taskId: string) => {
        const updatedTasks = taskData.map((taskObj) =>
            taskObj._id === taskId ? { ...taskObj, completed: !taskObj.completed } : taskObj
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
                                    className={`rounded-lg w-full px-2 py-1 focus:outline-none ${
                                        isBlank ? "ring-2 ring-red-600" : "focus:ring-2"
                                    }`}
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
                                {uncompletedTasks?.map((task) => (
                                    <li key={task._id} className="border-b-2 last:border-none">
                                        <TaskItem task={task} handleTaskCompletion={handleTaskCompletion} />
                                    </li>
                                ))}
                            </ul>
                        </section>
                        <section className="">
                            <h3>Completed</h3>
                            <ul>
                                {completedTasks?.map((task) => (
                                    <li key={task._id} className="border-b-2 last:border-none">
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
