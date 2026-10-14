// ============================================================
// TAP & GROW — BUSINESS CONFIG
// Change only this section when duplicating for another client.
// ============================================================
const business = {
  name: "Dough Re Mi - Bakery & Cafe",
  phoneDisplay: "+1 613-747-0707",
  phoneLink: "tel:+16137470707",

  // The user supplied this Google Maps link for the review button.
  // Replace with the business's direct Google Review link later if available.
  googleReview: "https://maps.app.goo.gl/B6CUK27HFEZUmbQdA",

  instagram: "https://www.instagram.com/doughremi.ottawa/?hl=en",
  maps: "https://maps.app.goo.gl/B6CUK27HFEZUmbQdA",

  // Shareable demo website and display-only sample menu.
  website: "https://mojiiv1.github.io/dough-re-mi-growth-page/website/",
  menu: "https://mojiiv1.github.io/dough-re-mi-growth-page/website/menu/"
};

const links = [
  {
    title: "Leave a Google Review",
    subtitle: "Share your experience",
    icon: "★",
    href: business.googleReview,
    className: "primary"
  },
  {
    title: "Instagram",
    subtitle: "@doughremi.ottawa",
    icon: "◎",
    href: business.instagram
  },
  {
    title: "Call Us",
    subtitle: business.phoneDisplay,
    icon: "☎",
    href: business.phoneLink
  },
  {
    title: "Visit Us",
    subtitle: "Get directions",
    icon: "📍",
    href: business.maps
  },
  {
    title: "Preview Our Menu",
    subtitle: "Sample items and prices",
    icon: "🍴",
    href: business.menu
  },
  {
    title: "View Demo Website",
    subtitle: "Preview the new bakery website",
    icon: "🌐",
    href: business.website
  }
];

const linksContainer = document.getElementById("links");

links.forEach((item) => {
  const a = document.createElement("a");
  a.className = `link-card ${item.className || ""}`;
  a.href = item.href;

  if (!item.href.startsWith("tel:")) {
    a.target = "_blank";
    a.rel = "noopener noreferrer";
  }

  a.innerHTML = `
    <span class="icon-wrap" aria-hidden="true">${item.icon}</span>
    <span class="link-copy">
      <div class="link-title">${item.title}</div>
      <div class="link-sub">${item.subtitle}</div>
    </span>
    <span class="arrow" aria-hidden="true">›</span>
  `;

  linksContainer.appendChild(a);
});

document.getElementById("instagramSeeMore").href = business.instagram;
