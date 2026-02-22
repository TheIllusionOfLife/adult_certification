## 2026-02-18 - Stage Data Monolith
**Learning:** The entire game content (all 10 stages) was being bundled into the main entry point, delaying TTI. This architecture doesn't scale as more content is added.
**Action:** Use dynamic imports for content-heavy modules that are not needed immediately at startup.

## 2026-02-21 - Redundant Object Cloning in Hot Loops
**Learning:** Shallow cloning an object in every iteration of a loop to detect changes (deltas) is inefficient when the change-producing function already returns a new reference on modification.
**Action:** Use the existing object reference for comparison instead of pre-cloning. In immutable patterns, `oldRef !== newRef` is sufficient to detect if any property changed.
