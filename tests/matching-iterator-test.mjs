import test from "ava";
import { matcher } from "matching-iterator";

async function mt(t, pattern, options, entries, result) {
  const r = [...matcher(entries, pattern, options)];
  //console.log(">>", r);
  t.deepEqual(r, result);
}

mt.title = (providedTitle = "", pattern, options, entries, result) =>
  `match ${providedTitle} ${pattern} ${entries}`.trim();

test(mt, undefined, undefined, ["a", "b", "c"], ["a", "b", "c"]);
test(mt, [], undefined, ["a", "b", "c"], ["a", "b", "c"]);
test(mt, "a", undefined, ["a", "b", "c"], ["a"]);

test(mt, "a", { name: "x"}, [{x:"a", extra: true}, {x:"b"}, {x:"c"}], [{x:"a", extra: true}]);

test(mt, "a", {}, ["a", "A", "c"], ["a"]);
test(mt, "a", { caseSensitive: false }, ["a", "A", "c"], ["a", "A"]);

test(mt, ["a", "b"], undefined, ["a", "b", "c"], ["a", "b"]);

test(mt, "*", undefined, ["a", "b", "c"], ["a", "b", "c"]);
test(mt, "*.c", undefined, ["a.a", "a.b", "a.c"], ["a.c"]);
test(mt, ["*.c", "*.a"], undefined, ["a.a", "a.b", "a.c"], ["a.a", "a.c"]);

test(mt, "!banana", undefined, ["apple", "banana", "citrus"], ["apple", "citrus"]);
test(mt, "!*.c", undefined, ["a.a", "a.b", "a.c"], ["a.a", "a.b"]);
test(
  mt,
  "**/rollup.config.*js", undefined,
  ["rollup.config.mjs", "rollupx.config.mjs", "tests/rollup.config.mjs"],
  ["rollup.config.mjs", "tests/rollup.config.mjs"]
);
test(
  mt,
  ".github/workflows/*.yml", undefined,
  [".github/workflows/ci.yml", "ci.yml", ".github/ci.yml"],
  [".github/workflows/ci.yml"]
);

test.skip(
  mt,
  ["**/package.json", "!test/**/*", "!tests/**/*"], undefined,
  [
    ".gitignore",
    "package.json",
    "tests/rollup.config.mjs",
    "test/fixtures/package.json"
  ],
  ["package.json"]
);

test.skip(
  mt,
  ["**/*.mjs", "!tests/*.mjs"], undefined,
  ["a.mjs", "b.mjs", "tests/c.mjs"],
  ["a.mjs", "b.mjs"]
);

