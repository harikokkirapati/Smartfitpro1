/**
 * SMARTFIT PRO - INTERACTIVE JAVASCRIPT
 * Author: SmartFit Pro Team
 * Features: Mobile Nav, ScrollSpy, Lightbox Modal, Order Modal, Form Validation, Live Pulse Simulation
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. HEADER SCROLL & STICKY STATE
  const header = document.getElementById('header');
  const scrollTopBtn = document.getElementById('scrollTopBtn');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    if (window.scrollY > 400) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });

  // Scroll to top action
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 2. MOBILE DRAWER NAVIGATION
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      mobileDrawer.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (mobileDrawer.classList.contains('active')) {
        icon.className = 'ri-close-line';
      } else {
        icon.className = 'ri-menu-4-line';
      }
    });

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        if (icon) icon.className = 'ri-menu-4-line';
      });
    });
  }

  // 3. SCROLLSPY (ACTIVE NAV LINK HIGHLIGHT)
  const sections = document.querySelectorAll('section[id]');
  const desktopLinks = document.querySelectorAll('.desktop-nav .nav-link');

  function highlightNavOnScroll() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        desktopLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
  window.addEventListener('scroll', highlightNavOnScroll);

  // 4. GALLERY LIGHTBOX MODAL
  const galleryCards = document.querySelectorAll('.gallery-card');
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxBackdrop = document.getElementById('lightboxBackdrop');

  if (lightboxModal && galleryCards.length) {
    galleryCards.forEach(card => {
      card.addEventListener('click', () => {
        const fullSrc = card.getAttribute('data-full');
        const caption = card.getAttribute('data-caption');

        if (fullSrc && lightboxImg) {
          lightboxImg.src = fullSrc;
          lightboxCaption.textContent = caption || 'SmartFit Pro Showcase';
          lightboxModal.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    const closeLightbox = () => {
      lightboxModal.classList.remove('active');
      document.body.style.overflow = '';
    };

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);
  }

  // 5. BUY NOW / ORDER MODAL
  const openOrderBtns = document.querySelectorAll('.open-order-modal');
  const orderModal = document.getElementById('orderModal');
  const orderModalClose = document.getElementById('orderModalClose');
  const orderModalBackdrop = document.getElementById('orderModalBackdrop');
  const orderForm = document.getElementById('orderForm');
  const orderSuccessMsg = document.getElementById('orderSuccessMsg');
  const colorOpts = document.querySelectorAll('.color-opt');

  if (orderModal) {
    openOrderBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        orderModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    const closeOrderModal = () => {
      orderModal.classList.remove('active');
      document.body.style.overflow = '';
      if (orderSuccessMsg) orderSuccessMsg.style.display = 'none';
      if (orderForm) orderForm.style.display = 'flex';
    };

    if (orderModalClose) orderModalClose.addEventListener('click', closeOrderModal);
    if (orderModalBackdrop) orderModalBackdrop.addEventListener('click', closeOrderModal);

    // Color Swatch Selection
    colorOpts.forEach(opt => {
      opt.addEventListener('click', () => {
        colorOpts.forEach(o => o.classList.remove('active'));
        opt.classList.add('active');
      });
    });

    // Handle Order Submission
    if (orderForm) {
      orderForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = orderForm.querySelector('button[type="submit"]');
        submitBtn.innerHTML = '<i class="ri-loader-4-line ri-spin"></i> Processing Order...';
        submitBtn.disabled = true;

        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<i class="ri-check-double-line"></i> Confirm Order';
          orderForm.style.display = 'none';
          if (orderSuccessMsg) {
            orderSuccessMsg.style.display = 'flex';
          }
        }, 1000);
      });
    }
  }

  // 6. CONTACT FORM INTERACTIVE VALIDATION
  const contactForm = document.getElementById('contactForm');
  const formAlertSuccess = document.getElementById('formAlertSuccess');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // Inputs
      const nameInput = document.getElementById('userName');
      const emailInput = document.getElementById('userEmail');
      const phoneInput = document.getElementById('userPhone');
      const msgInput = document.getElementById('userMessage');

      // Error elements
      const nameError = document.getElementById('nameError');
      const emailError = document.getElementById('emailError');
      const phoneError = document.getElementById('phoneError');
      const messageError = document.getElementById('messageError');

      // Reset
      [nameError, emailError, phoneError, messageError].forEach(el => {
        if (el) { el.textContent = ''; el.style.display = 'none'; }
      });

      // Name Validation
      if (!nameInput.value.trim() || nameInput.value.trim().length < 3) {
        isValid = false;
        nameError.textContent = 'Please enter your full name (at least 3 characters).';
        nameError.style.display = 'block';
      }

      // Email Validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
        isValid = false;
        emailError.textContent = 'Please enter a valid email address.';
        emailError.style.display = 'block';
      }

      // Phone Validation
      const phoneClean = phoneInput.value.replace(/[^0-9]/g, '');
      if (!phoneClean || phoneClean.length < 10) {
        isValid = false;
        phoneError.textContent = 'Please enter a valid 10-digit mobile number.';
        phoneError.style.display = 'block';
      }

      // Message Validation
      if (!msgInput.value.trim() || msgInput.value.trim().length < 10) {
        isValid = false;
        messageError.textContent = 'Please enter a message (at least 10 characters).';
        messageError.style.display = 'block';
      }

      if (isValid) {
        const submitBtn = document.getElementById('submitBtn');
        const origText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="ri-loader-4-line ri-spin"></i> Sending message...';
        submitBtn.disabled = true;

        setTimeout(() => {
          submitBtn.innerHTML = origText;
          submitBtn.disabled = false;
          contactForm.reset();
          if (formAlertSuccess) {
            formAlertSuccess.style.display = 'flex';
            setTimeout(() => {
              formAlertSuccess.style.display = 'none';
            }, 6000);
          }
        }, 1200);
      }
    });
  }

  // 7. REALISTIC BIOMETRIC SIMULATION (LIVE BPM FLUCTUATION)
  const bpmElem = document.getElementById('liveBpm');
  if (bpmElem) {
    setInterval(() => {
      const variation = Math.floor(Math.random() * 5) - 2; // -2 to +2
      let currentBpm = parseInt(bpmElem.textContent, 10) || 74;
      let newBpm = currentBpm + variation;
      if (newBpm < 70) newBpm = 72;
      if (newBpm > 82) newBpm = 78;
      bpmElem.textContent = newBpm;
    }, 2800);
  }

  // Escape key to close modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (lightboxModal && lightboxModal.classList.contains('active')) {
        lightboxModal.classList.remove('active');
        document.body.style.overflow = '';
      }
      if (orderModal && orderModal.classList.contains('active')) {
        orderModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    }
  });
});

