import connectDB from "@/mongodb/db";
import { Post } from "@/mongodb/models/post";
import { auth, currentUser } from "@clerk/nextjs/server";
import { connect } from "http2";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { post_id: string } }
) {
  await connectDB();

  try {
    const post = Post.findById(params.post_id);

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ post });
  } catch (error) {
    return NextResponse.json(
      { error: `Error occured while fetching post ${error}` },
      { status: 500 }
    );
  }
}

export interface DeletePostRequestBody {
  userId: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: { post_id: string } }
) {
  auth().protect();

  await connectDB();

  // const { userId }: DeletePostRequestBody = await request.json();

try {
    const user = await currentUser();
    const post = await Post.findById(params.post_id).lean();

    if (!post) {
        return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    if (post.user.userId != user?.id) {
        return NextResponse.json(
            { error: "Unauthorized access" },
            { status: 401 }
        );
    }

    await post.removePost();
    
} catch (error) {
    return NextResponse.json(
      { error: `Error occured while deleting post ${error}` },
      { status: 500 }
    );
  }
}
