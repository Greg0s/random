import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useCounterStore = defineStore("counter", () => {
  // State
  const count = ref<number>(0);

  // Getter
  const doubleCount = computed<number>(() => count.value * 2);

  // Action
  function increment(): void {
    count.value++;
  }

  function decrement(): void {
    if (count.value === 0) {
      return;
    }
    count.value--;
  }

  return {
    count,
    doubleCount,
    increment,
    decrement,
  };
});
