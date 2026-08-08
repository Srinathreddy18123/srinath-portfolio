/* ==========================================================================
   MAIN APPLICATION LOGIC
   Handles sticky navigation, mobile menu, theme toggle, modals & scroll observer
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Navigation Bar & Active Link Observer
  const header = document.querySelector('.site-header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    let currentSectionId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });

  // 2. Mobile Navigation Menu Toggle
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const navMenu = document.getElementById('navMenu');

  if (mobileBtn && navMenu) {
    mobileBtn.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const icon = mobileBtn.querySelector('i');
      if (icon) {
        icon.classList.toggle('bi-list');
        icon.classList.toggle('bi-x-lg');
      }
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }

  // 3. Theme Toggle (Dark/Light Mode)
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const savedTheme = localStorage.getItem('srinath_theme') || 'dark';

  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('srinath_theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeToggleBtn) return;
    const icon = themeToggleBtn.querySelector('i');
    if (icon) {
      icon.className = theme === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-stars-fill';
    }
  }

  // 4. Scroll Reveal Observer
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, observerOptions);

  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  revealElements.forEach(el => revealObserver.observe(el));

  // 5. Expandable Case Study & Certificate Modal System
  const modalOverlay = document.getElementById('projectModalOverlay');
  const modalTitle = document.getElementById('modalProjectTitle');
  const modalContent = document.getElementById('modalProjectContent');
  const modalCloseBtn = document.getElementById('modalCloseBtn');

  const modalDetails = {
    'blood-donation': {
      title: 'Blood Donation and Management System — Expandable Case Study',
      content: `
        <div style="color: var(--text-secondary); line-height: 1.7; font-size: 0.95rem;">
          
          <div style="margin-bottom: 1.25rem;">
            <h4 style="color: var(--accent-spring); font-size: 1.05rem; margin-bottom: 0.35rem;">1. Project Overview</h4>
            <p>A full-stack web application designed to manage donors, blood inventory, and blood request workflows cleanly and reliably.</p>
          </div>

          <div style="margin-bottom: 1.25rem;">
            <h4 style="color: var(--accent-spring); font-size: 1.05rem; margin-bottom: 0.35rem;">2. Problem Being Addressed</h4>
            <p>Streamlining donor registration, real-time blood group search, and handling urgent blood requests efficiently without manual paperwork errors.</p>
          </div>

          <div style="margin-bottom: 1.25rem;">
            <h4 style="color: var(--accent-spring); font-size: 1.05rem; margin-bottom: 0.35rem;">3. Technologies Used</h4>
            <p>Java, Spring Boot, MySQL, HTML, CSS, JavaScript</p>
          </div>

          <div style="margin-bottom: 1.25rem;">
            <h4 style="color: var(--accent-spring); font-size: 1.05rem; margin-bottom: 0.35rem;">4. Layered Architecture Flow</h4>
            <p style="font-family: var(--font-mono); background: rgba(0,0,0,0.3); padding: 0.6rem; border-radius: 6px; border: 1px solid var(--border-subtle);">
              Frontend (HTML+CSS+JS) &rrarr; REST API &rrarr; Spring Boot Controller &rrarr; Service Layer &rrarr; Repository / JPA &rrarr; MySQL
            </p>
          </div>

          <div style="margin-bottom: 1.25rem;">
            <h4 style="color: var(--accent-spring); font-size: 1.05rem; margin-bottom: 0.35rem;">5. Key Features</h4>
            <ul style="padding-left: 1.25rem; list-style: disc;">
              <li>Donor Registration</li>
              <li>Blood Inventory Management</li>
              <li>Blood Request Workflows</li>
              <li>Blood Group Search</li>
              <li>Responsive Web Interface</li>
            </ul>
          </div>

          <div style="margin-bottom: 1.25rem;">
            <h4 style="color: var(--accent-spring); font-size: 1.05rem; margin-bottom: 0.35rem;">6. Database Integration</h4>
            <p>MySQL database integration for persisting donor records, blood availability stock counts, and request logs.</p>
          </div>

          <div style="margin-bottom: 1.25rem;">
            <h4 style="color: var(--accent-spring); font-size: 1.05rem; margin-bottom: 0.35rem;">7. API Development</h4>
            <p>RESTful APIs providing complete CRUD operations for donor profiles and blood inventory management.</p>
          </div>

          <div style="margin-bottom: 1.25rem;">
            <h4 style="color: var(--accent-spring); font-size: 1.05rem; margin-bottom: 0.35rem;">8. Validation & Exception Handling</h4>
            <p>Input validation for donor details and exception handling for invalid requests or missing records.</p>
          </div>

          <div style="margin-bottom: 1.25rem;">
            <h4 style="color: var(--accent-spring); font-size: 1.05rem; margin-bottom: 0.35rem;">9. API Testing</h4>
            <p>Thorough REST API testing using Postman to verify HTTP response codes and JSON data payloads.</p>
          </div>

          <div style="margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid var(--border-subtle);">
            <h4 style="color: var(--accent-spring); font-size: 1.05rem; margin-bottom: 0.5rem;">10. GitHub Repository</h4>
            <a href="https://github.com/Srinathreddy18123/Blood-Donation-Management-System" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="display: inline-flex; padding: 0.5rem 1rem; font-size: 0.85rem;">
              <i class="bi bi-github"></i> View on GitHub Repository
            </a>
          </div>

        </div>
      `
    },
    'student-management': {
      title: 'Student Management System REST API — Project Details',
      content: `
        <div style="color: var(--text-secondary); line-height: 1.7; font-size: 0.95rem;">
          <p style="margin-bottom: 1rem;"><strong style="color: var(--accent-spring);">Description:</strong> A REST API application for managing student records with complete CRUD functionality.</p>
          <h4 style="color: var(--accent-java); font-size: 1rem; margin-bottom: 0.5rem;">Key Features & Architecture:</h4>
          <ul style="padding-left: 1.25rem; margin-bottom: 1rem; list-style: disc;">
            <li>Create student records</li>
            <li>Read student records</li>
            <li>Update student records</li>
            <li>Delete student records</li>
            <li>MySQL database integration</li>
            <li>Layered architecture (Controller &rrarr; Service &rrarr; Repository)</li>
            <li>Exception handling</li>
            <li>API testing with Postman</li>
          </ul>
          <p><strong>Technologies:</strong> Java, Spring Boot, MySQL</p>
        </div>
      `
    },
    'cert-prompt': {
      title: 'Prompt Engineering (AI) Certificate — LetsUpgrade',
      content: `
        <div style="text-align: center;">
          <img src="assets/certificates/prompt_engineering_certificate.png" alt="Prompt Engineering Certificate" style="width: 100%; max-height: 480px; object-fit: contain; border-radius: 8px; border: 1px solid var(--border-subtle); margin-bottom: 1.25rem;" />
          <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
            <a href="assets/certificates/prompt_engineering_certificate.pdf" target="_blank" class="btn btn-primary">
              <i class="bi bi-file-earmark-pdf-fill"></i> Download Original Certificate PDF
            </a>
            <a href="https://www.letsupgrade.in/verify" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
              <i class="bi bi-patch-check"></i> Verify on LetsUpgrade (ID: LUEPEMAR126289)
            </a>
          </div>
        </div>
      `
    },
    'cert-js': {
      title: 'JavaScript Bootcamp Certificate — LetsUpgrade',
      content: `
        <div style="text-align: center;">
          <img src="assets/certificates/javascript_bootcamp_certificate.png" alt="JavaScript Bootcamp Certificate" style="width: 100%; max-height: 480px; object-fit: contain; border-radius: 8px; border: 1px solid var(--border-subtle); margin-bottom: 1.25rem;" />
          <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
            <a href="assets/certificates/javascript_bootcamp_certificate.pdf" target="_blank" class="btn btn-primary">
              <i class="bi bi-file-earmark-pdf-fill"></i> Download Original Certificate PDF
            </a>
            <a href="https://www.letsupgrade.in/verify" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
              <i class="bi bi-patch-check"></i> Verify on LetsUpgrade (ID: LUEJSJAN126143)
            </a>
          </div>
        </div>
      `
    }
  };

  const modalTriggerBtns = document.querySelectorAll('[data-modal-target]');
  modalTriggerBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.modalTarget;
      const data = modalDetails[targetId];
      if (data && modalOverlay) {
        modalTitle.textContent = data.title;
        modalContent.innerHTML = data.content;
        modalOverlay.classList.add('active');
      }
    });
  });

  if (modalCloseBtn && modalOverlay) {
    modalCloseBtn.addEventListener('click', () => {
      modalOverlay.classList.remove('active');
    });

    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
      }
    });
  }

  // 6. Contact Form Handler & Toast
  const contactForm = document.getElementById('portfolioContactForm');
  const toast = document.getElementById('toastNotification');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="bi bi-hourglass-split"></i> Sending...';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        contactForm.reset();

        showToast('Message sent successfully! Thank you for getting in touch.');
      }, 800);
    });
  }

  function showToast(msg) {
    if (!toast) return;
    toast.querySelector('.toast-msg').textContent = msg;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 3500);
  }
});
