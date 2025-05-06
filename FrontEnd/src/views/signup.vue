<script setup>
import {ref} from 'vue';
import { useToast } from 'vue-toastification';
import { useRouter } from 'vue-router';


const apiBackend = import.meta.env.VITE_BACKEND_URL;
const router = useRouter();
const toast = useToast();
const register = ref({
    fullname:'',
    username:'',
    email:'',
    password:'',
    confirmPass:''
})

const resetForm = () => {
       register.value = {
        fullname:'',
        username:'',
        email:'',
        password:'',
        confirmPass:''
       };
};

const handleSubmit= async ()=>{
    const formData = register.value;

    if(formData.password !== formData.confirmPass){
      return console.log('Error passwords do not match')
    }

    delete formData.confirmPass;

    try{
    const res = await fetch(`${apiBackend}/api/addUser`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
    })

      if(!res.ok){
         throw new Error('Could not send user data to backend');
      }
      console.log('User Successful registered in backend');
      resetForm();
      toast.success('User Successfully Registered');
      setTimeout(()=>{
        router.push('/login');
      },4000)
    }catch(error){
      console.error('Submission error:', error.message);
    }
}
</script>

<template>
    <div class="bg-gray-100 min-h-screen flex items-center justify-center p-6">
      <div class="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl">
        <h2 class="text-3xl font-bold text-center text-gray-900">Join the Family</h2>
        <p class="text-gray-600 text-center mt-2 mb-6">Sign up now and order your favorite fast food, tailored to your cravings.</p>
        
        <form @submit.prevent="handleSubmit"class="space-y-4">
          <div class="space-y-2">
            <input type="text" v-model="register.fullname" placeholder="Full Name" class="w-full p-3 rounded-lg bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-yellow-500 outline-none">
            <input type="text" v-model="register.username"placeholder="Username" class="w-full p-3 rounded-lg bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-yellow-500 outline-none">
          </div>
          <input type="email" v-model="register.email" placeholder="Email" class="w-full p-3 rounded-lg bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-yellow-500 outline-none">
          <div class="space-y-2">
            <input type="password" v-model="register.password" placeholder="Password" class="w-full p-3 rounded-lg bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-yellow-500 outline-none">
            <input type="password" v-model="register.confirmPass" placeholder="Confirm Password" class="w-full p-3 rounded-lg bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-yellow-500 outline-none">
          </div>
          
          <button type="submit" class="w-full bg-yellow-600 hover:bg-yellow-700 transition-all py-3 rounded-lg text-lg font-semibold text-white shadow-lg">Sign Up</button>
        </form>
        
        <p class="text-center text-gray-600 mt-4">Already have an account? <a href="/login" class="text-yellow-600 hover:text-yellow-500">Log in</a></p>
      </div>
    </div>
  </template>
  