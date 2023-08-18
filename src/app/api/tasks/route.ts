import Task from "@/models/Task";
import { NextRequest, NextResponse } from "next/server";

//Get all tasks
export const GET = async () => {
    try {
        const result = await Task.find().sort({ updatedAt: "desc" });
        return new NextResponse(JSON.stringify(result), { status: 200 });
    } catch (err) {
        return new NextResponse(`Error getting tasks: ${err}`, { status: 500 });
    }
};

//Post a new task
export const POST = async (req: NextRequest) => {
    const task = await req.json();

    if (!task) {
        return new NextResponse("Incomplete fields", { status: 400 });
    }

    try {
        const newTask = new Task({
            task: task.taskData,
            completed: false,
        });

        await newTask.save();

        return new NextResponse(JSON.stringify(newTask), { status: 201 });
    } catch (err) {
        return new NextResponse(`Error creating task: ${err}`, { status: 500 });
    }
};
