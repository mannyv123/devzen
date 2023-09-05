import { createTask } from "@/utils/api";
import React, { ChangeEvent, FormEvent, useState } from "react";

interface AddTaskFeatureProps {
   getAllTasks: () => Promise<void>;
}

function AddTaskFeature({ getAllTasks }: AddTaskFeatureProps) {
   const [newTask, setNewTask] = useState<string>("");
   const [isBlank, setIsBlank] = useState<boolean>(false);

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

   return (
      <form action='submit' onSubmit={handleNewTaskSubmit}>
         <input
            className={`rounded-lg w-full px-2 py-1 focus:outline-none ${
               isBlank ? "ring-2 ring-red-600" : "focus:ring-2"
            }`}
            placeholder='New task ...'
            type='text'
            name='newTask'
            id='newTask'
            onChange={handleInputChange}
            value={newTask}
         />
      </form>
   );
}

export default AddTaskFeature;
