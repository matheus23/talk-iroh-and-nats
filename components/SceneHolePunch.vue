<script setup lang="ts">
import Stage from './net/Stage.vue'
import NetPhone from './net/NetPhone.vue'
import NetRouter from './net/NetRouter.vue'
import NetTower from './net/NetTower.vue'
import NetLaptop from './net/NetLaptop.vue'
import NetZone from './net/NetZone.vue'
import NetWire from './net/NetWire.vue'
import NetFrame from './net/NetFrame.vue'
import NetBubble from './net/NetBubble.vue'
import NetRelay from './net/NetRelay.vue'
import NetIpChip from './net/NetIpChip.vue'
import { A, W } from './net/geometry'

// one-way trips along the relayed route
const serverToClient = 'M 278 240 C 278 150, 396 112, 418 52 L 486 52 C 508 112, 702 150, 702 236'
const clientToServer = 'M 702 236 C 702 150, 508 112, 486 52 L 418 52 C 396 112, 278 150, 278 236'
// probes on direct candidates
const probe = 'M 688 300 C 580 332, 450 322, 350 292'
const reply = 'M 344 272 C 460 300, 580 314, 664 304'
</script>

<template>
  <Stage>
    <NetZone :x="A.lanZone.x" :y="A.lanZone.y" :w="A.lanZone.w" :h="A.lanZone.h" label="at home" />
    <NetZone :x="A.goZone.x" :y="A.goZone.y" :w="A.goZone.w" :h="A.goZone.h" label="out and about" />

    <NetLaptop :x="A.laptop.x" :y="A.laptop.y" label="192.168.1.101" />
    <NetRouter :x="A.router.x" :y="A.router.y" label="203.0.113.20" />
    <NetTower :x="A.tower.x" :y="A.tower.y" :arcs="3" arc-color="#16a34a" label="cell tower" />
    <NetPhone :x="A.phoneCell.x" :y="A.phoneCell.y" color="#16a34a" label="phone" label-color="#15803d" />
    <NetWire :d="W.laptopLink" color="#2563eb" />
    <NetWire :d="W.cellLink" color="#16a34a" />

    <!-- the relayed connection — alive through step 4, idle once direct works -->
    <g v-click="[0, 5]">
      <NetRelay :x="A.relay.x" :y="A.relay.y" />
      <NetWire :d="W.upLink" color="#2563eb" width="2" />
      <NetWire :d="W.downLink" color="#2563eb" width="2" />
    </g>
    <g v-click="5">
      <NetRelay :x="A.relay.x" :y="A.relay.y" dim />
      <NetWire :d="W.upLink" color="#aab2bd" width="1.2" />
      <NetWire :d="W.downLink" color="#aab2bd" width="1.2" />
    </g>

    <!-- step 1: server shares its other addresses via the live connection -->
    <g v-click="[1, 2]">
      <NetWire :d="serverToClient" color="#2563eb" opacity="0.55" arrow="blue" />
      <NetFrame
        :x="466" :y="126" :w="268" :h="40" :size="10.5"
        :lines="[
          { frame: 'ADD_ADDRESS', value: '203.0.113.20:2104' },
          { frame: 'ADD_ADDRESS', value: '192.168.1.101:2104' },
        ]"
      />
    </g>

    <!-- step 2: the client now knows where to poke -->
    <g v-click="[2, 5]">
      <NetBubble
        :x="536" :y="118" :w="256" :h="76" tail="right"
        color="#15803d" tint="#f0fdf4" title="candidates to try"
        :lines="['IP 1   203.0.113.20:2104', 'IP 2   192.168.1.101:2104  ✗ no route']"
      />
      <NetIpChip :x="560" :y="214" color="#2563eb" tint="#eff6ff" label="IP 1" />
      <NetIpChip :x="626" :y="214" color="#aab2bd" tint="#f4f4f5" label="IP 2" />
    </g>

    <!-- step 3: REACH_OUT via relay; PATH_CHALLENGE opens the phone-side state -->
    <g v-click="[3, 5]">
      <NetFrame
        :x="230" :y="150" :w="228" :h="40" :size="10.5"
        :lines="[
          { frame: 'REACH_OUT', value: 'IP 1' },
          { frame: 'REACH_OUT', value: 'IP 2' },
        ]"
      />
      <NetWire :d="clientToServer" color="#2563eb" opacity="0.4" arrow="blue" />
    </g>
    <g v-click="3">
      <NetWire :d="probe" color="#16a34a" dash="6 5" arrow="green" />
      <text x="762" y="326" text-anchor="middle" style="font-size:10.5px" fill="#15803d">opens state</text>
    </g>
    <g v-click="[3, 4]">
      <text x="500" y="352" text-anchor="middle" style="font-size:10.5px" fill="#15803d">
        PATH_CHALLENGE everywhere — outbound, so firewalls let it through
      </text>
    </g>

    <!-- step 4: the server answers through the freshly opened state -->
    <g v-click="[4, 5]">
      <NetWire :d="reply" color="#2563eb" dash="6 5" arrow="blue" />
      <text x="500" y="352" text-anchor="middle" style="font-size:10.5px" fill="#1d4ed8">
        PATH_CHALLENGE + PATH_RESPONSE replies pass the phone's open state
      </text>
    </g>

    <!-- step 5: direct! -->
    <g v-click="5">
      <NetWire :d="W.directLink" color="#2563eb" width="2.5" />
      <text x="328" y="270" style="font-size:15px" font-weight="bold" fill="#15803d">✓</text>
      <text x="652" y="318" style="font-size:15px" font-weight="bold" fill="#15803d">✓</text>
      <NetFrame
        :x="352" :y="392" :w="252" :h="34" :size="11"
        :lines="[{ frame: 'direct path', value: 'established ✓' }]"
      />
    </g>
  </Stage>
</template>
