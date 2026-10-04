# Dough Re Mi — café design system

## 1. Product context
A prospect demo for Tap & Grow Ottawa, limited to `/website/`. The root NFC Growth Page and its shared photographs are protected. Static HTML, CSS and vanilla JavaScript must remain deployable on GitHub Pages.

## 2. User goals
Visitors arriving from NFC, QR, Maps or Instagram should recognize the café, see its food, explore menu categories and find directions immediately. Home → Menu / Our Story / Visit remains the complete architecture.

## 3. Brand atmosphere
Warm, calm and approachable. Cream paper, forest accents and natural food photography carry the identity. Use an editorial split hero with readable text beside an unobscured photograph; stack text before photography on phones. Avoid decorative overlays and giant banners.

## 4. Color semantics
`assets/tokens.css` is the implementation source of truth. Background, surface, raised surface, text, muted text, border, control border, accent, accent-hover, accent-on, focus, success, warning and danger describe roles, not pigments. Dark mode evokes an espresso bar at night: deep natural green canvas (#1b211c), subtle surfaces (#263027 / #303c31), warm cream text (#fff7eb), olive actions (#d0dbb5) and coffee details (#dfbc98). Decorative borders are quiet; control borders remain strong enough to identify interactive elements. Review sections use a distinct forest surface without a numerical rating; the footer is the darkest anchor (#121813). Secondary actions stay dark rather than becoming white boxes. Inverse sections have an explicit background/text pair. Never inherit an accent button's text color from navigation rules. Photographs are never dimmed or inverted.

## 5. Typography
Playfair Display 600 for headings; DM Sans 400 and 700 for body and controls. H1 44–72px, H2 34–48px, H3 24px; body 16px, lead 18px, metadata 14px. Headings use balanced wrapping. Body paragraphs stay within 65ch. Use rem units and allow wrapping at enlarged text sizes.

## 6. Spacing and grid
4, 8, 12, 16, 24, 32, 48, 64 and 96px form the spacing scale. Semantic section, gutter and component tokens consume that scale. Content maximum 1200px; gutters 16px mobile, 32px tablet/desktop. Sections 64px mobile, 96px desktop. Use intrinsic grid tracks with minmax(0,1fr). Borders (1px), focus outlines (3px), image aspect ratios and responsive breakpoints are technical exceptions to the spacing scale.

## 7. Radius and elevation
Controls 8px, buttons 12px, image containers 16px. Pills only for category filters and status tags. Content categories are open image-and-copy columns, not elevated cards. Panels use dividers. Only floating menus/dialogs use elevation.

## 8. Components
Header: brand, navigation, current Light/Dark icon and label, and Menu control. Navigation is a disclosure on smaller screens, not a modal or keyboard trap. Hero: one H1, short description and two actions. Quick information: flat divided row. Category tiles: natural image plus concise copy, no false hover affordance on static articles. Gallery: actual buttons opening a named native modal dialog. Menu: category previews, no fabricated dishes/prices. Footer: stable inverse section. Mobile actions: three equal targets with safe-area padding and reserved document space.

## 9. Interaction states
Appearance has exactly two choices: Light and Dark. Light is the first-visit default regardless of OS appearance. Persist `dough-theme` as `light` or `dark`; normalize any legacy/invalid saved value to `light` before paint. Storage failures also fall back to Light. No OS preference listener. The small popover uses aria-pressed and a checkmark, with sun/moon icons and a current-mode accessible trigger label. Cross-tab storage changes synchronize the explicit choice.

Every button/link has default, hover, visible keyboard focus and active feedback without changing geometry. Pressed states use an outline instead of reducing whole-control opacity; preserve text contrast. Inverse lightbox controls use inverse-hover, never a decorative border token as a text background. Disabled buttons suppress activation and use muted styling; selected filters and theme options use aria-pressed plus a check/underline. Disclosures expose aria-expanded and aria-controls. Copy/share have busy states and a polite status message. Escape closes disclosures and restores focus; leaving a disclosure closes it. Native dialog supplies background inertness and focus containment; close restores the originating thumbnail. URL query state preserves menu filters and browser Back restores them.

## 10. Motion
Enter 200ms, exit 140ms; standard easing cubic-bezier(0.23,1,0.32,1). Only small feedback opacity transitions. No page entrance, continuous motion, image hover zoom or layout animation. Reduced motion removes transitions and smooth scrolling.

## 11. Accessibility
Target WCAG 2.2 AA: text 4.5:1, large text and essential component boundaries 3:1. Use named landmarks, one H1, sequential heading levels, skip link, meaningful image alternatives, 48px controls and 3px focus outlines. No positive tabindex. Sticky areas must not hide focused controls. Support 320px width, 200% zoom, keyboard navigation and touch swipe alternatives. Label the lightbox, announce its counter, support arrows and Escape. No information relies on color alone.

## 12. Responsive behavior
Mobile first. Stack hero, story and visit sections; gallery remains a compact two-column composition. At 768px widen content; at 1024px use full navigation and paired layouts. At short viewport heights remove sticky header/mobile action bar so zoomed visitors retain usable space. Respect all safe-area insets.

## 13. Content voice
Short, welcoming, factual and local. Use “Full menu coming soon” and “Check Google for current hours.” Internal implementation notes belong here, never in the customer page. No rating, review count or decorative rating stars are displayed. Use only verifiable, attributed review excerpts, with a Google source link; never invent testimonials. No rating schema. Preserve original photo context; do not claim ingredients from appearance alone.

## 14. Anti-patterns
No SaaS styling, glassmorphism, large blurry shadows, nested rounded cards, arbitrary spacing, duplicate theme CSS, raw component colors, oversized headings, filler sections, frameworks or invented business details. Do not add dead component rules. Keep HTML readable.

## 15. Production unknowns and safeguards
Owner confirmation is required for phone, exact opening hours, full menu, menu prices, direct Google Review URL, founder/business story, services (catering, custom cakes, ordering), and final production domain. Keep the existing Google Profile CTA until the business supplies the official direct review URL; then update the review CTA destination and label together for the intended NFC/QR review flow. Never derive a review URL. Do not imply catering, custom cakes or ordering. Keep noindex,nofollow on all four pages. Canonical/OG URLs retain the preview path until production. JSON-LD is intentionally absent during the demo. Only after owner confirmation, add Bakery / CafeOrCoffeeShop structured data with verified business name, address, phone, hours, final official website URL and official Instagram. Do not add unverified AggregateRating, coordinates or menu data. Use original repository images, intrinsic dimensions, async decoding, hero priority and lazy loading below the fold.

## Process references
Adapted the separation of intent, tokens and consuming components from [OpenDesign](https://github.com/nexu-io/open-design/tree/main/design-systems), without copying its product interface. Review all applicable [Web Interface Guidelines](https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md); form, media playback, hydration and large-list rules are not applicable to this static site. The supplied brand voice takes precedence over generic title-case guidance.

Dark-mode surface separation is deliberate: warm green canvas, visibly raised controls and high-contrast warm secondary text. Decorative dividers are clearer without turning content into floating cards. Existing authentic café photos illustrate categories; they do not establish ingredients, pricing or availability.

## Review provenance
Two short excerpts were read directly on the supplied Google Maps business profile on 2026-10-04: pat b, “Definitely my new favourite spot.”; jerry buburuz, “Nice café and bakery friendly staff”. Both are excerpts, labeled as such in the UI; punctuation and wording within the excerpts are preserved. Source: https://maps.app.goo.gl/B6CUK27HFEZUmbQdA . No reviewer photos, numerical ratings or counts are reproduced. Review statements are visitor opinions, not menu verification.
