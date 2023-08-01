// htmlFor making it a client interactive page
"use client";

import axios from "axios";
import React, {useState,useEffect} from "react"
import { useRouter } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { toast } from "react-hot-toast";
import Link from "next/link";

export default function ProfilePage(){
    const router=useRouter();
    const [data,setData]=useState('nothing');
    const onLogout=async()=>{
        try {
            console.log('hi');
            await axios.get('/api/users/logout');
            router.push('/login');
        } catch (error:any) {
            console.log(error.message);
            toast.error(error.message);
        }
    }
    const getUserData=async()=>{
        try {
            const user:any=await axios.get('/api/users/me');
            if(!user){
                return console.log('failed to access user data');
            }
            
            // because user.data has an object we returned from me/router
            // {message:"",data:""}
            // so we now access data._id of this object
            // console.log('hi');
            // console.log(user);
            setData(user.data._id);
        } catch (error:any) {
            console.log(error.message);
        }
    }
    useEffect(()=>{
        getUserData();
    },[])
    return(
        <div className="... flex flex-col min-h-screen items-center justify-center py-2">
            <h1>profile page</h1>
            <h2 className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">{data=="nothing"?"Nothing":<Link href={`/profile/${data}`}>Go to profile</Link>}</h2>
            <button 
                className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                onClick={onLogout}
            >
                Logout
            </button>
        </div>
    )
}