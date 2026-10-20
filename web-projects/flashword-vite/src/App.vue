<script>
import WordCard from './components/WordCard.vue';

export default {
  components: {
    WordCard,
  },
  data() {
    return {
      words: [
        {
          word_a: 'hola',
          word_b: 'hello',
          hint: 'greeting',
          answer: '',
          correct: false,
        },
        {
          word_a: 'uno',
          word_b: 'one',
          hint: 'number',
          answer: '',
          correct: false,
        },
        {
          word_a: 'gris',
          word_b: 'grey',
          hint: 'color',
          answer: '',
          correct: false,
        },
      ],
      correctCount: 0,
      completed: false,
      resetCount: 0,
    };
  },
  computed: {
    shuffledWords() {
      return [...this.words].sort(() => 0.5 - Math.random());
    },
    wordCount() {
      return this.words.length;
    },
  },
  watch: {
    correctCount() {
      this.completed = this.correctCount == this.wordCount;
    },
  },
  methods: {
    incrementCorrectCount() {
      this.correctCount++;
    },
    resetGame() {
      this.correctCount = 0;
      this.completed = false;
      this.resetCount++;
    },
  },
};
</script>

<template>
  <div id="app" v-cloak>
    <h1 data-cy="app-header">FlashWord</h1>

    <p v-if="completed" id="completed">
      Great work, you have completed all the words!
    </p>
    <p data-cy="scoreLineText" v-else id="correctCount">
      You have answered
      <span data-cy="correctCount">{{ correctCount }}</span> out of
      <span data-cy="wordCount">{{ wordCount }}</span>
    </p>

    <button data-cy="reset-game" v-on:click="resetGame">Reset Game</button>

    <div id="cards">
      <WordCard
        v-for="word in shuffledWords"
        v-bind:key="`${resetCount}-${word.word_a}`"
        v-bind:word="word"
        v-on:incrementCorrectCount="incrementCorrectCount"
        v-bind:data-cy="word.word_a + '-card'"
      >
      </WordCard>
    </div>
  </div>
</template>

<style scoped>
[v-cloak] {
  display: none;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
  margin-top: 60px;
}

#cards {
  justify-content: center;
  display: grid;
  grid-template-columns: 300px 300px 300px;
  grid-gap: 30px;
}

#correctCount {
  font-size: 20px;
  margin: 10px;
  font-weight: bold;
  padding: 10px;
}

#completed {
  font-size: 20px;
  font-weight: bold;
  color: #0f5132;
  padding: 10px;
  margin: 10px;
}

button {
  margin-bottom: 20px;
  padding: 8px 16px;
  font-size: 16px;
  cursor: pointer;
}
</style>
