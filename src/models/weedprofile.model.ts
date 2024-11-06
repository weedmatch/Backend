import mongoose, { Document, Schema } from "mongoose";
import { Iweedprofile } from "../types/interfaces/weedprofile.inter";

const userSchema = new Schema<Iweedprofile>({
	_user: {
		required: true,
		type: mongoose.Types.ObjectId,
		ref: 'User'
	},
    image: {
		type: String,
		default: '',
	},
    weedname: {
        type: String,
    },
    weedbio: {
        type: String,
    },
	whatStrain: {
        selectedOption: { 
			type: String, 
		},
        otherOption: { 
			type: String 
		}
    },
	whatEffect: {
        selectedOption: { 
			type: String, 
		},
        otherOption: { 
			type: String 
		}
    },
	describeAroma: {
        selectedOption: { 
			type: String, 
		},
        otherOption: { 
			type: String 
		}
    },
	method: {
        selectedOption: { 
			type: String, 

		},
        otherOption: { 
			type: String 
		}
    },

	createdAt: {
		type: Date,
		default: Date.now(),
	  },
});





const Weedprofile = mongoose.model<Iweedprofile>('Weedprofile', userSchema)

export default Weedprofile;