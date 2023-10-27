import React, { ChangeEvent, FormEvent, useState } from "react";
import InputUI from "../InputUI/InputUI";
import { addTask } from "@/redux/features/tasksSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useSession } from "next-auth/react";
import { addGuestTask } from "@/redux/features/guestTasksSlice";

function AddTaskFeature() {
   const [taskInput, setTaskInput] = useState<string>("");
   const [isBlank, setIsBlank] = useState<boolean>(false);

   const { data: session } = useSession();
   const dispatch = useAppDispatch();

   //handles input of new task
   const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      setTaskInput(e.target.value);

      if (isBlank) {
         setIsBlank(false);
      }
   };

   //handles new task submission
   const handleNewTaskSubmit = async (e: FormEvent) => {
      e.preventDefault();

      //input validation
      if (taskInput === "") {
         return setIsBlank(true);
      }

      if (session) {
         const newTask: { task: string } = {
            task: taskInput,
         };

         await dispatch(addTask(newTask));
      } else {
         dispatch(addGuestTask({ task: taskInput }));
      }

      setTaskInput("");
   };

   return (
      <form action='submit' onSubmit={handleNewTaskSubmit}>
         <InputUI
            isBlank={isBlank}
            handleInputChange={handleInputChange}
            inputValue={taskInput}
            identifier='newTask'
            placeholderText='New task ...'
         />
      </form>
   );
}

export default AddTaskFeature;
