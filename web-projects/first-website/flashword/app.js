const FlashWord = {
  data() {
    return {
      words: [
        { span: 'hola', eng: 'hello' },
        { span: 'adiós', eng: 'goodbye' },
        { span: 'gracias', eng: 'thank you' },
        { span: 'por favor', eng: 'please' },
        { span: 'perro', eng: 'dog' },
        { span: 'gato', eng: 'cat' },
        { span: 'casa', eng: 'house' },
        { span: 'escuela', eng: 'school' },
        { span: 'libro', eng: 'book' },
        { span: 'comida', eng: 'food' },
        { span: 'agua', eng: 'water' },
        { span: 'amigo', eng: 'friend' },
        { span: 'familia', eng: 'family' },
      ],
      wordA: '',
      wordB: '',
      answer: '',
      correct: null,
      showFeedback: false,
    };
  },

  methods: {
    pickWord() {
      const randomIndex = Math.floor(Math.random() * this.words.length);
      this.wordA = this.words[randomIndex].span;
      this.wordB = this.words[randomIndex].eng;
      this.answer = '';
      this.showFeedback = false;
      this.correct = null;
    },

    checkAnswer() {
      // Note how data properties are accessed via `this`
      this.correct = this.answer == this.wordB;
      this.showFeedback = true;
    },

    reset() {
      this.answer = '';
      this.showFeedback = false;
      this.correct = null;
      this.pickWord();
    },
  },
};

const app = Vue.createApp(FlashWord).mount('#app');
