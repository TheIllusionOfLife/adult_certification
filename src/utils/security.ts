/**
 * Simple obfuscation for local storage data.
 * This is NOT strong encryption, but prevents casual tampering and plaintext viewing.
 */

/**
 * Encodes a string to Base64 using TextEncoder for better performance with UTF-8 content.
 */
export function encodeData(data: string): string {
    const bytes = new TextEncoder().encode(data);
    const CHUNK_SIZE = 0x8000; // 32KB chunk size to avoid stack overflow
    let binary = '';
    for (let i = 0; i < bytes.length; i += CHUNK_SIZE) {
        binary += String.fromCharCode(...bytes.subarray(i, i + CHUNK_SIZE));
    }
    return btoa(binary);
}

/**
 * Decodes a Base64 string using TextDecoder for better performance.
 * Falls back to the original string if decoding fails or if it looks like JSON (plaintext).
 */
export function decodeData(encoded: string): string {
    if (!encoded) return encoded;

    // If it starts with { it's definitely plaintext JSON
    if (encoded.trim().startsWith('{')) {
        return encoded;
    }

    try {
        const binaryString = atob(encoded);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return new TextDecoder('utf-8', { fatal: true }).decode(bytes);
    } catch {
        // Not a valid base64 string or invalid UTF-8, return as is
        return encoded;
    }
}
