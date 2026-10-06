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

const relayConn = 'M 278 240 C 278 150, 396 112, 418 52 L 486 52 C 508 112, 702 150, 702 246'
// probes on direct candidates
const probe = 'M 688 300 C 580 332, 450 322, 350 292'
const reply = 'M 344 272 C 460 300, 580 314, 664 304'
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

    <g>
        <NetRelay :x="A.relay.x" :y="A.relay.y" />
        <NetWire :d="W.upLink" color="#aab2bd" dash="5 5" />
        <NetWire :d="W.downLink" color="#aab2bd" dash="5 5" />
        <text x="452" y="24" text-anchor="middle" style="font-size:10.5px" fill="#888">
          wss://euc1-1.relay.n0.iroh.link/relay
        </text>
    </g>

    <g v-click="1" v-click.hide="2">
        <NetBubble
          :x="536" :y="142" :w="300" :h="68" tail="right"
          color="#15803d" tint="#f0fdf4" title="endpoint.connect(<laptop EndpointId>)"
          :lines="[
            'lookup gives candidates:',
            'Relay wss://euc1-1.relay.n0.iroh.link/relay'
          ]"
        />
    </g>

    <g v-click="2">
      <NetWire :d="relayConn" color="#2563eb" arrow="blue" />
    </g>

    <g v-click="[3]">
        <NetFrame
          :x="226" :y="126" :w="228" :h="40" :size="10.5"
          :lines="[
            { frame: 'ADD_ADDRESS', value: '203.0.113.20:6543' },
            { frame: 'ADD_ADDRESS', value: '192.168.1.101:12345' },
          ]"
        />
    </g>

    <g v-click="[5]">
      <NetFrame
        :x="500" :y="150" :w="228" :h="40" :size="10.5"
        :lines="[
          { frame: 'REACH_OUT', value: '<cell tower IP:port>' },
          { frame: 'REACH_OUT', value: '<local IP:port>' },
        ]"
      />
    </g>

    <g v-click="7">
        <NetNatCard
          title="Firewall state"
          :x="196" :y="336" :w="224"
          :rows="[
            { ext: '<relay IP:port> open'},
            { ext: '<cell tower IP:port> closed' },
          ]"
        />

        <NetNatCard
          title="Firewall state"
          :x="600" :y="370" :w="224"
          :rows="[
            { ext: '<relay IP:port> open'},
            { ext: '203.0.113.20:6543 closed' },
          ]"
        />
    </g>

    <g v-click="[8]">
        <NetWire :d="W.directLink" color="#aab2bd" dash="5 5" />
        <NetX :x="668" :y="322" />
        <NetFrame
          :x="420" :y="280" :w="232" :h="22" :size="10.5"
          :lines="[
            { frame: 'PATH_CHALLENGE', value: '<random values 1>' },
          ]"
        />
    </g>

    <g v-click="8">
        <NetNatCard
          title="Firewall state"
          :x="196" :y="336" :w="224"
          :rows="[
            { ext: '<relay IP:port> open'},
            { ext: '<cell tower IP:port> open!' },
          ]"
        />
    </g>

    <g v-click="[10]">
        <NetFrame
          :x="420" :y="280" :w="232" :h="22" :size="10.5"
          :lines="[
            { frame: 'PATH_CHALLENGE', value: '<random values 2>' },
          ]"
        />
    </g>

    <g v-click="10">
        <NetWire :d="W.directLink" color="#aab2bd" dash="5 5" />
        <NetNatCard
          title="Firewall state"
          :x="600" :y="370" :w="224"
          :rows="[
            { ext: '<relay IP:port> open'},
            { ext: '203.0.113.20:6543 open!' },
          ]"
        />
    </g>

    <g v-click="[12]">
        <NetFrame
          :x="420" :y="280" :w="232" :h="36" :size="10.5"
          :lines="[
            { frame: 'PATH_RESPONSE', value: '<random values 2>' },
            { frame: 'PATH_CHALLENGE', value: '<random values 3>' }
          ]"
        />
    </g>

    <g v-click="[14]">
        <NetFrame
          :x="420" :y="280" :w="232" :h="22" :size="10.5"
          :lines="[
            { frame: 'PATH_RESPONSE', value: '<random values 3>' }
          ]"
        />
    </g>

    <g v-click="15">
        <NetWire :d="W.directLink" color="#2563eb" />
    </g>
  </Stage>
</template>
