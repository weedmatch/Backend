import mongoose, { Document, Schema } from "mongoose";
import { IFavourite } from "../types/interfaces/favourite.inter";

const favouriteSchema = new Schema<IFavourite>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  likedUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Favourite = mongoose.model<IFavourite>("Favourite", favouriteSchema);

export default Favourite;
