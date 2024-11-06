import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import ResponseHelper from "../utils/response";


/**
 * @author Okpe Onoja <okpeonoja18@gmail.com>
 * @description  Get all transactions
 * @route `/api/v1/transaction/all
 * @access Private
 * @type GET
 **/
export const getAll = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    try {

    } catch (error) {
        console.error(error);
        return next(new AppError("An error occurred. Please try again.", ResponseHelper.INTERNAL_SERVER_ERROR))
    }
});

/**
 * @author Okpe Onoja <okpeonoja18@gmail.com>
 * @description Get one transaction
 * @route `/api/v1/transaction/one-transaction/:id`
 * @access Private
 * @type GET
 **/
export const getOne = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error) {
        console.error(error);
        return next(new AppError("An error occurred. Please try again", ResponseHelper.INTERNAL_SERVER_ERROR))
    }
});



/**
 * @author Okpe Onoja <okpeonoja18@gmail.com>
 * @description query for transactions
 * @route `/api/v1/transaction
 * @access Private
 * @type GET
 **/
export const queryTransaction = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    try {

    } catch (error) {
        console.error(error);
        return next(new AppError("An error occurred. Please try again.", ResponseHelper.INTERNAL_SERVER_ERROR))
    }
});
  