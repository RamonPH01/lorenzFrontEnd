<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { Event } from "../types/event";
import axios from "axios";

const events = ref<Event[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

onMounted(async () => {
  try {
    const response = await axios.get<Event[]>("http://localhost:8080/event/get");
    console.log(response.data);
    events.value = mapEvents(response.data);
    console.log(events.value);
  } catch (err) {
    error.value = "Fehler beim Laden der Events.";
    console.error(err);
  } finally {
    loading.value = false;
  }
});

function mapEvents(rawEvents: any[]): any[] {
  return rawEvents.map(event => ({
    id: event.id,
    name: event.name,
    numTickets: event.numTickets,
    description: event.description,
    hostId: event.hostId ?? 1, // Default 1, falls nicht vorhanden
    picture: event.picture || "",
    availableDiets: event.availableDiets
        ? event.availableDiets.split(",").map((diet: string) => diet.trim())
        : [],
  }));
}
</script>

<template>
    <div class="font-mono">
        <div class="min-h-screen bg-[#fdf6f0] p-6">
            <!-- Header -->
            <header class="flex justify-between items-center mb-10">
                <h1 class="text-4xl text-[#5a2a27]">Eventübersicht</h1>
                <router-link to="/host" class="no-underline">
                    <button
                        class="bg-red-600 text-white px-4 py-2 rounded-lg shadow hover:bg-red-700 transition"
                    >
                        Für Veranstalter
                    </button>
                </router-link>
            </header>

            <!-- Eventliste -->
            <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <router-link
                    v-for="event in events"
                    :key="event.id"
                    :to="`/event/${event.id}`"
                    class="no-underline block bg-white shadow-md hover:shadow-lg rounded-2xl border border-[#f0eae4] p-5 transition"
                >
                    <img
                        :src="event.picture"
                        alt="Eventbild"
                        class="rounded-xl mb-3 h-40 w-full object-cover"
                    />
                    <h2 class="text-2xl font-semibold text-[#4a2c2a] mb-2">
                        {{ event.name }}
                    </h2>
                    <p class="text-[#7a5c56] mb-1">
                        {{ event.description }}
                    </p>
                    <p class="text-sm text-[#9a837a]">
                        {{ event.numTickets }} Tickets · Diäten:
                        {{ event.availableDiets.join(", ") || "Keine" }}
                    </p>
                </router-link>
            </div>
        </div>
    </div>
</template>
