import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { LogoutButton } from "@/components/LogoutButton";

export const metadata: Metadata = {
  title: "Karteikarten Lernapp",
  description: "Private Lernapp für Excel-Karteikarten"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>
        <div className="appShell">
          <header className="topbar">
            <Link href="/" className="brand">Karteikarten</Link>
            <LogoutButton />
          </header>
          <main className="pageContainer">{children}</main>
        </div>
      </body>
    </html>
  );
}
