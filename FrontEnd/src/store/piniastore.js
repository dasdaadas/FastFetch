
import { defineStore } from "pinia";
import {computed, ref,watch} from 'vue'
import { useToast } from "vue-toastification";

const apiBackend = import.meta.env.VITE_BACKEND_URL;
const toast = useToast();
export const useStore = defineStore("cart",()=> {
  const limit = ref(4);


  const checkoutFunc = (address,payment)=> {
    localStorage.setItem('addressNote',address);
    localStorage.setItem('payMethod',payment);
}


const itemsFood = ref([
    {name: "Slavic Steak", price: 12, image: "/Steak.png"},
    {name: "Bolivian WellDone", price: 22, image: "/Steak2.png"},
    {name: "Japanase Pork Teriyaki", price: 15, image: "/PorkT.png"},
    {name: "Islandic Fajita", price: 13, image: "/Fajita.png"},
    {name: "Chilli Fries", price: 15, image: "/chilliFries.png"},
    {name: "Beef Burger", price: 13, image: "/beefBurger.png"},
])

const itemsDrink = ref([
   {name: "Classic Coffee", price: 8, image: "/normalCoffee.png"},
   {name: "Vanilla Coffee", price: 12, image: "/vanillaCoffee.png"},
   {name: "Chocolate Coffee", price: 15, image: "/chocolateCoffee.png"},
   {name: "Caramel Coffee", price: 13, image: "/caramelCoffee.png"},
   {name: "Pistacho Coffee", price: 13, image: "/pistachoCoffee.png"},
   {name: "Milk Coffee", price: 13, image: "/milkCoffee.png"},
])

const limitedItems = computed(()=> 
    itemsFood.value.slice(0,limit.value)
)


const cart = ref([]);
const deliveryFee = computed(()=> cart.value.length * 5);
const authStatus = ref(false);

const userName = ref(null);
userName.value = localStorage.getItem('username') || null;

   








//to verify token cookie.
const verifyCookie = async()=>{
  try{
   const res = await fetch(`${apiBackend}/api/authToken`,{
       method: 'GET',
       credentials: 'include',
   });
     if(!res.ok){
      throw new Error("Error Fetching Auth Status");
     }

     const data = await res.json();
     const isAuth = data.isAuth;
     authStatus.value = isAuth;
     console.log(authStatus.value);
     
}catch(error){
     console.log(error.message);
 }
 }









//To add food to cart from homepage.
const foodBtnClicked = (index,itemData) => {
    console.log(`A food of index ${index} was clicked and its data is:`,itemData );
     
    const existingItem = cart.value.find((item)=> item.name === itemData.name);

    if(existingItem){
        existingItem.quantity ++;
    } else{
        cart.value.push({...itemData, quantity: 1});
    }
    console.log(cart.value);
}









//To add food to cart from Menu.
const menuFoodClicked = (index,foodData) => {
  const existingFood = cart.value.find((food)=>food.name === foodData.name);
  console.log(`A food of index ${index} was clicked and its data is:`,foodData );

  if(existingFood){
    existingFood.quantity ++;
  }else {
    cart.value.push({...foodData, quantity: 1});
  }
  console.log(cart.value);
}











//To add coffee to cart.
const coffeeBtnClicked = (index,drinkData) => {
      console.log(`A coffee of ${index} was clicked and its data is `,drinkData);

       const existingDrink = cart.value.find((drink)=> drink.name === drinkData.name);
       if(existingDrink){
           existingDrink.quantity ++;
       } else{
            cart.value.push({...drinkData, quantity: 1});
       }
       console.log(cart.value);
}

const removeCartItem = (index) => {
       cart.value.splice(index,1);
}

const incrementItem = (name)=> {
      const existingItem = cart.value.find((item)=>item.name === name);
      if(existingItem){
        existingItem.quantity ++;
      }
}

const decrementItem = (name)=> {
    const existingItem = cart.value.find((item)=>item.name === name);
    if(existingItem && existingItem.quantity > 0){
        existingItem.quantity --;
}
}













//transfer cart item to mongoDb.
const orderItem = async (router) => {
  try{
   
    const cartItems = cart.value;
    const totalValue = cart.value.reduce((sum,items)=> sum + items.price * items.quantity,0) + deliveryFee.value;
    const delFee = deliveryFee.value;
        const res = await fetch(`${apiBackend}/api/placeOrder`,{
           method: 'POST',
           headers:{
            "Content-Type": "application/json",
           },
           body: JSON.stringify(
             cartItems,
             totalValue,
             delFee
           ),
           credentials: 'include',
        });

        const data = await res.json();
        if (!res.ok) {
        
          if (res.status === 404 && data.msg ) {
            toast.error('You must be signed in to place an order.',{
              timeout: 1500,
            });
          } else {
            alert(data.msg || 'Failed posting data to database.');
          }
          return;
        }

        if(cart.value.length === 0){
          toast.error("Cart cannot be empty",{
            timeout: 1500,
          });
          return;
        }

        console.log("Order placed successfully:", data);
        localStorage.setItem('fee', JSON.stringify(deliveryFee.value));
        localStorage.setItem('cart',JSON.stringify(cart.value));
        cart.value = [];
        router.replace('/checkout');

}catch(error){
  console.error("Error placing order:", error.message);
}};
















//to log out user.
const removeUser = async(router)=>{
     try{
  const response = await fetch('/api/logoutuser',{
       method: 'DELETE',
       credentials: 'include',
  });

  if(!response.ok){
     throw new Error("Could not verify user to sign out");
  }
   
  const data = await response.json();
  const status = data.tokenRemoved;
  console.log('User Removed:',status);
  authStatus.value = false;
  userName.value = '';
  localStorage.removeItem('username');
  toast.success("User Signed Out",{
    timeout: 1500,
  })
}catch(error){
  console.log("error",error.message);
}}


 return {foodBtnClicked,removeCartItem,incrementItem,decrementItem,coffeeBtnClicked,menuFoodClicked,
  orderItem,checkoutFunc,cart,deliveryFee,itemsFood,limitedItems,limit,
  itemsDrink,verifyCookie,authStatus,removeUser,userName};

})
