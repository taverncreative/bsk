// Bumps `container mx-auto px-4` -> `container mx-auto px-4 sm:px-6 lg:px-8`
// across all .tsx files under app/ and components/.
// Idempotent: skips files that already have the responsive padding.

import { readFileSync, writeFileSync } from 'fs';
import { execSync } from 'child_process';

const files = execSync(
  `grep -rl "container mx-auto px-4" --include="*.tsx" app components`,
  { encoding: 'utf8' }
)
  .split('\n')
  .filter(Boolean);

let touched = 0;
let skipped = 0;
for (const f of files) {
  const src = readFileSync(f, 'utf8');
  // Already has the responsive padding? skip.
  if (/container mx-auto px-4 sm:px-6/.test(src)) {
    skipped++;
    continue;
  }
  const next = src.replace(
    /container mx-auto px-4(?!\s*sm:px-6)/g,
    'container mx-auto px-4 sm:px-6 lg:px-8'
  );
  if (next !== src) {
    writeFileSync(f, next, 'utf8');
    touched++;
  }
}
console.log(`patched ${touched} files, ${skipped} already responsive`);
