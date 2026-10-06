<script setup lang="ts">
withDefaults(defineProps<{
  x?: number
  y?: number
  s?: number
  size?: number
  label?: string
  labelPos?: 'bottom' | 'left' | 'right'
  color?: string
  weight?: number
}>(), {
  x: 0,
  y: 0,
  s: 1,
  size: 6,
  label: '',
  labelPos: 'bottom',
  color: '#dc2626',
  weight: 2,
})
</script>

<template>
  <g :transform="`translate(${x} ${y}) scale(${s})`">
    <line :x1="-size" :y1="-size" :x2="size" :y2="size" :stroke="color" :stroke-width="weight" stroke-linecap="round" />
    <line :x1="-size" :y1="size" :x2="size" :y2="-size" :stroke="color" :stroke-width="weight" stroke-linecap="round" />
    <text
      v-if="label"
      :x="labelPos === 'left' ? -size - 8 : labelPos === 'right' ? size + 8 : 0"
      :y="labelPos === 'bottom' ? Number(size) + 15 : 4"
      :text-anchor="labelPos === 'left' ? 'end' : labelPos === 'right' ? 'start' : 'middle'"
      font-family="'Space Mono', monospace" style="font-size:10.5px" :fill="color"
    >{{ label }}</text>
  </g>
</template>
