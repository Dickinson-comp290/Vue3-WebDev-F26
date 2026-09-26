const Flashword = {
  data() {
    return {
      wordA: 'hola',
      wordB: 'hello',
      answer: '',
      correct: null,
      showFeedback: false,
      hasError: false,
      totalAnswers: 0,
      correctAnswers: 0,
      hasEarnedBadge: false,

      // Array of objects example
      words: [
        { wordA: 'hola', wordB: 'hello' },
        { wordA: 'adios', wordB: 'goodbye' },
        { wordA: 'uno', wordB: 'one' },
        { wordA: 'dos', wordB: 'two' },
      ],
    };
  },
  watch: {
    answer() {
      this.hasError = false;
    },
  },
  computed: {
    inputClass() {
      return this.hasError ? 'input-error' : 'input-normal';
    },
  },

  methods: {
    checkAnswer() {
      if (this.answer == '') {
        this.hasError = true;
        return;
      }
      if (this.showFeedback) {
        return;
      }

      this.hasError = false;
      this.correct = this.wordB == this.answer;
      this.totalAnswers++;
      if (this.correct) {
        this.correctAnswers++;
      }
      if (this.correctAnswers / this.totalAnswers >= 0.8) {
        this.hasEarnedBadge = true;
      }
      this.showFeedback = true;
    },
    reset() {
      this.answer = '';
      this.showFeedback = false;
      this.correct = null;
      this.hasError = false;

      // Reset to a new random word
      const randomIndex = Math.floor(Math.random() * this.words.length);
      this.wordA = this.words[randomIndex].wordA;
      this.wordB = this.words[randomIndex].wordB;
    },
  },
};

// eslint-disable-next-line no-unused-vars, no-undef
const app = Vue.createApp(Flashword).mount('#app');
