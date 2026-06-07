/* ============================================
   PORTFOLIO JAVASCRIPT - NABILLAH NASYWA S
   Interactive Features & Animations
   ============================================ */

'use strict';

/* ---- Particle System ---- */
function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  const colors = ['#8b5cf6', '#06b6d4', '#ec4899', '#a78bfa', '#67e8f9'];
  const particleCount = 40;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');

    const size = Math.random() * 4 + 1;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const left = Math.random() * 100;
    const delay = Math.random() * 15;
    const duration = Math.random() * 15 + 10;

    particle.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      left: ${left}%;
      animation-delay: ${delay}s;
      animation-duration: ${duration}s;
      box-shadow: 0 0 ${size * 3}px ${color};
    `;

    container.appendChild(particle);
  }
}

/* ---- Typing Animation ---- */
function initTypingAnimation() {
  const element = document.getElementById('typedText');
  if (!element) return;

  const phrases = [
    'Web Developer',
    'UI/UX Designer',
    'Front-End Dev',
    'Back-End Dev',
    'Laravel Developer',
    'Problem Solver',
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      element.textContent = currentPhrase.slice(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      element.textContent = currentPhrase.slice(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      typingSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 400;
    }

    setTimeout(type, typingSpeed);
  }

  setTimeout(type, 1000);
}

/* ---- Navbar Scroll Effect ---- */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const navToggle = document.getElementById('navToggle');
  const navLinksContainer = document.getElementById('navLinks');

  // Scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active section detection
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // Mobile toggle
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinksContainer.classList.toggle('open');
  });

  // Close on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinksContainer.classList.remove('open');
    });
  });
}

/* ---- Counter Animation ---- */
function animateCounters() {
  const counters = document.querySelectorAll('.stat-num');

  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 1500;
    const step = target / (duration / 16);
    let current = 0;

    const update = () => {
      current += step;
      if (current < target) {
        counter.textContent = Math.floor(current);
        requestAnimationFrame(update);
      } else {
        counter.textContent = target;
        if (counter.closest('.stat-item:last-child') || target > 1) {
          counter.textContent = target + '+';
        }
      }
    };

    update();
  });
}

/* ---- Scroll Reveal Animations ---- */
function initScrollReveal() {
  const revealElements = document.querySelectorAll(
    '.glass-card, .project-card, .tech-badge, .contact-link, .section-header, .about-card, .info-card'
  );

  revealElements.forEach((el, index) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${(index % 4) * 0.08}s`;
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');

          // Animate skill bars when visible
          const skillFills = entry.target.querySelectorAll('.skill-fill');
          skillFills.forEach(fill => {
            const width = fill.getAttribute('data-width');
            setTimeout(() => {
              fill.style.width = width + '%';
            }, 200);
          });
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  revealElements.forEach(el => observer.observe(el));

  // Hero counter observer
  const heroSection = document.getElementById('home');
  if (heroSection) {
    const counterObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animateCounters();
          counterObserver.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    counterObserver.observe(heroSection);
  }
}

/* ---- Project Filters ---- */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');

        if (filter === 'all' || category === filter) {
          card.classList.remove('hidden');
          card.classList.add('fade-in');
          setTimeout(() => card.classList.remove('fade-in'), 400);
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

/* ---- Contact Form ---- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const successMsg = document.getElementById('formSuccess');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const submitBtn = document.getElementById('submitForm');
    const originalText = submitBtn.querySelector('span').textContent;

    // Loading state
    submitBtn.querySelector('span').textContent = 'Mengirim...';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';

    // Simulate form submission
    setTimeout(() => {
      submitBtn.querySelector('span').textContent = originalText;
      submitBtn.disabled = false;
      submitBtn.style.opacity = '1';

      // Show success message
      if (successMsg) {
        successMsg.style.display = 'block';
        form.reset();

        setTimeout(() => {
          successMsg.style.display = 'none';
        }, 5000);
      }
    }, 1500);
  });

  // Input focus effects
  const inputs = form.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    input.addEventListener('focus', () => {
      input.parentElement.style.transform = 'scale(1.01)';
    });
    input.addEventListener('blur', () => {
      input.parentElement.style.transform = 'scale(1)';
    });
  });
}

/* ---- Smooth Scroll ---- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
}

/* ---- Mouse Parallax for Hero ---- */
function initParallax() {
  const profileCard = document.querySelector('.profile-card');
  const hero = document.querySelector('.hero');

  if (!profileCard || !hero) return;

  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    const rotateX = (y - 0.5) * 10;
    const rotateY = (x - 0.5) * 10;

    profileCard.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
  });

  hero.addEventListener('mouseleave', () => {
    profileCard.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    profileCard.style.transition = 'transform 0.5s ease';
  });

  hero.addEventListener('mouseenter', () => {
    profileCard.style.transition = 'transform 0.1s ease';
  });
}

/* ---- Custom Cursor ---- */
function initCustomCursor() {
  // Only on desktop
  if (window.innerWidth < 768) return;

  const cursor = document.createElement('div');
  const cursorDot = document.createElement('div');

  cursor.style.cssText = `
    position: fixed;
    width: 32px;
    height: 32px;
    border: 2px solid rgba(139, 92, 246, 0.6);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.1s ease, width 0.3s ease, height 0.3s ease, opacity 0.3s ease;
    transform: translate(-50%, -50%);
    mix-blend-mode: screen;
  `;

  cursorDot.style.cssText = `
    position: fixed;
    width: 6px;
    height: 6px;
    background: #8b5cf6;
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%);
    transition: transform 0.05s ease;
  `;

  document.body.appendChild(cursor);
  document.body.appendChild(cursorDot);

  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;
  });

  function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;
    cursor.style.left = `${cursorX}px`;
    cursor.style.top = `${cursorY}px`;
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Hover effects
  document.querySelectorAll('a, button, .tech-badge, .project-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.width = '48px';
      cursor.style.height = '48px';
      cursor.style.borderColor = 'rgba(139, 92, 246, 1)';
      cursor.style.background = 'rgba(139, 92, 246, 0.1)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.width = '32px';
      cursor.style.height = '32px';
      cursor.style.borderColor = 'rgba(139, 92, 246, 0.6)';
      cursor.style.background = 'transparent';
    });
  });

  // Hide default cursor
  document.body.style.cursor = 'none';
}

/* ---- Glitch Effect on Logo ---- */
function initLogoEffect() {
  const logo = document.querySelector('.nav-logo');
  if (!logo) return;

  logo.addEventListener('mouseenter', () => {
    logo.style.animation = 'none';
    setTimeout(() => {
      logo.style.animation = '';
    }, 10);
  });
}

/* ---- Initialize All ---- */
document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initTypingAnimation();
  initNavbar();
  initScrollReveal();
  initProjectFilters();
  initContactForm();
  initSmoothScroll();
  initParallax();
  initCustomCursor();
  initLogoEffect();

  console.log('%c👩‍💻 Portfolio by Nabillah Nasywa S', 'color: #8b5cf6; font-size: 16px; font-weight: bold;');
  console.log('%cBuilt with ❤️ using HTML, CSS & JavaScript', 'color: #06b6d4; font-size: 12px;');
});

/* ---- Performance: Reduce animations on low-end devices ---- */
const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
if (mediaQuery.matches) {
  document.documentElement.style.setProperty('--transition', '0.01s');
  document.documentElement.style.setProperty('--transition-slow', '0.01s');
}
