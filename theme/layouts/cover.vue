<script setup lang="ts">
import { computed } from 'vue'
import { handleBackground } from '../layoutHelper'

const props = defineProps({
  background: {
    default: '',
  },
})

const style = computed(() => handleBackground(props.background, true))
</script>

<template>
  <div class="slidev-layout cover" :style="style">
    <div class="iroh-glow" />
    <svg class="iroh-net" viewBox="0 0 980 620" fill="none">
      <g stroke="#8b87ff" stroke-opacity="0.28" stroke-width="1">
        <line x1="120" y1="120" x2="340" y2="60" />
        <line x1="120" y1="120" x2="80" y2="330" />
        <line x1="860" y1="90" x2="700" y2="210" />
        <line x1="860" y1="90" x2="910" y2="300" />
        <line x1="700" y1="210" x2="910" y2="300" />
        <line x1="150" y1="520" x2="300" y2="430" />
        <line x1="150" y1="520" x2="90" y2="420" />
        <line x1="840" y1="540" x2="700" y2="450" />
        <line x1="840" y1="540" x2="915" y2="430" />
      </g>
      <g fill="#a5a3ff">
        <circle cx="120" cy="120" r="4" fill-opacity="0.55" />
        <circle cx="340" cy="60" r="3" fill-opacity="0.4" />
        <circle cx="80" cy="330" r="3" fill-opacity="0.4" />
        <circle cx="860" cy="90" r="4" fill-opacity="0.55" />
        <circle cx="700" cy="210" r="3" fill-opacity="0.4" />
        <circle cx="910" cy="300" r="3" fill-opacity="0.4" />
        <circle cx="150" cy="520" r="4" fill-opacity="0.5" />
        <circle cx="300" cy="430" r="3" fill-opacity="0.35" />
        <circle cx="90" cy="420" r="2.5" fill-opacity="0.35" />
        <circle cx="840" cy="540" r="4" fill-opacity="0.5" />
        <circle cx="700" cy="450" r="3" fill-opacity="0.35" />
        <circle cx="915" cy="430" r="2.5" fill-opacity="0.35" />
      </g>
    </svg>
    <div class="my-auto w-full relative z-1">
      <slot />
    </div>
    <div class="iroh-wordmark">
      <span class="dot" /> number0 · iroh.computer
    </div>
  </div>
</template>

<style scoped>
.slidev-layout.cover {
  position: relative;
  overflow: hidden;
  background: #0c0c13;
  padding: 4rem 3.5rem;
}

.iroh-glow {
  position: absolute;
  top: -60%;
  left: 50%;
  transform: translateX(-50%);
  width: 120rem;
  height: 90rem;
  background: radial-gradient(closest-side, rgba(98, 87, 247, 0.55), rgba(98, 87, 247, 0));
  pointer-events: none;
}

.iroh-net {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.iroh-wordmark {
  position: absolute;
  bottom: 1.6rem;
  left: 3.5rem;
  font-family: 'Space Mono', ui-monospace, monospace;
  font-size: 0.8rem;
  color: #908ea8;
  display: flex;
  align-items: center;
  gap: 0.55rem;
}

.iroh-wordmark .dot {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 9999px;
  background: #dbff75;
  display: inline-block;
}
</style>
