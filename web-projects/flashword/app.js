const Flashword = {
  data() {
    return {
      words: [
        {
          word_a: 'hola',
          word_b: 'hello',
          hint: 'greeting',
          answer: '',
          correct: false,
          showHint: false,
        },
        {
          word_a: 'uno',
          word_b: 'one',
          hint: 'number',
          answer: '',
          correct: false,
          showHint: false,
        },
        {
          word_a: 'gris',
          word_b: 'grey',
          hint: 'color',
          answer: '',
          correct: false,
          showHint: false,
        },
      ],
      completed: false,
    };
  },
  watch: {
    correctCount() {
      this.completed = this.correctCount == this.wordCount;
    },
  },
  computed: {
    correctCount() {
      return this.words.filter((word) => word.correct).length;
    },
    shuffleWords() {
      return this.words.sort(() => 0.5 - Math.random());
    },

    wordCount() {
      return this.words.length;
    },
  },
  methods: {
    checkAnswer(word) {
      word.correct = word.word_b == word.answer;
    },
  },
};

const app = Vue.createApp(Flashword).mount('#app');
