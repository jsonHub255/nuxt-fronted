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
      }
    },
    async addReparation(reparationData) {
      try {
        const reparation = await createReparation(reparationData);
        this.reparations.push(reparation);
        return reparation;
      } catch (error) {
        console.error('Failed to add reparation:', error);
      }
    },
    async updateReparation(reparationId, reparationData) {
      try {
        const updatedReparation = await updateReparation(reparationId, reparationData);
        const index = this.reparations.findIndex(r => r.id === reparationId);
        if (index !== -1) {
          this.reparations[index] = updatedReparation;
        }
      } catch (error) {
        console.error('Failed to update reparation:', error);
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
      } catch (error) {
        console.error('Failed to scan and add product:', error);
      }
    },
  },
});
