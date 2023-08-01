import {connect} from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';

connect();

export async function POST(request:NextRequest){
    try {
        const reqBody:any=request.json();
        const {token}=reqBody;

        const user=await User.findById({
            verifyToken:token,
            // checking expiry > current time
            verifyTokenExpiry: {$gt: Date.now()}
        })

        if(!user){
            return NextResponse.json({
                message:"Invalid varify token"
            })
        }

        // verify the user
        user.isVerified=true;
        user.verifyToken=undefined;
        user.verifyTokenExpiry=undefined;

        return NextResponse.json({
            message:"User verified successfuly",
            success:true
        })

    } catch (error:any) {
        throw new error(error.message);
    }
}