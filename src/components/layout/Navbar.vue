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
        <button @click="toggleSidebar" class="block md:hidden  my-4">
          <div class="flex-shrink-0 rounded-md shadow p-3  w-12 items-center text-center">
              <font-awesome-icon icon="bars" class="text-gray-500 font-medium"/>
          </div> 
        </button>
      </div>
    </div>
    <hr class="h-px my-4 border-0 gradient-line" />
    <!-- Links -->
    <ul :class="linksClasses">
      <li v-for="link in navLinks" :key="link.to">
        <router-link
          :to="!link.subLinks ? link.to : ''"
          class="flex items-center p-2 rounded"
          :class="{ 'bg-white': link.to.name === currentRoute.name || link.to.name === currentRoute.middleware, 'text-purple-600': link.active }"
          @click="toggleActiveLink(link)"
        >
          <div class="flex items-center">
            <div class="flex-shrink-0 rounded-md shadow p-3 mr-2 w-12 items-center text-center" :class="{ 'items-center text-center rounded-md shadow p-3 mr-2 bg-gradient-to-tr from-purple-900 to-purple-500 hover:from-purple-800 hover:to-purple-600': link.to.name === currentRoute.name || link.to.name === currentRoute.middleware  }">
              <font-awesome-icon :icon="link.icon" class="text-gray-500 font-medium" :class="{ 'text-white font-medium': link.to.name === currentRoute.name || link.to.name === currentRoute.middleware }" />
            </div> 
            <div class="flex-grow">
              <p class="text-gray-500 font-medium" ><span :class="{ 'text-gray-800 font-bold': link.to.name === currentRoute.name || link.to.name === currentRoute.middleware }">{{ $t(link.text) }}</span></p>
            </div>
          </div>
        </router-link>
        <!-- Sublinks -->
        <ul v-if="link.active && link.subLinks || link.to.name === this.currentRoute.middleware" class="bg-white shadow-lg rounded-md mt-2">
          <li v-for="subLink in link.subLinks" :key="subLink.to">
            <router-link
              :to="subLink.to"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-100 hover:text-gray-900"
              :class="{ 'bg-purple-100 text-gray-900': subLink.to.name === currentRoute.name }"
            >
              {{ $t(subLink.text) }}
            </router-link>
          </li>
        </ul>
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
        { to: {name: "Home"}, icon: 'home',  text: 'navbar.dashboard' },
        { to: {name: "Banking"}, icon: 'landmark',  text: 'navbar.banking' },
        { to: {name: "CreditCards"}, icon: 'credit-card',  text: 'navbar.credit' },
        { to: {name: "Investments"}, icon: 'wallet',  text: 'navbar.investments' },
        {
          to: {name: "Contas"},
          icon: 'money-check-dollar',
          text: 'navbar.travel',
          active: false,
          subLinks: [
            { to: {name: "Spends"}, icon: 'bank', text: 'navbar.spends' },
            { to: {name: "Debts"}, icon: 'piggy-bank', text: 'navbar.debts' },
          ]
        },
        { to: {name: "Profile"}, icon: 'address-card',  text: 'navbar.profile' },
        { to: {name: "Logout"}, icon: 'door-open',  text: 'navbar.disconnect' },
      ],
    };
  },
  methods: {
    toggleSidebar() {
      this.$emit('toggle-sidebar');
    },
    toggleActiveLink(link) {
      this.navLinks.forEach((navLink) => {
        navLink.active = false;
      });
      link.active = true;
    },
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
        'rounded-md shadow bg-white p-2 mr-2' : link.to.name === this.currentRoute.name || link.to.name === this.currentRoute.middleware,
        'rounded-md shadow bg-white p-2 mr-2 hover:bg-purple-100' : !link.to.name === this.currentRoute.name || !link.to.name === this.currentRoute.middleware,
      }
    },
    currentRoute() {
      let middleware = (this.$route.matched[2].path).replace('/', '')
      middleware = middleware.charAt(0).toUpperCase() + middleware.slice(1)
      return {
        name: this.$route.name,
        middleware: middleware
      }
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
