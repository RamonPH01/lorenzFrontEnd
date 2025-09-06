<script lang="ts">
import {ref} from "vue";
import {useRouter} from "vue-router";
import {getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup} from "firebase/auth";

export default {
  setup() {
    const email = ref("");
    const password = ref("");
    const router = useRouter();
    const error = ref("");

    const register = () => {
      createUserWithEmailAndPassword(getAuth(), email.value, password.value)
          .then(() => {
            console.log("Successfully created user");
            router.push("/host");
          })
          .catch((err) => {
            console.log(err.code);
            error.value = err.message;
          });
    };

    return {
      email,
      password,
      register,
      error
    };
  }
};
</script>


<template>
  <div
      class="min-h-screen flex items-center justify-center"
  >
    <div
        class="bg-white no-underline block shadow-lg hover:shadow-[#5c3c26] p-5 transition p-8 w-full max-w-sm"
    >
      <h1 class="text-3xl font-bold text-[#4a2c2a] mb-3 text-center">
        Veranstalter Registrierung
      </h1>
      <div class="w-full h-px bg-[#cfcfcf] mb-4 mt-4"></div>
      <input
          v-model="email"
          type="text"
          placeholder="E-Mail"
          class="border border-[#eacdb6] p-3 focus:outline-none focus:ring-2 focus:ring-[#eacdb6] m-1 w-full"
      />
      <input
          v-model="password"
          type="password"
          placeholder="Passwort"
          class="border border-[#eacdb6] p-3 focus:outline-none focus:ring-2 focus:ring-[#eacdb6] m-1 w-full"
      />

      <p v-if="error" class="text-red-600 text-center m-1">{{ error }}</p>
      <div class="w-full h-px bg-[#cfcfcf] mb-4 mt-4"></div>

      <button
          class="bg-[#98743c] hover:bg-[#7a5c56] text-white py-2 px-4 m-1 w-full cursor-pointer"
          @click="register()"
      >
        Registrieren
      </button>
    </div>
  </div>
</template>
