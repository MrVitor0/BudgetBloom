<template>
    Empty
</template>
<script>
export default {
    name: 'EmptyPage',
    async created() {
        this.$router.push({ name: 'Login' });
    },
};
</script>