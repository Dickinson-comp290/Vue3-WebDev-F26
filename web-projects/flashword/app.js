// Define the options of our application
const FlashWord = {
  data() {
    return {
      // [...existing data properties...]
      wordA: '',
      wordB: '',
      answer: '',
      showFeedback: false,
      correct: false,
      // Array example
      spanishWords: ['hola', 'adios', 'uno', 'dos'],

      // Object example
      word: { a: 'hola', b: 'hello' },

      // Array of objects example
      words: [
        { wordA: 'hola', wordB: 'hello' },
        { wordA: 'adios', wordB: 'goodbye' },
        { wordA: 'uno', wordB: 'one' },
        { wordA: 'dos', wordB: 'two' },
      ],
    };
  },
  created() {
    this.chooseWord();
  },
  methods: {
    chooseWord() {
      const wordIndex = Math.floor(Math.random() * this.words.length);
      this.wordA = this.words[wordIndex].wordA;
      this.wordB = this.words[wordIndex].wordB;
    },
    checkAnswer() {
      this.correct = this.wordB == this.answer;
      this.showFeedback = true;
    },
    reset() {
      this.chooseWord();
      this.answer = '';
      this.showFeedback = false;
      this.correct = false;
    },
  },
};

// Create a new Vue instance using our options
// eslint-disable-next-line no-unused-vars, no-undef
const app = Vue.createApp(FlashWord).mount('#app');
