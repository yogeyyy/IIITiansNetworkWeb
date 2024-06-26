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
    <div className="flex flex-col gap-3 pt-4">
      {post.comments?.map((comment) => (
        <div key={comment._id as string} className="flex space-x-3">
          <Avatar>
            <AvatarImage src={comment.user.userImage} />
            <AvatarFallback>
              {comment.user.firstName.charAt(0)}
              {comment.user.lastName?.charAt(0)}
            </AvatarFallback>
          </Avatar>

          <div>
            <div className="flex items-center space-x-2">
              <p className="font-semibold">
                {comment.user.firstName} {comment.user.lastName}
              </p>
              <p className="text-xs text-[#585C5F]">
                <ReactTimeago date={new Date(comment.createdAt)} />
              </p>
            </div>

            <p>{comment.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
