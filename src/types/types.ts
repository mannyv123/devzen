import { Document } from "mongoose";

export interface NewUserData {
   newUser: {
      name: string;
      email: string;
      password: string;
   };
}

export interface User {
   _id: string;
   name: string;
   email: string;
   password?: string;
   accountType?: string;
   image: string;
   emailVerified: string;
}

export type Task = {
   _id: string;
   task: string;
   completed: boolean;
   elapsedTime: number;
   createdAt: number;
};

export type UserTask = Omit<Task, "createdAt"> & {
   userId: string;
   updatedAt: Date;
   createdAt: Date;
};

export type ModalOption = "complexity" | "bug" | "explain";

export interface ModalDetails {
   option: ModalOption;
   title: string;
   desc: string;
}

export interface Message {
   role: "user" | "chatbot";
   content: string;
}

export interface SignUpFormInputs {
   name: string;
   email: string;
   password: string;
   confirmPassword: string;
}

export interface SignUpFormErrors {
   name: {
      error: boolean;
      errorMessage: string;
   };
   email: {
      error: boolean;
      errorMessage: string;
   };
   password: {
      error: boolean;
      errorMessage: string;
   };
   confirmPassword: {
      error: boolean;
      errorMessage: string;
   };
}

type TimerRunning = {
   timerStatus: "running" | "paused";
   taskId: string;
   workTime: number;
   breakTime: number;
};

type TimerStopped = {
   timerStatus: "stopped";
};

export type PomodoroTimer = {
   timer: TimerRunning | TimerStopped;
};

//API TYPES
export interface TaskDocument extends Document {
   userId: string;
   task: string;
   completed: boolean;
   elapsedTime: number;
}

export interface UserDocument extends Document {
   name: string;
   email: string;
   password: string;
   accountType: string;
   image: string;
   emailVerified: string;
}

export interface UnsplashResponse {
   width: number;
   height: number;
   blur_hash: string;
   alt_description: string;
   urls: {
      full: string;
      regular: string;
   };
   links: {
      html: string;
   };
   user: {
      name: string;
      links: {
         html: string;
      };
   };
   location: {
      name: string;
   };
}
