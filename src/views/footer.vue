<template>
  <footer class="bg-[#98743c] text-white text-sm py-8">
    <div class="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4 px-4 bg-[#98743c]">
      <!-- Links: Copyright -->
      <div class="w-full md:w-auto text-center md:text-left bg-[#98743c]">
        © {{ new Date().getFullYear() }} Event App · Alle Rechte vorbehalten
      </div>
      <!-- Mitte: Adresse -->
      <div class="w-full md:w-auto text-center bg-[#98743c]">
        <p class="bg-[#98743c]">Franz-Boecker-Straße 5a</p>
        <p class="bg-[#98743c]">86633 Neuburg an der Donau</p>
        <p class="bg-[#98743c]">08431/4322816</p>
      </div>
      <!-- Rechts: Impressum -->
      <div class="w-full md:w-auto flex justify-center md:justify-end bg-[#98743c]">
        <a
            href="/impressum"
            class="transition border-b-2 border-transparent hover:border-white bg-[#98743c]"
        >
          Impressum
        </a>
      </div>
    </div>
  </footer>
</template>