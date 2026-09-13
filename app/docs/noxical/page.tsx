import Link from "next/link";

export const metadata = { title: "Noxical" };

export default function NoxicalPage() {
  return (
    <div className="page section-width interior-page reference-page">
      <div className="page-intro"><p className="eyebrow">Nox ecosystem</p><h1>Meet
        <br /><em>Noxical.</em></h1><p>A small Rust lexical analyzer for Nox syntax, exposing tokens, source spans, positions, and structured errors.</p></div>
      <div className="reference-grid">
        <section className="reference-section"><div className="reference-label">Public API</div><div><h2>Tokenize source with one call.</h2><pre><code>{`use noxical::Lexer;

let tokens = Lexer::new(source).tokenize()?;`}</code></pre><p>The crate re-exports <code>Lexer</code>, <code>Token</code>, <code>TokenKind</code>, <code>Span</code>, <code>Position</code>, <code>LexError</code>, and <code>LexErrorKind</code> from its library root.</p></div></section>
        <section className="reference-section"><div className="reference-label">Tokens</div><div><h2>Syntax becomes typed punctuation.</h2><p>Noxical recognizes identifiers, strings, numbers, braces, parentheses, brackets, commas, colons, equals, <code>:=</code>, <code>@</code>, pipes, dots, arithmetic punctuation, and an explicit EOF token. Identifiers allow ASCII letters, digits, underscores, and hyphens after the first character.</p><pre><code>{`project "app" { sources := ["src/main.c"] }
Identifier  String  LeftBrace  Assign  LeftBracket ...`}</code></pre></div></section>
        <section className="reference-section"><div className="reference-label">Positions</div><div><h2>Every token knows its source range.</h2><p><code>Position</code> stores byte offset, one-based line, and one-based column. <code>Span</code> contains start and end positions and exposes a Rust byte range through <code>byte_range()</code>. This gives parsers and diagnostics precise source locations.</p></div></section>
        <section className="reference-section"><div className="reference-label">Errors</div><div><h2>Lexing failures stay structured.</h2><p><code>LexErrorKind</code> distinguishes unexpected characters, unterminated strings, invalid escapes, and invalid numbers. <code>LexError</code> pairs that kind with a span and formats as a human-readable message with line and column.</p><pre><code>{`Lexer::new("project §").tokenize()
// unexpected character '§' at line 1, column 9`}</code></pre></div></section>
        <section className="reference-section"><div className="reference-label">Development</div><div><h2>Small crate, focused tests.</h2><p>The test suite covers Nox punctuation, strings and numbers, hash comments, byte ranges, positions, unexpected characters, unterminated strings, malformed numbers, and invalid escapes.</p><pre><code>{`cargo test
nox build
nox test`}</code></pre><div className="reference-links"><Link href="/docs/noxide">Read NoxIDE <span>→</span></Link><Link href="/docs/testing">Testing guide <span>→</span></Link></div></div></section>
      </div>
    </div>
  );
}
