import TaskModel from "@/models/TaskModel";
import { TaskDocument } from "@/utils/types";
import { NextRequest, NextResponse } from "next/server";

//Change elapsed time for a specific task
export const PUT = async (
   req: NextRequest,
   { params }: { params: { id: string } },
) => {
   const taskId = params.id;
   const body: { elapsedTime: number } = await req.json();

   if (!taskId || !body) {
      return new NextResponse("Incomplete request info", { status: 400 });
   }

   try {
      const task: TaskDocument | null = await TaskModel.findById(taskId);

      if (!task) {
         return new NextResponse("Cannot find task", { status: 404 });
      }

      task.elapsedTime = body.elapsedTime;

      const response = await task.save();

      return new NextResponse(JSON.stringify(response), { status: 200 });
   } catch (err) {
      return new NextResponse(`Error changing task status: ${err}`, {
         status: 500,
      });
   }
};
