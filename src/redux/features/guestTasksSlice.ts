import { Task } from "@/types/types";
import { SerializedError, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { RootState } from "../store";

interface TasksState {
   data: Task[];
   status: "idle" | "loading" | "succeeded" | "failed";
   error: SerializedError | null;
}

const initialState: TasksState = {
   data: [],
   status: "idle",
   error: null,
};

//guestTasksSlice
const guestTasksSlice = createSlice({
   name: "guestTasks",
   initialState,
   reducers: {
      addGuestTask(state, action) {
         const { task } = action.payload;
         const newTask: Task = {
            _id: uuidv4(),
            task: task,
            completed: false,
            elapsedTime: 0,
            createdAt: new Date().getTime(),
         };
         state.data.push(newTask);
      },
      deleteGuestTask(state, action) {
         const { taskId } = action.payload;
         const updatedTasks = state.data.filter((task) => task._id !== taskId);
         state.data = updatedTasks;
      },
      updateGuestTaskStatus(state, action) {
         const { taskId } = action.payload;
         const taskToUpdate = state.data.find((task) => task._id === taskId);
         if (taskToUpdate) {
            taskToUpdate.completed = !taskToUpdate?.completed;
         }
      },
      updateGuestTaskTime(state, action) {
         const { taskId, elapsedTime } = action.payload;
         const taskToUpdate = state.data.find((task) => task._id === taskId);
         if (taskToUpdate) {
            taskToUpdate.elapsedTime = elapsedTime;
         }
      },
   },
});

export const { addGuestTask, deleteGuestTask, updateGuestTaskStatus, updateGuestTaskTime } =
   guestTasksSlice.actions;

export default guestTasksSlice.reducer;

//Selectors
export const selectAllGuestTasks = (state: RootState): Task[] => state.guestTasks.data;
