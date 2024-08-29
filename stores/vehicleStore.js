// stores/vehicleStore.js
import { defineStore } from 'pinia';
import { fetchVehicles } from '@/services/vehicleService';

export const useVehicleStore = defineStore('vehicle', {
  state: () => ({
    vehicles: [],
    loading: false,
    error: null,
    nextPage: null,
    totalCount: 0,
    currentSearchQuery: '',
  }),

  actions: {
    async fetchVehicles(searchQuery = '', page = 1) {
      this.loading = true;
      this.error = null;
      try {
        const data = await fetchVehicles(searchQuery, page);
        
        const newVehicles = data.results.map(vehicle => ({
          value: vehicle.id,
          label: `${vehicle.name} - ${vehicle.code}`
        }));

        if (page === 1) {
          this.vehicles = newVehicles;
        } else {
          this.vehicles = [...this.vehicles, ...newVehicles];
        }

        this.nextPage = data.next;
        this.totalCount = data.count;
        this.currentSearchQuery = searchQuery;
      } catch (error) {
        console.error('Error in fetchVehicles:', error);
        this.error = 'Failed to fetch vehicles. Please try again.';
      } finally {
        this.loading = false;
      }
    },

    async loadMoreVehicles() {
      if (this.nextPage && !this.loading) {
        const url = new URL(this.nextPage);
        const page = url.searchParams.get('page');
        await this.fetchVehicles(this.currentSearchQuery, parseInt(page));
      }
    },

    async searchVehicles(query) {
      this.vehicles = [];
      this.nextPage = null;
      await this.fetchVehicles(query);
    },
  },
});