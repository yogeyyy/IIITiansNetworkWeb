import { IPostDocument } from "@/mongodb/models/post";
import Post from "./Post";

export default function PostFeed({ posts }: { posts: IPostDocument[] }) {
  return (
    <div className="space-y-8 pb-20">
      <div>
        <h1>Your Feed</h1>
      </div>

      {posts.map((post) => (
        <Post key={post._id as string} post={post} />
      ))}
    </div>
  );
}
