import mongoose from "mongoose";
var Connection:(Promise<typeof mongoose>|undefined)=undefined;
export default async function connectMongo(){
    if(Connection===undefined){
        try{
            Connection=mongoose.connect( process.env.MONGO_URI as string)
            console.log("Successfully Connected...")
        }catch (e){
            console.log(e)
        }
    }
    return Connection
}