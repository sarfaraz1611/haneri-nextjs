import type { Metadata } from "next";
import { Open_Sans, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800"],
  variable: "--font-open-sans",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-barlow-condensed",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Haneri - Premium Ceiling Fans",
  description:
    "Where the spirit of fluidic design meets cutting edge technology to bring harmony, balance and comfort to you.",
  keywords: "ceiling fans, BLDC fans, smart fans, Haneri",
  authors: [{ name: "Cognitive Branding" }],
  icons: {
    icon: "/images/Haneri_Favicon.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${openSans.variable} ${barlowCondensed.variable}`}
    >
      <body>
        <div className="page-wrapper">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
