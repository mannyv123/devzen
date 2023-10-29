"use client";

import React, { useRef, useState } from "react";
import TasksHeaderUI from "../TasksHeaderUI/TasksHeaderUI";
import TaskListFeature from "../TaskListFeature/TaskListFeature";

const ANIMATION_TIME = 700;

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
            }, ANIMATION_TIME);
         }
      }
   };

   return (
      <>
         <TaskListFeature tasksRef={tasksRef} expanded={expanded} />
         <TasksHeaderUI expanded={expanded} handleTaskOpenToggle={handleTaskOpenToggle} />
      </>
   );
};

export default TasksFeature;
