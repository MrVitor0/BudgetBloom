<template>
    <nav class=" text-white w-full shadow flex justify-between items-center px-4 py-2">
      <div class="flex flex-col ">
        <!-- Nome da página atual -->
        <p class="font-semibold text-black opacity-70">{{ currentRoute }}</p>
        <!-- Rota atual com opacidade menor -->
        <p class="font-bold text-xl text-gray-700">{{ currentPageName  }}</p>
      </div>
      <div class="flex items-center">
        <div class="relative">
            <input type="text" class="text-black border rounded px-2 py-1 pl-8" placeholder="Search...">
            <font-awesome-icon icon="search" class="text-gray-500 absolute left-2 top-1/2 transform -translate-y-1/2" />
        </div>
        <div class="mr-4">
            <font-awesome-icon icon="user" class="text-xl text-gray-600 cursor-pointer pl-4" @click="openUserSettings" />
            <font-awesome-icon icon="bell" class="text-xl text-gray-600 cursor-pointer pl-4" @click="openNotifications" />
            <font-awesome-icon icon="cog" class="text-xl text-gray-600 cursor-pointer pl-4" @click="openAppSettings" />
        </div>
        </div>
    </nav>
  </template>
  
  <script>
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  
  export default {
    name: 'DashboardHeader',
    components: {
      FontAwesomeIcon,
    },
    props: {
      isSidebarOpen: Boolean
    },
    computed: {
      currentPageName() {
        // Replace with logic to get the current page name
        return 'Dashboard';
      },
      currentRoute() {
        // Replace with logic to get the current route
        return 'Pages /' + ' dashboard';
      }
    },
    methods: {
      openSettings() {
        // Replace with logic to open settings
      }
    }
  }
  </script>
  
  <style scoped>
  /* Add specific styles if necessary */
  </style>
  