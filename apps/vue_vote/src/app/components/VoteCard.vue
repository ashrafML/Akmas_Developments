<template>
  <div class="card">
    <p class="question">
      Do you support using <strong>Akmas System</strong>?
    </p>

    <div v-if="!hasVoted">
      <button class="yes" @click="vote('yes')">👍 Yes</button>
      <button class="no" @click="vote('no')">👎 No</button>
    </div>

    <div v-else class="result">
      <p>✅ Thank you for voting!</p>
      <p>Your vote: <strong>{{ userVote }}</strong></p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const hasVoted = ref(false);
const userVote = ref<string | null>(null);

function vote(type: 'yes' | 'no') {
  if (hasVoted.value) return;
  userVote.value = type;
  hasVoted.value = true;
  localStorage.setItem('akmas-vote', type);
}
</script>

<style scoped>
.card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  width: 320px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  text-align: center;
}

.question {
  font-size: 1.1rem;
  margin-bottom: 1rem;
}

button {
  margin: 0.5rem;
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
}

.yes {
  background: #4caf50;
  color: white;
}

.no {
  background: #f44336;
  color: white;
}
</style>