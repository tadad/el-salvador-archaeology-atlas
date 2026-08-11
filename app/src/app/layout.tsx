import type { Metadata } from "next";
import "leaflet/dist/leaflet.css";
import "./globals.css";
import "./filters.css";

export const metadata: Metadata = {
  title: "El Salvador Archaeology Atlas",
  description:
    "An interactive, source-linked map of archaeological excavations and maritime sites documented in the El Salvador papers corpus.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
