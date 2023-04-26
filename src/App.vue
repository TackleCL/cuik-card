<template>
  <v-app>
    <v-main class="grey lighten-4">
      <v-container>
        <v-row justify="center">
          <v-col cols="12" md="6" xl="4">
            <router-view />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>


export default {
  name: 'App',

  data: () => ({
    //
  }),


};
</script>
