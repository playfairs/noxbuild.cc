import Link from "next/link";

export const metadata = { title: "Testing and Development" };

export default function TestingPage() {
  return (
    <div className="page section-width interior-page reference-page">
      <div className="page-intro"><p className="eyebrow">Contributors</p><h1>Change Nox
        <br /><em>with confidence.</em></h1><p>Build, test, format, and extend the system without crossing its architecture boundaries.</p></div>
      <div className="reference-grid">
        <section className="reference-section"><div className="reference-label">Local checks</div><div><h2>Use Cargo and Nix together.</h2><pre><code>{`cargo fmt --all
cargo test --all-targets
cargo build --release
nix flake check`}</code></pre><p>The repository also provides Nox tasks for repeatable project commands. Use the Nix shell when you need the declared formatter and toolchain environment.</p></div></section>
        <section className="reference-section"><div className="reference-label">Integration tests</div><div><h2>Test behavior in temporary projects.</h2><p>Build tests create realistic <code>nox.build</code> fixtures and exercise parsing, graph validation, duplicate bindings, C++ detection, run handlers, and temporary artifacts. New commands should test both successful output and the error path.</p><pre><code>{`tests/
  parser_bindings.rs
  run_handlers.rs
  run_temporary_artifact.rs`}</code></pre></div></section>
        <section className="reference-section"><div className="reference-label">Extension points</div><div><h2>Keep language behavior at the edge.</h2><p>Adding a target kind touches the model, parser, executor, toolchain/state boundary, integration tests, and documentation. Adding a language Rider should not add language assumptions to graph traversal. Direct file execution belongs in the Runner registry.</p></div></section>
        <section className="reference-section"><div className="reference-label">External projects</div><div><h2>Test the user workflow.</h2><p>Use a temporary project to verify missing dependencies, cycles, source and header changes, debug/release separation, parallel compilation, custom prefixes, and run argument forwarding. This catches integration failures that unit tests cannot see.</p><div className="reference-links"><Link href="/docs/architecture">Architecture <span>→</span></Link><Link href="/docs/workflows">Workflows <span>→</span></Link></div></div></section>
      </div>
    </div>
  );
}
