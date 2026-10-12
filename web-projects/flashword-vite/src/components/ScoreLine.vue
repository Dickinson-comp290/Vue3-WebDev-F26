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
  <section class="scoreLine">
    <p id="scoreText" class="scoreText">
      You have answered {{ correctCount }} out of {{ wordCount }}
    </p>
    <progress
      class="progressBar"
      v-bind:value="correctCount"
      v-bind:max="wordCount"
      aria-labelledby="scoreText"
    >
      {{ correctCount }} out of {{ wordCount }}
    </progress>
  </section>
</template>

<style scoped>
.scoreLine {
  max-width: 500px;
  margin: 16px auto;
  padding: 0 12px;
}

.scoreText {
  margin: 0 0 8px;
  font-size: 1.1rem;
  font-weight: 700;
}

.progressBar {
  display: block;
  width: 100%;
  height: 14px;
  appearance: none;
  border: 0;
  border-radius: 999px;
  overflow: hidden;
  background-color: #e5e7eb;
}

.progressBar::-webkit-progress-bar {
  border-radius: 999px;
  background-color: #e5e7eb;
}

.progressBar::-webkit-progress-value {
  border-radius: 999px;
  background-color: #059669;
  transition: width 0.25s ease;
}

.progressBar::-moz-progress-bar {
  border-radius: 999px;
  background-color: #059669;
}
</style>
