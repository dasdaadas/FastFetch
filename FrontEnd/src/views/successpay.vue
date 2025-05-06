<script setup>
import { onMounted,ref } from 'vue';
import { useRouter } from 'vue-router';

const num = ref(0);

const router = useRouter();

onMounted(()=>{
    const interval = setInterval( () => {
          if(num.value < 3){
            num.value++;
          } else{
            clearInterval(interval);
            router.replace('/final');
          }
     
    },1000)
})
</script>



<<template>
    <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 class="text-4xl font-bold text-green-600 mb-6">Successful Payment</h1>
      <p class="text-lg text-gray-700">
        Redirecting to Memo page in ...<span class="text-2xl font-bold text-blue-600">{{ num }}</span> seconds
      </p>
    </div>
  </template>