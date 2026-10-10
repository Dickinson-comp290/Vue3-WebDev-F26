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
    completed: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<template>
  <p v-if="completed" id="completed">
    Great work, you have completed all the words!
  </p>
  <p v-else id="correctCount">
    You have answered {{ correctCount }} out of {{ wordCount }}
  </p>
  <progress
    v-bind:value="correctCount"
    v-bind:max="wordCount"
    v-bind:aria-label="`Game progress: ${correctCount} of ${wordCount} words answered`"
  >
    {{ correctCount }} of {{ wordCount }} words answered
  </progress>
</template>

<style scoped>
#correctCount,
#completed {
  font-size: 20px;
  font-weight: bold;
  margin: 10px;
  padding: 10px;
}

#correctCount {
  margin-bottom: 10px;
}

#completed {
  color: #0f5132;
  margin-bottom: 10px;
}

progress {
  accent-color: #198754;
  display: block;
  height: 1rem;
  margin: 0 auto 10px;
  width: min(100%, 420px);
}
</style>
