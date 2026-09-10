const taskExamples = [
  {
    name: "format",
    command: "cargo fmt --all",
    description: "Format the project.",
  },
  {
    name: "check",
    command: "cargo check",
    description: "Run a project check.",
  },
  {
    name: "rebuild",
    command: "@nox clean + @nox build",
    description: "Compose existing Nox commands.",
  },
];

export default function TasksPage() {
  return (
    <div className="page section-width interior-page reference-page">
      <div className="page-intro">
        <p className="eyebrow">noxfile</p>
        <h1>
          Tasks for the
          <br />
          <em>work around builds.</em>
        </h1>
        <p>
          <code>noxfile</code> is optional and separate from{" "}
          <code>nox.build</code>. Use it for named project tasks, not for
          declaring compilation targets.
        </p>
      </div>
      <div className="reference-grid">
        <section className="reference-section">
          <div className="reference-label">Preferred syntax</div>
          <div>
            <h2>A small YAML-like task map.</h2>
            <pre>
              <code>{`tasks:
    format:
        run: cargo fmt --all
    rebuild:
        @nox clean
        @nox build
    package:
        @nox rebuild
        run: cargo build --release`}</code>
            </pre>
            <p className="muted-copy">
              Run a named task with <code>nox task format</code>. A repeated{" "}
              <code>run:</code> executes commands in order.
            </p>
          </div>
        </section>
        <section className="reference-section">
          <div className="reference-label">Task catalog</div>
          <div>
            <h2>Small commands, composed.</h2>
            <p className="muted-copy">
              These are example tasks. Your noxfile can define any commands you
              need for your project workflow.
            </p>
            <div className="command-list">
              {taskExamples.map((task) => (
                <div className="command-item" key={task.name}>
                  <div>
                    <h3>{task.name}</h3>
                    <p>{task.description}</p>
                  </div>
                  <code>{task.command}</code>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="reference-section">
          <div className="reference-label">Legacy syntax</div>
          <div>
            <h2>Older blocks still work.</h2>
            <pre>
              <code>{`task "format" {
    run = "cargo fmt --all"
}

task "check" {
    run = "cargo check"
}`}</code>
            </pre>
            <p className="muted-copy">
              On Unix, Nox executes task commands through <code>sh -c</code>. On
              Windows it uses <code>windows-shell</code> when configured,
              otherwise <code>cmd /C</code>.
            </p>
          </div>
        </section>
        <section className="reference-section">
          <div className="reference-label">Interpolation</div>
          <div>
            <h2>Use project context.</h2>
            <pre>
              <code>{`tasks:
    package:
        run: mkdir -p {{build_dir}}
        run: echo version={{version}}`}</code>
            </pre>
            <p className="muted-copy">
              <code>{`{{version}}`}</code> is the project version and{" "}
              <code>{`{{build_dir}}`}</code> is the selected build directory.
              Task arguments, outputs, and parallel scheduling are not
              implemented.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
