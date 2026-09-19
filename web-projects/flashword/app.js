// Define the options of our application
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
      this.correct = this.wordB == this.answer;
      this.showFeedback = true;
    },
    reset() {
      this.answer = '';
      this.showFeedback = false;
    },
  },
};

// Create a new Vue instance using our options
// eslint-disable-next-line no-unused-vars, no-undef
const app = Vue.createApp(FlashWord).mount('#app');
