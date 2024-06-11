"use client";

import { IPostDocument } from "@/mongodb/models/post";
import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Image from "next/image";
import { HeartIcon, MessageCircleIcon, TrashIcon } from "lucide-react";
import { Badge } from "./ui/badge";
import ReactTimeago from "react-timeago";
import { Button } from "./ui/button";

export default function Post({ post }: { post: IPostDocument }) {
  const user = useUser();

  const isAuthor = user.user?.id === post.user.userId;
  return (
    <div className="w-full p-6 rounded-[1.5rem] bg-slate-800 bg-opacity-15 backdrop-filter backdrop-blur-x">
      {/* post author */}
      <div className="flex items-center justify-between">
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
              <Badge color="blue" className="ml-2">
                Author
              </Badge>
            </h2>
            <p className="text-sm">
              <ReactTimeago date={new Date(post.createdAt)} />
            </p>
          </div>
        </div>
        <div>{isAuthor && <Button variant={"outline"}><TrashIcon/></Button>}</div>
      </div>
      {/* post content */}
      <div className="py-4">
        <p className="text-base">{post.text}</p>
      </div>
      {/* post image */}
      {post.imageUrl && (
        <div className="w-full">
          <img
            src={post.imageUrl}
            alt={`Post by ${post.user.firstName}`}
            className="rounded-[1.25rem]"
          />
        </div>
      )}

      {/* Post actions */}
      <div className="w-full pt-4 flex gap-4">
        <div className="flex gap-2 items-center">
          <HeartIcon size={20} />
          <p>12.8k</p>
        </div>
        <div className="flex gap-2 items-center">
          <MessageCircleIcon size={20} />
          <p>Comment</p>
        </div>
      </div>
    </div>
  );
}
