import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getLang, setLang, t, _resetLangForTesting, STORAGE_KEY } from '../../src/i18n/lang';

describe('i18n/lang', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
    _resetLangForTesting();
  });

  describe('initialization (readStoredLang)', () => {
    it('defaults to "ja" when localStorage is empty', () => {
      // Already cleared in beforeEach
      _resetLangForTesting();
      expect(getLang()).toBe('ja');
    });

    it('loads "en" from localStorage', () => {
      localStorage.setItem(STORAGE_KEY, 'en');
      _resetLangForTesting();
      expect(getLang()).toBe('en');
    });

    it('defaults to "ja" when localStorage throws', () => {
      vi.spyOn(localStorage, 'getItem').mockImplementation(() => {
        throw new Error('Access denied');
      });
      _resetLangForTesting();
      expect(getLang()).toBe('ja');
    });
  });

  describe('runtime language management', () => {
    it('updates language and storage via setLang', () => {
      setLang('en');
      expect(getLang()).toBe('en');
      expect(localStorage.getItem(STORAGE_KEY)).toBe('en');

      setLang('ja');
      expect(getLang()).toBe('ja');
      expect(localStorage.getItem(STORAGE_KEY)).toBe('ja');
    });

    it('handles storage errors in setLang gracefully', () => {
      const originalSetItem = localStorage.setItem;
      const setItemSpy = vi.fn(() => {
        throw new Error('Quota exceeded');
      });

      // Attempt to override setItem
      try {
        Object.defineProperty(localStorage, 'setItem', {
          value: setItemSpy,
          writable: true
        });
      } catch (e) {
        console.warn('Failed to redefine localStorage.setItem', e);
      }

      // Should not throw
      setLang('en');
      expect(getLang()).toBe('en');

      expect(setItemSpy).toHaveBeenCalled();

      // Cleanup
      // @ts-expect-error - restoring original
      localStorage.setItem = originalSetItem;
    });
  });

  describe('t (translation helper)', () => {
    it('returns JP text when lang is "ja"', () => {
      setLang('ja');
      expect(t('こんにちは', 'Hello')).toBe('こんにちは');
    });

    it('returns EN text when lang is "en"', () => {
      setLang('en');
      expect(t('こんにちは', 'Hello')).toBe('Hello');
    });

    it('returns JP text as fallback when EN text is missing in "en" mode', () => {
      setLang('en');
      expect(t('こんにちは')).toBe('こんにちは');
    });

    it('returns JP text when lang is "ja" even if EN is missing', () => {
       setLang('ja');
       expect(t('こんにちは')).toBe('こんにちは');
    });
  });
});
