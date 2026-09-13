import Link from "next/link";

export const metadata = { title: "Toolchains" };

const tools = [
  ["C", "cc, clang, gcc", "Native compile, link, static-library, and shared-library actions."],
  ["C++", "c++, clang++, g++", "Native C++ compile and link actions for .cpp, .cc, and .cxx."],
  ["Rust", "rustc", "Direct Rust targets; Cargo is used for Rust executables with Cargo.toml."],
  ["D", "ldc2, dmd, gdc", "Native executable builds and temporary direct-file runs."],
  ["Go", "go", "go build executable targets."],
  ["Java", "javac, jar", "Class compilation followed by JAR packaging."],
  ["C#", "csc, mcs", "Executable compilation through the detected compiler."],
  ["Swift / Zig", "swiftc / zig", "Native executable actions."],
  ["Python / JavaScript", "python3 / node", "Syntax checks and packaged target artifacts."],
  ["TypeScript / Kotlin", "tsc / kotlinc", "JavaScript transpilation or runnable JAR packaging."],
];

export default function ToolchainsPage() {
  return (
    <div className="page section-width interior-page reference-page">
      <div className="page-intro"><p className="eyebrow">Compilers and runtimes</p><h1>Choose the
        <br /><em>right tool.</em></h1><p>Nox detects tools from <code>PATH</code> and keeps language-specific invocation in Riders and executor backends.</p></div>
      <div className="reference-grid">
        <section className="reference-section"><div className="reference-label">Detection</div><div><h2>Setup detects the native trio.</h2><p><code>nox setup</code> looks for a C compiler, linker, and archiver. C detection prefers <code>cc</code>, <code>clang</code>, then <code>gcc</code>; C++ uses <code>c++</code>, <code>clang++</code>, then <code>g++</code>; archives use <code>ar</code> or <code>llvm-ar</code>. Other Riders check their tool when their target is built.</p><pre><code>{`cc -> clang -> gcc
c++ -> clang++ -> g++
ar -> llvm-ar`}</code></pre></div></section>
        <section className="reference-section"><div className="reference-label">Catalog</div><div><h2>Built-in toolchain paths.</h2><div className="cli-table">{tools.map(([language, tools, behavior]) => <div className="cli-row" key={language}><div className="cli-form"><code>{language}</code><span>{tools}</span></div><p>{behavior}</p></div>)}</div></div></section>
        <section className="reference-section"><div className="reference-label">Flags</div><div><h2>Project flags and invocation flags.</h2><p>Target <code>flags</code>, <code>include_dirs</code>, <code>defines</code>, and <code>linker_flags</code> stay with the target. Repeated <code>--compile-flag</code> values add flags to compiler invocations for setup or the current build.</p><pre><code>{`nox setup build --compile-flag -Wall
nox build -C build --compile-flag -O2`}</code></pre></div></section>
        <section className="reference-section"><div className="reference-label">Missing tools</div><div><h2>Failures name the dependency.</h2><p>Nox does not silently switch to a different language backend. If a required compiler or runtime is absent, setup or build reports the missing toolchain. Install the tool and ensure it is visible through <code>PATH</code>, then run setup again when the configured native tool changed.</p><div className="reference-links"><Link href="/riders">Rider catalog <span>→</span></Link><Link href="/runners">Runner catalog <span>→</span></Link></div></div></section>
      </div>
    </div>
  );
}
