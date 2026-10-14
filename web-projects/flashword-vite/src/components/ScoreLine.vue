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
  computed: {
    progressPercent() {
      if (this.wordCount === 0) {
        return 0;
      }

      return Math.min((this.correctCount / this.wordCount) * 100, 100);
    },
  },
};
</script>

<template>
  <p v-if="completed" id="completed">
    Great work, you completed all the words!
  </p>
  <p v-else id="correctCount">
    You have answered {{ correctCount }} out of {{ wordCount }}
  </p>

  <div class="progress-track" aria-label="Progress">
    <div
      class="progress-fill"
      v-bind:style="{ width: progressPercent + '%' }"
    ></div>
  </div>
</template>

<style scoped>
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

.progress-track {
  width: 100%;
  max-width: 600px;
  height: 16px;
  margin: 0 auto 20px;
  background-color: #e9ecef;
  border-radius: 999px;
  overflow: hidden;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
}

.progress-fill {
  height: 100%;
  border-radius: 999px;
  background: linear-gradient(90deg, #0d6efd, #198754);
  transition: width 0.3s ease;
}
</style>
