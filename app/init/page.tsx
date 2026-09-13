import Link from "next/link";

export const metadata = { title: "Init" };

export default function InitPage() {
  return (
    <div className="page section-width interior-page reference-page">
      <div className="page-intro">
        <p className="eyebrow">Project bootstrap</p>
        <h1>
          Start with
          <br />
          <em>nox init.</em>
        </h1>
        <p>
          Analyze an existing directory or create a new one, then generate the
          smallest useful Nox project around what is already there.
        </p>
      </div>
      <div className="reference-grid">
        <section className="reference-section">
          <div className="reference-label">The command</div>
          <div>
            <h2>Initialize from the project root.</h2>
            <pre><code>{`nox init
nox init my-project
nox init my-project --language rust --type executable
nox init --language c --formatter`}</code></pre>
            <p>
              With no name, Nox uses the current directory. A relative name is
              created below the current directory; an absolute name is used as
              given. Use <code>--name</code> when automation needs an explicit
              project name.
            </p>
          </div>
        </section>
        <section className="reference-section">
          <div className="reference-label">Analysis</div>
          <div>
            <h2>It looks before it writes.</h2>
            <p>
              Nox reports detected languages, package manifests, source files,
              tests, Git, Nix, and an existing <code>nox.build</code>. A single
              detected language is selected automatically. Multiple languages
              are offered interactively; a non-interactive empty directory
              defaults to Rust. Project type is inferred when possible and
              otherwise defaults to an executable.
            </p>
            <p>
              Existing files are preserved. Generated files are written only
              when absent, including <code>nox.build</code>, language manifests,
              <code>noxfile</code>, <code>flake.nix</code>, README, formatter
              config, and <code>.gitignore</code>.
            </p>
          </div>
        </section>
        <section className="reference-section">
          <div className="reference-label">Answers</div>
          <div>
            <h2>Make automation explicit.</h2>
            <div className="property-list">
              <p><code>--name NAME</code><span>Set the generated project name.</span></p>
              <p><code>--language LANG</code><span>Choose rust, c, cpp, haskell, d, swift, javascript, typescript, python, or fsharp.</span></p>
              <p><code>--type TYPE</code><span>Choose executable or library.</span></p>
              <p><code>--template NAME</code><span>Accepted by the CLI for template selection; template generation is not implemented yet.</span></p>
              <p><code>--formatter</code><span>Generate the supported formatter config and, with Nix, a formatter helper.</span></p>
              <p><code>--no-nix</code> / <code>--no-noxfile</code><span>Skip the generated flake or task file.</span></p>
            </div>
          </div>
        </section>
        <section className="reference-section">
          <div className="reference-label">Generated shape</div>
          <div>
            <h2>A usable first build.</h2>
            <pre><code>{`nox init hello --language c
nox setup build
nox build
nox run hello`}</code></pre>
            <p>
              Empty projects receive a hello-world source in the language’s
              conventional location and a matching target. Rust, JavaScript,
              TypeScript, Swift, and Python also receive their ecosystem
              manifest when it is missing. The generated README includes the
              first build commands.
            </p>
            <div className="reference-links">
              <Link href="/build">Understand the generated nox.build <span>→</span></Link>
              <Link href="/riders">See language backends <span>→</span></Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}