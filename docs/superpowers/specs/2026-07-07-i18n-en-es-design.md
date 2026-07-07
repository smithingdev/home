# smithing.dev — en/es language detection

**Date:** 2026-07-07 · **Status:** approved

## Goal

Show the site in Spanish for Spanish-language browsers, English otherwise, with a
manual `eng / spa` override in the nav. Static host (adapter-static / GitHub Pages),
so everything is client-side.

## Approach

Inline dictionary + Svelte 5 runes state. No dependencies, no URL changes.
(Rejected: i18n libraries — overkill for one page; `/es/` routes — URL/redirect
complexity on a static host, only worth it if ES SEO ever matters.)

## Design

- `src/lib/i18n.svelte.ts`: reactive `locale: 'en' | 'es'` plus an `en`/`es`
  messages object covering every user-facing string (nav, hero, section heads,
  project descriptions, years note, six machine labels, machine aria-label,
  send-word copy, elsewhere label, page title + meta description).
- Detection at hydration, in order: `localStorage('lang')` → `navigator.language`
  starts with `es` → `'en'`. Prerendered HTML stays English (crawlers see English).
- Toggle: small mono `eng / spa` at the end of the nav links; active language
  highlighted; heat-fast/cool-slow hover like other links; choice persisted to
  localStorage.
- `<html lang>`, `<title>`, and meta description stay in sync with the locale.
- Not translated: name, email, hosts, tag lists (`laravel · livewire · tailwind`,
  `desktop · open source · mit`), "GitHub" button, footer.
- Spanish copy drafted lowercase in the site's voice (voseo), owner can rewrite
  lines afterwards.

## Known trade-off

Spanish content is not in the prerendered HTML, so it is not indexed. Accepted.
