<script setup lang="ts">
import Stage from './net/Stage.vue'
import NetPhone from './net/NetPhone.vue'
import NetRouter from './net/NetRouter.vue'
import NetTower from './net/NetTower.vue'
import NetServer from './net/NetServer.vue'
import NetZone from './net/NetZone.vue'
import NetWire from './net/NetWire.vue'
import NetX from './net/NetX.vue'
import NetFrame from './net/NetFrame.vue'
import NetPacket from './net/NetPacket.vue'
import { A } from './net/geometry'

// shared path pieces
const viaRouter = 'M 278 256 C 278 150, 620 130, 812 82'
const wifiHome = 'M 186 246 Q 214 234 246 252'
const cellLink = 'M 814 260 Q 760 250 722 260'
const viaTower = 'M 702 244 C 702 160, 780 110, 826 92'
</script>

<template>
  <Stage>
    <NetZone :x="A.lanZone.x" :y="A.lanZone.y" :w="A.lanZone.w" :h="A.lanZone.h" label="home network" />
    <!-- <NetZone :x="A.goZone.x" :y="A.goZone.y" :w="A.goZone.w" :h="A.goZone.h" /> -->

    <NetServer :x="A.server.x" :y="A.server.y" />
    <NetRouter :x="A.router.x" :y="A.router.y" label="home router" />

    <g v-click.hide="2">
      <NetPhone :x="A.phoneHome.x" :y="A.phoneHome.y" color="#16a34a" label-color="#15803d" />
    </g>

    <!-- step 1: the connection (fades at step 3, replaced by the broken view) -->
    <g v-click="[1, 3]">
      <NetWire :d="wifiHome" color="#2563eb" />
      <NetWire :d="viaRouter" color="#2563eb" />
    </g>

    <!-- step 2: phone moved out, attaches to the tower -->
    <g v-click="2">
      <NetTower :x="A.tower.x" :y="A.tower.y" :arc-color="'#b4bac4'" />
      <NetPhone :x="A.phoneCell.x" :y="A.phoneCell.y" color="#16a34a" label-color="#15803d" />
      <NetWire :d="cellLink" color="#16a34a" />
      <NetTower :x="A.tower.x" :y="A.tower.y" :arcs="3" arc-color="#16a34a" />
      <NetWire :d="viaTower" color="#aab2bd" dash="5 5" />
    </g>

    <!-- step 3: the old connection is dead -->
    <g v-click="3">
      <g opacity="0.35">
        <NetWire :d="wifiHome" color="#aab2bd" />
        <NetWire :d="viaRouter" color="#aab2bd" />
      </g>
      <NetX :x="520" :y="180" :size="7" label="connection lost" />
      <text :x="A.server.x" y="50" text-anchor="end" >
        (home IP:port, server IP:port)
      </text>
    </g>
  </Stage>
</template>
