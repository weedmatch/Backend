import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import ProfileValidator from "../validators/profile.validator";
import AppError from "../utils/appError";
import ResponseHelper from "../utils/response";
import ProfileService from "../services/profile.service";
import { cloudinary } from "../config/cloudinary";
import multer from "multer";
import AuthService from "../services/auth.service";


/**
 * @author Okpe Onoja <okpeonoja18@gmail.com>
 * @description Get users
 * @route `/api/v1/profile/get-users`
 * @access Private
 * @type GET
 **/
export const getUsers = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
  try {
      const profile = await ProfileService.getUsers()

      if(!profile ) {
          return next(new AppError("No user found", ResponseHelper.RESOURCE_NOT_FOUND))
      }

      ResponseHelper.sendSuccessResponse(res, { 
          statusCode: ResponseHelper.OK,
          data: profile ,  
      });

  } catch (error) {
    console.log(error)
    // logger.error('GET USERS ERROR!!!!!!:', error)
    return next(new AppError("An error occurred while trying to get users. Please try again.", ResponseHelper.INTERNAL_SERVER_ERROR))
  }
})



/**
 * @author Okpe Onoja <okpeonoja18@gmail.com>
 * @description Get profile
 * @route `/api/v1/profile/get-profile`
 * @access Private
 * @type GET
 **/
export const getProfile = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
  try {
      const profile = await ProfileService.getProfile(req.user?.id)

      if(!profile ) {
          return next(new AppError("No profile found", ResponseHelper.RESOURCE_NOT_FOUND))
      }

      ResponseHelper.sendSuccessResponse(res, { 
          statusCode: ResponseHelper.OK,
          data: profile ,  
      });

  } catch (error) {
    console.log(error)
    // logger.error('GET PROFILE ERROR!!!!!!:', error)
    return next(new AppError("An error occurred while trying to get your profile. Please try again.", ResponseHelper.INTERNAL_SERVER_ERROR))
  }
})


/**
 * @author Okpe Onoja <okpeonoja18@gmail.com>
 * @description Get users qr
 * @route `/api/v1/profile/get-qr`
 * @access Private
 * @type GET
 **/
export const getUsersQr = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
  try {
      const userQr = await AuthService.getUsersQr(req.user?.id)

      if(!userQr ) {
          return next(new AppError("No qr found for this user", ResponseHelper.RESOURCE_NOT_FOUND))
      }

      ResponseHelper.sendSuccessResponse(res, { 
          statusCode: ResponseHelper.OK,
          data: {userQr} ,  
      });

  } catch (error) {
    console.log(error)
    // logger.error('GET PROFILE QR ERROR!!!!!!:', error)
    return next(new AppError("An error occurred while trying to get your qr code. Please try again.", ResponseHelper.INTERNAL_SERVER_ERROR))
  }
})

/**
 * @author
 * @description Update profile
 * @route `/api/v1/profile/update-profile`
 * @access Private
 * @type PATCH
 **/
export const updateProfile = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  try {

    const validationResult = ProfileValidator.updateProfile(req.body);

    // if error, send error response
    if (validationResult.error) {
        return next(new AppError(validationResult.error.message, ResponseHelper.BAD_REQUEST));
    }
  
    const profile = await ProfileService.updateUserProfile(req.user?.id, req.body)

    if(!profile){
      return next(new AppError("User not found", ResponseHelper.RESOURCE_NOT_FOUND))
    }
  
    // send success response
    ResponseHelper.sendSuccessResponse(res, {
        message: 'Updated profile successfully',
        statusCode: ResponseHelper.OK,
        data: profile,
    });

  } catch (error) {
    // logger.error('UPDATE PROFILE ERROR!!!!!!:', error)
    return next(new AppError("An error occurred while trying to update your profile. Please try again.", ResponseHelper.INTERNAL_SERVER_ERROR))
  }
})


/**
 * @author
 * @description Update profile
 * @route `/api/v1/profile/`
 * @access Private
 * @type PATCH
 **/
export const updateFavouriteWay = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { selectedOption, otherOption } = req.body;

    const updatedProfile = await ProfileService.updateFavouriteWay(req.user?.id, selectedOption, otherOption);
    if (!updatedProfile) {
      return next(new AppError("User not found.", ResponseHelper.RESOURCE_NOT_FOUND));
    }
  
    ResponseHelper.sendSuccessResponse(res, {
      statusCode: ResponseHelper.OK,
      data: updatedProfile,
    });
  } catch (error) {
    return next(new AppError("An error occurred. Please try again.", ResponseHelper.INTERNAL_SERVER_ERROR))
  }
});


/**
 * @author
 * @description Update profile
 * @route `/api/v1/profile/`
 * @access Private
 * @type PATCH
 **/
export const updateOftenIndulge = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { selectedOption, otherOption } = req.body;

    const updatedProfile = await ProfileService.updateOftenIndulge(req.user?.id, selectedOption, otherOption);
    if (!updatedProfile) {
      return next(new AppError("User not found.", ResponseHelper.RESOURCE_NOT_FOUND));
    }
  
    ResponseHelper.sendSuccessResponse(res, {
      statusCode: ResponseHelper.OK,
      data: updatedProfile,
    });
  } catch (error) {
    return next(new AppError("An error occurred. Please try again.", ResponseHelper.INTERNAL_SERVER_ERROR))
  }
});

/**
 * @author
 * @description Update Preferred Strain
 * @route `/api/v1/profile/`
 * @access Private
 * @type PATCH
 **/
export const updatePreferredStrain = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { selectedOption, otherOption } = req.body;

    const updatedProfile = await ProfileService.updatePreferredStrain(req.user?.id, selectedOption, otherOption);

    if (!updatedProfile) {
      return next(new AppError("User not found.", ResponseHelper.RESOURCE_NOT_FOUND));
    }
  
    ResponseHelper.sendSuccessResponse(res, {
      statusCode: ResponseHelper.OK,
      data: updatedProfile,
    });
  } catch (error) {
    return next(new AppError("An error occurred. Please try again.", ResponseHelper.INTERNAL_SERVER_ERROR))
  }
});

/**
 * @author
 * @description Update Prefer Balance
 * @route `/api/v1/profile/`
 * @access Private
 * @type PATCH
 **/
export const updatePreferBalance = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { selectedOption, otherOption } = req.body;

    const updatedProfile = await ProfileService.updatePreferBalance(req.user?.id, selectedOption, otherOption);
    if (!updatedProfile) {
      return next(new AppError("User not found.", ResponseHelper.RESOURCE_NOT_FOUND));
    }
  
    ResponseHelper.sendSuccessResponse(res, {
      statusCode: ResponseHelper.OK,
      data: updatedProfile,
    });

  } catch (error) {
    return next(new AppError("An error occurred. Please try again.", ResponseHelper.INTERNAL_SERVER_ERROR))
  }
});


/**
 * @author
 * @description Update Effect Cana
 * @route `/api/v1/profile/`
 * @access Private
 * @type PATCH
 **/
export const updateEffectCana = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { selectedOption, otherOption } = req.body;

    const updatedProfile = await ProfileService.updateEffectCana(req.user?.id, selectedOption, otherOption);
    if (!updatedProfile) {
      return next(new AppError("User not found.", ResponseHelper.RESOURCE_NOT_FOUND));
    }
  
    ResponseHelper.sendSuccessResponse(res, {
      statusCode: ResponseHelper.OK,
      data: updatedProfile,
    });
  } catch (error) {
    return next(new AppError("An error occurred. Please try again.", ResponseHelper.INTERNAL_SERVER_ERROR))
  }
});


/**
 * @author
 * @description Update Recre or Med
 * @route `/api/v1/profile/`
 * @access Private
 * @type PATCH
 **/
export const updateRecreOrMed = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { selectedOption, otherOption } = req.body;

    const updatedProfile = await ProfileService.updateRecreOrMed(req.user?.id, selectedOption, otherOption);
    if (!updatedProfile) {
      return next(new AppError("User not found.", ResponseHelper.RESOURCE_NOT_FOUND));
    }
  
    ResponseHelper.sendSuccessResponse(res, {
      statusCode: ResponseHelper.OK,
      data: updatedProfile,
    });
  } catch (error) {
    return next(new AppError("An error occurred. Please try again.", ResponseHelper.INTERNAL_SERVER_ERROR))
  }
});

/**
 * @author
 * @description pdate Enjoy Cana
 * @route `/api/v1/profile/`
 * @access Private
 * @type PATCH
 **/
export const updateEnjoyCana = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { selectedOption, otherOption } = req.body;

    const updatedProfile = await ProfileService.updateEnjoyCana(req.user?.id, selectedOption, otherOption);
    if (!updatedProfile) {
      return next(new AppError("User not found.", ResponseHelper.RESOURCE_NOT_FOUND));
    }
  
    ResponseHelper.sendSuccessResponse(res, {
      statusCode: ResponseHelper.OK,
      data: updatedProfile,
    });
  } catch (error) {
    return next(new AppError("An error occurred. Please try again.", ResponseHelper.INTERNAL_SERVER_ERROR))
  }
});


/**
 * @author
 * @description Update profile picture
 * @route `/api/v1/profile/upload-image`
 * @access Private
 * @type PUT
 **/
export const uploadImage = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const upload = multer().single('image');

    upload(req, res, async (err: any) => {
      if (err) {
        return next (new AppError('Error uploading image.', ResponseHelper.BAD_REQUEST));
      }
        if (!req.file) {
          return new AppError('No file uploaded.', ResponseHelper.BAD_REQUEST);
        }

        const dataUrl = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;

        const result = await cloudinary.uploader.upload(dataUrl, {
          folder: 'user_images',
        });

        const imageUrl = result.secure_url;

        const profile = await ProfileService.uploadImage(req.user?.id, { ...req.body, image: imageUrl });

        if (!profile) {
          return new AppError('User not found', ResponseHelper.RESOURCE_NOT_FOUND);
        }

        ResponseHelper.sendSuccessResponse(res, {
          message: 'Uploaded profile image successfully',
          statusCode: ResponseHelper.OK,
          data: { profile },
        });
    });
  } catch (error) {
    next(new AppError('An error occurred while trying to upload profile image. Please try again.', ResponseHelper.INTERNAL_SERVER_ERROR));
  }
};

/**
 * @author
 * @description Delete member
 * @route `/api/v1/profile/delete-member/:id`
 * @access Private
 * @type DELETE
 **/
export const deleteMember = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  try {

    const profile = await ProfileService.deleteMember(req.user?.id)
 
    if(!profile){
      return next(new AppError("User not found", ResponseHelper.RESOURCE_NOT_FOUND))
    }

    // send response
     ResponseHelper.sendResponse(res, {
      message: "Profile deleted successfully",
      statusCode: ResponseHelper.OK 
      });

  } catch (error) {
    return next(new AppError("An error occurred while trying to get your profile. Please try again.", ResponseHelper.INTERNAL_SERVER_ERROR))
  }
});