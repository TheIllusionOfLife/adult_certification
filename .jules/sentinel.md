## 2025-05-14 - Direct DOM Manipulation via innerHTML

**Vulnerability:** Direct assignment of strings containing HTML tags to `innerHTML` in `src/ui/render.ts`. This pattern is inherently risky and can lead to Cross-Site Scripting (XSS) if any part of the string contains untrusted user input or if the translation source is compromised.

**Learning:** Replacing `innerHTML` with `document.createElement`, `textContent`, and `appendChild` (or `append`) eliminates the risk of script injection. A small helper function can keep the code concise when replacing complex template literals.

**Prevention:** Avoid `innerHTML` whenever possible. Use `textContent` for dynamic text and programmatic DOM construction for structure. If `innerHTML` must be used for complex trusted content, ensure the data is sanitized or fully controlled.

## 2025-05-22 - Insecure Storage of Game Progress

**Vulnerability:** Game progress and records were stored in `localStorage` as plaintext JSON, making them easily viewable and editable by users via browser developer tools.

**Learning:** While client-side integrity is not critical for this game, storing sensitive or progress-related data in plaintext is a weak practice. Simple encoding like Base64 provides a basic layer of obfuscation that prevents casual tampering.

**Prevention:** Always use at least basic encoding or obfuscation for data stored in `localStorage` that represents user progress or achievements. Ensure backward compatibility by checking for legacy formats (e.g., checking for leading `{` for JSON) during the transition.

## 2025-02-13 - [Blind Trust in LocalStorage]
**Vulnerability:** `GlobalProgressStorage` was parsing and returning `localStorage` data without any validation.
**Learning:** Client-side storage is user-controllable and potentially malicious. Assuming data integrity can lead to runtime errors or undefined behavior.
**Prevention:** Implement strict schema validation (using `isValid` type guards) for all data loaded from untrusted sources like `localStorage` before using it.

## 2025-02-18 - [XSS in Feedback Rendering]
**Vulnerability:** Game engine returned pre-formatted HTML string for feedback (concatenated with ADAM commentary), which was then inserted into the DOM using `innerHTML`. This allowed potential XSS if the feedback source was compromised or contained malicious content.
**Learning:** Separation of concerns is critical for security. The logic layer (engine) should return raw data, and the presentation layer (renderer) should handle formatting and safe DOM insertion.
**Prevention:** Always use `textContent` or safe DOM creation methods (e.g., `document.createElement`) instead of `innerHTML` for dynamic content. Refactor logic to return structured data rather than HTML strings.
