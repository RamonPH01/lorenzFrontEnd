<script setup lang="ts">
import type { Event } from "@/types/event";

const events: Event[] = [
    {
        id: 1,
        name: "Konzert am See",
        numTickets: 100,
        description: "Ein stimmungsvolles Konzert direkt am Wasser.",
        hostId: 42,
        picture: "/img/konzert.jpg",
        availableDiets: ["vegetarisch", "vegan"],
    },
    {
        id: 2,
        name: "Food Festival",
        numTickets: 250,
        description: "Kulinarische Highlights aus aller Welt.",
        hostId: 7,
        picture: "/img/food.jpg",
        availableDiets: ["vegan", "glutenfrei"],
    },
    {
        id: 3,
        name: "Tech Meetup",
        numTickets: 80,
        description: "Innovationen, Networking und Vorträge.",
        hostId: 15,
        picture: "/img/tech.jpg",
        availableDiets: [],
    },
];
</script>

<template>
    <div class="font-mono">
        <div class="min-h-screen bg-[#fdf6f0] p-6">
            <!-- Header -->
            <header class="flex justify-between items-center mb-10">
                <h1 class="text-4xl text-[#5a2a27]">Eventübersicht</h1>
                <router-link to="/veranstalter" class="no-underline">
                    <button
                        class="bg-[#d64545] text-white px-5 py-2 rounded-xl hover:bg-[#b73737] transition"
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
