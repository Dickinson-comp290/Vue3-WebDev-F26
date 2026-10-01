<script>
export default {
  name: 'WordCard',
  props: {
    word: {
      type: Object,
      required: true,
    },
  },
  emits: ['answer-submitted'],
  data() {
    return {
      localWord: { ...this.word },
    };
  },
  watch: {
    word: {
      immediate: true,
      handler(newWord) {
        this.localWord = { ...newWord };
      },
    },
  },
  methods: {
    checkAnswer() {
      if (this.localWord.correct) return;

      const trimmedAnswer = this.localWord.answer.trim().toLowerCase();
      this.localWord.correct =
        trimmedAnswer === this.localWord.word_b.toLowerCase();

      if (this.localWord.correct) {
        this.$emit('answer-submitted', true);
      }
    },
  },
};
</script>

<template>
  <div class="card" v-bind:class="{ correct: localWord.correct }">
    <p class="word">{{ localWord.word_a }}</p>

    <template v-if="localWord.correct">
      <p class="correctAnswer">{{ localWord.answer }}</p>
    </template>

    <template v-else>
      <input
        v-model="localWord.answer"
        type="text"
        v-on:keyup.enter="checkAnswer()"
        placeholder="Type answer"
      />
      <small class="hint">{{ localWord.hint }}</small>
    </template>
  </div>
</template>

<style scoped>
.card {
  background: #f3f7ff;
  border-radius: 12px;
  padding: 20px 16px;
  box-shadow: 0 8px 18px rgba(15, 23, 42, 0.08);
  transition: all 0.2s ease;
}

.card.correct {
  background: #d1fae5;
  color: #065f46;
}

.word {
  font-weight: 700;
  font-size: 2rem;
  margin: 0 0 16px;
}

input[type='text'] {
  width: 100%;
  box-sizing: border-box;
  border: 0;
  border-radius: 8px;
  font-size: 1.25rem;
  text-align: center;
  padding: 10px 12px;
  margin: 0 0 8px;
}

.hint {
  display: block;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  opacity: 0.7;
}

.correctAnswer {
  margin: 12px 0 0;
  font-size: 1.4rem;
  font-weight: 700;
}
</style>
