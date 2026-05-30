"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { BASE_URL } from "@/components/product/constants";

export type SiteMode = "shopping" | "enquiry";

interface SiteModeContextValue {
  siteMode: SiteMode;
  enquiryUrl: string;
  loading: boolean;
  isShoppingMode: boolean;
  isEnquiryMode: boolean;
}

const SiteModeContext = createContext<SiteModeContextValue>({
  siteMode: "shopping",
  enquiryUrl: "",
  loading: true,
  isShoppingMode: true,
  isEnquiryMode: false,
});

export function SiteModeProvider({ children }: { children: ReactNode }) {
  const [siteMode, setSiteMode] = useState<SiteMode>("shopping");
  const [enquiryUrl, setEnquiryUrl] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const res = await fetch(`${BASE_URL}/site/config`);
        const json = await res.json();
        const mode = json?.data?.site_mode;

        if (mode === "enquiry" || mode === "shopping") {
          setSiteMode(mode);
        }

        if (mode === "enquiry" && json?.data?.google_sheets_enquiry_url) {
          setEnquiryUrl(json.data.google_sheets_enquiry_url);
        }
      } catch {
        // Default to shopping on failure
      } finally {
        setLoading(false);
      }
    };

    fetchConfig();
  }, []);

  return (
    <SiteModeContext.Provider
      value={{
        siteMode,
        enquiryUrl,
        loading,
        isShoppingMode: siteMode === "shopping",
        isEnquiryMode: siteMode === "enquiry",
      }}
    >
      {children}
    </SiteModeContext.Provider>
  );
}

export function useSiteMode() {
  return useContext(SiteModeContext);
}
