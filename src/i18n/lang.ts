export type Lang = 'ja' | 'en';
const STORAGE_KEY = 'ac_lang';
let currentLang: Lang = (localStorage.getItem(STORAGE_KEY) as Lang) || 'ja';

export function getLang(): Lang { return currentLang; }
export function setLang(lang: Lang): void {
    currentLang = lang;
    localStorage.setItem(STORAGE_KEY, lang);
}

/** Resolve bilingual field: returns EN when active, JP as fallback. */
export function t(jp: string, en?: string): string {
    if (currentLang === 'en' && en) return en;
    return jp;
}
