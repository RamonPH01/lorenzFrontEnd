<template>
  <div class="font-mono min-h-screen flex flex-col bg-[#eacdb6]">
    <Header/>
    <div class="flex-1">
      <router-view/>
    </div>
    <Footer/>
  </div>
</template>


<script setup lang="ts">
import Header from "/src/views/header.vue"
import Footer from "/src/views/footer.vue"
</script>
