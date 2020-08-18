/**
 * Match entries against glob pattern
 * @param {Iterator<string|Object>} entries
 * @param {string[]|string} patterns
 * @param {Object} options
 * @param {string|Function} options.name
 * @param {boolean} options.caseSensitive defaults to true
 * @return {Iterator<string>} filtered entries
 */
export function* matcher(entries, patterns, options = {}) {
  if (
    patterns === undefined ||
    (Array.isArray(patterns) && patterns.length === 0)
  ) {
    yield* entries;
    return;
  }

  const regex = compile(
    Array.isArray(patterns) ? patterns : [patterns],
    options
  );

  if (options.name) {
    const name = options.name;
    for (const entry of entries) {
      if (entry[name].match(regex)) {
        yield entry;
      }
    }
  } else {
    for (const entry of entries) {
      if (entry.match(regex)) {
        yield entry;
      }
    }
  }
}

export async function* asyncMatcher(entries, patterns, options = {}) {
  if (
    patterns === undefined ||
    (Array.isArray(patterns) && patterns.length === 0)
  ) {
    yield* entries;
    return;
  }

  const regex = compile(
    Array.isArray(patterns) ? patterns : [patterns],
    options
  );

  if (options.name) {
    const name = options.name;
    for await (const entry of entries) {
      if (entry[name].match(regex)) {
        yield entry;
      }
    }
  } else {
    for await (const entry of entries) {
      if (entry.match(regex)) {
        yield entry;
      }
    }
  }
}

function compileSimple(input) {
  let output = "";

  for (let i = 0; i < input.length; i++) {
    const s = input[i];
    switch (s) {
      case ".":
        output += "\\.";
        break;
      case "*":
        output += ".*";
        if (input[i + 1] === "*") {
          i += input[i + 2] === "/" ? 2 : 1;
        }
        break;
      case "/":
        output += "\\/";
        break;
      default:
        output += s;
    }
  }
  return output;
}

export function compile(patterns, options) {
  const parts = [];

  for (const pattern of patterns) {
    if (pattern[0] === "!") {
      parts.push("((?!" + compileSimple(pattern.substring(1)) + ").)*");
    } else {
      parts.push(
        parts.length ? "|" + compileSimple(pattern) : compileSimple(pattern)
      );
    }
  }

  return new RegExp(
    "^" + parts.join("") + "$",
    options.caseSensitive === undefined || options.caseSensitive
      ? undefined
      : "i"
  );
}
