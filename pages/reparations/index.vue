<!-- Reparation Page Component -->
<template>
  <div class="reparation-page">
    <div class="header">
      <h1>Reparations</h1>
      <div class="actions">
        <Button label="Add Reparation" icon="pi pi-plus" @click="showForm = true" />
        <Button label="Filters" icon="pi pi-filter" @click="toggleSidebar" />
      </div>
    </div>
    <FilterSidebar
      v-model:visible="isSidebarVisible"
    />
    <Dialog v-model:visible="showForm" header="Add Reparation" modal style="width: 50vw">
      <ReparationForm @reparation-submitted="closeForm" @close="closeForm" />
    </Dialog>
    <p>Reparation Table goes here...</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ReparationForm from '~/components/reparations/ReparationForm.vue';
import FilterSidebar from '~/components/FilterSidebar.vue';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';

const showForm = ref(false);
const isSidebarVisible = ref(false);

const closeForm = () => {
  showForm.value = false;
};

const toggleSidebar = () => {
  console.log('Toggling sidebar visibility');
  isSidebarVisible.value = !isSidebarVisible.value;
  console.log('Sidebar visibility:', isSidebarVisible.value);
};
</script>

<style scoped>
.reparation-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.actions {
  display: flex;
  gap: 10px;
}
</style>