---
"vue-ecosphere": patch
---

Plugin install no longer emits `setColors()`/`setFonts()` deprecation warnings.
The plugin now applies default colors and fonts via new internal helpers
(`applyColors` / `applyFonts`) instead of routing through the deprecated public
APIs. The deprecated `setColors` and `setFonts` exports continue to warn when
called directly by consumer code.
