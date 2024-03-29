/**
 * Match entries against glob pattern.
 * @param {Iterable<string|Object>} entries input
 * @param {string[]|string|undefined} patterns filter to apply
 * @param {Object} options
 * @param {string} [options.name] name of the name attribute
 * @param {boolean} [options.caseSensitive] defaults to true
 * @return {Iterable<string|Object>} filtered entries
 */
export function* matcher(entries, patterns, options = {}) {
  if (patterns === undefined || patterns.length === 0 || (
    Array.isArray(patterns) && patterns[0].length === 0
  )) {
    yield* entries;
    return;
  }

  const regex = compile(patterns, options);

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

/**
 * Match entries against glob pattern.
 * @param {Iterable<string|Object>} entries input
 * @param {string[]|string|undefined} patterns filter to apply
 * @param {Object} options
 * @param {string} [options.name] name of the name attribute
 * @param {boolean} [options.caseSensitive] defaults to true
 * @return {AsyncGenerator<string|Object>} filtered entries
 */
export async function* asyncMatcher(entries, patterns, options = {}) {
  if (patterns === undefined || patterns.length === 0 || (
    Array.isArray(patterns) && patterns[0].length === 0
  )) {
    yield* entries;
    return;
  }

  const regex = compile(patterns, options);

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
 * @param {string[]|string} patterns
 * @param {Object} options
 * @returns globs copiled into regex
 */
export function compile(patterns, options) {
  const parts = [];

  let j = "";
  let begin = "^";
  let end = "$";

  for (const pattern of Array.isArray(patterns) ? patterns : [patterns]) {
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
