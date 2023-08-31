import { Document } from "mongoose";

export interface Task {
    _id: string;
    task: string;
    completed: boolean;
    elapsedTime: number;
    createdAt: Date;
    updatedAt: Date;
}

//API TYPES
export interface TaskDocument extends Document {
    task: string;
    completed: boolean;
    elapsedTime: number;
}
