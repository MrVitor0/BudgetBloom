<template>
  <nav class="h-full text-white w-full shadow text-center">
    <!-- Project Name-->
    <div class="flex justify-between items-center flex-grow pr-3 pt-5 md:pt-3">
      <div class="flex items-center  ml-4">
        <img src="@/assets/logo.png" class="w-7 h-7 mr-1">
        <h1 class="text-2xl my-4 font-medium text-black"><span class="text-purple-600 pl-1">Purple</span>Wallet</h1>
      </div>
      <!-- Div que ficará à extrema direita -->
      <div class="flex items-center">
        <button @click="toggleSidebar" class="block md:hidden pr-3 my-4">
          <font-awesome-icon icon="home" class="text-black" />
          <span class="pl-2 text-black">Menu</span>
        </button>
      </div>
    </div>
    <hr class="h-px my-4 border-0 gradient-line" />
    <!-- Links -->
    <ul :class="linksClasses">
      <li v-for="link in navLinks" :key="link.to">
        <router-link :to="link.to" class="flex items-center p-2 rounded " :class="{ 'bg-white': link.to === currentRoute }">
          <div class="flex items-center">
            <div class="flex-shrink-0 rounded-md shadow p-3 mr-2 w-12 items-center text-center" :class="{ 'items-center text-center rounded-md shadow p-3 mr-2 bg-gradient-to-tr from-purple-900 to-purple-500 hover:from-purple-800 hover:to-purple-600': link.to === currentRoute }">
              <font-awesome-icon :icon="link.icon" class="text-gray-500 font-medium" :class="{ 'text-white font-medium': link.to === currentRoute }" />
            </div> 
            <div class="flex-grow">
              <p class="text-gray-500 font-medium" ><span :class="{ 'text-gray-800 font-bold': link.to === currentRoute }">{{ link.text }}</span></p>
            </div>
          </div>
        </router-link>
      </li>
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
  data() {
    return {
      navLinks: [
        { to: '/', icon: 'home', text: 'Dashboard' },
        { to: '/banking', icon: 'landmark', text: 'Banking' },
        { to: '/credit', icon: 'credit-card', text: 'Credit Cards' },
        { to: '/investments', icon: 'wallet', text: 'Investments' },
        { to: '/profile', icon: 'address-card', text: 'Profile' },
        // Add more links here
      ],
    };
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
    },
    LiClasses(link){
      return {
        'rounded-md shadow bg-white p-2 mr-2' : link.to === this.currentRoute,
        'rounded-md shadow bg-white p-2 mr-2 hover:bg-purple-100' : !link.to === this.currentRoute
      }
    },
    currentRoute() {
      return this.$route.path; // Obtém o caminho da rota atual
    }
  }
}
</script>

<style scoped>
.gradient-line {
  background: linear-gradient(to right, white, rgb(191, 191, 191), white);
}

.bg-purple-gradient {
  background: linear-gradient(to bottom, #A78BFA, #8B5CF6);
}

</style>
