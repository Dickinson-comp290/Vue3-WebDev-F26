<script>
export default {
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
      // correctCount: 0,
      // completed: false,
    };
  },
  computed: {
    shuffledWords() {
      const words = [...this.words];

      for (let i = words.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [words[i], words[j]] = [words[j], words[i]];
      }

      return words;
    },
    wordCount() {
      return this.words.length;
    },
    completed() {
      return this.correctCount == this.wordCount;
    },
  },
  watch: {
    correctCount() {
      this.completed = this.correctCount == this.wordCount;
    },
  },
  methods: {
    checkAnswer(word) {
      // word.correct = word.word_b = word.answer;

      if (word.answer.trim().toLowerCase() === word.word_b.toLowerCase()) {
        word.correct = true;
        this.correctCount++;
      }
    },
  },
};
</script>

<template>
  <h1>FlashWord</h1>
  <p v-if="completed" id="completed">
    Great work, you completed all the words!
  </p>
  <p v-else id="correctCount">
    You have answered {{ correctCount }} out of {{ wordCount }}
  </p>

  <div id="cards">
    <div
      class="card"
      v-for="word in shuffledWords"
      v-bind:class="{ correct: word.correct }"
    >
      <p class="word">{{ word.word_a }}</p>

      <input
        v-if="!word.correct"
        type="text"
        v-model="word.answer"
        v-on:keyup.enter="checkAnswer(word)"
      />

      <label v-if="!word.correct" class="hintToggle">
        <input type="checkbox" v-model="word.showHint" />
        Show hint
      </label>

      <p v-if="word.showHint && !word.correct" class="hint">
        {{ word.hint }}
      </p>
      <p v-else class="correctAnswer">{{ word.answer }}</p>
    </div>
  </div>
</template>

<style scoped>
[v-cloak] {
  display: none;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
  margin-top: 60px;
}

#cards {
  justify-content: center;
  display: grid;
  grid-template-columns: 300px 300px 300px;
  grid-gap: 30px;
}

.card {
  background-color: #e8f0ff;
  border-radius: 5px;
  padding: 10px 0;
  font-size: 25px;
}

input[type='text'] {
  border: 0;
  font-size: 25px;
  border-radius: 5px;
  margin-top: 5px;
  text-align: center;
  padding: 5px;
}

.hintToggle {
  display: block;
  font-size: 16px;
  margin-top: 5px;
  cursor: pointer;
}

.hint {
  margin: 5px 0 0 0;
  font-size: 18px;
  font-style: italic;
  color: #555;
}

.word {
  font-weight: bold;
}

.correctAnswer {
  padding: 0;
  margin: 0;
}

.correct {
  color: #0f5132;
  background-color: #d1e7dd;
}

#correctCount {
  font-size: 20px;
  margin: 10px;
  font-weight: bold;
  padding: 10px;
}

#completed {
  font-size: 20px;
  font-weight: bold;
  color: #0f5132;
  padding: 10px;
  margin: 10px;
}
</style>
