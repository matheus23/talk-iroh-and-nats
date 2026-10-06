<template>
  <defs>
    <marker
      v-for="m in [
        ['gray', '#888'],
        ['dim', '#aab2bd'],
        ['indigo', '#6366f1'],
        ['blue', '#2563eb'],
        ['green', '#15803d'],
        ['red', '#dc2626'],
        ['amber', '#d97706'],
      ]" :key="m[0]"
      :id="`arr-${m[0]}`"
      viewBox="0 0 10 10" ref-x="9" ref-y="5"
      marker-width="6" marker-height="6" orient="auto-start-reverse"
    >
      <path d="M 0 0 L 10 5 L 0 10 z" :fill="m[1]" />
    </marker>
  </defs>
</template>
