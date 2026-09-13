import Link from "next/link";

export const metadata = { title: "NoxIDE" };

export default function NoxidePage() {
  return (
    <div className="page section-width interior-page reference-page">
      <div className="page-intro"><p className="eyebrow">Nox ecosystem</p><h1>Meet
        <br /><em>NoxIDE.</em></h1><p>A focused Rust code editor that uses Nox as its project workflow instead of implementing a second build graph.</p></div>
      <div className="reference-grid">
        <section className="reference-section"><div className="reference-label">What it is</div><div><h2>A small graphical editor.</h2><p>NoxIDE is an eframe desktop application with a project explorer, output pane, editable egui text editor, tabs, scrolling, selection, undo, clipboard support, line numbers, and file-backed documents.</p><pre><code>{`cargo build --release
build/debug/noxide/noxide
build/debug/noxide/noxide src/main.rs`}</code></pre></div></section>
        <section className="reference-section"><div className="reference-label">Workspace</div><div><h2>Find the project before opening files.</h2><p>NoxIDE discovers a workspace by walking upward from the current path until it finds <code>nox.build</code> or <code>noxfile</code>. Its explorer skips <code>.git</code>, <code>build</code>, and <code>target</code>, then sorts directories before files.</p></div></section>
        <section className="reference-section"><div className="reference-label">Documents</div><div><h2>Files stay simple and explicit.</h2><p>Opening a file reads it into a document buffer. Editing marks the buffer dirty. Save writes the full buffer back to its original path and clears the dirty state. File dialogs provide graphical Open and Save actions.</p></div></section>
        <section className="reference-section"><div className="reference-label">Nox bridge</div><div><h2>Build actions delegate to Nox.</h2><p>The IDE invokes the <code>nox</code> executable with the selected command and workspace as its current directory. It preserves stdout, stderr, and the child exit code in the output pane. The Build button therefore follows the same project behavior as the CLI.</p><div className="reference-links"><Link href="/build">Understand Nox builds <span>→</span></Link><Link href="/docs/noxical">Read Noxical <span>→</span></Link></div></div></section>
        <section className="reference-section"><div className="reference-label">Current limits</div><div><h2>Foundation first.</h2><p>Syntax-aware editing currently has Rust tree-sitter highlighting. LSP diagnostics, completion, hover, file watching, richer project-tree operations, and clickable build diagnostics are planned layers rather than completed behavior.</p></div></section>
      </div>
    </div>
  );
}
