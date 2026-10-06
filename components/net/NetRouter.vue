<script setup lang="ts">
import { tf } from './geometry'

const props = withDefaults(defineProps<{
  x?: number
  y?: number
  s?: number
  label?: string
  sub?: string
  opacity?: number
}>(), {
  x: 0,
  y: 0,
  s: 1,
  label: '',
  sub: '',
  opacity: 1,
})
</script>

<template>
  <g :transform="tf(x, y, s)" :opacity="opacity">
    <!-- antennas -->
    <line x1="-18" y1="-2" x2="-24" y2="-16" stroke="#888" stroke-width="1.5" stroke-linecap="round" />
    <circle cx="-24" cy="-18" r="2" fill="#888" />
    <line x1="18" y1="-2" x2="24" y2="-16" stroke="#888" stroke-width="1.5" stroke-linecap="round" />
    <circle cx="24" cy="-18" r="2" fill="#888" />

    <rect x="-34" y="0" width="68" height="34" rx="4" fill="#eee" stroke="#888" stroke-width="1.5" />
    <circle cx="-24" cy="17" r="2" fill="#d97706" />
    <line x1="-12" y1="17" x2="26" y2="17" stroke="#888" stroke-width="1" />
    <line x1="-12" y1="10" x2="26" y2="10" stroke="#888" stroke-width="1" opacity="0.45" />
    <line x1="-12" y1="24" x2="26" y2="24" stroke="#888" stroke-width="1" opacity="0.45" />

    <text
      v-if="label" x="0" y="50" text-anchor="middle"
      font-family="'Space Mono', monospace" style="font-size:11px" fill="#888"
    >{{ label }}</text>
    <text
      v-if="sub" x="0" y="63" text-anchor="middle"
      font-family="'Space Mono', monospace" style="font-size:9px" fill="#888" opacity="0.8"
    >{{ sub }}</text>
  </g>
</template>
