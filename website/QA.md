# Website QA — 2026-10-03

Scope: only `/website/`. Baseline commit: `4a4f765`.

## Browser checks
- Headless Microsoft Edge via Playwright; four pages × 320, 375, 430, 768, 1024, 1440 CSS pixels × light/dark = 48 passing layout cases.
- No horizontal overflow, broken images, duplicate H1s or undersized tested button/quick-action targets.
- axe-core 4.10.3: zero WCAG A/AA violations in all 48 cases; open theme panel and gallery dialog also had zero violations. Automated checks do not establish full WCAG conformance.
- Inspected desktop/mobile screenshots in light/dark. Original repository photos retain natural colors; removed a duplicate gallery composition in favor of the existing guest-with-coffee photo.
- Enter/Space selection, Tab/Shift+Tab, Escape, theme focus restoration, outside click, navigation disclosure and skip link checked.
- Light/Dark persistence, System live OS changes, initial theme with storage unavailable and theme-color synchronization checked.
- Native lightbox: named dialog, next/previous arrows, synthetic touch swipe, Escape, focus restoration and Tab containment checked. Background is inert through showModal().
- Filters: selection, URL query, reload and browser Back checked.
- Reduced motion disables smooth scrolling. No image zoom or entrance animations remain.
- 640×400 CSS viewport reflow (equivalent layout viewport of 1280×800 at 200% zoom) and 200% root text enlargement pass on all four pages. Native browser-menu 200% zoom was not directly exercised; physical iOS safe-area behavior and assistive-technology testing remain manual QA.

## Contrast
Representative light/dark token ratios: primary text/background 12.92/15.73; muted text/surface 6.39/8.91; primary button text/background 9.22/9.06; control borders/surface 3.64/4.62. Inverse sections use a dedicated light focus token after the original light-theme focus ring measured only 2.25 against the dark section.

## Content, links and safeguards
- All local links, stylesheets, scripts and image paths resolve.
- Supplied Maps URL returns HTTP 200 and resolves to Dough Re Mi - Bakery & Cafe. Supplied Instagram URL returns HTTP 200; availability of public profile contents can depend on Instagram login/access restrictions.
- Unique titles, descriptions, canonical and OG fields exist on all pages; all retain noindex,nofollow.
- No phone, exact hours, prices, founder claims, rating schema or unverified services added.
- Hero fetch priority, lazy below-fold images, intrinsic dimensions, async decoding, font preconnects and swap retained. Fonts reduced to three required family/weight combinations.
- JavaScript syntax, Git whitespace check and out-of-scope diff checked before committing.

## Review process
Reviewed all applicable current Web Interface Guidelines from https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md. Forms, hydration, large datasets, media playback and destructive mutations are not present. Business-specific voice overrides generic capitalization preferences. DESIGN.md records the system; tokens.css owns semantic values; components consume them.
