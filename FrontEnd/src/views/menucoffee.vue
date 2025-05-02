<script setup>
import { useStore } from '@/store/piniastore.js';
import coffeeCard from '@/components/coffeeCard.vue';
import { RouterLink } from 'vue-router';
import Footer from '@/components/footer.vue';
const store = useStore();
</script>

<template>
  <div class="flex flex-col lg:flex-row min-h-screen">
    <!-- Sidebar (Categories) -->
    <aside class="w-full lg:w-64 bg-gray-800 text-white p-6 space-y-4 lg:space-y-6">
      <h2 class="text-xl font-bold">Categories</h2>
      <nav class="space-y-2">
        <RouterLink to="/menu/food" class="block p-2 rounded-lg bg-gray-800 hover:bg-green-500" active-class="bg-green-600">Fast-Food</RouterLink>
        <RouterLink to="/menu/drink" class="block p-2 rounded-lg bg-gray-800 hover:bg-green-500" active-class="bg-green-600">Coffee</RouterLink>
      </nav>
    </aside>
    
    <!-- Main Content -->
    <main class="flex-1 p-8 bg-gray-100">
      <h1 class="text-3xl font-bold text-gray-900 mb-6">Explore Our Coffee Menu</h1>
      
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <coffeeCard v-for="(drinks, index) in store.itemsDrink" :key="index" :propIndex="index" :propDrink="drinks" @coffeeCardClicked="store.coffeeBtnClicked"/>
      </div>
    </main>
  </div>
   <div>
    <Footer />
   </div>
</template>