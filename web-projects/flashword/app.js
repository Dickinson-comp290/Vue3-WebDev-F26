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
      streak: 0,
      countedThisQuestion: false,
      badgeThreshold: 5,
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
  computed: {},
  methods: {
    checkAnswer() {
      if (this.answer == '') {
        this.hasError = true;
        return;
      }

      this.hasError = false;

      this.correct = this.wordB == this.answer;

      if (this.correct && !this.countedThisQuestion) {
        this.correctAnswers += 1;
        this.streak += 1;
        this.countedThisQuestion = true;
      } else if (!this.correct && !this.countedThisQuestion) {
        this.streak = 0;
      }

      this.showFeedback = true;
    },
    reset() {
      this.answer = '';
      this.showFeedback = false;
      this.correct = null;
      this.hasError = false;
      this.countedThisQuestion = false;
      this.badgeThreshold = 5;

      // Reset to a new random word
      const randomIndex = Math.floor(Math.random() * this.words.length);
      this.wordA = this.words[randomIndex].wordA;
      this.wordB = this.words[randomIndex].wordB;
    },
  },
};

// eslint-disable-next-line no-unused-vars, no-undef
const app = Vue.createApp(Flashword).mount('#app');
