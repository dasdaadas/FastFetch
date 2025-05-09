<script setup>
import {  ref,computed,watch } from 'vue';
import { RouterLink,useRouter,useRoute } from 'vue-router';
import { useStore} from '@/store/piniastore.js';
const ismodalOpen = ref(false);



const store = useStore();
const router = useRouter();
const route = useRoute();


const signUpUser = () => {
  if(route.path !== '/signup'){
   router.push('/signup');
   ismodalOpen.value = false;
  } else {
    ismodalOpen.value = false;
  }
}

const logInUser = () => {
  if(route.path !== '/login'){
    router.push('/login');
    ismodalOpen.value = false;
  }else{
    ismodalOpen.value = false;
  }
}





const nameUser = computed(() => {
  return store.userName || 'Guest';
});



const openProfile = () => {
  ismodalOpen.value = true;
};

const closeProfile = () => {
  ismodalOpen.value = false;
};
 
  
const navigateAndClose = (path) => {
  if (route.path !== path) {
    router.push(path);
    ismodalOpen.value = false;
  }
};


  const isBurgerActive = ref(false);

  const burgerBtn = () =>{
     isBurgerActive.value = !isBurgerActive.value;
  }



</script>

<template>
<nav class="p-3 bg-white shadow">
  <div class="max-w-screen-xl mx-auto flex flex-wrap items-center justify-between">
    
    <!-- Left: Logo -->
    <div class="flex items-center gap-2">
      <img src="/icon-green.png" alt="FastFetch Logo" class="w-10 h-10" />
      <a href="/" class="font-semibold text-gray-900 text-lg">FastFetch</a>
    </div>

    <!-- Burger Button (Mobile Only) -->
     <div @click="burgerBtn" class="md:hidden flex items-center z-50">
      <button class="flex flex-col justify-between gap-1 w-7 h-5 focus:outline-none group cursor-pointer" >
        <span class="block h-1.5 w-full bg-gray-700 rounded transition-all duration-300 group-hover:bg-green-600 -webkit-transition-all"></span>
        <span class="block h-1.5 w-full bg-gray-700 rounded transition-all duration-300 group-hover:bg-green-600 -webkit-transition-all"></span>
        <span class="block h-1.5 w-full bg-gray-700 rounded transition-all duration-300 group-hover:bg-green-600 -webkit-transition-all"></span>
      </button>
    </div>

   <!-- Center Links (Shown on Mobile when Burger is Active) -->
   <transition name="fade">
  <div
    v-if="isBurgerActive"
    class="w-full bg-white shadow-md md:hidden absolute top-16 left-0 z-40 "
  >
    <div class="flex flex-col items-start px-6 py-4 gap-3 ">
      <RouterLink to="/home" class="text-gray-800 w-full py-1 hover:font-medium">Home</RouterLink>
      <RouterLink to="/menu/food" class="text-gray-800 w-full py-1 hover:font-medium">Menu</RouterLink>
      <RouterLink to="/about" class="text-gray-800 w-full py-1 hover:font-medium">About</RouterLink>
    </div>
  </div>
</transition>

    <!-- Center Links (Hidden on Mobile) -->
    <div class="hidden md:flex items-center gap-6">
      <RouterLink to="/home" class="text-black">Home</RouterLink>
      <RouterLink to="/menu/food" class="text-black">Menu</RouterLink>
      <RouterLink to="/about" class="text-black">About</RouterLink>
    </div>

    <!-- Right Section: Cart & Profile -->
    <div class="flex items-center gap-4 mt-3 md:mt-0">
      
      <!-- Cart -->
      <RouterLink to="/cart" class="relative text-black flex items-center gap-1">
        <!-- New Cart Icon -->
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
        </svg>
        <span class="hidden md:inline">Cart</span>

        <!-- Cart Count -->
        <span v-if="store.cart.length > 0" class="absolute -top-3 left-1 text-white bg-red-500 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
          {{ store.cart.length }}
        </span>
      </RouterLink>

      <!-- Profile -->
      <div class="relative">
        <button @click="openProfile" class="text-black flex items-center gap-1">
          <!-- New Profile Icon -->
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
          </svg>
          <span class="hidden md:inline">Profile</span>
        </button>

        <!-- Profile Dropdown -->
        <div
              v-show="ismodalOpen"
               class="absolute top-5 -right-9    w-64 max-w-xs bg-white p-6 rounded-xl shadow-2xl z-50 transition-all duration-300 ease-in-out"
               :class="ismodalOpen ? 'translate-y-0 opacity-100' : '-translate-y-12 opacity-0 pointer-events-none'"
          >
               <!-- Decorative Border -->
                <div class="w-45 h-1 bg-red-500 mx-auto mb-4 rounded-full"></div>

                 
                <h2 class="text-xl font-semibold text-gray-800 mb-3">Welcome {{ nameUser }}</h2>
                <p  class="text-sm text-gray-600 mb-1">To access account and manage orders</p>

                <div class="py-2" v-if="!store.authStatus">
                <button @click="logInUser" class="block w-full mb-2 py-2 px-5 border border-gray-300 cursor-pointer text-red-500 hover:border-red-500">LOGIN</button>
                <button  @click="signUpUser" class="block w-full py-2 px-5 border border-gray-300 cursor-pointer text-red-500 hover:border-red-500">SIGNUP</button>
                </div>

                <div class="py-2" v-if="store.authStatus">
                <button  @click="store.removeUser(router)" class="block w-full py-2 px-5 border border-gray-300 cursor-pointer text-red-500 hover:border-red-500">LOG-OUT</button>
                </div>

                <div class="w-52 h-1 bg-gray-300 mx-auto my-3 mb-4 rounded-full"></div>
                
                <div class="py-3 space-y-2">
                <Button  @click="navigateAndClose('/orders')" class="block text-gray-700 pb-1 font-light hover:font-semibold transition-all duration-200 cursor-pointer"> Orders</Button>
                <Button @click="navigateAndClose('/contactus')" class="block text-gray-700 font-light hover:font-semibold transition-all duration-200  cursor-pointer"> Contact Us</Button>
                </div>
               

                <button @click="closeProfile"class="w-full my-3 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50 transition-colors duration-200 cursor-pointer">
                  Close
                </button>
          </div>
      </div>
    </div>
  </div>
</nav>
  
  <!-- Click Outside to Close Modal -->
  <div v-if="ismodalOpen" @click="closeProfile" class="fixed inset-0   bg-opacity-100 backdrop-blur-sm"></div>
</template>
