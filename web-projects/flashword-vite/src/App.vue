<script>
export default {
  data() {
    return {
      words: [
        {
          word_a: 'hola',
          word_b: 'hello',
          hint: 'greeting',
          answer: '',
          correct: false,
          showHint: false,
        },
        {
          word_a: 'uno',
          word_b: 'one',
          hint: 'number',
          answer: '',
          correct: false,
          showHint: false,
        },
        {
          word_a: 'gris',
          word_b: 'grey',
          hint: 'color',
          answer: '',
          correct: false,
          showHint: false,
        },
      ],
    };
  },
  computed: {
    shuffledWords() {
      return [...this.words].sort(() => 0 - Math.random());
    },
    wordCount() {
      return this.words.length;
    },
    correctCount() {
      return this.words.filter((word) => word.correct).length;
    },
    completed() {
      return this.correctCount === this.wordCount;
    },
  },
  watch: {},
  methods: {
    checkAnswer(word) {
      word.correct = word.word_b == word.answer;
    },
  },
};
</script>

<template>
  <h1>FlashWord</h1>

  <p v-if="completed" id="completed">Good work, you completed all the words!</p>
  <p v-else id="correctCount">
    You have answered {{ correctCount }} out of {{ wordCount }}
  </p>

  <div id="cards">
    <div
      class="card"
      v-for="word in shuffledWords"
      v-bind:class="{ correct: word.correct }"
    >
      <p class="word">{{ word.word_a }}</p>

      <input
        v-if="!word.correct"
        type="text"
        v-model="word.answer"
        v-on:keyup.enter="checkAnswer(word)"
      />

      <p v-else class="correctAnswer">{{ word.answer }}</p>

      <input
        type="checkbox"
        v-on:change="
          {
            word.showHint = !word.showHint;
          }
        "
        v-show="!word.correct || word.showHint"
      />
      <p v-if="word.showHint">{{ word.hint }}</p>
    </div>
  </div>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
