import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Map } from "@/components/map/map";
import "leaflet/dist/leaflet.css";

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
        <div className="relative z-10 pointer-events-none m-2">
          {children}
        </div>
      </body>
    </html>
  );
}
