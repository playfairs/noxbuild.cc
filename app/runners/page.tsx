import Link from "next/link";

export const metadata = { title: "Runners" };

const handlers = [
  ["Runtime", ".fsx, .py, .js, .jsx, .mjs, .rb", "dotnet fsi, Python, Node.js, or Ruby", "Passes the source and forwarded arguments to the runtime."],
  ["Compile", ".c, .cc, .cpp, .cxx, .hs, .lhs, .d", "C/C++, GHC, or a D compiler", "Compiles into a temporary executable, runs it, then removes the artifact."],
  ["Registered, not implemented", ".rs, .go, .java, .cs, .swift, .zig, .ts, .tsx, .kt, .kts", "The language toolchain", "Reports an unsupported direct-file execution mode. Build targets may still use their Rider."],
];

export default function RunnersPage() {
  return (
    <div className="page section-width interior-page reference-page">
      <div className="page-intro">
        <p className="eyebrow">Direct-file execution</p>
        <h1>
          The other half:
          <br />
          <em>Runners.</em>
        </h1>
        <p>
          Runners power <code>nox run path/to/file</code>. They are intentionally
          separate from project Riders: a Runner decides how one source file is
          launched, while a Rider decides how a declared target is built.
        </p>
      </div>
      <div className="reference-grid">
        <section className="reference-section">
          <div className="reference-label">Dispatch</div>
          <div>
            <h2>Paths, targets, and projects mean different things.</h2>
            <pre><code>{`nox run .                        # first runnable project target
nox run hello                    # named project target
nox run examples/python/Test.py  # Runner for one source file
nox run examples/c/Test.c -- one two`}</code></pre>
            <p>
              An existing directory runs the project, an existing file resolves
              through the Runner registry, and any other value is treated as a
              target name. Everything after <code>--</code> is forwarded to the
              child process unchanged.
            </p>
          </div>
        </section>
        <section className="reference-section">
          <div className="reference-label">Modes</div>
          <div>
            <h2>Runtime, compile, or explain.</h2>
            <div className="cli-table">
              {handlers.map(([mode, extensions, tools, behavior]) => (
                <div className="cli-row" key={mode}>
                  <div className="cli-form"><code>{mode}</code><span>{extensions}</span></div>
                  <p><strong>{tools}</strong> · {behavior}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="reference-section">
          <div className="reference-label">Arguments</div>
          <div>
            <h2>Child status stays visible.</h2>
            <p>
              Runners locate tools through <code>PATH</code>. Runtime and
              compiled programs receive the forwarded arguments. A nonzero
              child exit status is returned by Nox; a signal termination becomes
              exit code 1. Temporary compile artifacts are removed after the
              run, including when the child finishes.
            </p>
            <p>
              Direct-file support is deliberately narrower than project-target
              support. For example, Rust, Go, Java, C#, Swift, Zig, TypeScript,
              and Kotlin are registered so Nox can give a useful dependency or
              unsupported-mode message, but their file Runner is not implemented
              yet. Declare a target and use its Rider to build those languages.
            </p>
            <div className="reference-links">
              <Link href="/riders">Use a Rider for project builds <span>→</span></Link>
              <Link href="/docs/commands">Read the run command <span>→</span></Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}