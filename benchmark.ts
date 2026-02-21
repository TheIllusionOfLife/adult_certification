
import { GlobalProgressStorage } from './src/storage/GlobalProgressStorage';

// Mock localStorage if not available (for node environment)
if (typeof localStorage === 'undefined') {
    const storage: Record<string, string> = {};
    (global as any).localStorage = {
        getItem: (key: string) => storage[key] || null,
        setItem: (key: string, value: string) => { storage[key] = value; },
        removeItem: (key: string) => { delete storage[key]; },
        clear: () => { for (const key in storage) delete storage[key]; }
    };
}

// Populate storage with some data to simulate a real scenario
const data = {
    stageRanks: { 1: 'S', 2: 'A', 3: 'B' },
    keySkillsCollected: ['skill1', 'skill2'],
    completedStages: [1, 2, 3]
};
// Encode it as the real code does (base64)
const encoded = btoa(JSON.stringify(data));
localStorage.setItem('license_to_adult_global_progress', encoded);

console.log('Starting benchmark...');

const start = performance.now();
const ITERATIONS = 10000;

for (let i = 0; i < ITERATIONS; i++) {
    new GlobalProgressStorage();
}

const end = performance.now();
console.log(`Time taken for ${ITERATIONS} instantiations: ${(end - start).toFixed(2)}ms`);
console.log(`Average time per instantiation: ${((end - start) / ITERATIONS).toFixed(4)}ms`);
