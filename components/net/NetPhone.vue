<script setup lang="ts">
import { tf } from './geometry'

const props = withDefaults(defineProps<{
  x?: number
  y?: number
  s?: number
  color?: string
  label?: string
  labelColor?: string
  badge?: boolean
  keyId?: string
  moved?: boolean
  opacity?: number
}>(), {
  x: 0,
  y: 0,
  s: 1,
  color: '#6366f1',
  label: '',
  labelColor: '#888',
  badge: true,
  keyId: '',
  moved: false,
  opacity: 1,
})
</script>

<template>
  <g :transform="tf(x, y, s)" :opacity="opacity">
    <!-- motion streaks when the phone has just moved -->
    <g v-if="moved" :stroke="color" stroke-width="2" stroke-linecap="round" opacity="0.6">
      <line x1="-34" y1="20" x2="-46" y2="20" />
      <line x1="-36" y1="46" x2="-54" y2="46" />
      <line x1="-34" y1="72" x2="-46" y2="72" />
    </g>

    <rect x="-25" y="0" width="50" height="92" rx="9" fill="#eee" stroke="#888" stroke-width="1.5" />
    <path
      d="M -16 3 L -7 3 Q -5 3 -5 5 L -5 6 Q -5 8 -4 8 L 4 8 Q 5 8 5 6 L 5 5 Q 5 3 7 3 L 16 3
         A 6 6 0 0 1 22 9 L 22 83 A 6 6 0 0 1 16 89 L -16 89 A 6 6 0 0 1 -22 83 L -22 9
         A 6 6 0 0 1 -16 3 Z"
      fill="none" :stroke="color" stroke-width="1"
    />

    <!-- iroh badge -->
    <g v-if="badge">
      <rect x="-14" y="24" width="28" height="16" rx="3" fill="#eee" stroke="#d97706" stroke-width="1.5" />
      <text x="0" y="36" text-anchor="middle" font-family="'Space Mono', monospace" style="font-size:8px" fill="#d97706">iroh</text>
    </g>

    <!-- public key chip + truncated id -->
    <g v-if="keyId">
      <path
        d="M -18.4 57.6 a 2.72 2.72 0 1 0 5.44 0 a 2.72 2.72 0 1 0 -5.44 0 Z
           M -16.88 57.6 a 1.2 1.2 0 1 0 2.4 0 a 1.2 1.2 0 1 0 -2.4 0 Z"
        fill="#eab308" fill-rule="evenodd"
      />
      <rect x="-15.68" y="56.88" width="7.68" height="1.44" fill="#eab308" />
      <rect x="-9.04" y="58.32" width="1.04" height="2.4" fill="#eab308" />
      <rect x="-11.44" y="58.32" width="1.04" height="1.6" fill="#eab308" />
      <text x="-5.2" y="60" text-anchor="start" font-family="'Space Mono', monospace" style="font-size:7.5px" fill="#d97706">{{ keyId }}</text>
    </g>

    <text
      v-if="label" x="0" y="112" text-anchor="middle"
      font-family="'Space Mono', monospace" style="font-size:13px" :fill="labelColor"
    >{{ label }}</text>
  </g>
</template>
