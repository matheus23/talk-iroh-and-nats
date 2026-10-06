<script setup lang="ts">
import { tf } from './geometry'

const props = withDefaults(defineProps<{
  x?: number
  y?: number
  s?: number
  label?: string
  dim?: boolean
  opacity?: number
}>(), {
  x: 0,
  y: 0,
  s: 1,
  label: 'relay',
  dim: false,
  opacity: 1,
})
</script>

<template>
  <g :transform="tf(x, y, s)" :opacity="opacity">
    <rect x="-32" y="0" width="64" height="18" rx="2" fill="#eee" stroke="#888" stroke-width="1.5" />
    <line x1="-16" y1="3" x2="-16" y2="15" stroke="#888" stroke-width="1" />
    <circle cx="-26" cy="6" r="1.5" :fill="dim ? '#888' : '#d97706'" />
    <circle cx="-26" cy="12" r="1.5" fill="#888" />
    <line x1="-8" y1="4" x2="-8" y2="14" stroke="#888" stroke-width="1" />
    <line x1="-3" y1="4" x2="-3" y2="14" stroke="#888" stroke-width="1" />
    <line x1="2" y1="4" x2="2" y2="14" stroke="#888" stroke-width="1" />
    <line x1="7" y1="4" x2="7" y2="14" stroke="#888" stroke-width="1" />
    <line x1="12" y1="4" x2="12" y2="14" stroke="#888" stroke-width="1" />
    <line x1="17" y1="4" x2="17" y2="14" stroke="#888" stroke-width="1" />

    <text
      v-if="label" x="0" y="32" text-anchor="middle"
      font-family="'Space Mono', monospace" style="font-size:13px" fill="#111"
    >{{ label }}</text>
  </g>
</template>
