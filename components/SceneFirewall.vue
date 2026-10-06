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
// an unsolicited packet from 8.8.8.8 arriving at the mapping made for 1.1.1.1
const sneak = 'M 830 208 C 640 268, 480 264, 326 272'
</script>

<template>
  <Stage>
    <!-- everything that was already established -->
    <NetLaptop :x="laptop.x" :y="laptop.y" label="192.168.1.101" />
    <NetRouter :x="router.x" :y="router.y" label="203.0.113.20" sub="your router · EIM" />
    <NetServer :x="dns1.x" :y="dns1.y" label="1.1.1.1" ip="DNS" />
    <NetServer :x="dns2.x" :y="dns2.y" label="8.8.8.8" ip="DNS" />
    <NetWire :d="laptopLink" color="#aab2bd" />
    <NetWire :d="upLink1" color="#2563eb" />
    <NetWire :d="upLink2" color="#2563eb" />
    <NetNatCard
      :x="196" :y="336" :w="272" title="router · NAT mapping (EIM)"
      :rows="[
        { ext: '203.0.113.20:6543 ↔ 1.1.1.1:53', int: '192.168.1.101:12345' },
      ]"
    />

    <!-- step 1: an unexpected answer arrives -->
    <g v-click="1">
      <NetWire :d="sneak" color="#dc2626" dash="6 5" arrow="red" />
      <NetPacket :x="560" :y="256" color="#dc2626" />
      <NetFrame
        :x="472" :y="176" :w="252" :h="34" :size="10.5"
        :lines="[{ frame: 'unsolicited', value: '8.8.8.8 → 203.0.113.20:6543' }]"
      />
      <text x="392" y="246" style="font-size:18px" font-weight="bold" fill="#d97706">?</text>
    </g>

    <!-- step 2: the firewall has opinions -->
    <g v-click="2">
      <NetX :x="322" :y="272" :size="7" />
      <NetFrame
        :x="40" :y="120" :w="292" :h="34" :size="10.5"
        :lines="[{ frame: 'stateful', value: 'only replies to who we asked' }]"
      />
      <text x="40" y="172" style="font-size:10.5px" fill="#888">answer: IT DEPENDS — but mostly no</text>
    </g>

    <!-- step 3: the filtering ladder -->
    <g v-click="3">
      <text x="664" y="396" text-anchor="middle" style="font-size:11px" font-weight="bold" fill="#111">how picky is the router?</text>
      <text x="664" y="418" text-anchor="middle" style="font-size:10.5px" fill="#111">
        <tspan fill="#15803d">off</tspan> — anyone replies  ·
        <tspan fill="#d97706">ADF</tspan> — only 1.1.1.1  ·
        <tspan fill="#dc2626">APDF</tspan> — and the port
      </text>
    </g>
  </Stage>
</template>
