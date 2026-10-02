import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const utils = fileURLToPath(new URL('../../src/utils.js', import.meta.url));
const script = `
  const fs = require('node:fs');
  const vm = require('node:vm');
  const context = { window: {}, console };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(process.argv[1], 'utf8'), context);
  console.log(JSON.stringify([
    context.window.VibeUtils.formatDate('2025-01-03'),
    context.window.VibeUtils.formatDate('2025-01-03', { timeZone: 'America/New_York' }),
    context.window.VibeUtils.formatDate('2025-01-03T00:00:00Z', { timeZone: 'UTC' })
  ]));
`;

for (const zone of ['UTC', 'America/New_York', 'Pacific/Auckland']) {
  test(`calendar dates are stable in ${zone}, with explicit timezone override preserved`, () => {
    const child = spawnSync(process.execPath, ['--input-type=commonjs', '-e', script, utils], {
      encoding: 'utf8',
      env: { ...process.env, TZ: zone },
      timeout: 5000
    });
    assert.equal(child.status, 0, child.stderr);
    assert.deepEqual(JSON.parse(child.stdout), [
      'January 3, 2025',
      'January 2, 2025',
      'January 3, 2025'
    ]);
  });
}
