const N = "#1E3A5F";
const W = "#FFFFFF";
const A = "#F5A623";
const KANAT = "#F0EAD9";

/** Yumurtadan Ördeğe: 7 aşamanın marka stilinde figürleri */
export function EvrimFigur({ asama, boy = 64, className = "" }: { asama: number; boy?: number; className?: string }) {
  return (
    <svg viewBox="0 0 120 120" width={boy} height={boy} className={`inline-block shrink-0 ${className}`} aria-hidden>
      <ellipse cx="60" cy="106" rx="28" ry="6" fill={N} opacity="0.08" />
      {asama <= 0 && (
        <>
          <path d="M60 16 C79 16 91 44 91 68 a31 31 0 0 1 -62 0 C29 44 41 16 60 16 Z" fill={W} stroke={N} strokeWidth="4" />
          <circle cx="52" cy="47" r="3.2" fill={A} />
          <circle cx="69" cy="59" r="2.6" fill={A} />
          <circle cx="55" cy="74" r="2.2" fill={A} />
        </>
      )}
      {asama === 1 && (
        <>
          <path d="M60 16 C79 16 91 44 91 68 a31 31 0 0 1 -62 0 C29 44 41 16 60 16 Z" fill={W} stroke={N} strokeWidth="4" />
          <path d="M38 60 l11 6 8-9 10 8 8-6" fill="none" stroke={A} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M55 62 h10 l-5 8 Z" fill={A} stroke={N} strokeWidth="2" strokeLinejoin="round" />
          <circle cx="70" cy="52" r="2.8" fill={N} />
        </>
      )}
      {asama === 2 && (
        <>
          <circle cx="60" cy="50" r="27" fill={W} stroke={N} strokeWidth="4" />
          <path d="M52 26 q2-8 8-9 M60 25 q4-7 10-6" fill="none" stroke={N} strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="51" cy="46" r="3.2" fill={N} />
          <circle cx="69" cy="46" r="3.2" fill={N} />
          <path d="M52 56 q8 5 16 0 q-3 7-8 7 t-8-7 Z" fill={A} stroke={N} strokeWidth="2.2" strokeLinejoin="round" />
          <path d="M33 80 a27 19 0 0 0 54 0 l-5-6 -7 6 -7-6 -8 6 -8-6 -7 6 Z" fill={W} stroke={N} strokeWidth="3.5" strokeLinejoin="round" />
        </>
      )}
      {asama === 3 && (
        <>
          <ellipse cx="60" cy="72" rx="31" ry="26" fill={W} stroke={N} strokeWidth="4" />
          <circle cx="60" cy="38" r="21" fill={W} stroke={N} strokeWidth="4" />
          <path d="M52 19 q3-7 9-7" fill="none" stroke={N} strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="52" cy="35" r="3" fill={N} />
          <circle cx="68" cy="35" r="3" fill={N} />
          <path d="M52 44 q8 5 16 0 q-3 6.5-8 6.5 t-8-6.5 Z" fill={A} stroke={N} strokeWidth="2.2" strokeLinejoin="round" />
          <ellipse cx="34" cy="72" rx="9" ry="15" fill={KANAT} stroke={N} strokeWidth="2.5" transform="rotate(14 34 72)" />
          <ellipse cx="86" cy="72" rx="9" ry="15" fill={KANAT} stroke={N} strokeWidth="2.5" transform="rotate(-14 86 72)" />
          <path d="M50 100 l-4 7 h9 Z M70 100 l-4 7 h9 Z" fill={A} stroke={N} strokeWidth="2" strokeLinejoin="round" />
        </>
      )}
      {asama >= 4 && (
        <>
          <ellipse cx="60" cy="76" rx="33" ry="26" fill={W} stroke={N} strokeWidth="4" />
          <circle cx="60" cy="34" r="22" fill={W} stroke={N} strokeWidth="4" />
          {asama < 6 && <path d="M52 14 q3-7 9-7" fill="none" stroke={N} strokeWidth="2.5" strokeLinecap="round" />}
          {asama >= 5 ? (
            <>
              <circle cx="51" cy="31" r="7.5" fill={W} stroke={N} strokeWidth="3.2" />
              <circle cx="69" cy="31" r="7.5" fill={W} stroke={N} strokeWidth="3.2" />
              <path d="M58 29 q2-3 4 0" fill="none" stroke={N} strokeWidth="2.4" />
              <circle cx="52" cy="32.5" r="2.6" fill={N} />
              <circle cx="68" cy="32.5" r="2.6" fill={N} />
            </>
          ) : (
            <>
              <circle cx="51" cy="31" r="3.2" fill={N} />
              <circle cx="69" cy="31" r="3.2" fill={N} />
            </>
          )}
          <path d="M51 42 q9 5.5 18 0 q-3.5 7-9 7 t-9-7 Z" fill={A} stroke={N} strokeWidth="2.2" strokeLinejoin="round" />
          <ellipse cx="31" cy="76" rx="10" ry="16" fill={KANAT} stroke={N} strokeWidth="2.5" transform="rotate(14 31 76)" />
          <ellipse cx="89" cy="76" rx="10" ry="16" fill={KANAT} stroke={N} strokeWidth="2.5" transform="rotate(-14 89 76)" />
          <path d="M49 104 l-4 7 h9 Z M71 104 l-4 7 h9 Z" fill={A} stroke={N} strokeWidth="2" strokeLinejoin="round" />
          {asama >= 6 && (
            <>
              <path d="M28 16 60 3 92 16 60 29 Z" fill={N} stroke="#152C4A" strokeWidth="2" strokeLinejoin="round" />
              <path d="M40 20 v9 c0 4 9 7 20 7 s20-3 20-7 v-9" fill="#16304F" />
              <path d="M90 17 v13" stroke={A} strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="90" cy="33" r="3.5" fill="#FFC93C" stroke={N} strokeWidth="1.5" />
            </>
          )}
        </>
      )}
    </svg>
  );
}
