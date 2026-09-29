const Flashword = {
  data() {
    return {
      wordA: 'hola',
      wordB: 'hello',
      answer: '',
      correct: null,
      showFeedback: false,
      hasError: false,
      correctAnswers: 0,
      badgeThreshold: 5,
      totalAnswers: 0,
      badgeThresholdPercent: 80,
      minimumAnswersForBadge: 5,
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
    correctPercentage() {
      return this.totalAnswers === 0
        ? 0
        : Math.round((this.correctAnswers / this.totalAnswers) * 100);
    },
  },
  methods: {
    checkAnswer() {
      if (this.answer == '') {
        this.hasError = true;
        return;
      }

      this.hasError = false;

      this.correct = this.wordB == this.answer;

      this.totalAnswers += 1;
      if (this.correct) {
        this.correctAnswers += 1;
      }

      this.showFeedback = true;
    },
    reset() {
      this.answer = '';
      this.showFeedback = false;
      this.correct = null;
      this.hasError = false;
      this.countedThisQuestion = false;

      // Reset to a new random word
      const randomIndex = Math.floor(Math.random() * this.words.length);
      this.wordA = this.words[randomIndex].wordA;
      this.wordB = this.words[randomIndex].wordB;
    },
  },
};

// eslint-disable-next-line no-unused-vars, no-undef
const app = Vue.createApp(Flashword).mount('#app');
