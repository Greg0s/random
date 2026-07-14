<script setup lang="ts">
import { ref, computed } from "vue";
import { useGameStore } from "../stores/game";

const store = useGameStore();

// État local pour le joueur en cours
const currentWord = ref("");
const playerWords = ref<string[]>([]);

const currentPlayerName = computed(
  () => store.players[store.currentPlayerIndex],
);
const wordsPerPlayer = computed(() => store.wordsPerPlayer);
const wordsRemaining = computed(
  () => wordsPerPlayer.value - playerWords.value.length,
);
const isTurnComplete = computed(
  () => playerWords.value.length === wordsPerPlayer.value,
);

function addWord() {
  const word = currentWord.value.trim();
  if (word && !isTurnComplete.value) {
    // Vérification optionnelle : éviter les doublons pour un même joueur
    if (
      playerWords.value.map((w) => w.toLowerCase()).includes(word.toLowerCase())
    ) {
      alert("Tu as déjà ajouté ce mot !");
      return;
    }

    playerWords.value.push(word);
    currentWord.value = ""; // On vide l'input
  }
}

function removeWord(index: number) {
  playerWords.value.splice(index, 1);
}

function finishTurn() {
  if (isTurnComplete.value) {
    // On envoie les mots au store (qui passera au joueur suivant ou à la phase 3)
    store.submitPlayerWords(playerWords.value);
    // On réinitialise l'état local pour le prochain joueur
    playerWords.value = [];
    currentWord.value = "";
  }
}
</script>

<template>
  <div class="word-input-screen">
    <h2 class="turn-title">
      Au tour de <span>{{ currentPlayerName }}</span>
    </h2>

    <div class="card">
      <div class="status">
        <p>
          Mots ajoutés :
          <strong>{{ playerWords.length }} / {{ wordsPerPlayer }}</strong>
        </p>
      </div>

      <div class="input-group" v-if="!isTurnComplete">
        <input
          v-model="currentWord"
          @keyup.enter="addWord"
          type="text"
          placeholder="Écris un mot..."
          class="input-text"
        />
        <button @click="addWord" class="btn-add">+</button>
      </div>
      <div v-else class="success-message">
        <p>🎉 Quota atteint !</p>
      </div>

      <ul class="words-list" v-if="playerWords.length > 0">
        <li v-for="(word, index) in playerWords" :key="index" class="word-item">
          <span>{{ word }}</span>
          <button @click="removeWord(index)" class="btn-delete">×</button>
        </li>
      </ul>
    </div>

    <!-- Ce bouton n'apparaît / n'est cliquable que si le joueur a mis tous ses mots -->
    <button
      @click="finishTurn"
      class="btn-primary"
      :disabled="!isTurnComplete"
      :class="{ 'btn-disabled': !isTurnComplete }"
    >
      Passer au suivant
      <span class="icon-arrow">→</span>
    </button>
  </div>
</template>

<style scoped>
.word-input-screen {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
  width: 100%;
}

.turn-title {
  font-size: 2rem;
  color: var(--color-text);
  text-align: center;
}

.turn-title span {
  color: var(--color-primary);
}

.card {
  background: var(--color-surface);
  border-radius: var(--border-radius-lg);
  padding: 1.5rem;
  width: 100%;
  box-shadow: 0 4px 12px rgba(255, 138, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.status {
  text-align: center;
  font-size: 1.1rem;
  color: var(--color-primary);
}

.input-group {
  display: flex;
  gap: 0.5rem;
}

.input-text {
  flex: 1;
  padding: 0.75rem 1rem;
  border: 2px solid var(--color-bg);
  border-radius: 12px;
  font-size: 1rem;
  outline: none;
  font-weight: 600;
  color: var(--color-text);
}

.input-text:focus {
  border-color: var(--color-primary);
}

.btn-add {
  background: var(--color-primary);
  color: white;
  border: none;
  width: 48px;
  border-radius: 12px;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
}

.success-message {
  text-align: center;
  color: #8cc269; /* Vert rappelant le logo */
  font-weight: bold;
  font-size: 1.2rem;
  padding: 0.5rem 0;
}

.words-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.word-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--color-bg);
  padding: 0.75rem 1rem;
  border-radius: 12px;
  font-weight: 600;
}

.btn-delete {
  background: none;
  border: none;
  color: #ff4b4b;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  line-height: 1;
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
  transition: opacity 0.3s;
}

.btn-disabled {
  opacity: 0.5;
  cursor: not-allowed;
  box-shadow: none;
}
</style>
