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
      ? 'text-yellow-500 font-semibold'
      : 'text-white hover:text-yellow-300 transition-colors';
  }

  return `
    <nav class="bg-teal-900 shadow-lg sticky top-0 z-50">
      <div class="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">

        <!-- Logo + School Name -->
        <a href="index.html" class="flex items-center gap-3">
          <img src="https://ananthamurthyacademy.org/images/logo_03.jpg"
               alt="Ananthamurthy International School Logo"
               class="h-10 w-auto rounded" />
          <div>
            <div class="text-white font-bold text-sm leading-tight">Ananthamurthy</div>
            <div class="text-yellow-300 text-xs leading-tight">International School</div>
          </div>
        </a>

        <!-- Desktop Navigation Links -->
        <div class="hidden md:flex items-center gap-6 text-sm">
          <a href="index.html"      class="${activeClass('index.html')}">Home</a>
          <a href="about.html"      class="${activeClass('about.html')}">About</a>
          <a href="academics.html"  class="${activeClass('academics.html')}">Academics</a>
          <a href="programs.html"   class="${activeClass('programs.html')}">Programs</a>
          <a href="faculty.html"    class="${activeClass('faculty.html')}">Faculty</a>
          <a href="facilities.html" class="${activeClass('facilities.html')}">Facilities</a>
          <a href="gallery.html"    class="${activeClass('gallery.html')}">Gallery</a>
          <a href="contact.html"    class="${activeClass('contact.html')}">Contact</a>
          <a href="admissions.html"
             class="bg-yellow-500 hover:bg-yellow-400 text-teal-900 font-bold px-4 py-2 rounded-full text-sm transition-colors">
            Apply Now
          </a>
        </div>

        <!-- Mobile Hamburger Button -->
        <button id="hamburger" class="md:hidden text-white focus:outline-none" aria-label="Open menu">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
      </div>

      <!-- Mobile Menu (hidden by default) -->
      <div id="mobile-menu" class="hidden md:hidden bg-teal-800 px-4 pb-4 flex flex-col gap-3 text-sm">
        <a href="index.html"      class="text-white hover:text-yellow-300 py-1">Home</a>
        <a href="about.html"      class="text-white hover:text-yellow-300 py-1">About</a>
        <a href="academics.html"  class="text-white hover:text-yellow-300 py-1">Academics</a>
        <a href="programs.html"   class="text-white hover:text-yellow-300 py-1">Programs</a>
        <a href="faculty.html"    class="text-white hover:text-yellow-300 py-1">Faculty</a>
        <a href="facilities.html" class="text-white hover:text-yellow-300 py-1">Facilities</a>
        <a href="gallery.html"    class="text-white hover:text-yellow-300 py-1">Gallery</a>
        <a href="contact.html"    class="text-white hover:text-yellow-300 py-1">Contact</a>
        <a href="admissions.html" class="bg-yellow-500 text-teal-900 font-bold px-4 py-2 rounded-full text-center">Apply Now</a>
      </div>
    </nav>
  `;
}

// ============================================================
// FOOTER HTML
// ============================================================
function getFooterHTML() {
  return `
    <footer class="bg-teal-900 text-white mt-16">
      <div class="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">

        <!-- Column 1: Brand -->
        <div>
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-teal-900 font-bold text-lg">A</div>
            <div>
              <div class="font-bold text-sm">Ananthamurthy International School</div>
              <div class="text-yellow-300 text-xs">Wings &amp; Roots</div>
            </div>
          </div>
          <p class="text-teal-200 text-sm leading-relaxed">
            A Cambridge-affiliated school blending 21st-century education with Kerala's rich cultural heritage.
          </p>
        </div>

        <!-- Column 2: Quick Links -->
        <div>
          <h4 class="font-semibold text-yellow-400 mb-3 text-sm uppercase tracking-wide">Quick Links</h4>
          <ul class="space-y-2 text-sm text-teal-200">
            <li><a href="admissions.html" class="hover:text-yellow-300 transition-colors">Admissions</a></li>
            <li><a href="academics.html"  class="hover:text-yellow-300 transition-colors">Academics</a></li>
            <li><a href="programs.html"   class="hover:text-yellow-300 transition-colors">Programs</a></li>
            <li><a href="faculty.html"    class="hover:text-yellow-300 transition-colors">Faculty</a></li>
            <li><a href="contact.html"    class="hover:text-yellow-300 transition-colors">Contact Us</a></li>
          </ul>
        </div>

        <!-- Column 3: Contact -->
        <div>
          <h4 class="font-semibold text-yellow-400 mb-3 text-sm uppercase tracking-wide">Contact</h4>
          <ul class="space-y-2 text-sm text-teal-200">
            <li class="flex gap-2">
              <span>📍</span>
              <span>SNRA No. A-4, Surya Nagar, Near Central Polytechnic, Vattiyoorkavu, Thiruvananthapuram 695 013</span>
            </li>
            <li class="flex gap-2">
              <span>📞</span>
              <a href="tel:+914712366166" class="hover:text-yellow-300">+91 471 236 6166</a>
            </li>
            <li class="flex gap-2">
              <span>📞</span>
              <a href="tel:+919605080597" class="hover:text-yellow-300">+91 9605 080 597</a>
            </li>
            <li class="flex gap-2">
              <span>✉️</span>
              <a href="mailto:principal@ananthamurthyacademy.org" class="hover:text-yellow-300">principal@ananthamurthyacademy.org</a>
            </li>
            <li class="flex gap-2">
              <span>🕐</span>
              <span>Mon–Fri, 9 AM – 4 PM</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="border-t border-teal-800 py-4 text-center text-xs text-teal-400">
        © ${new Date().getFullYear()} Ananthamurthy International School. All rights reserved.
        &nbsp;·&nbsp; Cambridge International Affiliated School since 2021.
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
      if (menu) menu.classList.toggle('hidden');
    }
  });
});
