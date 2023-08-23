import { Document } from "mongoose";

export interface Task {
    _id: string;
    task: string;
    completed: boolean;
    createdAt: Date;
    updatedAt: Date;
}
//TODO: need to add start time and end time
//TODO: need to add that cant have end time without start time?

//API TYPES
export interface TaskDocument extends Document {
    task: string;
    completed: boolean;
}
