import Link from "next/link";

export const metadata = { title: "Page Not Found" };

export default function NotFound() {
  return (
    <div className="page section-width interior-page reference-page">
      <div className="page-intro">
        <p className="eyebrow">Error 404</p>
        <h1>
          This target
          <br />
          <em>doesn&apos;t exist.</em>
        </h1>
        <p>
          The path you followed does not point to a Nox page. It may have moved,
          or it may have never even existed.
        </p>
      </div>
      <div className="reference-grid">
        <section className="reference-section">
          <div className="reference-label">Recover</div>
          <div>
            <h2>Start from a known target.</h2>
            <p>
              Return to the overview or open the documentation index to find
              the command, build, task, Rider, or Runner reference you need.
            </p>
            <div className="reference-links">
              <Link href="/">Go to Overview <span>→</span></Link>
              <Link href="/docs">Open Documentation <span>→</span></Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}