import Link from "next/link";

export const metadata = { title: "Sitemap" };

const sections = [
  {
    label: "Explore",
    items: [
      ["Overview", "/"],
      ["Download", "/download"],
    ],
  },
  {
    label: "Workflow",
    items: [
      ["Tasks", "/tasks"],
      ["Build", "/build"],
      ["Init", "/init"],
    ],
  },
  {
    label: "Documentation",
    items: [
      ["Docs", "/docs"],
      ["CLI", "/docs/commands"],
      ["Architecture", "/docs/architecture"],
      ["Toolchains", "/docs/toolchains"],
      ["Workflows", "/docs/workflows"],
      ["Testing", "/docs/testing"],
      ["Troubleshooting", "/docs/troubleshooting"],
      ["Development", "/docs/development"],
      ["NoxIDE", "/docs/noxide"],
      ["Noxical", "/docs/noxical"],
      ["Riders", "/riders"],
      ["Runners", "/runners"],
    ],
  },
];

export default function SitemapPage() {
  return (
    <div className="page section-width interior-page reference-page">
      <div className="page-intro">
        <p className="eyebrow">Site map</p>
        <h1>
          Find your way
          <br />
          <em>around Nox.</em>
        </h1>
        <p>
          Every public page, gathered in one place.
        </p>
      </div>
      <div className="reference-grid sitemap-grid">
        {sections.map((section) => (
          <section className="reference-section" key={section.label}>
            <div className="reference-label">{section.label}</div>
            <div className="sitemap-links">
              {section.items.map(([label, href]) => (
                <Link href={href} key={href} className="sitemap-link">
                  <strong>{label}</strong>
                  <span>Open page <b aria-hidden="true">→</b></span>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}