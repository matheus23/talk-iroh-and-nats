<script setup lang="ts">
/** A packet rendered as a small circle at explicit coordinates. */
withDefaults(defineProps<{
  x?: number
  y?: number
  r?: number
  color?: string
  label?: string
  labelDx?: number
  labelDy?: number
}>(), {
  x: 0,
  y: 0,
  r: 4,
  color: '#2563eb',
})
</script>

<template>
  <g>
    <circle :cx="x" :cy="y" :r="r" :fill="color" />
    <text
      v-if="label" :x="x + (labelDx ?? 0)" :y="y + (labelDy ?? -10)"
      text-anchor="middle" font-family="'Space Mono', monospace" style="font-size:9.5px" :fill="color"
    >{{ label }}</text>
  </g>
</template>
