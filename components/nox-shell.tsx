"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Blocks,
  BookOpen,
  Code2,
  Compass,
  Download,
  Hammer,
  ListTree,
  Play,
  TerminalSquare,
  Wrench,
} from "lucide-react";
import { parse } from "yaml";

type Definition = {
  summary: string;
  details: string[];
  examples: string[];
  links: { label: string; href: string }[];
};
type Definitions = Record<string, Definition>;

const navGroups = [
  {
    label: "Start here",
    items: [
      { href: "/", label: "Overview", icon: Compass, exact: true },
      { href: "/download", label: "Install Nox", icon: Download },
      { href: "/docs/workflows", label: "Workflows", icon: Play },
    ],
  },
  {
    label: "Build system",
    items: [
      { href: "/build", label: "nox.build", icon: Blocks },
      { href: "/tasks", label: "noxfile tasks", icon: TerminalSquare },
      { href: "/init", label: "Project init", icon: Hammer },
      { href: "/riders", label: "Riders", icon: Wrench },
      { href: "/runners", label: "Runners", icon: Play },
    ],
  },
  {
    label: "Reference",
    items: [
      { href: "/docs/about", label: "About Nox", icon: Compass },
      { href: "/docs/architecture", label: "Architecture", icon: ListTree },
      {
        href: "/docs/commands",
        label: "Commands & Flags",
        icon: TerminalSquare,
      },
      { href: "/docs", label: "Documentation", icon: BookOpen, exact: true },
      { href: "/docs/toolchains", label: "Toolchains", icon: Wrench },
      {
        href: "/docs/troubleshooting",
        label: "Troubleshooting",
        icon: Compass,
      },
    ],
  },
  {
    label: "Ecosystem",
    items: [
      { href: "/docs/noml", label: "NOML", icon: BookOpen },
      { href: "/docs/development", label: "Development", icon: Wrench },
    ],
  },
];

export default function NoxShell({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const [definitions, setDefinitions] = useState<Definitions>({});
  const [definition, setDefinition] = useState<{
    term: string;
    data: Definition;
  } | null>(null);

  useEffect(() => {
    fetch("/definitions.yaml")
      .then((response) => response.text())
      .then((contents) =>
        setDefinitions(parse(contents, { uniqueKeys: false }) as Definitions),
      )
      .catch(() => setDefinitions({}));
  }, []);

  useEffect(() => {
    setDefinition(null);
    const terms = Array.from(document.querySelectorAll("main code")).filter(
      (term) => !term.closest("pre"),
    );
    const activate = (event: Event) => {
      const element = event.currentTarget as HTMLElement;
      const term = element.textContent?.trim() ?? "";
      const entry = Object.entries(definitions).find(
        ([key]) => term === key || term.startsWith(`${key} `),
      );
      setDefinition({
        term,
        data: entry?.[1] ?? {
          summary: term.startsWith("nox ")
            ? "A Nox CLI command for configuring, building, running, or automating a project."
            : "A term used in the Nox build-system reference.",
          details: [
            "Open a related reference page to see how this concept participates in the project workflow.",
          ],
          examples: [],
          links: [{ label: "Open documentation", href: "/docs" }],
        },
      });
    };
    const handleKeyDown = (event: Event) => {
      const keyEvent = event as KeyboardEvent;
      if (keyEvent.key === "Enter" || keyEvent.key === " ") {
        keyEvent.preventDefault();
        activate(keyEvent);
      }
    };
    terms.forEach((term) => {
      term.classList.add("definition-term");
      term.setAttribute("role", "button");
      term.setAttribute("tabindex", "0");
      term.addEventListener("click", activate);
      term.addEventListener("keydown", handleKeyDown);
    });
    return () =>
      terms.forEach((term) => {
        term.classList.remove("definition-term");
        term.removeEventListener("click", activate);
        term.removeEventListener("keydown", handleKeyDown);
      });
  }, [definitions, pathname]);

  return (
    <div className="site-frame">
      <aside className="site-rail">
        <Link className="brand" href="/" aria-label="Nox home">
          <span className="brand-mark">
            <Image
              src="/assets/nox-Icon.svg"
              alt=""
              width={30}
              height={30}
              priority
            />
          </span>
          <span>
            nox<span className="brand-dot">.</span>build
          </span>
        </Link>
        <p className="rail-kicker">Build & automation system</p>
        <nav className="rail-nav" aria-label="Documentation navigation">
          {navGroups.map((group) => (
            <section className="nav-group" key={group.label}>
              <h2>{group.label}</h2>
              {group.items.map((item) => {
                const Icon = item.icon;
                const active = item.exact
                  ? pathname === item.href
                  : pathname.startsWith(item.href);
                return (
                  <Link
                    className={active ? "nav-link active" : "nav-link"}
                    href={item.href}
                    key={item.href}
                  >
                    <Icon aria-hidden="true" size={15} strokeWidth={1.7} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </section>
          ))}
        </nav>
        <div className="rail-footer">
          <a
            href="https://github.com/playfairs/nox"
            target="_blank"
            rel="noreferrer"
          >
            <Code2 aria-hidden="true" size={15} /> Source on GitHub
          </a>
          <Link href="/sitemap">All pages</Link>
        </div>
      </aside>
      <main>{children}</main>
      {definition && (
        <div
          className="cli-modal-backdrop"
          role="presentation"
          onClick={() => setDefinition(null)}
        >
          <section
            className="cli-modal definition-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="definition-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="cli-modal-close"
              aria-label="Close definition"
              onClick={() => setDefinition(null)}
            >
              x
            </button>
            <p className="eyebrow">Nox reference</p>
            <div className="cli-modal-heading">
              <h2 id="definition-title">{definition.term}</h2>
            </div>
            <div className="cli-detail-block cli-detail-purpose">
              <span className="cli-detail-label">What it means</span>
              <p>{definition.data.summary}</p>
            </div>
            <div className="cli-detail-block">
              <span className="cli-detail-label">Details</span>
              {definition.data.details.map((detail) => (
                <p key={detail}>{detail}</p>
              ))}
            </div>
            {definition.data.examples.length > 0 && (
              <div className="cli-detail-block">
                <span className="cli-detail-label">Examples</span>
                <div className="definition-examples">
                  {definition.data.examples.map((example) => (
                    <code key={example}>{example}</code>
                  ))}
                </div>
              </div>
            )}
            {definition.data.links.length > 0 && (
              <div className="cli-detail-block definition-links">
                <span className="cli-detail-label">Related pages</span>
                <div className="reference-links">
                  {definition.data.links.map((link) => (
                    <Link
                      href={link.href}
                      key={link.href}
                      onClick={() => setDefinition(null)}
                    >
                      {link.label} <span>→</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
