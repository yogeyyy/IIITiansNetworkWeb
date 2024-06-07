"use client";

import { IPostDocument } from "@/mongodb/models/post";
import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Image from "next/image";

export default function Post({ post }: { post: IPostDocument }) {
  const user = useUser();

  const isAuthor = user.user?.id === post.user.userId;
  return (
    <div className="w-full p-6 rounded-[1.5rem] bg-slate-800 bg-opacity-15 backdrop-filter backdrop-blur-x">
      {/* post author */}
      <div className="flex items-start space-x-4">
        <Avatar>
          <AvatarImage src={post.user.userImage} />
          <AvatarFallback>
            {post.user.firstName.charAt(0)}
            {post.user.lastName?.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-sm font-bold">
            {post.user.firstName} {post.user.lastName}
          </h2>
          <p className="text-sm">2 hours ago</p>
        </div>
      </div>
      {/* post content */}
      <div className="py-4">
        <p className="text-base">{post.text}</p>
      </div>
      {/* post image */}
      {post.imageUrl && (
        <div className="w-full">
          <img src={post.imageUrl} alt={`Post by ${post.user.firstName}`}/>
        </div>
      )}

      {/* Post actions */}
    </div>
  );
}
