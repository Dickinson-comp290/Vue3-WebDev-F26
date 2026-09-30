const FlashWord = {
  data() {
    return {
      wordA: 'hola',
      wordB: 'hello',
      answer: '',
      correct: null,
      incorrect: null,
      showFeedback: false,

      //array example
      spanishWords: ['hola', 'adios', 'uno', 'dos'],

      //object example
      word: { a: 'hola', b: 'hello' },

      //array of objects example
      words: [
        { wordA: 'hola', wordB: 'hello' },
        { wordA: 'adios', wordB: 'goodbye' },
        { wordA: 'uno', wordB: 'one' },
        { wordA: 'dos', wordB: 'two' },
      ],
    };
  },
  methods: {
    pickNewWord() {
      const randomIndex = Math.floor(Math.random() * this.words.length);
      const randomWord = this.words[randomIndex];
      this.wordA = randomWord.wordA;
      this.wordB = randomWord.wordB;
    },
    checkAnswer() {
      this.correct = this.wordB == this.answer;
      this.incorrect = this.wordB != this.answer;
      this.showFeedback = true;
    },
    reset() {
      this.answer = '';
      this.showFeedback = false;
      this.correct = null;
      this.incorrect = null;
      this.pickNewWord();
    },
  },
};

// eslint-disable-next-line no-unused-vars, no-undef
const app = Vue.createApp(FlashWord).mount('#app');
