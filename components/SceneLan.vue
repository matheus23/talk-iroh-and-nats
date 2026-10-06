<script setup lang="ts">
import Stage from './net/Stage.vue'
import NetPhone from './net/NetPhone.vue'
import NetRouter from './net/NetRouter.vue'
import NetLaptop from './net/NetLaptop.vue'
import NetZone from './net/NetZone.vue'
import NetWire from './net/NetWire.vue'
import NetX from './net/NetX.vue'
import NetFrame from './net/NetFrame.vue'
import NetPacket from './net/NetPacket.vue'

const laptop = { x: 190, y: 244 }
const router = { x: 470, y: 258 }
const phone = { x: 760, y: 236 }

const linkL = 'M 190 242 C 190 216, 380 240, 434 268'
const linkP = 'M 760 234 C 760 210, 560 240, 508 268'
const wan = 'M 470 240 L 470 104'
</script>

<template>
  <Stage>
    <NetZone :x="110" :y="200" :w="740" :h="240" label="LAN" />

    <NetLaptop :x="laptop.x" :y="laptop.y" />
    <NetRouter :x="router.x" :y="router.y" label="home router" />
    <NetPhone :x="phone.x" :y="phone.y" color="#16a34a" label-color="#15803d" />
    <NetWire :d="linkL" color="#aab2bd" />
    <NetWire :d="linkP" color="#aab2bd" />

    <!-- WAN is irrelevant (or down) -->
    <NetWire :d="wan" color="#aab2bd" dash="5 5" />
    <NetX :x="470" :y="100" :size="6" />
    <text x="484" y="96" style="font-size:10.5px" fill="#888">WAN unavailable</text>

    <!-- step 1: mDNS announces everyone's addresses -->
    <g v-click="[1]">
      <NetWire :d="linkL" color="#d97706" dash="5 4" arrow="amber" />
      <NetWire :d="linkP" color="#d97706" dash="5 4" arrow="amber" />
      <text x="300" y="254" text-anchor="middle" style="font-size:10.5px" fill="#d97706">mDNS announce</text>
      <text x="640" y="254" text-anchor="middle" style="font-size:10.5px" fill="#d97706">mDNS announce</text>
    </g>

    <!-- step 2: direct LAN connection -->
    <g v-click="2">
      <NetWire :d="linkL" color="#2563eb" width="2" />
      <NetWire :d="linkP" color="#2563eb" width="2" />
    </g>
  </Stage>
</template>
