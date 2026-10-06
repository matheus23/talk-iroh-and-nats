<script setup lang="ts">
import { computed } from 'vue'
import { tf } from './geometry'

const props = withDefaults(defineProps<{
  x?: number
  y?: number
  s?: number
  arcs?: number
  arcColor?: string
  label?: string
  opacity?: number
}>(), {
  x: 0,
  y: 0,
  s: 1,
  arcs: 2,
  arcColor: '#b4bac4',
  label: '',
  opacity: 1,
})

// radio arcs around the antenna tip (0, -118), ±38° opening left/right
const arcList = computed(() => {
  const out: { d: string }[] = []
  for (let i = 0; i < props.arcs; i++) {
    const r = 11 + i * 8
    const dx = (r * 0.788).toFixed(1)
    const dy = (r * 0.616).toFixed(1)
    out.push({ d: `M ${dx} ${-118 - Number(dy)} A ${r} ${r} 0 0 1 ${dx} ${-118 + Number(dy)}` })
    out.push({ d: `M ${-Number(dx)} ${-118 - Number(dy)} A ${r} ${r} 0 0 0 ${-Number(dx)} ${-118 + Number(dy)}` })
  }
  return out
})

// lattice rungs between the two legs
const rungs = computed(() => {
  const out: { x: number, y: number }[] = []
  for (let h = 22; h <= 66; h += 22) {
    const t = h / 92
    out.push({ x: 16 - 12 * t, y: -h })
  }
  return out
})
</script>

<template>
  <g :transform="tf(x, y, s)" :opacity="opacity">
    <!-- legs + rungs -->
    <path d="M -16 0 L -4 -92 M 16 0 L 4 -92" fill="none" stroke="#888" stroke-width="1.5" stroke-linecap="round" />
    <line v-for="(r, i) in rungs" :key="i" :x1="-r.x" :y1="r.y" :x2="r.x" :y2="r.y" stroke="#888" stroke-width="1" opacity="0.7" />

    <!-- head + antenna -->
    <rect x="-6" y="-104" width="12" height="12" rx="2" fill="#eee" stroke="#888" stroke-width="1.5" />
    <line x1="0" y1="-104" x2="0" y2="-116" stroke="#888" stroke-width="1.5" />
    <circle cx="0" cy="-118" r="2" fill="#d97706" />

    <!-- radio arcs -->
    <path v-for="(a, i) in arcList" :key="`a${i}`" :d="a.d" fill="none" :stroke="arcColor" stroke-width="1.5" stroke-linecap="round" />

    <text
      v-if="label" x="0" y="18" text-anchor="middle"
      font-family="'Space Mono', monospace" style="font-size:13px" fill="#888"
    >{{ label }}</text>
  </g>
</template>
