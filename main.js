document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.header');
  const menuBtn = document.getElementById('menuBtn');
  const nav = document.querySelector('.nav');
  const navLinks = nav.querySelectorAll('a');
  const sections = document.querySelectorAll('section[id], .hero');
  const contactForm = document.getElementById('contactForm');

  // Header scroll shadow
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });

  // Mobile menu toggle
  menuBtn.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuBtn.classList.toggle('open', isOpen);
    menuBtn.setAttribute('aria-expanded', isOpen);
  });

  // Close mobile menu on nav click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuBtn.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  });

  // Active nav highlight on scroll
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );

  sections.forEach(section => {
    if (section.id) observer.observe(section);
  });

  // Contact form — opens mailto with form data
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const company = formData.get('company') || 'N/A';
    const message = formData.get('message');

    const subject = encodeURIComponent(`FOSHEENJI Inquiry from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nCompany: ${company}\n\n${message}`
    );

    window.location.href = `mailto:info@fosheenji.com?subject=${subject}&body=${body}`;

    alert(window.getTranslation('contact.form.success'));
    contactForm.reset();
  });
});
