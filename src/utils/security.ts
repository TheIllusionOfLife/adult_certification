/**
 * Simple obfuscation for local storage data.
 * This is NOT strong encryption, but prevents casual tampering and plaintext viewing.
 */

// A simple key for XOR cipher to prevent trivial Base64 decoding.
const XOR_KEY = "L2A-SEC-v1";

function xor(bytes: Uint8Array): Uint8Array {
    const result = new Uint8Array(bytes.length);
    for (let i = 0; i < bytes.length; i++) {
        result[i] = bytes[i] ^ XOR_KEY.charCodeAt(i % XOR_KEY.length);
    }
    return result;
}

/**
 * Encodes a string to Base64 using TextEncoder for better performance with UTF-8 content.
 * Applies a simple XOR cipher before encoding to obscure the data.
 */
export function encodeData(data: string): string {
    if (!data) return data;
    const bytes = new TextEncoder().encode(data);
    const encrypted = xor(bytes);

    const CHUNK_SIZE = 0x8000; // 32KB chunk size to avoid stack overflow
    const binaryChunks: string[] = [];
    for (let i = 0; i < encrypted.length; i += CHUNK_SIZE) {
        binaryChunks.push(String.fromCharCode(...encrypted.subarray(i, i + CHUNK_SIZE)));
    }
    return 'v1:' + btoa(binaryChunks.join(''));
}

/**
 * Decodes a Base64 string using TextDecoder for better performance.
 * Handles both legacy Base64 strings and new v1 encrypted strings.
 * Falls back to the original string if decoding fails or if it looks like JSON (plaintext).
 */
export function decodeData(encoded: string): string {
    if (!encoded) return encoded;

    // If it starts with { it's definitely plaintext JSON
    if (encoded.trim().startsWith('{')) {
        return encoded;
    }

    try {
        const isV1 = encoded.startsWith('v1:');
        const payload = isV1 ? encoded.slice(3) : encoded;

        const binaryString = atob(payload);
        const bytes = Uint8Array.from(binaryString, c => c.charCodeAt(0));

        const decrypted = isV1 ? xor(bytes) : bytes;

        return new TextDecoder('utf-8', { fatal: true }).decode(decrypted);
    } catch {
        // Not a valid base64 string or invalid UTF-8, return as is
        return encoded;
    }
}
