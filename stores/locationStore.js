// stores/locationStore.js
import { defineStore } from 'pinia';
import { fetchLocations } from '@/services/locationService';

export const useLocationStore = defineStore('location', {
  state: () => ({
    locations: [],
    loading: false,
    error: null,
    nextPage: null,
    totalCount: 0,
    currentSearchQuery: '',
  }),

  actions: {
    async fetchLocations(searchQuery = '', page = 1) {
      this.loading = true;
      this.error = null;
      try {
        const data = await fetchLocations(searchQuery, page);
        
        const newLocations = data.results.map(location => ({
          value: location.id,
          label: location.name
        }));

        if (page === 1) {
          this.locations = newLocations;
        } else {
          this.locations = [...this.locations, ...newLocations];
        }

        this.nextPage = data.next;
        this.totalCount = data.count;
        this.currentSearchQuery = searchQuery;
      } catch (error) {
        console.error('Error in fetchLocations:', error);
        this.error = 'Failed to fetch locations. Please try again.';
      } finally {
        this.loading = false;
      }
    },

    async loadMoreLocations() {
      if (this.nextPage && !this.loading) {
        const url = new URL(this.nextPage);
        const page = url.searchParams.get('page');
        await this.fetchLocations(this.currentSearchQuery, parseInt(page));
      }
    },

    async searchLocations(query) {
      this.locations = [];
      this.nextPage = null;
      await this.fetchLocations(query);
    },
  },
});

