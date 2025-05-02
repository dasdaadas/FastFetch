import {createRouter,createWebHistory}from 'vue-router';
import home from '@/views/homepage.vue';
import cart from '@/views/cartpage.vue';
import menuF from '@/views/menufood.vue';
import menuD from  '@/views/menucoffee.vue';
import about from '@/views/about.vue';
import signUp from '@/views/signup.vue';
import checkout from '@/views/checkout.vue';
import final from '@/views/final.vue';
import orders from '@/views/orders.vue';
import login from '@/views/login.vue';
import reset from '@/views/resetpassword.vue';
import resetmail from '@/views/email.vue';
import confirmReset from '@/views/confirmreset.vue';
import cardPayment from '@/views/cardpayment.vue';
import successPay from '@/views/successpay.vue';
import failurePay from '@/views/failurepay.vue';
import error from '@/views/404.vue';




const router = createRouter({
  
    history: createWebHistory(import.meta.env.BASE_URL),


    routes: [
          {
            path: '/' ,
            name: 'homepage',
            component: home,
          },
          {
            path: '/home',
            redirect: '/',
          },

          {
            path: '/cart',
            name: 'cartpage',
            component: cart,
          },
          
          {
            path: '/menu/food',
            name: 'menufoodpage',
            component: menuF,
          },
          {
            path: '/menu/drink',
            name: 'menudrinkpage',
            component: menuD,

          },
          {
            path: '/about',
            name: 'aboutpage',
            component: about,
          },
          {
            path: '/signup',
            name: 'signuppage',
            component: signUp,
          },
          {
            path: '/checkout',
            name: 'checkoutpage',
            component: checkout,
          },
          {
            path: '/final',
            name: 'finalpaypage',
            component: final,
          },
          {
            path: '/orders',
            name: 'orderspage',
            component: orders,
          },
          {
            path: '/login',
            name: 'loginpage',
            component: login
          },

          {
            path:'/resetpassword',
            name: 'resetpasswordpage',
            component: reset,
          },
          {
            path: '/resetmail',
            name: 'resetemailpage',
            component: resetmail,
          },
          {
            path: '/confirmationreset',
            name: 'confirmresetpage',
            component: confirmReset,
          },
          {
            path: '/cardpayment',
            name: 'cardpaymentpage',
            component: cardPayment,
          },
          {
            path: '/successPay',
            name: 'successpaypage',
            component: successPay,
          }, 
          {
            path: '/failurePay',
            name: 'failurepaypage',
            component: failurePay,
          },
          {
            path: '/:pathMatch(.*)*',
            name: 'errorroute',
            component: error,
          },
        
    ]



})

 export const legitRoutes = ['/','/cart','/menu/food','/menu/drink','/about','/signup','/checkout','/final',
  '/orders','/login','/resetpassword','/resetmail','/confirmationreset','/cardpayment','/successPay','/failurePay']




//navigation guards
const protectedRoutes = ['checkoutpage','finalpaypage','orderspage']
router.beforeEach(async (to, from, next) => {
  try {
    if (protectedRoutes.includes(to.name)) {
      const res = await fetch('http://localhost:8001/api/authToken', {
        method: 'GET',
        credentials: 'include',
      });

      if (!res.ok) {
        throw new Error('User Un-verified.');
      }

      const data = await res.json();
      const tokenUser = data.isAuth;      //fetch token status from Backend

      if (tokenUser) {
        console.log('User is verified, proceed to page');
        next()   // Allow navigation
       
      } else {
        console.log('User not verified, redirecting to login');
        next({ name: 'loginpage' }); // Redirect to login
      } 
    }  else {
      next();        // Allow navigation to routes that don't need auth
    }
  } catch (error) {
    console.log('Error fetching user token:', error);
    next({ name: 'loginpage' }); 
  }
});




export default router;