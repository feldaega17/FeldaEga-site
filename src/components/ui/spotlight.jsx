// Hero spotlight beam (21st.dev / Aceternity "Spotlight" pattern)
export function Spotlight({ fill = "#9D4EDD", style }) {
  return (
    <svg className="spotlight-beam" viewBox="0 0 3787 2842" fill="none" aria-hidden="true" style={style}>
      <g filter="url(#spot-blur)">
        <ellipse cx="1924.71" cy="273.501" rx="1924.71" ry="273.501"
          transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)"
          fill={fill} fillOpacity="0.21" />
      </g>
      <defs>
        <filter id="spot-blur" x="0.86" y="0.84" width="3785.16" height="2840.26" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="bg" />
          <feBlend in="SourceGraphic" in2="bg" result="shape" />
          <feGaussianBlur stdDeviation="151" />
        </filter>
      </defs>
    </svg>
  );
}
