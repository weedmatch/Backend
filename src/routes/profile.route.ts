import express from "express";
import { 
    getUsers,
    getProfile, 
    updateProfile, 
    uploadImage, 
    updateFavouriteWay,
    updateOftenIndulge,
    updatePreferredStrain,
    updatePreferBalance,
    updateEffectCana,
    updateRecreOrMed,
    updateEnjoyCana,
    deleteMember,
    getUsersQr,
} from "../controllers/profile.controller";

import {protect} from "../controllers/auth.controller";

const ProfileRouter = express.Router()

ProfileRouter.use(protect)

ProfileRouter.get('/get-users', getUsers)

ProfileRouter.get('/get-profile', getProfile)

ProfileRouter.get('/get-qr', getUsersQr)

ProfileRouter.patch('/update-profile', updateProfile);

ProfileRouter.put('/upload-image', uploadImage);

ProfileRouter.patch('/setup-favourite-way', updateFavouriteWay);

ProfileRouter.patch('/setup-often-indulge', updateOftenIndulge);

ProfileRouter.patch('/setup-preferred-strain', updatePreferredStrain);

ProfileRouter.patch('/setup-prefer-balance', updatePreferBalance);

ProfileRouter.patch('/setup-effect-cana', updateEffectCana);

ProfileRouter.patch('/setup-recre-or-med', updateRecreOrMed);

ProfileRouter.patch('/setup-enjoy-cana', updateEnjoyCana);

ProfileRouter.delete('/delete-profile', deleteMember)

export default ProfileRouter;