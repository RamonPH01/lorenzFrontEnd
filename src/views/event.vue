<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from 'vue-router'
import type { Event } from "../types/event";
import axios from "axios";

const route = useRoute()

// Korrigiert: event ist EIN Objekt, nicht ein Array
const event = ref<Event | null>(null);
const loading = ref(true);
const error = ref<string | null>(null);

onMounted(async () => {
  const eventId = Number(route.params.id)
  try {
    const response = await axios.get<Event>("http://localhost:8080/event/" + eventId);
    // Falls availableDiets ein String ist, splitte es zu Array
    const data = response.data;
    event.value = {
      ...data,
      availableDiets: Array.isArray(data.availableDiets)
          ? data.availableDiets
          : (typeof data.availableDiets === "string" && data.availableDiets.length > 0)
              ? data.availableDiets.split(",").map((diet: string) => diet.trim())
              : [],
    };
  } catch (err) {
    error.value = "Fehler beim Laden des Events.";
    console.error(err);
  } finally {
    loading.value = false;
  }
});

function formatDate(dateString: string) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${day}.${month}.${year} - ${hours}:${minutes} Uhr`;
}
</script>

<template>
  <div class="font-mono">
    <div class="bg-[#eacdb6] p-2 flex justify-center items-center">
      <div class="bg-[#d9b49c] rounded-2xl shadow-lg border border-[#deb699] p-8 max-w-xl w-full">
        <h1 class="text-3xl font-bold text-[#4a2c2a] mb-6">Event Details</h1>
        <div v-if="loading" class="text-[#7a5c56] mb-4">Lade Event...</div>
        <div v-else-if="error" class="text-red-600 mb-4">{{ error }}</div>
        <div v-else-if="event">
          <div class="mb-4">
            <img
                v-if="event.picture"
                :src="event.picture"
                alt="Eventbild"
                class="rounded-xl mb-4 h-52 w-full object-cover"
            />
            <p class="mb-1"><strong>Name:</strong> {{ event.name }}</p>
            <p class="mb-1"><strong>ID:</strong> {{ event.id }}</p>
            <p class="mb-1"><strong>Tickets:</strong> {{ event.numTickets }}</p>
            <p class="mb-1"><strong>Datum:</strong> {{ formatDate(event.date) }}</p>
            <p class="mb-1"><strong>Preis:</strong> {{ event.price }} €</p>
            <p class="mb-1"><strong>Host:</strong> {{ event.hostId }}</p>
            <p class="mb-4"><strong>Beschreibung:</strong><br />{{ event.description }}</p>

            <!-- Ernährungsoptionen Dropdown -->
            <div v-if="event.availableDiets && event.availableDiets.length > 0" class="mb-4">
              <label for="diets" class="block mb-2 font-semibold text-[#4a2c2a]">Verfügbare Ernährungsoptionen:</label>
              <select
                  id="diets"
                  v-model="selectedDiet"
                  class="block w-full rounded-xl border border-[#deb699] px-4 py-2 bg-[#eacdb6] text-[#4a2c2a] focus:outline-none focus:ring-2 focus:ring-[#deb699]"
              >
                <option v-for="diet in event.availableDiets" :key="diet" :value="diet">
                  {{ diet }}
                </option>
              </select>
              <p v-if="selectedDiet" class="mt-2 text-[#7a5c56]">Ausgewählt: <strong>{{ selectedDiet }}</strong></p>
            </div>
          </div>
        </div>
        <div v-else class="text-[#7a5c56]">
          <p>Kein Event gefunden.</p>
        </div>
      </div>
    </div>
  </div>
</template>
