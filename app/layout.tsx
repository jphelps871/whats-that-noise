import "./globals.css";
import "leaflet/dist/leaflet.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { Map } from "@/components/map/map";
import { ToggleCardsOnMapProvider } from "@/providers/toggle-cards-on-map-provider";

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: "What's That Noise",
  description: "Pinpoint or find annoying or loud noises",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", "font-sans", inter.variable)}
    >
      <body className="overflow-hidden">
        <Map />
        <ToggleCardsOnMapProvider>
          <div className="relative z-10 pointer-events-none m-2">
            {children}
          </div>
        </ToggleCardsOnMapProvider>
      </body>
    </html>
  );
}
