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
    <div class="font-mono bg-[#fdf6f0] p-6 rounded-xl shadow-inner">
        <h2 class="text-3xl font-bold mb-4 text-[#5a2a27]">
            Veranstalter-Ansicht
        </h2>

        <!-- Neues Event erstellen -->
        <form
            @submit.prevent="addEvent"
            class="bg-white p-6 rounded-xl shadow mb-8"
        >
            <h3 class="text-xl font-semibold mb-3">Neues Event anlegen</h3>
            <div class="grid gap-4 md:grid-cols-2">
                <input
                    v-model="newEvent.name"
                    type="text"
                    placeholder="Eventname"
                    class="p-2 border rounded"
                    required
                />
                <input
                    v-model="newEvent.numTickets"
                    type="number"
                    placeholder="Tickets"
                    class="p-2 border rounded"
                    required
                />
                <input
                    v-model="newEvent.picture"
                    type="text"
                    placeholder="Bild-URL"
                    class="p-2 border rounded"
                />
                <VueSelect
                    v-model="newEvent.availableDiets"
                    :options="dietOptions"
                    type="text"
                    placeholder="Diäten"
                    class="border rounded"
                />
                <textarea
                    v-model="newEvent.description"
                    placeholder="Beschreibung"
                    class="p-2 border rounded md:col-span-2"
                    required
                ></textarea>
            </div>
            <button
                type="submit"
                class="mt-4 bg-[#d64545] text-white px-4 py-2 rounded hover:bg-[#b73737] transition"
            >
                Hinzufügen
            </button>
        </form>

        <!-- Eventliste -->
        <div>
            <h3 class="text-xl font-semibold mb-3">Meine Events</h3>
            <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div
                    v-for="event in events"
                    :key="event.id"
                    class="bg-white p-4 rounded-xl shadow border border-[#f0eae4]"
                >
                    <h4 class="text-lg font-semibold mb-1">{{ event.name }}</h4>
                    <p class="text-sm text-gray-700">{{ event.description }}</p>
                    <p class="text-xs text-gray-500 mt-1">
                        {{ event.numTickets }} Tickets · Diäten:
                        {{ event.availableDiets.join(", ") || "Keine" }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
