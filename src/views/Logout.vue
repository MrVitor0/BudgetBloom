<template>
  <div>
    Logging out...
  </div>
</template>

<script>
export default {
  name: 'LogoutPage',
  async created() {
    await this.$store.dispatch('auth/logout');
    this.$router.push({ name: 'Login' });
  },
};
</script>