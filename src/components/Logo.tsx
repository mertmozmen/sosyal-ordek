import { AVATAR_RENKLER } from "@/lib/data";
import { EvrimFigur } from "./EvrimFigur";

type AmblemProps = {
  boy?: number;
  halka?: boolean;
  gövde?: boolean;
  className?: string;
};

export function OrdekAmblem({
  boy = 160,
  halka = true,
  gövde = true,
  className = "",
}: AmblemProps) {
  return (
    <svg
      viewBox="0 0 400 450"
      width={boy}
      height={boy * (450 / 400)}
      className={className}
      aria-label="Sosyal Ördek logosu"
      role="img"
    >
      {halka && (
        <circle cx="200" cy="225" r="148" fill="none" stroke="#F2A83B" strokeWidth="40" />
      )}

      {/* baş */}
      <ellipse cx="200" cy="205" rx="98" ry="102" fill="#FFFFFF" stroke="#EDE4D3" strokeWidth="3" />

      {/* püskül ipi (kepin arkasından sarkar) */}
      <path d="M112 120 Q92 150 92 200" stroke="#F2A83B" strokeWidth="6" fill="none" strokeLinecap="round" />

      {/* kep */}
      <path d="M118 118 Q200 86 282 118 L282 152 Q200 176 118 152 Z" fill="#16304F" />
      <polygon points="40,118 200,52 360,118 200,186" fill="#1E3A5F" stroke="#152C4A" strokeWidth="3" strokeLinejoin="round" />

      {/* püskül */}
      <g className="pusku">
        <line x1="92" y1="198" x2="92" y2="214" stroke="#F2A83B" strokeWidth="6" strokeLinecap="round" />
        <rect x="84" y="212" width="16" height="8" rx="4" fill="#DD8F1D" />
        <rect x="84" y="216" width="16" height="30" rx="8" fill="#FFC93C" />
      </g>

      {/* tepe tüyü */}
      <path
        d="M206 186 Q208 152 230 142 Q226 156 234 158 Q250 148 260 160 Q246 164 246 176 Q232 170 222 186 Z"
        fill="#FFFFFF"
        stroke="#EDE4D3"
        strokeWidth="3"
        strokeLinejoin="round"
      />

      {/* kaşlar */}
      <path d="M126 184 Q148 174 170 182" stroke="#1E3A5F" strokeWidth="7" fill="none" strokeLinecap="round" />
      <path d="M230 182 Q252 174 274 184" stroke="#1E3A5F" strokeWidth="7" fill="none" strokeLinecap="round" />

      {/* gözlük */}
      <path d="M107 224 Q99 220 95 213" stroke="#1E3A5F" strokeWidth="9" fill="none" strokeLinecap="round" />
      <path d="M293 224 Q301 220 305 213" stroke="#1E3A5F" strokeWidth="9" fill="none" strokeLinecap="round" />
      <circle cx="152" cy="232" r="45" fill="#FFFFFF" stroke="#1E3A5F" strokeWidth="12" />
      <circle cx="248" cy="232" r="45" fill="#FFFFFF" stroke="#1E3A5F" strokeWidth="12" />
      <path d="M195 221 Q200 212 205 221" stroke="#1E3A5F" strokeWidth="9" fill="none" strokeLinecap="round" />

      {/* gözler */}
      <g className="goz">
        <circle cx="158" cy="238" r="14" fill="#1B2940" />
        <circle cx="153" cy="232" r="4.5" fill="#FFFFFF" />
        <circle cx="242" cy="238" r="14" fill="#1B2940" />
        <circle cx="237" cy="232" r="4.5" fill="#FFFFFF" />
      </g>

      {/* gaga */}
      <path
        d="M136 282 Q200 258 264 282 Q276 290 268 300 Q200 320 132 300 Q124 290 136 282 Z"
        fill="#F5A623"
      />
      <path d="M158 301 Q200 318 242 301" stroke="#DD8F1D" strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M164 306 Q200 326 236 306 Q228 330 200 332 Q172 330 164 306 Z" fill="#EF9C15" />

      {gövde && (
        <>
          {/* cübbe */}
          <path
            d="M96 440 Q98 388 136 360 Q168 340 200 340 Q232 340 264 360 Q302 388 304 440 Z"
            fill="#1E3A5F"
          />
          {/* gömlek + kravat */}
          <polygon points="164,342 236,342 200,400" fill="#FFFFFF" />
          <rect x="190" y="350" width="20" height="14" rx="4" fill="#F5A623" />
          <polygon points="186,364 214,364 208,402 192,402" fill="#F5A623" />
          {/* kitap */}
          <path
            d="M50 400 Q128 364 200 386 Q272 364 350 400 L350 434 Q272 400 200 420 Q128 400 50 434 Z"
            fill="#1E3A5F"
          />
          <path
            d="M62 396 Q130 366 200 388 Q270 366 338 396 L338 418 Q270 392 200 410 Q130 392 62 418 Z"
            fill="#FFFFFF"
            stroke="#EDE4D3"
            strokeWidth="2"
          />
          <line x1="200" y1="388" x2="200" y2="410" stroke="#D9CFBC" strokeWidth="3" />
          <path d="M84 396 Q140 376 190 392" stroke="#E5DCCB" strokeWidth="3" fill="none" />
          <path d="M316 396 Q260 376 210 392" stroke="#E5DCCB" strokeWidth="3" fill="none" />
        </>
      )}
    </svg>
  );
}

export function OrdekKafa({ boy = 64, className = "" }: { boy?: number; className?: string }) {
  return (
    <svg viewBox="20 40 360 300" width={boy} height={boy * (300 / 360)} className={className} aria-hidden>
      <ellipse cx="200" cy="205" rx="98" ry="102" fill="#FFFFFF" stroke="#EDE4D3" strokeWidth="3" />
      <path d="M112 120 Q92 150 92 200" stroke="#F2A83B" strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M118 118 Q200 86 282 118 L282 152 Q200 176 118 152 Z" fill="#16304F" />
      <polygon points="40,118 200,52 360,118 200,186" fill="#1E3A5F" stroke="#152C4A" strokeWidth="3" strokeLinejoin="round" />
      <g className="pusku">
        <line x1="92" y1="198" x2="92" y2="214" stroke="#F2A83B" strokeWidth="6" strokeLinecap="round" />
        <rect x="84" y="212" width="16" height="8" rx="4" fill="#DD8F1D" />
        <rect x="84" y="216" width="16" height="30" rx="8" fill="#FFC93C" />
      </g>
      <path
        d="M206 186 Q208 152 230 142 Q226 156 234 158 Q250 148 260 160 Q246 164 246 176 Q232 170 222 186 Z"
        fill="#FFFFFF"
        stroke="#EDE4D3"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="M126 184 Q148 174 170 182" stroke="#1E3A5F" strokeWidth="7" fill="none" strokeLinecap="round" />
      <path d="M230 182 Q252 174 274 184" stroke="#1E3A5F" strokeWidth="7" fill="none" strokeLinecap="round" />
      <circle cx="152" cy="232" r="45" fill="#FFFFFF" stroke="#1E3A5F" strokeWidth="12" />
      <circle cx="248" cy="232" r="45" fill="#FFFFFF" stroke="#1E3A5F" strokeWidth="12" />
      <path d="M195 221 Q200 212 205 221" stroke="#1E3A5F" strokeWidth="9" fill="none" strokeLinecap="round" />
      <g className="goz">
        <circle cx="158" cy="238" r="14" fill="#1B2940" />
        <circle cx="153" cy="232" r="4.5" fill="#FFFFFF" />
        <circle cx="242" cy="238" r="14" fill="#1B2940" />
        <circle cx="237" cy="232" r="4.5" fill="#FFFFFF" />
      </g>
      <path d="M136 282 Q200 258 264 282 Q276 290 268 300 Q200 320 132 300 Q124 290 136 282 Z" fill="#F5A623" />
      <path d="M158 301 Q200 318 242 301" stroke="#DD8F1D" strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M164 306 Q200 326 236 306 Q228 330 200 332 Q172 330 164 306 Z" fill="#EF9C15" />
    </svg>
  );
}

export function OrdekAvatar({
  renk = "amber",
  boy = 44,
  asama,
  className = "",
}: {
  renk?: string;
  boy?: number;
  /** Yumurtadan Ördeğe aşaması (0-6); verilirse avatar o aşamanın figürünü gösterir */
  asama?: number;
  className?: string;
}) {
  const hex = AVATAR_RENKLER[renk]?.hex ?? AVATAR_RENKLER.amber.hex;
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full ${className}`}
      style={{ width: boy, height: boy, background: hex }}
    >
      {asama === undefined ? (
        <OrdekKafa boy={boy * 0.82} className="translate-y-[8%]" />
      ) : (
        <EvrimFigur asama={asama} boy={boy * 0.78} />
      )}
    </span>
  );
}


export function Wordmark({ boyut = "text-xl" }: { boyut?: string }) {
  return (
    <span className={`font-logo font-extrabold leading-none tracking-tight ${boyut}`}>
      <span className="text-lacivert">SOSYAL</span>{" "}
      <span className="text-amber">ÖRDEK</span>
    </span>
  );
}

export function LogoYatay({ boy = 42 }: { boy?: number }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <OrdekAmblem boy={boy} gövde={false} />
      <span className="flex flex-col gap-0.5">
        <Wordmark boyut="text-lg" />
        <span className="font-logo text-[9px] font-semibold tracking-[0.28em] text-lacivert/70">
          LGS EĞİTİM PLATFORMU
        </span>
      </span>
    </span>
  );
}

export function LogoDikey({ boy = 200, slogan = true }: { boy?: number; slogan?: boolean }) {
  return (
    <span className="inline-flex flex-col items-center gap-4">
      <OrdekAmblem boy={boy} />
      <span className="flex flex-col items-center gap-2">
        <Wordmark boyut="text-4xl" />
        {slogan && (
          <span className="flex items-center gap-3">
            <i className="h-px w-8 bg-amber" />
            <span className="font-logo text-[11px] font-semibold tracking-[0.32em] text-lacivert">
              LGS EĞİTİM PLATFORMU
            </span>
            <i className="h-px w-8 bg-amber" />
          </span>
        )}
      </span>
    </span>
  );
}
