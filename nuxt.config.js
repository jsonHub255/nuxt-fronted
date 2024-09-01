export default defineNuxtConfig({
  modules: [
    'nuxt-primevue'
  ],
  primevue: {
    components: {
      include: ['Button', 'InputText', 'InputNumber', 'AutoComplete', 'Dropdown', 'Textarea', 'PickList']
    },
    directives: {
      include: ['Tooltip', 'Ripple']
    },
  },
  css: [
    'primevue/resources/themes/lara-light-blue/theme.css',
    'primevue/resources/primevue.css',
    'primeicons/primeicons.css',
  ],
  build: {
    transpile: ['primevue']
  },
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL
    }
  },
  compatibilityDate: "2024-08-26",
});