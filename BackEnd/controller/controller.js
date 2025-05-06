import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';  //to encrupt password
import jwt from 'jsonwebtoken';
import {cartItem,user} from "../models/workers.js";
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import Stripe from 'stripe';



dotenv.config();
const enviPass = process.env.JWT_SECRET ;
// console.log("JWT_SECRET is:", enviPass);


const apiFrontend = process.env.VITE_FRONTEND_URL;
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);




//setting transporter for nodemailer.
const transporter = nodemailer.createTransport({
     host: 'smtp.gmail.com',
     port: 587,
     secure: false,          // upgrade later with STARTTLS
      auth: {
        user: process.env.EMAIL_USER,           //my email.
        pass: process.env.PASSWORD_USER,             //app password generated from gmail app.
            },
            tls: {
              rejectUnauthorized: false,      
            }
})

//to verify smtp connection.
transporter.verify((err,success ) => {
  if(err){
    console.log('SMTP Connection Error:', err);
  }else
    console.log('SMTP Connection successful:', success);
})






//to update food quantity Number. and add food to db from cart
export const addCartItem = async (req, res) => {
  try {

     const toktok = req.cookies?.authToken;
     
     if(!toktok){
      return res.status(404).json({msg: 'Token unavailable'})
     }

     const decoded = jwt.verify(toktok,enviPass);
     const userId = decoded.id;
     console.log('Here is your user ID:',userId);
     if(decoded){
    const items = Array.isArray(req.body) ? req.body : [req.body];    //because cart is an array so array logic.
    for(const item of items){

      if (!item.name || !item.price || !item.quantity) {
        return res.status(400).json({ msg: 'Invalid item data' });
      }
       const itemExist = await cartItem.findOne({
        name: item.name
       })
       if(itemExist){
        itemExist.quantity += 1;
        await itemExist.save();
        console.log("Item exists and quantity is updated",itemExist);
       }else {
        const newItem = new cartItem({
        ...item,
        userid: userId,
      });
      console.log('Here is your user ID 2:', newItem.user);
        await newItem.save();
        
       };
    }

    return res.status(200).json({ msg: "All items processed successfully." });
  }else{
    return res.status(404).json({msg: 'Token not verified,critical error'})
  }
   
  }catch(error) {
    res.status(400).json({ error: error.message });
  }
};










//to get food data from mongodb.
export const getFoodData = async(req,res) => {
  try {
        const cookies = req.cookies?.authToken;

        if(!cookies){
          return res.status(500).json({msg: 'Token unavailable for retrieval'});
        }

        const decoded = jwt.verify(cookies,enviPass);
        const ID = decoded.id;
        console.log("Here is your jeno Code:",ID);

         const foodItem = await cartItem.find({userid: ID});
         console.log("Fetched items count:", foodItem.length);
        
         return res.status(200).json({msg:'FoodItems found', items: foodItem, user: ID});
          
        
  } catch(error){
    console.error('Error fetching food items:', error);
    return res.status(500).json({ msg: 'Server error', error: error.message });
  }
  }










//to add user details in Yim database.
export const addUser = async(req,res) => {
 try {
      const userData = req.body;
      const {fullname, username,email,password} = userData;
      const hashedPassword = await bcrypt.hash(password, 10);

     const newUser = new user({fullname, username, email, password: hashedPassword});
     await newUser.save();

     console.log("User details saved");
     return res.status(201).json({ msg: "User added successfully" });
 }catch(error){
  console.error('Error adding user:', error);
  return res.status(400).json({ error: error.message });
 }
}










//to check if user exists in database.
export const checkUserExists = async(req,res)=> {
  try{
      const incomingData = req.body;  //incoming payload from front-end.
      const {email,password} = incomingData  //destructuring it.
      const check = await user.findOne({ email });    // since incoming payload is object for login so no Array.isArray logic
      
      if(!check){
        return res.status(401).json({msg: 'User does not exist'})
      }
      
      const isMatch = await bcrypt.compare(password,check.password);

      if(!isMatch){
        return res.status(401).json({ msg: 'Invalid credentials' });
      }

      console.log('User exists');

      //generating jwt token
      const token = jwt.sign(
        {id: check.id, username: check.username},
        enviPass,
        {expiresIn: '1h'}
      );
        
      res.cookie('authToken',token,{
        httpOnly: true,  // Cookie cannot be accessed by JavaScript
        secure: true,
        maxAge: 1000 * 60 * 60,        // 1 hour
        sameSite: 'none', // Xess protection
      });

      console.log("Mongo ID as string:", check._id.toString());
       return res.status(200).json({msg: 'User exists in the database', username: check.username,userID: check._id.toString()});

  }catch(error){
    console.error("Error in checkUserExists",error);
    return res.status(500).json({msg: 'Server error', error: error.message})
  }
}










//to check authStatus.
export const authStatus = (req,res)=> {
  console.log(req.cookies);
  const cookiePayload = req.cookies?.authToken;
  console.log(cookiePayload);
  
   if(!cookiePayload){
     return res.status(404).json({msg: 'Token not found', isAuth: false});
   }
  
   jwt.verify(cookiePayload,enviPass,(err,payload)=>{
    if(err){
      return res.status(404).json({isAuth:false});
    } else{
       return res.status(200).json({isAuth:true, username: payload.username})
    };
   });
  }
  








   //to log out user
   export const logOutUser = (req,res)=>{
 
    const payload = req.cookies?.authToken;
     
    jwt.verify(payload,enviPass,(err,decoded)=> {
          if(err){
            return res.status(404).json({msg: 'user log out unsuccessful,no token ', tokenRemoved: false})
          }  
          res.clearCookie('authToken');
          return res.status(200).json({msg: 'user successfully logged out', tokenRemoved: true});

    })
   }










   //for reset password emaillogic.
   export const checkMail = async(req,res) =>{
       try{ 
      const confirmPayload = req.body;
      const { email } = confirmPayload;

      const checkPL = await user.findOne({
         email: email,
      });
        
      if(!checkPL){
        return res.status(404).json({msg: 'email does not exist', });
      };
       console.log('email exists');                
       const resetToken = crypto.randomBytes(32).toString('hex');                                //Non jwt token generation upon email existence.
       const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');
       const expirationTime = Date.now() + (60 * 60 * 1000);
       
       // Save the hashed token in the user's record
       checkPL.resetToken = hashedToken;
       checkPL.resetTokenExpiry = expirationTime;

       // Save the updated user document 
       await checkPL.save();           

       const resetLink = `${apiFrontend}/resetpassword?resettoken=${resetToken}&email=${email}`;

       const mailOptions = {
            from: 'fastfetch@gmail.com',
            to: email,
            subject: 'password reset request',
            html: `<p>You requested a password reset. Click the link below to reset your password:</p> <a href="${resetLink}">${resetLink}</a>`,
       }
        
        //send email
         transporter.sendMail(mailOptions, (err,info)=>{
             if(err){
              return res.status(500).json({msg: 'failed to reset email'});
             }
             return res.status(200).json({ 
              info: info.response,
              msg: 'Email exists and reset email sent successfully',
              isExist: true,
            });
       })
   }catch(error){
    console.log('Error in checkMail:', error);
    return res.status(500).json({ msg: 'Server error', error: error.message });
   }
  }











  //to update new password (write code below);
  export const resetPasswordPL = async (req,res) =>{
       try{

    const resetToks = req.body.resetToken;
    const emailPayload = req.body.email;
    const passwordPayload = req.body.password;
    
    const encryptedPass = await bcrypt.hash(passwordPayload,10);

    const hashedReset = crypto.createHash('sha256').update(resetToks).digest('hex');

    
     
     // Find mail , find the mail's token.
     const ExistingUser = await user.findOne({
      email: emailPayload,
      resetToken: hashedReset,                            //comparison of token
     })

     if(!ExistingUser){
      return res.status(400).json({ msg: 'Invalid or expired token or email' });
     } 
     

      // Optional: Check if token expired
    if (ExistingUser.resetTokenExpiry && ExistingUser.resetTokenExpiry < Date.now()) {
      return res.status(400).json({ msg: 'Reset token has expired' });
    }
    
     //if token is equal
     ExistingUser.password = encryptedPass;
     ExistingUser.resetToken = '';
     ExistingUser.resetTokenExpiry = '';
     await ExistingUser.save();
     return res.status(200).json({msg: "Password Successfully updated"});
     
  }catch(error){
     console.log(error);
     res.status(400).json({ msg: error.message });
  }
  }

  







//stripe payment.
export const sessionCreate = async(req,res) => {
  const cardDetailPayload = req.body;
  const { cartItems,feeValue} = cardDetailPayload;

   const lineItems = cartItems.map(item => ({
           price_data: {
            currency: 'usd',
            product_data: {
              name: `${item.name} (x${item.quantity})`,
            },
            unit_amount: item.price*100,
           },
           quantity: item.quantity,
   }));

   if(feeValue && feeValue > 0){
      lineItems.push({
        price_data:{
          currency: 'usd',
          product_data: {
            name: 'Service Fee',
          },
          unit_amount: feeValue * 100
        },
        quantity: 1
      })
   }
   
   try{
   const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
       line_items: lineItems,
              
       success_url: `${apiFrontend}/successPay`,
       cancel_url: `${apiFrontend}/failurePay`,
   })
  
   return res.status(200).json({ sessionID: session.id});

  }catch(error){
    console.error('Stripe session creation failed:', error);
    return res.status(500).json({ msg: 'Failed to create Stripe session', error: error.message });
  }
   
}








//contactUs logic.
export const contactLogic = async(req,res)=>{

    const contactFormData = req.body;
    const { Email, Message,FullName } = contactFormData;
    const tokenFromCookies = req.cookies.authToken;

       if(!tokenFromCookies){
        return res.status(400).json({msg: 'token is not available in payload'})     // if there is no token
       }
         
       
    
      const decoded = jwt.verify(tokenFromCookies,enviPass);                                //verify token with the jwt key that was set in

      if(!decoded){
        return res.status(401).json({msg: 'Token not verified with JWT', isAuth: false})        //if token unmatches with the Secret-Key
      }
             
               
     const checkMail = await user.findOne({                                                              //to find email exists in database or not  upon successfuly verification                 
      email: Email,
      _id: decoded.id,
     })
     
    

  
     if (!checkMail || checkMail._id.toString() !== decoded.id) {
      return res.status(400).json({ msg: 'Invalid email or unauthorized access', isExist: false });
    }

      const mailOptions = ({                                                                        //if verified proceed
        from: checkMail.email,
        to:  process.env.EMAIL_USER,
        subject: 'Customers review',
        html: `<p>${Message}</p><br><p>From: ${FullName}</p>`,
      })
             //insert mail logic here 

             
             transporter.sendMail(mailOptions,(err,info)=>{
                    if(err){
                      return res.status(500).json({msg:'error sending email'})
                    }
                    return res.status(200).json({
                      info: info.response,
                      msg: 'Email exists and message  sent successfully',
                      isAuth: true,
                      isExist: true,
                         })
             })
       
}
