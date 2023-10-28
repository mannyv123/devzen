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
