<template>
  <div class="min-h-screen flex flex-col">
    <Header/>
    <div class="flex-1">
      <router-view/>
    </div>
    <Footer/>
  </div>
</template>


<script setup lang="ts">
import Header from "../src/views/header.vue"
import Footer from "../src/views/footer.vue"
</script>

<style>
body {
  font-family: 'Quicksand', Arial, sans-serif;
  font-weight: 300;
    background: url('../src/assets/background.jpg') no-repeat center center fixed;
    background-size: cover;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Quicksand', Arial, sans-serif;
  font-weight: 300;
  letter-spacing: 0.1em;
  color: #997747;
}


</style>
