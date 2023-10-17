import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "@/redux/features/tasksSlice";
import guestTasksReducer from "@/redux/features/guestTasksSlice";

const store = configureStore({
   reducer: { tasks: tasksReducer, guestTasks: guestTasksReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
