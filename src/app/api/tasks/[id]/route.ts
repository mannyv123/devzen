import TaskModel from "@/models/TaskModel";
import { TaskDocument } from "@/utils/types";
import { NextRequest, NextResponse } from "next/server";

//Delete a single task
export const DELETE = async (_req: NextRequest, { params }: { params: { id: string } }) => {
    const taskId = params.id;

    if (!taskId) {
        return new NextResponse("No task id provided", { status: 400 });
    }
    try {
        const response = await TaskModel.deleteOne({ _id: taskId });
        return new NextResponse(JSON.stringify(response), { status: 200 });
    } catch (err) {
        return new NextResponse(`Error deleting task: ${err}`, { status: 500 });
    }
};

//Change completion status of a specific task
export const PUT = async (_req: NextRequest, { params }: { params: { id: string } }) => {
    const taskId = params.id;

    if (!taskId) {
        return new NextResponse("No task id provided", { status: 400 });
    }

    try {
        const task: TaskDocument | null = await TaskModel.findById(taskId);

        if (!task) {
            return new NextResponse("Cannot find task", { status: 404 });
        }

        task.completed = !task.completed; //toggle status

        const response = await task.save();

        return new NextResponse(JSON.stringify(response), { status: 200 });
    } catch (err) {
        return new NextResponse(`Error changing task status: ${err}`, { status: 500 });
    }
};
