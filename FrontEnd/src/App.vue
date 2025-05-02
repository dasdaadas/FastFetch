<script setup>
  import navbar from '@/components/navBar.vue';
  import { RouterView,useRoute,useRouter } from 'vue-router';
  import {computed,onMounted,nextTick} from 'vue';
  import { useStore } from './store/piniastore';
  

 const route = useRoute();
 const store = useStore();
 const hiddenRouteNames = [
  'aboutpage',
  'checkoutpage',
  'finalpaypage',
  'orderspage',
  'confirmresetpage',
  'failurepaypage',
  'successpaypage',
  'errorroute', // important for 404
];
 

 const showNavBar = computed(()=> !hiddenRouteNames.includes(route.name))

      
onMounted( async ()=>{
     store.verifyCookie();
})


</script>




<template>
    <navbar v-if="showNavBar" />
    <RouterView/>
</template>