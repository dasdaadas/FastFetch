<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';


const router = useRouter();
const toast = useToast();

const mail = ref({
    email:''
})




const updateEP =  async () => {
    try{
        const res = await fetch('http://localhost:8001/api/resetMail',{
              method: 'POST',
              headers : {
                "Content-Type": "application/json",
              },
              credentials: 'include',
              body: JSON.stringify(mail.value),
        });
           
        const data = await res.json();

        if(!res.ok){
            if(res.status === 404 && data.msg){
              toast.error('Email doesnt exist');
               
            } else{
              toast.error('Failed confirming email');
            }
            return;
        }

        const mailMsg = data.msg;
        const mailVerified = data.isExist;
        console.log('Message:',mailMsg,mailVerified);
        
        toast.success("Check your Mail for the rest link!");
        setTimeout(()=>{
          router.push('/login')
        },5000)
       
        
    }catch(err){
        console.error('Network or server error:', err);
        alert('Something went wrong. Please try again later.');
    }

}

</script>


<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div class="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h2 class="text-2xl font-bold text-center mb-4 text-gray-800">Reset Password</h2>
        <p class="text-center text-gray-500 mb-6">Enter your email to begin the password reset process.</p>
  
        <form @submit.prevent="updateEP" class="space-y-4">
          <input v-model="mail.email"
            type="email"
            placeholder="Enter your email"
            class="w-full p-3 rounded-lg border border-gray-300 bg-gray-100 focus:ring-2 focus:ring-yellow-500 outline-none"
          />
  
          <button
            type="submit"
            class="w-full bg-yellow-600 hover:bg-yellow-700 transition-all py-3 rounded-lg text-lg font-semibold text-white shadow-md"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  </template>