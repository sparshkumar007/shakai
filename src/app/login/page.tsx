// htmlFor making it a client interactive page
"use client";

import React,{useEffect, useState} from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios, { Axios } from "axios";
import { toast } from "react-hot-toast";


export default function LoginPage(){
    const router=useRouter();
    const [user,setUser]=useState({
        email:"",
        password:""
    })
    const [disabled,setDisabled]=useState(true);
    const [loading,setLoading]=useState(false);
    const onLogin=async ()=>{
        try{
            setLoading(true);
            const userData=await axios.post('/api/users/login',user);
            console.log('User logged In successfully',userData);
            router.push('/profile');
        } catch (error:any) {
            console.log('Login failed!!',error.message);
            toast.error(error.message);
        } finally{
            setLoading(false);
        }
    }
    useEffect(()=>{
        if(user.email.length>0&&user.password.length>0)
        {
            setDisabled(false);
        }
        else
        {
            setDisabled(true);
        }
    },[user])
    return(
    <div className="... flex flex-col min-h-screen items-center justify-center py-2">
        <h1>{loading?"Processing":"Login"}</h1>
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
            onClick={onLogin}
        >
            {disabled?"NO Login":"Login"}
        </button>
        <Link 
            href="/signup"
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
        >
            go to SignUp
        </Link>
    </div>
    )
}