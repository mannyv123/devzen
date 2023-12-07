import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "@/redux/features/tasksSlice";
import guestTasksReducer from "@/redux/features/guestTasksSlice";
import timerReducer from "@/redux/features/timerSlice";

const store = configureStore({
   reducer: { tasks: tasksReducer, guestTasks: guestTasksReducer, timer: timerReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
