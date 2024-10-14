"use server";

import connectDB from "@/mongodb/db";
import { Position, PositionBase } from "@/mongodb/models/position";
import { currentUser } from "@clerk/nextjs/server";

export default async function createPositionAction(data: PositionBase) {
    await connectDB(); 
    const user = await currentUser();
    
    if(!user) { //check user present
        throw new Error("User not authenticated");
    }

    if(!data) { // check if position input is empty
        throw new Error("Position content is required");
    }

    try {
        await Position.create(data);
    } catch (error) {
        throw new Error(`Error creating position: ${error}`);
    }
}