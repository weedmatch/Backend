import mongoose, { Document, Schema } from "mongoose";
import { UserType } from "../enums/user";
import { ilocation } from "./location.inter";
import { Feature } from "../enums/admin";

export interface IUser extends Document {
    fullname: string;
    email: string;
    userType: string;
    password: string;
    emailVerification: {
        token: string;
        expiresAt: Date;
    };
}

interface IOtp {
    code: number | null;
    expiresAt: Date | null;
}


interface ICheckboxWithOther {
    selectedOption: string;
    otherOption?: string;
}

export interface Iuser extends Document{
    username: string;
    email: string;
    phone: string;
    userType?: UserType;
    password: string;
    passwordConfirm: string;
    image?: string | ''; 
    qr: string;
    favouriteWay: ICheckboxWithOther;
    oftenIndulge: ICheckboxWithOther;
    preferredStrain: ICheckboxWithOther;
    preferBalance: ICheckboxWithOther;
    effectCana: ICheckboxWithOther;
    recreOrMed: ICheckboxWithOther;
    enjoyCana: ICheckboxWithOther;
    favouriteWeed: string[]
    weedprofile: Schema.Types.ObjectId[]
    isActive: boolean;
    isAdmin: boolean;
    onlineStatus: boolean;
    verificationToken: string;
    verificationTokenExpires: Date;
    otp: IOtp;
    features: Feature[];
    resetPasswordToken: number;
    resetPasswordExpire: Date;
    verifyEmailToken: string;
    generateUniqueEmployeeId(): Promise<void>;
    correctPassword(candidatePassword: string, userPassword: string): Promise<boolean>;
    generateAuthToken(): string;
    changedPasswordAfter(JWTTimestamp: any): boolean;
    createdAt: Date;
}
