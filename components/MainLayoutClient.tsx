"use client";

import { SiteModeProvider } from "@/context/SiteModeContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function MainLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SiteModeProvider>
      <div className="page-wrapper">
        <Header />
        {children}
        <Footer />
      </div>
    </SiteModeProvider>
  );
}
