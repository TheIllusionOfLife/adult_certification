## 2026-02-18 - Stage Data Monolith
**Learning:** The entire game content (all 10 stages) was being bundled into the main entry point, delaying TTI. This architecture doesn't scale as more content is added.
**Action:** Use dynamic imports for content-heavy modules that are not needed immediately at startup.

## 2026-02-21 - Redundant Object Cloning in Hot Loops
**Learning:** Shallow cloning an object in every iteration of a loop to detect changes (deltas) is inefficient when the change-producing function already returns a new reference on modification.
**Action:** Use the existing object reference for comparison instead of pre-cloning. In immutable patterns, `oldRef !== newRef` is sufficient to detect if any property changed.

## 2026-02-23 - DOM Update Thrashing
**Learning:** Blindly updating `textContent` in frequent update loops (like `updateHUD`) triggers layout/paint recalculations even if the value hasn't changed.
**Action:** Always check if `element.textContent !== newValue` before assignment in render loops. This yielded a ~8x improvement in micro-benchmarks.

## 2026-02-24 - Synchronous LocalStorage I/O Blocking UI
**Learning:** `localStorage.setItem` and associated data encoding (base64) are synchronous operations that can block the main thread, causing frame drops during critical UI updates like stage completion.
**Action:** Refactored `RecordStorage.save` to return a `Promise<void>` and defer the persistence logic using `setTimeout`. This allows the UI to update immediately while data persistence happens in the next event loop tick.
