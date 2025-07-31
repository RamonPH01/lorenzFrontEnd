<template>
  <header class="flex flex-col items-center bg-white pb-4 px-4">
    <link href="https://fonts.googleapis.com/css?family=Quicksand:300,400&display=swap" rel="stylesheet">

    <!-- Überschrift -->
    <h1 class="text-3xl md:text-6xl text-[#98743c] quicksand-light font-light tracking-wide m-5 text-center">
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
        class="block h-1 w-30 mb-2 rounded bg-[#98743c] transition-all duration-200 group-hover:bg-[#b89968]"
        v-if="route.path === item.to"
    ></span>
      <span
          class="text-base raleway-light transition-colors duration-200"
          :class="route.path === item.to ? 'text-[#98743c]' : 'text-[#757575] group-hover:text-[#b89968]'"
      >
      {{ item.label }}
    </span>
    </router-link>
      <button v-if="isLoggedIn" @click="handleSignOut" class="bg-[#98743c] hover:bg-[#7a5c56] text-white py-2 px-4 m-4 w-150px cursor-pointer">Ausloggen</button>

    </nav>
  </header>
</template>

<script setup lang="ts">
import {ref, onMounted } from "vue";
import {useRouter, useRoute} from "vue-router";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

const navItems = [
  {label: "Eventübersicht", to: "/"},
  {label: "Request Page", to: "/request"},
  {label: "Host Page", to: "/host-login"},
  {label: "Host Register", to: "/host-register"},
  {label: "Login", to: "/host-login"}
];

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
