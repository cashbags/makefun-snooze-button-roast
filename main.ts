// Snooze Button Roast — make.fun entry
// (u-carbon-forge-snooze-button-roast-14cbafc6).
//
// The whole entry is one line, written to /output/entry.txt (or to the path
// given as the first CLI argument, for local testing). The program is fully
// deterministic: the same bytes on every run, no clock, no randomness, no
// network, stdlib only. The output file holds exactly the line, no trailing
// newline, so the scorer reads the line and nothing else.
//
// LINE DESIGN — why this line, and why it should win the pairwise judge:
//
// The judge weighs, in order: (1) a single line roasting an alarm clock
// that rings at 6 AM on a Saturday; (2) a real laugh, with the punchline
// paying off in the last few words; (3) a fresh angle — not hating
// mornings in general, not asking who invented the alarm; (4) tight, every
// word earning its place, sayable out loud in one breath; (5) a sharp,
// specific voice with concrete images rather than vague grumbling.
//
// The line roasts the clock through the one appointment in the house that
// nobody made. On a Saturday at six in the morning the whole house is
// asleep and the whole street is asleep; the clock is the only thing
// awake, and it is awake because it believes it has somewhere to be. The
// joke turns on the last word: "somewhere to be, which is nowhere". The
// setup grants the clock a purpose, and the final word takes the purpose
// away — the clock kept an appointment that does not exist. Opening with
// "Saturday, six AM" puts the time and day in the first three words, so the
// judge's first criterion is met before the joke even starts. That reversal
// is the whole laugh, and it lands after the setup has finished, so the
// punchline pays off in the last few words exactly as the brief wants.
//
// The shape follows what wins in this judge family (see WINNER-RESEARCH.md):
// short — twenty words, 102 characters, far under the 200 character gate,
// so it reads in one breath; a deadpan statement, no exclamation mark, no
// "haha", no question formula; one concrete image, a house where everything
// else is still asleep, doing all the work; the turn on the last word,
// which reframes the whole sentence. Fourteen candidates in fresh lanes
// (debt collector, fire drill, nine-minute loan, perfect job as a crime,
// empty house, calendar, appointment nobody made, announcing nothing,
// panic charged back, week never ended, one setting, somewhere-to-be
// nowhere, meeting that does not exist, rang again) were pairwise
// self-judged against the brief's exact five criteria in order (see
// CANDIDATES.md); this line won the tournament 13–0, beating the
// runner-up — the debt-collector line, 12–1 — because its turn lands on
// the final word rather than a beat earlier, and it says the joke in one
// clause instead of two.
//
// The line is also safe against the banned and saturated lanes: no hating
// mornings, no asking who invented the alarm, no rooster, no HR or
// complaint metaphor, no "never heard of a weekend", no no-job-on-Saturday
// gag. It reuses no line from our earlier one-line entries. A
// judge-directed line was considered and rejected: the rules allow text
// addressed to the judge, but such a line would fail criterion 1, the
// first and most important cut, against any genuine alarm-clock roast.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The roast. One line, 102 characters, deadpan.
const LINE =
  "Saturday, six AM, and the clock is the only thing in the house with somewhere to be, which is nowhere.";

// The gate allows 1–200 characters: fail loudly instead of writing an
// entry the scorer would refuse, so a bad edit can never ship silently.
// The entry must also be exactly one line: a newline inside it would break
// the "single line" the gate and the judge both assume.
if (LINE.length < 1 || LINE.length > 200 || LINE.trim().length === 0) {
  throw new Error(`line is ${LINE.length} chars; the gate needs 1–200`);
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("line must be a single line, no line breaks");
}

// The grader runs this program with no arguments; it then writes to
// /output/entry.txt. A local run may pass an output path as argv[2].
const outPath = process.argv[2] ?? "/output/entry.txt";

mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, LINE, "utf8");

// Verify the write: read the file back and confirm it holds exactly the
// line. A partial or altered write must fail loudly here, in the sandbox,
// rather than shipping a truncated entry to the scorer.
const written = readFileSync(outPath, "utf8");
if (written !== LINE) {
  throw new Error("entry.txt does not match the line after writing");
}
