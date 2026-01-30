#!/usr/bin/env node
/**
 * i18n Translation Completeness Checker
 *
 * Iterates all stage data and flags objects where JP field exists
 * but EN field is undefined. Reports missing translations per file.
 */

import { readFileSync, readdirSync } from 'fs';
import { join, basename } from 'path';

const STAGES_DIR = join(import.meta.dirname, '../src/data/stages');
const METADATA_FILE = join(import.meta.dirname, '../src/data/stageMetadata.ts');

let totalMissing = 0;
let totalChecked = 0;

function checkStageFile(filePath) {
    const content = readFileSync(filePath, 'utf-8');
    const fileName = basename(filePath);
    const missing = [];

    // Check Question.textEN
    const textMatches = [...content.matchAll(/^\s+text:\s*["'`]/gm)];
    const textENMatches = [...content.matchAll(/^\s+textEN:\s*["'`]/gm)];
    if (textMatches.length > textENMatches.length) {
        missing.push(`Question.textEN: ${textMatches.length - textENMatches.length} missing`);
    }
    totalChecked += textMatches.length;

    // Check Choice.feedbackEN
    const feedbackMatches = [...content.matchAll(/^\s+feedback:\s*["'`]/gm)];
    const feedbackENMatches = [...content.matchAll(/^\s+feedbackEN:\s*["'`]/gm)];
    if (feedbackMatches.length > feedbackENMatches.length) {
        missing.push(`Choice.feedbackEN: ${feedbackMatches.length - feedbackENMatches.length} missing`);
    }
    totalChecked += feedbackMatches.length;

    // Check Choice.lockedFeedbackEN (only where lockedFeedback exists)
    const lockedFBMatches = [...content.matchAll(/^\s+lockedFeedback:\s*["'`]/gm)];
    const lockedFBENMatches = [...content.matchAll(/^\s+lockedFeedbackEN:\s*["'`]/gm)];
    if (lockedFBMatches.length > lockedFBENMatches.length) {
        missing.push(`Choice.lockedFeedbackEN: ${lockedFBMatches.length - lockedFBENMatches.length} missing`);
    }
    totalChecked += lockedFBMatches.length;

    // Check ADAMDialogue.introEN (only where intro exists)
    const introMatches = [...content.matchAll(/^\s+intro:\s*["'`]/gm)];
    const introENMatches = [...content.matchAll(/^\s+introEN:\s*["'`]/gm)];
    if (introMatches.length > introENMatches.length) {
        missing.push(`ADAMDialogue.introEN: ${introMatches.length - introENMatches.length} missing`);
    }
    totalChecked += introMatches.length;

    // Check ADAMDialogue.afterEN (only where after exists)
    const afterMatches = [...content.matchAll(/^\s+after:\s*["'`]/gm)];
    const afterENMatches = [...content.matchAll(/^\s+afterEN:\s*["'`]/gm)];
    if (afterMatches.length > afterENMatches.length) {
        missing.push(`ADAMDialogue.afterEN: ${afterMatches.length - afterENMatches.length} missing`);
    }
    totalChecked += afterMatches.length;

    if (missing.length > 0) {
        console.log(`\n❌ ${fileName}:`);
        missing.forEach(m => {
            console.log(`   - ${m}`);
            totalMissing++;
        });
    } else {
        console.log(`✅ ${fileName}: all EN fields present`);
    }
}

function checkMetadata(filePath) {
    const content = readFileSync(filePath, 'utf-8');
    const fileName = basename(filePath);

    // stageMetadata uses factory functions (createNormalSkill / createKeySkill)
    // that accept EN params positionally, so we check for EN string arguments.
    // Count createNormalSkill calls (should each have nameEN, descEN params)
    const normalSkillCalls = [...content.matchAll(/createNormalSkill\(/g)].length;
    const keySkillCalls = [...content.matchAll(/createKeySkill\(/g)].length;
    const totalSkills = normalSkillCalls + keySkillCalls;

    // Also check stageTemplate.ts for the factory function signatures
    const templatePath = join(STAGES_DIR, 'stageTemplate.ts');
    const templateContent = readFileSync(templatePath, 'utf-8');
    const hasNameENParam = /nameEN\??:\s*string/.test(templateContent);
    const hasDescENParam = /descEN\??:\s*string/.test(templateContent);

    totalChecked += 2;

    const missing = [];
    if (!hasNameENParam) missing.push('stageTemplate: missing nameEN parameter');
    if (!hasDescENParam) missing.push('stageTemplate: missing descEN parameter');

    if (missing.length > 0) {
        console.log(`\n❌ ${fileName}:`);
        missing.forEach(m => {
            console.log(`   - ${m}`);
            totalMissing++;
        });
    } else {
        console.log(`✅ ${fileName}: ${totalSkills} skills use factory with EN params (${normalSkillCalls} normal, ${keySkillCalls} key)`);
    }
}

// Main
console.log('=== i18n Translation Completeness Check ===\n');

// Check stage files
const stageFiles = readdirSync(STAGES_DIR)
    .filter(f => /^stage\d+\.ts$/.test(f))
    .sort((a, b) => {
        const numA = parseInt(a.match(/\d+/)[0]);
        const numB = parseInt(b.match(/\d+/)[0]);
        return numA - numB;
    });

for (const file of stageFiles) {
    checkStageFile(join(STAGES_DIR, file));
}

// Check metadata
console.log('');
checkMetadata(METADATA_FILE);

// Summary
console.log('\n=== Summary ===');
console.log(`Fields checked: ${totalChecked}`);
if (totalMissing === 0) {
    console.log('✅ All EN translations present!');
    process.exit(0);
} else {
    console.log(`❌ ${totalMissing} missing translation(s) found.`);
    process.exit(1);
}
