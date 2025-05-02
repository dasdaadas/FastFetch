<script setup>
  import navbar from '@/components/navBar.vue';
  import { RouterView,useRoute } from 'vue-router';
  import {computed,onMounted} from 'vue';
  import { useStore } from './store/piniastore';

 const route = useRoute();
 const store = useStore();
 const hiddenRoutes = ['/about','/checkout','/final','/orders','/confirmationreset'];

 const showNavBar = computed(()=> !hiddenRoutes.includes(route.path))

onMounted(()=>{
     store.verifyCookie();
})


</script>








<template>
    <navbar v-if="showNavBar" />
    <RouterView/>
</template>