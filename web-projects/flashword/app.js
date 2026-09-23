const Flashword = {
  data() {
    return {
      wordA: 'hola',
      wordB: 'hello',
      answer: '',
      correct: null,
      showFeedback: false,
      image: null,
      hasError: false,
      showHint: false,
      categories: ['greetings', 'colors', 'verbs'],
      level: 'easy',
      sentence: '',

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
    checkAnswer() {
      if (this.answer == '') {
        this.hasError = true;
        return;
      }

      this.hasError = false;

      this.hasError = !this.answer.trim();
      if (this.hasError) return;

      this.correct = this.wordB == this.answer;

      if (this.correct) {
        this.image = 'correct';
      } else {
        this.image = 'incorrect';
      }
      this.showFeedback = true;
    },
    reset() {
      this.answer = '';
      this.showFeedback = false;
    },
  },
};

// eslint-disable-next-line no-unused-vars, no-undef
const app = Vue.createApp(Flashword).mount('#app');
