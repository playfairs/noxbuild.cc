"use client";

import { useEffect, useState } from "react";
import { Clipboard, ClipboardCheck } from "lucide-react";

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
        <p className="eyebrow">Releases</p>
        <h1>
          Get Nox
          <br />
          <em>on your machine.</em>
        </h1>
        <p>
          Download the latest release from GitHub. The instructions on how to
          install Nox to your path is below the downloads.
        </p>
      </div>

      <section className="download-section">
        <div className="download-section-heading">
          <span className="reference-label">Latest release</span>
          <span className="release-status">
            {release ? release.tag_name : "don't mind me..."}
          </span>
        </div>
        {release && (
          <div className="release-meta">
            <span>
              Published {new Date(release.published_at).toLocaleDateString()}
            </span>
            <a href={release.html_url} target="_blank" rel="noreferrer">
              View release on GitHub ↗
            </a>
          </div>
        )}
        {release && (
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
                <span className="artifact-arrow">↗</span>
              </a>
            ))}
          </div>
        )}
        {!release && !error && (
          <div className="loading-line">
            Fetching release artifacts from GitHub...
          </div>
        )}
        {error && (
          <div className="error-line">
            if you can see this, sum shi went wrong, probably rate limits on
            your side{" "}
            <a
              href="https://github.com/playfairs/nox/releases/latest"
              target="_blank"
              rel="noreferrer"
            >
              Open the latest release directly ↗
            </a>
          </div>
        )}
      </section>

      <section className="download-section install-section">
        <div className="download-section-heading">
          <span className="reference-label">Install</span>
          <span className="release-status">macOS & Linux</span>
        </div>
        <p>
          Choose the artifact for your platform above. The commands below use
          its actual release filename.
        </p>
        {release ? (
          release.assets.map((asset) => (
            <div className="install-option" key={asset.name}>
              <h3>{asset.name}</h3>
              <CodeBlock
                code={`chmod +x ${asset.name}\nsudo install -m 755 ${asset.name} /usr/local/bin/nox`}
              />
            </div>
          ))
        ) : (
          <div className="loading-line">
            Waiting for the release filename...
          </div>
        )}
        <p className="muted-copy">
          For a user-local install, use <code>~/.local/bin</code> instead of{" "}
          <code>/usr/local/bin</code> and make sure it is on your{" "}
          <code>PATH</code>.
        </p>
      </section>

      <section className="download-section">
        <div className="download-section-heading">
          <span className="reference-label">Build from source</span>
        </div>
        <CodeBlock
          code={`cargo build --release\nsudo ./target/release/nox install --release`}
        />
        <p className="muted-copy">
          Nox is free and unencumbered software released under the{" "}
          <a href="https://unlicense.org/" target="_blank" rel="noreferrer">
            Unlicense
          </a>
          .
        </p>
      </section>
    </div>
  );
}
