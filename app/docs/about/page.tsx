"use client";

import { useState } from "react";
import { GraduationCap, SlidersHorizontal } from "lucide-react";
import Link from "next/link";

type Explanation = {
  title: string;
  technical: string;
  simple: string;
};

const concepts: Explanation[] = [
  {
    title: "What Nox is",
    technical:
      "Nox is a command-line program written in Rust. It combines a declarative build system with an optional task runner: nox.build describes artifacts and their dependencies, while noxfile describes repeatable commands around the project.",
    simple:
      "Nox is a helper you run in a terminal. You tell it what your project is made of and what jobs you want repeated. It remembers the plan, then does the jobs in the right order.",
  },
  {
    title: "What a build system does",
    technical:
      "A build system turns source code into usable artifacts: executables, static libraries, shared libraries, JARs, and language-specific outputs. It tracks the source files, flags, generated objects, and target dependencies required to produce each artifact.",
    simple:
      "Programming starts as text files people can read. A build system is the workshop that turns those files into something a computer can run, like an app or a command-line tool.",
  },
  {
    title: "Why dependency order matters",
    technical:
      "A target can require another target before it can link or run. Nox validates that graph, rejects missing names and cycles, then builds dependencies before the targets that consume them. This prevents a target from trying to use an artifact that does not exist yet.",
    simple:
      "Some parts of a project need other parts finished first. It is like assembling a bicycle: you need the wheels before you can test the complete bike. Nox keeps track of that order for you.",
  },
  {
    title: "What incremental builds are",
    technical:
      "After setup, Nox records build state and lets language backends determine which generated objects are stale. On a normal build, unchanged sources and their valid outputs are reused instead of being compiled again.",
    simple:
      "After you change one page in a long book, you would not reprint every page. Nox tries to redo only the parts affected by what changed, which saves time.",
  },
  {
    title: "What a task runner does",
    technical:
      "A task runner gives a project named, repeatable shell commands. In a noxfile, tasks may run commands, depend on other tasks, call Nox commands with @nox, and interpolate selected project values. Tasks do not declare the compilation graph.",
    simple:
      "Projects have chores besides making the program: formatting files, running tests, creating a release, or checking mistakes. A task runner gives those chores short names, so everyone runs them the same way.",
  },
  {
    title: "What setup, build, and run mean",
    technical:
      "nox setup parses and validates nox.build, detects native tools, and writes a build state. nox build uses that state to compile and link targets. nox run first builds the selected runnable target, then starts its resulting artifact and forwards arguments after --.",
    simple:
      "Setup is Nox checking that the plan and tools are ready. Build is Nox making the program. Run is Nox starting the finished program for you.",
  },
  {
    title: "What Nox does not do",
    technical:
      "Nox does not replace a source-code editor, a package registry, or every language's native package manager. Its Rust Rider invokes rustc directly, for example; Cargo dependency resolution remains Cargo's job. Its task runner is intentionally separate from the build graph.",
    simple:
      "Nox is not every tool a programmer uses. It does not write code for you or replace all the tools that different programming languages already have. It focuses on organizing how a project is prepared, made, checked, and started.",
  },
];

export default function AboutPage() {
  const [dummyMode, setDummyMode] = useState(false);
  const audience = dummyMode
    ? "Plain-language explanation"
    : "Technical explanation";

  return (
    <div
      className={
        dummyMode
          ? "page section-width interior-page reference-page about-page dummy-mode"
          : "page section-width interior-page reference-page about-page"
      }
    >
      <div className="about-toolbar">
        <button
          type="button"
          className="dummy-toggle"
          aria-pressed={dummyMode}
          onClick={() => setDummyMode((enabled) => !enabled)}
          title={`Switch to ${dummyMode ? "technical" : "plain-language"} explanations`}
        >
          {dummyMode ? (
            <GraduationCap aria-hidden="true" size={16} />
          ) : (
            <SlidersHorizontal aria-hidden="true" size={16} />
          )}
          {dummyMode ? "Technical mode" : "Plain-language mode"}
        </button>
        <span aria-live="polite">Showing: {audience}</span>
      </div>
      <div className="page-intro">
        <p className="eyebrow">About Nox</p>
        <h1>
          {dummyMode ? (
            <>
              What Nox does,
              <br />
              <em>for non-programmers.</em>
            </>
          ) : (
            <>
              What Nox does,
              <br />
              <em>for programmers.</em>
            </>
          )}
        </h1>
        <p>
          {dummyMode
            ? "This page assumes you have never used a terminal, compiler, or build system. The ideas are the same; just dumbed down."
            : "This page assumes you have used a terminal, compiler, or build system before. The ideas are the same; just formatted for programmers."}
        </p>
      </div>
      <div className="reference-grid about-grid">
        {concepts.map((concept, index) => (
          <section className="reference-section" key={concept.title}>
            <div className="reference-label">
              {String(index + 1).padStart(2, "0")}
            </div>
            <div>
              <h2>{concept.title}</h2>
              <p>{dummyMode ? concept.simple : concept.technical}</p>
            </div>
          </section>
        ))}
        <section className="reference-section about-next">
          <div className="reference-label">Next step</div>
          <div>
            <h2>
              {dummyMode
                ? "Baby steps are okay."
                : "Move from concepts to a project."}
            </h2>
            <p>
              {dummyMode
                ? "When you are ready, the workflow guide walks through creating a small project and asking Nox to make it. You do not need to understand every term before you begin."
                : "Read the workflow guide for an end-to-end project loop, or move into nox.build when you are ready to declare targets and dependencies."}
            </p>
            <div className="reference-links">
              <Link href="/docs/workflows">
                Read the workflow guide <span>→</span>
              </Link>
              <Link href="/build">
                Read the nox.build reference <span>→</span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
