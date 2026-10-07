<script>
import WordCard from './components/WordCard.vue';
export default {
  components: { WordCard },
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
      correctCount: 0,
      completed: false,
    };
  },
  computed: {
    shuffledWords() {
      const words = [...this.words];

      for (let i = words.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [words[i], words[j]] = [words[j], words[i]];
      }

      return words;
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
  },
};
</script>

<template>
  <h1>FlashWord</h1>
  <p v-if="completed" id="completed">
    Great work, you completed all the words!
  </p>
  <p v-else id="correctCount">
    You have answered {{ correctCount }} out of {{ wordCount }}
  </p>

  <div id="cards">
    <WordCard
      v-for="word in shuffledWords"
      v-bind:key="word.word_a"
      v-bind:word="word"
      v-on:incrementCorrectCount="correctCount++"
    ></WordCard>
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

.hint {
  font-size: 16px;
  font-style: italic;
  margin: 4px 0 0;
  color: #555;
}
</style>
