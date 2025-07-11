<script setup lang="ts">
import {ref} from "vue";
import {useRouter} from 'vue-router';

const username = ref("");
const password = ref("");
const error = ref("");
const router = useRouter();

function handleLogin() {
  if (!username.value || !password.value) {
    error.value = "Please enter both username and password.";
    return;
  }

  if (username.value === "admin" && password.value === "admin") {
    error.value = "";
    router.push('/host'); // Weiterleitung auf /host
    return;
  }

  error.value = "Invalid username or password.";
}
</script>

<template>
  <div
      class="min-h-screen flex items-center justify-center"
  >
    <div
        class="bg-white no-underline block shadow-lg hover:shadow-[#5c3c26] p-5 transition p-8 w-full max-w-sm"
    >
      <h1 class="text-3xl font-bold text-[#4a2c2a] mb-3 text-center">
        Veranstalter Login
      </h1>
      <div class="w-full h-px bg-[#cfcfcf] mb-4 mt-4"></div>
      <form @submit.prevent="handleLogin" class="flex flex-col gap-4 mt-3">
        <input
            v-model="username"
            type="text"
            placeholder="Benutzername"
            class="border border-[#eacdb6] p-3 focus:outline-none focus:ring-2 focus:ring-[#eacdb6]"
        />
        <input
            v-model="password"
            type="password"
            placeholder="Passwort"
            class="border border-[#eacdb6] p-3 focus:outline-none focus:ring-2 focus:ring-[#eacdb6]"
        />
        <button
            class="bg-[#98743c] hover:bg-[#7a5c56] text-white py-2 px-4 w-full cursor-pointer"
            type="submit"
        >
          Login
        </button>
        <p v-if="error" class="text-red-600 text-center">{{ error }}</p>
      </form>
    </div>
  </div>
</template>
