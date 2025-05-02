<script setup>
import hero from '@/components/heroCard.vue';
import itemcard from '@/components/itemCard.vue';
import { useStore} from '@/store/piniastore.js';
import { useRouter } from'vue-router';
import Footer from '@/components/footer.vue';

const router = useRouter();

const store = useStore();


const  navigateMenu = () => {
     router.push('/menu/food');

}

const goToSignUp = () => {
  router.push('/signup');
}


</script>
  


<template>
    <div class="bg-gray-100">

      <!-- Hero Section -->
      <hero />
     </div>


      <!-- Categories Section -->
      <div class="px-4 py-12 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <!-- Title & Subtitle -->
        <div class="mb-10 text-center lg:text-center">
          <h1 
            class="text-2xl font-bold tracking-wide text-gray-900 
              sm:text-3xl md:text-4xl lg:text-5xl"
          >
            DISCOVER AND EAT
          </h1>
          <p 
            class="mt-3 text-base text-gray-600 
              sm:text-lg md:text-xl lg:max-w-2xl lg:mx-auto"
          >
            Low fat high protein powerhouse recipes!
          </p>
        </div>
  


        <!-- Grid Layout for Items -->
        <div class="flex justify-center">
            <div class="grid max-w-screen-xl gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

            <itemcard  v-for="(item,index) in store.limitedItems" :key="index" :propitemData="item" :indexProp="index"  @foodBtnClicked="store.foodBtnClicked" class="w-full" />
          </div>
        </div>
  

        <!-- Browse All Button -->
        <div class="mt-12 flex justify-center ">
          <button  @click="navigateMenu"
            class="px-6 py-3 text-white bg-yellow-600 rounded-lg 
              font-semibold text-base shadow-md 
              hover:bg-yellow-700 hover:shadow-lg 
              focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 
              transition duration-300 ease-in-out 
              sm:px-8 sm:py-4 sm:text-lg"
          >
            Browse All
          </button>
        </div>
      </div>








      <!-- New Section: Featured Recipes / Highlights -->
    <div class="bg-white px-4 py-16 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <h2 
        class="text-2xl font-bold text-gray-900 text-center 
          sm:text-3xl md:text-4xl mb-10"
      >
        Featured Recipes
      </h2>
      <div 
  class="grid w-full max-w-screen-xl mx-auto gap-8 
         grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
>
  <!-- Card 1 -->
  <div class="bg-gray-50 rounded-lg p-6 shadow-md hover:shadow-lg  hover:scale-105transition-shadow group cursor-pointer">
    <img 
      src="/ChickenProtein.jpg" 
      alt="Chicken" 
      class="h-48 w-full object-cover rounded-md mb-4 transition-all duration-300 
              group-hover:scale-105 
             select-none pointer-events-none"
    >
    <h3 class="text-lg font-semibold text-gray-800">Protein-Packed Chicken Meat</h3>
    <p class="text-gray-600 mt-2">Quick, tasty, and under 500 calories!</p>
  </div>

  <!-- Card 2 -->
  <div class="bg-gray-50 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow group cursor-pointer">
    <img 
      src="/LeanBeef.jpg" 
      alt="Lean Beef" 
      class="h-48 w-full object-cover rounded-md mb-4 hover:scale-105 transition-all duration-300 
              group-hover:scale-105 
             select-none pointer-events-none"
    >
    <h3 class="text-lg font-semibold text-gray-800">Lean Beef Meat</h3>
    <p class="text-gray-600 mt-2">High protein, low carbs, big flavor.</p>
  </div>

  <!-- Card 3 -->
  <div class="bg-gray-50 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow group cursor-pointer">
    <img 
      src="/PotatoCarbs.jpg" 
      alt="Potatoes" 
      class="h-48 w-full object-cover rounded-md mb-4  hover:scale-105 transition-all duration-300 
             group-hover:scale-105 
             select-none pointer-events-none"
    >
    <h3 class="text-lg font-semibold text-gray-800">Rich Carb Potatoes</h3>
    <p class="text-gray-600 mt-2">Rich baked carbs in every bite.</p>
  </div>
</div>
    </div>







    <!-- New Section: Call-to-Action / Sign-Up -->
    <div class="bg-yellow-50 px-4 py-16 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <div class="max-w-3xl mx-auto text-center">
        <h2 
          class="text-2xl font-bold text-gray-900 
            sm:text-3xl md:text-4xl mb-6"
        >
          Ready to Fuel Your Day?
        </h2>
        <p 
          class="text-base text-gray-600 
            sm:text-lg md:text-xl mb-8"
        >
          Sign up now to get exclusive recipes and meal plans tailored to your goals.
        </p>
        <button @click="goToSignUp" 
          class="px-6 py-3 text-white bg-yellow-600 rounded-full 
            font-semibold text-base shadow-lg 
            hover:bg-yellow-700 hover:shadow-xl 
            focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 
            transition duration-300 ease-in-out 
            sm:px-8 sm:py-4 sm:text-lg"
        >
          Get Started
        </button>
      </div>
    </div>
     
     <div>
      <Footer/>
     </div>
    
  </template>