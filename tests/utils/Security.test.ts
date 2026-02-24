
import { describe, it, expect } from 'bun:test';
import { encodeData, decodeData } from '../../src/utils/security';

describe('Security Utilities', () => {
    it('should encode and decode ASCII strings', () => {
        const input = 'Hello World';
        const encoded = encodeData(input);
        expect(encoded).not.toBe(btoa(input)); // Should use obfuscation
        const decoded = decodeData(encoded);
        expect(decoded).toBe(input);
    });

    it('should decode legacy Base64 encoded strings', () => {
        const input = 'Legacy Test';
        // Manually encode as base64 (simulating old format)
        const bytes = new TextEncoder().encode(input);
        const binary = String.fromCharCode(...bytes);
        const legacyEncoded = btoa(binary);

        const decoded = decodeData(legacyEncoded);
        expect(decoded).toBe(input);
    });

    it('should encode and decode Unicode strings (emojis)', () => {
        const input = 'Hello World 🌍';
        const encoded = encodeData(input);
        // Base64 of UTF-8 bytes for 'Hello World 🌍'
        // '🌍' is F0 9F 8C 8D (4 bytes)
        // btoa expects binary string where each char is a byte.
        // So length of binary string will be 11 + 1 + 4 = 16 chars.
        // encoded length will be ceil(16 * 4 / 3) = 24 chars (padded).
        expect(encoded.length).toBeGreaterThan(0);
        const decoded = decodeData(encoded);
        expect(decoded).toBe(input);
    });

    it('should handle large strings without stack overflow', () => {
        const size = 100000; // 100KB
        const input = 'a'.repeat(size);
        const encoded = encodeData(input);
        expect(encoded.length).toBeGreaterThan(size);
        const decoded = decodeData(encoded);
        expect(decoded).toBe(input);
    });

    it('should handle large strings with unicode without stack overflow', () => {
        const size = 50000; // 50K chars
        const input = '🌍'.repeat(size);
        // Each emoji is 4 bytes. Total bytes = 200KB.
        const encoded = encodeData(input);
        expect(encoded.length).toBeGreaterThan(size);
        const decoded = decodeData(encoded);
        expect(decoded).toBe(input);
    });

    it('should handle empty string', () => {
        expect(encodeData('')).toBe('');
        expect(decodeData('')).toBe('');
    });

    it('decodeData should handle plaintext JSON fallback', () => {
        const json = '{"foo":"bar"}';
        expect(decodeData(json)).toBe(json);
    });

    it('decodeData should return original string if invalid base64', () => {
        const invalid = 'Not a base64 string &%#';
        expect(decodeData(invalid)).toBe(invalid);
    });
});
