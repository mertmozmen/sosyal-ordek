/* eslint-disable @next/next/no-img-element */
const KOK = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const DOSYALAR = [
  "yumurta",
  "catlayan-yumurta",
  "civciv",
  "palaz",
  "genc-ordek",
  "usta-ordek",
  "mezun-ordek",
] as const;

/** Yumurtadan Ördeğe: 7 aşamanın Higgsfield üretimi maskot görselleri
 *  (public/gorseller/evrim/, şeffaf zeminli PNG).
 *  siluet: kilitli aşamalar soluk gri görünür — doygun düz renkli
 *  görsellerde grayscale, eski çizgi-SVG'lerin aksine temiz okunuyor. */
export function EvrimFigur({
  asama,
  boy = 64,
  className = "",
  siluet = false,
}: {
  asama: number;
  boy?: number;
  className?: string;
  siluet?: boolean;
}) {
  const ad = DOSYALAR[Math.min(DOSYALAR.length - 1, Math.max(0, asama))];
  return (
    <img
      src={`${KOK}/gorseller/evrim/${ad}.png`}
      alt=""
      width={boy}
      height={boy}
      draggable={false}
      className={`inline-block shrink-0 object-contain select-none ${
        siluet ? "opacity-90 grayscale" : ""
      } ${className}`}
    />
  );
}
