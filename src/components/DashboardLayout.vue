<template>
  <div>  
    <div class="md:flex h-screen bg-gray-100">
    <!-- Add a div to create a space for the navbar -->
    <div class="md:w-15 bg-gray-800 text-white md:fixed md:h-full top-0 left-0"> 
      <Navbar :isSidebarOpen="isSidebarOpen" @toggle-sidebar="toggleSidebar"></Navbar>
    </div>
    <div class="md:flex-1 md:pl-20  overflow-y-auto md:ml-24 md:mr-5">
      <div class="rounded-lg text-white top-0 left-0"> 
        <Header :isSidebarOpen="isSidebarOpen" @toggle-sidebar="toggleSidebar"></Header>
      </div>
      <div class="md:pt-5">
        <router-view></router-view>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import Navbar from './Navbar.vue';
import Header from './Header.vue';
export default {
  components: {
    Navbar,
    Header
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
