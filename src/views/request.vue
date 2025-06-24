<script setup lang="ts">
// Add your script logic here
import { ref } from "vue";

const message = ref("");
</script>

<template>
    <div
        class="font-mono min-h-screen bg-[#eacdb6] p-6 flex flex-col items-center justify-center"
    >
        <div
            class="bg-[#d9b49c] shadow-md rounded-2xl border border-[#deb699] p-8 w-full max-w-md"
        >
            <h1 class="text-3xl font-bold text-[#4a2c2a] mb-4 text-center">
                Request Page
            </h1>
            <form @submit.prevent="() => {}" class="flex flex-col gap-4">
                <label class="text-[#7a5c56] font-semibold" for="message"
                    >Your Request</label
                >
                <textarea
                    id="message"
                    v-model="message"
                    class="rounded-xl border border-[#deb699] p-3 resize-none focus:outline-none focus:ring-2 focus:ring-[#eacdb6]"
                    rows="4"
                    placeholder="Type your request here..."
                ></textarea>
                <button
                    type="submit"
                    class="bg-[#eacdb6] text-[#4a2c2a] font-semibold rounded-xl py-2 mt-2 hover:bg-[#deb699] transition"
                >
                    Submit
                </button>
            </form>
        </div>
    </div>
</template>
