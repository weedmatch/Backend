import mongoose, { Document, Schema } from "mongoose";
import { UserType } from "../enums/user";
import { ilocation } from "./location.inter";
import { Feature } from "../enums/admin";

interface ICheckboxWithOther {
    selectedOption: string;
    otherOption?: string;
}

export interface Iweedprofile extends Document{
    _user: Schema.Types.ObjectId | string;
    image?: string | ''; 
    weedname: string;
    weedbio: string;
    whatStrain: string;
    whatEffect: ICheckboxWithOther;
    describeAroma: ICheckboxWithOther;
    method: ICheckboxWithOther;
    createdAt: Date;
}
