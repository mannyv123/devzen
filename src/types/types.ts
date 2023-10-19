import { Document } from "mongoose";

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
   image: string;
   emailVerified: string;
}
