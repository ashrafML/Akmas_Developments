<template>
  <div class="app">
    <h1>⭐ Rate Akmas System</h1>
    <StarVote />
  </div>
</template>

<script setup lang="ts">
import StarVote from './components/StarVote.vue';
</script>

<style>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: Arial, sans-serif;
  background: #f5f7fa;
}
</style>