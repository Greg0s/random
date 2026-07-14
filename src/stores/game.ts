import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useGameStore = defineStore("game", () => {
  const currentPhase = ref<number>(1);
  const players = ref<string[]>([]);
  const wordPool = ref<string[]>([]);

  const currentPlayerIndex = ref<number>(0);
  const currentTurnWords = ref<string[]>([]);

  // NEW: Store the randomized order of players for phase 3
  const guessingOrder = ref<string[]>([]);

  const wordsPerPlayer = computed(() => {
    return players.value.length;
  });

  // NEW: computed to get the current player specifically for phase 3
  const currentGuessingPlayer = computed(() => {
    return guessingOrder.value[currentPlayerIndex.value];
  });

  function startGame(playerNames: string[]) {
    if (playerNames.length > 0) {
      players.value = playerNames;
      currentPhase.value = 2;
      currentPlayerIndex.value = 0;
      wordPool.value = [];
    }
  }

  function submitPlayerWords(words: string[]) {
    wordPool.value.push(...words);

    if (currentPlayerIndex.value < players.value.length - 1) {
      currentPlayerIndex.value++;
    } else {
      startGuessingPhase();
    }
  }

  function shuffleArray(array: string[]): string[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = shuffled[i];
      shuffled[i] = shuffled[j];
      shuffled[j] = temp;
    }
    return shuffled;
  }

  function startGuessingPhase() {
    currentPhase.value = 3;
    currentPlayerIndex.value = 0;
    // Shuffle words globally
    wordPool.value = shuffleArray(wordPool.value);
    // Create a random order for players to guess
    guessingOrder.value = shuffleArray(players.value);

    drawWordsForCurrentPlayer();
  }

  function drawWordsForCurrentPlayer() {
    const amountToDraw = wordsPerPlayer.value;
    currentTurnWords.value = wordPool.value.splice(0, amountToDraw);
  }

  function nextPlayerTurn() {
    if (currentPlayerIndex.value < players.value.length - 1) {
      currentPlayerIndex.value++;
      drawWordsForCurrentPlayer();
    } else {
      resetGame();
    }
  }

  function resetGame() {
    currentPhase.value = 1;
    players.value = [];
    wordPool.value = [];
    guessingOrder.value = [];
    currentPlayerIndex.value = 0;
    currentTurnWords.value = [];
  }

  return {
    currentPhase,
    players,
    wordPool,
    currentPlayerIndex,
    currentTurnWords,
    wordsPerPlayer,
    currentGuessingPlayer,
    startGame,
    submitPlayerWords,
    nextPlayerTurn,
    resetGame,
  };
});
