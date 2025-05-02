<script setup>

const closePage = ()=> {
    window.close();
}


</script>


<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div class="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg text-center">
        <h2 class="text-3xl font-bold text-green-600 mb-4">Success!</h2>
        <p class="text-xl text-gray-800 mb-6">Your password has been successfully updated. You can now close this page.</p>
        <button 
          @click="closePage" 
          class="bg-yellow-600 hover:bg-yellow-700 transition-all py-3 rounded-lg text-lg font-semibold text-white shadow-md w-full">
          Close
        </button>
      </div>
    </div>
  </template>