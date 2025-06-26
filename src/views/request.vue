<script setup lang="ts">
// Add your script logic here
import { ref, computed } from "vue";
import { EmailRequest } from "../types/emailRequest";
import axios from "axios";

// Form fields
const firstName = ref("");
const lastName = ref("");
const email = ref("");
const phone = ref("");
const date = ref("");
const occasion = ref("");
const persons = ref("");
const details = ref("");
const contactPreference = ref("");
const privacyAccepted = ref(false);

// Occasion options
const occasionOptions = [
    "Geburtstag",
    "Jubiläum",
    "Geschäftlich",
    "Familientreffen",
    "Anderer Anlass",
];

// Helper: at least one of email or phone must be filled
const hasEmailOrPhone = computed(() => {
    return !!email.value.trim() || !!phone.value.trim();
});

// Email validation: must contain '@' and end with .de, .net, or .com
const isEmailValid = computed(() => {
    if (!email.value.trim()) return false;
    if (!email.value.includes("@")) return false;
    return /\.(de|net|com)$/i.test(email.value.trim());
});

// Phone validation: simple check for digits and length
const isPhoneValid = computed(() => {
    if (!phone.value.trim()) return false;
    // Accepts numbers, spaces, +, -, ()
    return /^[\d\s+\-()]{6,}$/.test(phone.value.trim());
});

// Show contact preference if both email and phone are filled and valid
const showContactPreference = computed(() => {
    return (
        email.value.trim() &&
        phone.value.trim() &&
        isEmailValid.value &&
        isPhoneValid.value
    );
});

// Details required if neither occasion nor persons is filled
const isDetailsRequired = computed(() => {
    return !occasion.value && !persons.value;
});

// Personenanzahl: must be positive integer if filled
const isPersonsValid = computed(() => {
    if (!persons.value) return true;
    return /^[1-9]\d*$/.test(persons.value);
});

// Main form validation
const isFormValid = computed(() => {
    // Pflichtfelder
    if (!firstName.value.trim() || !lastName.value.trim()) return false;
    if (!date.value) return false;
    if (!privacyAccepted.value) return false;

    // Email/Telefon: mindestens eines muss ausgefüllt und gültig sein
    if (!hasEmailOrPhone.value) return false;
    if (email.value.trim() && !isEmailValid.value) return false;
    if (phone.value.trim() && !isPhoneValid.value) return false;

    // Personenanzahl falls ausgefüllt, muss gültig sein
    if (!isPersonsValid.value) return false;

    // Details: Pflicht, wenn weder Anlass noch Personenanzahl angegeben
    if (isDetailsRequired.value && !details.value.trim()) return false;

    // Kontaktpräferenz, falls beide angegeben
    if (showContactPreference.value && !contactPreference.value) return false;

    return true;
});

// Submit handler: EmailRequest erzeugen und absenden
const submitForm = async () => {
    if (!isFormValid.value) return;

    // Personenanzahl als Zahl oder null, typkompatibel behandeln
    const anzahlPersonen: number | null =
        persons.value && !isNaN(Number(persons.value))
            ? Number(persons.value)
            : null;

    // EmailRequest-Objekt nach Backend-Schema erzeugen
    const emailRequest: EmailRequest = {
        vorname: firstName.value.trim(),
        nachname: lastName.value.trim(),
        email: email.value.trim(),
        telefonnummer: phone.value.trim(),
        datum: date.value,
        anlass: occasion.value.trim(),
        anzahlPersonen: anzahlPersonen,
        beschreibung: details.value.trim(),
    };

    try {
        // Sende an das lokale Backend wie bei anderen API-Calls
        const response = await axios.post(
            "http://localhost:8080/api/email/send",
            emailRequest,
        );
        if (response.status === 200 || response.status === 201) {
            alert("Anfrage erfolgreich übermittelt!");
            // Optional: Formular zurücksetzen
            firstName.value = "";
            lastName.value = "";
            email.value = "";
            phone.value = "";
            date.value = "";
            occasion.value = "";
            persons.value = "";
            details.value = "";
            contactPreference.value = "";
            privacyAccepted.value = false;
        } else {
            alert("Fehler beim Senden der Anfrage.");
        }
    } catch (e) {
        alert("Netzwerkfehler beim Senden der Anfrage.");
    }
};
</script>

<template>
    <div
        class="font-mono min-h-screen bg-[#eacdb6] p-6 flex flex-col items-center justify-center"
    >
        <div
            class="bg-[#d9b49c] shadow-md rounded-2xl border border-[#deb699] p-8 w-full max-w-md"
        >
            <h1 class="text-3xl font-bold text-[#4a2c2a] mb-4 text-center">
                Anfrageformular
            </h1>
            <form @submit.prevent="submitForm" class="flex flex-col gap-4">
                <!-- Vorname -->
                <input
                    v-model="firstName"
                    type="text"
                    class="rounded-xl border border-[#deb699] p-3 focus:outline-none focus:ring-2 focus:ring-[#eacdb6]"
                    placeholder="Vorname*"
                    required
                />

                <!-- Nachname -->
                <input
                    v-model="lastName"
                    type="text"
                    class="rounded-xl border border-[#deb699] p-3 focus:outline-none focus:ring-2 focus:ring-[#eacdb6]"
                    placeholder="Nachname*"
                    required
                />

                <!-- Email -->
                <input
                    v-model="email"
                    type="email"
                    class="rounded-xl border border-[#deb699] p-3 focus:outline-none focus:ring-2 focus:ring-[#eacdb6]"
                    placeholder="E-Mail"
                />
                <span
                    v-if="email && !isEmailValid"
                    class="text-red-600 text-xs ml-1"
                    >Ungültige E-Mail-Adresse</span
                >

                <!-- Telefonnummer -->
                <input
                    v-model="phone"
                    type="tel"
                    class="rounded-xl border border-[#deb699] p-3 focus:outline-none focus:ring-2 focus:ring-[#eacdb6]"
                    placeholder="Telefonnummer"
                />
                <span
                    v-if="phone && !isPhoneValid"
                    class="text-red-600 text-xs ml-1"
                    >Ungültige Telefonnummer</span
                >

                <!-- Hinweis: Email oder Telefon muss ausgefüllt sein -->
                <span v-if="!hasEmailOrPhone" class="text-red-600 text-xs ml-1"
                    >Bitte E-Mail oder Telefonnummer angeben</span
                >

                <!-- Datum -->
                <input
                    v-model="date"
                    type="date"
                    class="rounded-xl border border-[#deb699] p-3 focus:outline-none focus:ring-2 focus:ring-[#eacdb6]"
                    placeholder="Datum*"
                    required
                />

                <!-- Anlass -->
                <select
                    v-model="occasion"
                    class="rounded-xl border border-[#deb699] p-3 focus:outline-none focus:ring-2 focus:ring-[#eacdb6]"
                >
                    <option value="">Anlass (optional)</option>
                    <option
                        v-for="option in occasionOptions"
                        :key="option"
                        :value="option"
                    >
                        {{ option }}
                    </option>
                </select>

                <!-- Anzahl Personen -->
                <input
                    v-model="persons"
                    type="number"
                    min="1"
                    class="rounded-xl border border-[#deb699] p-3 focus:outline-none focus:ring-2 focus:ring-[#eacdb6]"
                    placeholder="Anzahl Personen (optional)"
                />
                <span
                    v-if="persons && !isPersonsValid"
                    class="text-red-600 text-xs ml-1"
                    >Bitte eine gültige Anzahl eingeben</span
                >

                <!-- Details/Beschreibung -->
                <textarea
                    v-model="details"
                    class="rounded-xl border border-[#deb699] p-3 resize-none focus:outline-none focus:ring-2 focus:ring-[#eacdb6]"
                    rows="4"
                    maxlength="1000"
                    placeholder="Details/Beschreibung"
                    :required="isDetailsRequired"
                ></textarea>
                <span
                    v-if="isDetailsRequired && !details"
                    class="text-red-600 text-xs ml-1"
                >
                    Bitte Details/Beschreibung angeben, wenn kein Anlass und
                    keine Personenanzahl gewählt wurde
                </span>

                <!-- Kontaktpräferenz -->
                <div v-if="showContactPreference" class="flex flex-col gap-2">
                    <label class="font-semibold text-[#4a2c2a]"
                        >Wie sollen wir Sie kontaktieren?*</label
                    >
                    <div class="flex gap-4">
                        <label>
                            <input
                                type="radio"
                                value="email"
                                v-model="contactPreference"
                            />
                            Per E-Mail
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="phone"
                                v-model="contactPreference"
                            />
                            Per Telefon
                        </label>
                    </div>
                    <span
                        v-if="!contactPreference"
                        class="text-red-600 text-xs ml-1"
                        >Bitte eine Kontaktart wählen</span
                    >
                </div>

                <!-- Datenschutz -->
                <div class="flex items-center gap-2">
                    <input
                        type="checkbox"
                        v-model="privacyAccepted"
                        id="privacy"
                        required
                    />
                    <label for="privacy" class="text-sm">
                        Ich habe die
                        <a href="#" class="underline">Datenschutzerklärung</a>
                        gelesen und akzeptiere sie.*
                    </label>
                </div>
                <span v-if="!privacyAccepted" class="text-red-600 text-xs ml-1"
                    >Bitte akzeptieren Sie die Datenschutzerklärung</span
                >

                <!-- Submit -->
                <button
                    type="submit"
                    class="bg-[#eacdb6] text-[#4a2c2a] font-semibold rounded-xl py-2 mt-2 hover:bg-[#deb699] transition"
                    :disabled="!isFormValid"
                    :class="{ 'opacity-50 cursor-not-allowed': !isFormValid }"
                >
                    Absenden
                </button>
            </form>
        </div>
    </div>
</template>
