const Flashword = {
  data() {
    return {
      wordA: 'hola',
      wordB: 'hello',
      answer: '',
      correct: null,
      showFeedback: false,
      image: null,
      imageAlt: null,
      hasError: false,
      inputBackgroundColor: 'white',
      showHint: false,
      categories: ['greetings', 'verbs'],
      level: 'easy',
      sentence: '',
      firstName: '',
      lastName: '',
      firstNameAndLastName: '',

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
    // When firstName changes, this function is invoked
    firstName(val) {
      this.firstNameAndLastName = val + ' ' + this.lastName;
    },
    // When lastName changes, this function is invoked
    lastName(val) {
      this.firstNameAndLastName = this.firstName + ' ' + val;
    },
  },
  methods: {
    checkAnswer() {
      if (this.answer == '') {
        this.hasError = true;
        this.inputBackgroundColor = 'red';
        return;
      }

      this.hasError = false;
      this.inputBackgroundColor = 'white';
      this.correct = this.wordB == this.answer;

      if (this.correct) {
        this.image = 'correct';
        this.imageAlt = 'green check mark';
      } else {
        this.image = 'incorrect';
        ('red x');
      }
      this.showFeedback = true;
    },

    getFullName() {
      return this.firstName + ' ' + this.lastName;
    },
    reset() {
      this.answer = '';
      this.showFeedback = false;
    },
  },
};

// eslint-disable-next-line no-unused-vars, no-undef
const app = Vue.createApp(Flashword).mount('#app');
