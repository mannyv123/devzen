import TaskModel from "@/models/TaskModel";
import { TaskDocument } from "@/types/types";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

//Get all tasks
export const GET = async () => {
   const session = await getServerSession(authOptions);
   if (!session) {
      return new NextResponse("User not authorized", { status: 401 });
   }
   console.log("session", session);
   try {
      const result: TaskDocument[] = await TaskModel.find({ userId: session.user.id }).sort({
         createdAt: "desc",
      });
      console.log("session", session);
      console.log("result", result);
      return new NextResponse(JSON.stringify(result), { status: 200 });
   } catch (err) {
      console.log(err);
      return new NextResponse(`Error getting tasks: ${err}`, { status: 500 });
   }
};

//Post a new task
export const POST = async (req: NextRequest) => {
   const session = await getServerSession(authOptions);
   if (!session) {
      return new NextResponse("User not authorized", { status: 401 });
   }

   const { task } = (await req.json()) as { task: string };
   if (!task) {
      return new NextResponse("Incomplete fields", { status: 400 });
   }

   try {
      const newTask: TaskDocument = new TaskModel({
         task: task,
         userId: session.user.id,
      });

      await newTask.save();

      return new NextResponse(JSON.stringify(newTask), { status: 201 });
   } catch (err) {
      return new NextResponse(`Error creating task: ${err}`, { status: 500 });
   }
};
