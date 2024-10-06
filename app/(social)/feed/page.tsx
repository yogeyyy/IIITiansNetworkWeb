import PostFeed from "@/components/PostFeed";
import PostForm from "@/components/PostForm";
import connectDB from "@/mongodb/db";
import { Post } from "@/mongodb/models/post";
import { SignedIn } from "@clerk/nextjs";

export const revalidate = 0;

export default async function Feed() {
  await connectDB();
  const posts = await Post.getAllPosts();

  return (
    <div className="flex flex-col items-center w-full pt-10">
      <section className="w-full mb-8">
        {/* Post form */}
        <SignedIn>
          <PostForm />
        </SignedIn>
      </section>

      <section className="w-full">{/* Post feed */}
        <PostFeed posts={posts} />
      </section>
    </div>
  );
}
