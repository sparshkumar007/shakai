import mongoose from 'mongoose';

const userSchema=mongoose.Schema({
    username: {
        type: String,
        required: [true,'Username needed'],
        unique: true
    },
    password: {
        type: String,
        required: [true,'Password needed'],
    },
    email: {
        type: String,
        required: [true,'Email needed'],
        unique: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
});

const user=mongoose.models.users||mongoose.model('users',userSchema);

export default user;