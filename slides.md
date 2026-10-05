---
theme: default
title: We have QUIC at home
drawings: false
---

## Intro

- Hi I'm Philipp Pohl-Krüger ✌️ (@matheus23.com on bluesky)
- I work for number0.computer - we make iroh.computer
- we're folks with backgrounds in "distributed web stuff working"

<!--
- I'm Philipp - work at number 0, we make iroh
- number 0: largely from similar background trying to get distributed web stuff working
- quest to get peer-to-peer to work well since founding
- initially focused on other things besides connections
- built IPFS implementation back then!
- realized we needed to focus on mostly one thing:
- establishing and keeping a good connection between any two devices.
-->

## Computers talking to each other

```rust
let connection = TcpStream::connect("<IP address>".parse()?).await?;
```

- yay streaming!
- yay bidirectional!
- yay reliable!
- yay congestion controlled!

<!--
- So you want to talk to another computer. We do this all the time!
- You do the most common thing: `TcpStream::connect` with an IP address
	- you can now send arbitrary data back and forth
	- streaming!
	- bidirectionally!
	- it's reliable!
	- it has congestion control!
- You're happy
-->

## Computers talking to each other?

- drawing of phone and server, and router and cellular tower
- click: add connection via router
- click: phone connects to cellular tower instead
- old connection shown on the router, now broken

<!--
- Now, turns out you used your phone to connect to another computer
- The connection was live, but you went outside and your phone switched from Wifi to Cellular.
- Oops! The connection is broken. Why?
- A computer can have many TCP connections alive simultaneously at any point in time. And if an IP packet makes it to your server, which connection should it be associated with? Well - you'd use the address and port number to figure it out!
	- We say "TCP connections are identified by four-tuple: (one end IP address, one end port, other end IP address, other end port)"
- So what do we do?
-->

## Keeping alive connections

Notes:
- We could re-dial another TCP connection on the phone, once we realize we moved
	- need to figure out that we moved (this can be trickier than you'd think!)
	- needs another TCP handshake
	- and depending on how you do it, often also another handshake for encryption (ouch)
	- Might be a hiccup for 1-3 seconds or more.
	- Hard to know which data went lost and which data didn't!
		- This is probably the trickiest thing
- We could drop down to a "connectionless" protocol: UDP
	- But now you loose a lot of nice things TCP gives you:
		- reliability (retransmit lost data?)
		- deduplication (realize some data was accidentally duplicated)
		- congestion control (proactively *avoid* packet loss, make efficient use of resources)
			- notoriously complex! very active research area, lots of exciting things happening all the time

## Better adopt QUIC!

Notes:
- Don't reinvent the wheel - once upon a time Google already did the work of building upon UDP, back then they called it "SPDY" ("speedy")
	- They took it to the IETF to get it standardized and that turned into QUIC with a lot of work from others who also adopted it
- You call `Endpoint::connect` with an IP addr and port
- You get a `Connection`, and on that can call `Connection::open_bi` to get as many tcp-like "bidirectional streams" as you want. It's great!
- QUIC can prefix all your datagrams with a "connection ID" so it can survive changes to your four-tuple!
	- This is called "connection migration" and it's really really useful!
- Handles congestion control, retransmission, and even encryption for you!

## Can we talk to any computer?

Notes:
- Until now we've run our server "in the cloud"
	- more like, "with a public IP address" and "with an open port configured in our firewall"
- But what if I want to connect to my server at home?
	- In theory over the internet, *all of the computers connected to it* can talk to each other!
		- That's actually mind-blowing!
	- But we only ever think of "talking to the cloud". Our personal devices are always assumed to be clients, and we assume that they can only talk via a middleman "a website"/"a server".
		- That's a bummer :(
- Let's say my phone is in my local network, the connection might even work!
- But when I go touch grass again, my phone switches to cellular and the connection breaks. QUIC or not.
	- That's due to NAT and firewalls.

## Global addressing?

Notes:
- When we ran our server at home, which address did we use?
- Say we called `Endpoint::bind(0.0.0.0:0)`, which means "listen on any local interface, allow network traffic" (as opposed to e.g. `Endpoint::bind(127.0.0.1)`.)
	- Then asking `Endpoint::local_addr` gives you `0.0.0.0:12345`, which is not helpful. But hey at least we got the actual port!
	- `ip addr show` gives you the IP addresses of your interfaces... maybe look at the Wifi one? It shows `192.168.1.101`. This is what connecting to worked for at home.
		- As many of you probably know, the `192.168.*.*` prefix is common net prefix for home networks.
	- But it's not the global address!

## NATs

- diagram with laptop, router, and 1.1.1.1 DNS server
- packets going out & in etc.
- show mapping table in the router

Notes:
- your device's address is not "globally unique" so to say
	- (we're short on IPv4 addrs)
	- Also allows for separating "global" from "local" access
- our server at home has a local address from its router like 192.168.1.101
- so what happens when it actually talks to something in the cloud?
- device dials 1.1.1.1
- IP packet with src: 192.168.1.101:12345 and dst: 1.1.1.1:53
- router has public IP 203.0.113.20
- IP packet gets translated with src: 203.0.113.20:6543
	- router remembers 203.0.113.20.6543 <-> 192.168.1.101:12345
- once 1.1.1.1 answers, the IP packet gets translated "back" on the router

## NATs

- clean version of previous diagram, with laptop, router and 1.1.1.1 DNS server
- add the 8.8.8.8 DNS server to the diagram
- another packet to the 8.8.8.8 server
- show question mark in router table

Notes:
- Question: if I later send to 8.8.8.8 from the same port, will that re-use the same port?
	- IT DEPENDS :) but mostly yes.
- There are two types of mapping:
	- EIM: no matter the destination IP address, once a mapping exists for an internal address-and-port, it will be used for incoming traffic.
	- ADM & APDM: mappings for local addresses exist for each outbound address
	- (Also called "Full-Cone or symmetric NAT" respectively)

## Firewalls

- same diagram as before, with both 1.1.1.1 and 8.8.8.8 on the slide
- there's a mapping for 1.1.1.1 as before
- now 8.8.8.8 sends a packet to the mapping for 1.1.1.1
- show question mark at router

Notes:
- Let's say we've sent a packet to 1.1.1.1, but then it's 8.8.8.8 that answers to us for some reason. The router is using EIM. Does the router allow the packet through?
	- Answer: IT DEPENDS! But mostly no.
- Filtering could be off
- or Address-Dependent-Filtering (ADF): 8.8.8.8 can't answer, but another port on 1.1.1.1 can
- or Address-and-Port-Dependent-Filtering (APDF): neither 8.8.8.8 nor another port on 1.1.1.1 can answer. Only 1.1.1.1:53 can.

## Talking to another computer with iroh

Notes:
- in light of all of this, how does iroh make it possible to talk to another computer?
- First, let's be modern and use QUIC
- So it's `Endpoint::connect`

## Identifying another device

- First show `Endpoint::connect(<IP address>)`
	- IP address is not unique!
	- Address might change!
	- -> Bad identifier for "a thing to talk to"
- Second show `Endpoint::connect(device0.example.com)`
	- Show a "network split"
	- Show a central registry, unavailable to both (WAN connection broken)
	- But the devices should be able to talk to each other still!
- Then show `Endpoint::connect(<public key>)`
	- Ed25519 public key, usually hex encoded
	- Collisions are impossibly unlikely
	- Doubles as key for authenticated encryption
	- Finding the name can be difficult/app specific

Notes:
- first: how do we identify the other side?
	- we established that a single IP address might not be enough or even change!
	- if we use a name e.g. domain name, we need a central registry to ensure we don't accidentally re-use the same name when one side is offline
	- we want to work, even if WAN is unavailable, but LAN allows connecting two nodes.
	- so we use a public key to identify another device!
- `Endpoint::connect(<public key>)`
	- we call these "Endpoint ID"
	- are just Ed25519 public keys, usually hex-encoded
	- works in a network split
	- gives us authenticated encryption, too
	- figuring out the name to talk to another device is difficult. you can't expect a human to memorize it. It's very application-dependent. Some cases:
		- scan via QR code
		- TOFU via local-only (e.g. bluetooth/mDNS/nfc)
		- central registry for your app (database with user account to devices EndpointId mappings)
			- could also use something like the AT protocol(!)

## Sending "to a public key"

- Resolve `EndpointId` to IP address "candidates" via `AddessLookup`
	- Pluggable trait for finding addressing information
- Various implementations:
	- Central server publishing *signed* addressing records (most popular)
	- mDNS gossiping addressing in LAN
	- gossip protocol among currently connected peers
	- anything: bluetooth, LoRa, unix domain sockets
- Send to all (or best couple of) candidates at once!
	- duplicate first datagram with different IPs
	- first answering datagram becomes first "remote address"

Notes:
- still need to actually send UDP packets. That means IP addresses
- 

## Still need to deal with Firewalls

- diagram of phone, laptop, router & cellular tower
	- phone is connected to cellular tower, laptop to router
- phone shows `Endpoint::connect(<laptop EndpointId>)`
- one UDP datgram, sent to two destinations: 192.168.1.101:12345 and 203.0.113.20:6543
	- cellular tower rejects 192.* (no route)
	- router rejects 203.* (firewall closed)

Notes:
- 

## Relays!

- same diagram as before, but now with relay.
- phone and laptop show active connection to relay
- highlight the established relay path

Notes:
- we use relays to bootstrap these connections
- relay connections are just HTTP 1.1 with websockets
	- probably most reliable option for "any kind of connectivity" in the internet and various corporate environments, hotels, etc.
- we send UDP datagrams via websocket messages and they're relayed to the recipient by the relay
- relays are also how endpoints figure out their own IP address
- but we try to switch from relayed to direct traffic as soon as possible
- to get through firewalls, we use "hole-punching"

## Hole-punching

- same diagram as before, with the relay
- show ADD_ADDRESS frames sent via relay for server side
- show client accumulating a list of addresses for the server, then hide ADD_ADDRESS frames again
- show client sending REACH_OUT frames via relay with its own addresses
- also show client sending PATH_CHALLENGE on non-relay paths
	- show how this opens the firewall in the cellular tower
- hide these again, but keep the open firewall info
- show PATH_CHALLENGE from server (as response to REACH_OUT) opening the router firewall and making it through the cellular tower firewall
- show the client responding with PATH_CHALLENGE again as well as PATH_RESPONSE
- then show server responding with PATH_RESPONSE finally
(don't show actual IP addrs in this diagram, maybe just resort to green and blue color codings for phone/laptop, and use blue-coded circles for IP addrs or just sth like "IP 1" in green/blue and "IP 2" etc.)

Notes:
- to ensure both sides know the addresses that should be tried for hole-punching, we share them via the live connection
- when a connection is established, we immediately send ADD_ADDRESS frames from the server side to the client to inform it about "other addresses" that the server could be reachable under
	- these frames are QUIC-level control frames that live in a "separate namespace" to application traffic so to say. They're prioritized over all application traffic
- the client then initiates hole-punching
	- sends REACH_OUT frames with its own addresses
	- simultaneously sends PATH_CHALLENGE frames to the server addresses
	- this opens firewall ports due to outbound traffic in the cellular tower (so a server can answer)
- the server recieves the REACH_OUTs via the relay, then ... etc.

## Paths

- same diagram as before, but now highlight both "paths"
	- one over the relay
	- one direct
- each path has its own congestion controller, its own RTT estimator
- show relay being gone, path breaking
- show another relay coming back online, both peers switching, and the another relay path being established
- show laptop router NAT being rebound, thus direct path breaking
- show new path being re-established later

Notes:
- We use QUIC multipath, which means we don't "migrate" between relay and direct, we *keep both alive at the same time*
- This means each path has its own congestion controller, loss stats and RTT estimator.
	- instead of this state having to be re-derived every time we need these paths again
- it means if one path breaks, we can quickly switch to antoher path that's still "warm"
- e.g. if our relay path breaks, we can detect so early, and dial another relay instead and establish a path in the background while the direct path keeps working normally
- or if the laptop router's NAT is rebound, we can quickly fall back to the relay, while we coordinate hole-punching another direct path again

## Paths: more direct

- same diagram as before, but this time, no relay connectivity
	- but laptop and phone are under same router
- exchange information about endpoints via mDNS with the router
	- -> show a direct connection again

## Paths: even more direct

- diagram with just phone and laptop
- show bluetooth connection between them
	- exchange information about Wifi Direct addresses between them
- show connection via Wifi Direct being established
	- Fun fact: Can also need Firewall ports to be opened!
- Disclaimer: Experimental, not official crates that support this yet, and it needs iroh changes
- But: Direct bluetooth custom transport exists!

## Cool, what can we do with this?

- Connect any computers in the world, and maintain connections
- Relays are cheap to operate
	- 95-98% of bytes sent between Endpoints ends up sent directly
- Relays are identified by URL
	- Self-host them
	- Also: Endpoints can "discover" each other's relay URL and connect to each other

## Demo

Notes:
- Show I've set up "pigeons" on my machine
- Show `~/.ssh/config`
- Open zed on my laptop to connect remotely to my home machine

## Other things

- Images from RustConf this year with raspberry Pi camera feed
- Show Mesh-LLM project
- Show recent game posted in `#showcase`

## Thank you

- Hope you enjoyed this journey through NATs and firewalls
- See you in discord! `iroh.computer/discord`
- Go to `iroh.computer` for more info
- Eager to see what cool stuff you can build with iroh!
