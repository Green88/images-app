<template>
    <div>Loading...</div>
</template>

<script>
    import { mapActions } from 'vuex';

    export default {
        name: 'AuthHandler',
        methods: {
            ...mapActions(['finalizeLogin'])
        },
        created() {
            // eslint-disable-next-line
            console.log('window.location.hash', window.location.hash);
            this.finalizeLogin(window.location.hash);
        }
    }
</script>

<style></style>