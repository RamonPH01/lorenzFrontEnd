<template>
    <header class="flex items-center bg-[#372c31] py-4 px-4">
        <div class="flex items-center gap-4">
            <!-- Dropdown Menu -->
            <div class="relative">
                <button
                    @click="toggleDropdown"
                    class="bg-red-800 text-[#f1dcc9] px-4 py-2 rounded-lg shadow hover:bg-red-900 transition cursor-pointer flex items-center"
                >
                    <!-- Hamburger Icon -->
                    <svg
                        class="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        viewBox="0 0 24 24"
                    >
                        <line
                            x1="4"
                            y1="7"
                            x2="20"
                            y2="7"
                            stroke-linecap="round"
                        />
                        <line
                            x1="4"
                            y1="12"
                            x2="20"
                            y2="12"
                            stroke-linecap="round"
                        />
                        <line
                            x1="4"
                            y1="17"
                            x2="20"
                            y2="17"
                            stroke-linecap="round"
                        />
                    </svg>
                </button>
                <div
                    v-if="dropdownOpen"
                    class="absolute left-0 mt-2 w-40 bg-white rounded-lg shadow-lg z-50"
                >
                    <router-link
                        to="/host-login"
                        class="block px-4 py-2 text-gray-800 hover:bg-gray-100 no-underline"
                        @click="closeDropdown"
                    >
                        Host Page
                    </router-link>
                    <router-link
                        to="/request"
                        class="block px-4 py-2 text-gray-800 hover:bg-gray-100 no-underline"
                        @click="closeDropdown"
                    >
                        Request Page
                    </router-link>
                </div>
            </div>
        </div>
        <h1
            class="absolute left-1/2 -translate-x-1/2 text-3xl hidden md:inline text-[#f1dcc9] whitespace-nowrap"
        >
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
import { ref, onMounted } from "vue";
import Logo from "../assets/logo.vue";

const dropdownOpen = ref(false);

function toggleDropdown() {
    dropdownOpen.value = !dropdownOpen.value;
}

function closeDropdown() {
    dropdownOpen.value = false;
}

// Optional: Close dropdown when clicking outside
onMounted(() => {
    document.addEventListener("click", (e) => {
        if (
            dropdownOpen.value &&
            !(e.target as HTMLElement).closest(".relative")
        ) {
            dropdownOpen.value = false;
        }
    });
});
</script>
