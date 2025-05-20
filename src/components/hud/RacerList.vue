<template>
  <div class="racers-holder">
    <div class="header">
      <div class="header-pos">POS</div>
      <div class="header-name">NAME</div>
      <div class="header-time">TIME</div>
    </div>
    <div
      class="box"
      v-for="(racer, index) in shortenedRacers"
      :key="racer.RacerSource"
      :class="{
        me: index === globalStore.activeRace.position-1,
      }"
    >
      <div class="position">{{ index + 1 }}</div>
      <span class="name">{{ racer.RacerName }}</span>
      <span class="time" v-if="index === 0 && racer.Finished">{{ translate('winner') }}</span>
      <span class="time" v-else-if="racer.Finished">{{ translate('finished') }}</span>
      <span class="time" v-else-if="index !== globalStore.activeRace.position-1">{{ getTimeDifference(racers[globalStore.activeRace.position - 1], racer) }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGlobalStore } from "@/store/global";
import { ActiveRacer } from "../../store/types";
import { computed } from "vue";
import { translate } from "@/helpers/translate";

const props = defineProps<{
  racers: ActiveRacer[];
}>();

const globalStore = useGlobalStore();
const shortenedRacers = computed(() =>
  props.racers?.slice(
    0,
    globalStore.baseData?.data?.hudSettings?.maxPositions || 10
  )
);

const formatTimeDifference = (timeDiffMs: number): string => {
  if (timeDiffMs === 0) {
    return "00.000";
  }

  const isAhead = timeDiffMs > 0;
  const absoluteDiffSeconds = Math.abs(timeDiffMs) / 1000;
  const formattedTime = absoluteDiffSeconds.toFixed(3).padStart(6, '0');
  return isAhead ? `+${formattedTime}` : `-${formattedTime}`;
};

const getTimeDifference = (racer1: ActiveRacer, racer2: ActiveRacer) => {
  const racer1Checkpoints = racer1.CheckpointTimes.length;
  const racer2Checkpoints = racer2.CheckpointTimes.length;

  if (racer1Checkpoints === 0 || racer2Checkpoints === 0) {
    return '00.000';
  }

  const lastCommonCheckpoint = Math.min(racer1Checkpoints, racer2Checkpoints) - 1;
  const racer1Time = racer1.CheckpointTimes[lastCommonCheckpoint].time;
  const racer2Time = racer2.CheckpointTimes[lastCommonCheckpoint].time;

  const timeDifference = formatTimeDifference(racer2Time - racer1Time);
  return timeDifference;
};
</script>

<style scoped lang="scss">
.racers-holder {
  display: flex;
  flex-direction: column;
  gap: 0.1em;
  font-family: 'Segoe UI', sans-serif;
  min-width: 300px;
  position: fixed;
  top: 2vh;
  left: 2vw;
  background: rgba(0, 0, 0, 0.5);
  padding: 0.5em;
  border-radius: 0.3em;
}

.header {
  display: flex;
  padding: 0.3em 0.5em;
  color: #00ffcc;
  font-size: 0.8em;
  font-weight: 600;
  text-transform: uppercase;
  border-bottom: 1px solid rgba(0, 255, 204, 0.3);
  margin-bottom: 0.3em;
}

.header-pos {
  width: 1.5em;
  text-align: center;
}

.header-name {
  flex: 1;
  margin-left: 1em;
}

.header-time {
  min-width: 5em;
  text-align: right;
}

.box {
  background: rgba(20, 20, 20, 0.6);
  width: 100%;
  font-size: 1em;
  display: flex;
  align-items: center;
  padding: 0.3em 0.5em;
  color: white;
  gap: 1em;
}

.position {
  width: 1.5em;
  text-align: center;
  font-weight: bold;
  color: #00ffcc;
}

.name {
  flex: 1;
  font-weight: 500;
  color: #00ffcc;
}

.time {
  color: #00ffcc;
  font-weight: 500;
  min-width: 5em;
  text-align: right;
}

.me {
  background: rgba(0, 255, 204, 0.15);
  border-left: 3px solid #00ffcc;
}
</style>