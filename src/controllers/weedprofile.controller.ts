import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import ResponseHelper from "../utils/response";
import WeedprofileService from "../services/weedprofile.service";
import logger from "../utils/logger";

/**
 * @author Okpe Onoja <okpeonoja18@gmail.com>
 * @description Get weedprofile
 * @route `/api/v1/weedprofile/get-profile`
 * @access Private
 * @type GET
 **/
export const getProfile = catchAsync(
    async(req: Request, res: Response, next: NextFunction)=>{
    try {
        const profile = await WeedprofileService.getProfilesByUserId(req.user?.id)
  
        if(!profile ) {
            return next(new AppError("No profile found", ResponseHelper.RESOURCE_NOT_FOUND))
        }
  
        ResponseHelper.sendSuccessResponse(res, { 
            statusCode: ResponseHelper.OK,
            data: profile ,  
        });
  
    } catch (error) {
      console.log(error)
    //   logger.error('GET PROFILE ERROR!!!!!!:', error)
      return next(new AppError("An error occurred while trying to get your profile. Please try again.", ResponseHelper.INTERNAL_SERVER_ERROR))
    }
})


/**
 * @author Okpe Onoja <okpeonoja18@gmail.com>
 * @description Create weed profile
 * @route `/api/v1/weedprofile/create-profile`
 * @access Private
 * @type POST
 **/
export const createProfile = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        try {

            // Check the number of profiles the user has already created
            const existingProfiles = await WeedprofileService.getProfilesByUserId(req.user?.id);

            if (existingProfiles.length >= 3) {
                return next(
                    new AppError("You can only create up to 3 profiles", ResponseHelper.FORBIDDEN)
                );
            }

            const newProfile = await WeedprofileService.createProfile(req.user?.id, req.body);

            if (!newProfile) {
                return next(
                    new AppError("User not found", ResponseHelper.RESOURCE_NOT_FOUND)
                );
            } 

            ResponseHelper.sendSuccessResponse(res, {
                message: "Profile created successfully",
                statusCode: ResponseHelper.OK,
                data: newProfile,
            });
        } catch (error) {
            console.error("Error:", error);
            // logger.error('CREATE PROFILE ERROR!!!!!!:', error)
            return next(
                new AppError(
                    "An error occurred. Please try again.",
                    ResponseHelper.INTERNAL_SERVER_ERROR
                )
            );
        }
    }
);
