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
      default: false,
    },
  },
  computed: {
    progress() {
      if (!this.wordCount) return 0;
      return Math.min((this.correctCount / this.wordCount) * 100, 100);
    },
  },
};
</script>

<template>
  <div class="score-wrap">
    <p v-if="completed" id="completed">
      Good work, you completed all the words!
    </p>
    <p v-else id="correctCount">
      You have answered {{ correctCount }} out of {{ wordCount }}
    </p>

    <div
      class="progress-bar"
      aria-label="Game progress"
      aria-valuemin="0"
      aria-valuemax="100"
      v-bind:aria-valuenow="progress"
    >
      <div class="progress-fill" v-bind:style="{ width: progress + '%' }"></div>
    </div>
  </div>
</template>

<style scoped>
.score-wrap {
  margin: 10px auto 25px;
  max-width: 600px;
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

.progress-bar {
  width: 100%;
  height: 18px;
  background-color: #dfe8ff;
  border-radius: 999px;
  overflow: hidden;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.15);
}

.progress-fill {
  height: 100%;
  border-radius: 999px;
  background: linear-gradient(90deg, #3b82f6, #22c55e);
  transition: width 0.25s ease;
}
</style>
