<template>
    <div id="card-cuik">
        <!-- profile: basic & pro -->
        <profile-view :data="profile" v-if="profile"/>

        <!-- profile: empty -->
        <profile-empty v-if="profile == null"/>

        <!-- SplashScreen -->
        <splash-screen v-model="loading"/>
    </div>
</template>

<script>
import {db} from '@/firebase'
import {query, collection, where, getDocs} from "firebase/firestore";

import ProfileView from "../components/Profile.vue";
import ProfileEmpty from "@/components/Empty.vue";
import SplashScreen from "@/components/SplashScreen.vue";

export default {
  components: {SplashScreen, ProfileView, ProfileEmpty},

  data: () => ({
    profile: {},
    loading: false
  }),

  methods: {
    async onInit(url) {


      // Buscar por URL
      const q1 = query(collection(db, "users"), where("url", "==", url));
      const querySnapshot1 = await getDocs(q1);
      if (!querySnapshot1.empty) {
        this.profile = {contact: [], social: [], ...querySnapshot1.docs[0].data()};
        return;
      }

      // Buscar por CardID
      const q3 = query(collection(db, "users"), where("cardID", "==", url));
      const querySnapshot3 = await getDocs(q3);
      if (!querySnapshot3.empty) {
          this.profile = {contact: [], social: [], ...querySnapshot1.docs[0].data()};
        return;
      }

      this.profile = null
    }
  },

  async created() {
    this.loading = true
    await this.onInit(this.$route.params.url)
    this.loading = false
  }
}
</script>