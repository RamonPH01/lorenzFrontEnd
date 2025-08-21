<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

const route = useRoute();
const router = useRouter();

const event = ref<any | null>(null);
const loading = ref(true);
const error = ref<string | null>(null);

const dietCounts = ref<Record<string, number>>({});
const maxPerDiet = 10;

const showError = ref(false);

onMounted(async () => {
  const eventId = Number(route.params.id);
  try {
    const response = await axios.get(
        `http://localhost:8080/event/${eventId}`
    );
    const data = response.data;

    event.value = {
      ...data,
      availableDiets: Array.isArray(data.availableDiets)
          ? data.availableDiets
          : typeof data.availableDiets === "string" && data.availableDiets.length > 0
              ? data.availableDiets.split(",").map((diet: string) => diet.trim())
              : [],
    };

    // Ernährungsoptionen initialisieren
    event.value.availableDiets.forEach((diet: string) => {
      dietCounts.value[diet] = 0;
    });
  } catch (err) {
    error.value = "Fehler beim Laden des Events.";
    console.error(err);
  } finally {
    loading.value = false;
  }
});

function formatDate(dateString: string) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${day}.${month}.${year} um ${hours}:${minutes} Uhr`;
}

function hasValidDietSelection() {
  return Object.values(dietCounts.value).some((count) => count > 0);
}

function startBooking() {
  if (!event.value) return;

  if (!hasValidDietSelection()) {
    showError.value = true;
    return;
  } else {
    showError.value = false;
  }

  console.log(event.value)

  router.push("/checkout");
}
</script>

<template>
  <div class="p-2 flex justify-center items-center">
    <div
        class="shadow-lg p-10 max-w-xl w-full"
        style="background: rgba(255, 255, 255, 0.9)"
    >
      <div v-if="loading" class="mb-4">Lade Event...</div>
      <div v-else-if="error" class="mb-4">{{ error }}</div>
      <div v-else-if="event" class="mb-4">
        <img
            v-if="event.picture && event.picture.fileData"
            :src="`data:image/*;base64,${event.picture.fileData}`"
            alt="Eventbild"
            class="mb-4 h-52 w-full object-cover"
        />
        <h1 class="text-3xl font-bold mb-2">{{ event.name }}</h1>
        <p class="mb-1">{{ formatDate(event.date) }}</p>
        <br />
        <p class="mb-4">{{ event.description }}</p>
        <br />
        <p class="mb-1">{{ event.price }} € pro Ticket</p>

        <div class="w-full h-px bg-[#cfcfcf] mb-8"></div>

        <!-- Auswahl der Ernährungsoptionen -->
        <div
            v-if="event.availableDiets && event.availableDiets.length > 0"
            class="mb-4"
        >
          <div
              v-for="diet in event.availableDiets"
              :key="diet"
              class="flex items-center gap-2 mb-2"
          >
            <span class="w-28">{{ diet }}</span>
            <input
                type="number"
                class="w-16 text-center border rounded"
                v-model.number="dietCounts[diet]"
                min="0"
                :max="maxPerDiet"
            />
          </div>
        </div>

        <div v-if="showError" class="text-red-800 mb-4">
          Bitte wähle mindestens eine Ernährungsoption aus.
        </div>

        <!-- Buchen Button -->
        <button
            class="bg-[#98743c] hover:bg-[#7a5c56] text-white font-bold py-2 px-4 w-full cursor-pointer"
            @click="startBooking"
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
