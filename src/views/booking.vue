<script setup lang="ts">
import {ref, onMounted} from "vue";
import {useRoute} from 'vue-router'
import type {Event} from "../types/event";
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
  return `${day}.${month}.${year} um ${hours}:${minutes} Uhr`;
}

const dietCounts = ref<{ [key: string]: number }>({});
const maxPerDiet = 10;

// Initialisieren, wenn das Event geladen ist:
onMounted(async () => {
  // ... wie bisher ...
  if (event.value?.availableDiets) {
    event.value.availableDiets.forEach(diet => {
      dietCounts.value[diet] = 0;
    });
  }
});
</script>

<template>
  <div class="p-2 flex justify-center items-center">
    <div class="shadow-lg p-10 max-w-xl w-full" style="background: rgba(255,255,255,0.9)">
      <div v-if="loading" class="mb-4">Lade Event...</div>
      <div v-else-if="error" class="mb-4">{{ error }}</div>
      <div v-else-if="event" class="mb-4">
        <img
            v-if="event.picture"
            src="../assets/background_cafe.jpg"
            alt="Eventbild"
            class="mb-4 h-52 w-full object-cover"
        /> <!-- :src=event.picture -->
        <h1 class="text-3xl font-bold mb-2">{{ event.name }}</h1>
        <p class="mb-1">{{ formatDate(event.date) }}</p>
        <br/>
        <p class="mb-4">{{ event.description }}</p>
        <br/>
        <p class="mb-1">{{ event.price }} €</p>
        <!--          <p class="mb-1"><strong>Übrige Tickets:</strong> {{ event.numTickets }}</p>-->
        <!--          <p class="mb-1"><strong>Host:</strong> {{ event.hostId }}</p>-->
        <!--          <p class="mb-1"><strong>ID:</strong> {{ event.id }}</p>-->

        <!-- Ernährungsoptionen Dropdown -->
        <!--        <div v-if="event.availableDiets && event.availableDiets.length > 0" class="mb-4">-->
        <!--          <label for="diets" class="block mb-2 font-semibold">Verfügbare Ernährungsoptionen:</label>-->
        <!--          <select-->
        <!--              id="diets"-->
        <!--              v-model="selectedDiet"-->
        <!--              class="block w-full border px-4 py-2 focus:ring-2"-->
        <!--          >-->
        <!--            <option v-for="diet in event.availableDiets" :key="diet" :value="diet">-->
        <!--              {{ diet }}-->
        <!--            </option>-->
        <!--          </select>-->
        <!--          <p v-if="selectedDiet" class="mt-2 text-[#7a5c56]">Ausgewählt: <strong>{{ selectedDiet }}</strong></p>-->
        <!--        </div>-->

        <div class="w-full h-px bg-[#cfcfcf] mb-8"></div>

        <!-- Ernährungsoptionen Anzahl-Auswahl -->
        <div v-if="event && event.availableDiets && event.availableDiets.length > 0" class="mb-4">
          <div v-for="diet in event.availableDiets" :key="diet" class="flex items-center gap-2 mb-2">
            <span class="w-28">{{ diet }}</span>
            <input
                type="number"
                class="w-16 text-center border rounded"
                v-model.number="dietCounts[diet]"
                min="0"
                :max="maxPerDiet"
                :placeholder="`0-${maxPerDiet}`"
            />
          </div>
        </div>

        <!-- Buchen Button -->
        <button
            class="bg-[#98743c] hover:bg-[#7a5c56] text-white font-bold py-2 px-4 w-full cursor-pointer"
            @click="bookEvent"
        >
          Buchung starten
        </button>
      </div>
      <div v-else>
        <p>Kein Event gefunden.</p>
      </div>
    </div>
  </div>
</template>

<style>
body {
  font-family: 'Quicksand', Arial, sans-serif;
  font-weight: 300;
}
</style>
