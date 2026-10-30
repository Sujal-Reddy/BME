import { initThreeScene } from './three-scene.js';
import { initAnimations } from './animations.js';

// Equipment Catalog Data
export const equipmentData = [
  {
    id: 'mini-excavator',
    name: 'Mini Excavator',
    category: 'Excavators & Earthmoving',
    catNumber: '01',
    image: './images/mini_excavator.png',
    tagline: 'Ideal for urban worksites, landscaping & trenching',
    specs: {
      operatingWeight: '1.8 - 3.5 Tonnes',
      enginePower: '19 - 24.7 HP',
      bucketCapacity: '0.04 - 0.12 m³',
      maxDiggingDepth: '2.55 m',
      fuelType: 'Diesel (EcoMAX)'
    },
    rates: {
      daily: '₹2,800',
      weekly: '₹17,500',
      monthly: '₹65,000'
    }
  },
  {
    id: 'small-excavator',
    name: 'Small Excavator',
    category: 'Excavators & Earthmoving',
    catNumber: '01',
    image: './images/small_excavator.png',
    tagline: 'Compact power with superior fuel economy and reach',
    specs: {
      operatingWeight: '8.5 Tonnes',
      enginePower: '55 HP @ 2200 RPM',
      bucketCapacity: '0.28 - 0.35 m³',
      maxDiggingDepth: '4.15 m',
      fuelType: 'Diesel Turbocharged'
    },
    rates: {
      daily: '₹4,500',
      weekly: '₹28,000',
      monthly: '₹1,10,000'
    }
  },
  {
    id: 'medium-excavator',
    name: 'Medium Excavator',
    category: 'Excavators & Earthmoving',
    catNumber: '01',
    image: './images/medium_excavator.png',
    tagline: 'Heavy-duty quarrying, mass excavation & demolition',
    specs: {
      operatingWeight: '21.5 Tonnes',
      enginePower: '140 HP Heavy Duty',
      bucketCapacity: '0.92 - 1.2 m³',
      maxDiggingDepth: '6.65 m',
      fuelType: 'CRDi Diesel Engine'
    },
    rates: {
      daily: '₹7,200',
      weekly: '₹45,000',
      monthly: '₹1,80,000'
    }
  },
  {
    id: 'backhoe',
    name: 'Backhoe',
    category: 'Excavators & Earthmoving',
    catNumber: '01',
    image: './images/backhoe.png',
    tagline: "India's favorite multi-purpose construction legend",
    specs: {
      operatingWeight: '7.6 Tonnes (JCB 3DX)',
      enginePower: '76 HP EcoMAX BS-IV',
      bucketCapacity: '1.1 m³ (Loader) / 0.26 m³ (Backhoe)',
      maxDiggingDepth: '4.77 m',
      fuelType: 'Diesel'
    },
    rates: {
      daily: '₹3,200',
      weekly: '₹20,000',
      monthly: '₹75,000'
    }
  },
  {
    id: 'wheel-loader',
    name: 'Wheel Loader',
    category: 'Excavators & Earthmoving',
    catNumber: '01',
    image: './images/wheel_loader.png',
    tagline: 'High volume material loading and quarry bulk handling',
    specs: {
      operatingWeight: '11.2 Tonnes (432ZX)',
      enginePower: '150 HP Turbocharged',
      bucketCapacity: '1.8 - 2.3 m³',
      dumpHeight: '2.84 m',
      fuelType: 'Heavy Diesel'
    },
    rates: {
      daily: '₹5,800',
      weekly: '₹36,000',
      monthly: '₹1,40,000'
    }
  },
  {
    id: 'hydra',
    name: 'Hydra',
    category: 'Transport & Tippers',
    catNumber: '02',
    image: './images/hydra.png',
    tagline: 'Versatile pick-and-carry mobile hydraulic crane',
    specs: {
      liftingCapacity: '14 - 15 Tonnes',
      boomLength: '10.5 m (3 section)',
      enginePower: '50 HP Escorts/Tata Diesel',
      speed: '28 km/h max',
      fuelType: 'Diesel'
    },
    rates: {
      daily: '₹3,500',
      weekly: '₹22,000',
      monthly: '₹85,000'
    }
  },
  {
    id: 'tipper',
    name: 'Tipper',
    category: 'Transport & Tippers',
    catNumber: '02',
    image: './images/tipper.png',
    tagline: 'Heavy payload dump trucks for aggregate haulage',
    specs: {
      payloadCapacity: '16 - 25 Tonnes (16m³)',
      enginePower: '250 HP BS6 Engine',
      axleConfiguration: '6x4 / 8x4 Heavy Hauler',
      bodyType: 'Rock / Box Body Steel',
      fuelType: 'Diesel'
    },
    rates: {
      daily: '₹4,000',
      weekly: '₹25,000',
      monthly: '₹95,000'
    }
  },
  {
    id: 'transit-mixer',
    name: 'Transit Mixer',
    category: 'Concrete Equipment',
    catNumber: '03',
    image: './images/transit_mixer.png',
    tagline: 'Homogeneous readymix concrete transit over distance',
    specs: {
      drumCapacity: '6 - 7 m³ Geometric',
      slaveEngine: '4-Cylinder Turbo 75 HP',
      dischargeRate: '0.8 m³/min',
      chassisType: 'BharatBenz / Tata 6x4',
      fuelType: 'Diesel'
    },
    rates: {
      daily: '₹4,800',
      weekly: '₹30,000',
      monthly: '₹1,20,000'
    }
  },
  {
    id: 'self-loading-mixer',
    name: 'Self-Loading Mixer',
    category: 'Concrete Equipment',
    catNumber: '03',
    image: './images/self_loading_mixer.png',
    tagline: 'Mobile batching plant: self weights, mixes and pours',
    specs: {
      concreteOutput: '4.0 m³ per batch',
      drumSwivel: '300-degree rotation discharge',
      loadingShovel: '600 Litres capacity',
      enginePower: '110 HP Water Cooled',
      fuelType: 'Diesel 4WD'
    },
    rates: {
      daily: '₹5,200',
      weekly: '₹33,000',
      monthly: '₹1,30,000'
    }
  },
  {
    id: 'concrete-pump',
    name: 'Concrete Pump',
    category: 'Concrete Equipment',
    catNumber: '03',
    image: './images/concrete_pump.png',
    tagline: 'High rise concrete delivery with multi-fold boom',
    specs: {
      verticalReach: '36 Metres (4-arm RZ Boom)',
      pumpingCapacity: '90 - 120 m³/hr',
      linePressure: '85 Bar Heavy Output',
      chassis: '16T Truck Mounted',
      fuelType: 'Diesel High Torque'
    },
    rates: {
      daily: '₹6,500',
      weekly: '₹40,000',
      monthly: '₹1,60,000'
    }
  },
  {
    id: 'soil-compactor',
    name: 'Soil Compactor',
    category: 'Road Construction & Power',
    catNumber: '04',
    image: './images/soil_compactor.png',
    tagline: 'Single smooth drum vibratory roller for sub-base compaction',
    specs: {
      operatingWeight: '11.5 Tonnes',
      drumWidth: '2,100 mm',
      vibrationFrequency: '30 / 36 Hz (Dual amplitude)',
      enginePower: '105 HP JCB DieselMAX',
      gradeability: '45%'
    },
    rates: {
      daily: '₹3,800',
      weekly: '₹24,000',
      monthly: '₹90,000'
    }
  },
  {
    id: 'tandem-roller',
    name: 'Tandem Roller',
    category: 'Road Construction & Power',
    catNumber: '04',
    image: './images/tandem_roller.png',
    tagline: 'Double drum asphalt compactor for seamless road surfacing',
    specs: {
      operatingWeight: '3.0 - 9.0 Tonnes',
      drumWidth: '1,200 - 1,680 mm',
      drumType: 'Dual Vibrating Steel Drums',
      waterSprinkler: 'Pressurized Dual System',
      fuelType: 'Diesel EcoEngine'
    },
    rates: {
      daily: '₹3,200',
      weekly: '₹20,000',
      monthly: '₹75,000'
    }
  },
  {
    id: 'pneumatic-roller',
    name: 'Pneumatic Roller',
    category: 'Road Construction & Power',
    catNumber: '04',
    image: './images/pneumatic_roller.png',
    tagline: 'Multi-tyre kneading roller for high density seal coating',
    specs: {
      operatingWeight: '14 - 24 Tonnes ballasted',
      numberWheels: '4 front + 4 rear (Overlap)',
      tirePressureSystem: 'Central Air Inflation',
      enginePower: '100 HP Turbocharged',
      fuelType: 'Diesel'
    },
    rates: {
      daily: '₹4,200',
      weekly: '₹26,000',
      monthly: '₹1,05,000'
    }
  },
  {
    id: 'generator',
    name: 'Generator',
    category: 'Road Construction & Power',
    catNumber: '04',
    image: './images/generator.png',
    tagline: 'Heavy duty acoustic enclosed diesel gensets',
    specs: {
      primeRating: '125 kVA / 100 kWe',
      engine: 'JCB G125QX Canopy Diesel',
      soundLevel: '< 75 dBA @ 1 metre',
      fuelCapacity: '280 Litres (18 hrs continuous)',
      voltage: '415V, 3-Phase, 50 Hz'
    },
    rates: {
      daily: '₹2,500',
      weekly: '₹15,000',
      monthly: '₹55,000'
    }
  }
];

// Testimonials Data
const testimonials = [
  {
    quote: "Excellent machines and prompt service. The team is very supportive and always available when needed.",
    author: "Ramesh Kumar",
    role: "Contractor, Hyderabad",
    avatar: "./images/ramesh_kumar.png"
  },
  {
    quote: "We deployed 6 JCB excavators and 2 compactors for our highway project. Outstanding fuel efficiency and zero downtime.",
    author: "Anita Sharma",
    role: "Project Director, Bangalore Metro",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
  },
  {
    quote: "Flexible rental schemes and quick on-site technician response helped us deliver our warehouse foundation 2 weeks ahead of schedule.",
    author: "Rajesh Patel",
    role: "Infrastructure Lead, Ahmedabad",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
  },
  {
    quote: "Top quality machinery with genuine parts and verified operators. Truly India's premier heavy equipment rental partner.",
    author: "Sunil Verma",
    role: "Roadways Construction, Lucknow",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80"
  }
];

// Hero slides data - Place your custom carousel images in images/
const heroSlides = [
  {
    image: './images/hero_slide_1.png',
    badge: 'BUILT FOR A STRONGER TOMORROW',
    titleLine1: 'Powering Your',
    titleLine2: 'Projects, Every Step',
    titleLine3: 'of the Way',
    subtitle: 'From earthmoving to road construction, we provide reliable JCB machines and allied equipment for both sale and rental, backed by expert support.'
  },
  {
    image: './images/hero_slide_2.png',
    badge: 'ENGINEERED FOR MAX UPTIME',
    titleLine1: 'Heavy Machines,',
    titleLine2: 'Unmatched Precision',
    titleLine3: 'On Every Job',
    subtitle: 'Deploy world-class backhoes, tracked excavators, and compactors with 24/7 dedicated on-site support anywhere across India.'
  },
  {
    image: './images/hero_slide_3.png',
    badge: 'FLEXIBLE RENTALS & FAST DISPATCH',
    titleLine1: 'Scale Your Fleet,',
    titleLine2: 'Maximize Profit',
    titleLine3: 'With Zero Hassle',
    subtitle: 'Competitive daily, weekly and monthly rental packages with verified operators and round-the-clock telemetry monitoring.'
  }
];

let currentSlideIndex = 0;
let currentTestimonialIndex = 0;

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // Three.js interactive background
  initThreeScene();

  // GSAP Animations
  initAnimations();

  // Setup interactions
  setupNavbar();
  setupEquipmentModals();
  setupTestimonialsSlider();
  setupHeroSlider();
  setupQuoteModal();
  setupVideoModal();
  setupSearch();
  setupSmoothScroll();
});

// Re-check on window load to ensure icons and animations render after all assets load
window.addEventListener('load', () => {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
});

function setupNavbar() {
  const navbar = document.getElementById('main-navbar');
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('shadow-sm', 'bg-white/98');
    } else {
      navbar.classList.remove('shadow-sm', 'bg-white/98');
    }
  }, { passive: true });

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }
}

// Equipment Details Modal
function setupEquipmentModals() {
  const modal = document.getElementById('equipment-modal');
  const closeModal = document.getElementById('close-equipment-modal') || document.getElementById('modal-close-btn');
  const cardButtons = document.querySelectorAll('.equipment-card, .square-slide');

  cardButtons.forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('.square-nav-btn') || e.target.closest('.square-dot')) return;
      const eqId = card.getAttribute('data-id');
      const item = equipmentData.find(el => el.id === eqId);
      if (!item) return;

      openEquipmentDetails(item);
    });
  });

  if (closeModal && modal) {
    closeModal.addEventListener('click', () => {
      modal.classList.add('hidden');
    });
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.add('hidden');
    });
  }
}

export function openEquipmentDetails(item) {
  const modal = document.getElementById('equipment-modal');
  if (!modal) return;

  document.getElementById('modal-eq-title').textContent = item.name;
  document.getElementById('modal-eq-category').textContent = item.category;
  document.getElementById('modal-eq-tagline').textContent = item.tagline;
  document.getElementById('modal-eq-image').src = item.image;
  document.getElementById('modal-eq-image').onerror = () => {
    document.getElementById('modal-eq-image').src = item.fallbackImage;
  };

    // Sync modal estimator dropdown with clicked equipment item
  const modalCalcEquipment = document.getElementById('modal-calc-equipment');
  if (modalCalcEquipment && item.id) {
    modalCalcEquipment.value = item.id;
  }
  if (typeof window.updateModalEstimate === 'function') {
    window.updateModalEstimate();
  }

// Specs list
  const specsContainer = document.getElementById('modal-eq-specs');
  specsContainer.innerHTML = '';
  for (const [key, val] of Object.entries(item.specs)) {
    const formattedKey = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
    const row = document.createElement('div');
    row.className = 'flex justify-between items-center py-2.5 border-b border-slate-200 text-sm last:border-b-0';
    row.innerHTML = `<span class="text-slate-600 font-medium">${formattedKey}</span><span class="font-bold text-slate-900 tracking-wide">${val}</span>`;
    specsContainer.appendChild(row);
  }

  // Pricing
  document.getElementById('modal-eq-daily').textContent = item.rates.daily;
  document.getElementById('modal-eq-weekly').textContent = item.rates.weekly;
  document.getElementById('modal-eq-monthly').textContent = item.rates.monthly;

  // Book button
  const bookBtn = document.getElementById('modal-book-now');
  if (bookBtn) {
    bookBtn.onclick = () => {
      modal.classList.add('hidden');
      openQuoteModal(item.name);
    };
  }

  modal.classList.remove('hidden');
}

window.openEquipmentDetails = openEquipmentDetails;
window.equipmentData = equipmentData;

// Testimonials Slider
function setupTestimonialsSlider() {
  const prevBtn = document.getElementById('testim-prev');
  const nextBtn = document.getElementById('testim-next');
  const dotsContainer = document.getElementById('testim-dots');

  function renderTestimonial(index) {
    const data = testimonials[index];
    const textEl = document.getElementById('testim-text');
    const authorEl = document.getElementById('testim-author');
    const roleEl = document.getElementById('testim-role');
    const avatarEl = document.getElementById('testim-avatar');

    if (textEl && authorEl && roleEl) {
      if (typeof gsap !== 'undefined') {
        gsap.to([textEl, authorEl, roleEl], {
          opacity: 0,
          y: 8,
          duration: 0.2,
          onComplete: () => {
            textEl.textContent = `“${data.quote}”`;
            authorEl.textContent = data.author;
            roleEl.textContent = data.role;
            if (avatarEl) avatarEl.src = data.avatar;

            gsap.to([textEl, authorEl, roleEl], {
              opacity: 1,
              y: 0,
              duration: 0.3
            });
          }
        });
      } else {
        textEl.textContent = `“${data.quote}”`;
        authorEl.textContent = data.author;
        roleEl.textContent = data.role;
        if (avatarEl) avatarEl.src = data.avatar;
      }
    }

    // Update dots
    const dots = dotsContainer?.querySelectorAll('.testim-dot');
    dots?.forEach((d, i) => {
      if (i === index) {
        d.classList.add('bg-[#fcb900]', 'w-6');
        d.classList.remove('bg-gray-300', 'w-2');
      } else {
        d.classList.remove('bg-[#fcb900]', 'w-6');
        d.classList.add('bg-gray-300', 'w-2');
      }
    });
  }

  // Create dots
  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    testimonials.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = `testim-dot h-2 rounded-full transition-all duration-300 ${i === 0 ? 'bg-[#fcb900] w-6' : 'bg-gray-300 w-2'}`;
      dot.addEventListener('click', () => {
        currentTestimonialIndex = i;
        renderTestimonial(i);
      });
      dotsContainer.appendChild(dot);
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentTestimonialIndex = (currentTestimonialIndex - 1 + testimonials.length) % testimonials.length;
      renderTestimonial(currentTestimonialIndex);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;
      renderTestimonial(currentTestimonialIndex);
    });
  }
}

// Hero Slide Indicator / Carousel
function setupHeroSlider() {
  const indicators = document.querySelectorAll('.hero-step-indicator');
  const prevBtn = document.getElementById('hero-nav-prev');
  const nextBtn = document.getElementById('hero-nav-next');

  function updateHeroSlide(idx) {
    currentSlideIndex = idx;
    const slide = heroSlides[idx];

    indicators.forEach((btn, i) => {
      const line = btn.querySelector('.step-line');
      if (i === idx) {
        btn.classList.add('text-white', 'font-bold');
        btn.classList.remove('text-gray-400');
        if (line) line.classList.remove('opacity-0');
      } else {
        btn.classList.remove('text-white', 'font-bold');
        btn.classList.add('text-gray-400');
        if (line) line.classList.add('opacity-0');
      }
    });

    const badgeEl = document.getElementById('hero-badge-text');
    const l1 = document.getElementById('hero-headline-1');
    const l2 = document.getElementById('hero-headline-2');
    const l3 = document.getElementById('hero-headline-3');
    const subEl = document.getElementById('hero-subtitle-text');
    const heroImg = document.getElementById('hero-main-img');

    // Smooth image transition
    if (heroImg && slide.image) {
      if (typeof gsap !== 'undefined') {
        gsap.to(heroImg, {
          opacity: 0.1,
          duration: 0.25,
          onComplete: () => {
            heroImg.src = slide.image;
            gsap.to(heroImg, { opacity: 0.9, duration: 0.35 });
          }
        });
      } else {
        heroImg.src = slide.image;
      }
    }

    if (badgeEl && l1 && l2 && l3 && subEl) {
      if (typeof gsap !== 'undefined') {
        gsap.to([badgeEl, l1, l2, l3, subEl], {
          opacity: 0,
          y: -10,
          duration: 0.25,
          stagger: 0.04,
          onComplete: () => {
            badgeEl.textContent = slide.badge;
            l1.textContent = slide.titleLine1;
            l2.textContent = slide.titleLine2;
            l3.textContent = slide.titleLine3;
            subEl.textContent = slide.subtitle;

            gsap.to([badgeEl, l1, l2, l3, subEl], {
              opacity: 1,
              y: 0,
              duration: 0.4,
              stagger: 0.05
            });
          }
        });
      } else {
        badgeEl.textContent = slide.badge;
        l1.textContent = slide.titleLine1;
        l2.textContent = slide.titleLine2;
        l3.textContent = slide.titleLine3;
        subEl.textContent = slide.subtitle;
      }
    }
  }

  indicators.forEach(btn => {
    btn.addEventListener('click', () => {
      const step = parseInt(btn.getAttribute('data-step') || '0', 10);
      updateHeroSlide(step);
    });
  });

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      const newIdx = (currentSlideIndex - 1 + heroSlides.length) % heroSlides.length;
      updateHeroSlide(newIdx);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const newIdx = (currentSlideIndex + 1) % heroSlides.length;
      updateHeroSlide(newIdx);
    });
  }
}

// Quote & Enquiry Modal
export function openQuoteModal(equipmentName = '') {
  const modal = document.getElementById('quote-modal');
  const eqSelect = document.getElementById('quote-equipment-select');
  if (eqSelect && equipmentName) {
    for (let opt of eqSelect.options) {
      if (opt.value.toLowerCase().includes(equipmentName.toLowerCase()) || opt.text.toLowerCase().includes(equipmentName.toLowerCase())) {
        opt.selected = true;
        break;
      }
    }
  }
  if (modal) modal.classList.remove('hidden');
}

function setupQuoteModal() {
  const modal = document.getElementById('quote-modal');
  const closeBtn = document.getElementById('close-quote-modal');
  const triggerBtns = document.querySelectorAll('.open-quote-trigger');
  const form = document.getElementById('quote-form');

  triggerBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openQuoteModal();
    });
  });

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => modal.classList.add('hidden'));
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.add('hidden');
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      modal.classList.add('hidden');
      showToast('Enquiry received! Our equipment specialist will contact you within 15 minutes.');
      form.reset();
    });
  }
}

// Video Fleet Modal
function setupVideoModal() {
  const modal = document.getElementById('video-modal');
  const openBtn = document.getElementById('watch-fleet-btn');
  const closeBtn = document.getElementById('close-video-modal');
  const videoFrame = document.getElementById('fleet-video-player');

  if (openBtn && modal) {
    openBtn.addEventListener('click', () => {
      modal.classList.remove('hidden');
      if (videoFrame) {
        // Embed high-energy JCB heavy machinery showcase
        videoFrame.src = "https://www.youtube-nocookie.com/embed/5mC0Yg2eN30?autoplay=1&mute=0";
      }
    });
  }

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => {
      modal.classList.add('hidden');
      if (videoFrame) videoFrame.src = "";
    });
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.add('hidden');
        if (videoFrame) videoFrame.src = "";
      }
    });
  }
}

// Live Search Modal
function setupSearch() {
  const searchBtn = document.getElementById('nav-search-btn');
  const searchModal = document.getElementById('search-modal');
  const searchClose = document.getElementById('close-search-modal');
  const searchInput = document.getElementById('search-input');
  const resultsContainer = document.getElementById('search-results');

  if (searchBtn && searchModal) {
    searchBtn.addEventListener('click', () => {
      searchModal.classList.remove('hidden');
      searchInput?.focus();
      renderSearchResults('');
    });
  }

  if (searchClose && searchModal) {
    searchClose.addEventListener('click', () => searchModal.classList.add('hidden'));
    searchModal.addEventListener('click', (e) => {
      if (e.target === searchModal) searchModal.classList.add('hidden');
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      renderSearchResults(e.target.value.toLowerCase().trim());
    });
  }

  function renderSearchResults(query) {
    if (!resultsContainer) return;
    const filtered = query === '' 
      ? equipmentData.slice(0, 6) 
      : equipmentData.filter(item => 
          item.name.toLowerCase().includes(query) || 
          item.category.toLowerCase().includes(query) ||
          item.tagline.toLowerCase().includes(query)
        );

    resultsContainer.innerHTML = '';
    if (filtered.length === 0) {
      resultsContainer.innerHTML = `<p class="text-gray-400 text-center py-6">No equipment found matching "${query}".</p>`;
      return;
    }

    filtered.forEach(item => {
      const row = document.createElement('div');
      row.className = 'flex items-center justify-between p-3 rounded-lg hover:bg-gray-800 transition cursor-pointer border border-transparent hover:border-gray-700';
      row.innerHTML = `
        <div class="flex items-center space-x-4">
          <img src="${item.image}" alt="${item.name}" class="w-12 h-10 object-contain bg-white rounded p-1" onerror="this.src='${item.fallbackImage}'">
          <div>
            <div class="text-white font-medium">${item.name}</div>
            <div class="text-xs text-[#fcb900]">${item.category}</div>
          </div>
        </div>
        <div class="text-right">
          <div class="text-sm font-semibold text-white">${item.rates.daily}<span class="text-xs text-gray-400 font-normal">/day</span></div>
          <span class="text-xs text-gray-400">View Specs &rarr;</span>
        </div>
      `;
      row.addEventListener('click', () => {
        searchModal.classList.add('hidden');
        openEquipmentDetails(item);
      });
      resultsContainer.appendChild(row);
    });
  }
}

// Smooth anchor scrolling
function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// Toast notification helper
function showToast(message) {
  let toast = document.getElementById('global-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'global-toast';
    toast.className = 'fixed bottom-6 right-6 z-50 bg-[#121316] text-white px-5 py-3 rounded-xl border border-[#fcb900] shadow-2xl flex items-center space-x-3 transform transition-all duration-300 translate-y-12 opacity-0';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <div class="w-6 h-6 rounded-full bg-[#fcb900] flex items-center justify-center text-black font-bold text-xs">✓</div>
    <span class="text-sm font-medium">${message}</span>
  `;

  toast.classList.remove('translate-y-12', 'opacity-0');
  toast.classList.add('translate-y-0', 'opacity-100');

  setTimeout(() => {
    toast.classList.add('translate-y-12', 'opacity-0');
    toast.classList.remove('translate-y-0', 'opacity-100');
  }, 4000);
}
