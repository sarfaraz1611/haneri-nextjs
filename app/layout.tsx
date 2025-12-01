import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
    <html lang="en">
      <head>
        {/* Preconnect to Google Fonts for better performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Google Fonts - Matching header.php exactly */}
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;500;600;700&family=Open+Sans:wght@300;400;600;700;800&family=Poppins:wght@300;400;500;600;700&family=Raleway:wght@400;700&family=Roboto:wght@400;500;700&display=swap"
          rel="stylesheet"
        />

        {/* Font Awesome Icons */}
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
          rel="stylesheet"
        />

        {/* Simple Line Icons */}
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/simple-line-icons/2.5.5/css/simple-line-icons.min.css"
          rel="stylesheet"
        />
      </head>
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
