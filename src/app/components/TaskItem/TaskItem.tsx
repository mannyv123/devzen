import { Task } from "@/utils/types";
import React, { useState } from "react";
import {
    MdPlayCircleOutline,
    MdPauseCircleOutline,
    MdRemoveCircleOutline,
    MdOutlineTimer,
} from "react-icons/md";

interface TaskProps {
    task: Task;
    handleTaskCompletion: (taskId: string) => void;
}

const TaskItem = ({ task, handleTaskCompletion }: TaskProps) => {
    return (
        <div className="flex justify-between items-center group">
            <div className="flex items-start gap-2">
                <input
                    type="checkbox"
                    name="task"
                    id={task.id}
                    checked={task.completed}
                    className="mt-[.3rem]"
                    onChange={() => handleTaskCompletion(task.id)}
                />
                <label htmlFor={task.id} className="">
                    {task.task}
                </label>
            </div>
            <div>
                <div className="bg-white lg:w-0 group-hover:w-12 flex gap-2 transition-width duration-300 ease-in-out">
                    <MdOutlineTimer />
                    <MdRemoveCircleOutline />
                </div>
            </div>
        </div>
    );
};

export default TaskItem;
