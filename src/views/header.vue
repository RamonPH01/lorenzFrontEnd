<template>
  <header class="flex flex-col items-center bg-white pb-4 px-4">
    <link href="https://fonts.googleapis.com/css?family=Quicksand:300,400&display=swap" rel="stylesheet">

    <!-- Überschrift -->
    <h1 class="text-6xl text-[#98743c] quicksand-light font-light tracking-wide m-15 text-center">
      <router-link to="/" class="no-underline">
        Lorenz Tagesbar
      </router-link>
    </h1>

    <div class="w-full h-px bg-[#cfcfcf] mb-8"></div>

    <!-- Menüleiste -->
    <nav class="flex justify-center w-full max-w-4xl gap-[2px] sm:gap-2 md:gap-8 lg:gap-16 xl:gap-24">
    <router-link
        v-for="item in navItems"
        :key="item.to"
        :to="item.to"
        class="flex flex-col items-center w-36 group"
    >
    <span
        class="block h-1 w-20 mb-2 rounded bg-[#98743c] transition-all duration-200 group-hover:bg-[#b89968]"
        v-if="route.path === item.to"
    ></span>
      <span
          class="text-base raleway-light transition-colors duration-200"
          :class="route.path === item.to ? 'text-[#98743c]' : 'text-[#757575] group-hover:text-[#b89968]'"
      >
      {{ item.label }}
    </span>
    </router-link>
  </nav>
  </header>
</template>

<script setup lang="ts">
import {ref, onMounted, onBeforeUnmount} from "vue";
import {useRouter} from "vue-router";

import {useRoute} from "vue-router";

const route = useRoute();

const navItems = [
  {label: "Eventübersicht", to: "/"},
  {label: "Request Page", to: "/request"},
  {label: "Host Page", to: "/host-login"}
];

const dropdownOpen = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);
const router = useRouter();

function toggleDropdown() {
  dropdownOpen.value = !dropdownOpen.value;
}

function closeDropdown() {
  dropdownOpen.value = false;
}

function handleClickOutside(e: MouseEvent) {
  if (
      dropdownOpen.value &&
      dropdownRef.value &&
      !dropdownRef.value.contains(e.target as Node)
  ) {
    dropdownOpen.value = false;
  }
}

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
  router.afterEach(() => {
    closeDropdown();
  });
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.18s;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.quicksand-light {
  font-family: 'Quicksand', sans-serif;
  font-weight: 300;
  letter-spacing: 0.2em;
}
</style>
