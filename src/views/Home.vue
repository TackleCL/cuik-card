<template>
  <div class="card px-6">
    <v-card flat min-height="90vh">
      <!-- color -->
      <v-toolbar dark flat height="80" />

      <!-- profile-image -->
      <div class="profile-image px-5" style="margin-top: -60px;">
        <v-card width="120" height="120" flat outlined>
          <v-skeleton-loader type="image" height="100%" v-if="loading" />
          <v-avatar color="grey lighten-3" size="100%" class="rounded-sm" v-else>
            <v-img height="100%" width="100%" v-if="profile.image" :src="profile.image" alt="prview" cover />
            <v-icon x-large v-else color="grey lighten-1">mdi-account-outline</v-icon>
          </v-avatar>
        </v-card>
      </div>

      <v-card-text>

        <!-- basic-information -->
        <div class="profile-information">
          <!-- name -->
          <h1 class="text-h5 black--text">
            <v-skeleton-loader type="image" width="50%" height="32" v-if="loading" />
            <span v-else>{{ profile.displayName }}</span>
          </h1>
          <h2 class="text-subtitle-1 mt-1">
            <v-skeleton-loader type="image" width="30%" height="27" v-if="loading" />
            <span v-else>{{ profile.title }} {{ profile.org }}</span>
          </h2>
        </div>

        <v-btn large block dark class="mt-6 rounded-xl" color="primary" @click="downloadCard" :loading="isLoading"
          :disabled="isLoading">
          Descargar Contacto
        </v-btn>

        <!-- social-information -->
        <div class="profile-social mt-6" v-if="profile.social">
          <v-subheader class="px-0 align-center">
            <h3 class="text-subtitle-1 font-weight-bold black--text">Redes Sociales</h3>
          </v-subheader>
          <!--  -->
          <div>
            <v-btn :href="socialSelected(item).hint + item.username" target="_blank" fab depressed class="rounded mr-3"
              v-for="(item, index) in profile.social" :key="index">
              <v-icon :color="socialSelected(item).color">{{ socialSelected(item).icon }}</v-icon>
            </v-btn>
          </div>
        </div>

        <!-- contact-information -->
        <div class="profile-contact mt-6" v-if="profile.contact">
          <!-- header -->
          <v-subheader class="px-0 align-center">
            <h3 class="text-subtitle-1 font-weight-bold black--text">Información de Contacto</h3>
          </v-subheader>

          <!-- content -->
          <div class="social-content">

            <!-- homePhone -->
            <div class="homePhone" v-if="profile.contact.homePhone">
              <v-list-item class="px-0">
                <v-list-item-icon>
                  <v-icon>mdi-phone-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title class="font-weight-semibold">
                    +56 {{ profile.contact.homePhone }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider />
            </div>

            <!-- workPhone -->
            <div class="workPhone" v-if="profile.contact.workPhone">
              <v-list-item class="px-0">
                <v-list-item-icon>
                  <v-icon>mdi-phone-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title class="font-weight-semibold">
                    +56 {{ profile.contact.workPhone }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider></v-divider>
            </div>

            <!-- homeEmail -->
            <div class="homeEmail" v-if="profile.contact.homeEmail">
              <v-list-item class="px-0">
                <v-list-item-icon>
                  <v-icon>mdi-email-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title class="font-weight-semibold">
                    {{ profile.contact.homeEmail }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider></v-divider>
            </div>

            <!-- homeUrl -->
            <div class="homeUrl" v-if="profile.contact.homeUrl">
              <v-list-item class="px-0">
                <v-list-item-icon>
                  <v-icon>mdi-web</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title class="font-weight-semibold">
                    {{ profile.contact.homeUrl }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider></v-divider>
            </div>
          </div>
        </div>
      </v-card-text>

      <!-- overlay -->
      <v-overlay absolute :value="loading" color="white" opacity="1">
        <v-progress-circular indeterminate width="2" color="secondary" />
      </v-overlay>
    </v-card>
  </div>
</template>

<script>
import social from '../mixins/social'
import { db } from '../firebase'
import { doc, getDoc } from "firebase/firestore"

export default {
  name: 'Card',

  mixins: [social],

  data: () => ({
    profile: {},
    loading: true,
    isLoading: false
  }),

  methods: {
    async downloadCard() {

      // image
      let image = ''
      if (this.profile.image) { image = await this.format64(this.profile.image) }

      const vCardData = `BEGIN:VCARD
VERSION:3.0
N:${this.profile.displayName}
TEL;TYPE=WORK,VOICE:${this.profile.contact.workPhone ? this.profile.contact.workPhone : ''}
TEL;TYPE=HOME,VOICE:${this.profile.contact.homePhone ? this.profile.contact.homePhone : ''}
EMAIL:${this.profile.email}
ORG:${this.profile.org}
TITLE:${this.profile.title}
URL;TYPE=Personal:${this.profile.contact.homeUrl ? this.profile.contact.homeUrl : ''}
PHOTO;ENCODING=b;TYPE=JPEG:${image.imageData}
X-SOCIALPROFILE;TYPE=LinkedIn:http://www.linkedin.com/in/juanmaurelia
X-SOCIALPROFILE;TYPE=Instagram:http://www.instagram.com/cuikchile
END:VCARD`;

      const element = document.createElement("a");
      const file = new Blob([vCardData], { type: "text/vcard" });
      element.href = URL.createObjectURL(file);
      element.download = `${this.profile.displayName.replace(/\s+/g, "_")}.vcf`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    },

    format64(urlImagen) {
      return new Promise(resolve => {
        fetch(urlImagen)
          .then(response => response.blob())
          .then(blob => {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
              let base64data = reader.result;
              base64data = base64data.split(',')[1];
              const extension = urlImagen.split('.').pop().split(/#|\?/)[0].toUpperCase();
              resolve({ imageData: base64data, imageType: extension })
            }
          });
      })
    }
  },

  async mounted() {
    if (this.$route.params.id === undefined) return;

    const docRef = doc(db, "users", this.$route.params.id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      this.profile = docSnap.data()
    } else {
      this.$router.push({ name: 'About' })
    }

    this.loading = false
  },
}
</script>
