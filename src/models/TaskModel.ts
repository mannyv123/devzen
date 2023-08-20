import { TaskDocument } from "@/utils/types";
import mongoose, { Schema, Document } from "mongoose";

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

const TaskModel = mongoose.models.Task || mongoose.model<TaskDocument>("Task", taskSchema);

export default TaskModel;
