const Flashword = {
  data() {
    return {
      wordA: 'hola',
      wordB: 'hello',
      answer: '',
      correct: null,
      showFeedback: false,
      hasError: false,
      inputBackgroundColor: 'white',
      // Array of objects example
      words: [
        { wordA: 'hola', wordB: 'hello' },
        { wordA: 'adios', wordB: 'goodbye' },
        { wordA: 'uno', wordB: 'one' },
        { wordA: 'dos', wordB: 'two' },
      ],
      correctWords: [],
    };
  },
  watch: {},
  computed: {
    answerInput() {
      if (this.hasError && this.answer == '') {
        return 'error';
      }
      return '';
    },
    badgeEarned() {
      return this.correctWords.length / this.words.length > 0.8;
      //To get 80% with current amount of words you need to get all 4, but this can change if we increase it in the future
    },
  },
  methods: {
    checkAnswer() {
      if (this.answer == '') {
        this.hasError = true;
        return;
      }

      this.hasError = false;
      //this.inputBackgroundColor = 'white';

      this.correct = this.wordB == this.answer;

      if (this.correct && !this.correctWords.includes(this.wordA)) {
        this.correctWords.push(this.wordA);
      }

      this.showFeedback = true;
    },
    reset() {
      this.answer = '';
      this.showFeedback = false;
      this.correct = null;
      //this.inputBackgroundColor = 'white';
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
