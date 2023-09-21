import { TaskDocument } from "@/utils/types";
import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema(
   {
      task: {
         type: String,
         required: true,
      },
      completed: {
         type: Boolean,
         required: true,
         default: false,
      },
      elapsedTime: {
         type: Number,
         required: true,
         default: 0,
      },
   },
   { timestamps: true },
);

const TaskModel = mongoose.models.Task || mongoose.model<TaskDocument>("Task", taskSchema);

export default TaskModel;
