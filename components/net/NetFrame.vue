<script setup lang="ts">
/**
 * Grey frame box used for QUIC control frames (ADD_ADDRESS, REACH_OUT,
 * PATH_CHALLENGE, PATH_RESPONSE). Bold frame name + value on each line.
 */
withDefaults(defineProps<{
  x?: number
  y?: number
  w?: number
  h?: number
  lines?: { frame: string, value?: string }[]
  size?: number
}>(), {
  x: 0,
  y: 0,
  w: 224,
  h: 34,
  lines: () => [],
  size: 12,
})
</script>

<template>
  <g>
    <rect :x="x" :y="y" :width="w" :height="h" rx="5" fill="#e5e7eb" stroke="#9ca3af" stroke-width="1" />
    <text
      v-for="(l, i) in lines" :key="i"
      :x="x + 14" :y="y + 14 + i * (size + 4)"
      font-family="'Space Mono', monospace" :font-size="size" fill="#111"
    ><tspan font-weight="bold">{{ l.frame }}</tspan><tspan>{{ l.value ? ` ${l.value}` : '' }}</tspan></text>
  </g>
</template>
