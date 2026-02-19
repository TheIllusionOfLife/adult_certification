/**
 * Simple obfuscation for local storage data.
 * This is NOT strong encryption, but prevents casual tampering and plaintext viewing.
 */

/**
 * Encodes a string to Base64.
 */
export function encodeData(data: string): string {
    return btoa(data);
}

/**
 * Decodes a Base64 string.
 * Falls back to the original string if decoding fails or if it looks like JSON (plaintext).
 */
export function decodeData(encoded: string): string {
    if (!encoded) return encoded;

    // If it starts with { it's definitely plaintext JSON
    if (encoded.trim().startsWith('{')) {
        return encoded;
    }

    try {
        return atob(encoded);
    } catch {
        // Not a valid base64 string, return as is
        return encoded;
    }
}
