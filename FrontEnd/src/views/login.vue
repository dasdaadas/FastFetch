<script setup>
import {ref} from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '@/store/piniastore';
import { useToast } from 'vue-toastification';

const apiBackend = import.meta.env.VITE_BACKEND_URL;
const store = useStore();
const router = useRouter();
const logIn = ref({
  email:'',
  password:'',
})

const invalidPassword = ref(false);
const toast = useToast();

const verifyUser = async()=>{
 const verifyData = logIn.value;

   try{
  const res = await fetch(`${apiBackend}/api/checkUserExists`,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(verifyData),
          credentials: 'include',
 })
  if(!res.ok){
    invalidPassword.value = true;
    toast.error("Invalid Credentials");
    throw new Error('Invalid Credentials');
    
  }
  const data = await res.json();
  const userPerson = data.username;
  const ID = data.userID;
   console.log("User Successfully Signed in",userPerson, ID);
   invalidPassword.value = false;
   store.userName = userPerson;
   localStorage.setItem('username',userPerson); //optional for backup

   store.verifyCookie();              //so verify user token.
    
      
   toast.success("User signed in successfully",{
    timeout: 1500,
   });

  router.push('/');
}catch(error){
  console.error('Login error:', error.message);
}
}

const resetPass = () =>{
      router.push('/resetmail');
}

</script>

<template>
    <div class="bg-gray-100 min-h-screen flex items-center justify-center p-6">
      <div class="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl">
        <h2 class="text-3xl font-bold text-center text-gray-900">Sign-In</h2>
        <p class="text-gray-600 text-center mt-2 mb-6">Login to access your account and order your favorite fast food.</p>
        
        <form @submit.prevent="verifyUser"  class="space-y-4">
          <input type="email" v-model="logIn.email" placeholder="Email" class="w-full p-3 rounded-lg bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-yellow-500 outline-none">
          <input type="password"   v-model="logIn.password" placeholder="Password" class="w-full p-3 rounded-lg bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-yellow-500 outline-none">
          <button @click="resetPass" v-if="invalidPassword" class="text-blue-400 hover:text-blue-600 cursor-pointer">reset password ?</button>
          <button
          type="submit"
          :disabled="isLoading"
          class="w-full bg-yellow-600 hover:bg-yellow-700 transition-all py-3 rounded-lg text-lg font-semibold text-white shadow-lg"
        >
          <span v-if="isLoading">Loading...</span>
          <span v-else>Log In</span>
        </button>

        </form>
        
        <p class="text-center text-gray-600 mt-4">Don't have an account? <a href="/signup" class="text-yellow-600 hover:text-yellow-500">Sign up</a></p>
      </div>
    </div>
</template>
