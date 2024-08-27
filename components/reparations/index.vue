<template>
    <div>
      <h1>Reparations Page</h1>
      <!-- Your reparation list and other content goes here -->
      <button @click="showForm = true">Add Reparationssss</button>
  
      <!-- Include the ReparationForm component and BarcodeScanner here -->
      <ReparationForm v-if="showForm" @close="showForm = false" />
  
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import ReparationForm from '~/components/reparations/ReparationForm.vue'
  
  const showForm = ref(false)
  </script>
  