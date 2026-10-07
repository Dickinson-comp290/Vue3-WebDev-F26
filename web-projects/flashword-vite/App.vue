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
      completed: false,
    };
  },
  watch: {
    correctCount() {
      this.completed = this.correctCount == this.wordCount;
    },
  },
  computed: {
    correctCount() {
      return this.words.filter((word) => word.correct).length;
    },
    shuffleWords() {
      return this.words.sort(() => 0.5 - Math.random());
    },

    wordCount() {
      return this.words.length;
    },
  },
  methods: {
    incrementCorrectCount() {
      this.correctCount++;
    },
  },
};

const app = Vue.createApp(Flashword).mount('#app');
</script>

<template>
  <head>
    <title>FlashWord</title>
    <meta charset="utf-8" />

    <script src="https://unpkg.com/vue@3/dist/vue.global.js" defer></script>
    <script src="app.js" defer></script>
    <link href="styles.css" rel="stylesheet" />
  </head>

  <body>
    <div id="app" v-cloak>
      <h1>FlashWord</h1>

      <p v-if="completed" id="completed">Good work!</p>
      <p v-else id="correctCount">
        You have answered {{ correctCount }} out of {{ wordCount }}
      </p>

      <div id="cards">
        <WordCard
          v-for="word in shuffleWords"
          v-bind:word="word"
          v-on:increment-correct-count="incrementCorrectCount"
        >
        </WordCard>
      </div>
    </div>
  </body>
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
