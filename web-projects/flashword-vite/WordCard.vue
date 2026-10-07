<script></script>

<template>
  <div
    class="card"
    v-for="word in shuffleWords"
    v-bind:class="{ correct: word.correct }"
  >
    <p class="word">{{ word.word_a }}</p>

    <input
      v-if="!word.correct"
      type="text"
      v-model="word.answer"
      v-on:keyup.enter="checkAnswer(word)"
    />

    <div v-if="!word.correct" class="hintBox">
      <label> <input type="checkbox" v-model="word.showHint" /> Hint </label>
      <span v-if="word.showHint" class="hint">{{ word.hint }}</span>
    </div>

    <p v-else class="correctAnswer">{{ word.answer }}</p>
  </div>
</template>

<style scoped></style>
