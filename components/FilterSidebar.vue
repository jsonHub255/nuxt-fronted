<!-- FilterSidebar Component -->
<template>
    <Dialog
      :visible="visible"
      @update:visible="updateVisible"
      modal
      dismissableMask
      style="width: 300px"
      :breakpoints="{ '960px': '75vw', '640px': '100vw' }"
    >
      <template #header>
        <h3>Filter Reparations</h3>
      </template>
      <Panel header="Filter Options">
        <div class="p-field">
          <label for="reparationNumber">Reparation Number</label>
          <InputText
            id="reparationNumber"
            v-model="filters.reparationNumber"
            placeholder="Reparation Number"
          />
        </div>
        <div class="p-field">
          <label for="vehicle">Vehicle</label>
          <InputText id="vehicle" v-model="filters.vehicle" placeholder="Vehicle" />
        </div>
        <div class="p-field">
          <label for="dateRange">Date Range</label>
          <InputText id="dateRange" v-model="filters.dateRange" placeholder="Date Range" />
        </div>
      </Panel>
      <template #footer>
        <Button label="Apply Filters" icon="pi pi-check" @click="applyFilters" class="p-button-primary" />
        <Button label="Clear" icon="pi pi-times" @click="clearFilters" class="p-button-secondary" />
      </template>
    </Dialog>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import Button from 'primevue/button';
  import InputText from 'primevue/inputtext';
  import Dialog from 'primevue/dialog';
  import Panel from 'primevue/panel';
  
  const props = defineProps({
    visible: Boolean,
  });
  
  const emit = defineEmits(['update:visible']);
  
  const filters = ref({
    reparationNumber: '',
    vehicle: '',
    dateRange: '',
  });
  
  const updateVisible = (newValue) => {
    emit('update:visible', newValue);
  };
  
  const closeSidebar = () => {
    console.log('Closing sidebar');
    updateVisible(false);
  };
  
  const applyFilters = () => {
    // Logic to apply filters
    console.log('Filters applied:', filters.value);
    closeSidebar();
  };
  
  const clearFilters = () => {
    filters.value = {
      reparationNumber: '',
      vehicle: '',
      dateRange: '',
    };
  };
  </script>
  
  <style scoped>
  .p-field {
    margin-bottom: 15px;
  }
  </style>
  