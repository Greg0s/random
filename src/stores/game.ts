import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useGameStore = defineStore("game", () => {
  // Game phases: 1 = Setup, 2 = Word Input, 3 = Guessing phase
  const currentPhase = ref<number>(1);

  // Array of player names
  const players = ref<string[]>([]);

  // All words added by all players
  const wordPool = ref<string[]>([]);

  // Tracking progress
  const currentPlayerIndex = ref<number>(0);
  const currentTurnWords = ref<string[]>([]);

  // Computed property to know how many words each player must write
  const wordsPerPlayer = computed(() => {
    return players.value.length;
  });

  // Start Phase 2: Word Input
  function startGame(playerNames: string[]) {
    if (playerNames.length > 0) {
      players.value = playerNames;
      currentPhase.value = 2;
      currentPlayerIndex.value = 0;
      wordPool.value = [];
    }
  }

  // Add words for the current player and move to the next
  function submitPlayerWords(words: string[]) {
    wordPool.value.push(...words);

    if (currentPlayerIndex.value < players.value.length - 1) {
      currentPlayerIndex.value++;
    } else {
      // All players have entered their words, start Phase 3
      startGuessingPhase();
    }
  }

  // Shuffle array using Fisher-Yates algorithm
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

  // Prepare Phase 3
  function startGuessingPhase() {
    currentPhase.value = 3;
    currentPlayerIndex.value = 0;
    wordPool.value = shuffleArray(wordPool.value);

    // Draw words for the first player
    drawWordsForCurrentPlayer();
  }

  // Draw X words from the pool
  function drawWordsForCurrentPlayer() {
    const amountToDraw = wordsPerPlayer.value;
    // Extract words from the pool
    currentTurnWords.value = wordPool.value.splice(0, amountToDraw);
  }

  // Move to the next player in Phase 3
  function nextPlayerTurn() {
    if (currentPlayerIndex.value < players.value.length - 1) {
      currentPlayerIndex.value++;
      drawWordsForCurrentPlayer();
    } else {
      // End of the game, reset to home
      resetGame();
    }
  }

  function resetGame() {
    currentPhase.value = 1;
    players.value = [];
    wordPool.value = [];
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
    startGame,
    submitPlayerWords,
    nextPlayerTurn,
    resetGame,
  };
});
