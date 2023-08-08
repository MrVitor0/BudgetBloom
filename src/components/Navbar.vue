<template>
  <nav class="bg-gray-800 text-white w-full shadow text-center">
    <button @click="toggleSidebar" class="block md:hidden px-6 pt-4 pb-3">
      <font-awesome-icon icon="home" /> 
      <span class="pl-2 text-white">Menu</span>
    </button>
    <!-- Project Name-->
    <div class="flex align-center items-center pl-3 ">
        <img src="@/assets/logo.png" class="w-5 h-5" style="margin-right: 10px;">
        <h1 class="my-4 font-medium">Budget<span class="text-purple-300">Bloom</span></h1>
    </div>

    <hr class="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700">
    <!-- Links -->
    <ul :class="linksClasses">
      <li>
        <router-link to="/" class="p-2 block hover:bg-gray-700 rounded">
          <font-awesome-icon icon="home" />
          <span class="pl-2 text-white">Dashboard</span>
        </router-link>
      </li>
      <li>
        <router-link to="/dashboard" class="p-2 block hover:bg-gray-700 rounded">
          <font-awesome-icon icon="chart-bar" />
          <span class="pl-2 text-white">Sample Page</span>
        </router-link>
      </li>
      <!-- Add more links here -->
    </ul>
  </nav>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default {
  name: 'DashboardNavbar',
  components: {
    FontAwesomeIcon,
  },
  props: {
    isSidebarOpen: Boolean
  },
  methods: {
    toggleSidebar() {
      this.$emit('toggle-sidebar');
    }
  },
  computed: {
    linksClasses() {
      return {
        'hidden md:flex text-start md:flex-col p-4 space-y-4': !this.isSidebarOpen,
        'md:flex md:flex-col text-start p-4 space-y-4': this.isSidebarOpen
      };
    }
  }
}
</script>

<style>
/* Add specific styles if necessary */
</style>
