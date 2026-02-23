/**
 * Shuffles an array in-place using the Fisher-Yates algorithm.
 *
 * @warning This function uses `Math.random()` and is not cryptographically secure.
 * Do not use for security-sensitive operations.
 *
 * @param array The array to shuffle.
 * @returns The same array, modified.
 */
export function shuffle<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
