/**
 * Shuffles a copied array using the Fisher-Yates algorithm.
 * @warning Not cryptographically secure. Do not use for security-sensitive operations.
 * @param array The array to shuffle.
 * @returns A new shuffled array.
 */
export function shuffle<T>(array: T[]): T[] {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}
