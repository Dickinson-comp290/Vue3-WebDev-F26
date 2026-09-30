const Flashword = {
  data() {
    return {
      wordA: 'hola',
      wordB: 'hello',
      answer: '',
      correct: null,
      correctCount: 0,
      answeredCount: 0,
      showFeedback: false,
      hasError: false,
      inputBackgroundColor: 'white',
      submitted: false,

      // Array of objects example
      words: [
        { wordA: 'hola', wordB: 'hello' },
        { wordA: 'adios', wordB: 'goodbye' },
        { wordA: 'uno', wordB: 'one' },
        { wordA: 'dos', wordB: 'two' },
      ],
    };
  },
  watch: {},
  computed: {
    inputClass() {
      return this.submitted && this.answer === '' ? 'isEmpty' : 'isFilled';
    },
    correctPercentage() {
      return this.answeredCount === 0
        ? 0
        : Math.round((this.correctCount / this.answeredCount) * 100);
    },
    hasBadge() {
      return this.answeredCount > 0 && this.correctCount / this.answeredCount >= 0.8;
    },
  },
  methods: {
    checkAnswer() {
      this.submitted = true;
      if (this.answer == '') {
        this.hasError = true;
        this.inputBackgroundColor = 'lightpink';
        return;
      }

      this.hasError = false;
      this.inputBackgroundColor = 'white';

      this.correct = this.wordB == this.answer;
      this.answeredCount += 1;

      if (this.correct) {
        this.correctCount += 1;
      }

      this.showFeedback = true;
    },
    reset() {
      this.answer = '';
      this.showFeedback = false;
      this.correct = null;
      this.correctCount = 0;
      this.answeredCount = 0;
      this.inputBackgroundColor = 'white';
      this.hasError = false;
      this.submitted = false;

      // Reset to a new random word
      const randomIndex = Math.floor(Math.random() * this.words.length);
      this.wordA = this.words[randomIndex].wordA;
      this.wordB = this.words[randomIndex].wordB;
    },
  },
};

// eslint-disable-next-line no-unused-vars, no-undef
const app = Vue.createApp(Flashword).mount('#app');
