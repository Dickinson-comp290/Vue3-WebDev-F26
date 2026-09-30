#comment

<script>
export default {
  data() {
    return {
      correctCount: 0,
      words: [
        {
          word_a: 'hola',
          word_b: 'hello',
          hint: 'greeting',
          answer: '',
          correct: false,
        },
        {
          word_a: 'uno',
          word_b: 'one',
          hint: 'number',
          answer: '',
          correct: false,
        },
        {
          word_a: 'gris',
          word_b: 'grey',
          hint: 'color',
          answer: '',
          correct: false,
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
    completed() {
      return this.correctCount === this.wordCount;
    },
  },
  methods: {
    checkAnswer(word) {
      word.correct = word.word_b === word.answer;

      if (word.correct) {
        this.correctCount++;
      }
    },
  },
};
</script>

<template>
  <main class="flashword" v-cloak>
    <h1>FlashWord</h1>

    <p v-if="completed" class="completed">
      Good work, you completed all the words!
    </p>
    <p v-else class="correct-count">
      You have answered {{ correctCount }} out of {{ wordCount }}
    </p>

    <div class="cards">
      <div
        v-for="word in shuffledWords"
        v-bind:key="word.word_a"
        class="card"
        v-bind:class="{ correct: word.correct }"
      >
        <p class="word">{{ word.word_a }}</p>

        <input
          v-if="!word.correct"
          type="text"
          v-model="word.answer"
          v-on:keyup.enter="checkAnswer(word)"
        />
        <p v-else class="correctAnswer">{{ word.answer }}</p>
      </div>
    </div>
  </main>
</template>

<style scoped>
[v-cloak] {
  display: none;
}

.flashword {
  box-sizing: border-box;
  width: 100%;
  max-width: 548px;
  margin: 0 auto;
  padding: 28px 16px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #16191d;
}

h1 {
  margin: 0 0 14px;
  font-size: 18px;
  line-height: 1.3;
}

.cards {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.card {
  background-color: #e8f0ff;
  border-radius: 4px;
  padding: 5px 8px;
  min-width: 0;
  font-size: 14px;
}

input[type='text'] {
  box-sizing: border-box;
  display: block;
  width: 100%;
  height: 22px;
  border: 0;
  border-radius: 3px;
  padding: 2px 6px;
  background: #fff;
  color: #16191d;
  font: inherit;
  text-align: center;
}

.word {
  margin: 0 0 3px;
  font-weight: 600;
}

.correctAnswer {
  min-height: 22px;
  line-height: 22px;
  padding: 0;
  margin: 0;
}

.correct {
  color: #0f5132;
  background-color: #d1e7dd;
}

.correct-count,
.completed {
  margin: 0 0 8px;
  padding: 0;
  font-size: 12px;
  line-height: 1.4;
  font-weight: 600;
}

.completed {
  color: #0f5132;
}
</style>
