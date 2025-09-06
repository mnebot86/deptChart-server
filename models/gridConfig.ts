import { Schema, model, Types } from 'mongoose';

const ColumnSchema = new Schema({
  key: { type: String, required: true },
  title: { type: String, required: true }
});

const SideColumnSchema = new Schema({
  key: { type: String, required: true },
  title: { type: String, required: true }
});

const GridConfigSchema = new Schema({
  unit: {
    type: String,
    enum: ['OFFENSE', 'DEFENSE', 'SPECIAL_TEAMS'],
    required: true
  },
  group: { type: Types.ObjectId, ref: 'Group', required: true },
  columns: [ColumnSchema],
  sideColumns: [SideColumnSchema],
}, { timestamps: true });

export const GridConfig = model('GridConfig', GridConfigSchema);
