<script setup>
import { useStore } from '@/store/piniastore.js';
import { useRoute, useRouter } from 'vue-router';

const store = useStore();
const route = useRoute();
const router = useRouter();

const cart = JSON.parse(localStorage.getItem('cart') || '[]');
const fee = JSON.parse(localStorage.getItem('fee') || '0');
const deliveryAddress = localStorage.getItem('addressNote') || 'Not provided';
const paymentMethod = localStorage.getItem('payMethod') || 'Not selected';

const printAndGoHome = () => {
  window.print();
  setTimeout(() => {
    localStorage.removeItem('cart');
    localStorage.removeItem('fee');
    localStorage.removeItem('addressNote');
    localStorage.removeItem('payMethod');
    router.replace('/');
  }, 1500); // Delay to ensure print dialog opens before navigating
};


</script>

<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-6">
    <div class="bg-white p-6 rounded-xl shadow-md w-full max-w-2xl space-y-6">

      <h2 class="text-2xl font-bold text-center text-green-600">Order Summary</h2>

      <!-- Delivery Address -->
      <div class="bg-gray-50 p-4 rounded-lg border">
        <h3 class="text-lg font-semibold text-gray-700 mb-2">Delivery Address</h3>
        <p class="text-gray-600">{{deliveryAddress}}</p>
      </div>

      <!-- Payment Method -->
      <div class="bg-gray-50 p-4 rounded-lg border">
        <h3 class="text-lg font-semibold text-gray-700 mb-2">Payment Method</h3>
        <p class="text-gray-600">{{paymentMethod}}</p>
      </div>

      <!-- Items in Cart -->
      <div class="bg-gray-50 p-4 rounded-lg border">
        <h3 class="text-lg font-semibold text-gray-700 mb-4">Items Ordered</h3>
        <ul class="space-y-2">
          <li v-for="(food,index) in cart" :key="index" class="flex justify-between">
            <span><span>{{ food.quantity }}x</span> {{ food.name }}</span>
            <span class="font-medium">${{ food.price * food.quantity }}</span>
          </li>
        </ul>
        <div class="flex justify-between items-center">
          <p class="py-3 text-lg font-semibold">Delivery-Fee</p>
          <p class="py-3 text-lg font-semibold">${{ fee }}</p>
        </div>
      </div>

      <!-- Total Amount -->
      <div class="flex justify-between text-lg font-semibold border-t pt-4">
        <span>Total</span>
        <span>${{ (cart || []).reduce((sum, item) => sum + item.price * item.quantity, 0) + fee }}</span>
      </div>

      <!-- Thank You Note and Button -->
      <div class="text-center pt-4 space-y-1">
        <p class="text-green-600 font-semibold">Thank you for your order!</p>
        <p class="text-gray-500 text-sm">You will receive a confirmation message shortly.</p>
        <button @click="printAndGoHome" class="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Print & Go Home
        </button>
      </div>

    </div>
  </div>
</template>