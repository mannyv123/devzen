import Task from "@/models/Task";
import { NextRequest, NextResponse } from "next/server";

//Delete a single task
export const DELETE = async (_req: NextRequest, { params }: { params: { id: string } }) => {
    const taskId = params.id;

    if (!taskId) {
        return new NextResponse("No task id provided", { status: 400 });
    }
    try {
        const response = await Task.deleteOne({ _id: taskId });
        return new NextResponse(JSON.stringify(response), { status: 200 });
    } catch (err) {
        return new NextResponse(`Error deleting task: ${err}`, { status: 500 });
    }
};
