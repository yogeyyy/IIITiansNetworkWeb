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

export interface PositionProps extends PositionBase, Document {
    positionId: string;
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

export interface PositionDocument extends PositionData, PositionProps, PositionMethods {} // single instance of a postion
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


PositionSchema.statics.getAllPositions = async function () {
    try {
        const positions = await this.find().sort({ createdAt: -1 }).populate().lean();

        return positions.map((position: any) => ({
            positionId: position._id.toString(),
            positionTitle: position.positionTitle,
            positionDescription: position.positionDescription,
            positionRequirements: position.positionRequirements,
            positionSkills: position.positionSkills,
            positionLocation: position.positionLocation,
        }));

    } catch (error) {
        console.error("Error getting all positions", error);
    }
};

export const Position = (models.Position as PositionModel) || mongoose.model<PositionDocument, PositionModel>("Position", PositionSchema);