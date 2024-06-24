import { IPostDocument } from "@/mongodb/models/post";
import Post from "./Post";
import { Button } from "./ui/button";

export default function PostFeed({ posts }: { posts: IPostDocument[] }) {

  return (
    <div className="space-y-8 pb-20">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-black tracking-tight text-black">Your Feed</h1>

        <div className="flex gap-4 text-sm text-[#47372F]">
          <p className="font-bold" >Popular</p>
          <p className="">Following</p>
        </div>
      </div>

      {posts.map((post) => (
        <Post key={post._id as string} post={post} />
      ))}
    </div>
  );
}
