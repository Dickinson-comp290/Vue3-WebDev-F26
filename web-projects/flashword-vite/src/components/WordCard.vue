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
      this.correct = this.word.word_b === this.answer;

      if (this.correct) {
        this.$emit('incrementCorrectCount');
      }
    },
  },
};
</script>

<template>
  <div class="card" v-bind:class="{ correct: correct }">
    <p class="word">{{ word.word_a }}</p>

    <input
      v-if="!correct"
      type="text"
      v-model="answer"
      v-on:keyup.enter="checkAnswer()"
    />
    <p v-else class="correctAnswer">{{ answer }}</p>
    <label v-if="!correct" class="hintSwitch">
      <input type="checkbox" v-model="showHint" />
      Show hint
    </label>
    <p v-if="showHint && !correct" class="hint">Hint: {{ word.hint }}</p>
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
  border: 0;
  width: 85%;
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
  color: black;
}

.hintSwitch {
  display: block;
  color: black;
  font-size: 16px;
  margin-top: 8px;
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
