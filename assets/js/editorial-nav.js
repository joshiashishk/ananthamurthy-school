// ============================================================
//  editorial-nav.js — shared nav + footer for the editorial design
//  Same pattern as components.js (the previous design): every page
//  includes <div id="navbar-placeholder"></div> and
//  <div id="footer-placeholder"></div>, plus this script.
// ============================================================

function getNavbarHTML() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const isCurrent = (page) => currentPage === page ? ' class="current"' : '';

  const items = [
    ['index.html', 'Home'],
    ['about.html', 'Our School'],
    ['academics.html', 'Learning'],
    ['programs.html', 'Programmes'],
    ['gallery.html', 'Stories &amp; Gallery'],
    ['admissions.html', 'Admissions'],
    ['contact.html', 'Contact'],
  ];

  const links = items.map(([href, label]) => `<a href="${href}"${isCurrent(href)}>${label}</a>`).join('\n        ');

  return `
    <div class="wrap nav-inner">
      <a class="brand" href="index.html">
        <img src="assets/images/images/logo_03.jpg" alt="Ananthamurthy International School" />
        <span class="brand-text">Ananthamurthy<small>International School</small></span>
      </a>
      <nav class="links">
        ${links}
      </nav>
      <button id="nav-toggle" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-links">
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path stroke="currentColor" stroke-width="1.8" stroke-linecap="round" d="M4 7h16M4 12h16M4 17h16"/></svg>
      </button>
    </div>
    <div id="mobile-links">
      ${links}
    </div>
  `;
}

function getFooterHTML() {
  return `
    <div class="wrap">
      <div class="foot-grid">
        <div>
          <div class="foot-brand">
            <img src="assets/images/images/logo_03.jpg" alt="" />
            <span class="foot-brand-text">Ananthamurthy International School</span>
          </div>
          <p>A school where values come first, combining cooperative learning with Kerala's language, history, and cultural heritage.</p>
        </div>
        <div>
          <h4>Explore</h4>
          <ul>
            <li><a href="about.html">Our School</a></li>
            <li><a href="academics.html">Learning</a></li>
            <li><a href="programs.html">Programmes</a></li>
            <li><a href="faculty.html">Faculty</a></li>
            <li><a href="facilities.html">Facilities</a></li>
            <li><a href="gallery.html">Stories &amp; Gallery</a></li>
            <li><a href="admissions.html">Admissions</a></li>
            <li><a href="contact.html">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4>Get in Touch</h4>
          <ul>
            <li>SNRA No. A-4, Surya Nagar, near Central Polytechnic, Vattiyoorkavu, Thiruvananthapuram 695 013</li>
            <li><a href="tel:+914712366166">+91 471 236 6166</a> &middot; <a href="tel:+919605080597">+91 9605 080 597</a></li>
            <li><a href="mailto:principal@ananthamurthyacademy.org">principal@ananthamurthyacademy.org</a></li>
            <li>Monday&ndash;Friday, 9:00 AM&ndash;4:00 PM &middot; Sat &amp; Sun closed</li>
          </ul>
        </div>
      </div>
      <div class="foot-bottom">
        <span>&copy; ${new Date().getFullYear()} Ananthamurthy International School</span>
      </div>
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  const navEl = document.getElementById('navbar-placeholder');
  const footEl = document.getElementById('footer-placeholder');
  if (navEl) navEl.innerHTML = getNavbarHTML();
  if (footEl) footEl.innerHTML = getFooterHTML();

  document.addEventListener('click', (e) => {
    if (e.target.closest('#nav-toggle')) {
      const menu = document.getElementById('mobile-links');
      const btn = e.target.closest('#nav-toggle');
      const open = menu.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(open));
    }
  });
});
