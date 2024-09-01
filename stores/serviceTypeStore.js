// stores/serviceTypeStore.js
import { defineStore } from 'pinia';
import { fetchServiceTypes } from '@/services/serviceTypeService';

export const useServiceTypeStore = defineStore('serviceType', {
  state: () => ({
    serviceTypes: [],
    loading: false,
    error: null,
  }),
  actions: {
    async fetchServiceTypes() {
      this.loading = true;
      this.error = null;
      try {
        const data = await fetchServiceTypes();
        this.serviceTypes = data; // The API now returns the correct format directly
      } catch (error) {
        console.error('Error in fetchServiceTypes:', error);
        this.error = 'Failed to fetch service types. Please try again.';
      } finally {
        this.loading = false;
      }
    },
  },
});