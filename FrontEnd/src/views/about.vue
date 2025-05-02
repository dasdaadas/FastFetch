<script setup>
import { useRouter } from 'vue-router';
import Footer from '@/components/footer.vue';

const router = useRouter();
</script>

<template>
  <div class="bg-gray-100 min-h-screen flex flex-col">
    <!-- Header Section -->
    <div class="bg-gray-700 text-white py-12 text-center">
      <h1 class="text-4xl font-bold ">About Us</h1>
      <p class="mt-2 text-lg ">Our mission is to fuel your day with the best high-protein recipes!</p>
    </div>

    <!-- Content Section -->
    <div class="max-w-4xl mx-auto py-12 px-6 flex-grow">
      <h2 class="text-2xl font-semibold text-gray-900 mb-4">Who We Are</h2>
      <p class="text-gray-700 mb-6">
        We are passionate food lovers dedicated to providing nutritious and delicious high-protein meals.
        Our goal is to make healthy eating easy, enjoyable, and accessible to everyone.
      </p>

      <h2 class="text-2xl font-semibold text-gray-900 mb-4">Our Vision</h2>
      <p class="text-gray-700 mb-6">
        We believe that eating right shouldn't be a challenge. Our vision is to inspire people to eat clean,
        build strength, and enjoy every bite of their journey toward a healthier lifestyle.
      </p>

      <h2 class="text-2xl font-semibold text-gray-900 mb-4">Join Us</h2>
      <p class="text-gray-700 mb-6">
        Be part of our community! Follow us for daily meal inspirations, cooking tips, and exclusive recipes.
      </p>

      <button @click="router.push('/')"
        class="px-6 py-3 text-white bg-green-600 rounded-lg font-semibold text-base shadow-md 
        hover:bg-green-800 transition duration-300 ease-in-out cursor-pointer">
        Back to Home
      </button>
    </div>

    <!-- Footer -->
    <Footer />
  </div>
</template>
