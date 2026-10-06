<script setup lang="ts">
import { STAGE } from './geometry'

withDefaults(defineProps<{
  w?: number
  h?: number
}>(), {
  w: STAGE.w,
  h: STAGE.h,
})
</script>

<template>
  <svg
    :viewBox="`0 0 ${w} ${h}`"
    preserve-aspect-ratio="xMidYMid meet"
    font-family="'Space Mono', ui-monospace, monospace"
    style="display:block"
  >
    <NetDefs />
    <slot />
  </svg>
</template>
