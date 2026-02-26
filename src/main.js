import { workplaces, profile, philosophy, skills2026 } from './data.js';

const app = {
  init() {
    this.render();
    this.initMenu();
    this.initReveal();
    this.setYear();
  },

  render() {
    const profilePic = document.getElementById('profile-pic');
    if (profilePic) profilePic.src = profile.profileImg;

    const roleTargets = document.getElementById('role-targets');
    roleTargets.innerHTML = profile.roleTargets.map((role) => `<span class="chip">${role}</span>`).join('');

    const impactGrid = document.getElementById('impact-grid');
    impactGrid.innerHTML = profile.impact.map((item) => `
      <article class="impact-card reveal">
        <p class="impact-value">${item.value}</p>
        <p class="impact-label">${item.label}</p>
      </article>
    `).join('');

    const experienceFeed = document.getElementById('experience-feed');
    experienceFeed.innerHTML = workplaces.map((work) => `
      <article class="experience-card reveal">
        <div class="experience-media">
          <img src="${work.image}" alt="${work.company}">
        </div>
        <div class="experience-body">
          <header>
            <h3>${work.role}</h3>
            <p>${work.company} · ${work.location}</p>
            <time>${work.period}</time>
          </header>
          <ul>
            ${work.highlights.map((point) => `<li>${point}</li>`).join('')}
          </ul>
        </div>
      </article>
    `).join('');

    const skillsGrid = document.getElementById('skills-grid');
    skillsGrid.innerHTML = skills2026.map((skill) => `
      <article class="skill-card reveal">
        <h3>${skill.title}</h3>
        <p>${skill.desc}</p>
      </article>
    `).join('');

    const toolsStrip = document.getElementById('tools-strip');
    toolsStrip.innerHTML = profile.tools.map((tool) => `<span class="chip">${tool}</span>`).join('');

    const aboutBody = document.getElementById('about-body-text');
    aboutBody.innerHTML = profile.about
      .split('\n\n')
      .map((paragraph) => `<p>${paragraph}</p>`)
      .join('');

    const phiList = document.getElementById('phi-list');
    phiList.innerHTML = philosophy.map((item) => `
      <article class="principle-item reveal">
        <h4>${item.title}</h4>
        <p>${item.desc}</p>
      </article>
    `).join('');

    const contactCards = document.getElementById('contact-cards');
    contactCards.innerHTML = `
      <a class="contact-card" href="mailto:${profile.contact.email}">${profile.contact.email}</a>
      <a class="contact-card" href="tel:${profile.contact.phone.replace(/\s+/g, '')}">${profile.contact.phone}</a>
      <a class="contact-card" href="${profile.contact.linkedin}" target="_blank" rel="noopener noreferrer">LinkedIn Profile</a>
      <span class="contact-card">${profile.location}</span>
    `;
  },

  initMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const siteNav = document.getElementById('siteNav');

    if (!menuToggle || !siteNav) return;

    menuToggle.addEventListener('click', () => {
      const open = siteNav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(open));
    });

    siteNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        siteNav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        siteNav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  },

  initReveal() {
    const items = document.querySelectorAll('.reveal');

    if (!('IntersectionObserver' in window)) {
      items.forEach((item) => item.classList.add('visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    items.forEach((item, index) => {
      item.style.transitionDelay = `${Math.min(index * 0.04, 0.24)}s`;
      observer.observe(item);
    });
  },

  setYear() {
    const year = document.getElementById('year');
    if (year) year.textContent = String(new Date().getFullYear());
  }
};

document.addEventListener('DOMContentLoaded', () => app.init());
