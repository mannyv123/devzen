import { createTask, deleteTask, getTasks, updateElapsedTime, updateTaskStatus } from "@/utils/api";
import { NewTask, UserTask } from "@/types/types";
import { SerializedError, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface TasksState {
   data: UserTask[];
   status: "idle" | "loading" | "succeeded" | "failed";
   error: SerializedError | null;
}

const initialState: TasksState = {
   data: [],
   status: "idle",
   error: null,
};

//Thunk async API Calls
export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
   try {
      const response = await getTasks();
      return response;
   } catch (error) {
      console.error("Error fetching tasks: ", error);
   }
});

export const addTask = createAsyncThunk("tasks/addTask", async (taskData: NewTask) => {
   try {
      const response = await createTask(taskData);
      return response;
   } catch (error) {
      console.error("Error adding task: ", error);
   }
});

export const updateStatus = createAsyncThunk("tasks/updateStatus", async (taskId: string) => {
   try {
      const response = await updateTaskStatus(taskId);
      return response;
   } catch (error) {
      console.error("Error updating task: ", error);
   }
});

export const removeTask = createAsyncThunk("tasks/removeTask", async (taskId: string) => {
   try {
      const response = await deleteTask(taskId);
      return response;
   } catch (error) {
      console.error("Error deleting task: ", error);
   }
});

export const updateTaskElapsedTime = createAsyncThunk(
   "tasks/updateTaskElapsedTime",
   async (taskDetails: { taskId: string; elapsedTime: number }) => {
      try {
         await updateElapsedTime(taskDetails.taskId, taskDetails.elapsedTime);
         return taskDetails;
      } catch (error) {
         console.error("Error updating task elapsed time: ", error);
      }
   },
);

//tasksSlice definition
const tasksSlice = createSlice({
   name: "tasks",
   initialState,
   reducers: {},
   extraReducers(builder) {
      builder
         .addCase(fetchTasks.pending, (state) => {
            state.status = "loading";
         })
         .addCase(fetchTasks.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.data = action.payload;
         })
         .addCase(fetchTasks.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error;
         })
         .addCase(addTask.fulfilled, (state, action) => {
            if (action.payload) {
               state.data.push(action.payload);
            }
         })
         .addCase(updateStatus.fulfilled, (state, action) => {
            if (action.payload) {
               const { _id, completed, elapsedTime } = action.payload;
               const existingTask = state.data.find((task) => task._id === _id);
               if (existingTask) {
                  existingTask.completed = completed;
                  existingTask.elapsedTime = elapsedTime;
               }
            }
         })
         .addCase(removeTask.fulfilled, (state, action) => {
            if (action.payload) {
               const { taskId } = action.payload;
               const updatedTasks = state.data.filter((task) => task._id !== taskId);
               state.data = updatedTasks;
            }
         });
   },
});

export default tasksSlice.reducer;

//Selectors
export const selectAllTasks = (state: RootState): UserTask[] => state.tasks.data;
export const tasksStatus = (state: RootState) => state.tasks.status;
