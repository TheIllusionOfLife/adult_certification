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

## 2025-05-23 - Path Traversal in Developer Scripts

**Vulnerability:** Input validation for file paths was missing in `scripts/simulate_stage.mjs`, allowing paths to resolve outside the project root via `--meta` and `--stageFile` arguments.

**Learning:** Using `path.resolve(process.cwd(), filePath)` alone is not sufficient to prevent path traversal. It correctly makes the path absolute, but does not restrict it to the intended directory.

**Prevention:** After resolving a path, use `path.relative(root, resolvedPath)` to verify that the target is within the `root` directory. Ensure the relative path doesn't start with `..` and is not absolute (important for Windows cross-drive resolution).

## 2025-05-24 - Insecure Data Obfuscation

**Vulnerability:** Game save data was stored using plain Base64 encoding in `src/utils/security.ts`, allowing trivial decoding and tampering of local storage data.

**Learning:** Client-side data storage without server validation requires stronger obfuscation to deter casual cheating. Simple encoding like Base64 is insufficient as it is easily recognizable and reversible.

**Prevention:** Implemented a custom obfuscation layer (XOR cipher with versioning `v1:`) on top of Base64 to increase the effort required for tampering, while maintaining backward compatibility for existing saves.

## 2025-05-24 - Missing Content Security Policy (CSP)

**Vulnerability:** The application lacked a Content Security Policy (CSP), leaving it vulnerable to Cross-Site Scripting (XSS) and data injection attacks. Inline styles and event handlers (`ontouchstart`) further weakened the security posture.

**Learning:** Implementing a strict CSP (`script-src 'self'`) significantly reduces the attack surface by preventing the execution of unauthorized scripts. Refactoring inline styles to CSS classes not only improves maintainability but also prepares the codebase for a stricter `style-src` policy in the future.

**Prevention:** Always include a CSP meta tag in the HTML head. Avoid inline event handlers and styles. Use `script-src 'self'` as a baseline and only relax directives (like `style-src 'unsafe-inline'`) when absolutely necessary for legacy support or specific library requirements.
