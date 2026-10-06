<script setup lang="ts">
/** Address candidate: a colored circle labeled "IP n", plus optional caption. */
withDefaults(defineProps<{
  x?: number
  y?: number
  r?: number
  color?: string
  tint?: string
  label?: string
  caption?: string
  captionPos?: 'below' | 'right'
}>(), {
  x: 0,
  y: 0,
  r: 13,
  color: '#2563eb',
  tint: '#eff6ff',
  label: 'IP',
  caption: '',
  captionPos: 'below',
})
</script>

<template>
  <g>
    <circle :cx="x" :cy="y" :r="r" :fill="tint" :stroke="color" stroke-width="1.5" />
    <text
      :x="x" :y="y + 3.5" text-anchor="middle"
      font-family="'Space Mono', monospace" style="font-size:9px" font-weight="bold" :fill="color"
    >{{ label }}</text>
    <text
      v-if="caption"
      :x="captionPos === 'right' ? x + r + 8 : x"
      :y="captionPos === 'right' ? y + 3.5 : y + r + 14"
      :text-anchor="captionPos === 'right' ? 'start' : 'middle'"
      font-family="'Space Mono', monospace" style="font-size:9.5px" fill="#888"
    >{{ caption }}</text>
  </g>
</template>
