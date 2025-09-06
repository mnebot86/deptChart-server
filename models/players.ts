import mongoose, { Schema, Document, Model, Types } from 'mongoose';

enum FootballPosition {
  QB = 'quarterback',
  LG = 'leftGuard',
  RB = 'RB',
  FB = 'FB',
  WR = 'WR',
  TE = 'TE',
  C = 'C',
  OG = 'OG',
  OT = 'OT',
  DT = 'DT',
  DE = 'DE',
  LB = 'LB',
  CB = 'CB',
  S = 'S',
  K = 'K',
  P = 'P',
  LS = 'LS'
}

interface Assignment {
  unit: 'OFFENSE' | 'DEFENSE' | 'KICK_OFF' | 'KICK_OFF_RECEIVING' | 'PUNT' | 'PUNT_RECEIVING' | 'FIELD_GOAL';
  position: FootballPosition;
  string: '1st' | '2nd' | '3rd' | '4th';
}

interface IPlayer extends Document {
  _id: mongoose.Types.ObjectId;
  firstName: string;
  lastName: string;
  group: Types.ObjectId;
  assignments?: Assignment[];
}

const PlayerSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  group: { type: Types.ObjectId, ref: "Group", required: true },
  number: { type: String, required: false, default: null },
  assignments: [{
    unit: {
      type: String,
      enum: ['OFFENSE', 'DEFENSE', 'KICK_OFF', 'KICK_OFF_RECEIVING', 'PUNT', 'PUNT_RECEIVING', 'FIELD_GOAL'],
    },
    position: {
      type: String,
      // enum: Object.values(FootballPosition),
    },
    string: [{
      type: String,
      // enum: ['1st', '2nd', '3rd', '4th'],
    }]
  }],
}, {
  timestamps: true,
});

const Player: Model<IPlayer> =
  mongoose.models.Player || mongoose.model<IPlayer>('Player', PlayerSchema);

export default Player;
