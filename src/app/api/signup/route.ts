import dbConnect from "@/lib/dbConnet";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";


export async function POST(request:Request){
    await dbConnect()
    try {
        const {fullname, email, password}= await request.json()
        const existingUserByEmail = await UserModel.findOne({email})

        if(existingUserByEmail){
            return Response.json({message:"Email already exists, Please Login!!"})
        }
        else{
            const hashedPassword = await bcrypt.hash(password, 10)
            const newUser = new UserModel({
                fullname, 
                email, 
                password:hashedPassword,
                posts:[]
            })

            await newUser.save()
        }

        return Response.json({
            success:true,
            message:"User registered successfully"
        }, {status:200})
        
    } catch (error) {
        console.log('error registering user', error);
        return Response.json({
            success:false,
            message:"Error registering user"
        }, {status:500})
    }
}