export default defineNuxtConfig({
  modules: [
    // '@pinia/nuxt',
    '@primevue/nuxt-module',
  ],
  primevue: {
    theme: 'saga-blue', // Use a valid theme name
    ripple: true, // Enable ripple effect if needed
    components: ['Menubar', ],
  },
  css: [
    'primevue/resources/primevue.min.css', // PrimeVue core CSS
    'primevue/resources/themes/saga-blue/theme.css', // Theme CSS (replace with your chosen theme)
    'primeicons/primeicons.css', // PrimeIcons CSS
  ],
  axios: {
    baseURL: process.env.NUXT_PUBLIC_API_BASE_URL,
  },
  compatibilityDate: "2024-08-26",
});
