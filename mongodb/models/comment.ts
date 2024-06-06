import { IUser } from "@/types/user";
import mongoose, { Schema, Document, models, Model } from "mongoose";

export interface ICommentBase {
  user: IUser;
  text: string;
}

export interface IComment extends ICommentBase, Document {
  createdAt: Date;
  updatedAt: Date;
}

// Comment Schema
const CommentSchema = new Schema<IComment>(
  {
    user: {
      userId: { type: String, required: true },
      userImage: { type: String, required: true },
      firstName: { type: String, required: true },
      lastName: { type: String },
    },
    text: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

// if not initialized, initialize the model
export const Comment = models.Comment ||  mongoose.model<IComment>("Comment", CommentSchema);
