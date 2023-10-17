import { Document } from "mongoose";

export type Task = {
   _id: string;
   task: string;
   completed: boolean;
   elapsedTime: number;
   createdAt: Date;
};

export type UserTask = Required<Task> & {
   userId: string;
   updatedAt: Date;
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
   password?: string;
   accountType: "credentials" | "oauth";
}

export interface NewUser {
   name: string;
   email: string;
   password?: string;
   accountType: "credentials" | "oauth";
}
