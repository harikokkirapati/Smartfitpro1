/**
 * SMARTFIT PRO - AUTHENTICATION & LOGIN LOGIC
 * Features: Tab Switcher, Password Toggle, Demo Auto-Fill, Form Validation, Forgot Password Modal
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. TAB SWITCHING (SIGN IN vs REGISTER)
  const tabSignIn = document.getElementById('tabSignIn');
  const tabRegister = document.getElementById('tabRegister');
  const signInForm = document.getElementById('signInForm');
  const registerForm = document.getElementById('registerForm');
  const formTitle = document.getElementById('formTitle');
  const formSubtitle = document.getElementById('formSubtitle');
  const authAlert = document.getElementById('authAlert');

  if (tabSignIn && tabRegister) {
    tabSignIn.addEventListener('click', () => {
      tabSignIn.classList.add('active');
      tabRegister.classList.remove('active');
      signInForm.classList.add('active-form');
      registerForm.classList.remove('active-form');
      formTitle.textContent = 'Welcome Back';
      formSubtitle.textContent = 'Enter your SmartFit credentials to access your dashboard.';
      hideAlert();
    });

    tabRegister.addEventListener('click', () => {
      tabRegister.classList.add('active');
      tabSignIn.classList.remove('active');
      registerForm.classList.add('active-form');
      signInForm.classList.remove('active-form');
      formTitle.textContent = 'Create SmartFit Account';
      formSubtitle.textContent = 'Join the next generation of wearable health and biometric analytics.';
      hideAlert();
    });
  }

  // 2. PASSWORD VISIBILITY TOGGLE
  const togglePassBtns = document.querySelectorAll('.toggle-password-btn');
  togglePassBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const input = btn.previousElementSibling;
      const icon = btn.querySelector('i');
      if (input.type === 'password') {
        input.type = 'text';
        icon.className = 'ri-eye-off-line';
      } else {
        input.type = 'password';
        icon.className = 'ri-eye-line';
      }
    });
  });

  // 3. AUTO-FILL DEMO ACCOUNT
  const fillDemoBtn = document.getElementById('fillDemoBtn');
  if (fillDemoBtn) {
    fillDemoBtn.addEventListener('click', () => {
      const emailInput = document.getElementById('loginEmail');
      const passInput = document.getElementById('loginPassword');
      if (emailInput && passInput) {
        emailInput.value = 'demo@smartfit.com';
        passInput.value = 'SmartFit#2026';
        
        // Highlight inputs briefly
        emailInput.style.borderColor = 'var(--accent-cyan)';
        passInput.style.borderColor = 'var(--accent-cyan)';
        setTimeout(() => {
          emailInput.style.borderColor = '';
          passInput.style.borderColor = '';
        }, 1200);
      }
    });
  }

  // 4. SIGN IN FORM VALIDATION & SUBMISSION
  if (signInForm) {
    signInForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('loginEmail');
      const password = document.getElementById('loginPassword');
      const emailError = document.getElementById('loginEmailError');
      const passError = document.getElementById('loginPasswordError');

      let isValid = true;
      resetErrors([emailError, passError]);

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email.value.trim() || !emailRegex.test(email.value.trim())) {
        isValid = false;
        showError(emailError, 'Please enter a valid email address.');
      }

      if (!password.value || password.value.length < 6) {
        isValid = false;
        showError(passError, 'Password must be at least 6 characters long.');
      }

      if (isValid) {
        const btn = document.getElementById('signInSubmitBtn');
        const origContent = btn.innerHTML;
        btn.innerHTML = '<i class="ri-loader-4-line ri-spin"></i> Authenticating...';
        btn.disabled = true;

        setTimeout(() => {
          btn.innerHTML = origContent;
          btn.disabled = false;
          showAlert('Login Successful!', 'Welcome back, ' + email.value.split('@')[0] + '! Syncing your SmartFit watch data...', false);
          
          setTimeout(() => {
            window.location.href = 'index.html';
          }, 1800);
        }, 1200);
      }
    });
  }

  // 5. REGISTER FORM VALIDATION & SUBMISSION
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('regName');
      const email = document.getElementById('regEmail');
      const pass = document.getElementById('regPassword');
      const confirmPass = document.getElementById('regConfirmPassword');
      const terms = document.getElementById('termsAgree');

      const nameError = document.getElementById('regNameError');
      const emailError = document.getElementById('regEmailError');
      const passError = document.getElementById('regPasswordError');
      const confirmError = document.getElementById('regConfirmError');
      const termsError = document.getElementById('termsError');

      let isValid = true;
      resetErrors([nameError, emailError, passError, confirmError, termsError]);

      if (!name.value.trim() || name.value.trim().length < 3) {
        isValid = false;
        showError(nameError, 'Please enter your full name (at least 3 characters).');
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email.value.trim() || !emailRegex.test(email.value.trim())) {
        isValid = false;
        showError(emailError, 'Please enter a valid email address.');
      }

      if (!pass.value || pass.value.length < 6) {
        isValid = false;
        showError(passError, 'Password must be at least 6 characters.');
      }

      if (pass.value !== confirmPass.value) {
        isValid = false;
        showError(confirmError, 'Passwords do not match.');
      }

      if (!terms.checked) {
        isValid = false;
        showError(termsError, 'You must agree to the Terms of Service to create an account.');
      }

      if (isValid) {
        const btn = document.getElementById('registerSubmitBtn');
        const origContent = btn.innerHTML;
        btn.innerHTML = '<i class="ri-loader-4-line ri-spin"></i> Creating Account...';
        btn.disabled = true;

        setTimeout(() => {
          btn.innerHTML = origContent;
          btn.disabled = false;
          showAlert('Account Created!', 'Welcome to SmartFit Pro! Redirecting to homepage...', false);
          
          setTimeout(() => {
            window.location.href = 'index.html';
          }, 1800);
        }, 1400);
      }
    });
  }

  // 6. FORGOT PASSWORD MODAL
  const forgotPassBtn = document.getElementById('forgotPassBtn');
  const forgotModal = document.getElementById('forgotModal');
  const closeForgotModal = document.getElementById('closeForgotModal');
  const forgotModalBackdrop = document.getElementById('forgotModalBackdrop');
  const forgotForm = document.getElementById('forgotForm');
  const forgotFeedback = document.getElementById('forgotFeedback');

  if (forgotModal && forgotPassBtn) {
    forgotPassBtn.addEventListener('click', (e) => {
      e.preventDefault();
      forgotModal.classList.add('active');
    });

    const hideForgot = () => {
      forgotModal.classList.remove('active');
      if (forgotFeedback) forgotFeedback.style.display = 'none';
      if (forgotForm) forgotForm.reset();
    };

    if (closeForgotModal) closeForgotModal.addEventListener('click', hideForgot);
    if (forgotModalBackdrop) forgotModalBackdrop.addEventListener('click', hideForgot);

    if (forgotForm) {
      forgotForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('forgotEmail').value;
        if (email) {
          if (forgotFeedback) {
            forgotFeedback.innerHTML = `<i class="ri-checkbox-circle-fill text-cyan"></i> <span>Reset link sent to ${email}!</span>`;
            forgotFeedback.style.display = 'flex';
          }
          setTimeout(hideForgot, 3000);
        }
      });
    }
  }

  // 7. SOCIAL LOGIN BUTTONS
  const googleBtn = document.getElementById('googleLoginBtn');
  const appleBtn = document.getElementById('appleLoginBtn');

  [googleBtn, appleBtn].forEach(btn => {
    if (btn) {
      btn.addEventListener('click', () => {
        const provider = btn.textContent.trim();
        showAlert(`Connecting to ${provider}...`, 'Redirecting to secure single sign-on portal.', false);
        setTimeout(() => {
          window.location.href = 'index.html';
        }, 1500);
      });
    }
  });

  // HELPER FUNCTIONS
  function showError(el, msg) {
    if (el) {
      el.textContent = msg;
      el.style.display = 'block';
    }
  }

  function resetErrors(elements) {
    elements.forEach(el => {
      if (el) {
        el.textContent = '';
        el.style.display = 'none';
      }
    });
  }

  function showAlert(title, message, isError = false) {
    if (authAlert) {
      const titleEl = document.getElementById('alertTitle');
      const msgEl = document.getElementById('alertMessage');
      const icon = authAlert.querySelector('i');

      if (titleEl) titleEl.textContent = title;
      if (msgEl) msgEl.textContent = message;

      if (isError) {
        authAlert.classList.add('error-state');
        if (icon) icon.className = 'ri-error-warning-fill';
      } else {
        authAlert.classList.remove('error-state');
        if (icon) icon.className = 'ri-checkbox-circle-fill';
      }

      authAlert.style.display = 'flex';
    }
  }

  function hideAlert() {
    if (authAlert) {
      authAlert.style.display = 'none';
    }
  }
});

