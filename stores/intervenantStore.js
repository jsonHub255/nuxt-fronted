// stores/intervenantStore.js
import { defineStore } from 'pinia';
import { fetchIntervenants } from '@/services/intervenantService';

export const useIntervenantStore = defineStore('intervenant', {
  state: () => ({
    intervenants: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchIntervenants() {
      this.loading = true;
      this.error = null;
      try {
        const data = await fetchIntervenants();
        this.intervenants = data.results.map(intervenant => ({
          id: intervenant.id,
          name: intervenant.name,
          specialty: intervenant.specialty,
          status: intervenant.status,
        }));
      } catch (error) {
        console.error('Error in fetchIntervenants:', error);
        this.error = 'Failed to fetch intervenants. Please try again.';
      } finally {
        this.loading = false;
      }
    },
  },
});