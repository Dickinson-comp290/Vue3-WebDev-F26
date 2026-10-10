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
          translatedWord: 'hello',
          hint: 'greeting',
        },
        {
          wordToTranslate: 'uno',
          translatedWord: 'one',
          hint: 'number',
        },
        {
          wordToTranslate: 'gris',
          translatedWord: 'grey',
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

  <ScoreLine
    v-bind:correct-count="correctCount"
    v-bind:word-count="wordCount"
    v-bind:completed="completed"
  />

  <div id="cards">
    <WordCard
      v-for="word in words"
      v-bind:key="word.wordToTranslate"
      v-bind:word="word"
      v-on:incrementCorrectCount="incrementCorrectCount"
    ></WordCard>
  </div>
</template>

<style>
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

.correct {
  color: #0f5132;
  background-color: #d1e7dd;
}
</style>
