<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from 'vue-router';

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
        class="font-mono min-h-screen bg-[#eacdb6] flex items-center justify-center"
    >
        <div
            class="bg-[#d9b49c] shadow-md rounded-2xl border border-[#deb699] p-8 w-full max-w-sm"
        >
            <h1 class="text-3xl font-bold text-[#4a2c2a] mb-3 text-center">
                Host Login
            </h1>
          <hr/>
            <form @submit.prevent="handleLogin" class="flex flex-col gap-4 mt-3">
                <input
                    v-model="username"
                    type="text"
                    placeholder="Benutzername"
                    class="rounded-xl border border-[#eacdb6] p-3 focus:outline-none focus:ring-2 focus:ring-[#eacdb6]"
                />
                <input
                    v-model="password"
                    type="password"
                    placeholder="Passwort"
                    class="rounded-xl border border-[#eacdb6] p-3 focus:outline-none focus:ring-2 focus:ring-[#eacdb6]"
                />
                <button
                    type="submit"
                    class="bg-[#eacdb6] text-[#4a2c2a] font-semibold rounded-xl py-2 hover:bg-[#deb699] transition cursor-pointer"
                >
                    Login
                </button>
                <p v-if="error" class="text-red-600 text-center">{{ error }}</p>
            </form>
        </div>
    </div>
</template>
