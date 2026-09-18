/* cspell:disable */
const FlashWord = {
  data() {
    return {
      wordA: 'hola',
      wordB: 'hello',
      answer: '',
      correct: null,
      showFeedback: false,
    };
  },
  methods: {
    checkAnswer() {
      // Note how data properties are accessed via `this`
      this.correct = this.answer == this.wordB;
      this.showFeedback = true;
    },
    reset() {
      this.answer = '';
      this.showFeedback = false;
      // Reset all internal state variables
      this.correct = null;
      //Select a random word for the next round
      const words = [
        { wordA: 'hola', wordB: 'hello' },
        { wordA: 'adiós', wordB: 'goodbye' },
        { wordA: 'gracias', wordB: 'thank you' },
        { wordA: 'por favor', wordB: 'please' },
        { wordA: 'sí', wordB: 'yes' },
        { wordA: 'no', wordB: 'no' },
      ];
      const randomIndex = Math.floor(Math.random() * words.length);
      this.wordA = words[randomIndex].wordA;
      this.wordB = words[randomIndex].wordB;
    },
  },
};

// Create a new Vue instance using our options
// eslint-disable-next-line no-unused-vars, no-undef
const app = Vue.createApp(FlashWord).mount('#app');
