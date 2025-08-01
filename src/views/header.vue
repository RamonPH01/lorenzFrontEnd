<template>
  <header class="flex flex-col items-center bg-white pb-4 px-4">
    <link href="https://fonts.googleapis.com/css?family=Quicksand:300,400&display=swap" rel="stylesheet">

    <div>
      <!-- Überschrift -->
      <h1 class="text-3xl md:text-6xl text-[#98743c] quicksand-light font-light tracking-wide m-5 text-center">
        <router-link to="/" class="no-underline">
          Lorenz Tagesbar
        </router-link>
      </h1>
    </div>

    <div class="w-full h-px bg-[#cfcfcf] mb-8"></div>

    <!-- Menüleiste -->
    <nav class="flex justify-center w-full max-w-4xl gap-[2px] sm:gap-2 md:gap-8 lg:gap-16 xl:gap-24">
      <router-link
          v-for="item in filteredNavItems"
          :key="item.to"
          :to="item.to"
          class="flex flex-col items-center w-36 group"
      >
        <span
            class="text-base transition-colors duration-200"
            :class="route.path === item.to ? 'text-[#98743c]' : 'text-[#757575] group-hover:text-[#b89968]'"
        >
          {{ item.label }}
        </span>
        <span
            class="block h-1 w-30 mt-2 mb-2 rounded transition-all duration-200"
            :class="route.path === item.to ? 'bg-[#98743c] w-30' : 'bg-transparent w-30'"
        ></span>
      </router-link>
    </nav>

  </header>
</template>

<script setup lang="ts">
import {ref, onMounted, computed} from "vue";
import {useRouter, useRoute} from "vue-router";
import {getAuth, onAuthStateChanged, signOut} from "firebase/auth";

const navItems = [
  {label: "Eventübersicht", to: "/"},
  {label: "Anfragen", to: "/request"},
  {label: "Für Veranstalter", to: "/host"},
];
const filteredNavItems = computed(() => {
  if (!isLoggedIn.value) {
    return navItems.filter(item => item.to !== "/host");
  }
  return navItems;
});

const router = useRouter();
const route = useRoute();
const isLoggedIn = ref(false);
let auth;


function handleSignOut() {
  signOut(auth).then(() => {
    router.push("/");
  })
}

onMounted(() => {
  auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true;
    } else {
      isLoggedIn.value = false;
    }
  })
});

</script>

<style>
.quicksand-light {
  font-family: 'Quicksand', sans-serif;
  font-weight: 300;
  letter-spacing: 0.2em;
}
</style>
