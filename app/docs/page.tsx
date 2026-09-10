import Link from "next/link";

const commands = [
  [
    "setup",
    "Parse and validate nox.build, detect the C toolchain, and write build state.",
    "nox setup build",
  ],
  [
    "compile",
    "Compile changed sources and link targets. `build` remains an alias.",
    "nox compile -C build",
  ],
  [
    "validate",
    "Check duplicate targets, missing dependencies, and dependency cycles.",
    "nox validate",
  ],
  [
    "install",
    "Build and copy targets marked install = true into the selected prefix.",
    'nox install --prefix "$HOME/.local"',
  ],
  [
    "run",
    "Build and run a project target or a supported source file.",
    "nox run hello",
  ],
  [
    "task",
    "Find a named task in noxfile and execute its run command.",
    "nox task format",
  ],
];

export default function DocsPage() {
  return (
    <div className="page section-width interior-page reference-page">
      <div className="page-intro">
        <p className="eyebrow">Reference</p>
        <h1>
          The Nox
          <br />
          <em>documentation.</em>
        </h1>
        <p>
          Nox is a Rust build system and task runner. These pages describe the
          behavior implemented by the current binary.
        </p>
      </div>
      <div className="reference-grid">
        <section className="reference-section">
          <div className="reference-label">Start here</div>
          <div>
            <h2>Install, configure, build.</h2>
            <p>
              From a Nox source checkout, bootstrap the executable with Cargo,
              then use Nox from the project root containing{" "}
              <code>nox.build</code>.
            </p>
            <pre>
              <code>{`cargo build --release
./target/release/nox help

nox setup build
nox compile -C build`}</code>
            </pre>
          </div>
        </section>
        <section className="reference-section">
          <div className="reference-label">Commands</div>
          <div>
            <h2>The command reference.</h2>
            <div className="command-list">
              {commands.map(([name, description, example]) => (
                <div className="command-item" key={name}>
                  <div>
                    <h3>nox {name}</h3>
                    <p>{description}</p>
                  </div>
                  <code>{example}</code>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="reference-section">
          <div className="reference-label">Boundaries</div>
          <div>
            <h2>Two files, two jobs.</h2>
            <p>
              <code>nox.build</code> declares the project, targets, source
              files, compiler settings, and dependencies. <code>noxfile</code>{" "}
              is optional task automation. It does not replace the compilation
              graph.
            </p>
            <div className="reference-links">
              <Link href="/build">
                Read the nox.build reference <span>→</span>
              </Link>
              <Link href="/tasks">
                Read the noxfile tasks <span>→</span>
              </Link>
            </div>
          </div>
        </section>
        <section className="reference-section">
          <div className="reference-label">Current scope</div>
          <div>
            <h2>What Nox supports.</h2>
            <p>
              C, C++, Rust, and built-in Riders for Go, Java, C#, Swift, Zig,
              Python, JavaScript, TypeScript, and Kotlin. Debug and release
              configurations, dependency-aware ordering, parallel compilation,
              and installation are supported.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
