<script setup lang="ts">
import { useGameStore } from "../stores/game";

const store = useGameStore();
</script>

<template>
  <div class="guessing-screen">
    <div class="header">
      <h2>
        <span>{{ store.currentGuessingPlayer }}</span
        >, fait ton classement !
      </h2>
      <p class="subtitle">
        Classe ces mots dans ta tête, les autres doivent deviner l'ordre.
      </p>
    </div>

    <div class="card">
      <ul class="words-list">
        <!-- We display the words drawn for this round -->
        <li
          v-for="(word, index) in store.currentTurnWords"
          :key="index"
          class="word-item"
        >
          <div class="word-number">{{ index + 1 }}</div>
          <span class="word-text">{{ word }}</span>
        </li>
      </ul>
    </div>

    <button @click="store.nextPlayerTurn" class="btn-primary">
      Joueur suivant
      <span class="icon-arrow">→</span>
    </button>
  </div>
</template>

<style scoped>
.guessing-screen {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  width: 100%;
}

.header {
  text-align: center;
}

h2 {
  font-size: 2rem;
  color: var(--color-text);
  line-height: 1.2;
}

h2 span {
  color: var(--color-primary);
  /* display: block; */
  /* font-size: 2.5rem; */
  font-weight: 700;
  margin-top: 0.5rem;
}

.subtitle {
  margin-top: 1rem;
  font-size: 1.1rem;
  font-weight: 600;
  opacity: 0.8;
}

.card {
  background: var(--color-surface);
  border-radius: var(--border-radius-lg);
  padding: 1.5rem;
  width: 100%;
  box-shadow: 0 4px 12px var(--color-shadow);
}

.words-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.word-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: var(--color-bg);
  padding: 1rem;
  border-radius: 12px;
  font-weight: 700;
  font-size: 1.2rem;
}

.word-number {
  background: var(--color-primary);
  color: white;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  font-size: 1rem;
}

.word-text {
  color: var(--color-text);
  text-transform: capitalize;
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
  box-shadow: 0 4px 12px var(--color-shadow-strong);
  margin-top: 1rem;
}
</style>
