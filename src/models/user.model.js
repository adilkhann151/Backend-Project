import mongoose, {Schema} from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        index: true,
        lowercase: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true
    },
    fullName : {
        type: String,
        required: true,
        index: true,
        trim: true
    },
    avatar :{
        type: string, // cloudinary url
        required: true
    },
    coverImage: {
        type: string
    },
    watchHistory: [
        {
            type: Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    password: {
        type: string,
        required: [true, "Password is required"]
    },
    refreshToken :{
        type: string
    }

}, {timestamps: true})


userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
})

userSchema.methods.isPasswordCorrect = async function (password){
    return await bcrypt.compare(password, this.password);
}

userSchema.method.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.method.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.Refresh_TOKEN_SECRET,
        {
            expiresIn: process.env.Refresh_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema);
