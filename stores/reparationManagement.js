// fronted_nuxt/stores/reparationManagement.js
import { defineStore } from 'pinia';
import { createReparation, getReparationById, updateReparation } from '@/services/reparationService';
import { useProductManagementStore } from './productManagement';

export const useReparationManagementStore = defineStore('reparationManagement', {
  state: () => ({
    reparations: [],
    currentReparation: null,
  }),
  actions: {
    async fetchReparation(reparationId) {
      try {
        const reparation = await getReparationById(reparationId);
        this.currentReparation = reparation;
      } catch (error) {
        console.error('Failed to fetch reparation:', error);
        throw error;
      }
    },
    async addReparation(reparationData) {
      try {
        console.log('Sending reparation data to server:', reparationData);
        const reparation = await createReparation(reparationData);
        console.log('Received response from server:', reparation);
        
        if (!reparation || typeof reparation !== 'object') {
          console.error('Unexpected response format:', reparation);
          throw new Error('Unexpected response format from server');
        }
        
        if (!reparation.id) {
          console.error('Response missing id:', reparation);
          throw new Error('Server response missing reparation id');
        }
        
        this.reparations.push(reparation);
        return reparation;
      } catch (error) {
        console.error('Error in addReparation:', error);
        if (error.response) {
          console.error('Server error response:', error.response.data);
          throw new Error(`Server error: ${JSON.stringify(error.response.data)}`);
        } else if (error.request) {
          console.error('No response received:', error.request);
          throw new Error('No response received from server');
        } else {
          throw error;
        }
      }
    },
    async updateReparation(reparationId, reparationData) {
      try {
        const updatedReparation = await updateReparation(reparationId, reparationData);
        const index = this.reparations.findIndex(r => r.id === reparationId);
        if (index !== -1) {
          this.reparations[index] = updatedReparation;
        }
        return updatedReparation;
      } catch (error) {
        console.error('Failed to update reparation:', error);
        throw error;
      }
    },
    async scanAndAddProduct(sku) {
      const productStore = useProductManagementStore();
      try {
        const product = await productStore.fetchProductBySKU(sku);
        if (product && this.currentReparation) {
          this.currentReparation.order_item_usages_write.push({
            sku: product.sku,
            usage_type: 'total_units',
            total_units_used: 1,
          });
        }
        return product;
      } catch (error) {
        console.error('Failed to scan and add product:', error);
        throw error;
      }
    },
  },
});