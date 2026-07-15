<script setup lang="ts">
import { useGameStore } from "./stores/game";
import ScreenHome from "./components/ScreenHome.vue";
import ScreenWordInput from "./components/ScreenWordInput.vue";
import ScreenGuessing from "./components/ScreenGuessing.vue";
import ThemeToggle from "./components/ThemeToggle.vue";

const store = useGameStore();
</script>

<template>
  <main>
    <ThemeToggle />

    <ScreenHome v-if="store.currentPhase === 1" />
    <ScreenWordInput v-else-if="store.currentPhase === 2" />
    <ScreenGuessing v-else-if="store.currentPhase === 3" />
  </main>
</template>
