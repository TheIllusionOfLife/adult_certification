## 2025-02-13 - [Blind Trust in LocalStorage]
**Vulnerability:** `GlobalProgressStorage` was parsing and returning `localStorage` data without any validation.
**Learning:** Client-side storage is user-controllable and potentially malicious. Assuming data integrity can lead to runtime errors or undefined behavior.
**Prevention:** Implement strict schema validation (using `isValid` type guards) for all data loaded from untrusted sources like `localStorage` before using it.
