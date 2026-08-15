const N = "#1E3A5F";
const W = "#FFFFFF";
const A = "#F5A623";
const KANAT = "#F0EAD9";

/** Yumurtadan Ördeğe: 7 aşamanın marka stilinde figürleri */
export function EvrimFigur({ asama, boy = 64, className = "" }: { asama: number; boy?: number; className?: string }) {
  return (
    <svg viewBox="0 0 120 120" width={boy} height={boy} className={`inline-block shrink-0 ${className}`} aria-hidden>
      <ellipse cx="60" cy={asama >= 3 ? 113 : 106} rx="28" ry="5.5" fill={N} opacity="0.08" />

      {/* 0 — Yumurta */}
      {asama <= 0 && (
        <>
          <path d="M60 16 C79 16 91 44 91 68 a31 31 0 0 1 -62 0 C29 44 41 16 60 16 Z" fill={W} stroke={N} strokeWidth="4" />
          <circle cx="52" cy="47" r="3.2" fill={A} />
          <circle cx="69" cy="59" r="2.6" fill={A} />
          <circle cx="55" cy="74" r="2.2" fill={A} />
        </>
      )}

      {/* 1 — Çatlayan Yumurta */}
      {asama === 1 && (
        <>
          <path d="M60 16 C79 16 91 44 91 68 a31 31 0 0 1 -62 0 C29 44 41 16 60 16 Z" fill={W} stroke={N} strokeWidth="4" />
          <path d="M34 60 l13 7 8-8" fill="none" stroke={N} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M69 61 l8 7 9-6" fill="none" stroke={N} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="61" cy="62" r="8.5" fill="#16304F" stroke={N} strokeWidth="2.5" />
          <path d="M55 60 h12 l-6 8 Z" fill={A} stroke="#C77E0A" strokeWidth="1.6" strokeLinejoin="round" />
        </>
      )}

      {/* 2 — Civciv */}
      {asama === 2 && (
        <>
          <circle cx="60" cy="52" r="28" fill={W} stroke={N} strokeWidth="4" />
          <path d="M52 26 q1-8 7-10 M61 25 q4-8 11-8" fill="none" stroke={N} strokeWidth="2.6" strokeLinecap="round" />
          <circle cx="50" cy="46" r="3.2" fill={N} />
          <circle cx="70" cy="46" r="3.2" fill={N} />
          <circle cx="43" cy="55" r="3.5" fill={A} opacity="0.3" />
          <circle cx="77" cy="55" r="3.5" fill={A} opacity="0.3" />
          <path d="M51 55 q9 6 18 0 q-3.5 7 -9 7 t-9 -7 Z" fill={A} stroke={N} strokeWidth="2.2" strokeLinejoin="round" />
          <path d="M31 72 a29 22 0 0 0 58 0 L81 62 L74 71 L66 62 L59 71 L51 62 L44 71 L37 63 Z" fill={W} stroke={N} strokeWidth="3.5" strokeLinejoin="round" />
        </>
      )}

      {/* 3 — Palaz */}
      {asama === 3 && (
        <>
          <ellipse cx="60" cy="78" rx="27" ry="21" fill={W} stroke={N} strokeWidth="4" />
          <circle cx="60" cy="41" r="19" fill={W} stroke={N} strokeWidth="4" />
          <path d="M54 23 q1-7 7-8" fill="none" stroke={N} strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="53" cy="38" r="3" fill={N} />
          <circle cx="67" cy="38" r="3" fill={N} />
          <path d="M50 46 q10 6 20 0 q-4 7.5 -10 7.5 t-10 -7.5 Z" fill={A} stroke={N} strokeWidth="2.2" strokeLinejoin="round" />
          <ellipse cx="42" cy="78" rx="8" ry="13" fill={KANAT} stroke={N} strokeWidth="2.4" transform="rotate(14 42 78)" />
          <ellipse cx="78" cy="78" rx="8" ry="13" fill={KANAT} stroke={N} strokeWidth="2.4" transform="rotate(-14 78 78)" />
          <path d="M52 97 l-5 9 h11 Z M68 97 l-5 9 h11 Z" fill={A} stroke={N} strokeWidth="2" strokeLinejoin="round" />
        </>
      )}

      {/* 4/5/6 — Genç / Usta / Mezun Ördek */}
      {asama >= 4 && (
        <>
          <ellipse cx="60" cy="81" rx="30" ry="23" fill={W} stroke={N} strokeWidth="4" />
          <circle cx="60" cy="40" r="20" fill={W} stroke={N} strokeWidth="4" />

          {asama < 6 && <path d="M53 21 q1-7 8-8" fill="none" stroke={N} strokeWidth="2.5" strokeLinecap="round" />}

          {/* mezun kepi */}
          {asama >= 6 && (
            <>
              <ellipse cx="60" cy="21" rx="18" ry="7" fill="#16304F" />
              <polygon points="24,17 60,3 96,17 60,30" fill={N} stroke="#152C4A" strokeWidth="2" strokeLinejoin="round" />
              <path d="M93 18 q5 6 4 14" fill="none" stroke={A} strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="97" cy="36" r="4" fill="#FFC93C" stroke={N} strokeWidth="1.6" />
            </>
          )}

          {/* gözler / gözlük (kepin üstüne çizilir ki görünür kalsın) */}
          {asama >= 5 ? (
            <>
              <circle cx="51" cy="40" r="7.5" fill={W} stroke={N} strokeWidth="3.2" />
              <circle cx="69" cy="40" r="7.5" fill={W} stroke={N} strokeWidth="3.2" />
              <path d="M58 38 q2-3 4 0" fill="none" stroke={N} strokeWidth="2.4" strokeLinecap="round" />
              <circle cx="52" cy="41.5" r="2.7" fill={N} />
              <circle cx="68" cy="41.5" r="2.7" fill={N} />
            </>
          ) : (
            <>
              <circle cx="52" cy="37" r="3.2" fill={N} />
              <circle cx="68" cy="37" r="3.2" fill={N} />
            </>
          )}

          {/* gaga */}
          <path d="M47 49 q13 7 26 0 q-4 8.5 -13 8.5 t-13 -8.5 Z" fill={A} stroke={N} strokeWidth="2.4" strokeLinejoin="round" />

          {/* gövdeye yaslı kanatlar */}
          <ellipse cx="41" cy="81" rx="9" ry="14" fill={KANAT} stroke={N} strokeWidth="2.4" transform="rotate(12 41 81)" />
          <ellipse cx="79" cy="81" rx="9" ry="14" fill={KANAT} stroke={N} strokeWidth="2.4" transform="rotate(-12 79 81)" />

          <path d="M51 102 l-5 9 h11 Z M69 102 l-5 9 h11 Z" fill={A} stroke={N} strokeWidth="2" strokeLinejoin="round" />
        </>
      )}
    </svg>
  );
}
