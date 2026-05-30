import HomePage from "@/components/HomePage";
import ComingSoon from "@/components/ComingSoon";

export default function Page() {
  if (process.env.SITE_LIVE === "true") {
    return <HomePage />;
  }
  return <ComingSoon />;
}
