<script setup lang="ts">
import Header from "../src/views/header.vue"
import Footer from "../src/views/footer.vue"
import LoginMenu from "../src/customElements/LoginMenu.vue"
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <Header />
    <div class="flex-1">
      <router-view />
    </div>
    <Footer />
    <LoginMenu />
  </div>
</template>

<style>
body {
  font-family: 'Quicksand', Arial, sans-serif;
  font-weight: 300;
  background: url('assets/background.jpg') no-repeat center center fixed;
  background-size: cover;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Quicksand', Arial, sans-serif;
  font-weight: 300;
  letter-spacing: 0.1em;
  color: #98743c;
}
</style>
