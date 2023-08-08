<template>
  <nav class="bg-gray-800 text-white w-16 h-full fixed top-0 left-0 shadow">
    <ul class="flex flex-col p-4 space-y-4">
      <li>
        <router-link to="/" class="p-2 block hover:bg-gray-700 rounded">
          <font-awesome-icon icon="home" />
        </router-link>
      </li>
      <li>
        <router-link to="/dashboard" class="p-2 block hover:bg-gray-700 rounded">
          <font-awesome-icon icon="chart-bar" />
        </router-link>
      </li>
      <!-- Adicione mais links aqui -->
    </ul>
  </nav>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default {
  name: 'DashboardNavbar',
  components: {
    FontAwesomeIcon,
  }
}
</script>

<style>
/* Adicione estilos específicos se necessário */
</style>
