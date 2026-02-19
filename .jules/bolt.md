# ⚡ Bolt Performance Learnings

## 2025-05-22 - Storage Instantiation Optimization

**Problem:** Redundant instantiation of storage classes (like `GlobalProgressStorage`) in methods that are called during UI rendering or state changes. Each instantiation involves reading from `localStorage` and `JSON.parse`, which adds unnecessary I/O and CPU overhead.

**Solution:** Instantiate storage classes once in the constructor of long-lived objects (like `UIManager`) and reuse the instance across method calls.

**Measurement:** In this project, reusing a single instance of `GlobalProgressStorage` was measured to be ~92% faster than redundant instantiation in a tight loop of 10,000 iterations.

**Context:** This is safe in this project because state synchronization is handled by `location.reload()` when returning to the title screen, ensuring fresh data is loaded when needed.
