<script setup>
   import {useRouter} from 'vue-router';

   const router = useRouter();
   const heroClicked = ()=> {
      router.push('/menu/food')
 }


</script>


<template>
<div class="bg-gray-100 py-8 md:py-16">
  <div class="flex flex-col md:flex-row items-center justify-center mx-auto max-w-8xl gap-6 md:gap-16 xl:gap-20 px-4 sm:px-6 lg:px-8">
    
    <!-- Left content card -->
    <div class="w-full md:w-6/12 xl:w-4/12 text-center md:text-left">
      <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
        DELICIOUS FAST FOOD 
        <span class="block">FRESH & HOMEMADE</span>
      </h1>
      <p class="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 mt-3 md:mt-4">
        Uncover the many healthy Multi-Cuisine
        <span class="block">fast food types and coffee we have to</span>
        <span class="block">offer!</span>
      </p>
      <button @click="heroClicked" class="bg-green-500 text-white py-2 px-4 sm:py-3 sm:px-5 rounded-lg mt-4 md:mt-6 text-sm sm:text-base md:text-lg lg:text-xl font-semibold hover:bg-yellow-600 transition duration-300">
        Go to Menu
      </button>
    </div>

    <!-- Right image card -->
    <div class="w-full md:w-6/12 xl:w-4/12 flex mt-6 md:mt-0">
      <img src="/englishBreakFast.png" class="h-50 sm:h-64 md:h-80 lg:h-105 w-full object-contain" alt="pic of English breakfast"/>
    </div>
  </div>
</div>
</template>