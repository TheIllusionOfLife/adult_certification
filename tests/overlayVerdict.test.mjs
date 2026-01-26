import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import ts from 'typescript';

function loadTSModule(relPath) {
  const abs = path.resolve(process.cwd(), relPath);
  const source = fs.readFileSync(abs, 'utf8');
  const out = ts.transpileModule(source, {
    compilerOptions: {
      target: ts.ScriptTarget.ES2022,
      module: ts.ModuleKind.CommonJS,
      strict: true,
      esModuleInterop: true,
      skipLibCheck: true,
    },
    fileName: abs,
  }).outputText;

  const sandbox = {
    module: { exports: {} },
    exports: {},
    require: () => ({}),
    __dirname: path.dirname(abs),
    __filename: abs,
    console,
    process,
  };
  sandbox.exports = sandbox.module.exports;
  vm.createContext(sandbox);
  vm.runInContext(out, sandbox, { filename: abs });
  return sandbox.module.exports;
}

test('getOverlayPresentation prefers explicit choiceVerdict', () => {
  const mod = loadTSModule('src/ui/overlayVerdict.ts');
  assert.equal(typeof mod.getOverlayPresentation, 'function');

  assert.deepEqual(
    mod.getOverlayPresentation({ isTerminated: false, choiceVerdict: 'APPROVED', csDelta: -10 }),
    { title: 'APPROVED', colorVar: 'var(--accent-color)' }
  );

  assert.deepEqual(
    mod.getOverlayPresentation({ isTerminated: false, choiceVerdict: 'WARNING', csDelta: +20 }),
    { title: 'WARNING', colorVar: 'var(--primary-color)' }
  );

  assert.deepEqual(
    mod.getOverlayPresentation({ isTerminated: false, choiceVerdict: 'NEUTRAL', csDelta: -999 }),
    { title: 'RECORDED', colorVar: 'var(--accent-color)' }
  );
});

test('getOverlayPresentation falls back to csDelta sign when verdict is missing', () => {
  const mod = loadTSModule('src/ui/overlayVerdict.ts');

  assert.deepEqual(
    mod.getOverlayPresentation({ isTerminated: false, csDelta: 0 }),
    { title: 'APPROVED', colorVar: 'var(--accent-color)' }
  );

  assert.deepEqual(
    mod.getOverlayPresentation({ isTerminated: false, csDelta: -1 }),
    { title: 'WARNING', colorVar: 'var(--primary-color)' }
  );
});

test('getOverlayPresentation terminates regardless of verdict or csDelta', () => {
  const mod = loadTSModule('src/ui/overlayVerdict.ts');

  assert.deepEqual(
    mod.getOverlayPresentation({ isTerminated: true, choiceVerdict: 'APPROVED', csDelta: 999 }),
    { title: 'TERMINATED', colorVar: 'var(--primary-color)' }
  );
});
