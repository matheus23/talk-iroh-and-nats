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

const probe1 = 'M 686 246 C 610 206, 500 224, 428 248'
const probe2 = 'M 688 256 C 560 312, 430 316, 324 288'
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

    <!-- step 1: the phone dials the EndpointId, lookup yields candidates -->
    <g v-click="1">
      <NetBubble
        :x="536" :y="112" :w="256" :h="86" tail="right"
        color="#15803d" tint="#f0fdf4" title="endpoint.connect(the laptop)"
        :lines="['lookup gives candidates:', 'IP 1   192.168.1.101:12345', 'IP 2   203.0.113.20:6543']"
      />
      <NetIpChip :x="560" :y="218" color="#2563eb" tint="#eff6ff" label="IP 1" caption="LAN" />
      <NetIpChip :x="626" :y="218" color="#2563eb" tint="#eff6ff" label="IP 2" caption="WAN" />
    </g>

    <!-- step 2: the tower has no route into private space -->
    <g v-click="2">
      <NetWire :d="probe1" color="#2563eb" arrow="blue" />
      <NetX :x="424" :y="244" label="192.* — no route" label-pos="right" />
    </g>

    <!-- step 3: the router firewall stays closed -->
    <g v-click="3">
      <NetWire :d="probe2" color="#2563eb" arrow="blue" />
      <NetX :x="324" :y="286" label="firewall: closed" label-pos="right" />
    </g>

    <!-- step 4: candidate addresses alone are not enough -->
    <g v-click="4">
      <NetFrame
        :x="352" :y="392" :w="272" :h="34" :size="11"
        :lines="[{ frame: 'need a friend', value: 'both sides can reach' }]"
      />
      <text x="648" y="414" font-family="Georgia, serif" font-style="italic" style="font-size:13px" fill="#6366f1">
        "…someone always on the internet"
      </text>
    </g>
  </Stage>
</template>
