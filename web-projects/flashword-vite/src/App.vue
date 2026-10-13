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
          wordToTranslate: 'hola',
          translation: 'hello',
          hint: 'greeting',
        },
        {
          wordToTranslate: 'uno',
          translation: 'one',
          hint: 'number',
        },
        {
          wordToTranslate: 'gris',
          translation: 'grey',
          hint: 'color',
        },
      ],
      correctCount: 0,
      completed: false,
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
      this.completed = this.correctCount >= this.wordCount;
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
    <h1>FlashWord</h1>

    <ScoreLine
      v-bind:correct-count="correctCount"
      v-bind:word-count="wordCount"
    />

    <p v-if="completed" id="completed">
      Great work, you have completed all the words!
    </p>

    <div id="cards">
      <WordCard
        v-for="word in shuffledWords"
        v-bind:key="word.word_a"
        v-bind:word="word"
        v-on:incrementCorrectCount="incrementCorrectCount"
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
  color: #111827;
  margin-top: 60px;
}

#cards {
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
  font-size: 1.25rem;
  font-weight: 700;
  color: #065f46;
  padding: 10px;
  margin: 10px;
}
</style>
