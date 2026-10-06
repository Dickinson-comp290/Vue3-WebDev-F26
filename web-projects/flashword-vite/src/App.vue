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
    };
  },
  computed: {
    shuffledWords() {
      return [...this.words].sort(() => 0.5 - Math.random());
    },
    wordCount() {
      return this.words.length;
    },
    correctCount() {
      return this.words.filter((word) => word.correct).length;
    },
    completed() {
      return this.correctCount == this.wordCount;
    },
    restartGame() {
      return this.words.forEach((word) => {
        word.answer = '';
        word.correct = false;
        word.showHint = false;
      });
    },
  },

  methods: {
    checkAnswer(word) {
      word.correct = word.word_b == word.answer;

      if (word.correct) {
        word.showHint = false;
      }
    },
  },
};
</script>

<template>
  <div id="app" v-cloak>
    <h1>Bubblegum</h1>

    <p v-if="completed" id="completed">
      Good work, you completed all the words!
    </p>
    <p v-else id="correctCount">
      You have answered {{ correctCount }} out of {{ wordCount }}
    </p>

    <div id="cards">
      <div
        v-for="word in shuffledWords"
        v-bind:key="word.word_a"
        class="card"
        v-bind:class="{ correct: word.correct }"
      >
        <p class="word">
          {{ word.word_a }}
        </p>
        <input type="checkbox" id="showHint" v-model="word.showHint" />
        <p v-if="word.showHint">{{ word.hint }}</p>
        <input
          v-if="!word.correct"
          type="text"
          v-model="word.answer"
          showHint="true"
          v-on:keyup.enter="checkAnswer(word)"
        />
        <p v-else class="correctAnswer">
          {{ word.answer }}
        </p>
      </div>
    </div>
    <div id="restart">
      <input type="button" value="restartGame" v-on:click="restartGame()" />
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

.word {
  font-weight: bold;
  padding: 0;
  margin: 0;
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
#checkbox {
  justify-content: center;
  display: grid;
  grid-template-columns: 300px 300px 300px;
  grid-gap: 30px;
}
.check {
  font-size: 20px;
  color: #b377c4;
  padding: 10px;
  margin: 10px;
}
</style>
