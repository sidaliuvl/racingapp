<template>
  <div class="race-hud">
    <div class="stats-container">
      <div class="stat-group">
        <div class="stat-label">Checkpoints</div>
        <div class="stat-value">{{ globalStore.activeRace.currentCheckpoint }}/{{ globalStore.activeRace.totalCheckpoints }}</div>
      </div>
      <div class="stat-group">
        <div class="stat-label">Total Time</div>
        <div class="stat-value">{{ msToHMS(globalStore.activeRace.totalTime) }}</div>
      </div>
      <div class="stat-group">
        <div class="stat-label">PB Lap Time</div>
        <div class="stat-value">{{ msToHMS(globalStore.activeRace.bestLap) }}</div>
      </div>
      <div class="stat-group">
        <div class="stat-label">Current Lap</div>
        <div class="stat-value">{{ msToHMS(globalStore.activeRace.time) }}</div>
      </div>
      <div class="stat-group">
        <div class="stat-label">Current Lap Delta</div>
        <div class="stat-value">{{ msToHMS(globalStore.activeRace.time) }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGlobalStore } from "@/store/global";
import { msToHMS } from "@/helpers/msToHMS";
const globalStore = useGlobalStore();
</script>

<style scoped lang="scss">
.race-hud {
  position: fixed;
  top: 2vh;
  right: 2vw;
  display: flex;
  flex-direction: column;
  gap: 1em;
  font-family: 'Segoe UI', sans-serif;
}

.stats-container {
  background: rgba(0, 0, 0, 0.6);
  padding: 1em;
  border-radius: 0.3em;
  min-width: 300px;
  backdrop-filter: blur(10px);
}

.stat-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.8em;
  
  &:last-child {
    margin-bottom: 0;
  }

  &::after {
    content: '';
    position: absolute;
    right: 2.5em;
    width: 1em;
    height: 1em;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2300ffcc'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z'/%3E%3C/svg%3E");
    background-size: contain;
    opacity: 0.5;
  }
}

.stat-label {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9em;
  font-weight: 500;
  text-transform: uppercase;
}

.stat-value {
  color: #00ffcc;
  font-weight: 500;
  font-size: 1.1em;
  font-family: 'Consolas', monospace;
}
</style>