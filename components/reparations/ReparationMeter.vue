<template>
    <div class="card">
      <MeterGroup :value="value" labelPosition="start" class="meter-group">
        <template #label="{ value }">
          <div class="flex flex-wrap gap-4">
            <template v-for="(val, i) in value" :key="i">
              <Card class="flex-1 border border-surface shadow-none">
                <template #content>
                  <div class="flex justify-between gap-8">
                    <div class="flex flex-col gap-1">
                      <span class="text-surface-500 dark:text-surface-400 text-sm">{{ val.label }}</span>
                      <span class="font-bold text-lg">{{ val.value }}%</span>
                    </div>
                    <span class="w-8 h-8 rounded-full inline-flex justify-center items-center text-center" :style="{ backgroundColor: `${val.color1}`, color: '#ffffff' }">
                      <i :class="val.icon" />
                    </span>
                  </div>
                </template>
              </Card>
            </template>
          </div>
        </template>
        <template #meter="slotProps">
          <span :class="slotProps.class" :style="{ background: `linear-gradient(to right, ${slotProps.value.color1}, ${slotProps.value.color2})`, width: slotProps.size }" />
        </template>
        <template #start="{ totalPercent }">
          <div class="flex justify-between mt-4 mb-2 relative">
            <span>Storage</span>
            <span :style="{ width: totalPercent + '%' }" class="absolute text-right">{{ totalPercent }}%</span>
            <span class="font-medium">1TB</span>
          </div>
        </template>
        <template #end>
          <div class="flex justify-between mt-4">
            <Button label="Manage Storage" outlined size="small" />
            <Button label="Update Plan" size="small" />
          </div>
        </template>
      </MeterGroup>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  
  const value = ref([
      { label: 'Apps', color1: '#34d399', color2: '#fbbf24', value: 25, icon: 'pi pi-table' },
      { label: 'Messages', color1: '#fbbf24', color2: '#60a5fa', value: 15, icon: 'pi pi-inbox' },
      { label: 'Media', color1: '#60a5fa', color2: '#c084fc', value: 20, icon: 'pi pi-image' },
      { label: 'System', color1: '#c084fc', color2: '#c084fc', value: 10, icon: 'pi pi-cog' }
  ]);
  </script>
  
  <style scoped>
  .meter-group {
    max-width: 100%;
    overflow: hidden;
  }
  
  .card {
    padding: 1rem;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .flex-wrap {
    justify-content: space-between;
  }
  
  .flex-1 {
    min-width: 200px;
    max-width: calc(25% - 10px);
  }
  
  .border-surface {
    border-color: #ddd;
  }
  
  .shadow-none {
    box-shadow: none;
  }
  
  .text-surface-500 {
    color: #555;
  }
  
  .text-surface-400 {
    color: #aaa;
  }
  
  .font-bold {
    font-weight: bold;
  }
  </style>
  