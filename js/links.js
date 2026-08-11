document.addEventListener('DOMContentLoaded', () => {
  const socialLinks = {
    Behance: 'https://www.behance.net/',
    Dribbble: 'https://dribbble.com/',
    Instagram: 'https://www.instagram.com/',
    LinkedIn: 'https://www.linkedin.com/'
  };
  document.querySelectorAll('.footer-social a').forEach((link) => {
    const label = link.getAttribute('aria-label');
    if (socialLinks[label]) {
      link.href = socialLinks[label];
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    }
  });

  document.querySelectorAll('.footer-logo').forEach((logo) => {
    logo.style.cursor = 'pointer';
    logo.setAttribute('tabindex', '0');
    logo.setAttribute('role', 'link');
    logo.addEventListener('click', () => { window.location.href = 'index.html'; });
    logo.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') window.location.href = 'index.html';
    });
  });
});
