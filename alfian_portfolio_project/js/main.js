async function loadPartials() {
  const targets = [...document.querySelectorAll('[data-include]')];
  const partials = await Promise.all(targets.map(async target => {
    const path = target.dataset.include;
    const response = await fetch(path, { cache: 'no-store' });

    if (!response.ok) {
      throw new Error(`Gagal memuat ${path}: ${response.status}`);
    }

    return { target, html: await response.text() };
  }));

  partials.forEach(({ target, html }) => {
    target.outerHTML = html;
  });
}

function initializePage() {
  const welcomeScreen = document.getElementById('welcome-screen');
  const enterPortfolio = document.getElementById('enter-portfolio');
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');

  enterPortfolio.addEventListener('click', () => {
    enterPortfolio.disabled = true;
    welcomeScreen.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('overflow-hidden');

    let fallbackTimer;
    const finishTransition = () => {
      welcomeScreen.classList.add('hidden');
      welcomeScreen.removeEventListener('transitionend', handleTransitionEnd);
      window.clearTimeout(fallbackTimer);
    };
    const handleTransitionEnd = event => {
      if (event.target === welcomeScreen && event.propertyName === 'transform') {
        finishTransition();
      }
    };

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      finishTransition();
      return;
    }

    welcomeScreen.addEventListener('transitionend', handleTransitionEnd);
    welcomeScreen.classList.add('is-leaving');
    fallbackTimer = window.setTimeout(finishTransition, 1800);
  });

  menuToggle.addEventListener('click', () => {
    const isOpen = !navLinks.classList.contains('hidden');
    navLinks.classList.toggle('hidden');
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Buka menu' : 'Tutup menu');
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.add('hidden');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });

  document.getElementById('year').textContent = new Date().getFullYear();

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
}

document.addEventListener('DOMContentLoaded', async () => {
  try {
    await loadPartials();
    initializePage();
  } catch (error) {
    console.error(error);
    document.getElementById('welcome-screen').classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
    const errorMessage = document.getElementById('include-error');
    errorMessage.textContent = 'Bagian halaman gagal dimuat. Jalankan proyek melalui Live Server dan periksa file di folder partials.';
    errorMessage.classList.remove('hidden');
  }
});
