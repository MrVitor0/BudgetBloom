<template>
  <div class="flex h-screen bg-gray-100">
    <navbar></navbar>
    <div class="flex-1 p-8 overflow-y-auto">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Navbar from './Navbar.vue';

export default {
  components: {
    Navbar
  }
}
</script>

<style>
/* Add specific styles if necessary */
</style>
