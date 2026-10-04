# Theme revision QA — 2026-10-03

Scope: focused Light/Dark UX revision from baseline `a476e2e`, only `/website/`.

## Executed browser checks
Headless Microsoft Edge through Playwright, with axe-core 4.10.3.

- All four pages × 320, 375, 430, 768, 1024, 1440 CSS pixels × Light/Dark: 48 passing layout cases.
- 96 axe audits (each page with popover closed and open): zero WCAG A/AA violations for wcag2a, wcag2aa, wcag21aa, wcag22aa tags.
- Popover fits the viewport and hit-testing confirms it is above the page; no horizontal scrolling.
- After the final shared trigger-width and coffee-accent specificity refinements, reran Home at all six widths in both themes: 12 layout cases and 24 additional axe audits, all passing.
- Captured and visually reviewed all four pages on desktop/mobile in Light/Dark: header, hero, category tiles, menu filters, quick information/actions, review section, visit surfaces and footer. Existing photography is unchanged, with no image filters.
- Exactly two appearance choices. Light is default even with an emulated dark OS. Changing OS appearance does not change the site.
- Light → Dark → refresh retains Dark; Dark → Light → refresh retains Light. Trigger label/icon and aria-pressed match the choice.
- Legacy `system` and invalid saved values normalize to `light` in both the page and localStorage on reload.
- Unavailable localStorage defaults to Light without errors.
- Enter opens, Space selects; Tab and Shift+Tab traverse options; Escape and selection restore trigger focus; outside click dismisses.
- Reduced motion still disables smooth scrolling. No full-page color animation introduced.
- No JavaScript page errors during the tests.

## Measured final dark-token contrast
| Pair | Ratio |
| --- | ---: |
| Text / canvas | 15.90:1 |
| Muted text / canvas | 8.99:1 |
| Text / surface | 14.45:1 |
| Text / raised surface | 13.02:1 |
| Muted text / raised surface | 7.36:1 |
| Primary button text / olive accent | 9.16:1 |
| Accent navigation / canvas | 10.08:1 |
| Muted footer text / footer | 9.47:1 |
| Muted review text / review surface | 5.66:1 |
| Coffee accent / canvas | 7.63:1 |
| Control border / raised surface | 4.49:1 |
| Control border / review surface | 3.45:1 |
| Focus / raised surface | 9.46:1 |
| Inverse focus / review surface | 7.27:1 |

Low-opacity decorative dividers are not used as the sole boundary for controls. Controls retain a separate higher-contrast border. Light text/CTA tokens remain unchanged and Light-mode axe audits pass. Disabled controls retain native disabled semantics; active/hover/focus states do not change button geometry.

## Cleanup and safeguards
Removed OS appearance queries/listeners, three-state branches, legacy preference dataset, half-circle icon, third option and explanatory sublabels. Remaining `system` occurrences in source concern “design system” or the system-ui font fallback, not theme behavior.

No information architecture, business facts, photo assets, approved fonts or root Growth Page changes. noindex remains. Git whitespace check and JavaScript syntax checked before commit.

Automated audits do not prove full WCAG conformance. This revision did not repeat physical-device, assistive-technology or native browser-menu zoom testing; those remain manual checks from the baseline. Touch-safe spacing and reduced-motion rules were preserved.

# Content polish QA — 2026-10-04

Baseline: b9d74d4. Content/documentation only: Home, Menu, About, DESIGN.md, README.txt and this report. Visit HTML, CSS, tokens, JavaScript and all root files remain unchanged.

Executed for this revision using headless Edge / Playwright and axe-core 4.10.3:
- Four pages × six widths (320, 375, 430, 768, 1024, 1440) × Light/Dark: 48 layout checks passed with no horizontal overflow.
- 96 WCAG A/AA axe audits (popover closed/open): zero violations. Popover geometry and hit-testing confirm no clipping or stacking obstruction.
- Light/Dark switching and refresh persistence, legacy preference migration, default Light under dark OS, storage-denied startup, Enter/Space/Tab/Shift+Tab/Escape, outside dismissal and focus restoration passed.
- Both themes: one H1 and sequential heading hierarchy on each page; working keyboard skip link; mobile navigation open/Escape/focus restoration; lightbox arrows, Tab containment and Escape/focus restoration; category filter selection, reload persistence and All reset.
- Both themes: actual clipboard address copy and share-link fallback passed. Web Share payload dispatch tested with a mock; native OS share sheet was not opened and nothing was sent externally.
- Both themes/all four pages: visible button/CTA/quick-action targets meet 44px minimum, footer-bottom clears the fixed action bar at the bottom of the page, and noindex,nofollow remains present.
- Both themes/all four pages: 200% root text enlargement at 640×400 CSS viewport passed without horizontal overflow. This is text-enlargement/reflow testing, not native browser-menu zoom testing.
- Reduced motion disables smooth scrolling. No JavaScript page errors during the runs.
- All internal links and local asset paths resolve. Existing Maps and Instagram URLs returned HTTP 200; no phone/hours research or substitution performed.
- Captured all pages at 375/1440 in both themes and inspected the changed About mobile headline wrapping. The approved CSS, fonts, image loading attributes and theme behavior were preserved.
- Source/diff review confirms removed customer-facing review counts and approximation qualifiers; no fabricated dishes, prices, phone, hours, services or JSON-LD were added. Production requirements are documented internally.
- Git diff whitespace validation passed. Only intentional website files staged.

Physical-device testing, screen-reader testing and native browser-menu 200% zoom were not performed. Automated axe results are regression evidence, not a declaration of complete WCAG conformance.

# Demo accessibility follow-up — 2026-10-04

Fixed an interaction-state gap: inverse lightbox hover buttons now use a dedicated dark hover surface instead of their lighter border color. Pressed links/buttons keep full opacity and use an outline, preserving text contrast and visible feedback. Approved palettes and layout remain intact.

Executed: 48 four-page/viewport/theme layout checks at 320, 375, 430, 768, 1024 and 1440; 96 closed/open-popover WCAG A/AA axe audits; six additional lightbox hover audits across both themes. All passed with zero automated violations. Tested pressed CTA opacity, theme refresh persistence, legacy migration, OS independence, storage denial, keyboard selection/dismissal, popover clipping/stacking and reduced motion. Inspected a fresh dark-mode browser screenshot. Git whitespace check passed.

Added DEMO-READINESS.md separating presentation checks, owner confirmations and production launch work. This is a prospect demo, not a claim of complete WCAG certification. Real-device, screen-reader and native browser zoom/share-sheet checks remain outstanding; no claim those were performed in this follow-up.

# Dark hierarchy, copy and genuine reviews — 2026-10-04

Removed numerical rating and stars. Added two short attributed Google review excerpts verified directly on the supplied Maps profile; provenance is in DESIGN.md. Public search did not yield usable additional official photography, so existing real café assets remain. Menu copy now explicitly describes category photos as a preview, with a single honest menu-status introduction instead of repeated status labels. No dishes, prices, phone or opening schedule added.

Dark canvas changed to #1b211c, surfaces #263027 / #303c31, cream text #fff7eb, muted text #d6ccbe, olive CTA #d0dbb5 and footer #121813. Surface separation, borders and secondary-text readability were refined, preserving natural photographs and the two-choice theme UX.

Measured dark contrast: primary text/canvas 15.42:1; muted/canvas 10.34:1; text/raised surface 10.88:1; muted/raised surface 7.29:1; primary CTA 10.91:1; muted review text 5.97:1; control border/raised surface 4.92:1; control border/review surface 4.03:1; focus/raised surface 7.34:1. Numerical contrast passes do not substitute for visual hierarchy or complete accessibility evaluation.

Executed: all four pages × six widths × two themes (48 layout checks, 96 axe audits including open popovers); after inserting verified excerpts, Home repeated at all six widths/both themes (12 layout checks, 24 axe audits); six lightbox hover axe audits; pressed CTA opacity checks. Zero violations in those audits. Internal links/assets resolved. Repeated both-theme interaction suite: skip link, headings, navigation, lightbox arrows/focus, filters, actual clipboard copy/share fallback, mocked Web Share payload, touch targets, footer clearance, noindex and 200% text enlargement/reflow. No page errors. Inspected full-page dark desktop screenshot of final review composition. Native share UI, physical devices and screen readers were not tested.

# Focused refinement and change-control audit — 2026-10-04

Baseline/branch: main at 675d4a8, confirmed in history. Initial status was clean. When the additional change-control instructions arrived, implementation was already underway; branch/status/history were then explicitly rechecked. All current modifications belong to this pass, with no unrelated changes overwritten.

Audit findings identified before implementation:
1. Hours guidance asks the visitor to check Google but was not itself a link: linked the same approved profile destination.
2. Standalone review link and mobile brand link had small touch areas: use existing 48px spacing token for minimum height.
3. Theme popover lacked a short-viewport height constraint: add internal scrolling and a viewport cap composed from existing spacing tokens.
4. Repeated “coffee break” filler in category copy: concise factual replacements, preserving categories and menu honesty.
5. Demo readiness documentation did not have a distinct ready-to-demonstrate list: added one without expanding website features.

Executed QA:
- 48 page/theme/width layout cases (four pages, Light/Dark, 320/375/430/768/1024/1440), 96 WCAG A/AA axe checks with closed/open theme panel: passed, zero violations.
- Extra 320×240 viewport check: popover fits vertically; both choices reachable by keyboard; brand/review links at least 48px tall.
- Both-theme regression suite: heading hierarchy, skip link, keyboard mobile navigation, gallery arrows/Tab containment/Escape/focus restoration, category filters/reload, clipboard address copy and share fallback, mocked native-share payload, 44px control targets, footer clearance, noindex and 200% text enlargement/reflow. Passed with no page errors. Theme persistence and reduced motion also passed.
- Internal links/local assets resolve. Dark contrast recomputed: primary text 15.42:1, muted text 10.34:1, primary CTA 10.91:1; no palette changes needed.
- Captured and manually inspected all 16 requested screenshots: Home/Menu/About/Visit at 375/1440, Light/Dark. Compared shared containers/gutters, heading/section spacing, button geometry, image crops, surface contrast and footers. No further visual change justified. Full-page screenshots place fixed bars at the capture viewport position; separate bottom-of-page geometry assertions confirm footer clearance.
- Performance/source review: no JS changes or new listeners, dependencies, network integrations, assets or font weights. Existing 900px JPEG photos are approximately 94–175KB; no optimized alternatives exist in this checkout. Existing 509KB logo retained to respect asset scope. Hero priority, below-fold lazy loading, explicit dimensions and async decoding unchanged. No new asynchronous layout source introduced; a dedicated CLS benchmark was not run.
- Canonical/OG URLs and robots metadata unchanged. No tracking, embeds, forms, widgets, photo downloads or new business facts. Only the changed stylesheet cache key is refreshed; JS/token cache keys retained.

Limits: no physical-device, screen-reader, native share-sheet or native browser-menu zoom testing. Automated results are regression evidence, not complete WCAG certification. Stop condition reached: audited issues fixed and QA passed.
