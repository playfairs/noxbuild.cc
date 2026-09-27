"use client";

export default function ApologyPrompt() {
  return (
    <h1>
      When Nox
      <br />
      <em>
        <button
          type="button"
          className="apology-trigger"
          onClick={() => window.alert("I'm so fucking sorry.")}
        >
          disobeys its master.
        </button>
      </em>
    </h1>
  );
}