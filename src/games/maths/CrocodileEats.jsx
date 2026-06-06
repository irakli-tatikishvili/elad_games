import { useState, useCallback, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import SuccessKid from '../../components/SuccessKid'
import './CrocodileEats.css'

const TOTAL_ROUNDS = 6
// Weighted: barefoot most common, then shoes, then skateboard
const ACCS = ['none', 'none', 'none', 'shoes', 'shoes', 'skateboard', 'bicycle']

function pickRound(n) {
  const max = n <= 3 ? 9 : 20
  let a, b
  do {
    a = 1 + Math.floor(Math.random() * max)
    b = 1 + Math.floor(Math.random() * max)
  } while (a === b)
  return { left: a, right: b }
}
const pickAcc    = () => ACCS[Math.floor(Math.random() * ACCS.length)]
const pickWalkMs = () => 2500 + Math.floor(Math.random() * 2000) // 2.5 – 4.5 s

/* ── Decorative weeds ── */
function WeedSVG({ flip, className }) {
  return (
    <svg viewBox="0 0 32 100" fill="none" className={className}
      style={flip ? { transform: 'scaleX(-1)' } : undefined}>
      <path d="M16 100 Q13 70 19 48 Q15 28 13 8"
        stroke="#2E7D32" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <ellipse cx="13" cy="9" rx="7" ry="13" fill="#388E3C" opacity="0.9" />
      <path d="M19 52 Q28 44 24 34"
        stroke="#43A047" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <ellipse cx="26" cy="30" rx="6" ry="9" fill="#43A047" opacity="0.75" />
      <path d="M15 34 Q5 26 9 16"
        stroke="#43A047" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <ellipse cx="7" cy="13" rx="5" ry="8" fill="#43A047" opacity="0.75" />
    </svg>
  )
}

/* ── Front-facing crocodile (question phase — faces the player) ── */
function CrocodileFrontSVG({ accessory = 'none' }) {
  const hasSkateboard = accessory === 'skateboard'
  const hasShoes      = accessory === 'shoes'
  const hasBicycle    = accessory === 'bicycle'
  // Taller viewBox to fit bicycle wheel below feet
  const vb = hasBicycle ? '0 0 200 298' : '0 0 200 280'
  return (
    <svg viewBox={vb} fill="none" className="ce-croc-svg">
      <defs>
        <linearGradient id="cf-body" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFB74D" />
          <stop offset="100%" stopColor="#E65100" />
        </linearGradient>
        <linearGradient id="cf-belly" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#E3F2FD" />
          <stop offset="100%" stopColor="#90CAF9" />
        </linearGradient>
        <linearGradient id="cf-eye" x1="20%" y1="10%" x2="80%" y2="90%">
          <stop offset="0%" stopColor="#E3F2FD" />
          <stop offset="100%" stopColor="#64B5F6" />
        </linearGradient>
      </defs>

      {/* Dorsal spikes */}
      <polygon points="88,4 100,0 112,4 109,16 91,16"  fill="#1565C0" stroke="#0D47A1" strokeWidth="1.5" />
      <polygon points="90,20 100,15 110,20 108,31 92,31" fill="#1976D2" stroke="#0D47A1" strokeWidth="1.5" />
      <polygon points="92,34 100,29 108,34 106,44 94,44" fill="#42A5F5" stroke="#0D47A1" strokeWidth="1.5" />

      {/* Eye bump platforms */}
      <circle cx="52"  cy="52" r="31" fill="url(#cf-body)" stroke="#0D47A1" strokeWidth="3" />
      <circle cx="148" cy="52" r="31" fill="url(#cf-body)" stroke="#0D47A1" strokeWidth="3" />

      {/* Main head */}
      <ellipse cx="100" cy="90" rx="90" ry="57" fill="url(#cf-body)" stroke="#0D47A1" strokeWidth="3" />

      {/* Eyebrows */}
      <path d="M 26 30 Q 52 16 76 26"   stroke="#0D47A1" strokeWidth="5.5" strokeLinecap="round" fill="none" />
      <path d="M 124 26 Q 148 16 174 30" stroke="#0D47A1" strokeWidth="5.5" strokeLinecap="round" fill="none" />

      {/* Eyeballs */}
      <circle cx="52"  cy="48" r="22" fill="url(#cf-eye)" stroke="#0D47A1" strokeWidth="2.5" />
      <circle cx="148" cy="48" r="22" fill="url(#cf-eye)" stroke="#0D47A1" strokeWidth="2.5" />
      <circle cx="55"  cy="46" r="13" fill="#0D47A1" />
      <circle cx="151" cy="46" r="13" fill="#0D47A1" />
      <circle cx="63"  cy="39" r="6.5" fill="white" />
      <circle cx="159" cy="39" r="6.5" fill="white" />
      <circle cx="52"  cy="53" r="3"   fill="rgba(255,255,255,0.55)" />
      <circle cx="148" cy="53" r="3"   fill="rgba(255,255,255,0.55)" />

      {/* Blush */}
      <ellipse cx="24"  cy="84" rx="15" ry="11" fill="#FF8A65" opacity="0.32" />
      <ellipse cx="176" cy="84" rx="15" ry="11" fill="#FF8A65" opacity="0.32" />

      {/* Snout */}
      <path d="M 58 124 Q 56 192 100 204 Q 144 192 142 124 Z"
        fill="url(#cf-body)" stroke="#0D47A1" strokeWidth="2.5" />
      <path d="M 70 126 Q 68 185 100 196 Q 132 185 130 126 Z"
        fill="url(#cf-belly)" opacity="0.88" />
      <path d="M 76 147 Q 100 151 124 147" stroke="#90CAF9" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M 73 168 Q 100 172 127 168" stroke="#90CAF9" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M 74 188 Q 100 191 126 188" stroke="#90CAF9" strokeWidth="1.8" fill="none" strokeLinecap="round" />

      {/* Nostrils */}
      <ellipse cx="83"  cy="138" rx="11" ry="9" fill="#1976D2" stroke="#0D47A1" strokeWidth="2" />
      <ellipse cx="117" cy="138" rx="11" ry="9" fill="#1976D2" stroke="#0D47A1" strokeWidth="2" />
      <ellipse cx="83"  cy="137" rx="5.5" ry="4.5" fill="#0D47A1" />
      <ellipse cx="117" cy="137" rx="5.5" ry="4.5" fill="#0D47A1" />

      {/* Grin + teeth */}
      <path d="M 60 170 Q 100 202 140 170" stroke="#0D47A1" strokeWidth="3" fill="none" strokeLinecap="round" />
      <polygon points="67,170 71,158 75,170"   fill="white" stroke="#90CAF9" strokeWidth="1.2" />
      <polygon points="83,177 87,164 91,177"   fill="white" stroke="#90CAF9" strokeWidth="1.2" />
      <polygon points="98,180 102,167 106,180" fill="white" stroke="#90CAF9" strokeWidth="1.2" />
      <polygon points="113,177 117,164 121,177" fill="white" stroke="#90CAF9" strokeWidth="1.2" />
      <polygon points="129,170 133,158 137,170" fill="white" stroke="#90CAF9" strokeWidth="1.2" />

      {/* Arms */}
      <path d="M 18 150 Q 6 135 12 116 Q 26 108 44 120 Q 34 130 18 150 Z"
        fill="url(#cf-body)" stroke="#0D47A1" strokeWidth="2.5" />
      <path d="M 182 150 Q 194 135 188 116 Q 174 108 156 120 Q 166 130 182 150 Z"
        fill="url(#cf-body)" stroke="#0D47A1" strokeWidth="2.5" />

      {/* Body base */}
      <ellipse cx="100" cy="218" rx="50" ry="20" fill="url(#cf-body)" stroke="#0D47A1" strokeWidth="2" />

      {/* Stubby legs */}
      <rect x="66" y="230" width="26" height="24" rx="9" fill="url(#cf-body)" stroke="#0D47A1" strokeWidth="2" />
      <rect x="108" y="230" width="26" height="24" rx="9" fill="url(#cf-body)" stroke="#0D47A1" strokeWidth="2" />

      {/* Bare claws */}
      {!hasShoes && !hasSkateboard && !hasBicycle && (
        <>
          <path d="M 70 253 Q 66 262 68 267" stroke="#0D47A1" strokeWidth="2.2" strokeLinecap="round" fill="none" />
          <path d="M 79 254 Q 79 263 80 268" stroke="#0D47A1" strokeWidth="2.2" strokeLinecap="round" fill="none" />
          <path d="M 88 253 Q 90 262 90 267" stroke="#0D47A1" strokeWidth="2.2" strokeLinecap="round" fill="none" />
          <path d="M 112 253 Q 108 262 110 267" stroke="#0D47A1" strokeWidth="2.2" strokeLinecap="round" fill="none" />
          <path d="M 121 254 Q 121 263 122 268" stroke="#0D47A1" strokeWidth="2.2" strokeLinecap="round" fill="none" />
          <path d="M 130 253 Q 132 262 132 267" stroke="#0D47A1" strokeWidth="2.2" strokeLinecap="round" fill="none" />
        </>
      )}

      {/* Shoes */}
      {hasShoes && (
        <>
          <ellipse cx="79" cy="258" rx="21" ry="10" fill="#FF5252" stroke="#B71C1C" strokeWidth="2" />
          <ellipse cx="121" cy="258" rx="21" ry="10" fill="#FF5252" stroke="#B71C1C" strokeWidth="2" />
          {/* Laces */}
          <path d="M 71 255 L 87 255" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <path d="M 113 255 L 129 255" stroke="white" strokeWidth="2" strokeLinecap="round" />
          {/* Toe cap */}
          <ellipse cx="90" cy="258" rx="7" ry="7" fill="#E53935" opacity="0.5" />
          <ellipse cx="132" cy="258" rx="7" ry="7" fill="#E53935" opacity="0.5" />
        </>
      )}

      {/* Skateboard */}
      {hasSkateboard && (
        <g>
          <rect x="36" y="252" width="128" height="11" rx="5.5" fill="#8B4513" stroke="#5D2E0A" strokeWidth="1.5" />
          <rect x="38" y="252" width="124" height="5" rx="2" fill="#A0522D" opacity="0.4" />
          <rect x="60" y="253" width="80" height="5" rx="2" fill="#FDD835" opacity="0.65" />
          <rect x="46"  y="262" width="30" height="5" rx="2.5" fill="#9E9E9E" stroke="#757575" strokeWidth="0.8" />
          <rect x="124" y="262" width="30" height="5" rx="2.5" fill="#9E9E9E" stroke="#757575" strokeWidth="0.8" />
          <circle cx="56"  cy="270" r="7" fill="#212121" stroke="#424242" strokeWidth="1" />
          <circle cx="74"  cy="270" r="7" fill="#212121" stroke="#424242" strokeWidth="1" />
          <circle cx="126" cy="270" r="7" fill="#212121" stroke="#424242" strokeWidth="1" />
          <circle cx="144" cy="270" r="7" fill="#212121" stroke="#424242" strokeWidth="1" />
          <circle cx="56"  cy="270" r="3" fill="#555" />
          <circle cx="74"  cy="270" r="3" fill="#555" />
          <circle cx="126" cy="270" r="3" fill="#555" />
          <circle cx="144" cy="270" r="3" fill="#555" />
        </g>
      )}

      {/* Bicycle (front view) */}
      {hasBicycle && (
        <g>
          {/* Fork legs */}
          <line x1="86"  y1="252" x2="80"  y2="272" stroke="#FF7043" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="114" y1="252" x2="120" y2="272" stroke="#FF7043" strokeWidth="3.5" strokeLinecap="round" />
          {/* Stem */}
          <line x1="100" y1="242" x2="100" y2="252" stroke="#555" strokeWidth="3" strokeLinecap="round" />
          {/* Handlebars */}
          <line x1="58"  y1="238" x2="142" y2="238" stroke="#333" strokeWidth="3.5" strokeLinecap="round" />
          <ellipse cx="58"  cy="238" rx="9" ry="6" fill="#333" />
          <ellipse cx="142" cy="238" rx="9" ry="6" fill="#333" />
          {/* Bell */}
          <circle cx="125" cy="232" r="5" fill="#FDD835" stroke="#F9A825" strokeWidth="1.5" />
          {/* Front wheel */}
          <circle cx="100" cy="274" r="22" fill="none" stroke="#1565C0" strokeWidth="3.5" />
          {/* Spokes */}
          <line x1="100" y1="252" x2="100" y2="296" stroke="#90CAF9" strokeWidth="1.5" />
          <line x1="78"  y1="274" x2="122" y2="274" stroke="#90CAF9" strokeWidth="1.5" />
          <line x1="84"  y1="258" x2="116" y2="290" stroke="#90CAF9" strokeWidth="1.5" />
          <line x1="116" y1="258" x2="84"  y2="290" stroke="#90CAF9" strokeWidth="1.5" />
          {/* Hub */}
          <circle cx="100" cy="274" r="5" fill="#1565C0" />
        </g>
      )}
    </svg>
  )
}

/* ── Walking crocodile (closed mouth, animated legs, accessories) ── */
// Default faces RIGHT. Parent wrapper applies scaleX(-1) to face LEFT.
function CrocodileWalkSVG({ accessory = 'none', walking = false }) {
  const svgCls = `ce-croc-svg${walking ? ' ce-walking' : ''}`
  const hasSkateboard = accessory === 'skateboard'
  const hasShoes      = accessory === 'shoes'
  const hasBicycle    = accessory === 'bicycle'

  return (
    <svg viewBox="0 0 268 205" fill="none" className={svgCls}>
      <defs>
        <linearGradient id="cw-body" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFB74D" />
          <stop offset="100%" stopColor="#E65100" />
        </linearGradient>
        <linearGradient id="cw-belly" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#E3F2FD" />
          <stop offset="100%" stopColor="#90CAF9" />
        </linearGradient>
        <linearGradient id="cw-eye" x1="10%" y1="10%" x2="90%" y2="90%">
          <stop offset="0%" stopColor="#E3F2FD" />
          <stop offset="100%" stopColor="#64B5F6" />
        </linearGradient>
      </defs>

      {/* TAIL */}
      <path d="M 6 148 Q 30 120 56 112 Q 40 134 52 154 Q 30 157 6 150 Z"
        fill="url(#cw-body)" stroke="#0D47A1" strokeWidth="2" />
      <polygon points="6,148 2,152 7,161 16,153 10,147" fill="#1565C0" stroke="#0D47A1" strokeWidth="1.5" />

      {/* BACK LEG (animated group) */}
      <g className="ce-leg-back">
        <path d="M 52 120 Q 44 142 36 152 Q 43 154 50 148 Q 55 154 62 148 Q 67 154 74 148 Q 78 152 76 120 Z"
          fill="url(#cw-body)" stroke="#0D47A1" strokeWidth="2" />
        {!hasSkateboard && !hasBicycle && (
          <>
            <path d="M 36 152 Q 31 162 34 168" stroke="#0D47A1" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M 50 154 Q 48 165 51 170" stroke="#0D47A1" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M 63 153 Q 64 164 66 169" stroke="#0D47A1" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M 75 150 Q 78 161 79 166" stroke="#0D47A1" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          </>
        )}
        {hasShoes && (
          <ellipse cx="55" cy="157" rx="24" ry="10"
            fill="#FF5252" stroke="#B71C1C" strokeWidth="2" />
        )}
      </g>

      {/* FRONT LEG (animated group) */}
      <g className="ce-leg-front">
        <path d="M 108 118 Q 100 140 90 150 Q 97 152 104 146 Q 109 152 116 146 Q 121 152 128 146 Q 132 150 130 118 Z"
          fill="url(#cw-body)" stroke="#0D47A1" strokeWidth="2" />
        {!hasSkateboard && !hasBicycle && (
          <>
            <path d="M 90 151 Q 85 161 88 167" stroke="#0D47A1" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M 103 153 Q 101 164 104 169" stroke="#0D47A1" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M 116 152 Q 117 163 119 168" stroke="#0D47A1" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M 128 148 Q 131 159 132 164" stroke="#0D47A1" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          </>
        )}
        {hasShoes && (
          <ellipse cx="110" cy="155" rx="24" ry="10"
            fill="#FF5252" stroke="#B71C1C" strokeWidth="2" />
        )}
      </g>

      {/* MAIN BODY */}
      <ellipse cx="92" cy="84" rx="63" ry="37"
        transform="rotate(-16 92 84)"
        fill="url(#cw-body)" stroke="#0D47A1" strokeWidth="2.5" />

      {/* BELLY */}
      <ellipse cx="95" cy="93" rx="48" ry="23"
        transform="rotate(-16 95 93)"
        fill="url(#cw-belly)" opacity="0.85" />

      {/* Scale texture arcs */}
      <path d="M 60 90 Q 67 84 74 90" stroke="#E65100" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.45" />
      <path d="M 74 82 Q 81 76 88 82" stroke="#E65100" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.45" />
      <path d="M 88 76 Q 95 70 102 76" stroke="#E65100" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.45" />
      <path d="M 55 103 Q 62 97 69 103" stroke="#E65100" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.4" />

      {/* DORSAL SPIKES */}
      <polygon points="50,55 58,36 66,55"   fill="#1565C0" stroke="#0D47A1" strokeWidth="1.5" />
      <polygon points="70,49 79,28 88,49"   fill="#1976D2" stroke="#0D47A1" strokeWidth="1.5" />
      <polygon points="90,43 100,21 110,43" fill="#1565C0" stroke="#0D47A1" strokeWidth="1.5" />
      <polygon points="110,41 119,22 128,41" fill="#42A5F5" stroke="#0D47A1" strokeWidth="1.5" />

      {/* NECK */}
      <path d="M 147 50 Q 164 42 177 51 Q 167 78 147 82 Z"
        fill="url(#cw-body)" stroke="#0D47A1" strokeWidth="2" />

      {/* CLOSED SNOUT */}
      <path d="M 178 61 Q 240 50 264 64 Q 264 82 240 88 Q 200 93 178 82 Z"
        fill="url(#cw-body)" stroke="#0D47A1" strokeWidth="2" />
      {/* Closed mouth line */}
      <path d="M 178 72 Q 228 70 264 73"
        stroke="#0D47A1" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.55" />
      {/* Nostril bump */}
      <ellipse cx="258" cy="66" rx="7" ry="5" fill="#1976D2" stroke="#0D47A1" strokeWidth="1.5" />
      <ellipse cx="258" cy="66" rx="3.5" ry="2.5" fill="#0D47A1" />
      {/* Hint of teeth */}
      <path d="M 195 89 Q 225 93 250 89"
        stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.65" />

      {/* EYE on snout */}
      <circle cx="200" cy="59" r="14" fill="url(#cw-eye)" stroke="#0D47A1" strokeWidth="2" />
      <circle cx="203" cy="57" r="9"  fill="#0D47A1" />
      <circle cx="208" cy="52" r="4"  fill="white" />
      <circle cx="200" cy="66" r="2"  fill="rgba(255,255,255,0.5)" />
      {/* Eyebrow */}
      <path d="M 189 49 Q 201 43 213 49"
        stroke="#0D47A1" strokeWidth="3" strokeLinecap="round" fill="none" />

      {/* SKATEBOARD */}
      {hasSkateboard && (
        <g>
          {/* Deck */}
          <rect x="14" y="167" width="148" height="11" rx="5.5"
            fill="#8B4513" stroke="#5D2E0A" strokeWidth="1.5" />
          {/* Grip tape stripe */}
          <rect x="16" y="167" width="144" height="5" rx="2"
            fill="#5D2E0A" opacity="0.4" />
          {/* Sticker strip */}
          <rect x="55" y="169" width="50" height="5" rx="2"
            fill="#FDD835" opacity="0.7" />
          {/* Trucks */}
          <rect x="26" y="177" width="34" height="6" rx="3" fill="#9E9E9E" stroke="#757575" strokeWidth="1" />
          <rect x="116" y="177" width="34" height="6" rx="3" fill="#9E9E9E" stroke="#757575" strokeWidth="1" />
          {/* Wheels */}
          <circle cx="36"  cy="189" r="9" fill="#212121" stroke="#424242" strokeWidth="1" />
          <circle cx="58"  cy="189" r="9" fill="#212121" stroke="#424242" strokeWidth="1" />
          <circle cx="118" cy="189" r="9" fill="#212121" stroke="#424242" strokeWidth="1" />
          <circle cx="140" cy="189" r="9" fill="#212121" stroke="#424242" strokeWidth="1" />
          {/* Wheel hubs */}
          <circle cx="36"  cy="189" r="4" fill="#616161" />
          <circle cx="58"  cy="189" r="4" fill="#616161" />
          <circle cx="118" cy="189" r="4" fill="#616161" />
          <circle cx="140" cy="189" r="4" fill="#616161" />
        </g>
      )}

      {/* BICYCLE */}
      {hasBicycle && (
        <g>
          {/* Rear wheel */}
          <circle cx="57" cy="179" r="19" fill="none" stroke="#1565C0" strokeWidth="3" />
          <line x1="57" y1="160" x2="57" y2="198" stroke="#90CAF9" strokeWidth="1.5" />
          <line x1="38"  y1="179" x2="76"  y2="179" stroke="#90CAF9" strokeWidth="1.5" />
          <line x1="44"  y1="166" x2="70"  y2="192" stroke="#90CAF9" strokeWidth="1.5" />
          <line x1="70"  y1="166" x2="44"  y2="192" stroke="#90CAF9" strokeWidth="1.5" />
          <circle cx="57" cy="179" r="4" fill="#1565C0" />

          {/* Front wheel */}
          <circle cx="197" cy="179" r="19" fill="none" stroke="#1565C0" strokeWidth="3" />
          <line x1="197" y1="160" x2="197" y2="198" stroke="#90CAF9" strokeWidth="1.5" />
          <line x1="178" y1="179" x2="216" y2="179" stroke="#90CAF9" strokeWidth="1.5" />
          <line x1="184" y1="166" x2="210" y2="192" stroke="#90CAF9" strokeWidth="1.5" />
          <line x1="210" y1="166" x2="184" y2="192" stroke="#90CAF9" strokeWidth="1.5" />
          <circle cx="197" cy="179" r="4" fill="#1565C0" />

          {/* Frame — bottom bracket at (112, 168) */}
          {/* Chain stay: rear axle → BB */}
          <line x1="57"  y1="179" x2="112" y2="168" stroke="#FF7043" strokeWidth="4" strokeLinecap="round" />
          {/* Seat stay: rear axle → seat cluster */}
          <line x1="57"  y1="179" x2="92"  y2="150" stroke="#FF7043" strokeWidth="3" strokeLinecap="round" />
          {/* Seat tube: BB → seat cluster */}
          <line x1="112" y1="168" x2="92"  y2="150" stroke="#FF7043" strokeWidth="4" strokeLinecap="round" />
          {/* Top tube: seat cluster → head tube top */}
          <line x1="92"  y1="150" x2="163" y2="146" stroke="#FF7043" strokeWidth="3.5" strokeLinecap="round" />
          {/* Down tube: BB → head tube bottom */}
          <line x1="112" y1="168" x2="168" y2="151" stroke="#FF7043" strokeWidth="3.5" strokeLinecap="round" />
          {/* Head tube */}
          <line x1="163" y1="146" x2="168" y2="151" stroke="#FF7043" strokeWidth="4" strokeLinecap="round" />
          {/* Fork */}
          <line x1="168" y1="151" x2="197" y2="179" stroke="#FF7043" strokeWidth="3.5" strokeLinecap="round" />

          {/* Seat */}
          <ellipse cx="88" cy="148" rx="16" ry="5" fill="#333" stroke="#111" strokeWidth="1" />
          <line x1="92" y1="148" x2="92" y2="152" stroke="#555" strokeWidth="3" strokeLinecap="round" />

          {/* Handlebars */}
          <line x1="163" y1="143" x2="163" y2="148" stroke="#555" strokeWidth="3" strokeLinecap="round" />
          <line x1="150" y1="139" x2="174" y2="139" stroke="#333" strokeWidth="3" strokeLinecap="round" />
          <ellipse cx="150" cy="139" rx="5" ry="4" fill="#333" />
          <ellipse cx="174" cy="139" rx="5" ry="4" fill="#333" />

          {/* Pedals */}
          <circle cx="112" cy="168" r="5" fill="#555" stroke="#333" strokeWidth="1.5" />
          <line x1="103" y1="168" x2="121" y2="168" stroke="#333" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      )}
    </svg>
  )
}

/* ── Lettuce (flies into croc's mouth on correct answer) ── */
function LettuceSVG() {
  return (
    <svg viewBox="0 0 64 64" fill="none" width="76" height="76">
      {/* Outer leaves */}
      <ellipse cx="32" cy="38" rx="26" ry="20" fill="#388E3C" stroke="#2E7D32" strokeWidth="1.5" />
      <ellipse cx="20" cy="30" rx="18" ry="13" fill="#43A047" transform="rotate(-25 20 30)" />
      <ellipse cx="44" cy="30" rx="18" ry="13" fill="#43A047" transform="rotate(25 44 30)" />
      {/* Mid leaves */}
      <ellipse cx="32" cy="34" rx="16" ry="13" fill="#66BB6A" />
      <ellipse cx="32" cy="28" rx="11" ry="10" fill="#81C784" />
      {/* Heart / core */}
      <circle cx="32" cy="28" r="7" fill="#A5D6A7" />
      <circle cx="32" cy="27" r="4" fill="#C8E6C9" />
      {/* Tiny leaf veins */}
      <path d="M 32 38 Q 26 32 20 30" stroke="#2E7D32" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.5" />
      <path d="M 32 38 Q 38 32 44 30" stroke="#2E7D32" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.5" />
      {/* Stem */}
      <path d="M 32 56 Q 30 60 32 63" stroke="#2E7D32" strokeWidth="2.2" strokeLinecap="round" fill="none" />
    </svg>
  )
}

/* ── Side-facing crocodile (mouth open — correct / eating pose) ── */
function CrocodileSideSVG() {
  return (
    <svg viewBox="0 0 268 172" fill="none" className="ce-croc-svg">
      <defs>
        <linearGradient id="cs-body" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFB74D" />
          <stop offset="100%" stopColor="#E65100" />
        </linearGradient>
        <linearGradient id="cs-belly" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#E3F2FD" />
          <stop offset="100%" stopColor="#90CAF9" />
        </linearGradient>
        <linearGradient id="cs-jaw" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FF9800" />
          <stop offset="100%" stopColor="#E65100" />
        </linearGradient>
        <linearGradient id="cs-eye" x1="10%" y1="10%" x2="90%" y2="90%">
          <stop offset="0%" stopColor="#E3F2FD" />
          <stop offset="100%" stopColor="#64B5F6" />
        </linearGradient>
      </defs>

      {/* TAIL */}
      <path d="M 6 148 Q 30 120 56 112 Q 40 134 52 154 Q 30 157 6 150 Z"
        fill="url(#cs-body)" stroke="#0D47A1" strokeWidth="2" />
      <polygon points="6,148 2,152 7,161 16,153 10,147" fill="#1565C0" stroke="#0D47A1" strokeWidth="1.5" />

      {/* HIND LEG */}
      <path d="M 52 120 Q 44 142 36 152 Q 43 154 50 148 Q 55 154 62 148 Q 67 154 74 148 Q 78 152 76 120 Z"
        fill="url(#cs-body)" stroke="#0D47A1" strokeWidth="2" />
      <path d="M 36 152 Q 31 162 34 168" stroke="#0D47A1" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M 48 154 Q 46 165 49 170" stroke="#0D47A1" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M 61 153 Q 62 164 64 169" stroke="#0D47A1" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M 73 150 Q 76 161 77 166" stroke="#0D47A1" strokeWidth="2.5" strokeLinecap="round" fill="none" />

      {/* FRONT LEG */}
      <path d="M 108 118 Q 100 140 90 150 Q 97 152 104 146 Q 109 152 116 146 Q 121 152 128 146 Q 132 150 130 118 Z"
        fill="url(#cs-body)" stroke="#0D47A1" strokeWidth="2" />
      <path d="M 90 151 Q 85 161 88 167" stroke="#0D47A1" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M 103 153 Q 101 164 104 169" stroke="#0D47A1" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M 116 152 Q 117 163 119 168" stroke="#0D47A1" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M 128 148 Q 131 159 132 164" stroke="#0D47A1" strokeWidth="2.5" strokeLinecap="round" fill="none" />

      {/* MAIN BODY */}
      <ellipse cx="92" cy="84" rx="63" ry="37"
        transform="rotate(-16 92 84)"
        fill="url(#cs-body)" stroke="#0D47A1" strokeWidth="2.5" />
      <ellipse cx="95" cy="93" rx="48" ry="23"
        transform="rotate(-16 95 93)"
        fill="url(#cs-belly)" opacity="0.85" />

      {/* Scale arcs */}
      <path d="M 60 90 Q 67 84 74 90" stroke="#E65100" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.45" />
      <path d="M 74 82 Q 81 76 88 82" stroke="#E65100" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.45" />
      <path d="M 88 76 Q 95 70 102 76" stroke="#E65100" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.45" />

      {/* DORSAL SPIKES */}
      <polygon points="50,55 58,36 66,55"    fill="#1565C0" stroke="#0D47A1" strokeWidth="1.5" />
      <polygon points="70,49 79,28 88,49"    fill="#1976D2" stroke="#0D47A1" strokeWidth="1.5" />
      <polygon points="90,43 100,21 110,43"  fill="#1565C0" stroke="#0D47A1" strokeWidth="1.5" />
      <polygon points="110,41 119,22 128,41" fill="#42A5F5" stroke="#0D47A1" strokeWidth="1.5" />

      {/* NECK */}
      <path d="M 147 50 Q 164 42 177 51 Q 167 78 147 82 Z"
        fill="url(#cs-body)" stroke="#0D47A1" strokeWidth="2" />

      {/* UPPER JAW — open wide at -38° */}
      <g transform="rotate(-38 178 78)">
        <path d="M 178 63 Q 214 51 254 57 Q 262 59 266 65 Q 250 72 178 80 Z"
          fill="url(#cs-jaw)" stroke="#0D47A1" strokeWidth="2" />
        <polygon points="188,80 192,95 196,80" fill="white" stroke="#BBDEFB" strokeWidth="1.2" />
        <polygon points="203,78 207,92 211,78" fill="white" stroke="#BBDEFB" strokeWidth="1.2" />
        <polygon points="218,76 222,89 226,76" fill="white" stroke="#BBDEFB" strokeWidth="1.2" />
        <polygon points="233,74 237,86 241,74" fill="white" stroke="#BBDEFB" strokeWidth="1.2" />
        <circle cx="188" cy="57" r="16" fill="url(#cs-eye)" stroke="#0D47A1" strokeWidth="2.5" />
        <circle cx="191" cy="55" r="10" fill="#0D47A1" />
        <circle cx="196" cy="50" r="4.5" fill="white" />
        <circle cx="188" cy="63" r="2"   fill="rgba(255,255,255,0.5)" />
        <path d="M 176 46 Q 189 40 202 46" stroke="#0D47A1" strokeWidth="3.5" strokeLinecap="round" fill="none" />
        <ellipse cx="259" cy="62" rx="7" ry="5.5" fill="#1976D2" stroke="#0D47A1" strokeWidth="1.5" />
        <ellipse cx="259" cy="62" rx="3.5" ry="2.8" fill="#0D47A1" />
      </g>

      {/* LOWER JAW */}
      <path d="M 178 78 Q 214 83 254 76 Q 262 74 266 70 Q 250 94 212 101 Q 190 103 178 93 Z"
        fill="url(#cs-jaw)" stroke="#0D47A1" strokeWidth="2" />
      <polygon points="188,78 192,65 196,78" fill="white" stroke="#BBDEFB" strokeWidth="1.2" />
      <polygon points="203,78 207,66 211,78" fill="white" stroke="#BBDEFB" strokeWidth="1.2" />
      <polygon points="218,77 222,65 226,77" fill="white" stroke="#BBDEFB" strokeWidth="1.2" />
      <polygon points="233,75 237,64 241,75" fill="white" stroke="#BBDEFB" strokeWidth="1.2" />
      <path d="M 180 80 Q 216 87 256 74 Q 240 97 212 101 Q 192 103 180 93 Z"
        fill="#B71C1C" opacity="0.6" />
      <ellipse cx="224" cy="91" rx="24" ry="10"
        fill="#F06292" stroke="#C2185B" strokeWidth="2"
        className="ce-tongue" />
      <path d="M 224 83 Q 224 99 224 99" stroke="#C2185B" strokeWidth="1.8" strokeLinecap="round" fill="none" />
    </svg>
  )
}

/* ── Main Game ── */
export default function CrocodileEats() {
  const [nums,      setNums]      = useState(() => pickRound(1))
  const [phase,     setPhase]     = useState('walking')
  // phases: 'walking' | 'question' | 'correct' | 'success' | 'wrong' | 'celebrate'
  const [mouthDir,  setMouthDir]  = useState('right')
  const [wrongSide, setWrongSide] = useState(null)
  const [score,     setScore]     = useState(0)
  const [round,     setRound]     = useState(1)
  const [accessory, setAccessory] = useState(pickAcc)
  const timerRef = useRef(null)

  // Walking → question transition (random duration)
  useEffect(() => {
    if (phase !== 'walking') return
    const ms = pickWalkMs()
    timerRef.current = setTimeout(() => setPhase('question'), ms)
    return () => clearTimeout(timerRef.current)
  }, [phase])

  useEffect(() => () => clearTimeout(timerRef.current), [])

  const handlePick = useCallback((side) => {
    if (phase !== 'question') return

    const { left, right } = nums
    const biggerSide = left > right ? 'left' : 'right'
    const correct = side === biggerSide

    if (correct) {
      setMouthDir(side)
      setPhase('correct')
      setScore(s => s + 1)

      timerRef.current = setTimeout(() => {
        setPhase('success')
        timerRef.current = setTimeout(() => {
          if (round >= TOTAL_ROUNDS) {
            setPhase('celebrate')
          } else {
            setNums(pickRound(round + 1))
            setRound(r => r + 1)
            setMouthDir('right')
            setAccessory(pickAcc())
            setPhase('walking')
          }
        }, 1500)
      }, 1100)

    } else {
      setWrongSide(side)
      setPhase('wrong')
      timerRef.current = setTimeout(() => {
        setWrongSide(null)
        setPhase('question')
      }, 1600)
    }
  }, [phase, nums, round])

  const restart = useCallback(() => {
    clearTimeout(timerRef.current)
    setNums(pickRound(1))
    setPhase('walking')
    setMouthDir('right')
    setWrongSide(null)
    setScore(0)
    setRound(1)
    setAccessory(pickAcc())
  }, [])

  const { left, right } = nums

  const isWalking     = phase === 'walking'
  const showCards     = phase === 'question' || phase === 'correct' || phase === 'wrong' || phase === 'success'
  const showWalkView  = phase === 'walking'
  const showFrontView = phase === 'question' || phase === 'wrong'
  const showSideView  = phase === 'correct'  || phase === 'success'
  const showOpenMouth = showSideView   // alias used by sign + card classes
  const ineqSign      = mouthDir === 'right' ? '<' : '>'

  return (
    <div className="ce-root">
      <div className="ce-sky" />
      <div className="ce-water" />

      <WeedSVG className="ce-weed ce-weed--1" />
      <WeedSVG className="ce-weed ce-weed--2" flip />
      <WeedSVG className="ce-weed ce-weed--3" />

      <Link to="/maths" className="ce-back app-game-back">← חזרה</Link>
      <div className="ce-score app-game-chip">🐊 {score}</div>

      {/* Arena — croc centred, cards slide in for question */}
      <div className={`ce-arena${isWalking ? ' ce-arena--walking' : ''}`}>

        {/* Left card wrapper — hidden while walking */}
        <div className={`ce-card-wrap${showCards ? ' ce-card-wrap--show' : ''}`}>
          <button
            className={`ce-card ce-card--left${wrongSide === 'left'  ? ' ce-card--wrong' : ''}${showOpenMouth && mouthDir === 'left'  ? ' ce-card--eaten' : ''}`}
            onClick={() => handlePick('left')}
            disabled={phase !== 'question'}
          >
            <span className="ce-num">{left}</span>
          </button>
        </div>

        {/* Sign LEFT of croc */}
        {showOpenMouth && mouthDir === 'left' && (
          <div className="ce-sign" aria-hidden="true">{ineqSign}</div>
        )}

        {/* Crocodile */}
        <div className="ce-croc-container">
          {/* Front-facing view (question / wrong — croc turns to face the player) */}
          <div className={`ce-croc-view ce-croc-view-front${showFrontView ? ' ce-croc-view--show' : ''}${phase === 'wrong' ? ' ce-croc-shake' : ''}`}>
            <CrocodileFrontSVG accessory={accessory} />
          </div>

          {/* Direction wrapper — flips side views for left-facing */}
          <div className={`ce-croc-view-side-dir${mouthDir === 'left' ? ' ce-croc-flip' : ''}`}>
            {/* Walking view (closed mouth, legs animated) */}
            <div className={`ce-croc-view ce-croc-view-walk${showWalkView ? ' ce-croc-view--show' : ''}`}>
              <CrocodileWalkSVG accessory={accessory} walking={true} />
            </div>

            {/* Open-mouth eating view */}
            <div className={`ce-croc-view ce-croc-view-side${showSideView ? ' ce-croc-view--show' : ''}`}>
              <CrocodileSideSVG />
            </div>
          </div>

          {/* Lettuce — flies into the croc's open mouth on correct answer */}
          {showSideView && (
            <div key={`lettuce-${round}`} className={`ce-lettuce ce-lettuce--${mouthDir}`}>
              <LettuceSVG />
            </div>
          )}
        </div>

        {/* Sign RIGHT of croc */}
        {showOpenMouth && mouthDir === 'right' && (
          <div className="ce-sign" aria-hidden="true">{ineqSign}</div>
        )}

        {/* Right card wrapper */}
        <div className={`ce-card-wrap${showCards ? ' ce-card-wrap--show' : ''}`}>
          <button
            className={`ce-card ce-card--right${wrongSide === 'right' ? ' ce-card--wrong' : ''}${showOpenMouth && mouthDir === 'right' ? ' ce-card--eaten' : ''}`}
            onClick={() => handlePick('right')}
            disabled={phase !== 'question'}
          >
            <span className="ce-num">{right}</span>
          </button>
        </div>
      </div>

      {/* Walking status label */}
      {isWalking && (
        <div className="ce-walk-label" aria-live="polite">
          {accessory === 'skateboard' ? '🛹 התנין גולש...'  :
           accessory === 'bicycle'   ? '🚲 התנין רוכב...' :
           accessory === 'shoes'     ? '👟 התנין הולך...' :
                                       '🐊 התנין הולך...'}
        </div>
      )}

      {/* Question prompt */}
      {phase === 'question' && (
        <div className="ce-question-label" aria-live="polite">
          איזה מספר גדול יותר?
        </div>
      )}

      {/* Wrong hint */}
      {phase === 'wrong' && (
        <div className="ce-hint">
          <span>נסה שוב — אכול את המספר הגדול יותר! 🐊</span>
        </div>
      )}

      {phase === 'success' && <SuccessKid />}

      {phase === 'celebrate' && (
        <div className="ce-final">
          <SuccessKid />
          <div className="ce-final-card">
            <p className="ce-final-title">כל הכבוד! 🎉</p>
            <p className="ce-final-score">{score} / {TOTAL_ROUNDS}</p>
            <button className="ce-final-btn" onClick={restart}>שחק שוב</button>
          </div>
        </div>
      )}
    </div>
  )
}
