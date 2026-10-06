<script setup lang="ts">
withDefaults(defineProps<{
  d: string
  color?: string
  width?: number
  dash?: string
  arrow?: string // marker color key from NetDefs: gray|dim|indigo|blue|green|red|amber
  arrowStart?: boolean
  opacity?: number
}>(), {
  color: '#2563eb',
  width: 1.5,
  opacity: 1,
})
</script>

<template>
  <path
    :d="d"
    fill="none"
    :stroke="color"
    :stroke-width="width"
    :stroke-dasharray="dash"
    stroke-linecap="round"
    :opacity="opacity"
    :marker-end="arrow ? `url(#arr-${arrow})` : undefined"
    :marker-start="arrow && arrowStart ? `url(#arr-${arrow})` : undefined"
  />
</template>
