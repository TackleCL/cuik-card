<template>
    <div id="profile">
        <!--cover/meta-->
        <meta name="theme-color" :content="themeColor" v-if="themeColor">
        <v-card flat tile :color="themeColor" height="150"></v-card>

        <!--content-->
        <v-container>
            <v-row justify="center">
                <v-col cols="12" md="6" lg="5">

                    <!-- photo -->
                    <div class="content-photo d-flex justify-center" style="margin-top: -105px">
                        <v-avatar size="180" color="grey lighten-4">

                            <v-img :src="data.photo" :lazy-src="data.photo" v-if="data.photo" :alt="data.lastname">
                                <template v-slot:placeholder>
                                    <v-row class="fill-height ma-0" align="center" justify="center">
                                        <v-progress-circular indeterminate color="black"/>
                                    </v-row>
                                </template>
                            </v-img>

                            <v-icon class="grey lighten-1" x-large dark v-else>mdi-account-outline</v-icon>
                        </v-avatar>
                    </div>

                    <!-- basic -->
                    <div class="profile-basic text-center mt-6">
                        <h1 class="text-h4 font-weight-medium">Juan Maurelia</h1>
                        <h6 class="text-subtitle-1 text--secondary">Diseñador UX <span>- Arauco</span></h6>
                    </div>

                    <!-- social -->
                    <div class="profile-social text-center mt-6" v-if="data.social">
                        <template v-for="(item, index) in data.social">
                            <v-btn fab depressed color="blue-grey lighten-5" class="rounded-lg mx-2" :key="index">
                                <v-icon class="text-h4" :color="selected(item).color">{{ selected(item).icon }}</v-icon>
                            </v-btn>
                        </template>
                    </div>

                    <!-- button -->
                    <div class="profile-button px-4 mt-6">
                        <v-btn x-large dark :color="themeColor" block rounded depressed @click="downloadCard"
                               class="font-weight-bold">
                            Agregar Contacto
                        </v-btn>
                    </div>

                    <!-- contact -->
                    <div class="profile-contact px-4 mt-6">

                        <h3 class="text-subtitle-1 font-weight-medium mb-3">Información</h3>

                        <!-- tel -->
                        <v-card flat v-if="item.contact.tel_home" class="mb-3">
                            <v-list-item class="px-2">
                                <v-list-item-avatar class="grey lighten-2 rounded" size="47">
                                    <v-icon>mdi-phone-outline</v-icon>
                                </v-list-item-avatar>
                                <v-list-item-content>
                                    <v-list-item-subtitle class="font-weight-medium">Teléfono</v-list-item-subtitle>
                                    <v-list-item-title class="font-weight-medium text-subtitle-1">
                                        +56 {{ item.contact.tel_home }}
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-card>
                        <!-- tel: work -->
                        <v-card flat v-if="item.contact.tel_work" class="mb-3">
                            <v-list-item class="px-2">
                                <v-list-item-avatar class="grey lighten-2 rounded" size="47">
                                    <v-icon>mdi-phone-outline</v-icon>
                                </v-list-item-avatar>
                                <v-list-item-content>
                                    <v-list-item-subtitle class="font-weight-medium">Trabajo</v-list-item-subtitle>
                                    <v-list-item-title class="font-weight-medium text-subtitle-1">
                                        +56 {{ item.contact.tel_work }}
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-card>
                        <!-- email-->
                        <v-card flat v-if="item.contact.email" class="mb-3">
                            <v-list-item class="px-2">
                                <v-list-item-avatar class="grey lighten-2 rounded" size="47">
                                    <v-icon>mdi-email-outline</v-icon>
                                </v-list-item-avatar>
                                <v-list-item-content>
                                    <v-list-item-subtitle class="font-weight-medium">Correo</v-list-item-subtitle>
                                    <v-list-item-title class="font-weight-medium text-subtitle-1">
                                        {{ item.contact.email }}
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-card>
                        <!-- email: work-->
                        <v-card flat v-if="item.contact.email_work" class="mb-3">
                            <v-list-item class="px-2">
                                <v-list-item-avatar class="grey lighten-2 rounded" size="47">
                                    <v-icon>mdi-email-outline</v-icon>
                                </v-list-item-avatar>
                                <v-list-item-content>
                                    <v-list-item-subtitle class="font-weight-medium">Trabajo</v-list-item-subtitle>
                                    <v-list-item-title class="font-weight-medium text-subtitle-1">
                                        {{ item.contact.email_work }}
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-card>
                        <!-- web-->
                        <v-card flat v-if="item.contact.web" class="mb-3">
                            <v-list-item class="px-2">
                                <v-list-item-avatar class="grey lighten-2 rounded" size="47">
                                    <v-icon>mdi-web</v-icon>
                                </v-list-item-avatar>
                                <v-list-item-content>
                                    <v-list-item-subtitle class="font-weight-medium">Sitio Web</v-list-item-subtitle>
                                    <v-list-item-title class="font-weight-medium text-subtitle-1">
                                        +56 {{ item.contact.web }}
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-card>
                    </div>
                </v-col>
            </v-row>

            <p class="text-caption text-center text--secondary mt-3">
                Desarrollado por Cuik.cl
            </p>
        </v-container>

        <v-overlay :value="loading" opacity=".9">
            <div class="text-center">
                <v-chip large class="font-weight-medium mb-2 black--text" color="white">
                    Creando CuikCard
                    <v-progress-circular indeterminate class="ml-3" color="black" width="2" size="20"/>
                </v-chip>

            </div>
        </v-overlay>
    </div>
</template>

<script>
import Social from "@/mixins/social";
import {mapState} from "vuex";

export default {
  name: "Profile",
  props: ['data'],
  mixins: [Social],
  data: () => ({item: {contact: []}, loading: false, themeColor: null}),

  watch: {
    data(e) {
      this.item = e

      if (e.themeColor) {
        this.themeColor = e.themeColor
      } else {
        this.themeColor = '#000000'
      }
    }
  },

  computed: {
    ...mapState(['isIOS'])
  },

  methods: {
    async downloadCard() {
      this.loading = true

      // verify image
      let photo = null
      if (this.item.photo) {
        photo = await this.format64(this.item.photo)
      }

      // create card
      const vCardData = this.createCard({...this.item, photo: photo})

      // download
      const element = document.createElement("a");
      const file = new Blob([vCardData], {type: "text/vcard"});
      element.href = URL.createObjectURL(file);
      element.download = `contacto.vcf`;
      //element.download = `${this.item.lastname.replace(/\s+/g, "_")}.vcf`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);


      this.loading = false
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
              //const extension = urlImagen.split('.').pop().split(/#|\?/)[0].toUpperCase();
              resolve(base64data)
            }
          });
      })
    },

    createCard(objeto) {

      const vcard = [
        'BEGIN:VCARD',
        'VERSION:3.0',
        `N:${objeto.lastname};${objeto.firstname};;;`,
        `FN:${objeto.firstname} ${objeto.lastname}`,
        `ORG:${objeto.organization ? objeto.organization : ''}`,
        `TITLE:${objeto.title ? objeto.title : ''}`,
        `TEL;TYPE=Personal:${objeto.contact.tel_home ? '+' + 56 + objeto.contact.tel_home : ''}`,
        `TEL;TYPE=Trabajo,VOICE:${objeto.contact.tel_work ? '+' + 56 + objeto.contact.tel_work : ''}`,
        `EMAIL;TYPE=Personal:${objeto.contact.email ? objeto.contact.email : ''}`,
        `EMAIL;TYPE=Trabajo:${objeto.contact.email_work ? objeto.contact.email_work : ''}`,
        `URL;TYPE=Sitio Web:${objeto.contact.web ? objeto.contact.web : ''}`,
        `${objeto.photo ? 'PHOTO;ENCODING=b;TYPE=JPEG:' + objeto.photo : ''}`,
      ];

      if (objeto.social && objeto.social.length > 0) {
        objeto.social.forEach((redSocial) => {
          const url = this.selected(redSocial).hint
          vcard.push(`X-SOCIALPROFILE;TYPE=${redSocial.name.toLowerCase()}:${url}${redSocial.username}`);
        });
      }

      vcard.push('END:VCARD');
      return vcard.join('\n');
    }
  }
}
</script>