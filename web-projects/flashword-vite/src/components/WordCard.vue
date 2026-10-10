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
      // When referencing props, prefix with the `this` keyword
      this.correct = this.word.word_b == this.answer;
      if (this.correct) {
        // Emit the custom event `incrementCorrectCount` to the parent component that is utilizing this component
        this.$emit('incrementCorrectCount');
        this.showHint = false;
      }
    },
  },
};
</script>

<template>
  <div class="card" v-bind:class="{ correct: correct }">
    <p class="word">{{ word.word_change }}</p>

    <input
      v-if="!correct"
      type="text"
      v-model="answer"
      v-on:keyup.enter="checkAnswer()"
    />
    <input type="checkbox" id="showHint" v-model="showHint" />
    <p v-if="showHint">{{ word.hint }}</p>

    <p v-else class="correctAnswer">{{ word.answer }}</p>
  </div>
</template>

<style scoped>
/* The scoped attribute means that these styles will only apply to elements in this component */

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
