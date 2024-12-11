import {mongoose} from './index.js';
import {validtionEmail} from '../common/validation.js';
import {validateMobile} from '../common/validation.js'

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required :[true, 'First Name is required']
    },

    lastName:{
        type: String,
        required :[true, 'Last Name is required']
    },

    email:{
        type: String,
        required :[true, 'Email is required'],
        validate:{
            validator:validtionEmail,
            message: props => `${props.value} is not a valid email!`

        }
    },
    mobile:{
        type:String,
        required:[true, 'Mobile is required'],
        validate:{
            validator:validateMobile,
            message: props => `${props.value} is not a valid number!`
        }
    },

    password:{
        type:String,
        required:[true, 'password is required']
    },
    role:{
        type:String,
        enum:{
            values:['User', 'Admin'],
            message: '{VALUE} is not supported'
        }
    },
    status:{
        type:Boolean,
        default:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    resetPasswordOtp: { type: Number },
    resetPasswordExpires: { type: Date },
}, {
    collection: 'user',
    versionKey: false
})

const user = new mongoose.model("user", userSchema);

export default user
