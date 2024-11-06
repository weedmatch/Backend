import { Iuser } from "../types/interfaces/user.inter";
import User from "../models/user.model";

export default class ProfileService {

  static async getUsers(): Promise<Iuser[]> {
    const userProfile = await User.find()
    .populate("weedprofile")

    if (!userProfile) {
      return [];
    }
    return userProfile;
  }
  


  static async getProfile(userId: string): Promise<Partial<Iuser> | null> {
    const userProfile = await User.findById(userId)
    .populate("weedprofile")

    if (!userProfile) {
      return null;
    }
    return userProfile;
  }

  static async uploadImage(
    userId: string,
    payload: Iuser
  ): Promise<Iuser | null> {
    const { image } = payload;

    const profile = await User.findByIdAndUpdate(
      userId,
      { image },
      { new: true }
    ).select("+email");
    return profile;
  }

  static async updateUserProfile(
    id: string,
    data: Iuser
  ): Promise<Iuser | null> {
    const profile = await User.findByIdAndUpdate(id, data, { new: true }).select(
      "+email"
    );
    return profile;
  }

  static async updateFavouriteWay(userId: string, selectedOption: string, otherOption: string): Promise<Iuser | null> {
    return await User.findByIdAndUpdate(
      userId,
      { favouriteWay: { selectedOption, otherOption } },
      { new: true }
    ).select("+email");
  }

  static async updateOftenIndulge(userId: string, selectedOption: string, otherOption: string): Promise<Iuser | null> {
    return await User.findByIdAndUpdate(
      userId,
      { oftenIndulge: { selectedOption, otherOption } },
      { new: true }
    ).select("+email");
  }

  static async updatePreferredStrain(userId: string, selectedOption: string, otherOption: string): Promise<Iuser | null> {
    return await User.findByIdAndUpdate(
      userId,
      { preferredStrain: { selectedOption, otherOption } },
      { new: true }
    ).select("+email");
  }

  static async updatePreferBalance(userId: string, selectedOption: string, otherOption: string): Promise<Iuser | null> {
    return await User.findByIdAndUpdate(
      userId,
      { preferBalance: { selectedOption, otherOption } },
      { new: true }
    ).select("+email");
  }

  static async updateEffectCana(userId: string, selectedOption: string, otherOption: string): Promise<Iuser | null> {
    return await User.findByIdAndUpdate(
      userId,
      { effectCana: { selectedOption, otherOption } },
      { new: true }
    ).select("+email");
  }

  static async updateRecreOrMed(userId: string, selectedOption: string, otherOption: string): Promise<Iuser | null> {
    return await User.findByIdAndUpdate(
      userId,
      { recreOrMed: { selectedOption, otherOption } },
      { new: true }
    ).select("+email");
  }

  static async updateEnjoyCana(userId: string, selectedOption: string, otherOption: string): Promise<Iuser | null> {
    return await User.findByIdAndUpdate(
      userId,
      { enjoyCana: { selectedOption, otherOption } },
      { new: true }
    ).select("+email");
  }

  static async deleteMember(id: string): Promise<Iuser | null> {
    const deleteMember = await User.findByIdAndDelete(id, { new: true });
    return deleteMember;
  }
}
