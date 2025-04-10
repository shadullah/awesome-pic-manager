import mongoose, {Schema, Document} from "mongoose"

export interface Post extends Document{
    imgPost:string;
    caption: string;
    createdAt:Date 
}

const PostSchema: Schema<Post> = new Schema({
    imgPost:{
        type:String,
        required:true 
    },
    caption:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        required:true,
        default:Date.now()
    }
})

export interface User extends Document{
    fullname:string;
    email:string;
    password:string;
    posts:Post[]
}

const UserSchema: Schema<User> = new Schema({
    fullname:{
        type:String,
        trim:true,
        required:[true, "fullname is required"],
    },
    email:{
        type:String,
        required:[true, "Email is required"],
        unique:true ,
        match:[/.+\@.+\..+/,'please use a valid email address']
    },
    password:{
        type:String,
        required:[true, "Password is required"],  
    },
    posts:[PostSchema]
})

const UserModel = (mongoose.models?.User)||mongoose.model<User>("User", UserSchema)

export default UserModel