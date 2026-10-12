<script>
import WordCard from './components/WordCard.vue';
import ScoreLine from './components/ScoreLine.vue';

export default {
  components: { WordCard, ScoreLine },
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
      this.correctCount += 1;
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
        v-bind:key="word.wordToTranslate"
        v-bind:word="word"
        v-on:incrementCorrectCount="incrementCorrectCount"
      />
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
  grid-template-columns: repeat(3, minmax(220px, 1fr));
  gap: 24px;
  max-width: 900px;
  margin: 30px auto 0;
}

#completed {
  font-size: 1.25rem;
  font-weight: 700;
  color: #065f46;
  padding: 10px;
  margin: 10px;
}
</style>
