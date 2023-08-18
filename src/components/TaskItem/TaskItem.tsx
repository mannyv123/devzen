import { Task } from "@/utils/types";
import React, { useState } from "react";
import {
    MdPauseCircleOutline,
    MdRemoveCircleOutline,
    MdOutlineTimer,
    MdOutlineTimerOff,
} from "react-icons/md";

interface TaskProps {
    task: Task;
    handleTaskCompletion: (taskId: string) => void;
}

const TaskItem = ({ task, handleTaskCompletion }: TaskProps) => {
    const [timerOn, setTimerOn] = useState<boolean>(true);

    return (
        <div className="flex justify-between items-center group">
            <div className="flex items-start gap-2">
                <input
                    type="checkbox"
                    name="task"
                    id={task._id}
                    checked={task.completed}
                    className="mt-[.3rem]"
                    onChange={() => handleTaskCompletion(task._id)}
                />
                <label htmlFor={task._id} className="">
                    {task.task}
                </label>
            </div>
            <div className="flex items-center gap-2">
                {timerOn && (
                    <div className="flex items-center gap-2">
                        <p>0:00:00</p>
                    </div>
                )}
                {/* <div className="lg:w-0 group-hover:w-16 flex gap-2 transition-width duration-300 ease-in-out"> */}
                <div className="w-16 flex gap-2 transition-width duration-300 ease-in-out">
                    {timerOn && <MdOutlineTimerOff />}
                    <MdOutlineTimer />
                    <MdRemoveCircleOutline />
                </div>
            </div>
        </div>
    );
};

export default TaskItem;
