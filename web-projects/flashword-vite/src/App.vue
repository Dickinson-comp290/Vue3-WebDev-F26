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
          wrong: false,
        },
        {
          word_a: 'uno',
          word_b: 'one',
          hint: 'number',
          answer: '',
          correct: false,
          showHint: false,
          wrong: false,
        },
        {
          word_a: 'gris',
          word_b: 'grey',
          hint: 'color',
          answer: '',
          correct: false,
          showHint: false,
          wrong: false,
        },
      ],
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
    correctCount() {
      return this.words.filter((word) => word.correct).length;
    },
    completed() {
      return this.correctCount === this.wordCount;
    },
  },
  methods: {
    resetGame() {
      // Reset all words to their initial state (task 1).
      for (const word of this.words) {
        word.answer = '';
        word.correct = false;
        word.wrong = false;
        word.showHint = false;
      }
    },
    checkAnswer(word) {
      // Mark correct if the answer matches, otherwise mark wrong on Enter.
      if (word.answer.trim().toLowerCase() === word.word_b.toLowerCase()) {
        word.correct = true;
        word.wrong = false;
      } else {
        word.wrong = true;
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
  <button id="resetBtn" v-on:click="resetGame">Reset Game</button>

  <div id="cards">
    <div
      class="card"
      v-for="word in shuffledWords"
      v-bind:class="{ correct: word.correct, wrong: word.wrong }"
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
      <p v-else class="correctAnswer" v-bind:class="{ wrong: word.wrong }">
        {{ word.wrong ? word.word_b : word.answer }}
      </p>
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
  transition:
    background-color 0.3s ease,
    color 0.3s ease;
}

.wrong {
  color: #842029;
  background-color: #f8d7da;
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

#resetBtn {
  font-size: 16px;
  padding: 8px 16px;
  margin: 10px;
  cursor: pointer;
  background-color: #0f5132;
  color: white;
  border: none;
  border-radius: 5px;
}

#resetBtn:hover {
  background-color: #0a3d24;
}
</style>
