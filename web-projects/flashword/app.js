// Define the options of our application
const FlashWord = {
  data() {
    return {
      wordA: 'hola',
      wordB: 'hello',
      answer: '',
      correct: null,
      showFeedback: false,

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
    this.reset();
  },

  methods: {
    checkAnswer() {
      this.correct = this.answer == this.wordB;
      this.showFeedback = true;
    },
    reset() {
      const randomWord =
        this.words[Math.floor(Math.random() * this.words.length)];
      this.wordA = randomWord.wordA;
      this.wordB = randomWord.wordB;
      this.answer = '';
      this.correct = null;
      this.showFeedback = false;
      this.spanishWords = ['hola', 'adios', 'uno', 'dos'];
      this.word = { a: 'hola', b: 'hello' };
      this.words = [
        { wordA: 'hola', wordB: 'hello' },
        { wordA: 'adios', wordB: 'goodbye' },
        { wordA: 'uno', wordB: 'one' },
        { wordA: 'dos', wordB: 'two' },
      ];
    },
  },
};
// Create a new Vue instance using our options
const app = Vue.createApp(FlashWord).mount('#app');
