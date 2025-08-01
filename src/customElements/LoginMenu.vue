<!-- src/components/LoginMenu.vue -->
<template>
  <button
      id="login-menu-button"
      @click="toggleMenu"
      v-if="isLoggedIn !== null"
      class="fixed bottom-4 right-4 z-50 text-white rounded-full shadow-lg transition-all duration-300 overflow-hidden flex items-center cursor-pointer"
      :class="[
        showLogoutMenu ? 'w-52 pl-4 pr-4' : 'w-14 pl-0 pr-0 justify-center',
        needsContrast ? 'bg-[#5a442c] hover:bg-[#3e2f1f]' : 'bg-[#98743c] hover:bg-[#7a5c56]'
      ]"
  >
    <!-- Menu content -->
    <div class="flex items-center justify-start gap-4 flex-grow">
      <div v-if="showLogoutMenu" class="flex gap-4 items-center">
        <template v-if="isLoggedIn">
          <span
              @click.stop="handleSignOut"
              class="text-white text-xl font-bold hover:border-white hover:text-[#ffd9a1] cursor-pointer"
          >
            Ausloggen
          </span>
        </template>
        <template v-else>
          <span
              @click.stop="handleLogIn"
              class="text-white text-xl font-bold hover:border-white hover:text-[#ffd9a1] cursor-pointer"
          >
            Anmelden
          </span>
        </template>
      </div>
    </div>

    <!-- Icon: Burger or X -->
    <div class="w-14 h-14 flex items-center justify-center">
      <template v-if="!showLogoutMenu">
        <div class="flex flex-col gap-1 items-center">
          <span class="block w-6 h-0.5 bg-white"></span>
          <span class="block w-6 h-0.5 bg-white"></span>
          <span class="block w-6 h-0.5 bg-white"></span>
        </div>
      </template>
      <template v-else>
        <span class="text-2xl leading-none hover:text-[#ffd9a1]">✕</span>
      </template>
    </div>
  </button>
</template>

<script setup lang="ts">
import {onBeforeUnmount, onMounted, ref} from 'vue'
import {useRouter} from 'vue-router'
import {getAuth, onAuthStateChanged, signOut} from 'firebase/auth'

const router = useRouter()
const isLoggedIn = ref<boolean | null>(null)
const showLogoutMenu = ref(false)
const needsContrast = ref(false) // <- Zustand für dunklere Farbe
let auth: any
let observer: MutationObserver

function toggleMenu() {
  showLogoutMenu.value = !showLogoutMenu.value
}

function handleSignOut() {
  showLogoutMenu.value = false
  signOut(auth).then(() => {
    isLoggedIn.value = false
    router.push('/')
  })
}

function handleLogIn() {
  showLogoutMenu.value = false
  router.push('/host-login')
}

// Check if contrast is needed
function checkBackgroundContrast() {
  const button = document.querySelector('#login-menu-button')
  if (!button) return

  const rect = button.getBoundingClientRect()
  const sampleX = rect.left - 7
  const sampleY = rect.bottom - 7

  const elementBehind = document.elementFromPoint(sampleX, sampleY)
  if (!elementBehind) return

  const bgColor = window.getComputedStyle(elementBehind).backgroundColor
  const buttonColor = '#98743c'

  const contrastRatio = getContrastRatio(buttonColor, bgColor)
  needsContrast.value = contrastRatio < 4.2
}

// Basic contrast ratio helper
function getContrastRatio(hex1: string, rgb2: string): number {
  const rgb1 = hexToRgb(hex1)
  const rgb2Parsed = parseRGB(rgb2)
  if (!rgb1 || !rgb2Parsed) return 0

  const l1 = getLuminance(rgb1.r, rgb1.g, rgb1.b)
  const l2 = getLuminance(rgb2Parsed.r, rgb2Parsed.g, rgb2Parsed.b)
  return l1 > l2 ? (l1 + 0.05) / (l2 + 0.05) : (l2 + 0.05) / (l1 + 0.05)
}

function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const v = c / 255
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
  })
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
}

function hexToRgb(hex: string) {
  const cleanHex = hex.replace('#', '')
  const bigint = parseInt(cleanHex, 16)
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255
  }
}

function parseRGB(rgbString: string) {
  const match = rgbString.match(/rgba?\((\d+), (\d+), (\d+)/)
  if (!match) return null
  return {
    r: parseInt(match[1]),
    g: parseInt(match[2]),
    b: parseInt(match[3])
  }
}

onMounted(() => {
  auth = getAuth()
  onAuthStateChanged(auth, (user) => {
    isLoggedIn.value = !!user
  })

  // Erste Prüfung
  checkBackgroundContrast()

  // Events, die eine neue Prüfung erfordern
  window.addEventListener('scroll', checkBackgroundContrast)
  window.addEventListener('resize', checkBackgroundContrast)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', checkBackgroundContrast)
  window.removeEventListener('resize', checkBackgroundContrast)
  if (observer) observer.disconnect()
})
</script>


<!--<script setup lang="ts">-->
<!--import { ref, onMounted } from 'vue'-->
<!--import { useRouter } from 'vue-router'-->
<!--import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'-->

<!--const router = useRouter()-->
<!--const isLoggedIn = ref<boolean | null>(null)-->
<!--const showLogoutMenu = ref(false)-->
<!--let auth: any-->

<!--function toggleMenu() {-->
<!--  showLogoutMenu.value = !showLogoutMenu.value-->
<!--}-->

<!--function handleSignOut() {-->
<!--  showLogoutMenu.value = false-->
<!--  signOut(auth).then(() => {-->
<!--    isLoggedIn.value = false-->
<!--    router.push('/')-->
<!--  })-->
<!--}-->

<!--function handleLogIn() {-->
<!--  showLogoutMenu.value = false-->
<!--  router.push('/host-login')-->
<!--}-->

<!--onMounted(() => {-->
<!--  auth = getAuth()-->
<!--  onAuthStateChanged(auth, (user) => {-->
<!--    isLoggedIn.value = !!user-->
<!--  })-->
<!--})-->
<!--</script>-->
