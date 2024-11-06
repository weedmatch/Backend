import mongoose, { Document, Schema, Types } from "mongoose";

export interface Iwallet extends Document{
    _user: Schema.Types.ObjectId | string;
    image: string;
    name: string;
    bio: string;
    whatStrain: string
    effectStrain: string;
    howDescribe: string;
    whatMethod: string;
    createdAt: Date
}