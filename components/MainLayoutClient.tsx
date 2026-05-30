"use client";

import { usePathname } from "next/navigation";
import { SiteModeProvider } from "@/context/SiteModeContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function MainLayoutClient({
  children,
  siteLive,
}: {
  children: React.ReactNode;
  siteLive: boolean;
}) {
  const pathname = usePathname();
  // Staging Coming Soon at / — no chrome (matches pre-live-mode behavior)
  const showChrome = siteLive || pathname !== "/";

  return (
    <SiteModeProvider>
      <div className="page-wrapper">
        {showChrome && <Header />}
        {children}
        {showChrome && <Footer />}
      </div>
    </SiteModeProvider>
  );
}
