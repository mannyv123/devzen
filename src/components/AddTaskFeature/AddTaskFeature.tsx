import React, { ChangeEvent, FormEvent, useState } from "react";
import InputUI from "../InputUI/InputUI";

interface AddTaskFeatureProps {
   addTask: (newTask: string) => Promise<void>;
}

function AddTaskFeature({ addTask }: AddTaskFeatureProps) {
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

      await addTask(newTask);
      setNewTask("");
   };

   return (
      <form action='submit' onSubmit={handleNewTaskSubmit}>
         <InputUI
            isBlank={isBlank}
            handleInputChange={handleInputChange}
            inputValue={newTask}
            identifier='newTask'
            placeholderText='New task ...'
         />
      </form>
   );
}

export default AddTaskFeature;
