<template>
    <div class="font-mono">
        <div class="min-h-screen bg-white text-gray-800">
            <!-- Optional: eine globale Navigation -->
            <header class="p-4 border-b flex justify-between items-center">
                <h1 class="text-2xl font-bold">Eventportal</h1>
            </header>

            <!-- Hier wird deine Home-Seite oder andere Seiten angezeigt -->
            <router-view />
        </div>
    </div>
</template>

<script setup>
// kein Script nötig, wenn keine Logik hier gebraucht wird
</script>

<style>
/* Optional globale Styles */
</style>
