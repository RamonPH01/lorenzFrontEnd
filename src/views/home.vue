<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { Event } from "../types/event";
import axios from "axios";

const events = ref<Event[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

onMounted(async () => {
  try {
    const response = await axios.get<Event[]>("http://localhost:8080/event/get");
    console.log(response.data);
    events.value = mapEvents(response.data);
    console.log(events.value);
  } catch (err) {
    error.value = "Fehler beim Laden der Events.";
    console.error(err);
  } finally {
    loading.value = false;
  }
});

function mapEvents(rawEvents: any[]): any[] {
  return rawEvents.map(event => ({
    id: event.id,
    name: event.name,
    numTickets: event.numTickets,
    description: event.description,
    hostId: event.hostId ?? 1, // Default 1, falls nicht vorhanden
    picture: event.picture || "",
    availableDiets: event.availableDiets
        ? event.availableDiets.split(",").map((diet: string) => diet.trim())
        : [],
  }));
}
</script>

<template>
    <div class="font-mono ">
        <div class="min-h-screen bg-[#372c31] p-6">
            <!-- Header -->
            <header class="flex justify-between items-center mb-10">
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="360" height="150" viewBox="0 0 695.669 292.221"> <defs> <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0"> <stop offset="0%" stop-color="#deb699"></stop> <stop offset="20%" stop-color="#f7e8d9"></stop> <stop offset="40%" stop-color="#ce905e"></stop> <stop offset="60%" stop-color="#af8565"></stop> <stop offset="80%" stop-color="#f7e8d9"></stop> <stop offset="90%" stop-color="#deb699"></stop> <stop offset="100%" stop-color="#deb699"></stop> </linearGradient> <pattern id="pattern" x="0" y="0" width="300%" height="100%" patternUnits="userSpaceOnUse"> <rect x="0" y="0" width="150%" height="100%" fill="url(#gradient)"> <animate attributeType="XML" attributeName="x" from="0" to="150%" dur="7s" repeatCount="indefinite"></animate> </rect> <rect x="-150%" y="0" width="150%" height="100%" fill="url(#gradient)"> <animate attributeType="XML" attributeName="x" from="-150%" to="0" dur="7s" repeatCount="indefinite"></animate> </rect> </pattern> </defs> <path d="M140.573,71.117c47.471-66.9,100.672-80.6,124.249-65.63,28.355,17.843-32.179,93.031-82.2,85.064C167.334,88,186.765,69.207,197.6,71.117a6.8,6.8,0,0,1,3.824,11.149c29.949,5.1,82.2-52.886,59.58-71.042C239.651-5.981,189.317,28.746,157.776,80.04c-27.079,44.285-52.886,107.682-89.2,129.346,13.379.319,28.674,6.053,43.963,15.292,27.082,16.249,50.975,56.71,84.111,59.577,12.106.957,23.893-5.1,30.584-10.83,13.7-11.471,7.01-20.71-.638-23.9-3.186-1.276,2.232-6.053,5.1-5.734,7.326.957,12.106,3.824,12.106,10.83,0,16.252-30.9,37.6-53.2,37.6-53.846,0-90.8-62.447-133.811-73.915-18.156,9.877-34.724,18.8-48.108,21.029-9.239,1.591-12.741-3.189-2.226-14.019,8.6-8.92,28.671-16.565,51.291-15.93,42.055-50.975,46.514-86.975,82.835-138.269" transform="translate(0 -0.001)" fill="url(#pattern)"></path> <path d="M122.159,49.472a11.094,11.094,0,0,1,10.83-8.282,8.672,8.672,0,0,1,6.691,2.87c1.276,1.588,2.548,8.917.957,14.651,1.272,8.282,9.558,19.435,19.113,19.754,12.747.638,21.986-.954,36.959-16.887,1.276-1.591-.319,4.462-1.272,5.415-9.242,10.2-23.577,16.89-40.142,16.89a35.237,35.237,0,0,1-21.667-7.01,171.608,171.608,0,0,1-9.558,18.478c-10.193,16.883-36,50.335-57.985,50.335-9.555,0-14.973-8.282-14.016-18.156,1.595-23.258,31.857-64.992,57.347-75.51,1.595-.638,6.053,1.913,4.14,3.508C94.123,74.644,75.645,106.5,73.1,122.431c-1.279,8.92,3.821,11.787,7.644,10.511,14.016-4.14,28.355-20.069,38.869-37.591a149.788,149.788,0,0,0,10.511-21.664c-6.691-7.01-9.874-16.568-7.963-24.215" transform="translate(110.494 87.592)" fill="url(#pattern)"></path> <path d="M102.781,59.7c1.595-9.558,12.106-17.205,21.983-16.249,9.236.957,4.458,17.84-5.415,28.036,7.644,1.276,15.927.319,20.707-1.591s7.01,1.273,3.183,6.691C129.222,95.7,118.069,111.95,111.7,129.79c-5.1,13.7,0,20.391,8.6,19.435,13.382-1.272,36.637-12.422,57.666-29.308,14.973-44.285,49.062-75.188,65.63-82.2,13.379-5.415,14.654,3.824,11.784,9.877-6.688,14.019-26.441,35.68-51.291,56.388-8.282,24.218-2.867,39.191,6.056,36.324,16.883-5.1,38.228-15.3,90.8-63.719,1.273-1.272,2.226,2.229-.322,4.462-56.391,51.291-85.7,68.5-105.134,71.042-13.063,1.595-21.983-7.329-18.8-26.757-27.717,22.3-56.072,31.219-70.407,32.175-25.491,1.276-21.667-31.86,19.751-81.241-18.478.635-25.169-6.691-23.255-16.568M250.6,48.553c1.595-3.189.957-9.239-5.734-5.737-19.435,10.2-34.408,40.145-38.547,53.208C222.887,83.6,244.87,59.7,250.6,48.553" transform="translate(191.998 76.728)" fill="url(#pattern)"></path> <path d="M165.77,134.958c-4.462,7.007-13.063,11.149-17.84,11.149-3.189,0-4.78-1.591-3.189-5.415,5.1-12.106,14.02-28.989,25.807-54.8,4.462-9.558,7.648-21.029,12.744-26.126,5.418-5.415,13.7-9.558,18.481-9.558,4.14,0,6.05,3.186.316,11.149-7.644,12.109-15.93,30.584-30.265,58.942C215.47,62,237.134,41.292,250.2,41.292c7.963,0,12.425,11.149,5.1,26.122-9.558,19.754-25.169,47.155-25.169,61.809,0,6.053,2.548,8.282,6.056,8.282,8.917,0,45.238-17.2,88.247-73.274,3.5-4.462,4.14,1.591,1.273,5.1-53.521,63.082-87.294,76.779-101.31,76.779-7.329,0-15.93-6.053-15.93-13.06,0-23.258,30.9-64.676,33.454-83.154-7.013,3.824-31.225,25.169-76.144,85.064" transform="translate(306.472 87.809)" fill="url(#pattern)"></path> <path d="M282.091,62.627c-19.572,8.195-39.76,12.3-48.571,10.4-8.22-1.9-14.2-6.935-11.687-13.869,1.9-5.678,11.687-17.055,19.572-17.365,7.244-.306,15.129,4.111,1.876,21.448,18.622,3.467,35.033-1.876,46.7-6.935,5.368-2.826,9.145,5.678,5.368,8.195C260,88.159,236.652,106.471,212.381,128.87c9.142-4.418,23.346-3.8,36.909,12.919,12.919,16.1,23.015,15.464,35.011,5.368,3.158-2.517,3.158,3.777-.309,6.319-24.606,17.646-36.293,18.931-50.163,5.034-12.612-12.609-23.043-23.011-37.218-10.093-5.678,2.851-11.687-.616-7.885-3.777,0,0,58.357-54.58,93.365-82.013" transform="translate(398.799 88.848)" fill="url(#pattern)"></path> </svg>
                <router-link to="/host" class="no-underline">
                    <button
                        class="bg-red-800 text-white px-4 py-2 rounded-lg shadow hover:bg-red-900 transition"
                    >
                      <i class="fa-solid fa-user mr-2"></i>
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
                    class="no-underline block bg-[#eacdb6] shadow-md hover:shadow-lg rounded-2xl border border-[#f0eae4] p-5 transition"
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
