<script setup lang="ts">
import { tf } from './geometry'

const props = withDefaults(defineProps<{
  x?: number
  y?: number
  s?: number
  label?: string
  ip?: string
  color?: string
  opacity?: number
}>(), {
  x: 0,
  y: 0,
  s: 1,
  label: 'server',
  ip: '',
  color: '#888',
  opacity: 1,
})
</script>

<template>
  <g :transform="tf(x, y, s)" :opacity="opacity">
    <rect x="-26" y="0" width="52" height="62" rx="4" fill="#eee" stroke="#888" stroke-width="1.5" />
    <!-- drive bays -->
    <line x1="-18" y1="12" x2="18" y2="12" stroke="#888" stroke-width="1" />
    <line x1="-18" y1="26" x2="18" y2="26" stroke="#888" stroke-width="1" />
    <line x1="-18" y1="40" x2="18" y2="40" stroke="#888" stroke-width="1" />
    <circle cx="-14" cy="6" r="1.8" fill="#d97706" />
    <circle cx="-7" cy="6" r="1.8" fill="#888" />
    <line x1="-18" y1="50" x2="18" y2="50" stroke="#888" stroke-width="1" />

    <text
      v-if="label" x="0" y="78" text-anchor="middle"
      font-family="'Space Mono', monospace" style="font-size:13px" fill="#111"
    >{{ label }}</text>
    <text
      v-if="ip" x="0" :y="label ? 91 : 78" text-anchor="middle"
      font-family="'Space Mono', monospace" style="font-size:10px" :fill="color"
    >{{ ip }}</text>
  </g>
</template>
