// GSAP & ScrollTrigger Animations
export function initAnimations() {
  if (typeof gsap === 'undefined') return;

  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  // Ensure all cards and sections are visible by default
  const ensureVisible = () => {
    document.querySelectorAll('.equipment-card, .feature-highlight-card, .why-choose-content').forEach(el => {
      el.style.opacity = '1';
      el.style.visibility = 'visible';
    });
  };
  ensureVisible();

  // 1. Hero Entrance Timeline
  const heroTL = gsap.timeline({ defaults: { ease: 'power3.out' } });

  heroTL
    .from('.hero-badge', {
      opacity: 0,
      y: -20,
      duration: 0.8,
      delay: 0.1
    })
    .from('.hero-title-line', {
      opacity: 0,
      y: 40,
      stagger: 0.15,
      duration: 1
    }, '-=0.6')
    .from('.hero-subtitle', {
      opacity: 0,
      y: 25,
      duration: 0.8
    }, '-=0.6')
    .from('.hero-ctas', {
      opacity: 0,
      y: 20,
      duration: 0.7
    }, '-=0.5')
    .from('.hero-indicators', {
      opacity: 0,
      duration: 0.6
    }, '-=0.4')
    .from('.hero-visual-art', {
      opacity: 0,
      scale: 0.95,
      x: 30,
      duration: 1.2
    }, '-=1.2')
    .from('.hero-vertical-tag', {
      opacity: 0,
      x: 20,
      duration: 0.8
    }, '-=0.8');

  // 2. Equipment Cards Hover interaction handled cleanly via CSS transitions

  // 3. Fail-safe Scroll Animations (Never leaves cards hidden)
  if (typeof ScrollTrigger !== 'undefined') {
    window.addEventListener('load', () => {
      ScrollTrigger.refresh();
      ensureVisible();
    });

    // Subtle category section reveal that clears all styles upon completion
    const catSections = document.querySelectorAll('.category-section-block');
    catSections.forEach(sec => {
      const sectionCards = sec.querySelectorAll('.equipment-card');
      gsap.fromTo(sectionCards, 
        { opacity: 0.4, y: 15 },
        {
          scrollTrigger: {
            trigger: sec,
            start: 'top 95%',
            once: true
          },
          opacity: 1,
          y: 0,
          stagger: 0.04,
          duration: 0.4,
          ease: 'power2.out',
          clearProps: 'opacity,transform,visibility',
          onComplete: () => {
            sectionCards.forEach(c => {
              c.style.opacity = '1';
              c.style.visibility = 'visible';
            });
          }
        }
      );
    });

    // Backup timer: guaranteed visibility
    setTimeout(ensureVisible, 300);
    setTimeout(ensureVisible, 1000);
  }
}
