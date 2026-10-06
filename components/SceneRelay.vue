<script setup lang="ts">
import Stage from './net/Stage.vue'
import NetPhone from './net/NetPhone.vue'
import NetRouter from './net/NetRouter.vue'
import NetTower from './net/NetTower.vue'
import NetLaptop from './net/NetLaptop.vue'
import NetRelay from './net/NetRelay.vue'
import NetZone from './net/NetZone.vue'
import NetWire from './net/NetWire.vue'
import NetFrame from './net/NetFrame.vue'
import NetPacket from './net/NetPacket.vue'
import { A, W } from './net/geometry'
</script>

<template>
  <Stage>
    <NetZone :x="A.lanZone.x" :y="A.lanZone.y" :w="A.lanZone.w" :h="A.lanZone.h" label="at home" />
    <NetZone :x="A.goZone.x" :y="A.goZone.y" :w="A.goZone.w" :h="A.goZone.h" label="out and about" />

    <NetLaptop :x="A.laptop.x" :y="A.laptop.y" label="192.168.1.101" />
    <NetRouter :x="A.router.x" :y="A.router.y" label="203.0.113.20" />
    <NetTower :x="A.tower.x" :y="A.tower.y" :arcs="3" arc-color="#16a34a" label="cell tower" />
    <NetPhone :x="A.phoneCell.x" :y="A.phoneCell.y" color="#16a34a" label="phone" label-color="#15803d" />
    <NetWire :d="W.laptopLink" color="#aab2bd" />
    <NetWire :d="W.cellLink" color="#16a34a" />

    <!-- step 1: both sides connect to the relay — plain https + websockets -->
    <g v-click="1">
      <NetRelay :x="A.relay.x" :y="A.relay.y" />
      <NetWire :d="W.upLink" color="#aab2bd" dash="5 5" />
      <NetWire :d="W.downLink" color="#aab2bd" dash="5 5" />
      <text x="452" y="100" text-anchor="middle" style="font-size:10.5px" fill="#888">
        https + websockets — reachable from nearly anywhere
      </text>
    </g>

    <!-- step 2: the relayed path is live -->
    <g v-click="2">
      <NetWire :d="W.upLink" color="#2563eb" width="2" />
      <NetWire :d="W.downLink" color="#2563eb" width="2" />
      <NetWire :d="W.laptopLink" color="#2563eb" width="2" />
      <NetPacket :x="308" :y="176" />
      <NetPacket :x="612" :y="140" />
      <NetFrame
        :x="330" :y="398" :w="290" :h="34" :size="11"
        :lines="[{ frame: 'relayed QUIC', value: 'still end-to-end encrypted' }]"
      />
    </g>
  </Stage>
</template>
