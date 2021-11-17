import test from "ava";
import { matcher, asyncMatcher } from "matching-iterator";

async function* makeAsync(entries, time = 10) {
  for (const entry of entries) {
    yield new Promise(resolve => setTimeout(resolve(entry), time));
  }
}

async function mt(t, pattern, options, entries, result) {
  const r = [...matcher(entries, pattern, options)];
  //console.log(">>", r);
  t.deepEqual(r, result, "sync result");

  const matched = [];
  for await (const m of asyncMatcher(makeAsync(entries), pattern, options)) {
    matched.push(m);
  }
  t.deepEqual(matched, result, "async result");
}

mt.title = (providedTitle = "", pattern, options, entries, result) =>
  `match ${providedTitle} ${JSON.stringify(pattern)}${
    options ? JSON.stringify(options) + " " : ""
  } ${entries}`.trim();

test(mt, undefined, undefined, ["a", "b", "c"], ["a", "b", "c"]);
test(mt, [], undefined, ["a", "b", "c"], ["a", "b", "c"]);
test(mt, "", undefined, ["a", "b", "c"], ["a", "b", "c"]);
test(mt, [""], undefined, ["a", "b", "c"], ["a", "b", "c"]);
test(mt, "a", undefined, ["a", "b", "c"], ["a"]);

test(
  mt,
  "a",
  { name: "x" },
  [{ x: "a", extra: true }, { x: "b" }, { x: "c" }],
  [{ x: "a", extra: true }]
);

test(mt, "a", {}, ["a", "A", "c"], ["a"]);
test(mt, "a", { caseSensitive: false }, ["a", "A", "c"], ["a", "A"]);

test(mt, ["a", "b"], undefined, ["a", "b", "c"], ["a", "b"]);

test(mt, "*", undefined, ["a", "b", "c"], ["a", "b", "c"]);
test(mt, "*.c", undefined, ["a.a", "a.b", "a.c"], ["a.c"]);
test(mt, ["*.c", "*.a"], undefined, ["a.a", "a.b", "a.c"], ["a.a", "a.c"]);

test(
  mt,
  "!banana",
  undefined,
  ["apple", "banana", "citrus"],
  ["apple", "citrus"]
);
test(mt, "!*.c", undefined, ["a.a", "a.b", "a.c"], ["a.a", "a.b"]);
test(
  mt,
  "**/rollup.config.*js",
  undefined,
  ["rollup.config.mjs", "rollupx.config.mjs", "tests/rollup.config.mjs"],
  ["rollup.config.mjs", "tests/rollup.config.mjs"]
);
test(
  mt,
  ".github/workflows/*.yml",
  undefined,
  [".github/workflows/ci.yml", "ci.yml", ".github/ci.yml"],
  [".github/workflows/ci.yml"]
);

test(
  mt,
  ["!tests/*.mjs"],
  undefined,
  ["a.mjs", "b.mjs", "tests/c.mjs"],
  ["a.mjs", "b.mjs"]
);

test(
  mt,
  ["**/package.json", "!tests/**/*"],
  undefined,
  [".gitignore", "package.json", "tests/rollup.config.mjs"],
  ["package.json"]
);

test.skip(
  mt,
  ["**/e*", "!d1/*"], //, "!d2/**/*"],
  undefined,
  [
    //  ".e1",
    "e2",
    "e3",
    "d1/e4"
    //  "d2/d3/e5"
  ],
  ["e2", "e3"]
);
