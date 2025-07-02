<template>
  <footer class="bg-[#98743c] text-white text-sm py-8">
    <div class="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4 px-4">
      <!-- Links: Copyright -->
      <div class="w-full md:w-auto text-center md:text-left">
        © {{ new Date().getFullYear() }} Event App · Alle Rechte vorbehalten
      </div>
      <!-- Mitte: Adresse -->
      <div class="w-full md:w-auto text-center">
        <p>Franz-Boecker-Straße 5a</p>
        <p>86633 Neuburg an der Donau</p>
        <p>08431/4322816</p>
      </div>
      <!-- Rechts: Impressum -->
      <div class="w-full md:w-auto flex justify-center md:justify-end">
        <a
            href="/impressum"
            class="transition border-b-2 border-transparent hover:border-white"
        >
          Impressum
        </a>
      </div>
    </div>
  </footer>
</template>