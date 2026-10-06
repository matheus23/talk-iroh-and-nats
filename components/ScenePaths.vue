<script setup lang="ts">
import Stage from './net/Stage.vue'
import NetPhone from './net/NetPhone.vue'
import NetRouter from './net/NetRouter.vue'
import NetTower from './net/NetTower.vue'
import NetLaptop from './net/NetLaptop.vue'
import NetZone from './net/NetZone.vue'
import NetWire from './net/NetWire.vue'
import NetFrame from './net/NetFrame.vue'
import NetX from './net/NetX.vue'
import NetPacket from './net/NetPacket.vue'
import NetRelay from './net/NetRelay.vue'
import { A, W } from './net/geometry'

const newDirect = 'M 314 286 C 450 336, 560 352, 668 334'
</script>

<template>
  <Stage>
    <NetZone :x="A.lanZone.x" :y="A.lanZone.y" :w="A.lanZone.w" :h="A.lanZone.h" />

    <NetLaptop :x="A.laptop.x" :y="A.laptop.y" label="192.168.1.101" />
    <NetRouter :x="A.router.x" :y="A.router.y" label="203.0.113.20" sub="home router" />
    <NetTower :x="A.tower.x" :y="A.tower.y" :arcs="3" arc-color="#16a34a" label="cell tower" />
    <NetPhone :x="A.phoneCell.x" :y="A.phoneCell.y" color="#16a34a" label-color="#15803d" />
    <NetWire :d="W.laptopLink" color="#2563eb" />
    <NetWire :d="W.cellLink" color="#16a34a" />

    <NetRelay :x="A.relay.x" :y="A.relay.y" />

    <g v-click.hide="2">
      <NetWire :d="W.upLink" color="#2563eb" width="1.8" />
      <NetWire :d="W.downLink" color="#2563eb" width="1.8" />
    </g>
    <g v-click="2">
      <NetWire :d="W.upLink" color="#aab2bd" width="1.2" />
      <NetWire :d="W.downLink" color="#aab2bd" width="1.2" />
    </g>
    <NetX v-click="[2]" :x="596" :y="124" :size="6" />

    <g v-click="[3, 4]">
      <NetRelay :x="A.relay2.x" :y="A.relay2.y" label="relay 2" />
      <NetWire :d="W.upLink2" color="#aab2bd" dash="5 5" />
      <NetWire :d="W.downLink2" color="#aab2bd" dash="5 5" />
    </g>

    <g v-click="4">
      <NetRelay :x="A.relay2.x" :y="A.relay2.y" label="relay 2" />
      <NetWire :d="W.upLink2" color="#2563eb" width="1.8" />
      <NetWire :d="W.downLink2" color="#2563eb" width="1.8" />
    </g>

    <g v-click="[0, 5]">
      <NetWire :d="W.directLink" color="#2563eb" width="2.2" />
    </g>
    <g v-click="[5]">
      <NetWire :d="W.directLink" color="#aab2bd" width="1.2" dash="5 5" />
      <NetX :x="496" :y="326" :size="6" label="direct path gone" />
      <text x="278" y="340" text-anchor="middle" style="font-size:10.5px" fill="#d97706">NAT rebind!</text>
    </g>
    <g v-click="6">
      <NetWire :d="newDirect" color="#2563eb" width="2.2" />
      <text x="470" y="358" text-anchor="middle" style="font-size:10.5px" fill="#15803d">punched a fresh direct path ✓</text>
    </g>

  </Stage>
</template>
