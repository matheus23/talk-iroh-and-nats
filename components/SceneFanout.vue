<script setup lang="ts">
import Stage from './net/Stage.vue'
import NetPhone from './net/NetPhone.vue'
import NetRouter from './net/NetRouter.vue'
import NetTower from './net/NetTower.vue'
import NetLaptop from './net/NetLaptop.vue'
import NetZone from './net/NetZone.vue'
import NetWire from './net/NetWire.vue'
import NetX from './net/NetX.vue'
import NetFrame from './net/NetFrame.vue'
import NetBubble from './net/NetBubble.vue'
import NetIpChip from './net/NetIpChip.vue'
import { A, W } from './net/geometry'

const probe1 = 'M 686 246 C 610 206, 500 224, 448 248'
const probe2 = 'M 688 256 C 560 312, 430 336, 308 318'
</script>

<template>
  <Stage>
    <NetZone :x="A.lanZone.x" :y="A.lanZone.y" :w="A.lanZone.w" :h="A.lanZone.h" />

    <NetLaptop :x="A.laptop.x" :y="A.laptop.y" label="192.168.1.101" />
    <NetRouter :x="A.router.x" :y="A.router.y" label="203.0.113.20" />
    <NetTower :x="A.tower.x" :y="A.tower.y" :arcs="3" arc-color="#16a34a" label="cell tower" />
    <NetPhone :x="A.phoneCell.x" :y="A.phoneCell.y" color="#16a34a" label-color="#15803d" />
    <NetWire :d="W.laptopLink" color="#aab2bd" />
    <NetWire :d="W.cellLink" color="#16a34a" />

    <!-- step 1: the phone dials the EndpointId, lookup yields candidates -->
    <g v-click="1">
      <NetBubble
        :x="536" :y="112" :w="300" :h="86" tail="right"
        color="#15803d" tint="#f0fdf4" title="endpoint.connect(<laptop EndpointId>)"
        :lines="[
          'lookup gives candidates:',
          'IP 1   192.168.1.101:12345',
          'IP 2   203.0.113.20:6543'
        ]"
      />
    </g>

    <!-- step 2: the tower has no route into private space -->
    <g v-click="2">
      <NetWire :d="probe1" color="#2563eb" arrow="blue" />
      <NetX :x="444" :y="244" label="192.* — no route" label-pos="bottom" />
    </g>

    <!-- step 3: the router firewall stays closed -->
    <g v-click="3">
      <NetWire :d="probe2" color="#2563eb" arrow="blue" />
      <NetX :x="304" :y="316" label="firewall: closed" label-pos="bottom" />
    </g>

    <!-- step 4: candidate addresses alone are not enough -->
    <g v-click="4">
      <text y="30">need coordination! -> Need bootstrapping</text>
    </g>
  </Stage>
</template>
