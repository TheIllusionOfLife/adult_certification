export type Lang = 'ja' | 'en';
const STORAGE_KEY = 'ac_lang';

function readStoredLang(): Lang {
    try { return (localStorage.getItem(STORAGE_KEY) as Lang) || 'ja'; }
    catch { return 'ja'; }
}

let currentLang: Lang = readStoredLang();

export function getLang(): Lang { return currentLang; }
export function setLang(lang: Lang): void {
    currentLang = lang;
    try { localStorage.setItem(STORAGE_KEY, lang); } catch { /* SSR / test */ }
}

/** Resolve bilingual field: returns EN when active, JP as fallback. */
export function t(jp: string, en?: string): string {
    if (currentLang === 'en' && en) return en;
    return jp;
}
