<script setup>

const props = defineProps({
    propitemData: Object,
    indexProp: Number,
});


const emit = defineEmits(['foodBtnClicked']);


const addFood = () => {
     emit('foodBtnClicked',props.indexProp,props.propitemData);
}

</script>


<template>
 
 <div class="flex flex-col items-center bg-gradient-to-br from-white to-gray-100 shadow-2xl rounded-2xl p-6 w-80 transition duration-300 hover:shadow-3xl hover:scale-105 backdrop-blur-md border border-gray-200">
  <!-- Image -->
  <div class="w-full relative">
    <img :src="props.propitemData.image" alt="Food Image" class="w-full h-56 object-contain rounded-xl"/>
    <div class="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-3 py-1 rounded-full shadow-md">Best Seller</div>
  </div>

  <!-- Text & Button -->
  <div class="text-center mt-5 px-5 pb-5">
    <h2 class="text-2xl font-bold text-gray-900 tracking-wide">{{ props.propitemData.name }}</h2>
    <p class="text-lg text-gray-800 font-medium mt-2">${{ props.propitemData.price }}</p>
    
    <button @click="addFood" class="mt-5 bg-yellow-500 text-white py-3 px-6 rounded-xl font-semibold text-lg shadow-md hover:bg-yellow-600 hover:scale-105 transition duration-300 cursor-pointer">
      Order Now
    </button>
  </div>
</div>



</template>