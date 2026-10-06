<script setup lang="ts">
/**
 * NAT mapping table card: rows map an external address to an internal one.
 * Rows may also be `unknown` (renders the amber "it depends" question mark).
 */
withDefaults(defineProps<{
  x?: number
  y?: number
  w?: number
  title?: string
  rows?: { ext?: string, int?: string, unknown?: string, highlight?: boolean }[]
}>(), {
  x: 0,
  y: 0,
  w: 260,
  title: 'NAT table',
  rows: () => [],
})

function rowHeight(row: { ext?: string, int?: string }) {
  return row.int ? 32 : 20
}
</script>

<template>
  <g>
    <rect
      :x="x" :y="y" :width="w"
      :height="30 + rows.reduce((a, r) => a + rowHeight(r), 0) + 6"
      rx="8" fill="#fff" stroke="#9ca3af" stroke-width="1"
    />
    <text :x="x + 12" :y="y + 19" font-family="'Space Mono', monospace" style="font-size:10.5px" font-weight="bold" fill="#111">
      {{ title }}
    </text>

    <template v-for="(r, i) in rows" :key="i">
      <line
        v-if="i === 0"
        :x1="x + 10" :y1="y + 26" :x2="x + w - 10" :y2="y + 26"
        stroke="#e4e4e7" stroke-width="1"
      />
      <g :transform="`translate(0 ${y + 26 + rows.slice(0, i).reduce((a, rr) => a + rowHeight(rr), 0)})`">
        <template v-if="r.unknown">
          <text
            :x="x + 12" :y="+19" font-family="'Space Mono', monospace" style="font-size:10.5px"
            :fill="r.highlight ? '#111' : '#d97706'" :font-weight="r.highlight ? 'bold' : 'normal'"
          >{{ r.unknown }}</text>
        </template>
        <template v-else>
          <text :x="x + 12" :y="+13" font-family="'Space Mono', monospace" style="font-size:10.5px" fill="#111">
            <tspan fill="#888">ext </tspan>{{ r.ext }}
          </text>
          <text v-if="r.int" :x="x + 12" :y="+27" font-family="'Space Mono', monospace" style="font-size:10.5px" fill="#111">
            <tspan fill="#888">int </tspan>{{ r.int }}
          </text>
        </template>
      </g>
    </template>
  </g>
</template>
