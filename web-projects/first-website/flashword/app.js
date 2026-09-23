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
      this.correct = null;
    },
  },
};

const app = Vue.createApp(FlashWord).mount('#app');

// Create a new Vue instance using our options
