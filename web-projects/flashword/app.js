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
      inputBackgroundColor: 'white',
      showHint: false,
      categories: ['greetings', 'colors', 'verbs'],
      level: 'easy',
      sentence: '',
      firstName: '',
      lastName: '',
      fullName: '',

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
  computed: {
    fullName() {
      return this.firstName + ' ' + this.lastName;
    },
    shortSpanishWords() {
      // Filter the words, returning just the ones that are <= 3 characters in length
      return this.spanishWords.filter((word) => word.length <= 3);
    },
  },
  watch: {
    firstName() {
      this.fullName = this.firstName + ' ' + this.lastName;
    },
  },
  methods: {
    getFullName() {
      return this.FirstName + ' ' + this.lastName;
    },
    checkAnswer() {
      if (this.answer == '') {
        this.hasError = true;
        this.inputBackgroundColor = 'lightPink';
        return;
      }

      this.hasError = false;
      this.inputBackgroundColor = 'white';
      this.correct = this.wordB == this.answer;
      if (this.correct) {
        this.image = 'correct';
      } else {
        this.image = 'correct';
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
