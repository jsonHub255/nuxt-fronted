// plugins/axios.js
import axios from 'axios';

export default defineNuxtPlugin((nuxtApp) => {
  const api = axios.create({
    baseURL: process.env.NUXT_PUBLIC_API_BASE_URL,
  });

  // Optional: Add interceptors or additional configuration here
  api.interceptors.request.use(config => {
    // Modify request here if necessary
    return config;
  });

  api.interceptors.response.use(response => {
    // Modify response here if necessary
    return response;
  });

  // Make the `api` instance available globally in the Nuxt app
  nuxtApp.provide('api', api);
});
