<template>
  <header class="flex items-center bg-[#372c31] py-4 px-4 relative">
    <div class="flex items-center gap-4">
      <!-- Dropdown Menu -->
      <div class="relative" ref="dropdownRef">
        <button
            @click="toggleDropdown"
            @keydown.enter.prevent="toggleDropdown"
            @keydown.space.prevent="toggleDropdown"
            :aria-expanded="dropdownOpen"
            aria-haspopup="true"
            aria-label="Menü öffnen"
            class="bg-red-800 text-[#f1dcc9] px-4 py-2 rounded-lg shadow hover:bg-red-900 transition cursor-pointer flex items-center focus:outline-none focus:ring-2 focus:ring-red-700"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
            <line x1="4" y1="7" x2="20" y2="7" stroke-linecap="round" />
            <line x1="4" y1="12" x2="20" y2="12" stroke-linecap="round" />
            <line x1="4" y1="17" x2="20" y2="17" stroke-linecap="round" />
          </svg>
        </button>
        <transition name="fade">
          <div
              v-if="dropdownOpen"
              class="absolute left-0 mt-2 w-40 bg-[#d9b49c] shadow rounded-lg shadow-lg z-50"
          >
            <router-link
                to="/"
                class="block px-4 py-2 text-gray-800 hover:bg-[#c4a087] no-underline"
                @click="closeDropdown"
            >
              Eventübersicht
            </router-link>
            <router-link
                to="/host-login"
                class="block px-4 py-2 text-gray-800 hover:bg-[#c4a087] no-underline"
                @click="closeDropdown"
            >
              Host Page
            </router-link>
            <router-link
                to="/request"
                class="block px-4 py-2 text-gray-800 hover:bg-[#c4a087] no-underline"
                @click="closeDropdown"
            >
              Request Page
            </router-link>
          </div>
        </transition>
      </div>
    </div>
    <h1 class="absolute left-1/2 -translate-x-1/2 text-3xl hidden md:inline text-[#f1dcc9] whitespace-nowrap">
      <router-link to="/" class="no-underline cursor-pointer">
        Eventübersicht
      </router-link>
    </h1>
    <div class="absolute right-0 mr-5">
      <Logo/>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import Logo from "../assets/logo.vue";

const dropdownOpen = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);
const router = useRouter();

function toggleDropdown() {
  dropdownOpen.value = !dropdownOpen.value;
}

function closeDropdown() {
  dropdownOpen.value = false;
}

// Click outside handler
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
  // Optional: Close on route change
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
</style>
