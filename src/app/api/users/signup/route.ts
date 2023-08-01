import mongoose from "mongoose";
import {connect} from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';
import { sendMail } from "@/helpers/mailer";

connect();

export async function POST(request:NextRequest){
    try {
        const reqBody=await request.json();
        const {username,email,password}=reqBody;
        // check if user already exists
        const user=await User.findOne({email});
        console.log('hi');
        if(user)
        {
            return NextResponse.json({message:"User already exists"},{status:400})
        }
        
        // hashing of password with salt
        const salt=await bcryptjs.genSalt(10);
        const hashedPassword=await bcryptjs.hash(password,salt);
        
        const newUser =new User({
            username,
            email,
            password:hashedPassword
        });
        
        const savedUser=await newUser.save();
        console.log(savedUser);
        // email verification
        await sendMail({
            email:newUser.email,
            emailType:"VERIFY",
            userId:newUser._id
        });
        
        return NextResponse.json({
            message:"User saved successfully",
            success:true,
            savedUser
        },{status:200});

    } catch (error:any) {
        return NextResponse.json({
            message:"Internal Server Error",
            error:error,
    },{status:500});
    }
}