<template>
      <div class="md:flex h-full">
        <div class="md:w-56 text-white md:fixed md:h-full top-0 left-0">
          <Navbar :isSidebarOpen="isSidebarOpen" @toggle-sidebar="toggleSidebar"></Navbar>
        </div>
        <!-- Layout Rendering -->
        <div class="md:flex-1 md:pl-60 md:pr-5 md:pt-5 overflow-x-hidden">
          <div class="hidden md:block rounded-lg text-white top-0 left-0 md:mb-2">
            <Header :isSidebarOpen="isSidebarOpen" @toggle-sidebar="toggleSidebar"></Header>
          </div>
          <router-view ></router-view>
        </div>
       <!-- Layout Rendering -->
      </div>
</template>

<script>
import Navbar from './Navbar.vue';
import Header from './Header.vue';
export default {
  name: 'DashboardLayout',
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
/* Personalize a barra de rolagem */
::-webkit-scrollbar {
    width: 5px;
}

::-webkit-scrollbar-thumb {
    background-color: #9c19c1;
    border-radius: 5px;
}

::-webkit-scrollbar-track {
    background-color: #dfc0f5;
}
</style>