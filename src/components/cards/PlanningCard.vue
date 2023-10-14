<template>
    <div class="bg-white rounded-lg shadow p-4 h-full">
          <!-- HEADER -->
          <div class="md:flex md:items-start md:justify-between text-center md:text-start">
            <div class="flex-shrink-0 rounded-3xl shadow p-1 bg-gray-100 mr-2 w-20 items-center text-center hidden md:block">
              <font-awesome-icon :icon="icon" class="text-5xl text-purple-700" />
            </div> 
            <div class="flex-grow ml-1">
              <h2 class="text-xl font-semibold text-gray-800">{{ name }}</h2>
              <p class="text-gray-600">{{ subtitle }}</p>
            </div>
            <div class="self-start hidden md:block" @click="EditCurrentCard(id)">
              <font-awesome-icon icon="edit" class="text-2xl text-purple-700 cursor-pointer hover:text-purple-600" />
            </div>
            <div class="self-start hidden md:block pl-2" @click="DeleteCurrentCard(id)">
              <font-awesome-icon icon="trash" class="text-2xl text-purple-700 cursor-pointer hover:text-purple-600" />
            </div>
          </div>
          <!-- Body -->
          <div class="flex mt-5  ">
            <div class="bg-gray-200 rounded-xl p-3  mr-1">
                <h2 class="text-sm font-semibold text-gray-800">R${{ aport }} <span class="text-gray-600">/ R${{ objective }}</span></h2>
                <div class="flex-end pt-1">
                    <h2 class="text-sm font-semibold text-gray-800"><BasicPill size="sm" color="bg-success" text-color="text-green-800" icon="hide" :text="i_progress + '% ' + $t('investments.generic.completed')"  /></h2>          
                </div>
            </div>
            <div class="flex-grow" />
            <div class="flex-end bg-gray-200 rounded-xl p-3">
              <h2 class="text-sm font-semibold text-gray-700 ">{{ $t('investments.generic.start_date') }}: <span class="text-gray-600">{{  formatDate(createdAt) }}</span></h2>
              <p class="text-gray-600">{{ $t('investments.generic.total_days') }}: {{ calcDays(createdAt) }}</p>
            </div>
          </div>
          <div class="pt-2 pb-2 pl-1 whitespace-normal">
            <h2 class="text-sm font-semibold text-gray-600">{{ description }}</h2>
          </div>
          <hr />
          <!-- ProgressBar -->
          <div class="flex mt-2">
            <div class="w-full bg-gray-200 rounded-lg overflow-hidden">
                <div class="bg-purple-500 h-2" :style="{ width: i_progress + '%' }"></div>
            </div>
          </div>
              
        </div>
     
</template>

<script>
import PWUtils from '@/utils/PWUtils';
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
    name: {
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
    aport: {
        type: String,
        default: () => '0'
    },
    objective: {
        type: String,
        default: () => '0'
    },
    createdAt: {
        type: String,
        default: () => '00/00/0000'
    },
  },
  computed: {
    i_progress() {
      return PWUtils.progressPercentage(this.aport, this.objective);
    }
  },
  methods: {
    calcDays(date) {
     let formatedDate = date;
      let today = new Date();
      let diff = Math.abs(today - new Date(formatedDate));
      let days = Math.ceil(diff / (1000 * 60 * 60 * 24));
      return days;
    },
    formatDate(date) {
      return PWUtils.formatDate(date);
    },
    EditCurrentCard(id) {
      this.$emit('edit', id);
    },
    async DeleteCurrentCard(id) {
      const response = await PWUtils.PWPopup('Are you sure?', 'This action cannot be undone')
      if(!response) return;
      this.$emit('delete', id);
    }
  }
}
</script>

