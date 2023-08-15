import mongoose, { Schema, Document } from "mongoose";

interface TaskDocument extends Document {
    task: string;
    completed: boolean;
}

const taskSchema = new Schema(
    {
        task: {
            type: String,
            required: true,
        },
        completed: {
            type: Boolean,
            required: true,
        },
    },
    { timestamps: true }
);

const Task = mongoose.model<TaskDocument>("Task", taskSchema);

export default Task;
