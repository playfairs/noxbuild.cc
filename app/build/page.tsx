export default function BuildFilePage() {
  return (
    <div className="page section-width interior-page reference-page">
      <div className="page-intro">
        <p className="eyebrow">Project file</p>
        <h1>
          Declare the
          <br />
          <em>build graph.</em>
        </h1>
        <p>
          <code>nox.build</code> is a small declarative language. It is not
          TOML, JSON, YAML, or shell. For comparison the syntax is most similar
          to HCL (HashiCorp Configuration Language), but not based on it.
        </p>
      </div>
      <div className="reference-grid">
        <section className="reference-section">
          <div className="reference-label">A complete file</div>
          <div>
            <h2>The Nox project file.</h2>
            <pre>
              <code>{`project "nox" {
    version = file("./VERSION")
    description = "The Nox Build System."
    license = "Unlicense"
    edition = "1"
    dependencies = []
    version_files = ["Cargo.toml", "VERSION"]
    repository = "https://github.com/playfairs/nox"
    website = "https://noxbuild.cc"
    authors = ["playfairs", "invra"]
    maintainers = ["playfairs <root@playfairs.cc>"]

    executable.rust "nox" {
        sources = ["src/main.rs"]
        flags = []
        install = true
    }
}`}</code>
            </pre>
          </div>
        </section>
        <section className="reference-section">
          <div className="reference-label">A small C project</div>
          <div>
            <h2>Targets are explicit.</h2>
            <pre>
              <code>{`project "hello" {
    version = "1.0.0"
    description = "A small command-line application."

    executable "hello" {
        sources = ["src/main.c"]
        flags = ["-Wall", "-Wextra"]
        install = true
    }
}`}</code>
            </pre>
            <p className="muted-copy">
              Source paths are relative to the directory containing{" "}
              <code>nox.build</code>.
            </p>
          </div>
        </section>
        <section className="reference-section">
          <div className="reference-label">Target properties</div>
          <div>
            <h2>Sources, dependencies, flags.</h2>
            <div className="property-list">
              <p>
                <code>sources</code>
                <span>
                  List of paths or a simple <code>glob("src/*.c")</code>.
                </span>
              </p>
              <p>
                <code>dependencies</code>
                <span>Target names resolved in the same project.</span>
              </p>
              <p>
                <code>include_dirs</code>
                <span>
                  Directories passed as compiler <code>-I</code> arguments.
                </span>
              </p>
              <p>
                <code>defines</code>
                <span>
                  Preprocessor definitions passed as <code>-D</code>.
                </span>
              </p>
              <p>
                <code>flags</code>
                <span>Additional compiler flags for the target.</span>
              </p>
            </div>
          </div>
        </section>
        <section className="reference-section">
          <div className="reference-label">Project settings</div>
          <div>
            <h2>Keep values reusable.</h2>
            <pre><code>{`set windows-shell := ["powershell.exe", "-NoProfile", "-Command"]
version := \`cargo xtask\`

project "example" {
    let sources = ["src/main.c"]
    let warnings = ["-Wall", "-Wextra"]

    executable "app" {
        sources = sources
        flags = warnings
    }
}`}</code></pre>
            <p className="muted-copy">
              Top-level settings support <code>set NAME := VALUE</code> and
              <code>NAME := VALUE</code>. Backtick values run through the
              platform shell while parsing. Project-level <code>let</code>
              bindings are immutable and can be reused by target properties.
            </p>
          </div>
        </section>
        <section className="reference-section">
          <div className="reference-label">Target kinds</div>
          <div>
            <h2>Choose the shape of the artifact.</h2>
            <div className="property-list">
              <p><code>executable</code><span>Generic executable whose Rider is selected from its source.</span></p>
              <p><code>executable.&lt;language&gt;</code><span>Explicit language-qualified executable, such as <code>executable.rust</code> or <code>executable.cpp</code>.</span></p>
              <p><code>static_library</code> / <code>shared_library</code><span>Archives objects or links a shared library. <code>static</code> and <code>shared</code> are accepted aliases.</span></p>
              <p><code>rust_library</code><span>Builds a Rust library target.</span></p>
            </div>
            <p className="muted-copy">
              Generic Rider targets use the first source file to select the
              language backend. Every target needs at least one source. The
              supported explicit qualifiers include rust, cpp, c, d, haskell,
              swift, fsharp, javascript, typescript, and python.
            </p>
          </div>
        </section>
        <section className="reference-section">
          <div className="reference-label">Configure and build</div>
          <div>
            <h2>Let Nox order the work.</h2>
            <pre>
              <code>{`nox validate
nox setup build
nox compile -C build -j8
nox targets
nox graph
nox install --prefix "$HOME/.local"`}</code>
            </pre>
            <p className="muted-copy">
              Nox validates missing targets and dependency cycles before
              building. Libraries are passed to executable link commands in
              dependency order.
            </p>
          </div>
        </section>
        <section className="reference-section">
          <div className="reference-label">Project metadata</div>
          <div>
            <h2>Describe the project once.</h2>
            <div className="property-list">
              <p><code>repository</code><span>Source repository URL.</span></p>
              <p><code>website</code><span>Project website URL.</span></p>
              <p><code>authors</code><span>List of project authors.</span></p>
              <p><code>maintainers</code><span>List of current maintainers and contact details.</span></p>
            </div>
          </div>
        </section>
        <section className="reference-section">
          <div className="reference-label">Multiple projects</div>
          <div>
            <h2>One file can name several projects.</h2>
            <pre><code>{`project "nox" {
    executable.rust "nox" {
        sources = ["src/main.rs"]
    }
}

project "noml" {
    executable.rust "noml" {
        sources = ["noml/src/main.rs"]
    }
}`}</code></pre>
            <p className="muted-copy">
              When more than one project is declared, specify the project for
              commands that operate on one project: <code>nox stat nox</code>,
              <code>nox run noml</code>, or <code>nox install nox</code>.
              Without a project name, Nox prints the available executable
              choices and exits without guessing.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
