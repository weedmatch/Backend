import express from 'express';
import {
    getProfile,
    createProfile,
} from '../controllers/weedprofile.controller'
import { protect } from '../controllers/auth.controller';

const WeedProfileRouter = express.Router()

WeedProfileRouter.use(protect)

WeedProfileRouter.get('/get-profile', getProfile)

WeedProfileRouter.post('/create-profile', createProfile)

export default WeedProfileRouter;