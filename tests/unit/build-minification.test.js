import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const minifier = fileURLToPath(new URL('../../scripts/minify.js', import.meta.url));
function fixture(run) {
  const directory = mkdtempSync(join(tmpdir(), 'good-vibes-build-test-'));
  assert.ok(
    resolve(directory).startsWith(resolve(tmpdir()) + '\\') ||
      resolve(directory).startsWith(resolve(tmpdir()) + '/')
  );
  try {
    mkdirSync(join(directory, 'dist'));
    mkdirSync(join(directory, 'src'));
    run(directory);
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
}

test('build actually minifies CSS under the package ES module runtime', () =>
  fixture((directory) => {
    const css = '/* remove this comment */\n.demo { color: #ffffff; margin: 0px 0px 0px 0px; }\n';
    writeFileSync(join(directory, 'dist/style.css'), css);
    const child = spawnSync(process.execPath, [minifier], {
      cwd: directory,
      encoding: 'utf8',
      timeout: 10000
    });
    assert.equal(child.status, 0, child.stderr);
    const result = readFileSync(join(directory, 'dist/style.css'), 'utf8');
    assert.ok(result.length < css.length);
    assert.ok(!result.includes('remove this comment'));
  }));

test('a broken asset makes the build fail rather than reporting success', () =>
  fixture((directory) => {
    writeFileSync(join(directory, 'dist/broken.js'), 'function { invalid JavaScript');
    const child = spawnSync(process.execPath, [minifier], {
      cwd: directory,
      encoding: 'utf8',
      timeout: 10000
    });
    assert.notEqual(child.status, 0);
    assert.ok(!child.stdout.includes('Build completed successfully'));
  }));
