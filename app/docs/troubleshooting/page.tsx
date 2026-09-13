import Link from "next/link";

export const metadata = { title: "Troubleshooting" };

const cases = [
  ["Build is not configured", "Run `nox setup build` before `nox build`. Source edits do not require setup, but build-directory, toolchain, and configuration changes do."],
  ["Compiler not found", "Install the required tool and make sure it is visible through PATH. Native detection checks cc, clang, gcc, c++, clang++, g++, ar, and llvm-ar in that order."],
  ["Header changes do not rebuild", "Inspect the target .d file under build/<configuration>/<target>. Nox delegates dependency discovery to the compiler with -MMD and -MF."],
  ["Unknown target", "Run nox targets to see declaration order and nox graph to see dependency order. Dependencies must name targets in the same project."],
  ["Dependency cycle", "The graph must be acyclic. A target that depends on another target which eventually depends back on it cannot be ordered."],
  ["Run cannot find an executable", "Build an executable target and pass its exact target name. Libraries are not runnable project targets."],
  ["Rust behavior is unexpected", "Nox's Rust backend invokes rustc directly and uses the first source. Cargo dependency resolution and Rust incremental compilation are not modeled by this backend."],
  ["Install cannot write /usr/local", "Use a user-owned prefix such as nox install --prefix \"$HOME/.local\", or use appropriate permissions for the system prefix."],
];

export default function TroubleshootingPage() {
  return (
    <div className="page section-width interior-page reference-page">
      <div className="page-intro"><p className="eyebrow">Recovery guide</p><h1>When the build
        <br /><em>pushes back.</em></h1><p>Common Nox failures, what they mean, and the smallest useful next check.</p></div>
      <div className="reference-grid">
        <section className="reference-section"><div className="reference-label">Diagnose</div><div><h2>Inspect state before changing files.</h2><pre><code>{`nox status
nox validate
nox targets
nox graph`}</code></pre><p>Status shows the configured root, build directory, configuration, tools, flags, and target count. Validation and graph commands isolate project-file and dependency problems without compiling.</p></div></section>
        <section className="reference-section"><div className="reference-label">Known cases</div><div><div className="property-list">{cases.map(([title, explanation]) => <p key={title}><strong>{title}</strong><span>{explanation}</span></p>)}</div></div></section>
        <section className="reference-section"><div className="reference-label">Reset</div><div><h2>Reconfigure without deleting installs.</h2><p><code>nox setup --reconfigure</code> removes the selected build directory and writes fresh state. <code>nox rebuild</code> configures and builds from scratch. <code>nox clean</code> removes generated build state but intentionally leaves installed artifacts alone.</p><div className="reference-links"><Link href="/docs/workflows">Workflow guide <span>→</span></Link><Link href="/docs/commands">Command reference <span>→</span></Link></div></div></section>
      </div>
    </div>
  );
}
