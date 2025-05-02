<script setup>

const props = defineProps({
     propDrink: Object,
     propIndex: Number,
     
})

const emit = defineEmits(['coffeeCardClicked']);

const addCoffee = () => {
    emit('coffeeCardClicked',props.propIndex,props.propDrink);
}
</script>

<template>

        <div class="bg-white shadow-lg rounded-xl p-4 hover:shadow-2xl transition transform hover:scale-105">
          <img :src="propDrink.image" alt="Burger" class="w-full h-40 object-contain rounded-md mb-4">
          <h2 class="text-xl font-semibold">{{ propDrink.name }}</h2>
          <p class="text-gray-800 mt-1"> $ {{ propDrink.price }}</p>
          <button @click="addCoffee" class="mt-3 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 cursor-pointer">Order Now</button>
        </div>
</template>