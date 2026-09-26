const Flashword = {
  data() {
    return {
      wordA: 'hola',
      wordB: 'hello',
      answer: '',
      correct: null,
      showFeedback: false,
      hasError: false,
      badge: null,

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
    answer(newVal) {
      if (newVal !== '') {
        this.hasError = false;
      }
    },
  },
  computed: {
    inputClass() {
      return this.hasError ? 'has-error' : '';
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
      if (this.correct) {
        this.awardBadge();
      }
      this.showFeedback = true;
    },
    reset() {
      this.answer = '';
      this.showFeedback = false;
      this.correct = null;
      this.hasError = false;
      this.badge = null;

      // Reset to a new random word
      const randomIndex = Math.floor(Math.random() * this.words.length);
      this.wordA = this.words[randomIndex].wordA;
      this.wordB = this.words[randomIndex].wordB;
    },
    awardBadge() {
      this.badge = 'Spanish Star';
    },
  },
};

// eslint-disable-next-line no-unused-vars, no-undef
const app = Vue.createApp(Flashword).mount('#app');
