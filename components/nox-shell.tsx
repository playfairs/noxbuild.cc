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
];

export function NoxShell({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();

  return (
    <div className="site-frame">
      <header className="topbar">
        <Link className="brand" href="/" aria-label="Nox home">
          <Image
            src="/assets/nox-Icon.svg"
            alt=""
            width={36}
            height={36}
            priority
          />
          <span>
            nox<span className="brand-dot">.</span>build
          </span>
        </Link>
        <nav className="nav-links" aria-label="Main navigation">
          {navigation.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
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
        <a
          className="github-link"
          href="https://github.com/playfairs/nox"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
        >
          <svg
            aria-hidden="true"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
          </svg>
        </a>
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
