import NextAuth, { Session } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import dbConnect from "./lib/dbConnet";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";
import { JWT } from "next-auth/jwt";

// interface User{
//     _id:string;
//     email:string;
//     fullname:string;
//     password:string;
// }

export const {handlers, signIn, signOut,auth}= NextAuth({
    providers:[
        Credentials({
            credentials:{
                email:{label:"Email", type:"email"},
                password:{label:"Password", type:"password"}
            },
            async authorize(credentials){
                await dbConnect()
                try {
                    const user = await UserModel.findOne({
                        $or:[
                            {email:credentials.email}
                        ]
                    })
                    if(!user){
                        throw new Error("No user found with this email")
                    }
                    const passwordToCheck = credentials.password as string;
                    const hashedPassword = user.password;
                    const isPasswordCorrect = await bcrypt.compare(passwordToCheck, hashedPassword)
                    
                    if(isPasswordCorrect){
                        // return {
                        //     id:user.id.toString(),
                        //     name:user.fullname,
                        //     email:user.email
                        // }
                        return user
                    }
                    else{
                        throw new Error("password incorrect")
                    }
                } catch (error) {
                    throw new Error(error instanceof Error? error.message :String(error))
                }
            }
        })
    ],
    session:{
        strategy:"jwt"
    },
    pages:{
        signIn:'/signin'
    },
    callbacks:{
        async jwt({token, user}){
            if(user){
                token._id = user.id
                token.email=user.email
                token.name=user.fullname
            }
            return token
        },
        async session({session,token}:{session:Session; token:JWT}){
            if(token){
                session.user.id = token._id as string
                session.user.email=token.email
                session.user.fullname=token.fullname as string
            }
            return session
        }
    },
    secret:process.env.NEXTAUTH_SECRET
})