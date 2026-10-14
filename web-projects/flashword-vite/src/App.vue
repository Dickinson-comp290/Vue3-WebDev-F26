<script>
import ScoreLine from './components/ScoreLine.vue';
import WordCard from './components/WordCard.vue';
export default {
  components: { ScoreLine, WordCard },
  data() {
    return {
      words: [
        {
          foreign_word: 'hola',
          english_word: 'hello',
          hint: 'greeting',
          //answer: '',
          //correct: false,
          //showHint: false,
        },
        {
          foreign_word: 'uno',
          english_word: 'one',
          hint: 'number',
          //answer: '',
          //correct: false,
          //showHint: false,
        },
        {
          foreign_word: 'gris',
          english_word: 'grey',
          hint: 'color',
          //answer: '',
          //correct: false,
          //showHint: false,
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
  <ScoreLine
    v-bind:correct-count="correctCount"
    v-bind:word-count="wordCount"
    v-bind:completed="completed"
  />

  <div id="cards">
    <WordCard
      v-for="word in shuffledWords"
      v-bind:key="word.foreign_word"
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

.hint {
  font-size: 16px;
  font-style: italic;
  margin: 4px 0 0;
  color: #555;
}
</style>
