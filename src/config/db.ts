import mongoose from "mongoose";
import { envConfig } from "./config";

async function connection(){
    try{
        mongoose.connection.on('connected',()=>{
            console.log('Connected to MongoDB')
        })
        await mongoose.connect(envConfig.mongoConnectionString as string)
    }catch(error){
        console.log(error)
        process.exit(1)
    }
}

export default connection; 