
import mongoose from "mongoose";
import dotenv from 'dotenv';



dotenv.config();
//  MongoDB Connection with Try-Catch.
//Phase-1
export const connectDB = async () => {
  try {
         const nikConnect =  mongoose.createConnection(process.env.MONGO_URL_NEIKE);

          nikConnect.on('connected',()=>{
          console.log('Connected to Neike DB');
          console.log('Mongoose connection state:', nikConnect.readyState);
         })

         nikConnect.on('error',(err)=>{
          console.error('Connection error to nik DB:', err);
         })
        
       return nikConnect;
      
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit the app if MongoDB connection fails
  }
};

//Phase-2
export const connectDB1 = async () => {
    try{
        const yimConnect =  mongoose.createConnection(process.env.MONGO_URL_YIM);

        yimConnect.on('connected',()=> {
          console.log('Connected to Yim DB');
          console.log('Mongoose connection state:', yimConnect.readyState);

        })

        yimConnect.on('error',(err)=>{
          console.error('Connection error to Yim DB:', err);
        })

        return yimConnect;
    }catch(err){
      console.error('MongoDB connection error:', err);
      process.exit(1);
    }
}


