<script setup lang="ts">
import { ref } from "vue";
import type { Event } from "../types/event";

const events = ref<Event[]>([
    {
        id: 1,
        name: "Grillfest im Park",
        numTickets: 100,
        description: "Ein entspanntes Sommergrillen.",
        hostId: 1,
        picture: "",
        availableDiets: ["vegetarisch"],
    },
]);

const newEvent = ref<Omit<Event, "id">>({
    name: "",
    numTickets: 0,
    description: "",
    hostId: 1,
    picture: "",
    availableDiets: [],
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
                <input
                    v-model="newEvent.availableDiets"
                    type="text"
                    placeholder="Diäten (Komma)"
                    class="p-2 border rounded"
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
