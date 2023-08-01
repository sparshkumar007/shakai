import { url } from 'inspector';
import { Router } from 'next/router';
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const path=request.nextUrl.pathname;
    const isGoingToSignUpOrLogin=path==='/login'||path==='/signup';
    const token=request.cookies.get('token')?.value||'';

    // if user going to login/signup page even if he have token(means he is authorized or logged in)
    if(isGoingToSignUpOrLogin&&token)
    {
        return NextResponse.redirect(new URL('/profile',request.nextUrl));
    }

    // if user is not autherized(no token) and he is going elsewhere than signup/login then redirect him back to login
    if(!isGoingToSignUpOrLogin&&!token)
    {
        return NextResponse.redirect(new URL('/login',request.nextUrl));
    }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/login',
    '/signup',
    '/profile'
  ],
}