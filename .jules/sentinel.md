## 2025-05-22 - Insecure Storage of Game Progress

**Vulnerability:** Game progress and records were stored in `localStorage` as plaintext JSON, making them easily viewable and editable by users via browser developer tools.

**Learning:** While client-side integrity is not critical for this game, storing sensitive or progress-related data in plaintext is a weak practice. Simple encoding like Base64 provides a basic layer of obfuscation that prevents casual tampering.

**Prevention:** Always use at least basic encoding or obfuscation for data stored in `localStorage` that represents user progress or achievements. Ensure backward compatibility by checking for legacy formats (e.g., checking for leading `{` for JSON) during the transition.
