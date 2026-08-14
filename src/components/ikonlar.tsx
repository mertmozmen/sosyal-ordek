import type { ReactNode } from "react";

// Marka ikon seti: lacivert kontur + amber/sarı dolgular, logo ile aynı flat stil
const N = "#1E3A5F";
const K = "#16304F";
const A = "#F2A83B";
const D = "#FFC93C";
const W = "#FFFFFF";
const KIRMIZI = "#E2574C";

export type IkonAd =
  | "mat" | "fen" | "tur" | "ink" | "ing" | "genel" | "oyun" | "spor"
  | "panel" | "hoca" | "canli" | "soru" | "tekrar" | "plan" | "kupa" | "forum" | "ayar" | "cikis"
  | "kalem" | "sure" | "video" | "kilit" | "tik" | "alev" | "rozet" | "hedef" | "kitap" | "deneme" | "arsiv"
  | "tel" | "mail" | "konum" | "vak" | "dalga"
  | "yumurta" | "civciv" | "tac"
  | "ekle" | "sil" | "duzenle" | "kullanici" | "grafik" | "gonder" | "yukle" | "bildirim" | "geri" | "oynat" | "el";

const CIZIMLER: Record<IkonAd, ReactNode> = {
  mat: (
    <>
      <path d="M10 38 L38 38 L10 12 Z" fill={D} stroke={N} strokeWidth="3" strokeLinejoin="round" />
      <path d="M17 33 L27 33 L17 23 Z" fill={W} stroke={N} strokeWidth="2.5" strokeLinejoin="round" />
    </>
  ),
  fen: (
    <>
      <path d="M20 7h8v10l9 17a4 4 0 0 1-3.6 6H14.6A4 4 0 0 1 11 34l9-17Z" fill={W} stroke={N} strokeWidth="3" strokeLinejoin="round" />
      <path d="M17.2 28.5h13.6l4.2 8a2.6 2.6 0 0 1-2.3 3.8H15.3A2.6 2.6 0 0 1 13 36.5Z" fill={A} />
      <circle cx="22" cy="34" r="1.8" fill={W} />
      <circle cx="28" cy="31" r="1.3" fill={W} />
      <circle cx="25" cy="22" r="1.6" fill={D} stroke={N} strokeWidth="1.5" />
    </>
  ),
  tur: (
    <>
      <path d="M24 13c-5-4-12-4-16-2v24c4-2 11-2 16 2 5-4 12-4 16-2V11c-4-2-11-2-16 2Z" fill={W} stroke={N} strokeWidth="3" strokeLinejoin="round" />
      <path d="M24 13v24" stroke={N} strokeWidth="2.5" />
      <path d="M12 17c2.5-.7 6-.6 8 .6M12 23c2.5-.7 6-.6 8 .6M28 17.6c2-1.2 5.5-1.3 8-.6M28 23.6c2-1.2 5.5-1.3 8-.6" stroke={A} strokeWidth="2" strokeLinecap="round" fill="none" />
    </>
  ),
  ink: (
    <>
      <path d="M12 40V20h6v-4h4v4h4v-4h4v4h6v20Z" fill={W} stroke={N} strokeWidth="3" strokeLinejoin="round" />
      <path d="M21 40v-7a3 3 0 0 1 6 0v7" fill={A} stroke={N} strokeWidth="2.5" />
      <path d="M24 16V6" stroke={N} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M24 6h9l-2.5 3.5L33 13h-9Z" fill={A} stroke={N} strokeWidth="2" strokeLinejoin="round" />
    </>
  ),
  ing: (
    <>
      <circle cx="21" cy="27" r="13" fill={W} stroke={N} strokeWidth="3" />
      <ellipse cx="21" cy="27" rx="6" ry="13" fill="none" stroke={N} strokeWidth="2" />
      <path d="M9.5 23h23M9.5 31h23" stroke={N} strokeWidth="2" />
      <path d="M31 6h9a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3h-3.5l-4 4v-4H31a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3Z" fill={A} stroke={N} strokeWidth="2" strokeLinejoin="round" />
    </>
  ),
  genel: (
    <path d="M24 5l5.6 11.7L42 18.6l-9.3 8.7 2.3 12.6L24 33.6l-11 6.3 2.3-12.6L6 18.6l12.4-1.9Z" fill={D} stroke={N} strokeWidth="3" strokeLinejoin="round" />
  ),
  oyun: (
    <>
      <path d="M15 16h18a11 11 0 0 1 11 11c0 5-3.8 9.3-8.5 8.8-3.2-.3-4.8-2.8-7-2.8H19.5c-2.2 0-3.8 2.5-7 2.8C7.8 36.3 4 32 4 27a11 11 0 0 1 11-11Z" fill={W} stroke={N} strokeWidth="3" strokeLinejoin="round" />
      <path d="M15 23v8M11 27h8" stroke={N} strokeWidth="3" strokeLinecap="round" />
      <circle cx="31" cy="25" r="2.4" fill={A} />
      <circle cx="36.5" cy="29.5" r="2.4" fill={D} stroke={N} strokeWidth="1.2" />
    </>
  ),
  spor: (
    <>
      <circle cx="24" cy="24" r="17" fill={W} stroke={N} strokeWidth="3" />
      <path d="M24 17l6.5 4.7-2.5 7.6h-8l-2.5-7.6Z" fill={N} />
      <path d="M24 17V8M30.5 21.7l8.5-3M28 29.3l5.5 7M20 29.3l-5.5 7M17.5 21.7l-8.5-3" stroke={N} strokeWidth="2.5" strokeLinecap="round" />
    </>
  ),
  panel: (
    <>
      <path d="M12 22v16a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2V22" fill={W} stroke={N} strokeWidth="3" strokeLinejoin="round" />
      <path d="M7 25 24 9l17 16" fill="none" stroke={N} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 40v-9a4 4 0 0 1 8 0v9" fill={A} stroke={N} strokeWidth="2.5" strokeLinejoin="round" />
    </>
  ),
  hoca: (
    <>
      <path d="M5 18 24 9.5 43 18l-19 8.5Z" fill={N} stroke={K} strokeWidth="2" strokeLinejoin="round" />
      <path d="M14 23.5v6c0 3 4.5 5.5 10 5.5s10-2.5 10-5.5v-6" fill={K} />
      <path d="M40 20v10" stroke={A} strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="40" cy="32.5" r="3" fill={D} stroke={N} strokeWidth="1.5" />
    </>
  ),
  canli: (
    <>
      <rect x="6" y="10" width="36" height="25" rx="4" fill={W} stroke={N} strokeWidth="3" />
      <path d="M21 17.5l9 5-9 5Z" fill={A} stroke={N} strokeWidth="2" strokeLinejoin="round" />
      <circle cx="36" cy="16" r="2.6" fill={KIRMIZI} />
      <path d="M18 41h12M24 35.5V41" stroke={N} strokeWidth="3" strokeLinecap="round" />
    </>
  ),
  soru: (
    <>
      <path d="M10 7h28a4 4 0 0 1 4 4v17a4 4 0 0 1-4 4H27l-8 8v-8h-9a4 4 0 0 1-4-4V11a4 4 0 0 1 4-4Z" fill={W} stroke={N} strokeWidth="3" strokeLinejoin="round" />
      <path d="M19.5 16.5c.8-2.6 3-4 5.3-3.8 2.6.2 4.7 2 4.7 4.5 0 3.3-4.5 3.6-4.5 7" fill="none" stroke={A} strokeWidth="3.4" strokeLinecap="round" />
      <circle cx="24.8" cy="28.8" r="2.2" fill={A} />
    </>
  ),
  tekrar: (
    <>
      <path d="M39 24a15 15 0 1 1-5.2-11.4" fill="none" stroke={N} strokeWidth="3.5" strokeLinecap="round" />
      <path d="M40 5.5 34.5 14l9 1.2Z" fill={N} />
      <path d="M20.5 18.5l9.5 5.5-9.5 5.5Z" fill={A} stroke={N} strokeWidth="2" strokeLinejoin="round" />
    </>
  ),
  plan: (
    <>
      <rect x="7" y="11" width="34" height="29" rx="4" fill={W} stroke={N} strokeWidth="3" />
      <path d="M7 19.5h34" stroke={N} strokeWidth="2.5" />
      <path d="M16 7v7M32 7v7" stroke={N} strokeWidth="3" strokeLinecap="round" />
      <rect x="13" y="25" width="8" height="8" rx="2" fill={A} />
      <path d="M26 30l3 3 6.5-6.5" fill="none" stroke={N} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  kupa: (
    <>
      <path d="M16 7h16v11a8 8 0 0 1-16 0Z" fill={D} stroke={N} strokeWidth="3" strokeLinejoin="round" />
      <path d="M16 10h-6a1.8 1.8 0 0 0-1.8 1.8C8.2 16.5 11 19.5 16 20M32 10h6a1.8 1.8 0 0 1 1.8 1.8C39.8 16.5 37 19.5 32 20" fill="none" stroke={N} strokeWidth="2.6" strokeLinecap="round" />
      <path d="M24 26v6" stroke={N} strokeWidth="3" />
      <path d="M17 39h14l-2-7H19Z" fill={A} stroke={N} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M24 11l1.6 3.2 3.6.5-2.6 2.5.6 3.5-3.2-1.7-3.2 1.7.6-3.5-2.6-2.5 3.6-.5Z" fill={W} />
    </>
  ),
  forum: (
    <>
      <path d="M8 8h22a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H19l-7 7v-7h-4a4 4 0 0 1-4-4V12a4 4 0 0 1 4-4Z" fill={W} stroke={N} strokeWidth="3" strokeLinejoin="round" />
      <circle cx="14" cy="17" r="1.9" fill={N} />
      <circle cx="21" cy="17" r="1.9" fill={N} />
      <circle cx="28" cy="17" r="1.9" fill={N} />
      <path d="M38 20v3a7 7 0 0 1 6 6.7c0 2.6-1.4 4.6-3.4 5.8l.4 5-5.5-3.6H32a7 7 0 0 1-6.4-4" fill={A} stroke={N} strokeWidth="2.5" strokeLinejoin="round" />
    </>
  ),
  ayar: (
    <>
      {[0, 45, 90, 135, 180, 225, 270, 315].map((aci) => (
        <rect key={aci} x="21.6" y="5" width="4.8" height="7" rx="2" fill={N} transform={`rotate(${aci} 24 24)`} />
      ))}
      <circle cx="24" cy="24" r="10.5" fill={W} stroke={N} strokeWidth="3" />
      <circle cx="24" cy="24" r="4" fill={A} stroke={N} strokeWidth="2" />
    </>
  ),
  cikis: (
    <>
      <path d="M20 8h15a3 3 0 0 1 3 3v26a3 3 0 0 1-3 3H20" fill={W} stroke={N} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 24h18M18 17l6 7-6 7" fill="none" stroke={A} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  kalem: (
    <>
      <path d="M13 29 30 12l6 6-17 17-8.5 2.5Z" fill={D} stroke={N} strokeWidth="3" strokeLinejoin="round" />
      <path d="M26.5 15.5l6 6" stroke={N} strokeWidth="2.4" />
      <path d="M13 29l6 6" stroke={N} strokeWidth="2.4" />
      <path d="M10.5 37.5 19 35l-6-6Z" fill={N} />
    </>
  ),
  sure: (
    <>
      <circle cx="24" cy="27" r="14" fill={W} stroke={N} strokeWidth="3" />
      <path d="M20 6.5h8M24 6.5V13" stroke={N} strokeWidth="3" strokeLinecap="round" />
      <path d="M24 27l6.5-5.5" stroke={A} strokeWidth="3.4" strokeLinecap="round" />
      <circle cx="24" cy="27" r="2.2" fill={N} />
      <path d="M24 17v2.5M34 27h-2.5M24 37v-2.5M14 27h2.5" stroke={N} strokeWidth="2" strokeLinecap="round" />
    </>
  ),
  video: (
    <>
      <rect x="5" y="13" width="25" height="21" rx="4" fill={W} stroke={N} strokeWidth="3" />
      <path d="M30 21l12-6v18l-12-6Z" fill={A} stroke={N} strokeWidth="2.5" strokeLinejoin="round" />
      <circle cx="13" cy="20" r="2.4" fill={D} stroke={N} strokeWidth="1.5" />
    </>
  ),
  kilit: (
    <>
      <rect x="11" y="20" width="26" height="19" rx="4" fill={D} stroke={N} strokeWidth="3" />
      <path d="M16.5 20v-4.5a7.5 7.5 0 0 1 15 0V20" fill="none" stroke={N} strokeWidth="3" strokeLinecap="round" />
      <circle cx="24" cy="28" r="2.8" fill={N} />
      <path d="M24 30v4.5" stroke={N} strokeWidth="2.8" strokeLinecap="round" />
    </>
  ),
  tik: (
    <>
      <circle cx="24" cy="24" r="17" fill={D} stroke={N} strokeWidth="3" />
      <path d="M15.5 24.5l6 6L33 18" fill="none" stroke={N} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  alev: (
    <>
      <path d="M24 5c2 6.5 9.5 9 9.5 17.5a9.5 9.5 0 0 1-19 0c0-5.5 3.5-7.5 4.8-11.5 1.6 2.3 2.6 3.3 4.7-6Z" fill={A} stroke={N} strokeWidth="2.8" strokeLinejoin="round" />
      <path d="M24 21.5c1.6 3.2 4.3 4 4.3 7.3a4.3 4.3 0 0 1-8.6 0c0-3.3 2.7-4.1 4.3-7.3Z" fill={D} />
    </>
  ),
  rozet: (
    <>
      <path d="M17 5h6v11l-3 2.2L17 16Z" fill={A} stroke={N} strokeWidth="2" strokeLinejoin="round" />
      <path d="M25 5h6v11l-3 2.2L25 16Z" fill={N} stroke={N} strokeWidth="2" strokeLinejoin="round" />
      <circle cx="24" cy="30" r="11.5" fill={D} stroke={N} strokeWidth="3" />
      <path d="M24 24l1.9 3.8 4.2.6-3 3 .7 4.2-3.8-2-3.8 2 .7-4.2-3-3 4.2-.6Z" fill={N} />
    </>
  ),
  hedef: (
    <>
      <circle cx="22" cy="26" r="15" fill={W} stroke={N} strokeWidth="3" />
      <circle cx="22" cy="26" r="9" fill={D} stroke={N} strokeWidth="2.5" />
      <circle cx="22" cy="26" r="3.2" fill={A} stroke={N} strokeWidth="2" />
      <path d="M22 26 38 10M33 9h6v6" fill="none" stroke={N} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  kitap: (
    <>
      <path d="M12 5h17l8 8v30H12Z" fill={W} stroke={N} strokeWidth="3" strokeLinejoin="round" />
      <path d="M29 5v8h8" fill={D} stroke={N} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M18 22h12M18 28h12M18 34h8" stroke={A} strokeWidth="2.6" strokeLinecap="round" />
    </>
  ),
  deneme: (
    <>
      <path d="M12 43V7" stroke={N} strokeWidth="3.5" strokeLinecap="round" />
      <path d="M12 8h23l-4.5 6.5L35 21H12Z" fill={A} stroke={N} strokeWidth="2.5" strokeLinejoin="round" />
      <rect x="17" y="11" width="4.5" height="4" fill={W} />
      <rect x="26" y="14" width="4.5" height="4" fill={W} />
    </>
  ),
  arsiv: (
    <>
      <rect x="7" y="9" width="34" height="9" rx="2" fill={D} stroke={N} strokeWidth="3" />
      <path d="M10.5 18v18a3 3 0 0 0 3 3h21a3 3 0 0 0 3-3V18" fill={W} stroke={N} strokeWidth="3" />
      <path d="M19 26h10" stroke={A} strokeWidth="3.2" strokeLinecap="round" />
    </>
  ),
  tel: (
    <path d="M14 6h6.5l3 8.5-4.3 3.2c1.7 4.3 5.2 7.8 9.5 9.5l3.2-4.3L40.5 26v7.5c0 2.3-1.9 4.3-4.2 4C22.7 35.8 11.2 24.3 9.5 10.7 9.2 8.4 11.7 6 14 6Z" fill={D} stroke={N} strokeWidth="2.8" strokeLinejoin="round" />
  ),
  mail: (
    <>
      <rect x="5" y="11" width="38" height="26" rx="4" fill={W} stroke={N} strokeWidth="3" />
      <path d="M7.5 14.5 24 27l16.5-12.5" fill="none" stroke={A} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  konum: (
    <>
      <path d="M24 43c-8.5-9.5-13.5-16-13.5-23a13.5 13.5 0 0 1 27 0c0 7-5 13.5-13.5 23Z" fill={A} stroke={N} strokeWidth="3" strokeLinejoin="round" />
      <circle cx="24" cy="19.5" r="5" fill={W} stroke={N} strokeWidth="2.5" />
    </>
  ),
  vak: (
    <>
      <circle cx="24" cy="26" r="14" fill={W} stroke={N} strokeWidth="3" />
      <path d="M7.5 16.5 24 9.5l16.5 7-16.5 7Z" fill={N} />
      <circle cx="19" cy="26.5" r="2.2" fill={K} />
      <circle cx="29" cy="26.5" r="2.2" fill={K} />
      <path d="M15.5 32q8.5 5.5 17 0-3.5 6.5-8.5 6.5t-8.5-6.5Z" fill={A} stroke={N} strokeWidth="2" strokeLinejoin="round" />
    </>
  ),
  dalga: (
    <>
      <path d="M4 20c4-6 9-6 13 0s9 6 13 0 9-6 14 0" fill="none" stroke={N} strokeWidth="3" strokeLinecap="round" />
      <path d="M4 30c4-6 9-6 13 0s9 6 13 0 9-6 14 0" fill="none" stroke={A} strokeWidth="3" strokeLinecap="round" />
    </>
  ),
  yumurta: (
    <>
      <path d="M24 5c7.5 0 12.5 10 12.5 19a12.5 12.5 0 0 1-25 0C11.5 15 16.5 5 24 5Z" fill={W} stroke={N} strokeWidth="3" />
      <path d="M17 24l4.5 3.5 4.5-4.5 5 4" fill="none" stroke={A} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  civciv: (
    <>
      <circle cx="24" cy="27" r="14" fill={D} stroke={N} strokeWidth="3" />
      <path d="M24 13c-1.5-4.5 1.5-7 4.5-7" fill="none" stroke={N} strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="19" cy="25" r="2.2" fill={K} />
      <circle cx="29" cy="25" r="2.2" fill={K} />
      <path d="M20 31h8l-4 5.5Z" fill={A} stroke={N} strokeWidth="2" strokeLinejoin="round" />
    </>
  ),
  tac: (
    <>
      <path d="M8 36V15l9.5 7.5L24 11l6.5 11.5L40 15v21Z" fill={D} stroke={N} strokeWidth="3" strokeLinejoin="round" />
      <path d="M8 36h32" stroke={N} strokeWidth="3" strokeLinecap="round" />
      <circle cx="16" cy="29" r="2.2" fill={A} stroke={N} strokeWidth="1.4" />
      <circle cx="24" cy="27" r="2.2" fill={A} stroke={N} strokeWidth="1.4" />
      <circle cx="32" cy="29" r="2.2" fill={A} stroke={N} strokeWidth="1.4" />
    </>
  ),
  ekle: (
    <>
      <circle cx="24" cy="24" r="17" fill={D} stroke={N} strokeWidth="3" />
      <path d="M24 16v16M16 24h16" stroke={N} strokeWidth="4" strokeLinecap="round" />
    </>
  ),
  sil: (
    <>
      <path d="M12.5 14h23l-2.3 23a3 3 0 0 1-3 2.7h-12.4a3 3 0 0 1-3-2.7Z" fill={W} stroke={N} strokeWidth="3" strokeLinejoin="round" />
      <path d="M8.5 14h31M18.5 14v-4h11v4" fill="none" stroke={N} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 20.5v12M28 20.5v12" stroke={KIRMIZI} strokeWidth="2.8" strokeLinecap="round" />
    </>
  ),
  duzenle: (
    <>
      <path d="M14 27 29 12l7 7-15 15-9 2Z" fill={D} stroke={N} strokeWidth="3" strokeLinejoin="round" />
      <path d="M26 15l7 7" stroke={N} strokeWidth="2.4" />
      <path d="M8 42h32" stroke={A} strokeWidth="3" strokeLinecap="round" />
    </>
  ),
  kullanici: (
    <>
      <circle cx="24" cy="16" r="9" fill={D} stroke={N} strokeWidth="3" />
      <path d="M8 41c2-9.5 8.5-14 16-14s14 4.5 16 14" fill={W} stroke={N} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  grafik: (
    <>
      <path d="M7 41h34" stroke={N} strokeWidth="3" strokeLinecap="round" />
      <rect x="11" y="26" width="7" height="12" rx="2" fill={W} stroke={N} strokeWidth="2.6" />
      <rect x="20.5" y="18" width="7" height="20" rx="2" fill={D} stroke={N} strokeWidth="2.6" />
      <rect x="30" y="9" width="7" height="29" rx="2" fill={A} stroke={N} strokeWidth="2.6" />
    </>
  ),
  gonder: (
    <>
      <path d="M6 21 42 7 32 41l-8.5-11.5L6 21Z" fill={W} stroke={N} strokeWidth="3" strokeLinejoin="round" />
      <path d="M42 7 23.5 29.5" stroke={A} strokeWidth="2.6" strokeLinecap="round" />
    </>
  ),
  yukle: (
    <>
      <path d="M8 31v6a4 4 0 0 0 4 4h24a4 4 0 0 0 4-4v-6" fill="none" stroke={N} strokeWidth="3" strokeLinecap="round" />
      <path d="M24 30V8M15 17l9-9 9 9" fill="none" stroke={A} strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  bildirim: (
    <>
      <path d="M24 5a3 3 0 0 1 3 3v1.5c6 2 9 7 9 13v7l3.5 5.5H8.5L12 29.5v-7c0-6 3-11 9-13V8a3 3 0 0 1 3-3Z" fill={D} stroke={N} strokeWidth="3" strokeLinejoin="round" />
      <path d="M19.5 38a4.5 4.5 0 0 0 9 0" fill="none" stroke={N} strokeWidth="3" strokeLinecap="round" />
    </>
  ),
  geri: (
    <path d="M29 9 14 24l15 15" fill="none" stroke={N} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
  ),
  oynat: (
    <>
      <circle cx="24" cy="24" r="17" fill={A} stroke={N} strokeWidth="3" />
      <path d="M19.5 16.5 33 24l-13.5 7.5Z" fill={W} stroke={N} strokeWidth="2" strokeLinejoin="round" />
    </>
  ),
  el: (
    <>
      <path d="M15 24V12a3 3 0 0 1 6 0v9-13a3 3 0 0 1 6 0v13-10a3 3 0 0 1 6 0v12-6a3 3 0 0 1 6 0v11c0 8-5 14-12.5 14-6 0-9-2.5-11.5-7L10 26.5c-1.5-2.5 1-5.5 3.7-4.3Z" fill={D} stroke={N} strokeWidth="2.8" strokeLinejoin="round" />
      <path d="M27 30c3 .5 5 2.5 5.5 5.5" fill="none" stroke={N} strokeWidth="2.2" strokeLinecap="round" />
    </>
  ),
};

export function Ikon({
  ad,
  boy = 24,
  className = "",
}: {
  ad: IkonAd;
  boy?: number;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 48 48"
      width={boy}
      height={boy}
      className={`inline-block shrink-0 align-middle ${className}`}
      aria-hidden
    >
      {CIZIMLER[ad]}
    </svg>
  );
}
