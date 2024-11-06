import Favourite from "../models/favourite.model";
import { IFavourite } from "../types/interfaces/favourite.inter";
import { Types } from "mongoose";

export default class FavouriteService {

  static async getAllLikedUsers(userId: String): Promise<IFavourite[]> {
        const likedUsers = await Favourite.find({ user: userId }).populate("likedUser");
        return likedUsers;
  }
      
  static async likeUser(userId: String, likedUserId: String): Promise<IFavourite | null> {
    // Check if the like already exists
        const existingLike = await Favourite.findOne({ user: userId, likedUser: likedUserId });
        if (existingLike) return existingLike;

        const like = await Favourite.create({ user: userId, likedUser: likedUserId });
        return like;
  }

  static async unlikeUser(userId: string, likedUserId: string): Promise<boolean> {
        const result = await Favourite.findOneAndDelete({ user: userId, likedUser: likedUserId });
        return !!result; // Return true if a record was deleted, false if not
  }

    static async hasUserLiked(userId: String, likedUserId: String): Promise<boolean> {
        const existingLike = await Favourite.findOne({ user: userId, likedUser: likedUserId });
        return !!existingLike;
    }
}
