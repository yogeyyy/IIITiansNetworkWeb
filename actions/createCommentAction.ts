"use server";

import { AddCommentRequestBody } from "@/app/api/posts/[post_id]/comments/route";
import { ICommentBase } from "@/mongodb/models/comment";
import { Post } from "@/mongodb/models/post";
import { IUser } from "@/types/user";
import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export default async function createCommentAction(postId:string, formData: FormData) {
    const user = await currentUser();
    auth().protect();
    const commentInput = formData.get("commentInput") as string;

    if(!user?.id){
        throw new Error("User not authenticated");
    }
    if(!postId) {
        throw new Error("PostId is required");
    }

    const post = await Post.findById(postId);
    if(!post) {
        throw new Error("Post not found");
    }

    if(!commentInput.trim()){
        throw new Error("Comment content is required");
    }

    const userDB: IUser = {
        userId: user.id,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        userImage: user.imageUrl || "",
    };

    const body: AddCommentRequestBody = {
        user: userDB,
        text: commentInput
    };

    const comment: ICommentBase = {
        user: userDB,
        text: commentInput
    };

    try {
        await post.commentOnPost(comment);
        revalidatePath('/');
    } catch (error) {
        throw new Error("Error adding comment");
    }

}