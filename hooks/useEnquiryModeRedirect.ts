"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSiteMode } from "@/context/SiteModeContext";

export function useEnquiryModeRedirect() {
  const { isEnquiryMode, loading } = useSiteMode();
  const router = useRouter();

  useEffect(() => {
    if (!loading && isEnquiryMode) {
      router.replace("/shop");
    }
  }, [loading, isEnquiryMode, router]);

  return { loading, isEnquiryMode };
}
