"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { href: "/", label: "Overview" },
  { href: "/download", label: "Download" },
  { href: "/tasks", label: "Tasks" },
  { href: "/build", label: "Build" },
  { href: "/docs", label: "Docs" },
  { href: "/docs/commands", label: "CLI" },
];

export default function NoxShell({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();

  return (
    <div className="site-frame">
      <header className="topbar">
        <Link className="brand" href="/" aria-label="Nox home">
          <div className="brand-mark">
            <Image
              src="/assets/nox-Icon.svg"
              alt=""
              width={26}
              height={26}
              priority
            />
          </div>
          <span>
            nox<span className="brand-dot">.</span>build
          </span>
        </Link>
        <nav className="nav-links" aria-label="Main navigation">
          {navigation.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : item.href === "/docs"
                  ? pathname === "/docs"
                  : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={isActive ? "nav-link active" : "nav-link"}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </header>
      <main>{children}</main>
      <footer className="footer">
        <Image
          className="footer-mark"
          src="/assets/nox-Icon.svg"
          alt="Nox"
          width={24}
          height={20}
        />
        <span>Build with Nox.</span>
        <span className="footer-spacer" />
        <a href="https://unlicense.org/" target="_blank" rel="noreferrer">
          The Unlicense
        </a>
      </footer>
    </div>
  );
}
