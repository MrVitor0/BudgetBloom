<template>
    <div class="bg-white rounded-lg shadow p-4 h-full">
          <!-- HEADER -->
          <div class="md:flex md:items-start md:justify-between text-center md:text-start">
            <div class="flex-shrink-0 rounded-3xl shadow p-1 bg-gray-100 mr-2 w-20 items-center text-center hidden md:block">
              <font-awesome-icon :icon="icon" class="text-5xl text-purple-700" />
            </div> 
            <div class="flex-grow ml-1">
              <h2 class="text-xl font-semibold text-gray-800">{{ title }}</h2>
              <p class="text-gray-600">{{ subtitle }}</p>
            </div>
            <div class="self-start hidden md:block">
              <font-awesome-icon icon="ellipsis-vertical" class="text-2xl text-purple-700 cursor-pointer" />
            </div>
          </div>
          <!-- Body -->
          <div class="flex mt-5  ">
            <div class="bg-gray-200 rounded-xl p-3  mr-1">
                <h2 class="text-sm font-semibold text-gray-800">R${{ fromBudget }} <span class="text-gray-600">/ R${{ toBudget }}</span></h2>
                <p class="text-gray-600">Total Budget</p>
            </div>
            <div class="flex-grow" />
            <div class="flex-end bg-gray-200 rounded-xl p-3">
              <h2 class="text-sm font-semibold text-gray-700 ">Start Date: <span class="text-gray-600">{{  fromDate }}</span></h2>
              <p class="text-sm font-semibold text-gray-700">Deadline: <span class="text-gray-600">{{ toDate }}</span></p>
            </div>
          </div>
          <div class="pt-2 pb-2 pl-1 whitespace-normal">
            <h2 class="text-sm font-semibold text-gray-600">{{ description }}</h2>
          </div>
          <hr />
          <!-- Footer -->
          <div class="flex mt-5 ">
            <div class="p-3">
                <h2 class="text-sm font-semibold text-gray-800">All Aports: {{ fromAport }}/{{ toAport }}</h2>
                <p class="text-gray-600 pt-2">Mounths: {{ fromMounth }}/{{ toMounth }}</p>
            </div>
            <div class="flex-grow" />
            <div class="flex-end pt-1">
                <h2 class="text-sm font-semibold text-gray-800"><BasicPill size="sm" color="bg-success" text-color="text-green-800" icon="hide" text="28 Days Left"  /></h2>
                <p class="text-gray-600 break-words">{{ progress }}% Completed</p>
            </div>
          </div>
          <!-- ProgressBar -->
          <div class="flex mt-1">
            <div class="w-full bg-gray-200 rounded-lg overflow-hidden">
                <div class="bg-purple-500 h-2" :style="{ width: progress + '%' }"> 35</div>
            </div>
          </div>
              
        </div>
     
</template>

<script>
import BasicPill from '@/components/pills/BasicPill.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
export default {
  name: 'DashboardProfile',
  components: {
    BasicPill,
    FontAwesomeIcon,
  },
  props: {
    icon: {
        type: String,
        default: () => 'earth'
    },
    title: {
        type: String,
        default: () => 'Planning Card'
    },
    subtitle: {
        type: String,
        default: () => 'Planning Subtitle'
    },
    description: {
        type: String,
        default: () => 'Planning Description'
    },
    fromBudget: {
        type: String,
        default: () => '0'
    },
    toBudget: {
        type: String,
        default: () => '0'
    },
    fromDate: {
        type: String,
        default: () => '00/00/0000'
    },
    toDate: {
        type: String,
        default: () => '00/00/0000'
    },
    fromAport: {
        type: String,
        default: () => '0'
    },
    toAport: {
        type: String,
        default: () => '0'
    },
    fromMounth: {
        type: String,
        default: () => '0'
    },
    toMounth: {
        type: String,
        default: () => '0'
    },
    progress: {
        type: String,
        default: () => '10'
    },
  },
}
</script>

