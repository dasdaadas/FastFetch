<script setup>
import { onMounted,ref } from 'vue';
import dayjs from 'dayjs';
import { useStore } from '@/store/piniastore';


  const time = ref(dayjs().format('MMMM D, YYYY'));
  const delAdd = localStorage.getItem('addressNote') || 'No address Found';
  const paymentMethod = localStorage.getItem('payMethod') || 'N/A';
  const delFee = Number(localStorage.getItem('fee') || 0);
  const orderID =  ref(Math.floor(Math.random() * 100000000).toString());
  const store = useStore();
  const fetchedFood = ref([]);
  const fetchedID = ref();


  onMounted(async () => {
  try{
  const foodData = await fetch('http://localhost:8001/api/getData',{
        method: 'GET',
        
        credentials: 'include',
  })
  
         if(!foodData.ok){
           throw new Error('Could not get food items from db');
        }
  
         const data = await foodData.json();
         const dbItems = data.items;
         const id = data.user;
         fetchedID.value = id;
         fetchedFood.value = dbItems;
  
      }catch(error){
        console.error('Error fetching food items:', error);
        return { msg: 'Failed to fetch items', error: error.message };
      }
  })







</script>


<template>
    <div class="min-h-screen bg-gray-100 p-4 sm:p-8">
      <div class="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-6 space-y-6">
  
        <h2 class="text-3xl font-bold text-center text-green-600">Your Orders</h2>
  
        <!-- Order Card -->
        <div class="border rounded-lg p-4 bg-gray-50 space-y-4">
          
          <!-- Order Header -->
          <div class="flex justify-between items-center">
            <div>
              <p class="text-sm text-gray-500">Order #{{orderID}}</p>
              <p class="text-lg font-semibold text-gray-700">Placed on: {{ time }} </p>
            </div>
            <div class="text-sm text-gray-600">
              <span class="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                In-Transit
              </span>
            </div>
          </div>
          <div>
            <p class="font-semibold">User ID :  <span class="text-red-600">{{fetchedID}}</span></p>
          </div>
          
          <!-- Items -->
          <div>
            <h3 class="text-md font-semibold text-gray-700 mb-2">Items:</h3>
            <ul  v-for="(item,index) in fetchedFood" :key="index" class="space-y-1">
              <li class="flex justify-between">
                <span><span>{{ item.quantity }}x </span>{{ item.name }}</span>
                <span class="font-medium">${{ item.price }}</span>
              </li>
            </ul>

            <div class="flex justify-between items-center">
            <p class="text-lg py-3 font-semiBold">Delivery Fee:</p>
            <p class="text-lg font-semiBold">${{ delFee }}</p>
            </div>
          </div>
  
          <!-- Delivery & Payment -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <p class="font-semibold">Delivery Address:</p>
              <p>{{ delAdd }}</p>
            </div>
            <div>
              <p class="font-semibold">Payment Method:</p>
              <p>{{ paymentMethod }}</p>
            </div>
          </div>
  
          <!-- Total -->
          <div class="flex justify-between pt-4 border-t text-lg font-semibold">
            <span>Total</span>
            <span>${{ fetchedFood.reduce(( sum,items) => sum + items.price,0) + delFee }}</span>
          </div>
        </div>
  
        <!-- Placeholder if no orders -->
        <!-- <p class="text-center text-gray-500">You haven’t placed any orders yet.</p> -->
  
      </div>
    </div>
  </template>