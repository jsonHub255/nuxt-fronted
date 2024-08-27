<template>
  <div>
    <header>
      <Navbar />
    </header>
    <main>
      <NuxtPage />
    </main>
    <footer>
      <Footer />
    </footer>
  </div>
</template>

<script setup>
import Navbar from '~/components/shared/Navbar.vue'
import Footer from '~/components/shared/Footer.vue'
</script>
