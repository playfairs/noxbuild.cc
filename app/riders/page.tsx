import Link from "next/link";

export const metadata = { title: "Riders" };

const riders = [
  ["C", ".c", "cc, clang, or gcc", "Native compile, link, static, and shared-library path."],
  ["C++", ".cpp, .cc, .cxx", "c++, clang++, or g++", "Native C++ compiler and linker path."],
  ["Rust", ".rs", "rustc", "Direct rustc builds, or Cargo for a Rust executable with Cargo.toml."],
  ["Haskell", ".hs, .lhs", "ghc", "Builds an executable through GHC."],
  ["D", ".d", "ldc2, dmd, or gdc", "Builds a native executable."],
  ["Go", ".go", "go", "Builds a native executable through go build."],
  ["Java", ".java", "javac and jar", "Compiles classes and packages a JAR."],
  ["C#", ".cs", "csc or mcs", "Builds an executable through the detected compiler."],
  ["Swift", ".swift", "swiftc", "Builds a native executable."],
  ["Zig", ".zig", "zig", "Builds an executable with zig build-exe."],
  ["Python", ".py", "python3 or python", "Syntax-checks and packages the script."],
  ["JavaScript", ".js, .jsx", "node", "Syntax-checks and packages the script."],
  ["TypeScript", ".ts, .tsx", "tsc", "Transpiles to CommonJS JavaScript."],
  ["Kotlin", ".kt, .kts", "kotlinc", "Builds a runnable JAR."],
];

export default function RidersPage() {
  return (
    <div className="page section-width interior-page reference-page">
      <div className="page-intro">
        <p className="eyebrow">Toolchain backends</p>
        <h1>
          Meet the
          <br />
          <em>Riders.</em>
        </h1>
        <p>
          A Rider connects a source extension to the compiler, linker, or
          packaging action that builds it. The project graph stays language
          agnostic; the Rider owns language-specific tool behavior.
        </p>
      </div>
      <div className="reference-grid">
        <section className="reference-section">
          <div className="reference-label">Selection</div>
          <div>
            <h2>Source extension chooses the path.</h2>
            <p>
              A generic <code>executable</code> target selects its Rider from
              the first source extension. C and C++ share the native object,
              dependency-file, parallel compilation, and link pipeline. Other
              Riders use a direct backend action and detect their tool only
              when the target needs to build.
            </p>
            <pre><code>{`project "hello" {
    executable "hello" {
        sources = ["src/main.go"]
        install = true
    }
}`}</code></pre>
          </div>
        </section>
        <section className="reference-section">
          <div className="reference-label">Catalog</div>
          <div>
            <h2>Built-in Riders.</h2>
            <div className="cli-table">
              {riders.map(([language, extensions, tool, action]) => (
                <div className="cli-row" key={language}>
                  <div className="cli-form"><code>{language}</code><span>{extensions}</span></div>
                  <p><strong>{tool}</strong> · {action}</p>
                </div>
              ))}
            </div>
            <p>
              Run <code>nox riders</code> to print this registry from the
              installed binary. Missing tools produce a specific error when a
              build reaches that Rider.
            </p>
          </div>
        </section>
        <section className="reference-section">
          <div className="reference-label">Boundaries</div>
          <div>
            <h2>Riders build; Runners execute.</h2>
            <p>
              A Rider is used for project targets and artifacts. Direct-file
              execution with <code>nox run path/to/file</code> uses the
              separate Runner registry, which may require a runtime or compile
              a temporary artifact.
            </p>
            <div className="reference-links">
              <Link href="/runners">Read the Runner reference <span>→</span></Link>
              <Link href="/docs/commands">See CLI behavior <span>→</span></Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}