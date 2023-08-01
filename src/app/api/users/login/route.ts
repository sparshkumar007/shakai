import mongoose from "mongoose";
import {connect} from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';
import { toast } from "react-hot-toast";
import jwt from "jsonwebtoken";

connect();
export async function POST(request:NextRequest){
    try {
        const reqBody=await request.json();
        const {email,password}=reqBody;

        const user=await User.findOne({email});
        if(!user)
        {
            return NextResponse.json({message:'Enter correct credentials'},{status:400});
        }
        
        // verifying password
        console.log(user.password);
        const validatePassword=await bcryptjs.compare(password,user.password);
        if(!validatePassword)
        {
            return NextResponse.json({message:'Wrong Password'},{status:401});
        }

        // creating a token data to make and return a token to user logged in
        const tokenData={
            id:user._id,
            username:user.username,
            email:user.email
        }

        const secret = process.env.TOKEN_SECRET || "defaultSecret";

        // Sign the token with the secret
        const token = jwt.sign(tokenData, secret, { expiresIn: "1d" });
        const response=NextResponse.json({
            message:'user logined successfully',
            success:true,
        });
        response.cookies.set('token',token,{
            httpOnly:true
        })
        return response;
    } catch (error:any) {
        console.log(error.message);
        toast.error(error.message);
    }
}