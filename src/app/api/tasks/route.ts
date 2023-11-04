import TaskModel from "@/models/TaskModel";
import { TaskDocument } from "@/types/types";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { connectToDb } from "@/utils/db";

//Get all tasks
export const GET = async () => {
   await connectToDb();
   const session = await getServerSession(authOptions);
   if (!session) {
      return new NextResponse("User not authorized", { status: 401 });
   }

   try {
      const user = session.user.id;
      const result: TaskDocument[] = await TaskModel.find({ userId: user }).maxTimeMS(20000).sort({
         createdAt: "desc",
      });

      return new NextResponse(JSON.stringify(result), { status: 200 });
   } catch (err) {
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
