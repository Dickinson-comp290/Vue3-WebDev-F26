<script>
export default {
  name: 'WordCard',
  props: ['word'],
  methods: {
    checkAnswer() {
      this.word.correct = this.word.word_b == this.word.answer;

      if (this.correctCount == this.wordCount) {
        // this.correctCount++;
        this.$emit('increment-correct-count');
      }
    },
  },
};
</script>

<template>
  <div class="card" v-bind:class="{ correct: word.correct }">
    <p class="word">{{ word.word_a }}</p>

    <input
      v-if="!word.correct"
      type="text"
      v-model="word.answer"
      v-on:keyup.enter="checkAnswer()"
    />

    <div v-if="!word.correct" class="hintBox">
      <label> <input type="checkbox" v-model="word.showHint" /> Hint </label>
      <span v-if="word.showHint" class="hint">{{ word.hint }}</span>
    </div>

    <p v-else class="correctAnswer">{{ word.answer }}</p>
  </div>
</template>

<style scoped>
#cards {
  justify-content: center;
  display: grid;
  grid-template-columns: 300px 300px 300px;
  grid-gap: 30px;
}

.card {
  background-color: #e8f0ff;
  border-radius: 5px;
  padding: 10px 0;
  font-size: 25px;
}

input[type='text'] {
  border: 0;
  font-size: 25px;
  border-radius: 5px;
  margin-top: 5px;
  text-align: center;
  padding: 5px;
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

.correct {
  color: #0f5132;
  background-color: #d1e7dd;
}
</style>
