import User from '../models/user.model';
import { Iuser } from '../types/interfaces/user.inter';
import jwt from 'jsonwebtoken';
import { Response } from 'express';
import sendEmail from '../utils/sendEmail';
const otpGenerator = require('otp-generator');
import QRCode from 'qrcode';

export default class AuthService {


  static async createSendToken(user: Iuser, statusCode: number, res: Response): Promise<void> {
    const token = this.signToken(user._id as string);

    const expiresIn = process.env.JWT_COOKIE_EXPIRES_IN 
      ? Number(process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000 
      : null;

    const cookieOptions: { [key: string]: any } = {
      expiresIn: expiresIn ? new Date(Date.now() + expiresIn) : undefined,
      httpOnly: true,
    };

    // Ensure the cookie is secure in production
    if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

    // Send response with cookie and user data
    res.status(statusCode).cookie('jwt', token, cookieOptions).json({
      success: true,
      token,
      data: {
        user,
      },
    });
  }



  static async findUserById(userId: string): Promise<Iuser | null> {
    return User.findById(userId).select('+password');
  }

  static async findUserByEmail(email: string): Promise<Iuser | null> {
    const data = await User.findOne({ email }).select('+password');

    return data;
  }

  static async findUserByUsername(username: string): Promise<Iuser | null> {
    const data = await User.findOne({ username }).select('+password');

    return data;
  }

  static async findUserByOTP(email: string, otpCode: string): Promise<Iuser | null> {
    return User.findOne({
      email,
      "otp.code": otpCode,
      "otp.expiresAt": { $gte: new Date() }
    });
  }

  static signToken(id: string): string {
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY || 'mysecret', {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  }

  
  static async findUserfindOTP(otpCode: string): Promise<Iuser | null> {
    const user = await User.findOne({ 
      'otp.code': otpCode, 
      'otp.expiresAt':  { $gte: new Date() } , 
    });
    return user;
  }

  static async deleteUserById(userId: string): Promise<void> {
    await User.deleteOne({ _id: userId });
  }

  
  static async createUser(userData: Partial<Iuser>): Promise<Iuser> {
    const otp = this.generateOTP();
    const newUser = await User.create({
      ...userData,
      otp: {
        code: otp,
        expiresAt: new Date(Date.now() + 5 * 60 * 1000)
      }
    });

    await this.sendWelcomeEmail(newUser, otp);
    return newUser;
  }

  static async verifyUser(user: Iuser): Promise<void> {
    user.isActive = true;
    user.otp.code = null;
    await user.save({ validateBeforeSave: false });
    // await this.sendAccountActivationEmail(user);
  }

  static async resetPassword(
    user: Iuser, 
    newPassword: string,
    confirmPassword: string
  ): Promise<void> {
    user.password = newPassword;
    user.passwordConfirm = confirmPassword;
    user.otp.code = null;
    await user.save();
  }

  static async updatePassword(
    user: Iuser, 
    newPassword: string,
    confirmPassword: string
  ): Promise<void> {
    user.password = newPassword;
    user.passwordConfirm = confirmPassword;
    await user.save();
  }

  static generateOTP() {
    return otpGenerator.generate(4, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
    });
  }

  static async sendWelcomeEmail(user: Iuser, otp: string): Promise<void> {
    await sendEmail({
      to: user.email,
      subject: 'Welcome 🚀',
      templateName: 'welcome',
      placeholders: {
        username: user.username,
        otp: otp
      },
    });
  }

  static async sendAccountActivationEmail(user: Iuser): Promise<void> {
    await sendEmail({
      to: user.email,
      subject: 'Email Verification 🚀',
      templateName: 'account-activation',
      placeholders: {
        username: user.username,
      },
    });
  }

  static async sendForgotPasswordEmail(user: Iuser): Promise<void> {
    await sendEmail({
      to: user.email,
      subject: 'Verification Link 🚀!',
      templateName: 'forgot-password',
      placeholders: {
        username: user.username,
      },
    });
  }

  static async generateReferralId(fullname: string): Promise<string> {
    const username = fullname.split(' ')[0];
    const randomDigits = Math.floor(100 + Math.random() * 900);
    const randomLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    return `${username}${randomDigits}${randomLetter}`;
  }

  static async generateReferralIdByEmail(email: string): Promise<string> {
    const emailPrefix = email.split('@')[0];
    const randomDigits = Math.floor(100 + Math.random() * 900);
    const randomLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    return `${emailPrefix}${randomDigits}${randomLetter}`;
  }

  static async updateReferrerReferredUsers(referralId: string, newUserId: string): Promise<void> {
    if (referralId) {
      await User.updateOne(
        { 'referral.referralCode': referralId },
        { $push: { 'referral.referredUsers': newUserId } }
      );
    }
  }
  static async generateQR(user: Iuser): Promise<string> {
    const userDetails = {
      id: user._id,
      username: user.username,
      email: user.email,
      isActive: user.isActive,
    };
  
    try {
      const qrCodeDataURL = await QRCode.toDataURL(JSON.stringify(userDetails));
      user.qr = qrCodeDataURL; 
      await user.save(); 
      return qrCodeDataURL;
    } catch (error) {
      throw new Error('Failed to generate QR code');
    }
  }


  static async getUsersQr(userId: string): Promise<string | null> {
    const user = await this.findUserById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    if (!user.qr) {
      return null;
    }
    return user.qr;
  }

  
}
