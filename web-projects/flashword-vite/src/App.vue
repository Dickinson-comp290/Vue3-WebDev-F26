<script>
import WordCard from './components/WordCard.vue';

export default {
  components: {
    WordCard,
  },
  data() {
    return {
      words: [],
      correctCount: 0,
      completed: false,
      loadingWords: true,
      wordsError: false,
      leaderboard: [],
      leaderboardLoading: true,
      leaderboardError: '',
      startedAt: null,
      elapsedSeconds: 0,
      elapsedTime: null,
      timerInterval: null,
      playerName: '',
      nameError: '',
      isSubmitting: false,
      submissionError: '',
      submissionSuccess: false,
    };
  },
  async mounted() {
    this.loadLeaderboard();

    try {
      const response = await fetch('/api/words');

      if (!response.ok) {
        throw new Error(`Failed to fetch words: HTTP ${response.status}`);
      }

      const words = await response.json();
      if (!Array.isArray(words)) {
        throw new Error('The words response must be an array.');
      }

      this.words = words;
      this.startedAt = Date.now();
      this.timerInterval = window.setInterval(() => {
        this.elapsedSeconds = Math.floor((Date.now() - this.startedAt) / 1000);
      }, 1000);
    } catch (error) {
      console.error('Unable to fetch words:', error);
      this.wordsError = true;
    } finally {
      this.loadingWords = false;
    }
  },
  beforeUnmount() {
    window.clearInterval(this.timerInterval);
  },
  computed: {
    shuffledWords() {
      return this.playableWords.slice().sort(() => 0.5 - Math.random());
    },
    playableWords() {
      return this.words.filter(
        (word) =>
          typeof word?.word_a === 'string' &&
          word.word_a.trim() !== '' &&
          typeof word?.word_b === 'string' &&
          word.word_b.trim() !== ''
      );
    },
    wordCount() {
      return this.playableWords.length;
    },
    sortedLeaderboard() {
      return this.leaderboard
        .map((record) => ({
          name: record.name.trim(),
          time:
            typeof record.time === 'number'
              ? record.time
              : Number(record.time.trim()),
        }))
        .filter(
          (record) =>
            record.name !== '' &&
            Number.isFinite(record.time) &&
            record.time >= 0
        )
        .sort((first, second) => first.time - second.time);
    },
  },
  watch: {
    correctCount() {
      if (
        !this.completed &&
        this.wordCount > 0 &&
        this.correctCount >= this.wordCount
      ) {
        this.completed = true;
        this.elapsedTime = Math.floor((Date.now() - this.startedAt) / 1000);
        this.elapsedSeconds = this.elapsedTime;
        window.clearInterval(this.timerInterval);
      }
    },
  },
  methods: {
    async loadLeaderboard() {
      this.leaderboardLoading = true;
      this.leaderboardError = '';

      try {
        const response = await fetch('/api/times');
        if (!response.ok) {
          throw new Error(
            `Leaderboard request failed: HTTP ${response.status}`
          );
        }

        const records = await response.json();
        if (!Array.isArray(records)) {
          throw new Error('The leaderboard response must be an array.');
        }

        this.leaderboard = records.filter(
          (record) =>
            record &&
            typeof record.name === 'string' &&
            (typeof record.time === 'number' ||
              (typeof record.time === 'string' &&
                record.time.trim() !== '' &&
                Number.isFinite(Number(record.time.trim()))))
        );
      } catch (error) {
        console.error('Unable to fetch leaderboard:', error);
        this.leaderboard = [];
        this.leaderboardError =
          'The leaderboard could not be loaded. Please try again.';
      } finally {
        this.leaderboardLoading = false;
      }
    },
    incrementCorrectCount() {
      if (!this.completed && this.correctCount < this.wordCount) {
        this.correctCount++;
      }
    },
    async submitScore() {
      const name = this.playerName.trim();
      this.nameError = '';
      this.submissionError = '';

      if (!name) {
        this.nameError = 'Please enter your name.';
        return;
      }

      if (!this.completed || this.isSubmitting || this.submissionSuccess) {
        return;
      }

      this.isSubmitting = true;
      try {
        const response = await fetch('/api/times', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, time: this.elapsedTime }),
        });

        if (!response.ok) {
          throw new Error(`Score submission failed: HTTP ${response.status}`);
        }

        this.submissionSuccess = true;
        await this.loadLeaderboard();
      } catch (error) {
        console.error('Unable to submit score:', error);
        this.submissionError =
          'Your score could not be submitted. Please try again.';
      } finally {
        this.isSubmitting = false;
      }
    },
  },
};
</script>

<template>
  <main id="app" class="app-shell" v-cloak>
    <header class="page-header">
      <p class="eyebrow">Learn a little faster</p>
      <h1 data-cy="app-header">FlashWord</h1>
      <p class="subtitle">
        Practice your words and earn a place in the Hall of Fame.
      </p>
    </header>

    <p
      v-if="wordsError"
      role="alert"
      data-cy="words-error"
      class="notice error"
    >
      Something went wrong. Please try again later.
    </p>

    <section v-else-if="loadingWords" class="notice" role="status">
      Loading words…
    </section>

    <div v-else class="content-grid">
      <section class="game-panel" aria-labelledby="game-title">
        <div class="section-heading">
          <div>
            <p class="eyebrow">Your challenge</p>
            <h2 id="game-title">Word practice</h2>
          </div>
          <p class="timer" data-cy="elapsed-time" aria-live="off">
            {{ completed ? elapsedTime : elapsedSeconds }}s
          </p>
        </div>

        <p
          v-if="completed"
          id="completed"
          data-cy="completion-message"
          role="status"
        >
          Great work, you have completed all the words!
        </p>
        <p v-else id="correctCount" data-cy="answer-count">
          You have answered {{ correctCount }} out of {{ wordCount }}
        </p>

        <div v-if="completed" class="score-form">
          <form v-on:submit.prevent="submitScore" novalidate>
            <label for="player-name">Add your name to the leaderboard</label>
            <div class="submit-row">
              <input
                id="player-name"
                v-model="playerName"
                data-cy="player-name"
                type="text"
                autocomplete="name"
                v-bind:aria-invalid="Boolean(nameError)"
                v-bind:aria-describedby="nameError ? 'name-error' : undefined"
                v-on:input="nameError = ''"
              />
              <button
                type="submit"
                data-cy="submit-score"
                v-bind:disabled="isSubmitting || submissionSuccess"
              >
                {{ isSubmitting ? 'Submitting…' : 'Submit score' }}
              </button>
            </div>
            <p
              v-if="nameError"
              id="name-error"
              role="alert"
              class="form-message error"
            >
              {{ nameError }}
            </p>
            <p
              v-if="submissionError"
              role="alert"
              data-cy="submission-error"
              class="form-message error"
            >
              {{ submissionError }}
            </p>
            <p
              v-if="submissionSuccess"
              role="status"
              data-cy="submission-success"
              class="form-message success"
            >
              Your time has been added to the leaderboard.
            </p>
          </form>
        </div>

        <p v-else-if="wordCount === 0" class="empty-game">
          No words are available to practice right now.
        </p>

        <div v-else id="cards">
          <WordCard
            v-for="word in shuffledWords"
            v-bind:key="word.word_a"
            v-bind:word="word"
            v-bind:data-cy="word.word_a + '-card'"
            v-on:incrementCorrectCount="incrementCorrectCount"
          />
        </div>
      </section>

      <aside class="leaderboard-panel" aria-labelledby="leaderboard-title">
        <div class="section-heading">
          <div>
            <p class="eyebrow">Fastest times</p>
            <h2 id="leaderboard-title" data-cy="leaderboard-title">
              FlashWord Hall of Fame
            </h2>
          </div>
          <span class="trophy" aria-hidden="true">★</span>
        </div>

        <p
          v-if="leaderboardLoading"
          class="notice"
          role="status"
          data-cy="leaderboard-loading"
        >
          Loading leaderboard…
        </p>
        <div v-else-if="leaderboardError" class="leaderboard-error">
          <p role="alert" data-cy="leaderboard-error">{{ leaderboardError }}</p>
          <button type="button" class="retry-button" v-on:click="loadLeaderboard">
            Try again
          </button>
        </div>
        <p
          v-else-if="sortedLeaderboard.length === 0"
          class="empty-state"
          data-cy="leaderboard-empty"
        >
          No times yet. Be the first to make the list!
        </p>
        <table v-else class="leaderboard-table" data-cy="leaderboard">
          <thead>
            <tr>
              <th scope="col">Rank</th>
              <th scope="col">Player</th>
              <th scope="col">Time</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(record, index) in sortedLeaderboard"
              v-bind:key="`${record.name}-${index}`"
            >
              <td class="rank">{{ index + 1 }}</td>
              <td>{{ record.name }}</td>
              <td class="time-value">{{ record.time }}s</td>
            </tr>
          </tbody>
        </table>
      </aside>
  <div id="app" v-cloak>
    <h2 data-cy="app-header">FlashWord</h2>

    <p v-if="completed" id="completed">
      Great work, you have completed all the words!
    </p>
    <p v-else data-cy="correct-count" id="correctCount">
      You have answered {{ correctCount }} out of {{ wordCount }}
    </p>

    <div id="cards">
      <WordCard
        v-for="word in shuffledWords"
        v-bind:data-cy="word.word_a + '-card'"
        v-bind:key="word.word_a"
        v-bind:word="word"
        v-on:incrementCorrectCount="incrementCorrectCount"
      >
      </WordCard>
    </div>
  </main>
</template>

<style scoped>
[v-cloak] {
  display: none;
}

.app-shell {
  width: min(1180px, 100%);
  margin: 0 auto;
  padding: 44px 24px 56px;
}

.page-header {
  margin-bottom: 32px;
  text-align: center;
}

.page-header h1 {
  margin: 2px 0 8px;
  color: #16233b;
  font-size: clamp(2.5rem, 6vw, 4rem);
  letter-spacing: -0.06em;
}

.subtitle {
  margin: 0;
  color: #59677e;
}

.eyebrow {
  margin: 0 0 4px;
  color: #5168b5;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.13em;
  text-transform: uppercase;
}

.content-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.55fr) minmax(280px, 0.85fr);
  align-items: start;
  gap: 24px;
}

.game-panel,
.leaderboard-panel {
  min-width: 0;
  padding: 26px;
  border: 1px solid #e1e7f1;
  border-radius: 18px;
  background: #fff;
  box-shadow: 0 12px 32px rgb(36 55 94 / 7%);
}

.section-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.section-heading h2 {
  margin: 0;
  color: #16233b;
  font-size: 1.35rem;
}

.timer {
  min-width: 64px;
  margin: 0;
  padding: 8px 12px;
  border-radius: 12px;
  background: #eef2ff;
  color: #354b9a;
  font-size: 1.2rem;
  font-variant-numeric: tabular-nums;
  font-weight: 800;
  text-align: center;
}

#correctCount,
#completed {
  margin: 22px 0;
  padding: 12px;
  border-radius: 10px;
  background: #f4f6fb;
  color: #38465d;
  font-weight: 700;
  text-align: center;
}

#completed {
  background: #e6f5ec;
  color: #155b37;
}

#cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 14px;
}

.trophy {
  display: grid;
  width: 42px;
  height: 42px;
  flex: 0 0 auto;
  place-items: center;
  border-radius: 50%;
  background: #fff3cf;
  color: #be8610;
  font-size: 1.5rem;
}

.leaderboard-table {
  width: 100%;
  margin-top: 20px;
  border-collapse: collapse;
  text-align: left;
}

.leaderboard-table th {
  padding: 10px 8px;
  border-bottom: 1px solid #e1e7f1;
  color: #68758a;
  font-size: 0.75rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.leaderboard-table td {
  padding: 13px 8px;
  border-bottom: 1px solid #edf0f5;
}

.leaderboard-table tbody tr:last-child td {
  border-bottom: 0;
}

.leaderboard-table .rank {
  width: 52px;
  color: #5168b5;
  font-weight: 800;
}

.time-value {
  color: #243d84;
  font-variant-numeric: tabular-nums;
  font-weight: 800;
  text-align: right;
}

.empty-state,
.empty-game,
.notice {
  color: #59677e;
}

.empty-state {
  margin: 24px 0 4px;
  padding: 22px 16px;
  border-radius: 12px;
  background: #f6f8fc;
  text-align: center;
}

.leaderboard-error {
  margin-top: 18px;
  color: #9a2f2f;
}

.retry-button {
  border: 0;
  padding: 0;
  background: transparent;
  color: #354b9a;
  font: inherit;
  font-weight: 700;
  text-decoration: underline;
  cursor: pointer;
}

.score-form {
  margin: 0 0 22px;
}

.score-form label {
  display: block;
  margin-bottom: 8px;
  color: #273650;
  font-weight: 700;
}

.submit-row {
  display: flex;
  gap: 8px;
}

.submit-row input {
  min-width: 0;
  flex: 1;
  padding: 10px 12px;
  border: 1px solid #cbd4e4;
  border-radius: 8px;
  color: #16233b;
  font: inherit;
}

.submit-row input:focus {
  border-color: #5168b5;
  outline: 3px solid #dce4ff;
}

.submit-row button {
  padding: 10px 14px;
  border: 0;
  border-radius: 8px;
  background: #354b9a;
  color: #fff;
  font: inherit;
  font-weight: 700;
  cursor: pointer;
}

.submit-row button:disabled {
  cursor: wait;
  opacity: 0.7;
}

.form-message {
  margin: 9px 0 0;
  font-size: 0.9rem;
}

.error {
  color: #9a2f2f;
}

.success {
  color: #155b37;
}

@media (max-width: 760px) {
  .app-shell {
    padding: 30px 16px;
  }

  .content-grid {
    grid-template-columns: 1fr;
  }

  .game-panel,
  .leaderboard-panel {
    padding: 20px;
  }
}

@media (max-width: 420px) {
  .submit-row {
    align-items: stretch;
    flex-direction: column;
  }
}
</style>
