<script setup lang="ts">
// import {computed, ref} from 'vue'
// import { useBookingStore } from '../stores/booking'
// import {useRoute} from "vue-router";
// import {CheckoutRequest} from "../types/checkoutRequest";
// import axios from "axios";
//
// const route = useRoute()
// const bookingStore = useBookingStore()
//
// // DietCounts explizit typisieren
// const dietCounts = computed(() => bookingStore.dietCounts as Record<string, number>)
//
// // Form fields
// const firstName = ref("");
// const lastName = ref("");
// const email = ref("");
// const privacyAccepted = ref(false);
//
// // Email validation: must contain '@' and end with .de, .net, or .com
// const isEmailValid = computed(() => {
//   if (!email.value.trim()) return false;
//   if (!email.value.includes("@")) return false;
//   return /\.(de|net|com)$/i.test(email.value.trim());
// });
//
// const isFormValid = computed(() => {
//   // Pflichtfelder
//   if (!firstName.value.trim() || !lastName.value.trim()) return false;
//   if (!privacyAccepted.value) return false;
//   if (email.value.trim() && !isEmailValid.value) return false;
//   return true;
// });
//
// const submitForm = async () => {
//   if (!isFormValid.value) return;
//
//   // EmailRequest-Objekt nach Backend-Schema erzeugen
//   const checkoutRequest: CheckoutRequest = {
//     firstName: firstName.value.trim(),
//     lastName: lastName.value.trim(),
//     email: email.value.trim(),
//     tickets: bookingStore.dietCounts
//   };
//
//   try {
//     // Sende an das lokale Backend wie bei anderen API-Calls
//     const response = await axios.post(
//         "http://localhost:8080/checkout",
//         checkoutRequest,
//     );
//     if (response.status === 200 || response.status === 201) {
//       alert("Anfrage erfolgreich übermittelt!");
//       // Optional: Formular zurücksetzen
//       firstName.value = "";
//       lastName.value = "";
//       email.value = "";
//       privacyAccepted.value = false;
//     } else {
//       alert("Fehler beim Senden der Anfrage.");
//     }
//   } catch (e) {
//     alert("Netzwerkfehler beim Senden der Anfrage.");
//   }
// };

</script>

<template>
<!--  <div-->
<!--      class="min-h-screen p-6 flex flex-col items-center justify-center"-->
<!--  >-->
<!--    <div-->
<!--        class="bg-white no-underline block shadow-lg hover:shadow-[#5c3c26] p-5 transition"-->
<!--    >-->
<!--      <h1 class="text-2xl font-semibold text-[#4a2c2a] mb-6">-->
<!--        Checkout für {{ bookingStore.eventName }}-->
<!--      </h1>-->
<!--      <form @submit.prevent="submitForm" class="flex flex-col gap-4">-->
<!--        <h2 class="text-xl mb-2">Deine Auswahl:</h2>-->
<!--        <ul class="mb-4">-->
<!--          <li-->
<!--              v-for="(count, diet) in dietCounts"-->
<!--              :key="diet"-->
<!--          >-->
<!--            {{ diet }}: {{ count }} Tickets-->
<!--          </li>-->
<!--        </ul>-->

<!--        <p><strong>Gesamtanzahl:</strong> {{ bookingStore.totalTickets }} Tickets</p>-->
<!--        <p><strong>Gesamtpreis:</strong> {{ bookingStore.totalPrice }} €</p>-->

<!--        &lt;!&ndash; Vorname &ndash;&gt;-->
<!--        <input-->
<!--            v-model="firstName"-->
<!--            type="text"-->
<!--            class="border border-[#deb699] p-3 focus:outline-none focus:ring-2 focus:ring-[#eacdb6]"-->
<!--            placeholder="Vorname*"-->
<!--            required-->
<!--        />-->

<!--        &lt;!&ndash; Nachname &ndash;&gt;-->
<!--        <input-->
<!--            v-model="lastName"-->
<!--            type="text"-->
<!--            class="border border-[#deb699] p-3 focus:outline-none focus:ring-2 focus:ring-[#eacdb6] mb-4"-->
<!--            placeholder="Nachname*"-->
<!--            required-->
<!--        />-->

<!--        &lt;!&ndash; Email &ndash;&gt;-->
<!--        <input-->
<!--            v-model="email"-->
<!--            type="email"-->
<!--            class="border border-[#deb699] p-3 focus:outline-none focus:ring-2 focus:ring-[#eacdb6]"-->
<!--            placeholder="E-Mail"-->
<!--        />-->
<!--        <span-->
<!--            v-if="email && !isEmailValid"-->
<!--            class="text-red-600 text-xs ml-1"-->
<!--        >Ungültige E-Mail-Adresse</span-->
<!--        >-->

<!--        &lt;!&ndash; Datenschutz &ndash;&gt;-->
<!--        <div class="flex items-center gap-2">-->
<!--          <input-->
<!--              type="checkbox"-->
<!--              v-model="privacyAccepted"-->
<!--              id="privacy"-->
<!--              required-->
<!--          />-->
<!--          <label for="privacy" class="text-sm">-->
<!--            Ich habe die-->
<!--            <a href="#" class="underline">Datenschutzerklärung</a>-->
<!--            gelesen und akzeptiere sie.*-->
<!--          </label>-->
<!--        </div>-->
<!--        <span v-if="!privacyAccepted" class="text-red-600 text-xs ml-1"-->
<!--        >Bitte akzeptieren Sie die Datenschutzerklärung</span-->
<!--        >-->

<!--        &lt;!&ndash; Submit &ndash;&gt;-->
<!--        <button-->
<!--            class="bg-green-600 text-white px-4 py-2 mt-4 rounded hover:bg-green-700"-->
<!--        >-->
<!--          Jetzt buchen-->
<!--        </button>-->
<!--      </form>-->
<!--    </div>-->
<!--  </div>-->
</template>
