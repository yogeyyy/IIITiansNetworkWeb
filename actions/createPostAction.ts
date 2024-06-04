"use server";

import { currentUser } from "@clerk/nextjs/server";

export default async function createPostAction(formData: FormData) {

    // auth().protect(); protects the route from unauthorized access
    // 
    const user = await currentUser();
    if(!user) { //check user
        throw new Error("User not authenticated");
    }

    const postInput = formData.get("postInput") as string;
    const postImage = formData.get("postImage") as File;

    let postImageUrl: string | undefined;
}