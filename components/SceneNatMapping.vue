<script setup lang="ts">
import Stage from './net/Stage.vue'
import NetLaptop from './net/NetLaptop.vue'
import NetRouter from './net/NetRouter.vue'
import NetServer from './net/NetServer.vue'
import NetWire from './net/NetWire.vue'
import NetFrame from './net/NetFrame.vue'
import NetNatCard from './net/NetNatCard.vue'
import NetPacket from './net/NetPacket.vue'
import NetBubble from './net/NetBubble.vue'

const laptop = { x: 120, y: 250 }
const router = { x: 330, y: 262 }
const dns1 = { x: 700, y: 62 }
const dns2 = { x: 856, y: 178 }

const laptopLink = 'M 120 246 C 120 216, 262 240, 296 268'
const upLink1 = 'M 330 238 C 330 140, 560 150, 672 92'
const upLink2 = 'M 344 238 C 420 150, 720 150, 824 204'
</script>

<template>
  <Stage>
    <!-- cast + existing mapping -->
    <NetLaptop :x="laptop.x" :y="laptop.y" label="192.168.1.101" />
    <NetRouter :x="router.x" :y="router.y" label="203.0.113.20" sub="your router" />
    <NetServer :x="dns1.x" :y="dns1.y" label="1.1.1.1" ip="DNS" />
    <NetWire :d="laptopLink" color="#aab2bd" />
    <NetWire :d="upLink1" color="#2563eb" />
    <NetNatCard
      :x="196" :y="336" :w="272"
      :rows="[{ ext: '203.0.113.20:6543', int: '192.168.1.101:12345' }]"
    />

    <!-- step 1: add a second destination -->
    <g v-click="1">
      <NetServer :x="dns2.x" :y="dns2.y" label="8.8.8.8" ip="DNS" />
      <NetWire :d="upLink2" color="#aab2bd" dash="5 5" />
    </g>

    <!-- step 2: send from the same local port -->
    <g v-click="2">
      <NetWire :d="upLink2" color="#2563eb" arrow="blue" />
      <NetPacket :x="600" :y="152" />
      <NetFrame
        :x="452" :y="230" :w="222" :h="40" :size="10.5"
        :lines="[
          { frame: 'src', value: '192.168.1.101:12345' },
          { frame: 'dst', value: '8.8.8.8:53' },
        ]"
      />
    </g>

    <!-- step 3: which external port does it get? -->
    <g v-click="3">
      <NetNatCard
        :x="196" :y="336" :w="272"
        :rows="[
          { ext: '203.0.113.20:6543', int: '192.168.1.101:12345' },
          { unknown: '8.8.8.8:53 → 203.0.113.20:???' },
        ]"
      />
      <NetBubble
        :x="592" :y="300" :w="316" :h="86" tail="left"
        color="#d97706" tint="#fff7ed" title="same mapping?"
        :lines="[
          'EIM: reuse it for every destination',
          'ADM / APDM: a fresh mapping per peer',
          'IT DEPENDS :) — mostly reuse',
        ]"
      />
    </g>
  </Stage>
</template>
