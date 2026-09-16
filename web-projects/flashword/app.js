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

  methods: {
    checkAnswer() {
      this.correct = this.wordB == this.answer;
      this.showFeedback = true;
    },

    resetAnswer() {
      this.answer = '';
      this.showFeedback = false;
    },
  },
};

// eslint-disable-next-line no-unused-vars, no-undef
const app = Vue.createApp(FlashWord).mount('#app');
