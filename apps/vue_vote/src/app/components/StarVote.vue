<template>
  <div class="card">
    <p class="question">
      How would you rate <strong>Akmas System</strong>?
    </p>

    <div class="stars">
      <span
        v-for="star in 5"
        :key="star"
        class="star"
        :class="{ active: star <= hover || star <= rating }"
        @mouseenter="hover = star"
        @mouseleave="hover = 0"
        @click="rate(star)"
      >
        ★
      </span>
    </div>

    <div v-if="rating" class="result">
      <p>✅ Thank you!</p>
      <p>You rated Akmas: <strong>{{ rating }} / 5</strong></p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const rating = ref<number>(0);
const hover = ref<number>(0);

onMounted(() => {
  const saved = localStorage.getItem('akmas-rating');
  if (saved) rating.value = Number(saved);
});

function rate(value: number) {
  if (rating.value) return; // prevent re-vote
  rating.value = value;
  localStorage.setItem('akmas-rating', value.toString());
}
</script>

<style scoped>
.card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  width: 340px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  text-align: center;
}

.question {
  font-size: 1.1rem;
  margin-bottom: 1rem;
}

.stars {
  display: flex;
  justify-content: center;
  margin: 1rem 0;
}

.star {
  font-size: 2.2rem;
  cursor: pointer;
  color: #ccc;
  transition: color 0.2s ease;
}

.star.active {
  color: #f5b301;
}

.result {
  margin-top: 1rem;
  color: #333;
}
</style>