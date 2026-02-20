/**
 * Simple obfuscation for local storage data.
 * This is NOT strong encryption, but prevents casual tampering and plaintext viewing.
 */

/**
 * Encodes a string to Base64.
 */
export function encodeData(data: string): string {
    return btoa(encodeURIComponent(data).replace(/%([0-9A-F]{2})/g,
        (_match, p1) => String.fromCharCode(parseInt(p1, 16))
    ));
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
        const binaryString = atob(encoded);
        const percentEncoded = Array.from(binaryString, char =>
            '%' + ('00' + char.charCodeAt(0).toString(16)).slice(-2)
        ).join('');
        return decodeURIComponent(percentEncoded);
    } catch {
        // Not a valid base64 string, return as is
        return encoded;
    }
}
