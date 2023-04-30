<template>
    <div id="profile">
        <!--cover-->
        <v-card flat  tile color="indigo" height="180"></v-card>

        <!--content-->
        <v-container>
            <v-card flat style="margin-top: -90px" class="mb-8">

                <!-- info: basic -->
                <v-list-item two-line>

                    <!-- photo -->
                    <v-list-item-avatar class="rounded" size="100" style="margin-top: -40px">
                        <v-img :alt="`${data.lastname} avatar`" :src="data.photo" v-if="data.photo"/>
                        <v-icon class="grey lighten-1" large dark v-else>mdi-account-outline</v-icon>
                    </v-list-item-avatar>

                    <!-- info -->
                    <v-list-item-content>
                        <v-list-item-title class="font-weight-medium text-h6">
                            {{ `${data.firstname} ${data.lastname}` }}
                        </v-list-item-title>
                        <v-list-item-subtitle class="text-subtitle-1">
                            {{ data.title }} <span v-if="data.organization">• {{ data.organization }}</span>
                        </v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>

                <!-- information -->
                <v-card-text class="black--text">
                    <v-btn large dark block depressed @click="downloadCard">
                        Agregar a contacto
                    </v-btn>

                    <!-- social -->
                    <div class="profile-social mt-4 mb-9">
                        <h3 class="text-subtitle-1 font-weight-medium mb-2">Redes Sociales</h3>
                        <template v-for="(item, index) in data.social">
                            <v-btn :key="index" fab depressed color="grey lighten-3" class="rounded mr-3"
                                   :href="selected(item).hint + item.username" target="_blank">
                                <v-icon :color="selected(item).color">{{ selected(item).icon }}</v-icon>
                            </v-btn>
                        </template>
                    </div>

                    <!-- contact -->
                    <div class="contact">
                        <h3 class="text-subtitle-1 font-weight-medium mb-2">Información de Contacto</h3>

                        <!-- tel-->
                        <div class="tel" v-if="item.contact.tel_home">
                            <v-list-item class="px-0">
                                <v-list-item-icon>
                                    <v-icon>mdi-phone-outline</v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-subtitle class="font-weight-medium">Trabajo</v-list-item-subtitle>
                                    <v-list-item-title class="font-weight-medium">+56 {{ item.contact.tel_home }}
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-divider/>
                        </div>

                        <!-- tel: work-->
                        <div class="tel" v-if="item.contact.tel_work">
                            <v-list-item class="px-0">
                                <v-list-item-icon>
                                    <v-icon>mdi-phone-outline</v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-subtitle class="font-weight-medium">Trabajo</v-list-item-subtitle>
                                    <v-list-item-title class="font-weight-medium">+56 {{ item.contact.tel_work }}
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-divider/>
                        </div>

                        <!-- email-->
                        <div class="tel" v-if="item.contact.email">
                            <v-list-item class="px-0">
                                <v-list-item-icon>
                                    <v-icon>mdi-email-outline</v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-subtitle class="font-weight-medium">Trabajo</v-list-item-subtitle>
                                    <v-list-item-title class="font-weight-medium">{{ item.contact.email }}
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-divider/>
                        </div>

                        <!-- email: work-->
                        <div class="tel" v-if="item.contact.email_work">
                            <v-list-item class="px-0">
                                <v-list-item-icon>
                                    <v-icon>mdi-email-outline</v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-subtitle class="font-weight-medium">Trabajo</v-list-item-subtitle>
                                    <v-list-item-title class="font-weight-medium">{{ item.contact.email_work }}
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-divider/>
                        </div>

                        <!-- web-->
                        <div class="tel" v-if="item.contact.web">
                            <v-list-item class="px-0">
                                <v-list-item-icon>
                                    <v-icon>mdi-web</v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-subtitle class="font-weight-medium">Trabajo</v-list-item-subtitle>
                                    <v-list-item-title class="font-weight-medium">{{ item.contact.web }}
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-divider/>
                        </div>
                    </div>
                </v-card-text>
            </v-card>
            11
        </v-container>

        <!-- loading -->
        <v-overlay :value="loading"></v-overlay>
    </div>
</template>

<script>
import Social from "@/mixins/social";

export default {
  name: "Profile",
  props: ['data'],
  mixins: [Social],
  data: () => ({item: {contact: []}, loading: false}),

  watch: {
    data(e) {
      this.item = e
    }
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
              const extension = urlImagen.split('.').pop().split(/#|\?/)[0].toUpperCase();
              resolve({image: base64data, type: extension})
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
          `TEL;TYPE=Trabajo,VOICE:${objeto.contact.tel_work ? '+' + 56 +objeto.contact.tel_work : ''}`,
          `EMAIL;TYPE=Personal:${objeto.contact.email ? objeto.contact.email : ''}`,
          `EMAIL;TYPE=Trabajo:${objeto.contact.email_work ? objeto.contact.email_work : ''}`,
          `URL;TYPE=Sitio Web:${objeto.contact.web ? objeto.contact.web : ''}`,
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

<style scoped>

</style>