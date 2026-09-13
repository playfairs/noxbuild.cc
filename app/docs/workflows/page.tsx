import Link from "next/link";

export const metadata = { title: "Workflows" };

export default function WorkflowsPage() {
  return (
    <div className="page section-width interior-page reference-page">
      <div className="page-intro"><p className="eyebrow">Practical guides</p><h1>From zero to
        <br /><em>built.</em></h1><p>Common Nox workflows, from bootstrapping a project to diagnosing an incremental build.</p></div>
      <div className="reference-grid">
        <section className="reference-section"><div className="reference-label">New project</div><div><h2>Initialize, configure, build.</h2><pre><code>{`nox init hello --language c
nox setup build
nox build
nox run hello`}</code></pre><p><code>init</code> preserves existing files and creates missing project scaffolding. Setup validates and records tools; build performs compilation. Re-running build after a source edit does not require setup.</p></div></section>
        <section className="reference-section"><div className="reference-label">Daily loop</div><div><h2>Validate, build, run, test.</h2><pre><code>{`nox validate
nox build -j8
nox run app -- --verbose
nox test`}</code></pre><p>Use <code>validate</code> for graph-only checks, <code>run</code> for an executable or file, and <code>test</code> when the project noxfile defines a <code>test</code> task.</p></div></section>
        <section className="reference-section"><div className="reference-label">Release</div><div><h2>Separate release output from debug.</h2><pre><code>{`nox setup build --release
nox build
nox install --release --prefix "$HOME/.local"`}</code></pre><p>Configurations live below the selected build directory. Installing with a different configuration reconfigures when needed; use <code>--prefix</code> to avoid writing system directories.</p></div></section>
        <section className="reference-section"><div className="reference-label">Recovery</div><div><h2>When the build is stale or wrong.</h2><p>Run <code>nox status</code> to inspect the stored root, configuration, tools, and target count. Run <code>nox setup --reconfigure</code> after configuration or toolchain changes. Use <code>nox rebuild</code> when you need a fresh build directory. <code>nox clean</code> removes generated build artifacts but not installed files.</p><div className="reference-links"><Link href="/docs/commands">Command details <span>→</span></Link><Link href="/docs/testing">Testing guide <span>→</span></Link></div></div></section>
      </div>
    </div>
  );
}
