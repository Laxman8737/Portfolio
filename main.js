/* Ram Laxman Shastry - Portfolio main script */
(function () {
  "use strict";

  const select = (el, all = false) => {
    el = el.trim();
    return all ? [...document.querySelectorAll(el)] : document.querySelector(el);
  };
  const on = (type, el, listener, all = false) => {
    const target = select(el, all);
    if (!target) return;
    all ? target.forEach(e => e.addEventListener(type, listener)) : target.addEventListener(type, listener);
  };

  /* Scroll to a section, accounting for nothing fixed on top (sidebar is on the side) */
  const scrollto = (el) => {
    const target = select(el);
    if (target) window.scrollTo({ top: target.offsetTop, behavior: "smooth" });
  };

  /* Highlight nav link of the section in view */
  const navlinks = select("#navbar .scrollto", true);
  const navbarlinksActive = () => {
    const position = window.scrollY + 200;
    navlinks.forEach(link => {
      if (!link.hash) return;
      const section = select(link.hash);
      if (!section) return;
      if (position >= section.offsetTop && position <= section.offsetTop + section.offsetHeight) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  };
  window.addEventListener("load", navbarlinksActive);
  document.addEventListener("scroll", navbarlinksActive);

  /* Back to top button */
  const backtotop = select(".back-to-top");
  if (backtotop) {
    const toggleBacktotop = () => backtotop.classList.toggle("active", window.scrollY > 100);
    window.addEventListener("load", toggleBacktotop);
    document.addEventListener("scroll", toggleBacktotop);
  }

  /* Mobile nav toggle */
  on("click", ".mobile-nav-toggle", function () {
    select("body").classList.toggle("mobile-nav-active");
    this.classList.toggle("bi-list");
    this.classList.toggle("bi-x");
  });

  /* Smooth scroll for in-page links (also closes mobile nav) */
  on("click", ".scrollto", function (e) {
    if (select(this.hash)) {
      e.preventDefault();
      const body = select("body");
      if (body.classList.contains("mobile-nav-active")) {
        body.classList.remove("mobile-nav-active");
        const nt = select(".mobile-nav-toggle");
        nt.classList.add("bi-list");
        nt.classList.remove("bi-x");
      }
      scrollto(this.hash);
    }
  }, true);

  /* Typing effect in hero */
  window.addEventListener("load", () => {
    const typed = select(".typed");
    if (typed && window.Typed) {
      let items = typed.getAttribute("data-typed-items").split(",").map(s => s.trim());
      new Typed(".typed", { strings: items, loop: true, typeSpeed: 80, backSpeed: 40, backDelay: 1800 });
    } else if (typed) {
      typed.textContent = typed.getAttribute("data-typed-items").split(",")[0];
    }
  });

  /* Animation on scroll */
  window.addEventListener("load", () => {
    if (window.AOS) {
      AOS.init({ duration: 800, easing: "ease-in-out", once: true, mirror: false });
    }
  });

  /* Contact form: opens the visitor's email app with the message pre-filled */
  const form = select("#contactForm");
  if (form) {
    const note = select("#formNote");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      note.classList.remove("ok");
      if (!form.checkValidity()) {
        note.textContent = "Please fill in all fields with a valid email address.";
        return;
      }
      const d = new FormData(form);
      const body = d.get("message") + "\n\nFrom: " + d.get("name") + " (" + d.get("email") + ")";
      window.location.href = "mailto:lakshman15407@gmail.com?subject=" + encodeURIComponent(d.get("subject")) + "&body=" + encodeURIComponent(body);
      note.classList.add("ok");
      note.textContent = "Opening your email app...";
    });
  }
})();
