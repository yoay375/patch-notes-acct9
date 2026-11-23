// Real-Life Patch Notes: The Comedy Changelog (make.fun program/v1)
// Writes one funny one-line patch note for a real-life body bug to /output/entry.txt.
// Deterministic: no input, no network, no randomness, no secrets.

import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { createHash } from "node:crypto";

// The patch note: one line, 1-160 UTF-8 characters, no trailing newline.
const ENTRY =
  "v2.2.9: fixed a bug where a mosquito bite itched hardest exactly 3 seconds after the user promised not to scratch it.";

const OUT_DIR = "/output";
const OUT_FILE = "/output/entry.txt";

// Gate: the scorer requires UTF-8 text of 1-160 characters, not whitespace only.
const chars = [...ENTRY].length;
if (chars < 1 || chars > 160) {
  throw new Error(`entry is ${chars} characters, must be 1-160`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be whitespace only");
}
if (ENTRY.includes("\n")) {
  throw new Error("entry must be a single line");
}

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(OUT_FILE, ENTRY, "utf8");

// Report what was written, so the run is self-checking.
const bytes = readFileSync(OUT_FILE);
const text = bytes.toString("utf8");
const sha256 = createHash("sha256").update(bytes).digest("hex");
console.log(`entry: ${text}`);
console.log(`chars: ${[...text].length}`);
console.log(`bytes: ${bytes.length}`);
console.log(`sha256: ${sha256}`);
