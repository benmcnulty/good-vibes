import { cpSync, lstatSync, mkdirSync, realpathSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = realpathSync(join(dirname(fileURLToPath(import.meta.url)), '..'));
const dist = join(root, 'dist');
// The only deletion target is this repository's generated dist directory.
let redirected = false;
try {
  redirected = lstatSync(dist).isSymbolicLink();
} catch (error) {
  if (error.code !== 'ENOENT') throw error;
}
if (dirname(dist) !== root || redirected) {
  throw new Error('Refusing to replace a redirected build directory');
}

switch (process.argv[2]) {
  case 'clean':
    rmSync(dist, { recursive: true, force: true });
    mkdirSync(dist, { recursive: true });
    break;
  case 'copy':
    cpSync(join(root, 'src'), dist, { recursive: true });
    break;
  default:
    throw new Error('Expected clean or copy');
}
