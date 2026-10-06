<script setup lang="ts">
/**
 * Callout bubble in the iroh line-art style: tinted rounded rect with
 * a shrinking-circle tail pointing back at the talking device.
 */
withDefaults(defineProps<{
  x?: number
  y?: number
  w?: number
  h?: number
  color?: string
  tint?: string
  tail?: 'left' | 'right' | 'up' | 'none'
  title?: string
  lines?: string[]
  align?: 'start' | 'middle'
}>(), {
  x: 0,
  y: 0,
  w: 220,
  h: 64,
  color: '#6366f1',
  tint: '#eef2ff',
  tail: 'left',
  title: '',
  lines: () => [],
  align: 'start',
})

function lineX(x: number, w: number, align: string) {
  return align === 'middle' ? x + w / 2 : x + 14
}
</script>

<template>
  <g>
    <g v-if="tail !== 'none'" :fill="tint" :stroke="color" stroke-width="1">
      <template v-if="tail === 'left'">
        <circle :cx="x - 9" :cy="y + h - 12" r="4" />
        <circle :cx="x - 16" :cy="y + h - 6" r="3" />
        <circle :cx="x - 22" :cy="y + h + 1" r="2" />
      </template>
      <template v-else-if="tail === 'right'">
        <circle :cx="x + w + 9" :cy="y + h - 12" r="4" />
        <circle :cx="x + w + 16" :cy="y + h - 6" r="3" />
        <circle :cx="x + w + 22" :cy="y + h + 1" r="2" />
      </template>
      <template v-else-if="tail === 'up'">
        <circle :cx="x + w / 2" :cy="y - 9" r="4" />
        <circle :cx="x + w / 2" :cy="y - 17" r="3" />
        <circle :cx="x + w / 2" :cy="y - 23" r="2" />
      </template>
    </g>

    <rect :x="x" :y="y" :width="w" :height="h" rx="14" :fill="tint" :stroke="color" stroke-width="1" />

    <text
      v-if="title"
      :x="lineX(x, w, align)" :y="y + 20"
      :text-anchor="align === 'middle' ? 'middle' : 'start'"
      font-family="'Space Mono', monospace" style="font-size:12px" font-weight="bold" :fill="color"
    >{{ title }}</text>

    <text
      v-for="(l, i) in lines" :key="i"
      :x="lineX(x, w, align)" :y="title ? y + 39 + i * 17 : y + 22 + i * 17"
      :text-anchor="align === 'middle' ? 'middle' : 'start'"
      font-family="'Space Mono', monospace" style="font-size:10.5px" fill="#111"
    >{{ l }}</text>

    <slot />
  </g>
</template>
