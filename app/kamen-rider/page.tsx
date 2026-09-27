import Link from "next/link";

export const metadata = { title: "After Dark" };

export default function KamenRiderPage() {
  return (
    <div className="page section-width interior-page reference-page">
      <div className="page-intro">
        <p className="eyebrow">A little lore.</p>
        <h1>
          Why Nox is
          <br />
          <em>called Nox.</em>
        </h1>
        <p>
          A small origin story for the name on the command line and the unusual
          name we gave its language backends.
        </p>
      </div>
      <div className="reference-grid">
        <section className="reference-section">
          <div className="reference-label">The name</div>
          <div>
            <h2>Named after a Rider.</h2>
            <p>
              Nox takes its name from Nox, a character in Kamen Rider Zeztz.
              The build system is named after that Rider.
            </p>
          </div>
        </section>
        <section className="reference-section">
          <div className="reference-label">The build system</div>
          <div>
            <h2>Why are the backends called Riders?</h2>
            <p>
              Because Nox is a Rider. The name carried over to
              Nox's language-specific build backends: each Rider brings the
              tools and build steps that turn a language's source code into an
              artifact.
            </p>
            <div className="reference-links">
              <Link href="/riders">
                Meet the Nox Riders <span aria-hidden="true">→</span>
              </Link>
              <Link href="/">
                Back to Nox <span aria-hidden="true">→</span>
              </Link>
            </div>
            <div className="official-links">
              <a
                className="button button-quiet"
                href="https://www.tv-asahi.co.jp/zeztz/character/nox/"
                target="_blank"
                rel="noreferrer"
              >
                Nox on the official Zeztz site{" "}
                <span aria-hidden="true">↗</span>
              </a>
              <a
                className="button button-quiet"
                href="https://www.kamen-rider-official.com/finalstage/en/"
                target="_blank"
                rel="noreferrer"
              >
                Kamen Rider Final Stage <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}