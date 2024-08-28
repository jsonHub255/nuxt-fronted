<template>
  <div class="reparation-form-container">
    <div class="form-header">
      <h2 class="header-title">Add Reparation</h2>
      <button @click="$emit('close')" class="close-button">&times;</button>
    </div>
    <form @submit.prevent="submitReparation" class="reparation-form">
      <!-- Barcode Scanner -->
      <BarcodeScanner @barcode-detected="onBarcodeDetected" />

      <!-- Form fields -->
      <div class="form-field">
        <span class="p-float-label">
          <InputText v-model="reparationNumber" id="reparationNumber" class="form-input" required />
          <label for="reparationNumber">Reparation Number</label>
        </span>
      </div>

      <div class="form-field">
        <span class="p-float-label">
          <InputText v-model="vehicle" id="vehicle" class="form-input" required />
          <label for="vehicle">Vehicle</label>
        </span>
      </div>

      <div class="form-field">
        <span class="p-float-label">
          <InputText v-model="driver" id="driver" class="form-input" required />
          <label for="driver">Driver</label>
        </span>
      </div>

      <div class="form-field">
        <span class="p-float-label">
          <InputText v-model="location" id="location" class="form-input" required />
          <label for="location">Location</label>
        </span>
      </div>

      <div class="form-field">
        <span class="p-float-label">
          <InputNumber v-model="odometerReading" id="odometerReading" class="form-input" required />
          <label for="odometerReading">Odometer Reading</label>
        </span>
      </div>

      <div class="form-field">
        <span class="p-float-label">
          <Textarea v-model="description" id="description" class="form-input" rows="3" autoResize />
          <label for="description">Description</label>
        </span>
      </div>

      <!-- OrderItemUsage fields -->
      <div v-if="orderItemUsageVisible" class="form-field">
        <h3>Order Item Usages</h3>
        <table>
          <thead>
            <tr>
              <th>Order Item</th>
              <th>Total Units Used</th>
              <th>Usage Type</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(usage, index) in orderItemUsages" :key="index">
              <td>
                <InputText v-model="usage.orderItem.name" readonly />
              </td>
              <td>
                <InputNumber v-model="usage.total_units_used" />
              </td>
              <td>
                <InputText v-model="usage.usageType" readonly />
              </td>
              <td>
                <Button icon="pi pi-trash" class="p-button-danger" @click="removeOrderItemUsage(index)" />
              </td>
            </tr>
          </tbody>
        </table>
        <Button label="Add another Order Item usage" class="p-button-secondary" @click="addOrderItemUsage" />
      </div>

      <div class="form-actions">
        <Button label="Submit" type="submit" class="p-button-raised submit-button" />
        <Button label="Close" type="button" @click="$emit('close')" class="p-button-text cancel-button" />
      </div>
    </form>
  </div>
</template>

<script>
import { useReparationManagementStore } from '@/stores/reparationManagement';
import BarcodeScanner from '@/components/shared/BarcodeScanner.vue';
import axios from 'axios';

export default {
  components: {
    BarcodeScanner,
  },
  data() {
    return {
      reparationNumber: '',
      vehicle: '',
      driver: '',
      location: '',
      odometerReading: null,
      description: '',
      product: null,
      orderItemUsageVisible: false,
      orderItemUsages: [],
    };
  },
  methods: {
    async onBarcodeDetected(ean13) {
      try {
        const baseUrl = 'https://calm-refuge-29022-6081e5df5b91.herokuapp.com/api/v1';
        const response = await axios.get(`${baseUrl}/product-detail/${ean13}/`);
        this.product = response.data;

        // Automatically populate the OrderItemUsages with the detected product
        this.orderItemUsageVisible = true;
        this.orderItemUsages.push({
          orderItem: this.product,
          total_units_used: null,
          usageType: 'total_units',
        });
      } catch (error) {
        console.error('Error fetching product details:', error);
        alert('Product not found.');
      }
    },
    addOrderItemUsage() {
      // Add an empty usage object when the button is clicked
      this.orderItemUsages.push({
        orderItem: {}, // Empty object for a new order item usage
        total_units_used: null,
        usageType: 'total_units',
      });
    },
    removeOrderItemUsage(index) {
      // Remove the order item usage at the specified index
      this.orderItemUsages.splice(index, 1);
    },
    async submitReparation() {
      const reparationData = {
        reparation_number: this.reparationNumber,
        vehicle: this.vehicle,
        driver: this.driver,
        location: this.location,
        odometer_reading: this.odometerReading,
        description: this.description,
        order_item_usages_write: this.orderItemUsages.map(usage => ({
          sku: usage.orderItem.sku,
          usage_type: usage.usageType,
          total_units_used: usage.total_units_used,
        })),
      };

      try {
        const reparationStore = useReparationManagementStore();
        await reparationStore.addReparation(reparationData);
        this.$emit('reparation-submitted');
        this.clearForm();
      } catch (error) {
        console.error('Failed to submit reparation:', error);
      }
    },
    clearForm() {
      this.reparationNumber = '';
      this.vehicle = '';
      this.driver = '';
      this.location = '';
      this.odometerReading = null;
      this.description = '';
      this.product = null;
      this.orderItemUsageVisible = false;
      this.orderItemUsages = [];
    },
  },
};
</script>

<style scoped>
/* Your existing styles */
</style>

<style scoped>
/* Your existing styles */
</style>


<style scoped>
.reparation-form-container {
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  overflow: hidden;
}

.form-header {
  background: linear-gradient(135deg, #3498db, #1abc9c);
  padding: 16px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-title {
  color: white;
  font-size: 1.5rem;
  margin: 0;
}

.close-button {
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0;
  line-height: 1;
}

.reparation-form {
  padding: 30px;
}

.form-field {
  margin-bottom: 28px;
  width: 100%;
}

:deep(.form-input) {
  width: 100%;
}

:deep(.p-inputtext),
:deep(.p-inputnumber-input),
:deep(.p-inputtextarea) {
  width: 100%;
  padding: 12px 16px;
  font-size: 16px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  transition: all 0.3s;
  background-color: #f8f9fa;
}

:deep(.p-inputtext:focus),
:deep(.p-inputnumber-input:focus),
:deep(.p-inputtextarea:focus) {
  outline: none;
  border-color: #1abc9c;
  box-shadow: 0 0 0 2px rgba(26, 188, 156, 0.2);
}

:deep(.p-float-label) {
  margin-top: 6px;
}

:deep(.p-float-label label) {
  background-color: transparent;
  color: #7f8c8d;
  padding: 0 4px;
  margin-left: -4px;
  transition: all 0.3s;
}

:deep(.p-float-label input:focus ~ label),
:deep(.p-float-label input.p-filled ~ label),
:deep(.p-float-label textarea:focus ~ label),
:deep(.p-float-label textarea.p-filled ~ label) {
  top: -0.75rem;
  font-size: 12px;
  color: #1abc9c;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  margin-top: 40px;
}

:deep(.submit-button),
:deep(.cancel-button) {
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  min-width: 120px;
}

:deep(.submit-button) {
  background: linear-gradient(135deg, #3498db, #1abc9c);
  border: none;
  color: white;
  border-radius: 4px;
  transition: all 0.3s;
}

:deep(.submit-button:hover) {
  background: linear-gradient(135deg, #2980b9, #16a085);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

:deep(.cancel-button) {
  color: #7f8c8d;
  background-color: transparent;
  border: 1px solid #7f8c8d;
  border-radius: 4px;
}

:deep(.cancel-button:hover) {
  background-color: #ecf0f1;
  color: #34495e;
}
</style>
