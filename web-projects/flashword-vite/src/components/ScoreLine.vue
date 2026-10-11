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
  <p id="correctCount">
    You have answered {{ correctCount }} out of {{ wordCount }}
  </p>
  <label for="score-progress">Score progress:</label>

  <progress
    id="score-progress"
    v-bind:max="wordCount"
    v-bind:value="correctCount"
  >
    {{ correctCount }} out of {{ wordCount }}
  </progress>
</template>

<style scoped>
#correctCount {
  font-size: 20px;
  margin: 10px;
  font-weight: bold;
  padding: 10px;
}
</style>
