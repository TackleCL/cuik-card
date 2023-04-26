export default {
  data: () => ({
    social: [
      {
        name: "Facebook",
        icon: "mdi-facebook",
        color: "blue",
        hint: "https://www.facebook.com/",
      },
      {
        name: "Instagram",
        icon: "mdi-instagram",
        color: "purple",
        hint: "https://www.instagram.com/",
      },
      {
        name: "YouTube",
        icon: "mdi-youtube",
        color: "red",
        hint: "https://www.youtube.com/channel/",
      },
      {
        name: "LinkedIn",
        icon: "mdi-linkedin",
        color: "indigo",
        hint: "https://www.linkedin.com/in/",
      },
    ],
  }),

  methods: {
    socialSelected(item) {
      return this.social.find((x) => x.name === item.name);
    },
  },
};
