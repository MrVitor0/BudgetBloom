<template>
  <div>
    <div class="md:flex h-screen bg-gray-100">
    <!-- Add a div to create a space for the navbar -->
    <div class="md:w-15 bg-gray-800 text-white md:fixed md:h-full top-0 left-0"> 
      <navbar :isSidebarOpen="isSidebarOpen" @toggle-sidebar="toggleSidebar"></navbar>
    </div>
    <div class="md:flex-1 md:pl-20 md:pt-10 overflow-y-auto md:ml-24">
      <router-view></router-view>
    </div>
  </div>
  </div>
</template>

<script>
import Navbar from './Navbar.vue';

export default {
  components: {
    Navbar
  },
  data() {
    return {
      isSidebarOpen: false
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    }
  }
}
</script>

<style>
/* Add specific styles if necessary */
</style>
