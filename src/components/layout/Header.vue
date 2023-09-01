<template>
    <nav class=" text-white w-full  flex justify-between items-center py-2">
      <div class="flex flex-col ">
        <!-- Nome da página atual -->
        <p class="font-semibold text-BBPurple opacity-70"><span class="opacity-50">PurpleWallet / </span>{{ currentRoute }}</p>
        <!-- Rota atual com opacidade menor -->
        <p class="font-bold text-xl text-gray-700">{{ currentPageName  }}</p>
      </div>
      <div class="flex items-center text-BBPurple">
        <div class="relative">
          <BBInputHandler icon="search">
            <BBTextInput icon="search" placeholder="Search..." />
          </BBInputHandler>
        </div>
        <div class="mr-4">
            <font-awesome-icon icon="user" class="text-xl text-purple-700 cursor-pointer pl-4" @click="openUserSettings" />
            <font-awesome-icon icon="wrench" class="text-xl text-purple-700 cursor-pointer pl-4" @click="openNotifications" />
            <font-awesome-icon @click="logout" icon="sign-out" class="text-xl text-purple-700 cursor-pointer pl-4"  />
        </div>
      </div>
    </nav>
  </template>
  
  <script>
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  import BBInputHandler from '../form/common/BBInputHandler.vue';
  import BBTextInput from '@/components/form/BBTextInput.vue';
  import PWUtils from '@/utils/PWUtils';
  export default {
    name: 'DashboardHeader',
    components: {
      FontAwesomeIcon,
      BBInputHandler,
      BBTextInput
    },
    props: {
      isSidebarOpen: Boolean
    },
    computed: {
      currentPageName() {
        // Replace with logic to get the current page name
        return this.$route.name;
      },
      currentRoute() {
        // Replace with logic to get the current route
       return this.$route.path.slice(1).charAt(0).toUpperCase() + this.$route.path.slice(2);
      }
    },
    methods: {
      logout(){
        this.$store.dispatch('auth/logout')
        PWUtils.PWNotification('success', 'Logout Successful!')
        this.$router.push({ name: 'Login' })
      }
    }
  }
  </script>
  
  <style scoped>
  /* Add specific styles if necessary */
  </style>
  