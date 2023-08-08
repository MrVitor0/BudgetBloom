<template>

  <img src="@/assets/curved0.jpg" class="rounded-2xl w-screen hidden md:block"> 
  <div class="md:relative flex flex-col flex-auto min-w-0 md:p-4 md:mx-6 md:-mt-16 overflow-hidden break-words border-0 shadow-blur rounded-2xl bg-white/70 bg-clip-border backdrop-blur-2xl backdrop-saturate-200">
    <div class="md:flex md:flex-col">
      <div class="md:flex md:items-center text-center md:text-start">
        <div class="flex-shrink-0 rounded-md shadow p-3 mr-2 w-32 items-center text-center hidden md:block">
          <img src="@/assets/logo.png" class="rounded-2xl w-screen ">
        </div> 
        <div class="flex-grow ml-5 mt-10 md:mt-0">
          <h2 class="text-xl font-semibold mb-2">John Doe</h2>
           <p class="text-gray-600">Product Enginner</p>
        </div>
      
        <div class="md:flex flex-end md:px-5 ">
          <BasicPill text="Plannings" icon="bars" />
          <BasicPill text="Information" icon="user" />
          <BasicPill text="Settings" icon="gear" />
        </div>
      </div>
    </div>
  </div>

  <div class="mt-8 p-6 bg-gray-200">
  <PriceCard />
  </div>
</template>

<script>
import PriceCard from '@/components/cards/PriceCard.vue';
import BasicPill from '@/components/pills/BasicPill.vue';
export default {
  name: 'DashboardProfile',
  components: {
    PriceCard,
    BasicPill
  }
}
</script>

