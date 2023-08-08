<template>
  <div>
    <dashboard-layout>
      <!-- Page content will be inserted here -->
      <router-view></router-view>
    </dashboard-layout>
  </div>
</template>

<script>
import DashboardLayout from './components/DashboardLayout'; // Update the import

export default {
  components: {
    DashboardLayout // Register the updated component name
  }
}
</script>

<style>
/* Add specific styles if necessary */
</style>
