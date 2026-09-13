import Link from "next/link";

export const metadata = { title: "Development" };

export default function DevelopmentPage() {
  return (
    <div className="page section-width interior-page reference-page">
      <div className="page-intro"><p className="eyebrow">Contributing to Nox</p><h1>Build the build
        <br /><em>system itself.</em></h1><p>How the repository is structured, how to self-host Nox, and where new behavior belongs.</p></div>
      <div className="reference-grid">
        <section className="reference-section"><div className="reference-label">Bootstrap</div><div><h2>Start with Cargo, then self-host.</h2><pre><code>{`cargo build --release
cargo test --all-targets
cargo run -- setup build
cargo run -- build build`}</code></pre><p>The repository's own <code>nox.build</code> declares the Nox executable. Once Cargo bootstraps it, Nox can configure, build, test, and install itself.</p></div></section>
        <section className="reference-section"><div className="reference-label">Boundaries</div><div><h2>Keep the graph language agnostic.</h2><p>Parser changes belong in the project parser. Duplicate names, missing dependencies, cycles, and ordering belong in graph validation. Compiler invocation, artifact naming, and tool detection belong in executor and toolchain boundaries. Task shell behavior belongs in the noxfile task module.</p></div></section>
        <section className="reference-section"><div className="reference-label">Add a target kind</div><div><h2>Update every contract.</h2><pre><code>{`model -> parser -> executor
      -> toolchain/state -> tests -> docs`}</code></pre><p>Add the model variant, parser recognition, action generation, artifact path, setup tool state, integration test, and syntax documentation together. Avoid adding language assumptions to graph traversal.</p></div></section>
        <section className="reference-section"><div className="reference-label">Add a command</div><div><h2>Make behavior observable.</h2><p>Add argument handling and dispatch, help output, command documentation, README usage when appropriate, and integration tests. Commands that mutate files or execute processes should return errors rather than printing false success.</p><div className="reference-links"><Link href="/docs/testing">Testing guide <span>→</span></Link><Link href="/docs/architecture">Architecture <span>→</span></Link></div></div></section>
        <section className="reference-section"><div className="reference-label">Nix</div><div><h2>Reproduce the tool environment.</h2><pre><code>{`nix develop
nix fmt
nix flake check`}</code></pre><p>The flake provides the development shell, package, formatter, and checks. Use it when validating changes that depend on declared compilers or formatting tools.</p></div></section>
      </div>
    </div>
  );
}
