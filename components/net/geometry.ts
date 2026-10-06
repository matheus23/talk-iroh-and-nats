/**
 * Shared palette and stage geometry for the deck's network scenes.
 *
 * The visual language follows the iroh illustration style (see
 * iroh.computer animations): light canvas, `#eee` device bodies with
 * 1.5px line strokes, amber LEDs, Space Mono labels, red ✕ for drops,
 * green checks for success. Endpoints carry an identity color.
 */
export const C = {
  // hardware / infrastructure
  device: '#eee',
  line: '#888',
  hair: '#9ca3af',
  idle: '#aab2bd',
  dim: '#b4bac4',
  paper: '#fff',
  ink: '#111',

  // identity colors
  indigo: '#6366f1', // generic endpoint / theme identity
  blue: '#2563eb', // laptop + data paths
  blueInk: '#1d4ed8',
  green: '#16a34a', // phone
  greenInk: '#15803d',
  amber: '#d97706', // LEDs, iroh badges
  red: '#dc2626', // drops, errors
  greenOk: '#15803d', // checks

  // tints
  tintIndigo: '#eef2ff',
  tintBlue: '#eff6ff',
  tintGreen: '#f0fdf4',
  tintAmber: '#fff7ed',

  // callout frame boxes (QUIC frames, code chips)
  frameBg: '#e5e7eb',
  frameBorder: '#9ca3af',
} as const

/** Canonical 940×460 stage used by all scenes. */
export const STAGE = {
  w: 940,
  h: 460,
} as const

/**
 * Anchor points shared across scenes so the cast always lives in
 * the same place. Coordinates are the *origin* of each glyph
 * (top-center for devices/infra, ground point for the tower).
 */
export const A = {
  // home network (bottom-left)
  lanZone: { x: 18, y: 190, w: 352, h: 252 },
  laptop: { x: 96, y: 246 },
  router: { x: 278, y: 258 },
  phoneHome: { x: 160, y: 236 },

  // mobile side (bottom-right)
  goZone: { x: 640, y: 190, w: 284, h: 252 },
  tower: { x: 702, y: 362 },
  phoneCell: { x: 840, y: 250 },

  // cloud band (top)
  relay: { x: 452, y: 40 },
  relay2: { x: 620, y: 40 },
  server: { x: 858, y: 58 },
  dns1: { x: 664, y: 58 },
  dns2: { x: 856, y: 58 },
} as const

export type Pt = { x: number, y: number }

/**
 * Shared wire paths so the remote-stage scenes (fanout / relay /
 * hole-punching / paths) all draw exactly the same topology.
 */
export const W = {
  /** laptop -> router (LAN leg) */
  laptopLink: 'M 96 244 C 96 214, 208 236, 248 266',
  /** router -> relay (up the internet) */
  upLink: 'M 278 240 C 278 150, 396 112, 418 52',
  /** relay -> tower (down the internet) */
  downLink: 'M 486 52 C 508 112, 702 150, 702 246',
  /** phone -> tower (radio hop) */
  cellLink: 'M 816 258 Q 762 246 724 262',
  /** router -> relay2 */
  upLink2: 'M 296 240 C 350 140, 540 100, 594 48',
  /** tower -> relay2 */
  downLink2: 'M 702 246 C 702 160, 664 110, 650 56',
  /** direct path once punched (router <-> tower through the open state) */
  directLink: 'M 314 278 C 450 320, 560 338, 668 322',
} as const

/** translate+scale transform string for glyph placement */
export function tf(x: number, y: number, s = 1) {
  return s === 1 ? `translate(${x} ${y})` : `translate(${x} ${y}) scale(${s})`
}
