import express from 'express';
import {
    getAllLikedUsers,
    likeUser,
    unlikeUser
} from '../controllers/favourite.controller'
import { protect } from '../controllers/auth.controller';

const FavouriteRouter = express.Router()

FavouriteRouter.use(protect)

FavouriteRouter.get('/get-profile', getAllLikedUsers)

FavouriteRouter.post('/like-user/:likedUserId', likeUser)

FavouriteRouter.delete('/unlike-user/:likedUserId', unlikeUser)

export default FavouriteRouter;


