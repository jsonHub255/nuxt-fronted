// stores/driverStore.js
import { defineStore } from 'pinia';
import { fetchDrivers } from '@/services/driverService';

export const useDriverStore = defineStore('driver', {
  state: () => ({
    drivers: [],
    loading: false,
    error: null,
    nextPage: null,
    totalCount: 0,
    currentSearchQuery: '',
  }),

  actions: {
    async fetchDrivers(searchQuery = '', page = 1) {
      this.loading = true;
      this.error = null;
      try {
        const data = await fetchDrivers(searchQuery, page);
        
        const newDrivers = data.results.map(driver => ({
          value: driver.id,
          label: `${driver.name} - ${driver.driver_license}`
        }));

        if (page === 1) {
          this.drivers = newDrivers;
        } else {
          this.drivers = [...this.drivers, ...newDrivers];
        }

        this.nextPage = data.next;
        this.totalCount = data.count;
        this.currentSearchQuery = searchQuery;
      } catch (error) {
        console.error('Error in fetchDrivers:', error);
        this.error = 'Failed to fetch drivers. Please try again.';
      } finally {
        this.loading = false;
      }
    },

    async loadMoreDrivers() {
      if (this.nextPage && !this.loading) {
        const url = new URL(this.nextPage);
        const page = url.searchParams.get('page');
        await this.fetchDrivers(this.currentSearchQuery, parseInt(page));
      }
    },

    async searchDrivers(query) {
      this.drivers = [];
      this.nextPage = null;
      await this.fetchDrivers(query);
    },
  },
});