"use server";

import { AddPostRequestBody } from "@/app/api/posts/route";
import { Post } from "@/mongodb/models/post";
import { IUser } from "@/types/user";
import { currentUser } from "@clerk/nextjs/server";

export default async function createPostAction(formData: FormData) {

    // auth().protect(); protects the route from unauthorized access
    // 
    const user = await currentUser();
    if(!user) { //check user present
        throw new Error("User not authenticated");
    }

    // store form data in variables
    const postInput = formData.get("postInput") as string;
    const postImage = formData.get("postImage") as File;

    let postImageUrl: string | undefined; //changeable 

    if(!postInput) { // check if post input is empty
        throw new Error("Post content is required");
    }

    // define user 
    const userDB: IUser = {
        userId: user.id,
        userImage: user.imageUrl,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
    }

    // upload image if present
    if(postImage.size > 0) {
        // create post w/ image
        // const body: AddPostRequestBody = {
        //     user: userDB,
        //     text: postInput,
        //     imageUrl: image_url,
        // }

        // await Post.create(body);

    } else {
        // create post w/o image
        const body: AddPostRequestBody = {
            user: userDB,
            text: postInput,
        };

        await Post.create(body);
    }

    // create post in database

    // revalidatePath("/");
}