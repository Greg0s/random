<script setup lang="ts">
import { useGameStore } from "./stores/game";
import ScreenHome from "./components/ScreenHome.vue";
import ScreenWordInput from "./components/ScreenWordInput.vue";
import ScreenGuessing from "./components/ScreenGuessing.vue";
import ThemeToggle from "./components/ThemeToggle.vue";

const store = useGameStore();
</script>

<template>
  <header class="app-header">
    <h1 class="app-logo">RAN<br />DOM</h1>
    <div class="header-actions">
      <ThemeToggle />
    </div>
  </header>

  <main class="app-content">
    <ScreenHome v-if="store.currentPhase === 1" />
    <ScreenWordInput v-else-if="store.currentPhase === 2" />
    <ScreenGuessing v-else-if="store.currentPhase === 3" />
  </main>
</template>

<style scoped>
.app-header {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  /* Added left and right padding */
  padding: 1.5rem 1rem 2rem 1rem;
  flex: 0 0 auto;
}

.app-logo {
  font-size: 3rem;
  line-height: 0.9;
  color: var(--color-success);
  text-transform: uppercase;
  font-weight: 900;
  margin: 0;
  text-align: center;
}

.header-actions {
  position: absolute;
  /* Shifted from the absolute right edge */
  right: 1rem;
  display: flex;
  align-items: center;
}

.app-content {
  flex: 1 1 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  /* Added horizontal padding for all inner pages */
  padding: 0 1rem 1rem 1rem;
}
</style>
