
import mongoose from 'mongoose';
import {connectDB1,connectDB} from '../config/db.js';



const nikConnection = await connectDB();
const itemSchema = new mongoose.Schema({
    name: { type: String, required:true},
    price:{ type: Number, required:true},
    quantity:{type: Number, required:true},
    image:{type: String},
    userid: {type: mongoose.Schema.Types.ObjectId, ref:'UserDetails', required:true} // to add user id, ref is used to reference the id from userDetails(credentials variable)
    
  },{ timestamps: true });

 export const cartItem =  nikConnection.model('CartItem', itemSchema);



const yimConnection = await connectDB1();
 const credentials = new mongoose.Schema({
      fullname:{type: String, required:true},
      username:{type: String, required:true},
      email:{type: String, required:true},
      password:{type: String, required:true},
      resetToken:{type: String, default: null},
      resetTokenExpiry:{type: Date, default: null},
 })
  

 export const user = yimConnection.model('UserDetails', credentials);