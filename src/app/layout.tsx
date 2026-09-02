import type { Metadata } from "next";
import { Archivo, Hanken_Grotesk, Changa, Almarai } from "next/font/google";
import "./globals.css";
import { LocaleProvider } from "@/i18n/locale-provider";
import { ScrollProvider } from "@/components/motion/scroll-provider";
import { ar } from "@/content/ar";
import { en } from "@/content/en";

// Their offer cards set the figures in a heavy grotesk. Archivo is that
// voice, and it is the same file the 3D price uses.
const archivo = Archivo({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-archivo",
});
const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-hanken",
});
const changa = Changa({
  subsets: ["arabic", "latin"],
  weight: ["500", "600", "700"],
  variable: "--font-changa",
});
const almarai = Almarai({
  subsets: ["arabic"],
  weight: ["300", "400", "700"],
  variable: "--font-almarai",
});

export const metadata: Metadata = {
  title: "Motor Zone — They tell you the price | Sheraton, Cairo",
  description:
    "The only dealership in this series that publishes the number: official prices, a discount with the old figure showing, exact deposits and monthlies, and the rate they start from.",
  metadataBase: new URL("https://motor-zone-site.vercel.app"),
  icons: { icon: "/mark.svg" },
  openGraph: {
    title: "Motor Zone — They tell you the price",
    description: "A dealership page made entirely of published figures.",
    locale: "ar_EG",
    type: "website",
  },
  other: { "theme-color": "#0d0e10" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // translate="no": the page ships hand-written Arabic and English, and
    // Chrome's auto-translate rewrites `lang`, which would also break every
    // [dir="rtl"] correction if the CSS were keyed off language instead.
    <html
      lang="ar"
      dir="rtl"
      translate="no"
      className={`notranslate ${archivo.variable} ${hanken.variable} ${changa.variable} ${almarai.variable}`}
    >
      <body className="bg-card text-chalk antialiased">
        {/* Figures count in under an intersection observer, so without
            scripting every one of them would stay at opacity 0. */}
        <noscript>
          <style>{`[data-count],[data-rule]{opacity:1!important;transform:none!important;animation:none!important}`}</style>
        </noscript>
        <LocaleProvider dictionaries={{ ar, en }} defaultLocale="ar">
          <ScrollProvider />
          {children}
        </LocaleProvider>
      </body>
    </html>
  );
}
