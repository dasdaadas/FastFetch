<script setup>
import {ref} from 'vue';
import { useStore } from '@/store/piniastore.js';
import {useRouter} from 'vue-router';

const router = useRouter();


const store = useStore();





</script>

<template>
    <div class="min-h-screen bg-gray-100 p-2 sm:p-4 md:p-6 flex justify-center items-center">
      <div class="w-full max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl bg-white p-4 sm:p-6 rounded-lg shadow-md relative">
        <h2 class="text-xl sm:text-2xl font-bold mb-4 text-center">Your Order</h2>
        
        <div v-for="(item, index) in store.cart" :key="item.name" class="divide-y divide-gray-300">
          <div class="flex flex-col sm:flex-row justify-between items-center py-3 sm:py-4 group">
            <div class="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3 w-full">
              <img 
                :src="item.image" 
                alt="Food Item" 
                class="w-12 h-10 sm:w-16 sm:h-12 object-contain rounded transition-transform duration-200 group-hover:scale-105" 
              />
              <div class="text-center sm:text-left">
                <h3 class="text-base sm:text-lg font-semibold">{{ item.name }}</h3>
                <p class="text-gray-700 font-medium text-sm sm:text-base">{{ item.price }}</p>
              </div>
            </div>
            <div class="flex items-center space-x-2 mt-2 sm:mt-0">
              <button 
                @click="store.decrementItem(item.name)" 
                class="px-2 py-1 sm:px-3 sm:py-1 bg-gray-200 rounded-full hover:bg-gray-300 transition text-sm sm:text-base"
              >-</button>
              <span class="text-base sm:text-lg font-medium">{{ item.quantity }}</span>
              <button 
                @click="store.incrementItem(item.name)" 
                class="px-2 py-1 sm:px-3 sm:py-1 bg-gray-200 rounded-full hover:bg-gray-300 transition text-sm sm:text-base"
              >+</button>
            </div>
            <button 
              @click="store.removeCartItem(index)" 
              class="ml-0 sm:ml-4 mt-2 sm:mt-0 text-red-500 hover:text-red-700 transition text-sm sm:text-base"
            >✕</button>
          </div>
        </div>
        
        <div class="mt-4 sm:mt-6 space-y-2 sm:space-y-3 text-center sm:text-left">
          <div class="flex justify-between text-base sm:text-lg font-medium">
            <span>Subtotal</span>
            <span>${{store.cart.reduce((sum,item)=> sum + item.price * item.quantity ,0)}}</span>
          </div>
          <div class="flex justify-between text-gray-600 text-sm sm:text-base">
            <span>Delivery Fee</span>
            <span>${{ store.deliveryFee }}</span>
          </div>
          <div class="flex justify-between text-lg sm:text-xl font-bold">
            <span>Total</span>
            <span>$ {{ store.cart.reduce((sum,items)=> sum + items.price * items.quantity,0) + store.deliveryFee}}</span>
          </div>
        </div>
        
        <div class="sticky bottom-0 bg-white py-3 sm:py-4 mt-4">
          <button  @click="store.orderItem(router)"
            class="w-full bg-green-500 text-white py-2 sm:py-3 rounded-lg text-base sm:text-lg font-semibold hover:bg-green-600 transition cursor-pointer"
          >Place Order</button>
        </div>
      </div>
    </div>
  </template>