import { updateElapsedTime } from "@/utils/api";
import { Task } from "@/utils/types";
import { formatTime } from "@/utils/utils";
import React, { useEffect, useState } from "react";
import { MdRemoveCircleOutline, MdOutlineTimer, MdOutlineTimerOff } from "react-icons/md";

interface TaskProps {
    task: Task;
    handleTaskCompletion: (taskId: string) => void;
    handleTaskDelete: (taskId: string) => void;
}

const TaskItem = ({ task, handleTaskCompletion, handleTaskDelete }: TaskProps) => {
    const [timerRunning, setTimerRunning] = useState<boolean>(false);
    const [elapsedTime, setElapsedTime] = useState<number>(0);

    // Load saved timer from local storage
    useEffect(() => {
        const savedTimerJSON = localStorage.getItem(`timer_${task._id}`);
        const savedTimerLocal = savedTimerJSON
            ? JSON.parse(savedTimerJSON)
            : { running: false, startTime: 0, elapsedTime: task.elapsedTime };
        if (savedTimerLocal && savedTimerLocal.running) {
            setTimerRunning(true);
            const currentTime = new Date().getTime();
            const elapsedTimeTotal =
                Math.floor((currentTime - savedTimerLocal.startTime) / 1000) + savedTimerLocal.elapsedTime;
            setElapsedTime(elapsedTimeTotal);
        } else {
            setElapsedTime(task.elapsedTime);
        }
    }, []);

    //Start timer when timer state changes
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (timerRunning) {
            //Start interval to render per second updated elapsed time
            interval = setInterval(() => {
                setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [timerRunning]);

    //Toggle timer start and stop; Update local storage
    const toggleTimer = async () => {
        setTimerRunning((prevTimerRunning) => !prevTimerRunning); //starts or stops the timer
        if (!timerRunning) {
            //Runs after timer is started
            //Record start time in local storage
            const startTime = new Date().getTime();
            localStorage.setItem(
                `timer_${task._id}`,
                JSON.stringify({ running: true, startTime, elapsedTime: task.elapsedTime })
            );
        } else {
            //Runs after timer is stopped
            //Post end time to db
            await updateElapsedTime(task._id, elapsedTime);
            //Remove timer from local storage
            localStorage.removeItem(`timer_${task._id}`);
        }
    };

    return (
        <div className="flex justify-between items-center group my-2 lg:my-1">
            <div className="flex items-start gap-2">
                <input
                    type="checkbox"
                    name="task"
                    id={task._id}
                    checked={task.completed}
                    className="cursor-pointer mt-[.3rem]"
                    onChange={() => handleTaskCompletion(task._id)}
                />
                <label htmlFor={task._id} className="cursor-pointer">
                    {task.task}
                </label>
            </div>
            <div className="flex items-center gap-2">
                {elapsedTime > 0 && (
                    <div className="flex items-center gap-2">
                        <p>{formatTime(elapsedTime)}</p>
                    </div>
                )}
                {!task.completed && (
                    <div className="lg:w-0 lg:group-hover:w-12 flex gap-2 transition-width duration-300 ease-in-out">
                        {/* <div className="w-[5.5rem] lg:w-12 flex gap-2 transition-width duration-300 ease-in-out"> */}
                        {timerRunning ? (
                            <MdOutlineTimerOff
                                onClick={toggleTimer}
                                className="cursor-pointer w-10 lg:w-5 h-10 lg:h-5"
                            />
                        ) : (
                            <MdOutlineTimer
                                onClick={toggleTimer}
                                className="cursor-pointer w-10 lg:w-5 h-10 lg:h-5"
                            />
                        )}
                        <MdRemoveCircleOutline
                            onClick={() => handleTaskDelete(task._id)}
                            className="cursor-pointer w-10 lg:w-5 h-10 lg:h-5"
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default TaskItem;
