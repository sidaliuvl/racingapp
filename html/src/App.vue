<template>
  <v-app theme="dark">
<div v-if="isDev" class="dev-controls">
      <v-btn @click="toggleApp(true)" color="primary">Open App</v-btn>
      <v-btn @click="toggleApp(false)" color="error">Close App</v-btn>
      <v-btn @click="toggleHud(true)" color="success">Show HUD</v-btn>
      <v-btn @click="toggleHud(false)" color="warning">Hide HUD</v-btn>
    </div>
    <transition name="scale" mode="out-in">
      <RaceAppView v-if="globalStore.appIsOpen"></RaceAppView>
    </transition>
    <HudView></HudView>
  </v-app>
</template>

<script lang="ts" setup>
console.log("IS MOCK:", import.meta.env.VITE_USE_MOCK_DATA)

import RaceAppView from "./views/RaceAppView.vue";
import HudView from "./views/HudView.vue";
import { onMounted, onUnmounted } from "vue";
import { useGlobalStore } from "./store/global";
import api from "@/api/axios";
import { useTheme } from "vuetify/lib/framework.mjs";
import { testState } from "./store/testState";
const isDev = import.meta.env.DEV;

const theme = useTheme()
const globalStore = useGlobalStore();

const toggleApp = (show: boolean): void => {
  if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
    if (show) {
      Object.assign(globalStore.$state, testState);
      globalStore.$state.appIsOpen = true;
    } else {
      globalStore.$state.appIsOpen = false;
    }
    return;
  }

  if (show) {
    getBaseData();
  }

  globalStore.$state.appIsOpen = show;
};


const toggleHud = (show: boolean): void => {
  globalStore.$state.hudIsOpen = show;
  if (show) {
    globalStore.$state.activeHudData = {
      ClosestCheckpoint: 1,
      InRace: true,
      InCreator: false
    };
    globalStore.$state.activeRace = {
      currentCheckpoint: 1,
      totalCheckpoints: 10,
      totalLaps: 3,
      currentLap: 1,
      raceStarted: true,
      raceName: "Test Race",
      time: 12345,
      totalTime: 123456,
      bestLap: 40000,
      position: 1,
      positions: [
        {
          Checkpoint: 1,
          RacerSource: 1,
          RacerName: "Test Racer",
          PlayerVehicleEntity: 1,
          Lap: 1,
          Placement: 1,
          Finished: false,
          CheckpointTimes: [{ lap: 1, checkpoint: 1, time: 12345 }]
        }
      ],
      totalRacers: 1,
      ghosted: false
    };
  }
};

const handleHudUpdate = (itemData: any) => {
  if (itemData.action == 'update') {
    globalStore.$state.hudIsOpen = itemData
    globalStore.$state.activeRace = itemData.data
    globalStore.$state.activeHudData = itemData.racedata
  } else {
    globalStore.$state.countdown = itemData.data.value
    if (itemData.data.value === 0 ) {
      setTimeout(() => {
        globalStore.$state.countdown = -1
      }, 2000);
    }
  }
}

const handleCreator = (itemData:any) => {
  if (itemData.action == 'update') {
    globalStore.$state.buttons = itemData.buttons
    globalStore.$state.creatorData = itemData.data
    globalStore.$state.activeHudData.InCreator = itemData.active
  }
}

const handleDataUpdate = (itemData: any) => {
  switch (itemData.dataType) {
    case 'bounties':
      globalStore.bounties = itemData.data
      break;
    case 'crypto':
      globalStore.baseData.data.currentCrypto = itemData.data
      break;
    default:
      break;
  }
}

const handleMessageListener = (event: MessageEvent) => {
  const itemData: any = event?.data;
  if (itemData?.type) {
    switch (itemData.type) {
      case 'race': 
        handleHudUpdate(itemData)
        break;
      case 'creator':
        handleCreator(itemData)
        break;
      case 'toggleApp':
        toggleApp(itemData.open)
        break;
      case 'notify': 
        globalStore.$state.notification = itemData.data
        break;
      case 'updateBaseData':
        getBaseData()
        break;
      case 'dataUpdate':
        handleDataUpdate(itemData);
        break;
      default:
        break;
    }
  }
};

const getBaseData = async () => {
  if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
    globalStore.$state = testState;
    return;
  }
  const res = await api.post("GetBaseData");
  if (res) {
    globalStore.$state.baseData = res
  }
  if (res.data.primaryColor) {
    theme.themes.value.dark.colors.primary = res.data.primaryColor;
  }
}

onMounted(() => {
  if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
    globalStore.$state = testState;
  }
  window.addEventListener("message", handleMessageListener);
});

onUnmounted(() => {
  window.removeEventListener("message", handleMessageListener, false);
});
</script>

<style>
@import './styles/global.scss';

::-webkit-scrollbar {
  width: 0;
  display: inline !important;
}
.v-application {
  background: rgb(0, 0, 0, 0.0) !important;
}

.scale-enter-active,
.scale-leave-active {
  transition: all 0.5s ease;
}

.scale-enter-from,
.scale-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.dev-controls {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  padding: 1rem;
  display: flex;
  gap: 0.5rem;
}
</style>