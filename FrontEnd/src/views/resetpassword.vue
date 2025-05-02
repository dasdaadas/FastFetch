<script setup>
import { ref } from 'vue';
import { useRouter,useRoute } from 'vue-router';
import { useToast } from 'vue-toastification';

const toast = useToast();
const router = useRouter();
const route = useRoute();

const resetData = ref({
    password:'',
    confirmPassword:''
})

const mailFromQuery = route.query.email;
const tokenFromQuery = route.query.resettoken;

  const updatePas = async() => {
             if (!mailFromQuery) {
             alert('Email not found in the link.');
             return;
            }
    
           //check if passwords match
           if(resetData.value.password !== resetData.value.confirmPassword){
              alert('Passwords do not match');
              return;
           } else if(resetData.value.password.length < 6) {
               alert('Password cannot be less than 6 characters')
               return;
           } 
            
           
         try{
             
             const res = await fetch('http://localhost:8001/api/resetPassword',{
               method: 'PUT',
               headers: {
                "Content-Type": "application/json",
               },
               credentials: "include",
               body: JSON.stringify({
                 email: mailFromQuery,
                 password: resetData.value.password,
                 resetToken: tokenFromQuery,
               }),
             })

             const data = await res.json();

             if(!res.ok){
              if(res.status === 400 && data.msg){
                toast.error('Password update unsuccessful,token expired');
              } else{ 
                toast.error('Server error')
              }
              return;
             }
            

             const resetStatus = data.msg;
             console.log("Password Successfully updated", "Status:", resetStatus);
             router.push('/confirmationreset');
          }catch(error){
             console.log('Error:', error);
             alert('An error occurred while updating your password. Please try again.');
          }
        
  }

</script>


<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div class="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h2 class="text-2xl font-bold text-center mb-4 text-gray-800">Reset Your Password</h2>
        <p class="text-center text-gray-500 mb-6">Enter your new password below.</p>
  

        <form  @submit.prevent="updatePas" class="space-y-4">
          <input v-model="resetData.password"
            type="password"
            placeholder="New Password"
            class="w-full p-3 rounded-lg border border-gray-300 bg-gray-100 focus:ring-2 focus:ring-yellow-500 outline-none"
          />
  
          <input  v-model="resetData.confirmPassword"
            type="password"
            placeholder="Confirm New Password"
            class="w-full p-3 rounded-lg border border-gray-300 bg-gray-100 focus:ring-2 focus:ring-yellow-500 outline-none"
          />
  
          <button
            type="submit"
            class="w-full bg-yellow-600 hover:bg-yellow-700 transition-all py-3 rounded-lg text-lg font-semibold text-white shadow-md"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  </template>