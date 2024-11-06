import mongoose, { Document, Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Iuser } from "../types/interfaces/user.inter";
import { UserType } from "../types/enums/user";
import { Feature } from "../types/enums/admin";


const userSchema = new Schema<Iuser>({
	username: {
		type: String,
	},
	email: {
		type: String,
		unique: true,
		index: true,
		lowercase: true,
	},
    phone: {
		type: String,
	},
	userType: {
		  type: String,
		  enum: Object.values(UserType),
	},
	password: {
		type: String,
		required: true,
		select: false,
	},
	image: {
		type: String,
		default: '',
	},
	qr: {
		type: String,
		default: '',
	},
	favouriteWay: {
        selectedOption: { 
			type: String, 
		},
        otherOption: { 
			type: String 
		}
    },
	oftenIndulge: {
        selectedOption: { 
			type: String, 
		},
        otherOption: { 
			type: String 
		}
    },
	preferredStrain: {
        selectedOption: { 
			type: String, 
		},
        otherOption: { 
			type: String 
		}
    },
	preferBalance: {
        selectedOption: { 
			type: String, 
		},
        otherOption: { 
			type: String 
		}
    },
	effectCana: {
        selectedOption: { 
			type: String, 
		},
        otherOption: { 
			type: String 
		}
    },
	recreOrMed: {
        selectedOption: { 
			type: String, 
		},
        otherOption: { 
			type: String 
		}
    },
	enjoyCana: {
        selectedOption: { 
			type: String, 

		},
        otherOption: { 
			type: String 
		}
    },
	favouriteWeed: [
		{
			type: String
		}
	],
	weedprofile: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Weedprofile",
		},
	],
	isActive: {
		type: Boolean,
		required: true,
		default: false,
	},
	isAdmin: {
		type: Boolean,
		required: true,
		default: false,
	},
	onlineStatus: {
		type: Boolean,
		default: false,
	},
    verificationToken: {
			type: String
	},
	verificationTokenExpires: {
			type: Date
	},
    otp: {
        code: {
            type: Number
        },
        expiresAt: {
            type: Date
        }
    },
	resetPasswordToken: String,
	resetPasswordExpire: Date,
	verifyEmailToken: {
		type: String,
		select: false,
	},
	features: { 
		type: [String], 
		enum: Object.values(Feature), 
		default: [] 
	}, 
	createdAt: {
		type: Date,
		default: Date.now(),
	  },
});


userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
	  return next();
	}
  
	try {
	  const hashedPassword = await bcrypt.hash(this.password, 12);
	  this.password = hashedPassword;
	} catch (error) {

	  return next();
	}
  
	next();
});

  
userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY || '', {
      expiresIn: process.env.JWT_EXPIRES_IN || '',
    });
    return token;
};

userSchema.methods.correctPassword = async function(
    candidatePassword: string,
    userPassword: string
){
    return await bcrypt.compare(candidatePassword, userPassword)
}

function isValidObjectId(id: string): boolean {
	return mongoose.Types.ObjectId.isValid(id);
  }

userSchema.methods.changedPasswordAfter = function (JWTTimestamp: any) {
    if (this.passwordChangedAt) {
      const changedTimestamp = String(
        this.passwordChangedAt.getTime() / 1000
      );
  
      return JWTTimestamp < changedTimestamp;
    }
  
    // False means NOT changed
    return false;
};



const User = mongoose.model<Iuser>('User', userSchema)

export default User;