"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Fächer" },
  { href: "/lernhilfe", label: "Lernhilfe" }
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <nav className="mainNav" aria-label="Hauptmenü">
      {links.map((link) => {
        const active = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={active ? "navLink navLinkActive" : "navLink"}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
