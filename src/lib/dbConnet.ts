import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?:number
}

const connetion: ConnectionObject={}

async function dbConnect(): Promise<void>{
    if(connetion.isConnected){
        console.log("Already connected to database");
        return
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URL || '', {})
        // console.log(db);
        connetion.isConnected = db.connections[0].readyState
        console.log("db connected successfully!!");
    } catch (error) {
        console.log("database connetion failed : ",error);
        // process.exit()
    }
}

export default dbConnect;