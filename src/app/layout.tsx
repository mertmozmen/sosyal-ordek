import type { Metadata } from "next";
import { Baloo_2, Montserrat, Nunito } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/lib/store";
import { SayfaGecisi } from "@/components/SayfaGecisi";

const baloo = Baloo_2({
  subsets: ["latin-ext"],
  variable: "--font-baloo",
  weight: ["500", "600", "700", "800"],
});

const nunito = Nunito({
  subsets: ["latin-ext"],
  variable: "--font-nunito",
});

const montserrat = Montserrat({
  subsets: ["latin-ext"],
  variable: "--font-montserrat",
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Sosyal Ördek — LGS'ye Birlikte Hazırlanıyoruz",
  description:
    "9 aylık canlı eğitim programı, soru çözümleri, 28 haftalık kilitli plan ve rehber ördeğimiz Vakvak ile LGS yolculuğu. Ücretsiz ön görüşmeyle başla!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        className={`${baloo.variable} ${nunito.variable} ${montserrat.variable} font-sans antialiased`}
      >
        <AppProvider>
          {children}
          <SayfaGecisi />
        </AppProvider>
      </body>
    </html>
  );
}
