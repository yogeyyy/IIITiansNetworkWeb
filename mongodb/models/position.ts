import mongoose, { Model, models, Schema } from "mongoose";

export interface PositionBase {
    positionTitle: string;
    positionDescription: string;
    positionRequirements: string;
    positionSkills: string;
    positionLocation: string;
}

export interface PositionData extends PositionBase, Document {
    createdAt: Date;
    updatedAt: Date;
}

// define document methods (for instance methods)
interface PositionMethods {
    // likePost(userId: string): Promise<void>;
    // unlikePost(userId: string): Promise<void>;
    // commentOnPost(comment: ICommentBase): Promise<void>;
    // getAllComments(): Promise<IComment[]>;
    // removePost(): Promise<void>;
    removePosition(): Promise<void>;
}

interface PositionStatics {
    getAllPositions(): Promise<PositionDocument[]>;
}

export interface PositionDocument extends PositionData, PositionMethods {} // single instance of a postion
interface PositionModel extends PositionStatics, Model<PositionDocument> {} // allpositions


const PositionSchema = new Schema<PositionDocument>(
    {
        positionTitle: { type: String, required: true },
        positionDescription: { type: String, required: true },
        positionRequirements: { type: String, required: true },
        positionSkills: { type: String, required: true },
        positionLocation: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

export const Position = (models.Position as PositionModel) || mongoose.model<PositionDocument, PositionModel>("Position", PositionSchema);