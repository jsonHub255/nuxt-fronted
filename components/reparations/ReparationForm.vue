<template>
  <div class="reparation-form-container">
    <form @submit.prevent="submitReparation" class="reparation-form">
      <h2 class="form-title">Add Reparation</h2>

      <div class="form-field">
        <label for="reparationNumber">Reparation Number</label>
        <InputText v-model="reparationNumber" id="reparationNumber" class="form-input" required />
      </div>

      <!-- Barcode Scanner Component -->
      <BarcodeScanner @barcode-scanned="handleBarcodeScanned" />

      <div class="form-field">
        <label for="vehicle">Vehicle</label>
        <InputText v-model="vehicle" id="vehicle" class="form-input" required />
      </div>

      <div class="form-field">
        <label for="driver">Driver</label>
        <InputText v-model="driver" id="driver" class="form-input" required />
      </div>

      <div class="form-field">
        <label for="location">Location</label>
        <InputText v-model="location" id="location" class="form-input" required />
      </div>

      <div class="form-field">
        <label for="odometerReading">Odometer Reading</label>
        <InputText v-model="odometerReading" id="odometerReading" class="form-input" type="number" required />
      </div>

      <div class="form-field">
        <label for="description">Description</label>
        <Textarea v-model="description" id="description" class="form-input" />
      </div>

      <div class="form-actions">
        <Button label="Submit" type="submit" class="form-button" />
        <Button label="Close" type="button" @click="$emit('close')" class="form-button" />
      </div>
    </form>
  </div>
</template>

<script>
import { useReparationManagementStore } from '@/stores/reparationManagement';
import BarcodeScanner from '@/components/shared/BarcodeScanner.vue';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Textarea from 'primevue/textarea';

export default {
  components: {
    BarcodeScanner,
    InputText,
    Button,
    Textarea,
  },
  data() {
    return {
      reparationNumber: '',
      vehicle: '',
      driver: '',
      location: '',
      odometerReading: '',
      description: '',
    };
  },
  methods: {
    async submitReparation() {
      const reparationData = {
        reparation_number: this.reparationNumber,
        vehicle: this.vehicle,
        driver: this.driver,
        location: this.location,
        odometer_reading: this.odometerReading,
        description: this.description,
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
    handleBarcodeScanned(scannedCode) {
      const reparationStore = useReparationManagementStore();
      reparationStore.scanAndAddProduct(scannedCode);
    },
    clearForm() {
      this.reparationNumber = '';
      this.vehicle = '';
      this.driver = '';
      this.location = '';
      this.odometerReading = '';
      this.description = '';
    }
  },
};
</script>

<style scoped>
.reparation-form-container {
  background: radial-gradient(circle at left top, var(--p-primary-400), var(--p-primary-700));
  padding: 20px;
  border-radius: 20px;
}

.reparation-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-title {
  text-align: center;
  font-size: 1.5rem;
  color: var(--p-primary-50);
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.form-input {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  padding: 10px;
  color: var(--p-primary-50);
}

.form-actions {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.form-button {
  background-color: var(--p-primary-50);
  color: var(--p-primary-700);
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  flex: 1;
}

.form-button:hover {
  background-color: var(--p-primary-200);
}
</style>
