"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Command = {
  name: string;
  aliases?: string;
  usage: string;
  summary: string;
  details: string[];
  examples: string[];
};

const commands: Command[] = [
  {
    name: "init",
    usage: "nox init [PROJECT_NAME] [OPTIONS]",
    summary: "Analyze a directory and generate missing Nox project files.",
    details: [
      "init uses the current directory or a named directory, reports detected languages and project files, then writes only files that do not already exist. Existing nox.build, manifests, Nix, task, README, formatter, and Git files are preserved.",
      "Language and project type are inferred when possible. Use --language, --type, and --name for automation. Empty non-interactive projects default to Rust and executable. --template is accepted but template generation is not implemented.",
      "By default init generates a noxfile, flake.nix, README, and .gitignore as needed. --no-noxfile and --no-nix disable those components; --formatter requests supported formatter configuration.",
    ],
    examples: [
      "nox init",
      "nox init my-project --language rust --type executable",
      "nox init --language c --formatter --no-nix",
    ],
  },
  {
    name: "setup",
    aliases: "configure",
    usage: "nox setup [BUILD_DIR] [OPTIONS]",
    summary: "Parse, validate, and configure a project without compiling it.",
    details: [
      "Nox reads nox.build from the current working directory, validates target names and dependencies, detects the C compiler, linker, and archiver, creates BUILD_DIR, writes BUILD_DIR/nox.state, and writes nox.config in the project root.",
      "BUILD_DIR defaults to build. A positional directory selects the build directory; -C/--build-dir also selects it. If both are supplied, the positional directory wins. --reconfigure removes the selected directory before setup.",
      "The configuration is debug by default and is stored in nox.state. --release selects release; --debug selects debug. Setup never compiles sources.",
    ],
    examples: [
      "nox setup",
      "nox setup build --release",
      "nox configure out --reconfigure",
    ],
  },
  {
    name: "build",
    aliases: "b; compile",
    usage: "nox build [BUILD_DIR] [OPTIONS]",
    summary:
      "Load configured state, compile sources, and link targets in dependency order.",
    details: [
      "build loads BUILD_DIR/nox.state, reparses and validates nox.build, compiles changed sources, and creates the configured artifacts. It requires setup first unless a state file already exists.",
      "The selected build directory comes from a positional directory, -C/--build-dir, nox.config, or build in that order. A positional directory overrides -C. Targets are written below BUILD_DIR/<configuration>/<target>.",
      "compile and b dispatch to the same build behavior. --release and --debug are parsed, but an existing state's configuration controls this command; use setup or rebuild to change configuration. Repeated --compile-flag values are appended to the loaded state for this invocation.",
    ],
    examples: [
      "nox build",
      "nox b out -j 8",
      "nox compile -C build --compile-flag -Wall",
    ],
  },
  {
    name: "rebuild",
    usage: "nox rebuild [OPTIONS]",
    summary:
      "Delete the selected build directory, configure again, and build from scratch.",
    details: [
      "rebuild removes the selected build directory, runs setup with the selected debug or release configuration and compile flags, reloads the state, and builds every target. It does not preserve the old build artifacts.",
      "The directory is selected by -C/--build-dir, nox.config, or build. Unlike setup, rebuild does not accept a positional build directory as a special selector.",
    ],
    examples: ["nox rebuild", "nox rebuild --release -C build"],
  },
  {
    name: "clean",
    usage: "nox clean [OPTIONS]",
    summary: "Remove generated build state and artifacts.",
    details: [
      "clean removes the selected build directory when it exists. Installed files under the install prefix are preserved.",
      "When no explicit -C/--build-dir was supplied, clean also removes the root nox.config. With an explicit build directory, nox.config is preserved.",
    ],
    examples: ["nox clean", "nox clean -C out"],
  },
  {
    name: "validate",
    usage: "nox validate [OPTIONS]",
    summary: "Parse and validate nox.build without compiling.",
    details: [
      "Validation checks project syntax, duplicate target names, unknown dependencies, dependency cycles, and targets without sources. On success it prints validated followed by the project name.",
      "The parser also enforces the supported nox.build project members, target properties, booleans, lists, globs, bindings, and command substitutions described on the Build page.",
    ],
    examples: ["nox validate"],
  },
  {
    name: "status",
    aliases: "stat",
    usage: "nox status [OPTIONS]",
    summary: "Show the selected build state's project and toolchain metadata.",
    details: [
      "If the state is absent, status prints a warning and succeeds: not configured: BUILD_DIR. Otherwise it prints project name and version, optional description, license, repository, website, authors, and maintainers, plus edition, dependency count, root, build directory, configuration, compiler, linker, archiver, compile flags, and target count.",
      "When nox.build defines more than one project, status requires the project name: nox stat PROJECT. Without it, Nox calmly lists the available project/executable choices instead of guessing.",
      "status does not parse command-line configuration flags into the state; it reports the stored state selected by the build-directory rules.",
    ],
    examples: ["nox status", "nox stat -C build"],
  },
  {
    name: "targets",
    aliases: "list",
    usage: "nox targets [OPTIONS]",
    summary: "Print declared target names, one per line.",
    details: [
      "The command parses nox.build and prints targets in declaration order. It does not configure, build, or show dependency order.",
    ],
    examples: ["nox targets", "nox list"],
  },
  {
    name: "graph",
    usage: "nox graph [OPTIONS]",
    summary: "Print target names in dependency order.",
    details: [
      "The command parses nox.build and prints dependencies before the targets that consume them. Unknown dependencies and cycles fail the command.",
    ],
    examples: ["nox graph"],
  },
  {
    name: "riders",
    usage: "nox riders [OPTIONS]",
    summary: "List the built-in language backends.",
    details: [
      "The registry lists C, C++, Rust, D, Go, Java, C#, Swift, Zig, Python, JavaScript, TypeScript, and Kotlin Riders, with the toolchain role of each backend. Availability of an external tool is checked when setup or build needs it.",
    ],
    examples: ["nox riders"],
  },
  {
    name: "run",
    aliases: "r",
    usage: "nox run [PATH|TARGET] [OPTIONS] [-- ARGS...]",
    summary:
      "Build and run a project target, run the project, or execute a supported source file.",
    details: [
      "With no input or with ., run selects the only project when one exists. If nox.build defines multiple projects, Nox lists their executables and the exact nox run PROJECT commands, then exits without guessing. Use the project name to select one.",
      "Project execution loads state, requires its stored configuration to match --debug or --release, parses and validates nox.build, builds the project, selects the requested executable, and runs its artifact. Libraries cannot be run.",
      "The file handlers are .fsx via dotnet fsi, .py via Python, .js/.jsx/.mjs via Node.js, .rb via Ruby, and .c/.cc/.cpp/.cxx/.d by temporary compilation and execution. Registered Rust, Go, Java, C#, Swift, Zig, TypeScript, and Kotlin handlers are currently marked unsupported for direct file execution. Temporary artifacts are removed from the system temporary directory after execution.",
      "Only run treats -- as an argument separator. Everything after it is passed to the child process. A child exit code is preserved; a signal termination becomes 1.",
    ],
    examples: [
      "nox run",
      "nox r app -- --verbose",
      "nox run noml",
      "nox run examples/python/arguments.py -- one two",
      "nox run examples/c/Test.c -- hello",
    ],
  },
  {
    name: "noml",
    usage: "cargo run -- [parse|check|format] FILE",
    summary: "Use the standalone NOML parser and formatter crate.",
    details: [
      "NOML is the object-modeling language used by Nox for embedded rule files. The noml crate exposes parsing and serialization as a library and provides a default noml CLI binary.",
      "The noml CLI supports parse, check, and format commands. format rewrites a file in canonical serialized form. The separate nomlfmt binary formats a file in place directly.",
      "The standalone crate lives in the noml directory and has its own Cargo manifest and noxfile. It can be built independently from the main Nox executable.",
    ],
    examples: [
      "cd noml && cargo run -- parse demo.noml",
      "cd noml && cargo run -- check demo.noml",
      "cd noml && cargo run --bin nomlfmt -- demo.noml",
    ],
  },
  {
    name: "test",
    usage: "nox test [OPTIONS]",
    summary: "Run the task named test from noxfile.",
    details: [
      "test is exactly a shortcut for task test. It requires a readable noxfile containing a task named test; this command does not invoke a language test framework itself.",
    ],
    examples: ["nox test"],
  },
  {
    name: "task",
    usage: "nox task NAME [OPTIONS]",
    summary: "Run a named noxfile task and its dependencies.",
    details: [
      "task reads noxfile, supports the YAML-like tasks: syntax and legacy task blocks, resolves @nox dependencies, detects dependency cycles, interpolates {{version}}, {{build_dir}}, and string settings from nox.build, then runs each command in order.",
      "On Unix commands run through sh -c. On Windows Nox uses the nox.build windows-shell list when it has at least two values, otherwise cmd /C. A task command failure is reported as a process error and exits Nox with 1 rather than preserving the child's exact status.",
      "NAME is required. A dependency name that is not another task is invoked as a Nox CLI command, using the current executable.",
    ],
    examples: ["nox task format", "nox task build"],
  },
  {
    name: "tasks",
    usage: "nox tasks [OPTIONS]",
    summary: "List task names from noxfile in alphabetical order.",
    details: [
      "tasks parses the same YAML-like and legacy task formats as task, but does not execute commands. The noxfile must be readable.",
    ],
    examples: ["nox tasks"],
  },
  {
    name: "install",
    usage: "nox install [OPTIONS]",
    summary:
      "Configure if needed, build, and copy install-marked targets into a prefix.",
    details: [
      "install uses the selected build directory and configuration. If state is missing or has a different configuration, it automatically runs setup without command-line compile flags, then builds the project.",
      "Targets with install = true are copied to PREFIX/bin, except static and shared libraries, which go to PREFIX/lib. Directories are created as needed. Existing destination files are overwritten by the copy.",
      "When nox.build defines multiple projects, provide the project name: nox install PROJECT. Without it, Nox lists the available project/executable choices and exits without installing an arbitrary project.",
      "The default prefix is /usr/local on Unix and C:\\Program Files\\Nox on Windows. --prefix selects another path. install does not update nox.config unless its automatic setup writes it.",
    ],
    examples: ["nox install", "nox install --release --prefix $HOME/.local"],
  },
  {
    name: "uninstall",
    usage: "nox uninstall [OPTIONS]",
    summary: "Remove installed artifacts belonging to install-marked targets.",
    details: [
      "uninstall parses and validates nox.build, then removes matching files from PREFIX/bin or PREFIX/lib when they exist. It does not configure or build, and it ignores missing installed files.",
    ],
    examples: ["nox uninstall", "nox uninstall --prefix $HOME/.local"],
  },
  {
    name: "version",
    usage: "nox version",
    summary: "Print the version embedded from VERSION.",
    details: [
      "The output is nox VERSION. The current repository version is 1.2.0; installed binaries report the VERSION file that was embedded when they were built.",
    ],
    examples: ["nox version", "nox --version"],
  },
  {
    name: "bump-version",
    aliases: "bump",
    usage: "nox bump-version [major|minor|patch|VERSION] [OPTIONS]",
    summary: "Update VERSION and matching version references.",
    details: [
      "With no argument, bump-version increments the patch component. major and minor increment their component and reset lower components; patch increments the patch component. An explicit value must be numeric MAJOR.MINOR.PATCH.",
      "VERSION is always updated. If no version_files setting exists in nox.build, Nox recursively scans the project root while skipping .git, build, and target. If version_files exists, only those listed paths are additionally updated. Replacements require numeric/dot token boundaries, so a version embedded in a larger version is not changed.",
      "At most one positional argument is accepted. Nox prints the old and new versions and each file it changed.",
    ],
    examples: ["nox bump-version", "nox bump minor", "nox bump-version 2.0.0"],
  },
  {
    name: "help",
    usage: "nox help [COMMAND]",
    summary: "Print general or command-specific help.",
    details: [
      "Bare nox, --help, and -h select general help. Every recognized command accepts --help and -h; help is printed after option parsing. Unknown command help prints a short unknown-command message.",
    ],
    examples: ["nox help", "nox help install", "nox run --help"],
  },
];

const options = [
  [
    "-h",
    "--help",
    "none",
    "Print help for the selected command and return success. It is recognized after the command; bare -h selects general help.",
  ],
  [
    "-v, -V",
    "--version",
    "none",
    "Print nox VERSION and return success immediately. At the first argument position, it takes precedence over command parsing.",
  ],
  [
    "-C",
    "--build-dir PATH",
    "path",
    "Select the build directory. The default is build, then the path recorded in nox.config is used when no explicit directory was supplied. A positional directory for setup/build/compile overrides this option.",
  ],
  [
    "-j",
    "-jN",
    "positive integer",
    "Set the requested number of parallel build workers. -j requires a separate value; -jN accepts the value attached to the short option. The default is available_parallelism(), falling back to 1. Values are clamped to at least 1 by the executor.",
  ],
  [
    "",
    "--release",
    "none",
    "Select the release configuration for setup, rebuild, install, and run configuration checks. The option is parsed for all commands, but build uses the configuration stored in nox.state.",
  ],
  [
    "",
    "--debug",
    "none",
    "Select the debug configuration. Debug is the default when no configuration option is supplied.",
  ],
  [
    "",
    "--reconfigure",
    "none",
    "For setup, remove the selected build directory before recreating its state. On other commands the value is parsed but has no command-specific effect.",
  ],
  [
    "",
    "--compile-flag FLAG",
    "string",
    "Append a compiler flag. Repeat the option to add multiple flags. Setup stores the flags in nox.state; build appends them for its invocation. Automatic setup inside install does not receive command-line compile flags.",
  ],
  [
    "",
    "--prefix PATH",
    "path",
    "Select the install prefix for install and uninstall. Relative paths are resolved from the current project root; the default is /usr/local on Unix or C:\\Program Files\\Nox on Windows.",
  ],
];

const commandArguments: Record<string, string[]> = {
  init: ["PROJECT_NAME (optional)"],
  setup: ["BUILD_DIR (optional; defaults to build)"],
  build: ["BUILD_DIR (optional; resolved from nox.config or build)"],
  rebuild: [],
  clean: [],
  validate: [],
  status: ["PROJECT (required when nox.build defines multiple projects)"],
  targets: [],
  graph: [],
  riders: [],
  run: [
    "PATH|TARGET (optional)",
    "ARGS... after -- are forwarded to the child",
  ],
  test: [],
  task: ["NAME (required)"],
  tasks: [],
  install: [],
  uninstall: [],
  version: [],
  "bump-version": ["major, minor, patch, or VERSION (optional)"],
  help: ["COMMAND (optional)"],
};

const commandOptions: Record<string, string[]> = {
  init: [
    "--name NAME",
    "--language LANG",
    "--type TYPE",
    "--template NAME",
    "--formatter",
    "--no-nix | --no-noxfile",
  ],
  setup: [
    "-C, --build-dir PATH",
    "--release | --debug",
    "--reconfigure",
    "--compile-flag FLAG",
  ],
  build: [
    "-C, --build-dir PATH",
    "-j N or -jN",
    "--release | --debug",
    "--compile-flag FLAG",
  ],
  rebuild: [
    "-C, --build-dir PATH",
    "-j N or -jN",
    "--release | --debug",
    "--compile-flag FLAG",
  ],
  clean: ["-C, --build-dir PATH"],
  status: ["-C, --build-dir PATH"],
  run: ["-C, --build-dir PATH", "-j N or -jN", "--release | --debug"],
  install: [
    "PROJECT (required when nox.build defines multiple projects)",
    "-C, --build-dir PATH",
    "-j N or -jN",
    "--release | --debug",
    "--prefix PATH",
  ],
  uninstall: ["--prefix PATH"],
  "bump-version": [],
};

const sharedOptions = ["-h, --help", "-v, -V, --version"];

export default function CommandsPage() {
  const [selectedCommand, setSelectedCommand] = useState<Command | null>(null);

  useEffect(() => {
    if (!selectedCommand) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedCommand(null);
      }
    };

    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [selectedCommand]);

  return (
    <div className="page section-width interior-page reference-page">
      <div className="page-intro">
        <p className="eyebrow">CLI reference</p>
        <h1 className="cli-page-title">
          Commands
          <br />
          <em>&amp; flags.</em>
        </h1>
        <p>
          The complete command-line surface implemented by the current Nox
          binary. Nox parses options manually, so the behavior below includes
          the defaults, precedence rules, and side effects that are easy to miss
          in a short usage line.
        </p>
      </div>

      <div className="reference-grid">
        <section className="reference-section" id="global-options">
          <div className="reference-label">Global options</div>
          <div>
            <h2>Options accepted by the parser.</h2>
            <p>
              Options may generally appear after any command. Unknown options,
              missing values, invalid job counts, and invalid paths fail with a
              configuration error. There are no command-specific flag aliases
              beyond the forms shown here.
            </p>
            <div className="cli-table">
              {options.map(([short, long, value, behavior]) => (
                <div className="cli-row" key={long}>
                  <div className="cli-form">
                    {short && <code>{short}</code>}
                    <code>{long}</code>
                    <span>{value}</span>
                  </div>
                  <p>{behavior}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="reference-section" id="commands">
          <div className="reference-label">Commands</div>
          <div>
            <h2>Every supported command.</h2>
            <div className="cli-command-index">
              {commands
                .slice()
                .sort((left, right) => left.name.localeCompare(right.name))
                .map((command) => (
                  <button
                    className="cli-command-card"
                    key={command.name}
                    type="button"
                    onClick={() => setSelectedCommand(command)}
                  >
                    <span>nox {command.name}</span>
                    <small>{command.summary}</small>
                    <b aria-hidden="true">+</b>
                  </button>
                ))}
            </div>
          </div>
        </section>

        <section className="reference-section" id="aliases">
          <div className="reference-label">Aliases</div>
          <div>
            <h2>Short names and equivalent dispatch.</h2>
            <p>
              <code>b</code> maps to <code>build</code>; <code>r</code> maps to{" "}
              <code>run</code>; <code>configure</code> maps to{" "}
              <code>setup</code>; <code>compile</code> shares build behavior;{" "}
              <code>list</code> shares targets behavior; <code>stat</code>{" "}
              shares status behavior; and <code>bump</code> shares bump-version
              behavior. <code>test</code> is a command shortcut for{" "}
              <code>task test</code>, not an alias in the command resolver.
            </p>
          </div>
        </section>

        <section className="reference-section" id="errors">
          <div className="reference-label">Exit behavior</div>
          <div>
            <h2>Output, errors, and status codes.</h2>
            <p>
              Normal output goes to stdout and errors go to stderr with a
              <code>nox:</code> prefix. Configuration, parse, I/O, process,
              missing-tool, and build failures exit with code 1. A run child’s
              nonzero exit status is preserved; signal termination becomes 1.
              Task, compiler, linker, archiver, setup, and install failures are
              reported as Nox errors and exit with 1.
            </p>
            <p>
              Output is colorized only when the relevant stream is a terminal.
              Set <code>NO_COLOR</code> to disable ANSI colors and terminal
              hyperlinks. Tool discovery uses the inherited <code>PATH</code>;
              Nox defines no other CLI environment variables.
            </p>
            <p>
              Nox always treats the current working directory as the project
              root. It does not search parent directories for nox.build.
            </p>
          </div>
        </section>

        <section className="reference-section">
          <div className="reference-label">Related syntax</div>
          <div>
            <h2>The files commands operate on.</h2>
            <p>
              <code>nox.build</code> defines project metadata, settings,
              targets, source paths or <code>glob(...)</code> patterns,
              dependencies, compiler flags, and install markers.{" "}
              <code>noxfile</code> defines optional named tasks. Setup writes{" "}
              <code>nox.state</code> and
              <code>nox.config</code>; <code>VERSION</code> supplies the project
              version used by version commands and task interpolation.
            </p>
            <div className="reference-links">
              <Link href="/build">
                Read the nox.build reference <span>→</span>
              </Link>
              <Link href="/tasks">
                Read the noxfile reference <span>→</span>
              </Link>
              <Link href="/docs">
                Return to Docs <span>→</span>
              </Link>
            </div>
          </div>
        </section>
      </div>

      {selectedCommand && (
        <div
          className="cli-modal-backdrop"
          role="presentation"
          onClick={() => setSelectedCommand(null)}
        >
          <section
            aria-labelledby="command-panel-title"
            aria-modal="true"
            className="cli-modal"
            role="dialog"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              aria-label="Close command details"
              className="cli-modal-close"
              type="button"
              onClick={() => setSelectedCommand(null)}
            >
              <span aria-hidden="true">×</span>
            </button>
            <p className="eyebrow">command details</p>
            <div className="cli-modal-heading">
              <h2 id="command-panel-title">nox {selectedCommand.name}</h2>
              {selectedCommand.aliases && (
                <span>aliases: {selectedCommand.aliases}</span>
              )}
            </div>
            <div className="cli-detail-block cli-detail-purpose">
              <span className="cli-detail-label">What it does</span>
              <p>{selectedCommand.summary}</p>
            </div>
            <div className="cli-detail-block">
              <span className="cli-detail-label">Usage</span>
              <pre>
                <code>{selectedCommand.usage}</code>
              </pre>
            </div>
            <div className="cli-detail-grid">
              <div className="cli-detail-block">
                <span className="cli-detail-label">Arguments</span>
                {commandArguments[selectedCommand.name]?.length ? (
                  <ul>
                    {commandArguments[selectedCommand.name].map((argument) => (
                      <li key={argument}>
                        <code>{argument}</code>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="cli-detail-empty">None</p>
                )}
              </div>
              <div className="cli-detail-block">
                <span className="cli-detail-label">Options &amp; flags</span>
                <ul>
                  {sharedOptions.map((option) => (
                    <li key={option}>
                      <code>{option}</code>
                    </li>
                  ))}
                  {(commandOptions[selectedCommand.name] ?? []).map(
                    (option) => (
                      <li key={option}>
                        <code>{option}</code>
                      </li>
                    ),
                  )}
                </ul>
              </div>
            </div>
            {selectedCommand.aliases && (
              <div className="cli-detail-block">
                <span className="cli-detail-label">Aliases</span>
                <p>
                  <code>{selectedCommand.aliases}</code>
                </p>
              </div>
            )}
            <div className="cli-detail-block">
              <span className="cli-detail-label">Behavior</span>
              {selectedCommand.details.map((detail) => (
                <p key={detail}>{detail}</p>
              ))}
            </div>
            <div className="cli-examples">
              <span>Examples</span>
              {selectedCommand.examples.map((example) => (
                <code key={example}>{example}</code>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
