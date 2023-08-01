// htmlFor making it a client interactive page
"use client";

export default function ProfilePage({params}:any){
    return(
        <div className="... flex flex-col min-h-screen items-center justify-center py-2">
            <h1>Profile page</h1>
            <div>
            user profile
            <span className="text-black bg-orange-500 ">{params.id}</span>
            </div>
        </div>
    )
}