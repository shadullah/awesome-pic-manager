// import { NextRequest, NextResponse } from "next/server";
export { auth as middleware } from "@/auth"


// export function middleware(req:NextRequest){
//     return NextResponse.redirect(new URL('/',req.url))
// }

export const config={
    matcher:[
        '/signin',
        'signup',
        '/',
        '/dashboard/path*',
        '/api/:path*'
    ],
    runtime:'nodejs'
}