import { Document, Types } from "mongoose";

export interface IFavourite extends Document {
  user: Types.ObjectId; 
  likedUser: Types.ObjectId;
  createdAt: Date;
}
