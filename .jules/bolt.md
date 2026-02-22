## 2026-02-18 - Stage Data Monolith
**Learning:** The entire game content (all 10 stages) was being bundled into the main entry point, delaying TTI. This architecture doesn't scale as more content is added.
**Action:** Use dynamic imports for content-heavy modules that are not needed immediately at startup.

## 2026-02-18 - Unnecessary Array Copy in Shuffle
**Learning:** The `shuffle` utility was performing a redundant array copy `[...array]`, causing unnecessary allocations and GC pressure for large arrays.
**Action:** Implemented in-place Fisher-Yates shuffle. Note that this changes the function to be a mutator, but it is acceptable as it is currently unused or used where immutability is not critical.
