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
          <Dropdown
            v-model="selectedVehicle"
            :options="vehicleStore.vehicles"
            optionLabel="label"
            :filter="true"
            :showClear="true"
            placeholder="Select a Vehicle"
            @filter="onVehicleFilter"
            :virtualScrollerOptions="{ 
              itemSize: 38, 
              lazy: true, 
              onLazyLoad: onVehicleLazyLoad, 
              loading: vehicleStore.loading,
              delay: 250
            }"
            class="w-full vehicle-dropdown"
          >
            <template #value="slotProps">
              <div class="vehicle-option selected" v-if="slotProps.value">
                {{ slotProps.value.label }}
              </div>
              <span v-else>
                {{ slotProps.placeholder }}
              </span>
            </template>
            <template #option="slotProps">
              <div class="vehicle-option">
                {{ slotProps.option.label }}
              </div>
            </template>
          </Dropdown>
          <label for="vehicle">Vehicle</label>
        </span>
      </div>

      <div class="form-field">
        <span class="p-float-label">
          <Dropdown
            v-model="selectedDriver"
            :options="driverStore.drivers"
            optionLabel="label"
            :filter="true"
            :showClear="true"
            placeholder="Select a Driver"
            @filter="onDriverFilter"
            :virtualScrollerOptions="{ 
              itemSize: 38, 
              lazy: true, 
              onLazyLoad: onDriverLazyLoad, 
              loading: driverStore.loading,
              delay: 250
            }"
            class="w-full driver-dropdown"
          >
            <template #value="slotProps">
              <div class="driver-option selected" v-if="slotProps.value">
                {{ slotProps.value.label }}
              </div>
              <span v-else>
                {{ slotProps.placeholder }}
              </span>
            </template>
            <template #option="slotProps">
              <div class="driver-option">
                {{ slotProps.option.label }}
              </div>
            </template>
          </Dropdown>
          <label for="driver">Driver</label>
        </span>
      </div>

      <div class="form-field">
        <span class="p-float-label">
          <Dropdown
            v-model="selectedLocation"
            :options="locationStore.locations"
            optionLabel="label"
            :filter="true"
            :showClear="true"
            placeholder="Select a Location"
            @filter="onLocationFilter"
            :virtualScrollerOptions="{ 
              itemSize: 38, 
              lazy: true, 
              onLazyLoad: onLocationLazyLoad, 
              loading: locationStore.loading,
              delay: 250
            }"
            class="w-full location-dropdown"
          >
            <template #value="slotProps">
              <div class="location-option selected" v-if="slotProps.value">
                {{ slotProps.value.label }}
              </div>
              <span v-else>
                {{ slotProps.placeholder }}
              </span>
            </template>
            <template #option="slotProps">
              <div class="location-option">
                {{ slotProps.option.label }}
              </div>
            </template>
          </Dropdown>
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

      <div class="form-field">
        <h3>Service Types</h3>
        <PickList
          v-model="serviceTypes"
          listStyle="height:250px"
          :showSourceControls="false"
          :showTargetControls="false"
          sourceHeader="Available Service Types"
          targetHeader="Chosen Service Types"
        >
          <template #item="slotProps">
            <div class="service-type-item">{{ slotProps.item.label }}</div>
          </template>
        </PickList>
      </div>

      <div class="form-field">
        <h3>Intervenants</h3>
        <PickList
          v-model="intervenants"
          listStyle="height:250px"
          :showSourceControls="false"
          :showTargetControls="false"
          sourceHeader="Available Intervenants"
          targetHeader="Chosen Intervenants"
        >
          <template #item="slotProps">
            <div class="intervenant-item">{{ slotProps.item.name }}</div>
          </template>
        </PickList>
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
import { ref, onMounted, watch } from 'vue';
import { useReparationManagementStore } from '@/stores/reparationManagement';
import { useVehicleStore } from '@/stores/vehicleStore';
import { useDriverStore } from '@/stores/driverStore';
import { useLocationStore } from '@/stores/locationStore';
import { useIntervenantStore } from '@/stores/intervenantStore';
import { useServiceTypeStore } from '@/stores/serviceTypeStore';
import BarcodeScanner from '@/components/shared/BarcodeScanner.vue';
import axios from 'axios';

const API_BASE_URL = 'https://calm-refuge-29022-6081e5df5b91.herokuapp.com/api/v1';

export default {
  components: {
    BarcodeScanner,
  },
  setup() {
    const reparationNumber = ref('');
    const selectedVehicle = ref(null);
    const selectedDriver = ref(null);
    const selectedLocation = ref(null);
    const odometerReading = ref(null);
    const description = ref('');
    const product = ref(null);
    const orderItemUsageVisible = ref(false);
    const orderItemUsages = ref([]);

    const vehicleStore = useVehicleStore();
    const driverStore = useDriverStore();
    const locationStore = useLocationStore();
    const intervenantStore = useIntervenantStore();
    const serviceTypeStore = useServiceTypeStore();
    const reparationStore = useReparationManagementStore();

    const serviceTypes = ref([[], []]);
    const intervenants = ref([[], []]);

    onMounted(async () => {
      await Promise.all([
        vehicleStore.fetchVehicles(),
        driverStore.fetchDrivers(),
        locationStore.fetchLocations(),
        intervenantStore.fetchIntervenants(),
        serviceTypeStore.fetchServiceTypes()
      ]);

      updateServiceTypes();
      updateIntervenants();
    });

    const updateServiceTypes = () => {
      serviceTypes.value[0] = serviceTypeStore.serviceTypes;
      serviceTypes.value[1] = []; // Reset target array
    };

    const updateIntervenants = () => {
      intervenants.value[0] = intervenantStore.intervenants.map(intervenant => ({
        name: intervenant.name,
        value: intervenant.id
      }));
      intervenants.value[1] = []; // Reset target array
    };

    watch(() => serviceTypeStore.serviceTypes, updateServiceTypes);
    watch(() => intervenantStore.intervenants, updateIntervenants);

    const onVehicleFilter = async (event) => {
      if (event.filter !== undefined) {
        await vehicleStore.searchVehicles(event.filter);
      }
    };

    const onVehicleLazyLoad = async (event) => {
      if (vehicleStore.nextPage) {
        await vehicleStore.loadMoreVehicles();
      }
    };

    const onDriverFilter = async (event) => {
      if (event.filter !== undefined) {
        await driverStore.searchDrivers(event.filter);
      }
    };

    const onDriverLazyLoad = async (event) => {
      if (driverStore.nextPage) {
        await driverStore.loadMoreDrivers();
      }
    };

    const onLocationFilter = async (event) => {
      if (event.filter !== undefined) {
        await locationStore.searchLocations(event.filter);
      }
    };

    const onLocationLazyLoad = async (event) => {
      if (locationStore.nextPage) {
        await locationStore.loadMoreLocations();
      }
    };

    const onBarcodeDetected = async (ean13) => {
      try {
        const response = await axios.get(`${API_BASE_URL}/product-detail/${ean13}/`);
        product.value = response.data;

        orderItemUsageVisible.value = true;
        orderItemUsages.value.push({
          orderItem: product.value,
          total_units_used: null,
          usageType: 'total_units',
        });
      } catch (error) {
        console.error('Error fetching product details:', error);
        alert('Product not found.');
      }
    };

    const addOrderItemUsage = () => {
      orderItemUsages.value.push({
        orderItem: {},
        total_units_used: null,
        usageType: 'total_units',
      });
    };

    const removeOrderItemUsage = (index) => {
      orderItemUsages.value.splice(index, 1);
    };

    const submitReparation = async () => {
      const reparationData = {
        reparation_number: reparationNumber.value,
        vehicle: selectedVehicle.value ? selectedVehicle.value.value : null,
        driver: selectedDriver.value ? selectedDriver.value.value : null,
        location: selectedLocation.value ? selectedLocation.value.value : null,
        odometer_reading: odometerReading.value,
        description: description.value,
        service_type_ids: serviceTypes.value[1].map(st => st.value),
        intervenant_ids: intervenants.value[1].map(intervenant => intervenant.value),
        order_item_usages_write: orderItemUsages.value.map(usage => ({
          sku: usage.orderItem.sku,
          usage_type: usage.usageType,
          total_units_used: usage.total_units_used,
        })),
      };

      try {
        await reparationStore.addReparation(reparationData);
        clearForm();
        alert('Reparation submitted successfully!');
      } catch (error) {
        console.error('Failed to submit reparation:', error);
        alert('Failed to submit reparation. Please try again.');
      }
    };

    const clearForm = () => {
      reparationNumber.value = '';
      selectedVehicle.value = null;
      selectedDriver.value = null;
      selectedLocation.value = null;
      odometerReading.value = null;
      description.value = '';
      product.value = null;
      orderItemUsageVisible.value = false;
      orderItemUsages.value = [];
      updateServiceTypes();
      updateIntervenants();
    };

    return {
      reparationNumber,
      selectedVehicle,
      selectedDriver,
      selectedLocation,
      vehicleStore,
      driverStore,
      locationStore,
      intervenantStore,
      serviceTypeStore,
      odometerReading,
      description,
      product,
      orderItemUsageVisible,
      orderItemUsages,
      serviceTypes,
      intervenants,
      onBarcodeDetected,
      addOrderItemUsage,
      removeOrderItemUsage,
      submitReparation,
      onVehicleFilter,
      onVehicleLazyLoad,
      onDriverFilter,
      onDriverLazyLoad,
      onLocationFilter,
      onLocationLazyLoad,
    };
  },
};
</script>


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
:deep(.p-inputtextarea),
:deep(.p-dropdown-label),
:deep(.p-dropdown-trigger) {
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
:deep(.p-inputtextarea:focus),
:deep(.p-dropdown:focus) {
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
:deep(.p-float-label textarea.p-filled ~ label),
:deep(.p-float-label .p-dropdown.p-focus ~ label),
:deep(.p-float-label .p-dropdown.p-filled ~ label) {
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

/* Dropdown specific styles */
:deep(.vehicle-dropdown),
:deep(.driver-dropdown),
:deep(.location-dropdown) {
  width: 100%;
}

:deep(.vehicle-dropdown .p-dropdown-label),
:deep(.driver-dropdown .p-dropdown-label),
:deep(.location-dropdown .p-dropdown-label) {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-right: 2.5rem; /* Make room for the dropdown arrow */
}

:deep(.vehicle-dropdown .p-dropdown-trigger),
:deep(.driver-dropdown .p-dropdown-trigger),
:deep(.location-dropdown .p-dropdown-trigger) {
  width: 2.5rem;
}

.vehicle-option,
.driver-option,
.location-option {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.vehicle-option.selected,
.driver-option.selected,
.location-option.selected {
  padding-right: 2.5rem; /* Make room for the clear button */
}

:deep(.p-dropdown-panel) {
  width: auto !important;
  min-width: 100%;
}

:deep(.p-dropdown-items) {
  padding: 0.5rem 0;
}

:deep(.p-dropdown-item) {
  padding: 0.5rem 1rem;
}

/* Table styles for OrderItemUsage */
table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;
}

th, td {
  text-align: left;
  padding: 0.5rem;
  border-bottom: 1px solid #e0e0e0;
}

th {
  background-color: #f8f9fa;
  font-weight: 600;
}

/* Dropdown and PickList specific styles */
:deep(.vehicle-dropdown),
:deep(.driver-dropdown),
:deep(.location-dropdown) {
  width: 100%;
}

:deep(.p-picklist) {
  display: flex;
  justify-content: space-between;
}

:deep(.p-picklist-list) {
  width: 100%;
  max-width: 300px;
}

:deep(.p-picklist-header) {
  background-color: #f8f9fa;
  padding: 0.5rem;
  font-weight: bold;
}

.service-type-item,
.intervenant-item {
  padding: 0.5rem;
  border-bottom: 1px solid #e0e0e0;
}

.service-type-item:last-child,
.intervenant-item:last-child {
  border-bottom: none;
}

/* Responsive design */
@media (max-width: 768px) {
  .reparation-form {
    padding: 20px;
  }

  :deep(.submit-button),
  :deep(.cancel-button) {
    width: 100%;
  }

  .form-actions {
    flex-direction: column;
  }
}
</style>
