"use client";

import OurStorySection from "./components/OurStorySection";
import { useEffect, useState } from "react";

export default function OurStoryPage() {
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    // Listen for custom event to show footer
    const handleShowFooter = () => setShowFooter(true);
    const handleHideFooter = () => setShowFooter(false);

    window.addEventListener('showOurStoryFooter', handleShowFooter);
    window.addEventListener('hideOurStoryFooter', handleHideFooter);

    return () => {
      window.removeEventListener('showOurStoryFooter', handleShowFooter);
      window.removeEventListener('hideOurStoryFooter', handleHideFooter);
    };
  }, []);

  return (
    <>
      <main className="main about bg-white" style={{ minHeight: showFooter ? 'auto' : '100vh' }}>
        <OurStorySection onShowFooter={() => setShowFooter(true)} onHideFooter={() => setShowFooter(false)} />
      </main>
      {showFooter && <div className="h-1" />}
    </>
  );
}
