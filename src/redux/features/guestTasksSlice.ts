import { Task } from "@/types/types";
import { SerializedError, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

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
   name: "tasks",
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
   },
});

export const { addGuestTask } = guestTasksSlice.actions;

export default guestTasksSlice.reducer;
