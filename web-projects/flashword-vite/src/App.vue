<script>
import WordCard from './components/WordCard.vue';

export default {
  components: {
    WordCard,
  },
  data() {
    return {
      words: [],
      correctCount: 0,
      completed: false,
      loadingWords: true,
      wordsError: false,
    };
  },
  async mounted() {
    try {
      const response = await fetch('http://localhost:8100/words');

      if (!response.ok) {
        throw new Error(`Failed to fetch words: HTTP ${response.status}`);
      }

      this.words = await response.json();
    } catch (error) {
      console.error('Unable to fetch words:', error);
      this.wordsError = true;
    } finally {
      this.loadingWords = false;
    }
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
  },
};
</script>

<template>
  <div id="app" v-cloak>
    <h1 data-cy="app-header">FlashWord</h1>

    <p v-if="wordsError" role="alert" data-cy="words-error">
      Something went wrong. Please try again later.
    </p>

    <template v-else-if="!loadingWords">
      <p v-if="completed" id="completed">
        Great work, you have completed all the words!
      </p>
      <p v-else id="correctCount" data-cy="answer-count">
        You have answered {{ correctCount }} out of {{ wordCount }}
      </p>

      <div id="cards">
        <WordCard
          v-for="word in shuffledWords"
          v-bind:key="word.word_a"
          v-bind:word="word"
          v-bind:data-cy="word.word_a + '-card'"
          v-on:incrementCorrectCount="incrementCorrectCount"
        >
        </WordCard>
      </div>
    </template>
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
</style>
