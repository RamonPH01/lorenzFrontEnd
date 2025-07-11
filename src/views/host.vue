<script setup lang="ts">
import type { Event } from "../types/event";
import { ref, onMounted } from "vue";
import axios from "axios";
import VueSelect from "vue3-select-component";

const dietOptions = [
    { label: "Vegetarisch", value: "vegetarisch" },
    { label: "Vegan", value: "vegan" },
    { label: "Glutenfrei", value: "glutenfree" },
    { label: "Laktosefrei", value: "lactosefree" },
    { label: "Halal", value: "halal" },
    { label: "Koscher", value: "koscher" },
    { label: "Pescetarisch", value: "pescetarian" },
    { label: "Keine besonderen Wünsche", value: "nothing" },
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

const newEvent = ref<Omit<Event, "id">>({
    name: "",
    numTickets: 0,
    description: "",
    hostId: 1,
    picture: "",
    availableDiets: [],
    price: 0,
});

const addEvent = () => {
    const id = events.value.length + 1;
    const diets = Array.isArray(newEvent.value.availableDiets)
        ? newEvent.value.availableDiets
        : newEvent.value.availableDiets
              .toString()
              .split(",")
              .map((d) => d.trim())
              .filter(Boolean);

    events.value.push({ id, ...newEvent.value, availableDiets: diets });
    newEvent.value = {
        name: "",
        numTickets: 0,
        description: "",
        hostId: 1,
        picture: "",
        availableDiets: [],
    };
};
</script>

<template>
    <div class="p-6 shadow-inner">

        <!-- Neues Event erstellen -->
      <form
          @submit.prevent="addEvent"
          class="bg-white shadow-lg p-5 transition mb-6 w-full max-w-full mx-auto md:max-w-3xl lg:max-w-[60%]"
      >
            <h3 class="text-xl font-semibold mb-3">Neues Event anlegen</h3>
            <div class="grid gap-4">
                <input
                    v-model="newEvent.name"
                    type="text"
                    placeholder="Eventname"
                    class="p-2 border"
                    required
                />
                Ticketanzahl
                <input
                    v-model="newEvent.numTickets"
                    type="number"
                    placeholder="Tickets"
                    class="p-2 border"
                    required
                />
                <input
                    v-model="newEvent.picture"
                    type="text"
                    placeholder="Bild-URL"
                    class="p-2 border"
                /> <!-- muss noch geändert werden zu einem Upload -->
              Datum und Uhrzeit
              <input
                  id="datum"
                  type="datetime-local"
                  v-model="datum"
                  :min="minDateTime"
                  :max="maxDateTime"
              >
                <VueSelect
                    v-model="newEvent.availableDiets"
                    :options="dietOptions"
                    type="text"
                    :is-multi="true"
                    placeholder="Diäten"
                    class="border"
                />
                <textarea
                    v-model="newEvent.description"
                    placeholder="Beschreibung"
                    class="p-2 border"
                    required
                ></textarea>
            </div>
            <button
                type="submit"
                class="bg-[#98743c] hover:bg-[#7a5c56] text-white py-2 px-4 w-full cursor-pointer mt-6"
            >
                Hinzufügen
            </button>
        </form>

        <!-- Eventliste -->
        <div class="bg-white shadow-lg p-5 transition mb-6 w-full max-w-full mx-auto md:max-w-3xl lg:max-w-[60%]">
            <h3 class="text-xl font-semibold mb-4">Meine Events</h3>
            <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div
                    v-for="event in events"
                    :key="event.id"
                    class="bg-[#fcedd7] no-underline block shadow-lg hover:shadow-[#5c3c26] p-5 transition"
                >
                    <h4 class="text-lg font-semibold mb-4">{{ event.name }}</h4>
                  <div class="w-full h-px bg-[#cfcfcf]"></div>
                  <p class="text-sm text-gray-700 mt-4">{{ event.description }}</p>
                    <p class="text-xs text-gray-500 mt-1">
                        {{ event.numTickets }} Tickets · Diäten:
                        {{ event.availableDiets.join(", ") || "Keine" }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
