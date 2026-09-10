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

    rust_executable "nox" {
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
      </div>
    </div>
  );
}
