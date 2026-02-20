## 2025-05-14 - Direct DOM Manipulation via innerHTML

**Vulnerability:** Direct assignment of strings containing HTML tags to `innerHTML` in `src/ui/render.ts`. This pattern is inherently risky and can lead to Cross-Site Scripting (XSS) if any part of the string contains untrusted user input or if the translation source is compromised.

**Learning:** Replacing `innerHTML` with `document.createElement`, `textContent`, and `appendChild` (or `append`) eliminates the risk of script injection. A small helper function can keep the code concise when replacing complex template literals.

**Prevention:** Avoid `innerHTML` whenever possible. Use `textContent` for dynamic text and programmatic DOM construction for structure. If `innerHTML` must be used for complex trusted content, ensure the data is sanitized or fully controlled.
