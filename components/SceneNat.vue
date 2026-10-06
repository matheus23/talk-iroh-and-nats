<script setup lang="ts">
import Stage from './net/Stage.vue'
import NetLaptop from './net/NetLaptop.vue'
import NetRouter from './net/NetRouter.vue'
import NetServer from './net/NetServer.vue'
import NetWire from './net/NetWire.vue'
import NetFrame from './net/NetFrame.vue'
import NetNatCard from './net/NetNatCard.vue'
import NetPacket from './net/NetPacket.vue'

const laptop = { x: 120, y: 250 }
const router = { x: 330, y: 262 }
const dns = { x: 790, y: 70 }

const laptopLink = 'M 120 246 C 120 216, 262 240, 296 268'
const upLink = 'M 330 238 C 330 140, 640 150, 756 98'
</script>

<template>
  <Stage>
    <NetLaptop :x="laptop.x" :y="laptop.y" label="192.168.1.101" />
    <NetRouter :x="router.x" :y="router.y" label="203.0.113.20" sub="home router" />
    <NetServer :x="dns.x" :y="dns.y" label="1.1.1.1" ip="DNS" />

    <!-- idle links -->
    <NetWire :d="laptopLink" color="#aab2bd" />
    <NetWire :d="upLink" color="#aab2bd" dash="5 5" />

    <!-- step 1: the laptop dials out -->
    <g v-click="1">
      <NetWire :d="laptopLink" color="#2563eb" arrow="blue" />
      <g v-click.hide="4">
        <NetPacket :x="210" :y="238" />
        <NetFrame
            :x="88" :y="130" :w="222" :h="40" :size="10.5"
            :lines="[
            { frame: 'src', value: '192.168.1.101:12345' },
            { frame: 'dst', value: '1.1.1.1:53' },
            ]"
        />
      </g>
    </g>

    <!-- step 2: the router rewrites the packet -->
    <g v-click="2">
      <NetWire :d="upLink" color="#2563eb" arrow="blue" />
      <NetPacket :x="560" :y="132" />
      <g v-click.hide="4">
        <NetFrame
            :x="430" :y="76" :w="222" :h="40" :size="10.5"
            :lines="[
            { frame: 'src', value: '203.0.113.20:6543' },
            { frame: 'dst', value: '1.1.1.1:53' },
            ]"
        />
      </g>
    </g>

    <!-- step 3: the router remembers the mapping -->
    <g v-click="[3,4]">
      <NetNatCard
        :x="196" :y="332" :w="272"
        :rows="[{ ext: '203.0.113.20:6543', int: '192.168.1.101:12345' }]"
      />
    </g>

    <!-- step 4: the reply finds its way back -->
    <g v-click="5">
        <NetFrame
          :x="430" :y="76" :w="222" :h="40" :size="10.5"
          :lines="[
            { frame: 'src', value: '1.1.1.1:53' },
            { frame: 'dst', value: '203.0.113.20:6543' },
          ]"
        />
    </g>

    <g v-click="6">
        <NetPacket :x="210" :y="238" />
        <NetFrame
            :x="88" :y="130" :w="222" :h="40" :size="10.5"
            :lines="[
            { frame: 'src', value: '1.1.1.1:53' },
            { frame: 'dst', value: '192.168.1.101:12345' },
            ]"
        />
    </g>
  </Stage>
</template>
