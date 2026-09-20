const FlashWord = {
  data() {
    return {
      wordA: 'hola',
      wordB: 'hello',
      answer: '',
      correct: null,
      showFeedback: false,

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
  methods: {
    getRandomWord() {
      const randomIndex = Math.floor(Math.random() * this.words.length);
      const randomWord = this.words[randomIndex];
      this.wordA = randomWord.wordA;
      this.wordB = randomWord.wordB;
      this.reset();
    },
    checkAnswer() {
      // Note how data properties are accessed via `this`
      this.correct = this.answer == this.wordB;
      this.showFeedback = true;
    },
    reset() {
      this.answer = '';
      this.correct = null;
      this.showFeedback = false;
    },
  },
};

// eslint-disable-next-line no-unused-vars, no-undef
const app = Vue.createApp(FlashWord).mount('#app');
