"use client";

import { IPostDocument } from "@/mongodb/models/post";
import { useUser } from "@clerk/nextjs";
import { Avatar } from "./ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import ReactTimeago from "react-timeago";

export default function CommentFeed({ post }: { post: IPostDocument }) {
  const user = useUser();
//   const isAuthor = user.user?.id === post.user.userId;

  return (
    <div>
      {post.comments?.map((comment) => (
        <div key={comment._id as string} className="flex space-x-1">
          <Avatar>
            <AvatarImage src={comment.user.userImage} />
            <AvatarFallback>
              {comment.user.firstName.charAt(0)}
              {comment.user.lastName?.charAt(0)}
            </AvatarFallback>
          </Avatar>

          <div>
            <p className="font-semibold">
              {comment.user.firstName} {comment.user.lastName}
            </p>
            <p className="text-xs text-[#585C5F]">
              <ReactTimeago date={new Date(comment.createdAt)} />
            </p>
            <p>{comment.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
