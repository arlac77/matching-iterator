/**
 * Match entries against glob pattern.
 * @param {Iterator<string|Object>} entries input
 * @param {string[]|string} patterns filter to apply
 * @param {Object} options
 * @param {string|Function} options.name name of the name attribute
 * @param {boolean} options.caseSensitive defaults to true
 * @return {Iterator<string>} filtered entries
 */
export function* matcher(entries, patterns, options = {}) {
  if (
    patterns === undefined ||
    (Array.isArray(patterns) &&
      (patterns.length === 0 || patterns[0].length === 0)) ||
    patterns.length === 0
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
    (Array.isArray(patterns) &&
      (patterns.length === 0 || patterns[0].length === 0)) ||
    patterns.length === 0
  ) {
    yield* entries;
    return;
  }

  const regex = compile(
    Array.isArray(patterns) ? patterns : [patterns],
    options
  );

  //console.log(regex);

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
    const c = input[i];

    switch (c) {
      case "*":
        if (input.substring(i, i + 3) === "**/") {
          output += "((?:[^/]*(?:/|$))*)";
          i += 2;
        } else {
          output += ".*";
        }
        break;
      case ".":
        output += "\\" + c;
        break;
      default:
        output += c;
    }
  }
  return output;
}

/**
 * @see https://stackoverflow.com/questions/869809/combine-regexp
 * @param patterns
 * @param options
 * @returns
 */
export function compile(patterns, options) {
  const parts = [];

  let j = "";
  let begin = "^";
  let end = "$";

  for (const pattern of patterns) {
    if (pattern[0] === "!") {
      begin = "^(";
      end = ")$";
      j = ")(?=";

      parts.push("((?!" + compileSimple(pattern.substring(1)) + ").)*");
    } else {
      parts.push(
        parts.length ? "|" + compileSimple(pattern) : compileSimple(pattern)
      );
    }
  }

  return new RegExp(
    begin + parts.join(j) + end,
    options.caseSensitive === undefined || options.caseSensitive ? "ms" : "ims"
  );
}
