import Link from "next/link";
import Image from "next/image";

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
            declarative build graph power of meson. Nox aims to be a perfect hybrid
            replacing the need for any other build system.
          </p>
        </div>
      </section>
    </div>
  );
}
