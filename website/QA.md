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
