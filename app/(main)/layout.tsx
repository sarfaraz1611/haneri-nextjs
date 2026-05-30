import MainLayoutClient from "@/components/MainLayoutClient";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const siteLive = process.env.SITE_LIVE === "true";
  return <MainLayoutClient siteLive={siteLive}>{children}</MainLayoutClient>;
}
