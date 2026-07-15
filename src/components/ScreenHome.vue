<script setup lang="ts">
import { ref } from "vue";
import { useGameStore } from "../stores/game";

const store = useGameStore();
const playerCount = ref<number>(5);

// Initialize with empty strings
const playerNames = ref<string[]>(Array(5).fill(""));

function updatePlayerCount(delta: number) {
  const newCount = playerCount.value + delta;

  if (newCount >= 2 && newCount <= 10) {
    playerCount.value = newCount;

    // Adjust player names array size with empty strings
    if (delta > 0) {
      playerNames.value.push("");
    } else {
      playerNames.value.pop();
    }
  }
}

function startGame() {
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
    <div class="content">
      <div class="section">
        <h2>Nombre de joueurs</h2>
        <!-- Pill wrapper isolated from the rest -->
        <div class="counter-pill">
          <button @click="updatePlayerCount(-1)" class="btn-icon">-</button>
          <span class="count">{{ playerCount }}</span>
          <button @click="updatePlayerCount(1)" class="btn-icon">+</button>
        </div>
      </div>

      <div class="section players-card">
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
    </div>

    <div class="footer">
      <button @click="startGame" class="btn-primary">
        Commencer
        <span class="icon-play">▶</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  justify-content: space-between;
}

.content {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  justify-content: center;
  overflow-y: auto;
  padding: 0.5rem 0;
}

.section {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

h2 {
  font-size: 1.2rem;
  margin-bottom: 0.8rem;
  font-weight: 700;
  color: var(--color-text);
  text-align: center;
}

.counter-pill {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  background: var(--color-surface);
  padding: 0.5rem 1rem;
  border-radius: var(--border-radius-pill);
  box-shadow: 0 4px 12px var(--color-shadow);
}

.btn-icon {
  background: var(--color-primary-light);
  color: var(--color-primary);
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 1.5rem;
  font-weight: 700;
  cursor: pointer;
}

.count {
  font-size: 2.2rem;
  font-weight: 700;
  color: var(--color-primary);
  min-width: 30px;
  text-align: center;
}

.players-card {
  background: var(--color-surface);
  padding: 1.2rem;
  border-radius: var(--border-radius-lg);
  box-shadow: 0 4px 12px var(--color-shadow);
}

.players-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
}

.input-text {
  width: 100%;
  padding: 0.6rem 1rem;
  border: 2px solid var(--color-bg);
  background: var(--color-bg);
  border-radius: 12px;
  font-size: 1.1rem;
  outline: none;
  transition: border-color 0.2s;
  color: var(--color-text);
  font-weight: 700;
}

.input-text:focus {
  border-color: var(--color-primary);
}

.footer {
  flex: 0 0 auto;
  margin-top: 1rem;
}

.btn-primary {
  background: var(--color-primary);
  color: white;
  border: none;
  width: 100%;
  padding: 1rem;
  border-radius: var(--border-radius-pill);
  font-size: 1.25rem;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  box-shadow: 0 4px 12px var(--color-shadow-strong);
}
</style>
