<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"/>
  <div class="font-mono">
    <Header/>
    <router-view/>
    <Footer/>
  </div>
</template>


<script setup lang="ts">
import Header from "/src/views/header.vue"
import Footer from "/src/views/footer.vue"
</script>
