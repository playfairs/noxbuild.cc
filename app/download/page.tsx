"use client";

import { useEffect, useState } from "react";
import {
  CheckCircle2,
  Clipboard,
  ClipboardCheck,
  ExternalLink,
} from "lucide-react";

type ReleaseAsset = {
  name: string;
  browser_download_url: string;
  size: number;
};
type Release = {
  tag_name: string;
  html_url: string;
  published_at: string;
  assets: ReleaseAsset[];
};

const releaseApi = "https://api.github.com/repos/playfairs/nox/releases/latest";
const releasePage = "https://github.com/playfairs/nox/releases/latest";

function formatSize(bytes: number) {
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  async function copyCode() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }
  return (
    <div className="code-block">
      <button
        className="copy-button"
        type="button"
        aria-label={copied ? "Copied code" : "Copy code"}
        title={copied ? "Copied" : "Copy code"}
        onClick={() => void copyCode()}
      >
        {copied ? (
          <ClipboardCheck aria-hidden="true" />
        ) : (
          <Clipboard aria-hidden="true" />
        )}
        <span className="sr-only">{copied ? "Copied" : "Copy code"}</span>
      </button>
      <pre>
        <code>{code}</code>
      </pre>
    </div>
  );
}

export default function DownloadPage() {
  const [release, setRelease] = useState<Release | null>(null);
  const [error, setError] = useState(false);
  useEffect(() => {
    fetch(releaseApi, { headers: { Accept: "application/vnd.github+json" } })
      .then((response) => {
        if (!response.ok) throw new Error("Release request failed");
        return response.json() as Promise<Release>;
      })
      .then(setRelease)
      .catch(() => setError(true));
  }, []);

  return (
    <div className="page section-width interior-page download-page">
      <div className="page-intro">
        <p className="eyebrow">Install & update</p>
        <h1>
          Get Nox.
          <br />
          <em>Keep it current.</em>
        </h1>
        <p>
          Install a release binary, build from source with Cargo, or bring an
          existing installation forward with Nox&apos;s built-in updater.
        </p>
      </div>

      <section className="download-section">
        <div className="download-section-heading">
          <span className="reference-label">Latest release</span>
          <div>
            <h2>{release ? release.tag_name : "Release artifacts"}</h2>
            <p>
              Choose the binary that matches your platform and architecture.
              Release assets are served directly from GitHub.
            </p>
          </div>
        </div>
        {release && (
          <div className="release-meta">
            <span>
              Published {new Date(release.published_at).toLocaleDateString()}
            </span>
            <a href={release.html_url} target="_blank" rel="noreferrer">
              Release notes <ExternalLink aria-hidden="true" size={13} />
            </a>
          </div>
        )}
        {release && release.assets.length > 0 && (
          <div className="artifact-list">
            {release.assets.map((asset) => (
              <a
                className="artifact-row"
                href={asset.browser_download_url}
                key={asset.name}
              >
                <span className="artifact-icon">↓</span>
                <span className="artifact-name">{asset.name}</span>
                <span className="artifact-size">{formatSize(asset.size)}</span>
                <ExternalLink
                  className="artifact-arrow"
                  aria-hidden="true"
                  size={15}
                />
              </a>
            ))}
          </div>
        )}
        {!release && !error && (
          <div className="loading-line">
            Checking GitHub for the latest release…
          </div>
        )}
        {error && (
          <div className="error-line">
            The release list could not be loaded from this browser.{" "}
            <a href={releasePage} target="_blank" rel="noreferrer">
              Open the latest release on GitHub{" "}
              <ExternalLink aria-hidden="true" size={13} />
            </a>
          </div>
        )}
      </section>

      <section className="download-section">
        <div className="download-section-heading">
          <span className="reference-label">Binary install</span>
          <div>
            <h2>Put a release on your PATH.</h2>
            <p>
              After downloading an executable asset, rename it to{" "}
              <code>nox</code> if needed and install it into a user-owned bin
              directory.
            </p>
          </div>
        </div>
        <CodeBlock
          code={`mkdir -p "$HOME/.local/bin"
chmod +x ./nox
install -m 755 ./nox "$HOME/.local/bin/nox"
export PATH="$HOME/.local/bin:$PATH"
nox version`}
        />
        <p className="muted-copy">
          Add the <code>PATH</code> export to your shell profile to keep it
          available in new terminals. A system-wide installation may use{" "}
          <code>/usr/local/bin</code> instead, when you have permission to write
          there.
        </p>
      </section>

      <section className="download-section">
        <div className="download-section-heading">
          <span className="reference-label">Build from source</span>
          <div>
            <h2>Install with Cargo.</h2>
            <p>
              This follows the same Git-based installation model used by{" "}
              <code>nox update</code>. It requires Rust and Cargo on your PATH.
            </p>
          </div>
        </div>
        <CodeBlock
          code={`cargo install --git https://github.com/playfairs/nox.git nox --locked
nox version
nox help`}
        />
        <p className="muted-copy">
          For a checkout you are actively developing, use{" "}
          <code>cargo build --release</code> first, then run{" "}
          <code>./target/release/nox install --release</code> from the project
          root.
        </p>
      </section>

      <section className="download-section">
        <div className="download-section-heading">
          <span className="reference-label">Update</span>
          <div>
            <h2>Let Nox update itself.</h2>
            <p>
              The updater checks the stable channel by default, compares
              semantic versions, and uses Cargo to replace the installed
              executable. It never automatically downgrades.
            </p>
          </div>
        </div>
        <div className="update-grid">
          <div>
            <h3>Stable</h3>
            <CodeBlock code="nox update" />
          </div>
          <div>
            <h3>Development</h3>
            <CodeBlock code="nox update --dev" />
          </div>
          <div>
            <h3>Exact version</h3>
            <CodeBlock code="nox update --version 1.2.3" />
          </div>
        </div>
        <p className="muted-copy">
          Nix-managed installations are intentionally different: run{" "}
          <code>nix flake update nox</code> from the directory containing your
          Nix configuration, then rebuild through your normal Nix workflow.
        </p>
      </section>

      <section className="download-section verification-section">
        <div className="download-section-heading">
          <span className="reference-label">Verify</span>
          <div>
            <h2>Confirm the executable you are using.</h2>
            <p>
              Use these after an install or update, especially when more than
              one Nox binary may be on your PATH.
            </p>
          </div>
        </div>
        <CodeBlock
          code={`command -v nox
nox version
nox help update`}
        />
        <div className="verification-note">
          <CheckCircle2 aria-hidden="true" size={18} />
          <span>
            Nox is free and unencumbered software released under the{" "}
            <a href="https://unlicense.org/" target="_blank" rel="noreferrer">
              Unlicense
            </a>
            .
          </span>
        </div>
      </section>
    </div>
  );
}
