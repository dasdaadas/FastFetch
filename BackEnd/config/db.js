
import mongoose from "mongoose";

//  MongoDB Connection with Try-Catch.
//Phase-1
export const connectDB = async () => {
  try {
         const nikConnect =  mongoose.createConnection('mongodb://localhost:27017/Neike');

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
        const yimConnect =  mongoose.createConnection('mongodb://localhost:27017/Yim');

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


