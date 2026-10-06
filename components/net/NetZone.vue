<script setup lang="ts">
withDefaults(defineProps<{
  x?: number
  y?: number
  w?: number
  h?: number
  color?: string
  tint?: string
  label?: string
  labelColor?: string
  rx?: number
}>(), {
  color: '#aab2bd',
  tint: 'none',
  label: '',
  labelColor: '#888',
  rx: 16,
})
</script>

<template>
  <g>
    <rect :x="x" :y="y" :width="w" :height="h" :rx="rx" :fill="tint" :stroke="color" stroke-width="1.5" stroke-dasharray="6 5" />
    <text
      v-if="label" :x="x + 16" :y="y + 22"
      font-family="'Space Mono', monospace" style="font-size:12px" :fill="labelColor"
    >{{ label }}</text>
  </g>
</template>
