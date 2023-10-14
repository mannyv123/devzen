import { UserDocument } from "@/types/types";
import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
   {
      name: {
         type: String,
         required: true,
      },
      email: {
         type: String,
         required: true,
      },
      password: {
         type: String,
      },
      accountType: {
         type: String,
         enum: ["credentials", "oauth"],
      },
   },
   { timestamps: true },
);

const UserModel = mongoose.models.User || mongoose.model<UserDocument>("User", userSchema);

export default UserModel;
