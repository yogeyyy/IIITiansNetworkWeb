"use server";

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
    

    // upload image if present

    // create post in database

    // revalidatePath("/");
}