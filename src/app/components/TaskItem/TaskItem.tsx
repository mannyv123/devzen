import { Task } from "@/utils/types";
import React, { useState } from "react";

interface TaskProps {
    task: Task;
    handleTaskCompletion: (taskId: string) => void;
}

const TaskItem = ({ task, handleTaskCompletion }: TaskProps) => {
    return (
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
    );
};

export default TaskItem;
