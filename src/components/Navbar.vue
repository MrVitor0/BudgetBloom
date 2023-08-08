<template>
  <nav class="bg-gray-800 text-white w-full shadow">
    <button @click="toggleSidebar" class="block md:hidden px-6 pt-4 pb-3">
      <font-awesome-icon icon="home" /> 
      <span class="pl-2 text-white">Menu</span>
    </button>
    
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
        'hidden md:flex md:flex-col p-4 space-y-4': !this.isSidebarOpen,
        'md:flex md:flex-col p-4 space-y-4': this.isSidebarOpen
      };
    }
  }
}
</script>

<style>
/* Add specific styles if necessary */
</style>
