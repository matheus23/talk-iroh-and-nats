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
  screen?: string
  opacity?: number
}>(), {
  x: 0,
  y: 0,
  s: 1,
  color: '#2563eb',
  label: '',
  labelColor: '#888',
  badge: true,
  keyId: '',
  screen: '',
  opacity: 1,
})
</script>

<template>
  <g :transform="tf(x, y, s)" :opacity="opacity">
    <rect x="-38" y="0" width="76" height="50" rx="4" fill="#eee" stroke="#888" stroke-width="1.5" />
    <rect x="-34" y="4" width="68" height="42" rx="3" fill="#eee" :stroke="color" stroke-width="1" />


    <!-- public key chip + truncated id -->
    <g v-if="keyId">
      <path
        d="M -18.4 40.6 a 2.72 2.72 0 1 0 5.44 0 a 2.72 2.72 0 1 0 -5.44 0 Z
           M -16.88 40.6 a 1.2 1.2 0 1 0 2.4 0 a 1.2 1.2 0 1 0 -2.4 0 Z"
        fill="#eab308" fill-rule="evenodd"
      />
      <rect x="-15.68" y="39.88" width="7.68" height="1.44" fill="#eab308" />
      <rect x="-9.04" y="41.32" width="1.04" height="2.4" fill="#eab308" />
      <rect x="-11.44" y="41.32" width="1.04" height="1.6" fill="#eab308" />
      <text x="-5.2" y="43" text-anchor="start" font-family="'Space Mono', monospace" style="font-size:7.5px" fill="#d97706">{{ keyId }}</text>
    </g>

    <text
      v-if="screen" x="0" y="30" text-anchor="middle"
      font-family="'Space Mono', monospace" style="font-size:8px" fill="#888"
    >{{ screen }}</text>

    <!-- keyboard base -->
    <path
      d="M -40 50 L 40 50 L 48 61 Q 49.5 63 46.5 63 L -46.5 63 Q -49.5 63 -48 61 Z"
      fill="#eee" stroke="#888" stroke-width="1.5" stroke-linejoin="round"
    />

    <text
      v-if="label" x="0" y="83" text-anchor="middle"
      font-family="'Space Mono', monospace" style="font-size:13px" :fill="labelColor"
    >{{ label }}</text>
  </g>
</template>
