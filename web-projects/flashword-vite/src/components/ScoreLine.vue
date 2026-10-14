<script>
export default {
  name: 'ScoreLine',
  props: {
    correctCount: {
      type: Number,
      required: true,
    },
    wordCount: {
      type: Number,
      required: true,
    },
  },
};
</script>

<template>
  <div class="score-line">
    <p class="score">Score: {{ correctCount }} / {{ wordCount }}</p>
    <progress
      class="progress"
      v-bind:value="correctCount"
      v-bind:max="wordCount || 1"
      v-bind:aria-label="`Words answered correctly: ${correctCount} of ${wordCount}`"
    >
      {{ correctCount }} / {{ wordCount }}
    </progress>
  </div>
</template>

<style scoped>
.score-line {
  max-width: 420px;
  margin: 10px auto 24px;
  padding: 0 12px;
}

.score {
  margin: 0 0 8px;
  font-size: 20px;
  font-weight: bold;
}

.progress {
  display: block;
  width: 100%;
  height: 18px;
  accent-color: #198754;
}
</style>
