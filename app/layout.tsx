import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { LogoutButton } from "@/components/LogoutButton";
import { MainNav } from "@/components/MainNav";
import { ThemeToggle } from "@/components/ThemeToggle";

export const metadata: Metadata = {
  title: "Karteikarten Lernapp",
  description: "Private Lernapp für Excel-Karteikarten"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" data-theme="dark" suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem("flashcards-theme");document.documentElement.dataset.theme=t==="light"?"light":"dark";}catch(e){document.documentElement.dataset.theme="dark";}})();` }} />
        <div className="appShell">
          <header className="topbar">
            <div className="topbarLeft">
              <Link href="/" className="brand">Karteikarten</Link>
              <MainNav />
            </div>
            <div className="topbarActions"><ThemeToggle /><LogoutButton /></div>
          </header>
          <main className="pageContainer">{children}</main>
        </div>
      </body>
    </html>
  );
}
