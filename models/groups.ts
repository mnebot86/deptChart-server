import mongoose, { Schema, Document, Model, Types } from 'mongoose';

export interface IGroup extends Document {
  name: string;
  coaches: Types.ObjectId[];
}

const GroupSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    code: { type: String, required: true },
    coaches: [{ type: Types.ObjectId, ref: 'User' }],
  },
  {
    timestamps: true,
  }
);

const Group: Model<IGroup> = mongoose.models.Group || mongoose.model<IGroup>('Group', GroupSchema);

export default Group;
