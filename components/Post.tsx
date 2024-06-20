"use client";

import { IPostDocument } from "@/mongodb/models/post";
import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Image from "next/image";
import { HeartIcon, MessageCircleIcon, TrashIcon } from "lucide-react";
import { Badge } from "./ui/badge";
import ReactTimeago from "react-timeago";
import { Button } from "./ui/button";
import deletePostAction from "@/actions/deletePostAction";
import PostActions from "./PostActions";
import { toast } from "sonner";

export default function Post({ post }: { post: IPostDocument }) {
  const user = useUser();

  const isAuthor = user.user?.id === post.user.userId;

  return (
    <div className="w-full postBg rounded-[1.5rem]">
      <div className="rounded-[1.5rem] backdrop-filter backdrop-blur-3xl flex flex-col space-y-4">
      {/* post author */}
      <div className="flex items-center justify-between px-6 pt-6">
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
        <div>
          {isAuthor && (
            <Button
              variant={"outline"}
              onClick={() => {
                const promise = deletePostAction(post._id as string);

                toast.promise(promise, {
                  loading: "Deleting post...",
                  success: "Post deleted!",
                  error: "Failed to delete post",
                });
              }}
            >
              <TrashIcon />
            </Button>
          )}
        </div>
      </div>
      {/* post content */}
      <div className="px-6">
        <p className="text-base">{post.text}</p>
      </div>
      {/* post image */}
      {post.imageUrl && (
        <div className="w-full px-6">
          <img
            src={post.imageUrl}
            alt={`Post by ${post.user.firstName}`}
            className="rounded-[1.25rem]"
          />
        </div>
      )}

      {/* Post actions */}
      <PostActions post={post}/>
      </div>
    </div>
  );
}
