<script>
import WordCard from './components/WordCard.vue';
import ScoreLine from './components/ScoreLine.vue';

export default {
  components: { WordCard, ScoreLine },
  data() {
    return {
      words: [
        {
          word_change: 'hola',
          word_fixed: 'hello',
          hint: 'greeting',
          answer: '',
          correct: false,
        },
        {
          word_change: 'uno',
          word_fixed: 'one',
          hint: 'number',
          answer: '',
          correct: false,
        },
        {
          word_change: 'gris',
          word_fixed: 'grey',
          hint: 'color',
          answer: '',
          correct: false,
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
  <div id="app" v-cloak>
    <h1>Flashword</h1>

    <p v-if="completed" id="completed">
      Great work, you have completed all the words!
    </p>
    <ScoreLine
      v-else
      v-bind:correct-count="correctCount"
      v-bind:word-count="wordCount"
    />
    <div id="cards">
      <WordCard
        v-for="word in shuffledWords"
        v-bind:key="word.word_change"
        v-bind:word="word"
        v-on:incrementCorrectCount="incrementCorrectCount"
      ></WordCard>
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

#completed {
  font-size: 20px;
  font-weight: bold;
  color: #0f5132;
  padding: 10px;
  margin: 10px;
}
</style>
