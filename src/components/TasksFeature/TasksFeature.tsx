"use client";

import React, { useRef, useState } from "react";
import TasksHeaderUI from "../TasksHeaderUI/TasksHeaderUI";
import TaskListFeature from "../TaskListFeature/TaskListFeature";

//TODO: make const variable for animation time

const TasksFeature = () => {
   const [expanded, setExpanded] = useState<boolean>(false);

   const tasksRef = useRef<HTMLDialogElement>(null);

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

   return (
      <>
         <TaskListFeature tasksRef={tasksRef} expanded={expanded} />
         <TasksHeaderUI
            expanded={expanded}
            handleTaskOpenToggle={handleTaskOpenToggle}
         />
      </>
   );
};

export default TasksFeature;
