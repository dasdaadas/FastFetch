import express from 'express';
import {addCartItem,getFoodData,addUser,checkUserExists,authStatus,logOutUser,checkMail,resetPasswordPL,sessionCreate} from '../controller/controller.js';




const router = express.Router();




router.post('/api/placeOrder',addCartItem);
router.get('/api/getData',getFoodData);
router.post('/api/addUser', addUser);
router.post('/api/checkUserExists',checkUserExists);
router.get('/api/authToken',authStatus);
router.delete('/api/logoutuser',logOutUser);
router.post('/api/resetMail',checkMail);
router.put('/api/resetPassword',resetPasswordPL);
router.post('/api/stripePayment',sessionCreate);

export default router;