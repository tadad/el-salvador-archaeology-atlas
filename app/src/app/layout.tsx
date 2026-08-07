import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "leaflet/dist/leaflet.css";
import "./globals.css";
import "./filters.css";

const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "El Salvador Archaeology Atlas",
  description:
    "An interactive, source-linked map of archaeological excavations and maritime sites documented in the El Salvador papers corpus.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={sans.variable}>{children}</body>
    </html>
  );
}
