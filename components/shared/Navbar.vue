<template>
  <div class="navbar-container">
    <div class="navbar">
      <!-- Menu Items with Logo at the start -->
      <Menubar :model="items" class="menu">
        <!-- Slot for logo at the start of the Menubar -->
        <template #start>
          <svg width="35" height="40" viewBox="0 0 35 40" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-8">
            <path d="..." fill="var(--p-primary-color)" />
            <path d="..." fill="var(--p-text-color)" />
          </svg>
        </template>

        <!-- Slot for notification icons and avatar at the end of the Menubar -->
        <template #end>
          <div class="notification-badge-wrapper">
            <i class="pi pi-bell notification-icon"></i>
            <Badge :value="2" :severity="getSeverity(2)" class="notification-badge" />
          </div>
          <div class="notification-badge-wrapper">
            <i class="pi pi-calendar calendar-icon"></i>
            <Badge :value="4" :severity="getSeverity(4)" class="calendar-badge" />
          </div>
          <Avatar image="/images/avatar/amyelsner.png" shape="circle" class="avatar" />
        </template>
      </Menubar>
    </div>

    <!-- Breadcrumb -->
    <div class="breadcrumb-container">
      <Breadcrumb :model="breadcrumbItems" home="/" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Menubar from 'primevue/menubar'
import Avatar from 'primevue/avatar'
import Badge from 'primevue/badge'
import Breadcrumb from 'primevue/breadcrumb'

const items = ref([
  {
    label: 'Home',
    icon: 'pi pi-fw pi-home',
    route: '/'
  },
  {
    label: 'Product',
    icon: 'pi pi-fw pi-qrcode',
    items: [
      { label: 'Add Product', route: '/products/add' },
      { label: 'View Products', route: '/products' }
    ]
  },
  {
    label: 'Order',
    icon: 'pi pi-fw pi-cart-arrow-down',
    items: [
      { label: 'Add Order', route: '/orders/add' },
      { label: 'View Orders', route: '/orders' }
    ]
  },
  {
    label: 'Reparation',
    icon: 'pi pi-fw pi-wrench',
    items: [
      { label: 'Add Reparation', route: '/reparations/add' },
      { label: 'View Reparations', route: '/reparations' }
    ]
  },
  {
    label: 'Report',
    icon: 'pi pi-fw pi-flag-fill',
    items: [
      { label: 'View Reports', route: '/reports' }
    ]
  },
])

const breadcrumbItems = ref([
  { label: 'Home', route: '/' },
  { label: 'Reparations', route: '/reparations' },
  { label: 'Add Reparation', route: '/reparations/add' },
])

function getSeverity(value) {
  if (value > 2) {
    return 'danger'
  } else if (value === 2) {
    return 'warn'
  } else {
    return null
  }
}
</script>

<style scoped>
.navbar-container {
  display: flex;
  flex-direction: column;
}

.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
}

.menu {
  flex: 1;
}

.avatar {
  margin-left: 20px;
}

.notification-badge-wrapper {
  position: relative;
  display: inline-block;
  margin-right: 15px;
}

.notification-icon, .calendar-icon {
  font-size: 1.5rem;
  cursor: pointer;
}

.notification-badge, .calendar-badge {
  position: absolute;
  top: -10px;
  right: -10px;
}

.breadcrumb-container {
  margin-top: 10px;
  padding: 0 20px;
}

.logo {
  display: flex;
  align-items: center;
  margin-right: 20px;
}

.logo-img {
  height: 40px;
}
</style>
