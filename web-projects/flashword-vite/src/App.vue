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
    handleAnswerSubmitted() {
      this.correctCount += 1;
    },
  },
};
</script>

<template>
  <div id="app" v-cloak>
    <h1>FlashWord</h1>

    <p v-if="completed" id="completed">
      Great work, you have completed all the words!
    </p>
    <p v-else id="correctCount">
      You have answered {{ correctCount }} out of {{ wordCount }}
    </p>

    <div id="cards">
      <WordCard
        v-for="word in shuffledWords"
        v-bind:key="word.word_a"
        v-bind:word="word"
        v-on:answer-submitted="handleAnswerSubmitted"
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

#correctCount {
  font-size: 1.1rem;
  margin: 10px;
  font-weight: 700;
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
