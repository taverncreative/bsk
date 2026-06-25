/**
 * Words that take 'an' despite starting with a consonant letter.
 * Phonetic-vowel acronyms / initialisms whose spoken first sound is a vowel.
 * Each entry is the lowercased form of the first word in the phrase passed
 * to indefiniteArticle.
 */
const ORTHO_VOWEL_OVERRIDES = new Set<string>(['seo']);

/**
 * Acronyms / initialisms that should be rendered in uppercase even when the
 * upstream string was lowercased. Keys are lowercase; values are the desired
 * display form. Used by displayCase().
 */
const ACRONYM_UPPERCASE: Record<string, string> = {
  seo: 'SEO',
  ai: 'AI',
};

/**
 * Returns the indefinite article ('a' or 'an') appropriate for the given word
 * or phrase. Checks the first word only.
 *
 * Vowel-letter check + small override list. Sufficient for our industry and
 * service names. Does not handle 'hour' / 'university' style edge cases
 * because they don't appear in the dataset.
 *
 * Pass the LOWERCASE form (the override list matches lowercase).
 */
export function indefiniteArticle(phrase: string): string {
  const firstWord = phrase.trim().split(/\s+/)[0]?.toLowerCase() ?? '';
  if (ORTHO_VOWEL_OVERRIDES.has(firstWord)) return 'an';
  return /^[aeiou]/.test(firstWord) ? 'an' : 'a';
}

function singulariseWord(word: string): string {
  if (word.length < 2) return word;
  if (!/s$/i.test(word)) return word; // not plural — leave alone
  if (/ies$/i.test(word)) {
    // companies → company, ladies → lady
    const replaced = word[word.length - 3] === word[word.length - 3].toUpperCase() ? 'Y' : 'y';
    return word.slice(0, -3) + replaced;
  }
  if (/(sses|xes|zes|ches|shes)$/i.test(word)) {
    // brushes → brush, boxes → box
    return word.slice(0, -2);
  }
  return word.slice(0, -1);
}

/**
 * Convert a plural noun phrase to its singular form.
 *
 * Rules, applied in order:
 *   1. 'X and Y' / 'X & Y' compounds are singularised on both sides.
 *   2. Otherwise only the LAST word is singularised, preserving any leading
 *      qualifier(s) (e.g. 'cleaning companies' → 'cleaning company').
 *   3. Word-level: -ies → -y; -sses/-xes/-zes/-ches/-shes → strip -es;
 *      single -s → strip -s; anything else unchanged.
 */
export function singular(phrase: string): string {
  if (!phrase) return phrase;

  const compoundRegex = /\s+(and|&)\s+/i;
  if (compoundRegex.test(phrase)) {
    const parts = phrase.split(compoundRegex);
    return parts.map((p, i) => (i % 2 === 0 ? singular(p) : p)).join(' ');
  }

  const tokens = phrase.split(/(\s+)/);
  for (let i = tokens.length - 1; i >= 0; i--) {
    if (tokens[i].trim().length > 0) {
      tokens[i] = singulariseWord(tokens[i]);
      break;
    }
  }
  return tokens.join('');
}

/**
 * Re-case a lowercased phrase so known acronyms render in uppercase.
 * Display-only: do not pass the result to indefiniteArticle (it expects the
 * lowercase form so its override list matches).
 */
export function displayCase(phrase: string): string {
  return phrase
    .split(/(\s+)/)
    .map((token) => ACRONYM_UPPERCASE[token.toLowerCase()] ?? token)
    .join('');
}
