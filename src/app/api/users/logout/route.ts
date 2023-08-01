import { NextRequest, NextResponse } from "next/server";

export async function GET(){
    try {
        const response=NextResponse.json({
            message:'logout successful',
            success:true
        });
        response.cookies.delete("token");
        return response;
    } catch (error) {
        console.log(error);
        return NextResponse.json("oops");
    }
}