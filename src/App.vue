<template>
    <v-app>
        <v-main class="grey lighten-4">
            <router-view/>
        </v-main>
    </v-app>
</template>

<script>


export default {
  name: 'App',
  data: () => ({}),
    beforeCreate() {
        const userAgent = window.navigator.userAgent.toLowerCase();
        this.$store.commit('setIOS', /iphone|ipad/.test(userAgent))
    }
};
</script>
