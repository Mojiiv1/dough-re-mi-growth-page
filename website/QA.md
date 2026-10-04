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
