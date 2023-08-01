// htmlFor making it a client interactive page
"use client";

import React,{useState,useEffect} from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import  axios  from "axios";
import { toast } from "react-hot-toast";
import { sendMail } from "@/helpers/mailer";


export default function SignupPage(){
    const router=useRouter();
    const [user,setUser]=useState({
        username:"",
        email:"",
        password:""
    })
    const [disabled,setDisabled]=useState(true);
    const [loading,setLoading]=useState(false);

    const onSignup=async ()=>{
        try {
            setLoading(true);
            const userData=await axios.post('/api/users/signup',user);
            console.log('User signed up successfully!!',userData);
            router.push('/login');
        } catch (error:any) {
            console.log('SignUp failed!!',error.message);
            toast.error(error.message);
        } finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
        if(user.username.length>0&&user.email.length>0&&user.password.length>0)
        {
            setDisabled(false);
        }
        else{
            setDisabled(true);
        }
    },[user]);

    return(
    <div className="... flex flex-col min-h-screen items-center justify-center py-2">
        <h1>{loading ? "Processing":"SignUp"}</h1>
        <label htmlFor="username">username</label>
        <input 
            className="g-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter your username" 
            value={user.username}
            id="username"
            type="text"
            onChange={(e)=>{
                setUser({...user,username:e.target.value})
            }}
        />
        <label htmlFor="email">email</label>
        <input 
            className="g-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter your email" 
            value={user.email} 
            id="email"
            type="email"
            onChange={(e)=>{
                setUser({...user,email:e.target.value})
            }}
        />
        <label htmlFor="password">password</label>
        <input 
            className="g-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter your password" 
            value={user.password}
            id="password"
            type="password"
            onChange={(e)=>{
                setUser({...user,password:e.target.value})
            }}
        />
        <br />
        <button
            className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            onClick={onSignup}
        >
            {disabled ? "No Signup":"Signup"}
        </button>
        <Link 
            href="/login"
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
        >
            go to Login
        </Link>
    </div>
    )
}