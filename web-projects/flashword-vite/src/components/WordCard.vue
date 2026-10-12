<script>
export default {
  name: 'WordCard',
  props: {
    word: {
      type: Object,
      required: true,
    },
  },
  emits: ['incrementCorrectCount'],
  data() {
    return {
      correct: false,
      answer: '',
      showHint: false,
    };
  },
  methods: {
    checkAnswer() {
      if (this.correct) return;

      this.correct = this.word.translation == this.answer;

      if (this.correct) {
        this.$emit('incrementCorrectCount');
      }
    },
  },
};
</script>

<template>
  <div class="card" v-bind:class="{ correct: correct }">
    <p class="word">{{ word.wordToTranslate }}</p>

    <template v-if="correct">
      <p class="correctAnswer">{{ answer }}</p>
    </template>

    <template v-else>
      <input
        type="text"
        v-model="answer"
        v-on:keyup.enter="checkAnswer()"
        placeholder="Type answer"
      />
      <label class="hintToggle">
        <input type="checkbox" v-model="showHint" />
        Show hint
      </label>
      <small v-if="showHint" class="hint">{{ word.hint }}</small>
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
  margin-top: 8px;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  opacity: 0.7;
}

.hintToggle {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.85rem;
}

.correctAnswer {
  margin: 12px 0 0;
  font-size: 1.4rem;
  font-weight: 700;
}
</style>
