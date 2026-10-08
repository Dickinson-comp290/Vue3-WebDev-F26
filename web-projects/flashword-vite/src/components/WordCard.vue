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
      userAnswer: '',
      isCorrect: false,
      showHint: false,
    };
  },
  methods: {
    checkAnswer() {
      this.isCorrect = this.word.word_b == this.userAnswer;
      if (this.isCorrect) {
        this.$emit('incrementCorrectCount');
      }
    },
  },
};
</script>

<template>
  <div class="card" v-bind:class="{ correct: isCorrect }">
    <p class="word">{{ word.wordToTranslate }}</p>
    <input
      type="text"
      v-if="!isCorrect"
      v-model="userAnswer"
      v-on:keyup.enter="checkAnswer()"
    />
    <label v-if="!isCorrect" class="hintToggle">
      <input type="checkbox" v-model="showHint" />
      Show hint
    </label>
    <p v-if="showHint && !isCorrect" class="hint">{{ word.hint }}</p>
    <p v-if="isCorrect" class="correctAnswer">{{ userAnswer }}</p>
  </div>
</template>

<style scoped>
.card {
  background-color: #e8f0ff;
  border-radius: 5px;
  padding: 10px 0;
  font-size: 25px;
}

input[type='text'] {
  border: 1px solid #64748b;
  font-size: 25px;
  border-radius: 5px;
  margin-top: 5px;
  text-align: center;
  padding: 5px;
  background-color: #fff;
  color: #111827;
}

.hintToggle {
  display: block;
  font-size: 16px;
  margin-top: 5px;
  cursor: pointer;
}

.word {
  font-weight: bold;
  padding: 0;
  margin: 0;
}

.correctAnswer {
  padding: 0;
  margin: 0;
}

.hint {
  margin: 5px 0 0;
  font-size: 18px;
  font-style: italic;
  color: #555;
}

.correct {
  color: #0f5132;
  background-color: #d1e7dd;
}
</style>
