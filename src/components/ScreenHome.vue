<script setup lang="ts">
import { ref } from "vue";
import { useGameStore } from "../stores/game";

const store = useGameStore();
const playerCount = ref<number>(5);
const playerNames = ref<string[]>(Array(5).fill(""));

// Update names array when player count changes
function updatePlayerCount(delta: number) {
  const newCount = playerCount.value + delta;

  if (newCount >= 2 && newCount <= 10) {
    playerCount.value = newCount;

    // Adjust player names array size
    if (delta > 0) {
      playerNames.value.push("");
    } else {
      playerNames.value.pop();
    }
  }
}

function startGame() {
  // Validate that no name is empty
  const validNames = playerNames.value.filter((name) => name.trim() !== "");

  if (validNames.length === playerCount.value) {
    store.startGame(validNames);
  } else {
    alert("Veuillez remplir tous les noms des joueurs.");
  }
}
</script>

<template>
  <div class="home">
    <div class="logo-container">
      <h1 class="fallback-logo">RAN<br />DOM</h1>
    </div>

    <div class="card">
      <h2>Nombre de joueurs</h2>
      <div class="counter">
        <button @click="updatePlayerCount(-1)" class="btn-icon">-</button>
        <span class="count">{{ playerCount }}</span>
        <button @click="updatePlayerCount(1)" class="btn-icon">+</button>
      </div>
    </div>

    <div class="card options">
      <h2>Noms des joueurs</h2>
      <div class="players-list">
        <input
          v-for="(name, index) in playerNames"
          :key="index"
          v-model="playerNames[index]"
          type="text"
          :placeholder="`Joueur ${index + 1}`"
          class="input-text"
        />
      </div>
    </div>

    <button @click="startGame" class="btn-primary">
      Commencer
      <span class="icon-play">▶</span>
    </button>
  </div>
</template>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
  width: 100%;
}

.logo-container {
  margin-bottom: 2rem;
  text-align: center;
}

.fallback-logo {
  font-size: 4rem;
  line-height: 0.9;
  color: #8cc269;
  text-transform: uppercase;
  font-weight: 900;
}

.card {
  background: var(--color-surface);
  border-radius: var(--border-radius-lg);
  padding: 1.5rem;
  width: 100%;
  box-shadow: 0 4px 12px rgba(255, 138, 0, 0.05);
  text-align: center;
}

h2 {
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

.counter {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
}

.btn-icon {
  background: #ffe8d6;
  color: var(--color-primary);
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
}

.count {
  font-size: 2.5rem;
  font-weight: bold;
  color: var(--color-primary);
}

.players-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.input-text {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid var(--color-bg);
  border-radius: 12px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s;
  color: var(--color-text);
  font-weight: 600;
}

.input-text:focus {
  border-color: var(--color-primary);
}

.btn-primary {
  background: var(--color-primary);
  color: white;
  border: none;
  width: 100%;
  padding: 1rem;
  border-radius: var(--border-radius-pill);
  font-size: 1.25rem;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(255, 138, 0, 0.3);
  margin-top: 1rem;
}
</style>
