/**
 * Static hero illustration for reduced motion, low-power devices and while
 * the 3D chunk loads. Pure SVG — paints instantly and costs nothing.
 */
export function HeroFallback() {
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      <div className="glow-blob -right-24 top-10 h-[28rem] w-[28rem]" />
      <div className="glow-blob -left-32 bottom-0 h-80 w-80 opacity-70" />

      <svg
        viewBox="0 0 520 400"
        className="absolute bottom-6 left-1/2 w-[min(90vw,520px)] -translate-x-1/2 text-accent opacity-60 md:bottom-auto md:left-auto md:right-[4%] md:top-1/2 md:w-[min(46vw,560px)] md:-translate-y-1/2 md:translate-x-0 md:opacity-90"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        {/* Laptop */}
        <rect x="70" y="60" width="320" height="200" rx="12" className="fill-surface" />
        <rect x="86" y="76" width="288" height="168" rx="6" strokeOpacity=".4" />
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <line
            key={i}
            x1={104 + (i % 3) * 14}
            x2={104 + (i % 3) * 14 + [150, 90, 200, 120, 170, 60, 130][i]}
            y1={100 + i * 20}
            y2={100 + i * 20}
            strokeOpacity={i % 2 ? 0.5 : 0.9}
          />
        ))}
        <path d="M40 262h380l-22 26H62z" className="fill-surface" />
        {/* Phone */}
        <rect x="390" y="150" width="90" height="180" rx="16" className="fill-surface" />
        <rect x="402" y="172" width="66" height="44" rx="8" fill="currentColor" fillOpacity=".25" />
        {[0, 1, 2].map((i) => (
          <rect key={i} x="402" y={228 + i * 26} width="66" height="18" rx="6" strokeOpacity=".5" />
        ))}
        {/* Floating code glyphs */}
        <text x="20" y="60" className="fill-current font-mono" stroke="none" fontSize="26" opacity=".5">{'{ }'}</text>
        <text x="440" y="70" className="fill-current font-mono" stroke="none" fontSize="22" opacity=".45">{'</>'}</text>
        <text x="16" y="340" className="fill-current font-mono" stroke="none" fontSize="22" opacity=".35">{'=>'}</text>
      </svg>
    </div>
  );
}
