const Flashword = {
  data() {
    return {
      wordA: 'hola',
      wordB: 'hello',
      answer: '',
      correct: null,
      showFeedback: false,
      hasError: false,
      answeredCount: 0,
      correctCount: 0,
      roundCounted: false,

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
    answer(newValue) {
      if (newValue.trim() !== '') {
        this.hasError = false;
      }
    },
  },
  computed: {
    boxColor() {
      if (this.hasError) {
        return 'incorrectBox';
      } else {
        return 'correctBox';
      }
    },
  },
  methods: {
    checkAnswer() {
      if (this.answer == '') {
        this.roundCounted = false;
        this.showFeedback = false;
        this.hasError = true;
        return;
      }

      this.hasError = false;

      this.correct = this.wordB == this.answer;

      if (!this.correct) {
        this.hasError = true;
      }

      this.answeredCount++;
      if (this.correct) {
        this.correctCount++;
      }
      this.roundCounted = true;
      this.showFeedback = true;
    },
    reset() {
      this.answer = '';
      this.showFeedback = false;
      this.correct = null;
      this.inputBackgroundColor = 'white';
      this.hasError = false;
      this.roundCounted = false;

      // Reset to a new random word
      const randomIndex = Math.floor(Math.random() * this.words.length);
      this.wordA = this.words[randomIndex].wordA;
      this.wordB = this.words[randomIndex].wordB;
    },
  },
};

// eslint-disable-next-line no-unused-vars, no-undef
const app = Vue.createApp(Flashword).mount('#app');
