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
  <div>
    <h1>Event Details</h1>
    <div v-if="loading">Lade Event...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else-if="event">
      <p><strong>ID:</strong> {{ event.id }}</p>
      <p><strong>Name:</strong> {{ event.name }}</p>
      <p><strong>Number of Tickets:</strong> {{ event.numTickets }}</p>
      <p><strong>Description:</strong> {{ event.description }}</p>
      <p><strong>Date:</strong> {{ formatDate(event.date) }}</p>
      <p><strong>Price:</strong> {{ event.price }} €</p>
      <p><strong>Host ID:</strong> {{ event.hostId }}</p>
      <p><strong>Picture:</strong></p>
      <img v-if="event.picture" :src="event.picture" alt="Event picture" style="max-width: 200px;" />
      <p v-if="event.availableDiets && event.availableDiets.length > 0">
        <strong>Available Diets:</strong> {{ event.availableDiets.join(', ') }}
      </p>
    </div>
    <div v-else>
      <p>Kein Event gefunden.</p>
    </div>
  </div>
</template>
