<script setup lang="ts">
import type {Event} from "../types/event";
import {ref, onMounted} from "vue";
import axios from "axios";
import VueSelect from "vue3-select-component";

const dietOptions = [
  {label: "Vegetarisch", value: "vegetarisch"},
  {label: "Vegan", value: "vegan"},
  {label: "Glutenfrei", value: "glutenfree"},
  {label: "Laktosefrei", value: "lactosefree"},
  {label: "Halal", value: "halal"},
  {label: "Koscher", value: "koscher"},
  {label: "Pescetarisch", value: "pescetarian"},
  {label: "Keine besonderen Wünsche", value: "nothing"},
];

const events = ref<Event[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

const now = new Date()
const minDateTime = formatDateTime(now)

const nextYear = new Date()
nextYear.setFullYear(now.getFullYear() + 1)
const maxDateTime = formatDateTime(nextYear)

const datum = ref(minDateTime)
const isDivCreateEventVisible = ref(false)  // Korrekt als `ref` deklariert
const isDivShowEventsVisible = ref(false)

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

function formatDateTime(date) {
  // Gibt YYYY-MM-DDTHH:MM zurück (z.B. 2025-06-25T13:45)
  const yyyy = date.getFullYear()
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const dd = String(date.getDate()).padStart(2, '0')
  const hh = String(date.getHours()).padStart(2, '0')
  const min = String(date.getMinutes()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}T${hh}:${min}`
}

function mapEvents(rawEvents: any[]): any[] {
  return rawEvents.map((event) => ({
    id: event.id,
    name: event.name,
    numTickets: event.numTickets,
    description: event.description,
    hostId: event.hostId ?? 1,
    picture: event.picture || "",
    availableDiets: event.availableDiets
        ? event.availableDiets.split(",").map((diet: string) => diet.trim())
        : [],
  }));
}

function toggleDivCreateEvent() {
  isDivCreateEventVisible.value = !isDivCreateEventVisible.value;
}

function toggleDivShowEvents() {
  isDivShowEventsVisible.value = !isDivShowEventsVisible.value;
}

function validateEventForm(): string[] {
  const errors: string[] = [];

  if (!newEvent.value.name.trim()) errors.push("Event Name");
  if (!newEvent.value.numTickets || newEvent.value.numTickets <= 0) errors.push("Ticketanzahl");
  if (!newEvent.value.price || newEvent.value.price <= 0) errors.push("Preis");
  if (!datum.value) errors.push("Datum und Uhrzeit");
  if (!newEvent.value.availableDiets.length) errors.push("Diäten");
  if (!newEvent.value.description.trim()) errors.push("Beschreibung");

  return errors;
}

const newEvent = ref({
  name: "",
  numTickets: 0,
  description: "",
  availableDiets: [],
  price: 0,
  picture: null as File | null,
});

function handleImageUpload(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    if (target.files[0].size > 16 * 1024 * 1024) { // groesser als erlaubt (16MB)
      alert("Datei ist zu groß. Maximal erlaubt: 16 MB.");
      return;
    } else {
      newEvent.value.picture = target.files[0];
    }
  }
}

async function addEvent() {
  const errors = validateEventForm();
  if (errors.length > 0) {
    alert("Bitte fülle folgende Felder aus:\n- " + errors.join("\n- "));
    return;
  }

  try {
    const formData = new FormData();
    formData.append("name", newEvent.value.name);
    formData.append("numTickets", newEvent.value.numTickets.toString());
    formData.append("description", newEvent.value.description);
    formData.append("date", datum.value);
    formData.append("price", newEvent.value.price.toString());
    formData.append("availableDiets", newEvent.value.availableDiets.join(","));
    formData.append("fk_host", "1"); // Beispiel: Host-ID auf 1 gesetzt

    if (newEvent.value.picture) {
      formData.append("picture", newEvent.value.picture);
    }

    await axios.post("http://localhost:8080/event", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    alert("Event erfolgreich erstellt!");
    window.location.reload(); // oder: Events neu laden
  } catch (err) {
    console.error("Fehler beim Hinzufügen:", err);
    alert("Fehler beim Erstellen des Events.");
  }
}
</script>

<template>
  <div class="p-6">

    <div class="mb-4">
      <!-- Accordion: Header -->
      <div
          class="cursor-pointer bg-white p-4 shadow flex items-center justify-between w-full max-w-full mx-auto md:max-w-3xl lg:max-w-[60%]"
          @click="toggleDivCreateEvent"
          role="button"
          aria-expanded="isDivCreateEventVisible"
          aria-controls="neues-event-panel"
      >
        <h3 class="text-xl font-semibold">Neues Event anlegen</h3>
        <svg
            class="w-5 h-5 transition-transform"
            :class="{'rotate-180': isDivCreateEventVisible}"
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
            aria-hidden="true"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M19 9l-7 7-7-7"/>
        </svg>
      </div>

      <!-- Accordion: Inhalt -->
      <div
          v-if="isDivCreateEventVisible"
          id="neues-event-panel"
          class="bg-white shadow-lg p-5 transition mb-6 w-full max-w-full mx-auto md:max-w-3xl lg:max-w-[60%]"
      >
        <form
            @submit.prevent="addEvent"
            @click.stop
            class="w-full"
        >
          <div class="grid">
            <input
                v-model="newEvent.name"
                type="text"
                placeholder="Event Name"
                class="p-2 mt-2 mb-2 border"
                required
            />

            <span class="mb-0 mt-2">Ticketanzahl</span>
            <input
                v-model.number="newEvent.numTickets"
                type="number"
                min="0"
                placeholder="Ticketanzahl"
                class="p-2 mt-2 mb-2 border"
                required
            />

            <span class="mb-0 mt-2">Ticketpreis</span>
            <input
                v-model.number="newEvent.price"
                type="number"
                min="0"
                step="0.01"
                placeholder="Preis"
                class="p-2 mt-2 mb-2 border"
                required
            />

            <span class="mb-0 mt-2">Datum und Uhrzeit</span>
            <input
                id="datum"
                type="datetime-local"
                class="p-2 mt-2 mb-2 border"
                v-model="datum"
                :min="minDateTime"
                :max="maxDateTime"
                required
            />

            <VueSelect
                v-model="newEvent.availableDiets"
                :options="dietOptions"
                :is-multi="true"
                placeholder="Diäten"
                class="border mb-2 mt-2"
                required
            />

            <textarea
                v-model="newEvent.description"
                placeholder="Beschreibung"
                class="p-2 mt-2 mb-2 border"
                required
            ></textarea>

            <input
                type="file"
                @change="handleImageUpload"
                accept="image/*"
                class="p-2 mt-2 mb-2 border"
            />
          </div>

          <button
              type="submit"
              class="bg-[#98743c] hover:bg-[#7a5c56] text-white py-2 px-4 w-full cursor-pointer mt-6"
          >
            Hinzufügen
          </button>
        </form>
      </div>
    </div>


    <!-- Eventliste -->
    <div
        class="cursor-pointer bg-white p-4 shadow flex items-center justify-between w-full max-w-full mx-auto md:max-w-3xl lg:max-w-[60%]"
        @click="toggleDivShowEvents"
        role="button"
        aria-expanded="isDivShowEventsVisible"
        aria-controls="neues-event-panel"
    >
      <h3 class="text-xl font-semibold">Meine Events</h3>
      <svg
          class="w-5 h-5 transition-transform"
          :class="{'rotate-180': isDivShowEventsVisible}"
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
          aria-hidden="true"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M19 9l-7 7-7-7"/>
      </svg>
    </div>

    <div
        v-if="isDivShowEventsVisible"
        id="neues-event-panel"
        class="bg-white shadow-lg p-5 transition mb-6 w-full max-w-full mx-auto md:max-w-3xl lg:max-w-[60%]"
    >
      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div
            v-for="event in events"
            :key="event.id"
            class="bg-[#fcedd7] no-underline block shadow-lg hover:shadow-[#5c3c26] p-5 transition rounded"
        >
          <h4 class="text-lg font-semibold mb-4">{{ event.name }}</h4>
          <div class="w-full h-px bg-[#cfcfcf]"></div>
          <p class="text-sm text-gray-700 mt-4">{{ event.description }}</p>
          <p class="text-xs text-gray-500 mt-1">
            {{ event.numTickets }} Tickets · Diäten:
            {{ event.availableDiets?.length ? event.availableDiets.join(", ") : "Keine" }}
          </p>
        </div>
      </div>
    </div>

  </div>
</template>

