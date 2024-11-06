import mongoose from "mongoose";
import User from "../models/user.model";
import Weedprofile from "../models/weedprofile.model";
import { Iweedprofile } from "../types/interfaces/weedprofile.inter";

export default class WeedprofileService{
    

    static async getProfilesByUserId(userId: string): Promise<Iweedprofile[]> {
        const profiles = await Weedprofile.find({ _user: userId });

        return profiles;
    }

static async createProfile(userId: string, data: Iweedprofile): Promise<Iweedprofile | null> {
    const user = await User.findById(userId);

    if (!user) {
        return null; 
    }

    // Create the new profile with the provided data and user reference
    const newProfile = await Weedprofile.create({
        ...data,
        _user: userId,
    });

    // Save the profile and add its ID to the user's profile list
    await newProfile.save();
    
    user.weedprofile.push(newProfile._id as mongoose.Schema.Types.ObjectId);
    await user.save();

    const fullProfile = await Weedprofile.findById(newProfile._id).lean();

    return fullProfile;
}



}