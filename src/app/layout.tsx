import "./globals.css";

import { Geist, Geist_Mono } from "next/font/google";

import type { Metadata } from "next";
import Script from "next/script";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/components/auth-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Prime Fitness Plus - Unleash Your Potential",
  description:
    "Prime Fitness Plus LLC - High performance adaptive fitness and athletic development services based in Stockton, CA.",
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-BLMY13KD38"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
           gtag('config', 'G-BLMY13KD38');
        `}
      </Script>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-green-500/30`}
        suppressHydrationWarning
      >
        <AuthProvider>
          <TooltipProvider>
            {children}
          </TooltipProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
