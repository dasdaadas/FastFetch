<script setup>
import { ref } from 'vue';
import { useToast } from 'vue-toastification';
import { useRouter } from 'vue-router';


const router = useRouter();
const toast = useToast();
const apiBackend = import.meta.env.VITE_BACKEND_URL;
const contactForm = ref({
    FullName:'',
    Email:'',
    Message:'',

})


const loading = ref(false);


const contactUsData = async () => {

     const {FullName,Email,Message} = contactForm.value;

     if( !FullName.trim() || !Email.trim() || !Message.trim()){
       toast.error('Form cannot be empty');
       return;
     }



     loading.value = true;
    try{
     const res = await fetch(`${apiBackend}/api/contactForm`,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(contactForm.value),
          credentials: 'include',
     })

      const data = await res.json();

      if (!res.ok) {
      switch (res.status) {
        case 400:
          toast.error( data.msg ||'Bad request. You might not be signed in.');
          break;
        case 401:
          toast.error(data.msg || 'Unauthorized. Token verification failed.');
          break;
        case 404:
          toast.error(data.msg || 'Email does not exist in our records.');
          break;
        case 500:
          toast.error(data.msg || 'Server error. Please try again later.');
          break;
        default:
          toast.error(data.msg || 'An unknown error occurred. Please try again.');
      }
      return;
    }
      
      toast.success('Message Successfully sent');
      console.log('Success');
      contactForm.value = '';
      setTimeout(()=>{
        router.replace('/');
      },2000)

    } catch(error){
        console.error('Something went wrong', error);
        toast.error('An unexpected error occurred');
    } finally {
      loading.value = false;
    }

}
</script>



<template>
    <div class="min-h-screen bg-gray-200 flex items-center justify-center px-4 py-12">
      <div class="bg-white shadow-2xl rounded-2xl max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        
        <!-- Left Side -->
        <div class="bg-green-600 p-10 text-white flex flex-col justify-center">
          <h2 class="text-4xl font-bold mb-4">Get in Touch</h2>
          <p class="text-lg mb-6">Whether you have a question about your order or just want to say hi, we are here to help.</p>
          <ul class="space-y-4">
            <li><strong>Email:</strong> yimmenowens@gmail.com</li>
            <li><strong>Phone:</strong> +1 (123) 456-7890</li>
            <li><strong>Address:</strong> 456 Food Street, Flavor Town</li>
          </ul>
        </div>
  
        <!-- Right Side -->
        <div class="p-10">
          <form @submit.prevent="contactUsData"  class="space-y-6">
            <div>
              <label class="block text-sm font-medium mb-1">Full Name</label>
              <input v-model="contactForm.FullName" type="text" class="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400 focus:outline-none" />
            </div>
            <div>
              <label for="email" class="block text-sm font-medium mb-1">Email</label>
              <input v-model="contactForm.Email" type="email" class="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400 focus:outline-none" />
            </div>
            <div>
              <label for="message" class="block text-sm font-medium mb-1">Message</label>
              <textarea v-model='contactForm.Message'rows="4" class="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400 focus:outline-none"></textarea>
            </div>
            <button  type="submit"  :disabled="loading" class="bg-green-600 hover:bg-green-800 text-white px-6 py-2 rounded-xl font-semibold shadow-md transition duration-200 cursor-pointer">
              <span v-if="loading">is loading.....</span>
              <span v-else>Send Message</span>
            </button>
          </form>
        </div>
  
      </div>
    </div>
  </template>
