import { IPostDocument } from "@/mongodb/models/post";
import { SignedIn, useUser } from "@clerk/nextjs";
import { HeartIcon, MessageCircleIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { LikePostRequestBody } from "@/app/api/posts/[post_id]/like/route";
import { UnlikePostRequestBody } from "@/app/api/posts/[post_id]/unlike/route";
import { set } from "mongoose";
import CommentFeed from "./CommentFeed";
import CommentForm from "./CommentForm";

export default function PostActions({ post }: { post: IPostDocument }) {
  const { user } = useUser();

  const [likes, setLikes] = useState(post.likes);
  const [liked, setLiked] = useState(false);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);

  useEffect(() => {
    if (user?.id && post.likes?.includes(user.id)) {
      setLiked(true);
    }
  }, [post, user]);

  const likeOrUnlikePost = async () => {
    if (!user?.id) {
      throw new Error("User not authenticated");
    }

    const originalLiked = liked;
    const originalLikes = likes;

    const newLikes = liked
      ? likes?.filter((like) => like !== user.id)
      : [...(likes ?? []), user.id];

    const body: LikePostRequestBody | UnlikePostRequestBody = {
      userId: user.id,
    };

    setLiked(!liked);
    setLikes(newLikes);

    const response = await fetch(
      `/api/posts/${post._id}/${liked ? "unlike" : "like"}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {
      setLiked(originalLiked);
      setLikes(originalLikes);
      throw new Error("Failed to like/unlike post");
    }

    const fetchLikesResponse = await fetch(`/api/posts/${post._id}/like`);
    if (!fetchLikesResponse.ok) {
      setLiked(originalLiked);
      setLikes(originalLikes);

      throw new Error("Failed to fetch likes");
    }

    const newLikesData = await fetchLikesResponse.json();
    setLikes(newLikesData);
  };

  return (
    <div className="w-full flex flex-col px-6 pb-6">
      <div className="w-full flex gap-4">
        <div className="flex gap-2 items-center">
          <HeartIcon
            size={20}
            className={cn(liked && "text-blue-600 fill-blue-600")}
            onClick={likeOrUnlikePost}
          />
          {likes && likes.length > 0 && <p>{likes.length}</p>}
        </div>
        <div className="flex gap-2 items-center">
          <MessageCircleIcon
            size={20}
            className={cn(isCommentsOpen && "text-yellow-600 fill-yellow-600")}
            onClick={() => setIsCommentsOpen(!isCommentsOpen)}
          />
        </div>
      </div>

      {isCommentsOpen && (
        <div className="bg-slate-500">
          <SignedIn>
            <CommentForm postId={post._id as string}/>
          </SignedIn>
          <CommentFeed post={post} />
        </div>
      )}
    </div>
  );
}
