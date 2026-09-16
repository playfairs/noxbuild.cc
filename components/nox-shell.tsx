"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { parse } from "yaml";

type Definition = {
  summary: string;
  details: string[];
  examples: string[];
  links: { label: string; href: string }[];
};

type Definitions = Record<string, Definition>;

const documentationGroups = [
  {
    label: "Workflow",
    items: [
      { href: "/tasks", label: "Tasks" },
      { href: "/build", label: "Build" },
      { href: "/init", label: "Init" },
    ],
  },
  {
    label: "Reference",
    items: [
      { href: "/docs", label: "Docs" },
      { href: "/docs/commands", label: "CLI" },
      { href: "/docs/architecture", label: "Architecture" },
      { href: "/docs/toolchains", label: "Toolchains" },
      { href: "/docs/workflows", label: "Workflows" },
      { href: "/docs/testing", label: "Testing" },
      { href: "/docs/troubleshooting", label: "Troubleshooting" },
      { href: "/docs/development", label: "Development" },
    ],
  },
  {
    label: "Ecosystem",
    items: [
      { href: "/docs/noxide", label: "NoxIDE" },
      { href: "/docs/noxical", label: "Noxical" },
      { href: "/docs/noml", label: "NOML" },
      { href: "/riders", label: "Riders" },
      { href: "/runners", label: "Runners" },
    ],
  },
];

const MENU_DELAY_MS = 50;

export default function NoxShell({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const [isDocumentationOpen, setDocumentationOpen] = useState(false);
  const [definitions, setDefinitions] = useState<Definitions>({});
  const [definition, setDefinition] = useState<{
    term: string;
    data: Definition;
  } | null>(null);
  const menuTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const documentationPaths = documentationGroups.flatMap((group) =>
    group.items.map((item) => item.href),
  );
  const documentationIsActive = documentationPaths.some((path) =>
    pathname.startsWith(path),
  );

  const clearMenuTimer = () => {
    if (menuTimer.current) {
      clearTimeout(menuTimer.current);
      menuTimer.current = null;
    }
  };

  const scheduleMenu = (open: boolean) => {
    clearMenuTimer();
    menuTimer.current = setTimeout(() => {
      setDocumentationOpen(open);
      menuTimer.current = null;
    }, MENU_DELAY_MS);
  };

  useEffect(() => {
    setDocumentationOpen(false);
    setDefinition(null);
    clearMenuTimer();
  }, [pathname]);

  useEffect(() => clearMenuTimer, []);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    if (definition) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [definition]);

  useEffect(() => {
    fetch("/definitions.yaml")
      .then((response) => response.text())
      .then((contents) => setDefinitions(parse(contents) as Definitions))
      .catch(() => setDefinitions({}));
  }, []);

  useEffect(() => {
    const terms = Array.from(document.querySelectorAll("main code")).filter(
      (term) => !term.closest("pre"),
    );
    const activate = (event: Event) => {
      const element = event.currentTarget as HTMLElement;
      const term = element.textContent?.trim() ?? "";
      const matchingEntry = Object.entries(definitions).find(
        ([key]) => term === key || term.startsWith(`${key} `),
      );
      const matchingDefinition = matchingEntry?.[1];
      const fallback: Definition = {
        summary: term.startsWith("nox ")
          ? "A Nox CLI command for project configuration, building, running, or task automation."
          : "A highlighted Nox concept or page term.",
        details: [
          "This term is part of the Nox documentation vocabulary. Select a related reference from the navigation to learn more.",
        ],
        examples: [],
        links: [{ label: "Open Documentation", href: "/docs" }],
      };
      setDefinition({
        term,
        data: matchingDefinition ?? fallback,
      });
    };
    const handleKeyDown = (event: Event) => {
      const keyboardEvent = event as KeyboardEvent;
      if (keyboardEvent.key === "Enter" || keyboardEvent.key === " ") {
        keyboardEvent.preventDefault();
        activate(keyboardEvent);
      }
    };

    terms.forEach((term) => {
      term.classList.add("definition-term");
      term.setAttribute("role", "button");
      term.setAttribute("tabindex", "0");
      term.addEventListener("click", activate);
      term.addEventListener("keydown", handleKeyDown);
    });
    return () => {
      terms.forEach((term) => {
        term.classList.remove("definition-term");
        term.removeEventListener("click", activate);
        term.removeEventListener("keydown", handleKeyDown);
      });
    };
  }, [definitions, pathname]);

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
          <Link
            href="/"
            className={pathname === "/" ? "nav-link active" : "nav-link"}
          >
            Overview
          </Link>
          <Link
            href="/download"
            className={
              pathname.startsWith("/download") ? "nav-link active" : "nav-link"
            }
          >
            Download
          </Link>
          <Link
            href="/sitemap"
            className={
              pathname.startsWith("/sitemap") ? "nav-link active" : "nav-link"
            }
          >
            Sitemap
          </Link>
          <div
            className={isDocumentationOpen ? "nav-menu open" : "nav-menu"}
            onBlur={() => scheduleMenu(false)}
            onFocus={() => scheduleMenu(true)}
            onMouseEnter={() => scheduleMenu(true)}
            onMouseLeave={() => scheduleMenu(false)}
          >
            <button
              type="button"
              className={
                documentationIsActive
                  ? "nav-link nav-menu-trigger active"
                  : "nav-link nav-menu-trigger"
              }
              aria-expanded={isDocumentationOpen}
              aria-haspopup="true"
            >
              Documentation <span className="nav-menu-chevron">+</span>
            </button>
            <div className="nav-dropdown" aria-hidden={!isDocumentationOpen}>
              {documentationGroups.map((group) => (
                <div className="nav-dropdown-group" key={group.label}>
                  <span className="nav-dropdown-label">{group.label}</span>
                  {group.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={
                        (item.href === "/docs"
                          ? pathname === "/docs"
                          : pathname.startsWith(item.href))
                          ? "nav-dropdown-link active"
                          : "nav-dropdown-link"
                      }
                    >
                      <strong>{item.label}</strong>
                      <span>
                        {item.label === "Tasks" && "Automate work around builds."}
                        {item.label === "Build" && "Declare targets and dependencies."}
                        {item.label === "Init" && "Create a project from an existing folder."}
                        {item.label === "Docs" && "Read the Nox reference."}
                        {item.label === "CLI" && "Explore commands and flags."}
                        {item.label === "Architecture" && "See how Nox is structured."}
                        {item.label === "Toolchains" && "Understand compiler detection."}
                        {item.label === "Workflows" && "Follow common project loops."}
                        {item.label === "Testing" && "Develop and verify Nox."}
                        {item.label === "Troubleshooting" && "Recover from common failures."}
                        {item.label === "Development" && "Contribute to the build system."}
                        {item.label === "NoxIDE" && "Use the graphical editor."}
                        {item.label === "Noxical" && "Tokenize Nox syntax."}
                        {item.label === "NOML" && "Model Nox rules and data."}
                        {item.label === "Riders" && "See language build backends."}
                        {item.label === "Runners" && "Run source files directly."}
                      </span>
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </nav>
      </header>
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
              <span aria-hidden="true">×</span>
            </button>
            <p className="eyebrow">Nox definition</p>
            <div className="cli-modal-heading">
              <h2 id="definition-title">{definition.term}</h2>
            </div>
            <div className="cli-detail-purpose">
              <span className="cli-detail-label">What Nox means</span>
              <p>{definition.data.summary}</p>
            </div>
            <div className="cli-detail-block">
              <span className="cli-detail-label">In depth</span>
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
                    <Link href={link.href} key={link.href} onClick={() => setDefinition(null)}>
                      {link.label} <span>→</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </section>
        </div>
      )}
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
