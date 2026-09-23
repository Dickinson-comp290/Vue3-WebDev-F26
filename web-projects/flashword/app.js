const Flashword = {
  data() {
    return {
      wordA: '',
      wordB: '',
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
  created() {
    this.words = this.words.sort(() => Math.random() - 0.5);
    this.wordA = this.words[0].wordA;
    this.wordB = this.words[0].wordB;
  },
  methods: {
    checkAnswer() {
      this.correct = this.wordB == this.answer;
      this.showFeedback = true;
    },
    reset() {
      this.answer = '';
      this.showFeedback = false;
      this.correct = null;
    },
    newWord() {
      this.reset();
      this.words = this.words.sort(() => Math.random() - 0.5);
      this.wordA = this.words[0].wordA;
      this.wordB = this.words[0].wordB;
    },
  },
};

// eslint-disable-next-line no-unused-vars, no-undef
const app = Vue.createApp(Flashword).mount('#app');
