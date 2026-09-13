import Link from "next/link";

export const metadata = { title: "Architecture" };

export default function ArchitecturePage() {
  return (
    <div className="page section-width interior-page reference-page">
      <div className="page-intro">
        <p className="eyebrow">Nox internals</p>
        <h1>How Nox
          <br /><em>does the work.</em>
        </h1>
        <p>Nox keeps project description, graph validation, toolchain selection, build actions, execution, and task automation as separate boundaries.</p>
      </div>
      <div className="reference-grid">
        <section className="reference-section"><div className="reference-label">Pipeline</div><div>
          <h2>Parse, validate, configure, execute.</h2>
          <p><code>nox.build</code> is parsed into a project model. The graph validator rejects duplicate targets, missing dependencies, and cycles. Setup detects tools and writes <code>nox.state</code>; build reloads that state, orders targets, compiles changed inputs, and links artifacts.</p>
          <pre><code>{`nox.build -> Project -> Graph -> BuildState
                              -> compile/link/archive`}</code></pre>
        </div></section>
        <section className="reference-section"><div className="reference-label">Build actions</div><div>
          <h2>Language details stay at the edge.</h2>
          <p>C and C++ sources use compiler-generated object and dependency files. Static libraries use the archiver; shared libraries and executables use a compiler driver as linker. Rust targets use a direct rustc branch, while Rider-backed languages have dedicated action paths.</p>
          <p>Sources inside one C/C++ target are assigned to worker threads up to <code>-j</code>. Target order remains dependency-ordered even when source compilation is parallel.</p>
        </div></section>
        <section className="reference-section"><div className="reference-label">State</div><div>
          <h2>Configuration belongs to the build directory.</h2>
          <p>Each configured directory contains <code>nox.state</code> and separates artifacts by <code>debug</code> or <code>release</code>. <code>nox.config</code> remembers the selected directory for later commands. Changing a toolchain or configuration calls for setup or rebuild; editing a source does not.</p>
          <pre><code>{`build/
  debug/<target>/
  release/<target>/
  nox.state`}</code></pre>
        </div></section>
        <section className="reference-section"><div className="reference-label">Process boundary</div><div>
          <h2>Builds use argument vectors.</h2>
          <p>Compiler, linker, archiver, and rustc commands are launched with <code>Command</code> arguments rather than shell strings. Noxfile tasks are intentionally different: Unix tasks run through <code>sh -c</code>, while Windows uses the configured shell or <code>cmd /C</code>.</p>
          <div className="reference-links"><Link href="/build">Read the project file <span>→</span></Link><Link href="/riders">Read about Riders <span>→</span></Link></div>
        </div></section>
      </div>
    </div>
  );
}
