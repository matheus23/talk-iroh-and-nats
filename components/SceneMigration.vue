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
    <NetZone :x="A.lanZone.x" :y="A.lanZone.y" :w="A.lanZone.w" :h="A.lanZone.h" label="at home" />
    <NetZone :x="A.goZone.x" :y="A.goZone.y" :w="A.goZone.w" :h="A.goZone.h" label="out and about" />

    <!-- cast: always present -->
    <NetServer :x="A.server.x" :y="A.server.y" label="another computer" />
    <NetRouter :x="A.router.x" :y="A.router.y" label="router" />
    <NetTower :x="A.tower.x" :y="A.tower.y" :arc-color="'#b4bac4'" label="cell tower" />

    <!-- phone at home — leaves at step 2 -->
    <g v-click.hide="2">
      <NetPhone :x="A.phoneHome.x" :y="A.phoneHome.y" color="#16a34a" label="phone" label-color="#15803d" />
    </g>

    <!-- step 1: the connection (fades at step 3, replaced by the broken view) -->
    <g v-click="[1, 3]">
      <NetWire :d="wifiHome" color="#2563eb" />
      <NetWire :d="viaRouter" color="#2563eb" />
      <NetPacket :x="540" :y="128" />
      <text x="216" y="222" style="font-size:10.5px" fill="#888">wifi</text>
    </g>

    <!-- step 2: phone moved out, attaches to the tower -->
    <g v-click="2">
      <NetPhone :x="A.phoneCell.x" :y="A.phoneCell.y" color="#16a34a" label="phone" label-color="#15803d" moved />
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
      <NetFrame
        :x="322" :y="300" :w="316" :h="34"
        :lines="[{ frame: 'four-tuple', value: '(ip:port ↔ ip:port)' }]"
      />
      <text x="480" y="352" text-anchor="middle" style="font-size:10.5px" fill="#888">
        that is what a TCP connection is identified by
      </text>
    </g>
  </Stage>
</template>
