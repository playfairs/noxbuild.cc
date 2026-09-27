import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Download, TerminalSquare } from "lucide-react";

const languageSupport = [
  [
    "Native",
    "C, C++, D, Rust",
    "Compiled targets, libraries, dependency-aware builds",
  ],
  ["Managed", "Java, Kotlin, C#, Q#", "JAR and .NET-oriented build paths"],
  [
    "Runtime",
    "Python, JavaScript, Ruby, F#",
    "File handlers and runnable project targets",
  ],
  [
    "Other",
    "Go, Swift, Zig, TypeScript",
    "Built-in Riders with language-specific output",
  ],
];

export default function HomePage() {
  return (
    <div className="page home-page">
      <section className="home-intro">
        <div>
          <p className="eyebrow">
            <span className="status-dot" /> The Nox Build System
          </p>
          <h1>
            The Nox Build
            <br />
            System <em className="home-title-runner">&amp; Task Runner</em>
          </h1>
          <p className="lede">
            Nox is a Rust build system and task runner. It reads a project graph
            from <code>nox.build</code>, validates the dependencies, detects the
            required toolchain, and executes only the work needed for the
            selected build.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/docs">
              <BookOpen aria-hidden="true" size={16} /> Read the reference
            </Link>
            <Link className="button button-quiet" href="/download">
              <Download aria-hidden="true" size={16} /> Install Nox
            </Link>
          </div>
        </div>
        <div className="home-mark" aria-hidden="true">
          <Image
            src="/assets/nox-Icon.svg"
            alt=""
            width={260}
            height={210}
            priority
          />
          <span>nox.build / noxfile</span>
        </div>
      </section>
      <section className="quickstart" aria-labelledby="quickstart-heading">
        <div className="section-title">
          <p className="eyebrow">First build</p>
          <h2 id="quickstart-heading">For a new project.</h2>
        </div>
        <div className="quickstart-code">
          <div>
            <span>01</span>
            <code>nox init hello --language c</code>
            <p>
              Create a starting project, or write <code>nox.build</code>{" "}
              yourself.
            </p>
          </div>
          <div>
            <span>02</span>
            <code>cd hello && nox setup build</code>
            <p>Parse the project and record its build state and toolchain.</p>
          </div>
          <div>
            <span>03</span>
            <code>nox build -C build -j8</code>
            <p>Validate and execute targets in dependency order.</p>
          </div>
          <div>
            <span>04</span>
            <code>nox run -C build</code>
            <p>
              Build the selected executable, then forward any arguments after{" "}
              <code>--</code>.
            </p>
          </div>
        </div>
      </section>
      <section className="working-model" aria-labelledby="model-heading">
        <div className="section-title">
          <p className="eyebrow">How it works</p>
          <h2 id="model-heading">
            A project file, a task file, distinct responsibilities.
          </h2>
        </div>
        <div className="model-grid">
          <article>
            <span className="model-number">01</span>
            <h3>Declare</h3>
            <p>
              <code>nox.build</code> defines projects, targets, sources, flags,
              dependencies, metadata, and installation intent. It is the build
              graph, not a shell script.
            </p>
            <Link href="/build">
              Read the nox.build guide{" "}
              <ArrowRight aria-hidden="true" size={15} />
            </Link>
          </article>
          <article>
            <span className="model-number">02</span>
            <h3>Configure</h3>
            <p>
              <code>nox setup</code> finds the project root, parses the
              declarations, detects native tools, and writes state for a debug
              or release configuration.
            </p>
            <Link href="/docs/toolchains">
              Understand toolchain detection{" "}
              <ArrowRight aria-hidden="true" size={15} />
            </Link>
          </article>
          <article>
            <span className="model-number">03</span>
            <h3>Automate</h3>
            <p>
              An optional <code>noxfile</code> contains named tasks. Tasks can
              depend on other tasks or Nox commands, run shell commands, and
              interpolate project values.
            </p>
            <Link href="/tasks">
              Read the noxfile guide <ArrowRight aria-hidden="true" size={15} />
            </Link>
          </article>
        </div>
      </section>
      <section className="support-section" aria-labelledby="support-heading">
        <div className="section-title">
          <p className="eyebrow">Built-in backends</p>
          <h2 id="support-heading">The graph stays language-neutral.</h2>
          <p>
            Nox selects a Rider from source extensions, then keeps dependency
            traversal and build state independent of the compiler being used.
          </p>
        </div>
        <div className="support-table">
          <div className="support-table-head">
            <span>Family</span>
            <span>Languages</span>
            <span>Role</span>
          </div>
          {languageSupport.map(([family, languages, role]) => (
            <div className="support-row" key={family}>
              <strong>{family}</strong>
              <span className="support-level">{languages}</span>
              <span>{role}</span>
            </div>
          ))}
        </div>
        <Link className="inline-link" href="/riders">
          <TerminalSquare aria-hidden="true" size={16} /> Browse Riders and
          Runners <ArrowRight aria-hidden="true" size={15} />
        </Link>
      </section>
    </div>
  );
}
