document.addEventListener('DOMContentLoaded', () => {
  const password = document.querySelector('#password');
  const toggles = document.querySelectorAll('.password-toggle');
  const form = document.querySelector('#signin-form, #signup-form');
  const googleButton = document.querySelector('.google-button');
  const logo = document.querySelector('.auth-logo');
  const message = document.querySelector('#auth-message');
  let messageTimeout;

  if (!password || !toggles.length || !form) return;

  const showMessage = (text, success = false) => {
    clearTimeout(messageTimeout);
    message.textContent = text;
    message.classList.toggle('success', success);
    message.classList.add('show');
    if (success) {
      messageTimeout = setTimeout(() => message.classList.remove('show'), 2500);
    }
  };

  document.querySelectorAll('select#role').forEach((select) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'custom-select';
    select.parentNode.insertBefore(wrapper, select);
    wrapper.appendChild(select);
    select.classList.add('native-select');

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'custom-select-button';
    button.textContent = select.options[select.selectedIndex]?.text || 'Select your role';
    button.setAttribute('aria-expanded', 'false');
    wrapper.appendChild(button);

    const menu = document.createElement('div');
    menu.className = 'custom-select-menu';
    menu.setAttribute('role', 'listbox');
    [...select.options].filter((option) => option.value).forEach((option) => {
      const item = document.createElement('button');
      item.type = 'button';
      item.className = 'custom-select-option';
      item.textContent = option.text;
      item.addEventListener('click', () => {
        select.value = option.value;
        button.textContent = option.text;
        button.classList.add('selected');
        menu.querySelectorAll('.custom-select-option').forEach((entry) => entry.classList.remove('selected'));
        item.classList.add('selected');
        menu.classList.remove('open');
        button.setAttribute('aria-expanded', 'false');
        select.dispatchEvent(new Event('change', { bubbles: true }));
      });
      menu.appendChild(item);
    });
    wrapper.appendChild(menu);
    button.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      button.setAttribute('aria-expanded', String(open));
    });
  });

  document.addEventListener('click', (event) => {
    document.querySelectorAll('.custom-select').forEach((wrapper) => {
      if (!wrapper.contains(event.target)) {
        wrapper.querySelector('.custom-select-menu')?.classList.remove('open');
        wrapper.querySelector('.custom-select-button')?.setAttribute('aria-expanded', 'false');
      }
    });
  });

  if (logo) {
    logo.style.cursor = 'pointer';
    logo.addEventListener('click', () => { window.location.href = 'index.html'; });
  }

  toggles.forEach((toggle) => {
    toggle.addEventListener('click', () => {
      const field = toggle.parentElement.querySelector('input');
      const visible = field.type === 'text';
      field.type = visible ? 'password' : 'text';
      toggle.setAttribute('aria-label', visible ? 'Show password' : 'Hide password');
      toggle.setAttribute('aria-pressed', String(!visible));
    });
  });

  if (googleButton) {
    googleButton.addEventListener('click', () => showMessage('Google sign-in is not connected yet. Use your Stackly account below.'));
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const confirmPassword = document.querySelector('#confirm-password');

    if (confirmPassword) {
      confirmPassword.setCustomValidity(
        confirmPassword.value !== password.value ? 'Passwords do not match.' : ''
      );
    }

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    if (form.id === 'signup-form') {
      const account = {
        name: document.querySelector('#name').value.trim(),
        email: document.querySelector('#email').value.trim().toLowerCase(),
        role: document.querySelector('#role').value,
        password: password.value
      };
      localStorage.setItem('stacklyAccount', JSON.stringify(account));
      showMessage('Account created successfully! Redirecting to sign in…', true);
      setTimeout(() => { window.location.href = 'signin.html'; }, 2500);
      return;
    }

    const email = document.querySelector('#email').value.trim();
    const role = document.querySelector('#role').value;
    const account = JSON.parse(localStorage.getItem('stacklyAccount') || 'null');
    if (account && (email.toLowerCase() !== account.email || role !== account.role || password.value !== account.password)) {
      showMessage('Email, password or selected role is incorrect. Please try again.');
      return;
    }

    const name = email.split('@')[0].replace(/[._-]+/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());
    sessionStorage.setItem('stacklyUserEmail', email);
    sessionStorage.setItem('stacklyUserName', name || 'Creative');
    sessionStorage.setItem('stacklyUserRole', role);
    showMessage('Login successful! Opening your dashboard…', true);
    setTimeout(() => { window.location.href = 'dashboard.html'; }, 2500);
  });
});
