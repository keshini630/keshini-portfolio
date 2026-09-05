// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close mobile nav after clicking a link
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Highlight active section link on scroll
const sections = document.querySelectorAll('main .section');
const navAnchors = document.querySelectorAll('.nav-links a');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navAnchors.forEach(a => {
        a.style.color = a.getAttribute('href') === `#${id}` ? 'var(--mustard-dark)' : '';
      });
    }
  });
}, { rootMargin: '-40% 0px -50% 0px' });

sections.forEach(section => observer.observe(section));

// Contact form validation (client-side only, no backend configured)
const form = document.getElementById('contactForm');
const successMsg = document.getElementById('formSuccess');

function setError(fieldId, msg) {
  const errorEl = document.getElementById(`${fieldId}Error`);
  const row = errorEl.closest('.form-row');
  errorEl.textContent = msg;
  row.classList.toggle('has-error', Boolean(msg));
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  successMsg.textContent = '';

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  let valid = true;

  if (!name) {
    setError('name', 'Please enter your name.');
    valid = false;
  } else {
    setError('name', '');
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailPattern.test(email)) {
    setError('email', 'Please enter a valid email address.');
    valid = false;
  } else {
    setError('email', '');
  }

  if (!message) {
    setError('message', 'Please write a short message.');
    valid = false;
  } else {
    setError('message', '');
  }

  if (valid) {
    successMsg.textContent = `Thanks, ${name}! Your message has been captured. (Connect this form to a backend or a service like Formspree to actually receive it.)`;
    form.reset();
  }
});
