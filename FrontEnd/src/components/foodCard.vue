<script setup>
const props = defineProps({
    propItem: Object,
    propIndex: Number,
})

const emit = defineEmits(['foodFromMenuClicked']);

const addFoodItem = () => {
    emit('foodFromMenuClicked',props.propIndex,props.propItem);
} 

</script>

<template>

<div class="bg-white shadow-lg rounded-xl p-4 hover:shadow-2xl transition transform hover:scale-105">
          <img :src="props.propItem.image" alt="Burger" class="w-full h-40 object-contain rounded-md mb-4">
          <h2 class="text-xl font-semibold">{{props.propItem.name}}</h2>
          <p class="text-gray-600 mt-1">${{props.propItem.price}}</p>
          <button @click="addFoodItem" class="mt-3 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600">Order Now</button>
        </div>
</template>