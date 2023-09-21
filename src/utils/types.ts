import { Document } from "mongoose";

export interface Task {
   _id: string;
   task: string;
   completed: boolean;
   elapsedTime: number;
   createdAt: Date;
   updatedAt: Date;
}

export type ModalOption = "complexity" | "bug" | "explain" | false;

export interface ModalDetails {
   option: ModalOption;
   title: string;
   desc: string;
}

//API TYPES
export interface TaskDocument extends Document {
   task: string;
   completed: boolean;
   elapsedTime: number;
}
