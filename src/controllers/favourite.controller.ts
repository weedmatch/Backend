import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import ResponseHelper from "../utils/response";
import FavouriteService from "../services/favourite.service";

/**
 * @author Okpe Onoja <okpeonoja18@gmail.com>
 * @description Get all liked user
 * @route `/api/v1/favourite/get-liked-users`
 * @access Private
 * @type GET
 **/
export const getAllLikedUsers = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const userId = req.user?.id;
  
        if (!userId) {
          return next(new AppError("User ID is required.", ResponseHelper.BAD_REQUEST));
        }
  
        const likedUsers = await FavouriteService.getAllLikedUsers(req.user?.id);
  
        ResponseHelper.sendSuccessResponse(res, {
          statusCode: ResponseHelper.OK,
          data: likedUsers,
        });
      } catch (error) {
        console.log(error);
        return next(new AppError("An error occurred. Please try again.", ResponseHelper.INTERNAL_SERVER_ERROR));
      }
    }
);

/**
 * @author Okpe Onoja <okpeonoja18@gmail.com>
 * @description Liker user
 * @route `/api/v1/favourite/like-user`
 * @access Private
 * @type POST
 **/
export const likeUser = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        try {

            // Check if the user has already liked the other user
            const alreadyLiked = await FavouriteService.hasUserLiked(req.user?.id, req.params.likedUserId);

            if (alreadyLiked) {
                return next(new AppError("You have already liked this user.", ResponseHelper.BAD_REQUEST));
            }

            const profile = await FavouriteService.likeUser(req.user?.id, req.params.likedUserId);

            ResponseHelper.sendSuccessResponse(res, {
                statusCode: ResponseHelper.OK,
                data: { profile },
            });
        } catch (error) {
            console.log(error);
            return next(new AppError("An error occurred. Please try again.", ResponseHelper.INTERNAL_SERVER_ERROR));
        }
    }
);


/**
 * @author Okpe Onoja <okpeonoja18@gmail.com>
 * @description Unlike user
 * @route `/api/v1/favourite/unlike-user`
 * @access Private
 * @type POST
 **/
export const unlikeUser = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      try {
  
        const alreadyLiked = await FavouriteService.hasUserLiked(req.user?.id, req.params.likedUserId);

        if (alreadyLiked) {
            return next(new AppError("You have already liked this user.", ResponseHelper.BAD_REQUEST));
        }
        
        const result = await FavouriteService.unlikeUser(req.user?.id, req.params.userId);
  
        if (!result) {
          return next(new AppError("Failed to unlike user. User may not have been liked.", ResponseHelper.RESOURCE_NOT_FOUND));
        }
  
        ResponseHelper.sendSuccessResponse(res, {
          statusCode: ResponseHelper.OK,
          message: "User unliked successfully",
        });
      } catch (error) {
        console.log(error);
        return next(new AppError("An error occurred. Please try again.", ResponseHelper.INTERNAL_SERVER_ERROR));
      }
    }
  );

