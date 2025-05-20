<template>
  <div class="race-hud">
    <div class="stats-container">
      <div class="stat-group">
        <div class="stat-label">Checkpoints:</div>
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
    <RacerList :racers="globalStore.activeRace.positions" />
  </div>
</template>

<script setup lang="ts">
import RacerList from "./RacerList.vue";
import { useGlobalStore } from "@/store/global";
import { msToHMS } from "@/helpers/msToHMS";
import { computed } from "vue";
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
}

.stat-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5em;
  
  &:last-child {
    margin-bottom: 0;
  }
}

.stat-label {
  color: white;
  font-size: 0.9em;
  font-weight: 500;
}

.stat-value {
  color: #00ffcc;
  font-weight: 500;
  font-size: 1em;
}
</style>