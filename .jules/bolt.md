## 2024-02-18 - Stage Data Monolith
**Learning:** The entire game content (all 10 stages) was being bundled into the main entry point, delaying TTI. This architecture doesn't scale as more content is added.
**Action:** Use dynamic imports for content-heavy modules that are not needed immediately at startup.
