<script setup lang="ts">
import Stage from './net/Stage.vue'
import NetPhone from './net/NetPhone.vue'
import NetLaptop from './net/NetLaptop.vue'
import NetWire from './net/NetWire.vue'
import NetFrame from './net/NetFrame.vue'
import NetBubble from './net/NetBubble.vue'

const laptop = { x: 300, y: 230 }
const phone = { x: 648, y: 210 }

const btArc = 'M 342 262 C 410 196, 560 186, 618 242'
const wfdArc = 'M 344 290 C 420 350, 540 350, 598 292'
</script>

<template>
  <Stage>
    <NetLaptop :x="laptop.x" :y="laptop.y" label="laptop" />
    <NetPhone :x="phone.x" :y="phone.y" color="#16a34a" label="phone" label-color="#15803d" />
    <text v-click.hide="2" x="470" y="420" text-anchor="middle" style="font-size:10.5px" fill="#a1a1aa">no router, no tower, no relay</text>

    <!-- step 1: bluetooth bootstrap -->
    <g v-click="1">
      <NetWire :d="btArc" color="#6366f1" dash="6 5" arrow="indigo" arrow-start />
      <!-- bluetooth rune -->
      <g transform="translate(480 200)">
        <circle r="12" fill="#eef2ff" stroke="#6366f1" stroke-width="1" />
        <path
          d="M 0 -7 L 4.5 -2.5 L -4.5 4.5 M 0 7 L 4.5 2.5 L -4.5 -4.5 M 0 -9 L 0 9"
          fill="none" stroke="#6366f1" stroke-width="1.3" stroke-linecap="round"
        />
      </g>
      <text x="480" y="172" text-anchor="middle" style="font-size:10.5px" fill="#6366f1">
        bluetooth: pair, exchange Wi-Fi Direct addresses
      </text>
    </g>

    <!-- step 2: Wi-Fi Direct link -->
    <g v-click="2">
      <NetWire :d="wfdArc" color="#2563eb" width="2.2" />
      <NetFrame
        :x="336" :y="356" :w="268" :h="34" :size="11"
        :lines="[{ frame: 'Wi-Fi Direct', value: 'fe80::…%wlan1' }]"
      />
      <text x="470" y="420" text-anchor="middle" style="font-size:10.5px" fill="#888">
        fun fact: this can need firewall punching, too!
      </text>
    </g>

    <!-- step 3: disclaimer -->
    <g v-click="3">
      <NetBubble
        :x="316" :y="60" :w="308" :h="66" tail="none"
        color="#d97706" tint="#fff7ed" title="experimental territory"
        :lines="['not in the official crates (yet)', 'a direct bluetooth custom transport exists!']"
      />
    </g>
  </Stage>
</template>
