<script setup>
import { ref } from 'vue';
import { useStore } from '@/store/piniastore.js';
import {useRouter} from 'vue-router';
import { loadStripe } from '@stripe/stripe-js';

const apiBackend = import.meta.env.VITE_BACKEND_URL;
const stripePromise = loadStripe('pk_test_51RKB8DP4Sc2uvRf97Pbwh4zAEO8DeAQHzhc3CEjivsAJm64QEz8VRbMqCeQyIwPsBtW0K9aWGAYAGgKYb5CLxKj300RjRrvUxX');
const router = useRouter();
const store = useStore();
const address = ref('');
const paymentMethod = ref('');

const cart = JSON.parse(localStorage.getItem('cart') || '[]');
const fee = JSON.parse(localStorage.getItem('fee') || '0');
const isVerifying = ref(false);




// Define paymentFunc outside confirmOrder for proper scoping
const paymentFunc = async () => {
  isVerifying.value = true;

  try {
    if (paymentMethod.value === 'cardPayment') {
      const res = await fetch(`${apiBackend}/api/stripePayment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cartItems: cart,
          feeValue: fee,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error('Stripe Checkout session error:', data.msg || 'Unknown error');
        return;
      }

      const stripe = await stripePromise;
      const result = await stripe.redirectToCheckout({
        sessionId: data.sessionID,
      });

      if (result.error) {
        console.error(result.error.message);
      } else {
        console.log('Redirected to Stripe Checkout');
      }
    } else if (paymentMethod.value === 'cashOnDel') {
      await router.replace('/final');
    }
  } catch (error) {
    console.error('Payment error:', error.message || error);
  } finally {
    // Always reset regardless of success or failure
    isVerifying.value = false;
  }
};






const confirmOrder = ()=> {
  if(paymentMethod.value === '' || address.value === ''){
       alert("Please provide an address and payment method")
       return;
  }
        store.checkoutFunc(address.value,paymentMethod.value);
         paymentFunc();
        }
        
</script>



<template>
    <div class="min-h-screen bg-gray-100 p-4 sm:p-6 md:p-8 flex justify-center items-center">
      <div class="w-full max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl bg-white p-6 sm:p-8 rounded-lg shadow-md space-y-6">
  
        <h2 class="text-2xl font-bold text-center">Confirm Order</h2>
  
        <!-- Delivery Address Input -->
        <div class="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
          <h3 class="font-semibold text-gray-700 mb-2">Delivery Address</h3>
          <textarea v-model="address"  
            placeholder="Enter your full delivery address..."
            rows="3"
            class="w-full p-3 border border-gray-300 rounded-lg resize-none text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
          ></textarea>
        </div>
  
        <!-- Payment Method Selection -->
        <div>
          <label class="block text-gray-700 font-medium mb-2">Payment Method</label>
          <select v-model="paymentMethod"
            class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 text-sm"
             
          >
            <option disabled value="">Select a payment method</option>
            <option value="cardPayment">Credit / Debit Card</option>
            <option value="cashOnDel">Cash on Delivery</option>
          </select>
        </div>
  
        <!-- Confirm Order Button -->
        <div class="pt-4">
          <button  @click="confirmOrder"
            class="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg text-lg transition"
          >
            
            <span v-if="isVerifying">..Validating..</span>
            <span v-else>Confirm and Pay</span>
          </button>
        </div>
  
      </div>
    </div>
  </template>



