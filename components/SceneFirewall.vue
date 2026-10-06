<script setup lang="ts">
import Stage from './net/Stage.vue'
import NetLaptop from './net/NetLaptop.vue'
import NetRouter from './net/NetRouter.vue'
import NetServer from './net/NetServer.vue'
import NetWire from './net/NetWire.vue'
import NetFrame from './net/NetFrame.vue'
import NetNatCard from './net/NetNatCard.vue'
import NetX from './net/NetX.vue'
import NetPacket from './net/NetPacket.vue'

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
    <NetLaptop :x="laptop.x" :y="laptop.y" label="192.168.1.101" />
    <NetRouter :x="router.x" :y="router.y" label="203.0.113.20" sub="home router" />
    <NetServer :x="dns1.x" :y="dns1.y" label="1.1.1.1" ip="DNS" />
    <NetServer :x="dns2.x" :y="dns2.y" label="8.8.8.8" ip="DNS" />
    <NetWire :d="laptopLink" color="#2563eb" />
    <NetWire :d="upLink1" color="#2563eb" />
    <NetWire :d="upLink2" color="#aab2bd" dash="5 5" />
    <NetNatCard
      :x="196" :y="336" :w="272" title="NAT table (EIM)"
      :rows="[
        { ext: '203.0.113.20:6543', int: '192.168.1.101:12345' },
      ]"
    />

    <g v-click="1">
      <NetWire :d="upLink2" color="#dc2626" dash="5 5" arrow="red" />
      <NetPacket :x="560" :y="184" color="#dc2626" />
      <NetFrame
        :x="472" :y="200" :w="252" :h="34" :size="10.5"
        :lines="[
          { frame: 'src', value: '8.8.8.8:53' },
          { frame: 'dst', value: '203.0.113.20:6543' }
        ]"
      />
      <text x="392" y="246" style="font-size:18px" font-weight="bold" fill="#d97706">?</text>
    </g>
  </Stage>
</template>
