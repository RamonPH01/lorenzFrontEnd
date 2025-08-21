<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { Event } from "../types/event";
import axios from "axios";

const events = ref<Event[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

onMounted(async () => {
    try {
        const response = await axios.get<Event[]>(
            "http://localhost:8080/event/get",
        );
        events.value = mapEvents(response.data);
    } catch (err) {
        error.value = "Fehler beim Laden der Events.";
        console.error(err);
    } finally {
        loading.value = false;
    }
});

function mapEvents(rawEvents: any[]): any[] {
    return rawEvents.map((event) => ({
        id: event.id,
        name: event.name,
        numTickets: event.numTickets,
        description: event.description,
        date: event.date,
        price: event.price,
        hostId: event.hostId ?? 1, // Default 1, falls nicht vorhanden
        picture: event.picture || "",
        availableDiets: event.availableDiets
            ? event.availableDiets.split(",").map((diet: string) => diet.trim())
            : [],
    }));
}

function formatDate(dateString) {
    const date = new Date(dateString);
    // hole Tag, Monat, Jahr
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    // hole Stunden, Minuten
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    // baue den String
    return `${day}.${month}.${year} | ${hours}:${minutes} Uhr`;
}
</script>

<template>
        <div class="min-h-screen p-6">
            <!-- Eventliste -->
            <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <router-link
                    v-for="event in events"
                    :key="event.id"
                    :to="`/event/${event.id}`"
                    class="no-underline block shadow-lg hover:shadow-[#5c3c26] p-5 transition"
                    style="background: rgba(255, 255, 255, 0.9)"
                >
                  <img
                      v-if="event.picture && event.picture.fileData"
                      :src="`data:image/*;base64,${event.picture.fileData}`"
                      alt="Eventbild"
                      class="mb-3 h-40 w-full object-cover"
                  />
                    <h2 class="text-2xl font-semibold text-[#4a2c2a] mb-2">
                        {{ event.name }}
                    </h2>
                    <p class="text-[#7a5c56] mb-1">
                        {{ formatDate(event.date) }}
                    </p>
                    <p class="text-sm text-[#9a837a]">{{ event.price }} €</p>
                </router-link>
            </div>
    </div>
</template>
