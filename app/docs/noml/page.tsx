import Link from "next/link";

export const metadata = { title: "NOML" };

export default function NomlPage() {
  return (
    <div className="page section-width interior-page reference-page">
      <div className="page-intro">
        <p className="eyebrow">Nox Object Modeling Language</p>
        <h1>
          Rules that stay
          <br />
          <em>readable.</em>
        </h1>
        <p>
          NOML is the small object-modeling language used by Nox for embedded
          rules and structured configuration. The standalone crate provides a
          parser, serializer, command-line interface, and formatter.
        </p>
      </div>
      <div className="reference-grid">
        <section className="reference-section">
          <div className="reference-label">A small document</div>
          <div>
            <h2>Objects, arrays, and rulesets.</h2>
            <pre><code>{`ruleset "commands" {
    command: build {
        aliases: ["b", "compile"]
        rules: {
            requires_project: true
            accepts_files_as_input: false
        }
    }
}`}</code></pre>
            <p>
              NOML supports scalar values, nested objects, arrays, comments,
              rulesets, named entries, and entry inheritance with <code>extends</code>.
              Parsed extensions are resolved before the value is returned.
            </p>
          </div>
        </section>
        <section className="reference-section">
          <div className="reference-label">Standalone crate</div>
          <div>
            <h2>Use NOML outside Nox.</h2>
            <pre><code>{`cd noml
cargo build
cargo run -- parse demo.noml
cargo run -- check demo.noml`}</code></pre>
            <p>
              The <code>noml</code> package contains <code>src/lib.rs</code> for
              embedding the parser and a default CLI for parsing, checking, and
              formatting files. It is an independent Rust project under the
              Nox repository.
            </p>
          </div>
        </section>
        <section className="reference-section">
          <div className="reference-label">Formatting</div>
          <div>
            <h2>Canonical output in one command.</h2>
            <pre><code>{`cd noml
cargo run -- format rules.noml
cargo run --bin nomlfmt -- rules.noml`}</code></pre>
            <p>
              Both format commands parse and serialize the file in place. The
              library also exposes <code>format_text</code>, <code>format_file</code>,
              and <code>format_file_in_place</code> helpers for tools and editor
              integrations.
            </p>
          </div>
        </section>
        <section className="reference-section">
          <div className="reference-label">Nox integration</div>
          <div>
            <h2>Rules are data, not hard-coded branches.</h2>
            <p>
              Nox embeds NOML rule files for base commands and project
              initialization. Those rules describe command aliases, accepted
              inputs, language metadata, target relationships, flags, and
              generated templates. The Rust implementation loads them through
              the NOML parser at runtime.
            </p>
            <div className="reference-links">
              <Link href="/build">Read the nox.build reference <span>→</span></Link>
              <Link href="/docs/commands">Read the command reference <span>→</span></Link>
              <Link href="/docs/testing">Read the testing workflow <span>→</span></Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
