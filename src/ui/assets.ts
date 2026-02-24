
// Vite glob import for assets
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error `import.meta.glob` is a Vite-specific feature not recognized by the TS compiler by default.
export const images: Record<string, { default: string }> = (() => {
    try {
        return import.meta.glob('../assets/*.{png,jpg,jpeg,webp}', { eager: true });
    } catch {
        // Fallback for environments where import.meta.glob is not available (e.g. Bun tests)
        return {};
    }
})();

export function getAssetPath(relativePath: string): string | undefined {
    const assetPath = `../assets/${relativePath}`;
    const mod = images[assetPath] as { default: string } | undefined;
    return mod?.default;
}
