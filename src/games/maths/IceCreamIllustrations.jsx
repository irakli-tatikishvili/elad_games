export function IceCreamTruck() {
  return (
    <svg viewBox="0 0 260 200" className="ics-svg-truck">
      {/* Truck body */}
      <rect x="20" y="40" width="220" height="110" rx="12" fill="#f8bbd0" stroke="#e91e63" strokeWidth="3" />
      <rect x="20" y="40" width="220" height="36" rx="12" fill="#e91e63" />
      <rect x="20" y="64" width="220" height="12" fill="#e91e63" />
      {/* Scalloped awning */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <circle key={i} cx={40 + i * 28} cy="42" r="16" fill={i % 2 === 0 ? '#fff' : '#e91e63'} />
      ))}
      {/* Window */}
      <rect x="50" y="80" width="160" height="50" rx="8" fill="#e3f2fd" stroke="#1976d2" strokeWidth="2" />
      <rect x="50" y="80" width="160" height="12" rx="6" fill="#bbdefb" />
      {/* Sign text */}
      <text x="130" y="58" textAnchor="middle" fontWeight="800" fontSize="14" fill="white" fontFamily="Arial, sans-serif">ICE CREAM</text>
      {/* Ice cream decorations on top */}
      <circle cx="80" cy="30" r="10" fill="#ffcc80" />
      <circle cx="80" cy="22" r="8" fill="#fff9c4" />
      <polygon points="74,30 86,30 80,48" fill="#d7ccc8" />
      <circle cx="180" cy="30" r="10" fill="#f48fb1" />
      <circle cx="180" cy="22" r="8" fill="#fce4ec" />
      <polygon points="174,30 186,30 180,48" fill="#d7ccc8" />
      {/* Serving counter */}
      <rect x="50" y="135" width="160" height="10" rx="3" fill="#8d6e63" />
      {/* Wheels */}
      <circle cx="70" cy="160" r="18" fill="#424242" />
      <circle cx="70" cy="160" r="10" fill="#757575" />
      <circle cx="70" cy="160" r="4" fill="#bdbdbd" />
      <circle cx="190" cy="160" r="18" fill="#424242" />
      <circle cx="190" cy="160" r="10" fill="#757575" />
      <circle cx="190" cy="160" r="4" fill="#bdbdbd" />
      {/* Bumper */}
      <rect x="15" y="148" width="230" height="8" rx="4" fill="#e91e63" />
    </svg>
  )
}

const KID_CONFIGS = [
  { skin: '#ffcc80', hair: '#5d4037', shirt: '#42a5f5', hairStyle: 'short' },
  { skin: '#ffe0b2', hair: '#ff8a65', shirt: '#ab47bc', hairStyle: 'pigtails' },
  { skin: '#d7ccc8', hair: '#3e2723', shirt: '#66bb6a', hairStyle: 'curly' },
  { skin: '#ffcc80', hair: '#fdd835', shirt: '#ef5350', hairStyle: 'straight' },
  { skin: '#ffe0b2', hair: '#4e342e', shirt: '#ff7043', hairStyle: 'short' },
]

export function CartoonKid({ kidIndex = 0 }) {
  const config = KID_CONFIGS[kidIndex % KID_CONFIGS.length]

  return (
    <svg viewBox="0 0 80 120" className="ics-svg-kid">
      {/* Body */}
      <rect x="25" y="55" width="30" height="35" rx="8" fill={config.shirt} />
      {/* Arms */}
      <rect x="12" y="58" width="14" height="8" rx="4" fill={config.skin} />
      <rect x="54" y="58" width="14" height="8" rx="4" fill={config.skin} />
      {/* Legs */}
      <rect x="28" y="88" width="10" height="22" rx="5" fill="#5d4037" />
      <rect x="42" y="88" width="10" height="22" rx="5" fill="#5d4037" />
      {/* Shoes */}
      <ellipse cx="33" cy="112" rx="8" ry="5" fill="#e53935" />
      <ellipse cx="47" cy="112" rx="8" ry="5" fill="#e53935" />
      {/* Head */}
      <circle cx="40" cy="38" r="22" fill={config.skin} />
      {/* Eyes */}
      <circle cx="33" cy="36" r="4" fill="white" />
      <circle cx="47" cy="36" r="4" fill="white" />
      <circle cx="34" cy="36" r="2.5" fill="#333" />
      <circle cx="48" cy="36" r="2.5" fill="#333" />
      <circle cx="34.5" cy="35.5" r="0.8" fill="white" />
      <circle cx="48.5" cy="35.5" r="0.8" fill="white" />
      {/* Smile */}
      <path d="M 33 44 Q 40 52 47 44" stroke="#333" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Cheeks */}
      <circle cx="27" cy="42" r="4" fill="#ffab91" opacity="0.5" />
      <circle cx="53" cy="42" r="4" fill="#ffab91" opacity="0.5" />
      {/* Hair */}
      {config.hairStyle === 'short' && (
        <path d="M 18 35 Q 18 14 40 14 Q 62 14 62 35" fill={config.hair} />
      )}
      {config.hairStyle === 'pigtails' && (
        <>
          <path d="M 18 35 Q 18 14 40 14 Q 62 14 62 35" fill={config.hair} />
          <circle cx="16" cy="28" r="8" fill={config.hair} />
          <circle cx="64" cy="28" r="8" fill={config.hair} />
        </>
      )}
      {config.hairStyle === 'curly' && (
        <>
          <path d="M 18 35 Q 18 10 40 10 Q 62 10 62 35" fill={config.hair} />
          <circle cx="22" cy="18" r="6" fill={config.hair} />
          <circle cx="40" cy="12" r="6" fill={config.hair} />
          <circle cx="58" cy="18" r="6" fill={config.hair} />
        </>
      )}
      {config.hairStyle === 'straight' && (
        <>
          <path d="M 16 38 Q 16 12 40 12 Q 64 12 64 38" fill={config.hair} />
          <rect x="16" y="30" width="6" height="16" rx="3" fill={config.hair} />
          <rect x="58" y="30" width="6" height="16" rx="3" fill={config.hair} />
        </>
      )}
    </svg>
  )
}

export function IceCreamCone({ flavor = 0 }) {
  const flavors = [
    { scoop1: '#f48fb1', scoop2: '#f8bbd0', drip: '#ec407a' },
    { scoop1: '#81d4fa', scoop2: '#b3e5fc', drip: '#29b6f6' },
    { scoop1: '#a5d6a7', scoop2: '#c8e6c9', drip: '#66bb6a' },
    { scoop1: '#ffcc80', scoop2: '#ffe0b2', drip: '#ffa726' },
    { scoop1: '#ce93d8', scoop2: '#e1bee7', drip: '#ab47bc' },
  ]
  const f = flavors[flavor % flavors.length]

  return (
    <svg viewBox="0 0 48 64" className="ics-svg-cone">
      {/* Cone */}
      <polygon points="14,30 34,30 24,62" fill="#d7ccc8" />
      <line x1="14" y1="30" x2="29" y2="52" stroke="#bcaaa4" strokeWidth="1" />
      <line x1="34" y1="30" x2="19" y2="52" stroke="#bcaaa4" strokeWidth="1" />
      <line x1="17" y1="36" x2="31" y2="36" stroke="#bcaaa4" strokeWidth="1" />
      <line x1="19" y1="42" x2="29" y2="42" stroke="#bcaaa4" strokeWidth="1" />
      {/* Drip */}
      <ellipse cx="18" cy="32" rx="3" ry="5" fill={f.drip} />
      <ellipse cx="30" cy="33" rx="2.5" ry="4" fill={f.drip} />
      {/* Scoop 1 */}
      <circle cx="24" cy="22" r="14" fill={f.scoop1} />
      <circle cx="20" cy="20" r="3" fill={f.scoop2} opacity="0.6" />
      {/* Sprinkles */}
      <rect x="16" y="18" width="4" height="1.5" rx="0.75" fill="#fdd835" transform="rotate(30,18,18)" />
      <rect x="28" y="14" width="4" height="1.5" rx="0.75" fill="#ef5350" transform="rotate(-20,30,14)" />
      <rect x="22" y="12" width="4" height="1.5" rx="0.75" fill="#66bb6a" transform="rotate(45,24,12)" />
      <rect x="30" y="22" width="4" height="1.5" rx="0.75" fill="#42a5f5" transform="rotate(-10,32,22)" />
    </svg>
  )
}

export function Seller() {
  return (
    <svg viewBox="0 0 70 90" className="ics-svg-seller">
      {/* Body/apron */}
      <rect x="18" y="42" width="34" height="30" rx="6" fill="white" />
      <rect x="18" y="42" width="34" height="8" rx="4" fill="#e3f2fd" />
      {/* Head */}
      <circle cx="35" cy="28" r="18" fill="#ffcc80" />
      {/* Chef hat */}
      <rect x="20" y="6" width="30" height="14" rx="4" fill="white" />
      <ellipse cx="35" cy="8" rx="18" ry="8" fill="white" />
      {/* Eyes */}
      <circle cx="29" cy="27" r="3" fill="white" />
      <circle cx="41" cy="27" r="3" fill="white" />
      <circle cx="29.5" cy="27" r="2" fill="#333" />
      <circle cx="41.5" cy="27" r="2" fill="#333" />
      {/* Smile */}
      <path d="M 29 34 Q 35 40 41 34" stroke="#333" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Mustache */}
      <path d="M 30 32 Q 35 30 40 32" stroke="#5d4037" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Cheeks */}
      <circle cx="23" cy="32" r="3" fill="#ffab91" opacity="0.5" />
      <circle cx="47" cy="32" r="3" fill="#ffab91" opacity="0.5" />
    </svg>
  )
}

export function WalkingKid({ kidIndex = 0 }) {
  const config = KID_CONFIGS[kidIndex % KID_CONFIGS.length]

  return (
    <svg viewBox="0 0 60 100" className="ics-svg-walking">
      {/* Body */}
      <rect x="18" y="45" width="24" height="28" rx="6" fill={config.shirt} />
      {/* Legs walking */}
      <rect x="20" y="72" width="8" height="18" rx="4" fill="#5d4037" transform="rotate(-15,24,72)" />
      <rect x="32" y="72" width="8" height="18" rx="4" fill="#5d4037" transform="rotate(15,36,72)" />
      {/* Shoes */}
      <ellipse cx="20" cy="92" rx="6" ry="4" fill="#e53935" />
      <ellipse cx="42" cy="92" rx="6" ry="4" fill="#e53935" />
      {/* Head */}
      <circle cx="30" cy="30" r="18" fill={config.skin} />
      {/* Eyes */}
      <circle cx="24" cy="28" r="3" fill="white" />
      <circle cx="36" cy="28" r="3" fill="white" />
      <circle cx="24.5" cy="28" r="2" fill="#333" />
      <circle cx="36.5" cy="28" r="2" fill="#333" />
      {/* Smile */}
      <path d="M 24 36 Q 30 42 36 36" stroke="#333" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Hair */}
      <path d="M 12 28 Q 12 10 30 10 Q 48 10 48 28" fill={config.hair} />
    </svg>
  )
}

export function CloudSVG() {
  return (
    <svg viewBox="0 0 100 50" className="ics-svg-cloud">
      <ellipse cx="50" cy="30" rx="40" ry="16" fill="white" opacity="0.9" />
      <ellipse cx="35" cy="22" rx="22" ry="18" fill="white" opacity="0.9" />
      <ellipse cx="65" cy="24" rx="20" ry="14" fill="white" opacity="0.9" />
      <ellipse cx="50" cy="18" rx="16" ry="14" fill="white" opacity="0.95" />
    </svg>
  )
}

export function SunSVG() {
  return (
    <svg viewBox="0 0 60 60" className="ics-svg-sun">
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <line
          key={angle}
          x1="30"
          y1="30"
          x2={30 + 28 * Math.cos((angle * Math.PI) / 180)}
          y2={30 + 28 * Math.sin((angle * Math.PI) / 180)}
          stroke="#fdd835"
          strokeWidth="3"
          strokeLinecap="round"
        />
      ))}
      <circle cx="30" cy="30" r="16" fill="#fdd835" />
      <circle cx="30" cy="30" r="14" fill="#ffee58" />
      <circle cx="24" cy="27" r="2" fill="#f9a825" />
      <circle cx="36" cy="27" r="2" fill="#f9a825" />
      <path d="M 25 33 Q 30 37 35 33" stroke="#f9a825" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  )
}
