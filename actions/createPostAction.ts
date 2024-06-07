"use server";

import { AddPostRequestBody } from "@/app/api/posts/route";
import connectDB from "@/mongodb/db";
import { Post } from "@/mongodb/models/post";
import { IUser } from "@/types/user";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

interface PostData {
    postContent: string;
    postImage: string | null;
}

export default async function createPostAction(data: PostData) {

    // auth().protect(); protects the route from unauthorized access
    
    await connectDB(); 
    const user = await currentUser();
    if(!user) { //check user present
        throw new Error("User not authenticated");
    }

    if(!data) { // check if post input is empty
        throw new Error("Post content is required");
    }

    // define user 
    const userDB: IUser = {
        userId: user.id,
        userImage: user.imageUrl,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
    }

    // upload image if present and create post
    try {

        if(data.postImage) {
            const body: AddPostRequestBody = {
                user: userDB,
                text: data.postContent,
                imageUrl: data.postImage,
            }
    
            await Post.create(body);
    
        } else {
            // create post w/o image
            const body: AddPostRequestBody = {
                user: userDB,
                text: data.postContent,
            };
    
            await Post.create(body);
        }
        
    } catch (error) {
        throw new Error(`Error creating post: ${error}`);
    }
    

    // revalidatePath("/");
    revalidatePath("/"); 
}