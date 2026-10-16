// ============================================================
//  components.js — Shared Navbar and Footer
//
//  Every page on the site includes:
//    <div id="navbar-placeholder"></div>   ← at the top
//    <div id="footer-placeholder"></div>   ← at the bottom
//    <script src="assets/js/components.js"></script>
//
//  This file injects the same navbar and footer into ALL pages.
//  To update a nav link or footer detail, change it HERE once —
//  it updates everywhere automatically.
// ============================================================

// ============================================================
// NAVBAR HTML
// ============================================================
function getNavbarHTML() {
  // Detect which page is active so we can highlight the current link
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  function activeClass(page) {
    return currentPage === page
      ? 'text-amber-300 font-semibold'
      : 'text-white hover:text-amber-200 transition-colors';
  }

  return `
    <nav class="site-nav sticky top-0 z-50">
      <div class="site-nav-inner">

        <a href="index.html" class="site-brand">
          <img src="assets/images/images/logo_03.jpg"
               alt="Ananthamurthy International School Logo"
               class="site-brand-logo" />
          <div class="site-brand-name">
            <span>Ananthamurthy</span>
            <span>International School</span>
          </div>
        </a>

        <div class="site-nav-links">
          <a href="index.html" class="${activeClass('index.html')}">Home</a>
          <a href="about.html" class="${activeClass('about.html')}">Our School</a>
          <a href="academics.html" class="${activeClass('academics.html')}">Learning</a>
          <a href="programs.html" class="${activeClass('programs.html')}">Programmes</a>
          <a href="gallery.html" class="${activeClass('gallery.html')}">Stories &amp; Gallery</a>
          <a href="contact.html" class="${activeClass('contact.html')}">Contact</a>
          <a href="contact.html" class="site-nav-cta">Visit the school</a>
        </div>

        <button id="hamburger" class="site-nav-toggle" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-menu">
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
            <path stroke="currentColor" stroke-width="1.8" stroke-linecap="round" d="M4 7h16M4 12h16M4 17h16"/>
          </svg>
        </button>
      </div>

      <div id="mobile-menu" class="site-mobile-menu" hidden>
        <a href="index.html">Home</a>
        <a href="about.html">Our School</a>
        <a href="academics.html">Learning</a>
        <a href="programs.html">Programmes</a>
        <a href="gallery.html">Stories &amp; Gallery</a>
        <a href="contact.html">Contact</a>
        <a href="contact.html">Visit the school</a>
      </div>
    </nav>
  `;
}

// ============================================================
// FOOTER HTML
// ============================================================
function getFooterHTML() {
  return `
    <footer class="site-footer">
      <div class="site-footer-inner">

        <!-- Column 1: Brand -->
        <div>
          <div class="site-footer-brand">
            <img src="assets/images/images/logo_03.jpg" alt="" />
            <div>
              <div class="site-footer-title">Ananthamurthy International School</div>
              <div class="site-footer-tagline">Together we learn</div>
            </div>
          </div>
          <p class="site-footer-copy">
            A school combining cooperative learning with Kerala's language, history, and cultural heritage.
          </p>
        </div>

        <!-- Column 2: Quick Links -->
        <div>
          <h4 class="site-footer-heading">Explore</h4>
          <ul class="site-footer-links">
            <li><a href="about.html">Our school</a></li>
            <li><a href="academics.html">Curriculum &amp; learning</a></li>
            <li><a href="programs.html">Student programmes</a></li>
            <li><a href="gallery.html">Stories &amp; gallery</a></li>
            <li><a href="contact.html">Contact us</a></li>
          </ul>
        </div>

        <!-- Column 3: Contact -->
        <div>
          <h4 class="site-footer-heading">Visit</h4>
          <ul class="site-footer-links">
            <li>SNRA No. A-4, Surya Nagar, near Central Polytechnic, Vattiyoorkavu, Thiruvananthapuram 695 013</li>
            <li><a href="tel:+914712366166">+91 471 236 6166</a> · <a href="tel:+919605080597">+91 9605 080 597</a></li>
            <li><a href="mailto:principal@ananthamurthyacademy.org">principal@ananthamurthyacademy.org</a></li>
            <li>Monday–Friday, 9:00 AM–4:00 PM</li>
            <li>Saturday &amp; Sunday: Closed</li>
          </ul>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="site-footer-bottom">
        © ${new Date().getFullYear()} Ananthamurthy International School
      </div>
    </footer>
  `;
}

// ============================================================
// INJECT INTO PAGE + WIRE UP HAMBURGER MENU
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  // Inject navbar and footer
  const navEl  = document.getElementById('navbar-placeholder');
  const footEl = document.getElementById('footer-placeholder');
  if (navEl)  navEl.innerHTML  = getNavbarHTML();
  if (footEl) footEl.innerHTML = getFooterHTML();

  // Wire up the hamburger toggle for mobile
  // We use event delegation because the button is injected dynamically
  document.addEventListener('click', (e) => {
    if (e.target.closest('#hamburger')) {
      const menu = document.getElementById('mobile-menu');
      if (menu) {
        const isOpen = !menu.hidden;
        menu.hidden = isOpen;
        e.target.closest('#hamburger').setAttribute('aria-expanded', String(!isOpen));
      }
    }
  });
});
