<script setup lang="ts">
import Stage from './net/Stage.vue'
import NetLaptop from './net/NetLaptop.vue'
import NetRouter from './net/NetRouter.vue'
import NetServer from './net/NetServer.vue'
import NetWire from './net/NetWire.vue'
import NetFrame from './net/NetFrame.vue'
import NetX from './net/NetX.vue'

const router = { x: 560, y: 268 }
const laptopA = { x: 320, y: 250 }
const laptopB = { x: 800, y: 250 }
const registry = { x: 660, y: 40 }

const frame1 = [{ frame: 'connect("192.168.4.20")' }]
const frame2 = [{ frame: 'connect("their-node.example.com")' }]
const frame3 = [{ frame: 'connect(<ed25519 public key>)' }]

const linkA = 'M 320 246 C 320 220, 470 244, 526 274'
const linkB = 'M 800 246 C 800 220, 660 244, 596 274'
const wan = 'M 576 258 C 660 226, 660 170, 660 116'
const lanDirect = 'M 354 302 C 470 350, 660 350, 766 302'
</script>

<template>
  <Stage>
    <NetRouter :x="router.x" :y="router.y" label="your router" />
    <NetLaptop :x="laptopA.x" :y="laptopA.y" color="#6366f1" label="you" />
    <NetLaptop :x="laptopB.x" :y="laptopB.y" color="#d97706" label="them" />
    <NetWire :d="linkA" color="#aab2bd" />
    <NetWire :d="linkB" color="#aab2bd" />
    <text x="560" y="382" text-anchor="middle" style="font-size:10.5px" fill="#a1a1aa">one local network</text>

    <!-- attempt 1: raw addresses -->
    <NetFrame
      :x="36" :y="60" :w="322" :h="34" :size="11"
      :lines="frame1"
    />
    <text x="36" y="110" style="font-size:10.5px" fill="#dc2626">not unique · changes all the time</text>

    <!-- step 1: domains + central registry -->
    <g v-click="1">
      <NetServer :x="registry.x" :y="registry.y" label="name registry" ip="example.com" />
      <NetWire :d="wan" color="#aab2bd" dash="5 5" />
      <NetFrame
        :x="36" :y="134" :w="322" :h="34" :size="11"
        :lines="frame2"
      />
      <text x="36" y="184" style="font-size:10.5px" fill="#dc2626">names need a central registry</text>
    </g>

    <!-- step 2: WAN split — LAN still alive; public key wins -->
    <g v-click="2">
      <NetX :x="618" :y="180" :size="7" />
      <text x="612" y="150" text-anchor="end" style="font-size:10.5px" fill="#dc2626">WAN down —</text>
      <text x="612" y="164" text-anchor="end" style="font-size:10.5px" fill="#dc2626">no name guarantees</text>
      <NetWire :d="lanDirect" color="#15803d" arrow="green" arrow-start width="2" />
      <text x="560" y="362" text-anchor="middle" style="font-size:11px" fill="#15803d">
        they are right here — let's just talk!
      </text>
      <NetFrame
        :x="36" :y="208" :w="322" :h="34" :size="11"
        :lines="frame3"
      />
      <text x="36" y="258" style="font-size:10.5px" fill="#15803d">unique anywhere · no registry</text>
      <text x="36" y="276" style="font-size:10.5px" fill="#15803d">doubles as its encryption key</text>
      <text x="36" y="294" style="font-size:10.5px" fill="#6366f1">an "EndpointId"</text>
    </g>
  </Stage>
</template>
