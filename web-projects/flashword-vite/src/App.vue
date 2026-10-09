<script>
import WordCard from './components/WordCard.vue';
export default {
  components: { WordCard },
  data() {
    return {
      words: [
        {
          spWord: 'hola',
          word_b: 'hello',
          hint: 'greeting',
        },
        {
          spWord: 'uno',
          word_b: 'one',
          hint: 'number',
        },
        {
          spWord: 'gris',
          word_b: 'grey',
          hint: 'color',
        },
      ],
      correctCount: 0,
      completed: false,
    };
  },
  computed: {
    shuffledWords() {
      return [...this.words].sort(() => 0 - Math.random());
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

  <p v-if="completed" id="completed">Good work, you completed all the words!</p>
  <p v-else id="correctCount">
    You have answered {{ correctCount }} out of {{ wordCount }}
  </p>

  <div id="cards">
    <WordCard
      v-for="word in shuffledWords"
      v-bind:key="word.spWord"
      v-bind:word="word"
      v-on:incrementCorrectCount="incrementCorrectCount"
    ></WordCard>
  </div>
</template>

<style scoped>
[v-cloak] {
  display: none;
}

#app {
  /* cspell:disable-next-line */
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
