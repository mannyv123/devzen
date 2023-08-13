import React from "react";

interface TaskProps {
    id: string;
    task: string;
}

const Task = ({ id, task }: TaskProps) => {
    return (
        <div className="flex items-start">
            <input type="checkbox" name="task" id={id} className="" />
            <label htmlFor={id}>{task}</label>
        </div>
    );
};

export default Task;
