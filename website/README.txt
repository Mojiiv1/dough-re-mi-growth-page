Dough Re Mi website preview

Live preview path:
https://mojiiv1.github.io/dough-re-mi-growth-page/website/

This preview is intentionally noindex and reuses the existing Dough Re Mi image assets already stored in the repository root.

Included:
- responsive Home / Menu / Our Story / Visit pages
- Light / Dark theme selector
- accessible mobile navigation
- sticky mobile quick actions
- gallery dialog with next/previous, keyboard arrows and swipe support
- menu category filters with URL and browser Back support
- copy address and share actions
- reduced-motion support
- semantic landmarks, visible focus states, skip links
- no invented phone number, hours, menu prices or founder story

This /website/ preview does not change the existing Growth Page at the repository root.

Design system: DESIGN.md describes intent; assets/tokens.css defines semantic values; assets/styles.css consumes them.
QA evidence and limitations: QA.md.

Production information required from the business:
- Exact opening hours.
- Full menu, prices and any dietary/availability claims.
- Direct Google Review URL for the future NFC/QR review flow. Keep the existing Google Profile CTA until supplied; update its label and destination together.
- Founder/business story and services (catering, custom cakes, ordering).
- Final production domain.

Keep noindex,nofollow until an explicitly approved production launch. Ratings and counts are omitted; only add genuine attributed testimonials from verified sources. After owner confirmation, implement Bakery / CafeOrCoffeeShop JSON-LD with verified name, address, phone, hours, official website and Instagram. Do not invent ratings, geo coordinates or menu data.

Demo handoff and owner-confirmation checklist: DEMO-READINESS.md.

Editing the demo menu
---------------------
- Open `website/assets/menu-data.js`; it is the single menu data source.
- Each category and item has English and French text beside its sample price.
- Keep the “sample / fictif” labels until the business has approved every item and price.
- The menu is display-only. Do not add ordering, delivery, payment or checkout links.

Replacing images
----------------
- This preview uses only the supplied files in `/assets/`.
- Keep the same path or update the relevant HTML `src`, preserve meaningful alt text, and use only imagery the business owns or has licensed.

The English/French choice and Light/Dark choice are both manual and persist locally. Opening hours remain pending owner confirmation. The supplied phone number is +1 613 747 0707.
