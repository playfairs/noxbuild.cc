import Link from "next/link";
import Image from "next/image";

const languageSupport = [
  [
    "C",
    "Build + run",
    "Executables, static/shared libraries, and temporary direct-run compilation.",
  ],
  [
    "C++",
    "Build + run",
    "Executables, static/shared libraries, and temporary direct-run compilation.",
  ],
  [
    "Rust",
    "Build",
    "Executables and libraries through rustc; Cargo projects use Cargo for executables.",
  ],
  [
    "D",
    "Build + run",
    "Executables through ldc2, dmd, or gdc, including temporary direct-run compilation.",
  ],
  ["Go", "Build", "Executables through the Go toolchain."],
  ["Java", "Build", "JAR archives through javac and jar."],
  ["C#", "Build", "Executables through csc or mcs."],
  ["Swift", "Build", "Executables through swiftc."],
  ["Zig", "Build", "Executables through zig."],
  [
    "Python",
    "Build + run",
    "Scripts are checked and packaged for targets, or run with Python.",
  ],
  [
    "JavaScript",
    "Build + run",
    "Scripts are checked and packaged for targets, or run with Node.js.",
  ],
  [
    "TypeScript",
    "Build",
    "Transpiled target output through tsc; direct file execution is not implemented.",
  ],
  ["Kotlin", "Build", "JAR archives through kotlinc."],
  [
    "F#",
    "Run files",
    "Direct .fsx execution through dotnet fsi; no build Rider is registered.",
  ],
  [
    "Ruby",
    "Run files",
    "Direct .rb execution through Ruby; no build Rider is registered.",
  ],
];

export default function HomePage() {
  return (
    <div className="page home-page">
      <section className="hero section-width">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="status-dot" /> The Nox Build System
          </p>
          <h1>
            Build less.
            <br />
            <em>Ship more.</em>
          </h1>
          <p className="hero-intro">
            Nox is a modern, declarative build system that turns project intent
            into fast, predictable commands.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/docs">
              Read the docs <span>→</span>
            </Link>
            <Link className="button button-quiet" href="/download">
              Download Nox <span>↓</span>
            </Link>
          </div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="art-ring ring-one" />
          <div className="art-ring ring-two" />
          <Image
            className="art-logo"
            src="/assets/nox-Icon.svg"
            alt="Nox logo"
            width={275}
            height={222}
            priority
          />
          <div className="art-caption">noxfile + nox.build</div>
        </div>
      </section>
      <section className="inspiration-section section-width">
        <div className="inspiration-content">
          <h2>Built on the shoulders of giants</h2>
          <p>
            Nox is inspirationally a hybrid of how{" "}
            <a href="https://just.systems" target="_blank" rel="noreferrer">
              justfile
            </a>{" "}
            and{" "}
            <a href="https://mesonbuild.com" target="_blank" rel="noreferrer">
              meson.build
            </a>{" "}
            work, combining the task automation simplicity of just with the
            declarative build graph power of meson. Nox aims to be a perfect
            hybrid replacing the need for any other build system.
          </p>
        </div>
      </section>
      <section className="support-section section-width">
        <div className="support-heading">
          <p className="eyebrow">Language support</p>
          <h2>
            Build broadly.
            <br />
            <em>Run deliberately.</em>
          </h2>
          <p>
            Nox currently supports the languages below at the levels implemented
            by its Riders and file handlers.
          </p>
        </div>
        <div className="support-table">
          <div className="support-table-head">
            <span>Language</span>
            <span>Level</span>
            <span>What Nox does</span>
          </div>
          {languageSupport.map(([language, level, description]) => (
            <div className="support-row" key={language}>
              <strong>{language}</strong>
              <span className="support-level">{level}</span>
              <span>{description}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
