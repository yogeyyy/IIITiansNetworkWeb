import connectDB from "@/mongodb/db";
import { Position } from "@/mongodb/models/position";
import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    { params }: { params: { positionId: string } }
  ) {
    await connectDB();
  
    try {
      const position = await Position.getPositionById(params.positionId);
  
      if (!position) {
        return NextResponse.json({ error: "Position not found" }, { status: 404 });
      }
      
      return NextResponse.json({ position });
    } catch (error) {
      return NextResponse.json(
        { error: `Error occured while fetching post ${error}` },
        { status: 500 }
      );
    }
  }