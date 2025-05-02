<script setup>
import { ref } from 'vue';

const cardDetails = ref({
  cardNum:'',
  expiry:'',
})


</script>






<template>
    <div class="bg-gray-100 min-h-screen flex items-center justify-center">
      <div class="bg-white shadow-xl rounded-lg w-full max-w-md p-8">
        <h2 class="text-3xl font-semibold text-center text-gray-700 mb-8">Payment Information</h2>
  
        <form  class="space-y-6">
          <!-- Card Information -->
          <div>
            <label for="cardNumber" class="block text-sm font-medium text-gray-700">Card Number</label>
            <input
              id="cardNumber"
              type="text"
              placeholder="1234 5678 9101 1121"
              class="mt-2 block w-full px-4 py-3 border rounded-md text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
  
          <div class="flex space-x-4">
            <!-- Expiry Date -->
            <div class="w-1/2">
              <label for="expiryDate" class="block text-sm font-medium text-gray-700">Expiry Date</label>
              <input
                id="expiryDate"
                type="text"
                placeholder="MM/YY"
                class="mt-2 block w-full px-4 py-3 border rounded-md text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <!-- CVC -->
            <div class="w-1/2">
              <label for="cvc" class="block text-sm font-medium text-gray-700">CVC</label>
              <input
                id="cvc"
                type="text"
                placeholder="123"
                class="mt-2 block w-full px-4 py-3 border rounded-md text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
  
          <!-- Billing Information -->
          <div>
            <label for="billingAddress" class="block text-sm font-medium text-gray-700">Billing Address</label>
            <input
              id="billingAddress"
              type="text"
              placeholder="123 Main St, City, Country"
              class="mt-2 block w-full px-4 py-3 border rounded-md text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
  
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="youremail@example.com"
              class="mt-2 block w-full px-4 py-3 border rounded-md text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
  
          <!-- Submit Button -->
          <div class="mt-6">
            <button
              type="submit"
              class="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-blue-700"
            >
              Complete Payment
            </button>
          </div>
  
          <!-- Privacy Note -->
          <div class="mt-4 text-center text-sm text-gray-500">
            <p>Your payment information is secure and will never be shared with third parties.</p>
          </div>
        </form>
      </div>
    </div>
  </template>