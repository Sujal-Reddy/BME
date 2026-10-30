// build-about.cjs – Generates the rich, modern, and comprehensive about.html page for BookMyEquipment
const fs = require('fs');
const path = require('path');

// Official App Badges
const BADGE_PLAY = (h = 'h-11', idAttr = '') => `
  <a href="#" ${idAttr} class="inline-block transition-transform duration-200 hover:scale-105 active:scale-95 drop-shadow-md rounded-[7px] overflow-hidden" aria-label="Get it on Google Play">
    <img src="/images/google-play-badge.svg" alt="Get it on Google Play" class="${h} w-auto block">
  </a>`;

const BADGE_APP = (h = 'h-11', idAttr = '') => `
  <a href="#" ${idAttr} class="inline-block transition-transform duration-200 hover:scale-105 active:scale-95 drop-shadow-md rounded-[7px] overflow-hidden" aria-label="Download on the App Store">
    <img src="/images/app-store-badge.svg" alt="Download on the App Store" class="${h} w-auto block">
  </a>`;

const LANGUAGE_SELECTOR = `
  <div class="site-language-control" data-i18n-ignore="">
    <label class="sr-only" for="site-language">
      <span lang="en">Language</span> / <span lang="te">భాష</span> / <span lang="hi">भाषा</span>
    </label>
    <svg class="language-globe" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
      <circle cx="12" cy="12" r="9"/>
      <path d="M3 12h18M12 3a18 18 0 0 1 0 18 18 18 0 0 1 0-18Z"/>
    </svg>
    <select class="site-language-select" aria-label="Select Language">
      <option value="en" lang="en">English</option>
      <option value="te" lang="te">తెలుగు</option>
      <option value="hi" lang="hi">हिन्दी</option>
    </select>
    <svg class="language-chevron" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
      <path d="m4 6 4 4 4-4"/>
    </svg>
  </div>`;

const html = `<!doctype html>
<html lang="en" class="scroll-smooth">
<head>
  <meta charset="UTF-8" />
  <base href="/" />
  <link rel="icon" type="image/svg+xml" href="/images/jcb_logo.svg" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="About BookMyEquipment - India's #1 B2B heavy construction machinery platform. Discover our mission, vision, core values, and technological edge." />
  <title>About Us | Mission &amp; Vision | BookMyEquipment</title>
  
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Noto+Sans+Devanagari:wght@400;500;600;700;800&family=Noto+Sans+Telugu:wght@400;500;600;700;800&family=Poppins:wght@600;700;800;900&display=swap" rel="stylesheet" />
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            brand: {
              primary: '#F97316',
              primaryDark: '#EA580C',
              primaryLight: '#FFEDD5',
              emphasis: '#F59E0B',
              operator: '#0D9488',
              operatorBg: '#F0FDFA',
            }
          },
          fontFamily: {
            sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
            display: ['Poppins', 'system-ui', 'sans-serif']
          }
        }
      }
    }
  </script>
  <script src="https://unpkg.com/lucide@latest"></script>
  <link rel="stylesheet" href="/src/style.css" />
  <script type="module" src="/src/i18n.js"></script>
</head>
<body class="bg-slate-50 text-slate-900 font-sans min-h-screen flex flex-col selection:bg-brand-primary selection:text-white">

  <!-- ===== TOP HEADER ===== -->
  <header id="main-navbar" class="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-xl border-b border-slate-200/90 shadow-2xs">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16 sm:h-20">
        
        <!-- Logo -->
        <a href="/" class="flex items-center space-x-2.5 group" title="Return to BookMyEquipment Home">
          <div class="bg-brand-primary px-3 py-1.5 rounded-[6px] transition-transform group-hover:scale-105 shadow-sm">
            <span class="text-white font-black text-xl tracking-wider" style="font-family:'Poppins',Impact,sans-serif;">BME</span>
          </div>
          <div class="border-l border-slate-200 pl-3">
            <span class="text-[9px] tracking-[0.22em] text-brand-primary uppercase font-bold block">Heavy Equipment</span>
            <div class="text-sm font-bold text-slate-900 tracking-tight">BookMyEquipment</div>
          </div>
        </a>

        <!-- Center Nav Links -->
        <nav class="hidden lg:flex items-center space-x-8 text-sm font-semibold text-slate-600">
          <a href="/"           class="nav-link hover:text-brand-primary transition-colors">Home</a>
          <a href="/about"      class="nav-link active">About Us</a>
          <a href="/contact"    class="nav-link hover:text-brand-primary transition-colors">Contact Us</a>
        </nav>

        <!-- Right: Language Switcher + 3 Role Buttons -->
        <div class="flex items-center space-x-2.5">
          ${LANGUAGE_SELECTOR}
          <div class="hidden md:flex items-center space-x-2">
            <a href="/customer" class="header-role-btn role-btn-customer inline-flex items-center justify-center bg-transparent border-[1.5px] border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white font-extrabold text-xs px-3.5 py-2 rounded-xl transition-all duration-200 shadow-2xs hover:shadow-md hover:shadow-brand-primary/25 hover:-translate-y-0.5 active:scale-95 cursor-pointer">
              I'm Customer
            </a>
            <a href="/owner" class="header-role-btn role-btn-owner inline-flex items-center justify-center bg-transparent border-[1.5px] border-amber-500 text-amber-600 hover:bg-amber-500 hover:text-white font-extrabold text-xs px-3.5 py-2 rounded-xl transition-all duration-200 shadow-2xs hover:shadow-md hover:shadow-amber-500/25 hover:-translate-y-0.5 active:scale-95 cursor-pointer">
              I'm Machine Owner
            </a>
            <a href="/operator" class="header-role-btn role-btn-operator inline-flex items-center justify-center bg-transparent border-[1.5px] border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white font-extrabold text-xs px-3.5 py-2 rounded-xl transition-all duration-200 shadow-2xs hover:shadow-md hover:shadow-teal-600/25 hover:-translate-y-0.5 active:scale-95 cursor-pointer">
              I'm Operator
            </a>
          </div>
          <button id="mobile-menu-toggle" aria-label="Toggle menu" class="lg:hidden text-slate-600 hover:text-slate-900 p-2">
            <i data-lucide="menu" class="w-6 h-6"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Drawer -->
    <div id="mobile-menu" class="lg:hidden hidden bg-white border-t border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-lg">
      <div class="flex items-center justify-between pb-2 border-b border-slate-100">
        <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">Language</span>
        ${LANGUAGE_SELECTOR}
      </div>
      <a href="/"           class="block text-slate-700 font-semibold py-2 border-b border-slate-100 hover:text-brand-primary">Home</a>
      <a href="/about"      class="block text-brand-primary font-bold py-2 border-b border-slate-100">About Us</a>
      <a href="/contact"    class="block text-slate-700 font-semibold py-2 border-b border-slate-100 hover:text-brand-primary">Contact Us</a>
      <div class="pt-2 space-y-2">
        <a href="/customer" class="header-role-btn role-btn-customer w-full text-center bg-transparent border-[1.5px] border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white font-extrabold text-xs py-2.5 rounded-xl shadow-2xs block transition-all">
          I'm Customer
        </a>
        <a href="/owner" class="header-role-btn role-btn-owner w-full text-center bg-transparent border-[1.5px] border-amber-500 text-amber-600 hover:bg-amber-500 hover:text-white font-extrabold text-xs py-2.5 rounded-xl shadow-2xs block transition-all">
          I'm Machine Owner
        </a>
        <a href="/operator" class="header-role-btn role-btn-operator w-full text-center bg-transparent border-[1.5px] border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white font-extrabold text-xs py-2.5 rounded-xl shadow-2xs block transition-all">
          I'm Operator
        </a>
      </div>
    </div>
  </header>

  <!-- Main Content Canvas -->
  <main class="flex-1 pt-20">

    <!-- ===== BREADCRUMB & PAGE HERO ===== -->
    <section class="relative bg-gradient-to-b from-white via-slate-50 to-slate-100/60 py-12 sm:py-16 lg:py-20 overflow-hidden">
      <!-- Ambient Glows -->
      <div class="absolute -top-24 -left-24 w-96 h-96 bg-brand-primary/10 rounded-full blur-3xl pointer-events-none"></div>
      <div class="absolute top-1/2 -right-24 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <!-- Hero Content Header -->
        <div class="max-w-4xl space-y-5">
          <div class="inline-flex items-center space-x-2 bg-orange-50 border border-orange-200 text-orange-800 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider shadow-2xs">
            <span class="w-2 h-2 rounded-full bg-brand-primary animate-pulse"></span>
            <span>India's Heavy Equipment Mobile App</span>
          </div>

          <h1 class="font-display text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
            Hiring Heavy Machinery Should Be as Easy as Booking a Cab
          </h1>

          <p class="text-base sm:text-xl text-slate-600 leading-relaxed font-normal">
            BookMyEquipment connects construction contractors, machinery fleet owners, and certified operators across India on one simple mobile app. Zero middlemen, fixed honest rates, and 100% safe weekly payments.
          </p>

          <div class="flex flex-wrap items-center gap-3 pt-2">
            <a href="#mission-vision" class="px-6 py-3.5 rounded-xl bg-brand-primary hover:bg-orange-600 text-white font-bold text-sm shadow-md shadow-brand-primary/25 transition-all hover:-translate-y-0.5 flex items-center space-x-2">
              <span>Read Our Mission &amp; Vision</span>
              <i data-lucide="arrow-down" class="w-4 h-4"></i>
            </a>
            <a href="/#fleet" class="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 font-bold text-sm transition-all hover:border-slate-400 flex items-center space-x-2">
              <span>Explore Fleet</span>
              <i data-lucide="truck" class="w-4 h-4 text-slate-500"></i>
            </a>
          </div>
        </div>

        <!-- Metric Badges Row -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 sm:mt-16 pt-8 border-t border-slate-200/80">
          <div class="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs">
            <div class="text-2xl sm:text-3xl font-black text-slate-900 font-display">5,000+</div>
            <div class="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Verified Machines</div>
          </div>
          <div class="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs">
            <div class="text-2xl sm:text-3xl font-black text-brand-primary font-display">300+</div>
            <div class="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Cities &amp; Corridors</div>
          </div>
          <div class="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs">
            <div class="text-2xl sm:text-3xl font-black text-amber-600 font-display">100%</div>
            <div class="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Escrow Payout Safety</div>
          </div>
          <div class="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs">
            <div class="text-2xl sm:text-3xl font-black text-teal-600 font-display">12,000+</div>
            <div class="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Certified Operators</div>
          </div>
        </div>

      </div>
    </section>

    <!-- ===== MISSION & VISION SECTION (HIGH PRIORITY) ===== -->
    <section id="mission-vision" class="py-16 sm:py-24 bg-white relative scroll-mt-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div class="inline-flex items-center space-x-2 bg-orange-50 border border-orange-200 text-orange-800 rounded-full px-4 py-1 text-xs font-bold uppercase tracking-wider">
            <i data-lucide="target" class="w-3.5 h-3.5 text-brand-primary"></i>
            <span>Purpose &amp; Direction</span>
          </div>
          <h2 class="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Our Mission &amp; Vision
          </h2>
          <p class="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            The guiding principles and high-conviction commitments propelling BookMyEquipment to power India's next trillion-dollar infrastructure leap.
          </p>
        </div>

        <!-- 2 Pillar Cards: Mission & Vision -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          <!-- MISSION CARD -->
          <div class="relative bg-gradient-to-br from-orange-50/70 via-white to-amber-50/40 border-2 border-orange-200 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-lg shadow-orange-500/5 flex flex-col justify-between">
            <div class="space-y-6">
              
              <!-- Card Header -->
              <div class="flex items-center justify-between">
                <div class="w-14 h-14 rounded-2xl bg-brand-primary text-white flex items-center justify-center shadow-md shadow-brand-primary/30">
                  <i data-lucide="compass" class="w-7 h-7 stroke-[2.2]"></i>
                </div>
                <span class="text-xs font-extrabold uppercase tracking-widest text-brand-primary bg-orange-100/70 border border-orange-200/80 px-3.5 py-1 rounded-full">
                  Our Mission
                </span>
              </div>

              <!-- Title & Statement -->
              <div class="space-y-3">
                <h3 class="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                  No Construction Project Should Ever Stop Because of a Missing Machine
                </h3>
                <p class="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
                  For decades, hiring a JCB or Crane in India meant calling offline brokers who take 20% cuts, offer no replacement if a machine breaks down, and delay payments for months. We built the BookMyEquipment App to give every contractor instant machine delivery and give every machine owner guaranteed weekly earnings.
                </p>
              </div>

              <!-- Key Mission Commitments -->
              <div class="space-y-3 pt-2 border-t border-orange-100">
                <h4 class="text-xs font-bold uppercase tracking-wider text-slate-500">Core Mission Commitments:</h4>
                <ul class="space-y-3">
                  <li class="flex items-start space-x-3 text-sm text-slate-700">
                    <div class="w-5 h-5 rounded-full bg-orange-100 text-brand-primary flex items-center justify-center shrink-0 mt-0.5">
                      <i data-lucide="check" class="w-3.5 h-3.5 stroke-[3]"></i>
                    </div>
                    <span><strong>Zero-Broker Price Transparency:</strong> Uniform, standard hourly &amp; monthly pricing with direct contractor-to-owner contracts.</span>
                  </li>
                  <li class="flex items-start space-x-3 text-sm text-slate-700">
                    <div class="w-5 h-5 rounded-full bg-orange-100 text-brand-primary flex items-center justify-center shrink-0 mt-0.5">
                      <i data-lucide="check" class="w-3.5 h-3.5 stroke-[3]"></i>
                    </div>
                    <span><strong>Guaranteed Uptime &amp; Swift Replacement:</strong> 200-point physical machine inspection and 4-hour standby dispatch for replacements.</span>
                  </li>
                  <li class="flex items-start space-x-3 text-sm text-slate-700">
                    <div class="w-5 h-5 rounded-full bg-orange-100 text-brand-primary flex items-center justify-center shrink-0 mt-0.5">
                      <i data-lucide="check" class="w-3.5 h-3.5 stroke-[3]"></i>
                    </div>
                    <span><strong>Escrow Protection &amp; Payout Security:</strong> Funds held securely until milestones are verified, protecting both contractors and owners.</span>
                  </li>
                </ul>
              </div>

            </div>

            <!-- Bottom Tagline -->
            <div class="pt-6 mt-6 border-t border-orange-100/80 flex items-center justify-between text-xs font-bold text-orange-800">
              <span>Fairness for Renters</span>
              <span class="w-1.5 h-1.5 rounded-full bg-brand-primary"></span>
              <span>Stability for Owners</span>
              <span class="w-1.5 h-1.5 rounded-full bg-brand-primary"></span>
              <span>Dignity for Operators</span>
            </div>
          </div>

          <!-- VISION CARD -->
          <div class="relative bg-gradient-to-br from-teal-50/70 via-white to-emerald-50/40 border-2 border-teal-200 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-lg shadow-teal-500/5 flex flex-col justify-between">
            <div class="space-y-6">
              
              <!-- Card Header -->
              <div class="flex items-center justify-between">
                <div class="w-14 h-14 rounded-2xl bg-teal-600 text-white flex items-center justify-center shadow-md shadow-teal-600/30">
                  <i data-lucide="eye" class="w-7 h-7 stroke-[2.2]"></i>
                </div>
                <span class="text-xs font-extrabold uppercase tracking-widest text-teal-700 bg-teal-100/70 border border-teal-200/80 px-3.5 py-1 rounded-full">
                  Our Vision
                </span>
              </div>

              <!-- Title & Statement -->
              <div class="space-y-3">
                <h3 class="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                  The Indispensable Operating System for South Asian Infrastructure Delivery
                </h3>
                <p class="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
                  To construct South Asia's largest, most intelligent heavy machinery asset cloud—powering every highway, railway, airport, metro, and clean energy corridor with zero idle machinery, live telematics, predictive maintenance, and a thriving community of dignified, highly compensated heavy machinery operators.
                </p>
              </div>

              <!-- Key Vision Milestones -->
              <div class="space-y-3 pt-2 border-t border-teal-100">
                <h4 class="text-xs font-bold uppercase tracking-wider text-slate-500">Long-Term Strategic Milestones:</h4>
                <ul class="space-y-3">
                  <li class="flex items-start space-x-3 text-sm text-slate-700">
                    <div class="w-5 h-5 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center shrink-0 mt-0.5">
                      <i data-lucide="check" class="w-3.5 h-3.5 stroke-[3]"></i>
                    </div>
                    <span><strong>100,000+ IoT-Connected Assets:</strong> Telematics diagnostics giving contractors and owners live fuel, engine hour, and safety analytics.</span>
                  </li>
                  <li class="flex items-start space-x-3 text-sm text-slate-700">
                    <div class="w-5 h-5 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center shrink-0 mt-0.5">
                      <i data-lucide="check" class="w-3.5 h-3.5 stroke-[3]"></i>
                    </div>
                    <span><strong>Certified Operator Academy:</strong> Upskilling 50,000+ heavy vehicle operators with digital skill certifications and accident insurance.</span>
                  </li>
                  <li class="flex items-start space-x-3 text-sm text-slate-700">
                    <div class="w-5 h-5 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center shrink-0 mt-0.5">
                      <i data-lucide="check" class="w-3.5 h-3.5 stroke-[3]"></i>
                    </div>
                    <span><strong>Green Construction Fleet Transition:</strong> Spearheading the shift toward Tier-4/CEV-V emission machinery and electric earthmovers.</span>
                  </li>
                </ul>
              </div>

            </div>

            <!-- Bottom Tagline -->
            <div class="pt-6 mt-6 border-t border-teal-100/80 flex items-center justify-between text-xs font-bold text-teal-800">
              <span>Connected Telematics</span>
              <span class="w-1.5 h-1.5 rounded-full bg-teal-600"></span>
              <span>Zero Idle Machinery</span>
              <span class="w-1.5 h-1.5 rounded-full bg-teal-600"></span>
              <span>Sustainable Infrastructure</span>
            </div>
          </div>

        </div>

      </div>
    </section>

    <!-- ===== PROBLEM VS SOLUTION COMPARISON ===== -->
    <section class="py-16 sm:py-20 bg-slate-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="max-w-3xl mx-auto text-center space-y-3 mb-12 sm:mb-16">
          <div class="inline-flex items-center space-x-2 bg-slate-200 text-slate-700 rounded-full px-3.5 py-1 text-xs font-bold uppercase tracking-wider">
            <span>Market Transformation</span>
          </div>
          <h2 class="font-display text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            How BookMyEquipment Fixes a Broken Industry
          </h2>
          <p class="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
            India's heavy equipment sector has long been paralyzed by opaque intermediaries. Here is how our cloud platform replaces chaos with certainty.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <!-- The Old Broken Way -->
          <div class="bg-white border border-rose-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-5">
            <div class="flex items-center space-x-3 text-rose-600">
              <div class="w-9 h-9 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center">
                <i data-lucide="x" class="w-5 h-5 stroke-[2.5]"></i>
              </div>
              <h3 class="font-bold text-lg text-slate-900">The Fragmented Broker Model</h3>
            </div>
            <ul class="space-y-3.5 text-sm text-slate-600">
              <li class="flex items-start space-x-2.5">
                <i data-lucide="minus" class="w-4 h-4 text-rose-500 shrink-0 mt-0.5"></i>
                <span><strong>15%–25% Hidden Markups:</strong> Arbitrary broker commissions inflating project costs without adding any value.</span>
              </li>
              <li class="flex items-start space-x-2.5">
                <i data-lucide="minus" class="w-4 h-4 text-rose-500 shrink-0 mt-0.5"></i>
                <span><strong>40% Idle Machinery:</strong> Machine owners wait weeks for the next booking, facing mounting EMI pressures.</span>
              </li>
              <li class="flex items-start space-x-2.5">
                <i data-lucide="minus" class="w-4 h-4 text-rose-500 shrink-0 mt-0.5"></i>
                <span><strong>Unchecked Machine Breakdowns:</strong> No standardized fitness checks leading to sudden hydraulic failures on site.</span>
              </li>
              <li class="flex items-start space-x-2.5">
                <i data-lucide="minus" class="w-4 h-4 text-rose-500 shrink-0 mt-0.5"></i>
                <span><strong>Payment Default &amp; Wage Delays:</strong> Operators and owners wait months for physical check payments.</span>
              </li>
            </ul>
          </div>

          <!-- The BookMyEquipment Way -->
          <div class="bg-white border border-emerald-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-5">
            <div class="flex items-center space-x-3 text-emerald-600">
              <div class="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                <i data-lucide="check" class="w-5 h-5 stroke-[2.5]"></i>
              </div>
              <h3 class="font-bold text-lg text-slate-900">The BookMyEquipment Cloud Platform</h3>
            </div>
            <ul class="space-y-3.5 text-sm text-slate-600">
              <li class="flex items-start space-x-2.5">
                <i data-lucide="check" class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 stroke-[2.5]"></i>
                <span><strong>0% Platform Commission:</strong> Transparent standard pricing with direct contract terms and clear GST invoices.</span>
              </li>
              <li class="flex items-start space-x-2.5">
                <i data-lucide="check" class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 stroke-[2.5]"></i>
                <span><strong>20+ Monthly Utilization Days:</strong> Direct matching to active national highways, metro rail, and commercial sites.</span>
              </li>
              <li class="flex items-start space-x-2.5">
                <i data-lucide="check" class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 stroke-[2.5]"></i>
                <span><strong>200-Point Mechanical Fitness:</strong> Every machine verified for engine health, hydraulic pressure, and telematics.</span>
              </li>
              <li class="flex items-start space-x-2.5">
                <i data-lucide="check" class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 stroke-[2.5]"></i>
                <span><strong>Escrow Milestone Deposits:</strong> Instant, guaranteed bank transfers directly upon approved digital logsheets.</span>
              </li>
            </ul>
          </div>

        </div>

      </div>
    </section>

    <!-- ===== 3 CORE STAKEHOLDERS ===== -->
    <section class="py-16 sm:py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="max-w-3xl mx-auto text-center space-y-3 mb-12 sm:mb-16">
          <div class="inline-flex items-center space-x-2 bg-orange-50 border border-orange-200 text-orange-800 rounded-full px-3.5 py-1 text-xs font-bold uppercase tracking-wider">
            <span>Ecosystem Synergy</span>
          </div>
          <h2 class="font-display text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Built for Every Stakeholder on the Job Site
          </h2>
          <p class="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
            Our platform harmonizes the three indispensable pillars of construction logistics.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <!-- Stakeholder 1: Customer -->
          <div class="bg-gradient-to-br from-orange-50/50 via-white to-orange-50/20 border border-orange-200 rounded-3xl p-7 flex flex-col justify-between space-y-5 shadow-2xs hover:shadow-md transition-all">
            <div class="space-y-4">
              <div class="w-12 h-12 rounded-2xl bg-orange-100 text-brand-primary flex items-center justify-center font-bold">
                <i data-lucide="hard-hat" class="w-6 h-6"></i>
              </div>
              <h3 class="font-display text-xl font-bold text-slate-900">For Project Renters &amp; Contractors</h3>
              <p class="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                Access over 5,000+ verified excavators, mobile cranes, and transit mixers across 300+ Indian cities with instant dispatch, fuel audit logs, and 99.4% uptime.
              </p>
            </div>
            <a href="/customer" class="inline-flex items-center space-x-2 text-xs font-bold text-brand-primary hover:text-orange-700">
              <span>View Customer Portal &amp; Policies</span>
              <i data-lucide="arrow-right" class="w-4 h-4"></i>
            </a>
          </div>

          <!-- Stakeholder 2: Owner -->
          <div class="bg-gradient-to-br from-amber-50/50 via-white to-amber-50/20 border border-amber-200 rounded-3xl p-7 flex flex-col justify-between space-y-5 shadow-2xs hover:shadow-md transition-all">
            <div class="space-y-4">
              <div class="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                <i data-lucide="shield-check" class="w-6 h-6"></i>
              </div>
              <h3 class="font-display text-xl font-bold text-slate-900">For Machinery Owners &amp; Fleets</h3>
              <p class="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                Monetize idle machinery, secure 20+ working days monthly utilization, eliminate middlemen cuts, and receive milestone payments directly through escrow.
              </p>
            </div>
            <a href="/owner" class="inline-flex items-center space-x-2 text-xs font-bold text-amber-700 hover:text-amber-800">
              <span>View Owner Portal &amp; Earnings</span>
              <i data-lucide="arrow-right" class="w-4 h-4"></i>
            </a>
          </div>

          <!-- Stakeholder 3: Operator -->
          <div class="bg-gradient-to-br from-teal-50/50 via-white to-teal-50/20 border border-teal-200 rounded-3xl p-7 flex flex-col justify-between space-y-5 shadow-2xs hover:shadow-md transition-all">
            <div class="space-y-4">
              <div class="w-12 h-12 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold">
                <i data-lucide="award" class="w-6 h-6"></i>
              </div>
              <h3 class="font-display text-xl font-bold text-slate-900">For Certified Operators</h3>
              <p class="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                Stop hunting for unpredictable daily wage gigs. Get matched to verified machine assignments, earn transparent pay, and build verified digital experience records.
              </p>
            </div>
            <a href="/operator" class="inline-flex items-center space-x-2 text-xs font-bold text-teal-700 hover:text-teal-800">
              <span>View Operator Portal &amp; Pay</span>
              <i data-lucide="arrow-right" class="w-4 h-4"></i>
            </a>
          </div>

        </div>

      </div>
    </section>

    <!-- ===== CORE VALUES ===== -->
    <section class="py-16 sm:py-20 bg-slate-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="max-w-3xl mx-auto text-center space-y-3 mb-12">
          <div class="inline-flex items-center space-x-2 bg-slate-200 text-slate-700 rounded-full px-3.5 py-1 text-xs font-bold uppercase tracking-wider">
            <span>Operating Principles</span>
          </div>
          <h2 class="font-display text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Our Core Values
          </h2>
          <p class="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
            The code of ethics that guides our product development, field operations, and partner interactions.
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="bg-white border border-slate-200 rounded-2xl p-6 space-y-3 shadow-2xs">
            <div class="w-10 h-10 rounded-xl bg-orange-50 text-brand-primary flex items-center justify-center">
              <i data-lucide="scale" class="w-5 h-5"></i>
            </div>
            <h4 class="font-bold text-base text-slate-900">Radical Transparency</h4>
            <p class="text-xs text-slate-600 leading-relaxed">
              No hidden fees, no opaque brokerage cuts, and zero fine print. Clear pricing and auditable logsheets always.
            </p>
          </div>

          <div class="bg-white border border-slate-200 rounded-2xl p-6 space-y-3 shadow-2xs">
            <div class="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <i data-lucide="zap" class="w-5 h-5"></i>
            </div>
            <h4 class="font-bold text-base text-slate-900">Uptime Obsession</h4>
            <p class="text-xs text-slate-600 leading-relaxed">
              Every hour a machine sits idle or broken costs millions in civil contracts. We treat uptime as our core product metric.
            </p>
          </div>

          <div class="bg-white border border-slate-200 rounded-2xl p-6 space-y-3 shadow-2xs">
            <div class="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
              <i data-lucide="heart" class="w-5 h-5"></i>
            </div>
            <h4 class="font-bold text-base text-slate-900">Operator Dignity</h4>
            <p class="text-xs text-slate-600 leading-relaxed">
              Operators are the heartbeat of construction. We ensure fair compensation, insurance coverage, and professional respect.
            </p>
          </div>

          <div class="bg-white border border-slate-200 rounded-2xl p-6 space-y-3 shadow-2xs">
            <div class="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <i data-lucide="cpu" class="w-5 h-5"></i>
            </div>
            <h4 class="font-bold text-base text-slate-900">Ground-Level Tech</h4>
            <p class="text-xs text-slate-600 leading-relaxed">
              We design software for real-world construction sites: offline-first capabilities, low-bandwidth optimization, and vernacular support.
            </p>
          </div>
        </div>

      </div>
    </section>

    <!-- ===== CALL TO ACTION BANNER ===== -->
    <section class="py-16 sm:py-20 bg-gradient-to-r from-orange-600 via-brand-primary to-amber-500 text-white relative overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div class="space-y-3 max-w-2xl text-center md:text-left">
          <span class="text-xs font-extrabold uppercase tracking-widest bg-white/20 px-3.5 py-1 rounded-full inline-block">
            Power Your Infrastructure
          </span>
          <h2 class="font-display text-3xl sm:text-4xl font-black tracking-tight leading-tight">
            Ready to Experience Transparent Heavy Equipment Logistics?
          </h2>
          <p class="text-orange-100 text-sm sm:text-base leading-relaxed">
            Join thousands of contractors and machine owners who trust BookMyEquipment for verified rentals, guaranteed uptime, and zero middleman commissions.
          </p>
        </div>

        <div class="flex flex-wrap items-center gap-3 shrink-0">
          <a href="/#fleet" class="px-6 py-3.5 rounded-xl bg-white text-orange-600 font-extrabold text-xs uppercase tracking-wider shadow-lg hover:bg-orange-50 transition-all hover:scale-105 active:scale-95">
            Book Heavy Equipment
          </a>
          <a href="/owner" class="px-6 py-3.5 rounded-xl bg-orange-700/80 hover:bg-orange-800 border border-white/30 text-white font-extrabold text-xs uppercase tracking-wider transition-all hover:scale-105 active:scale-95">
            List Your Machinery
          </a>
        </div>
      </div>
    </section>

  </main>

  <!-- ===== FOOTER ===== -->
  <footer id="footer-section" class="bg-white text-slate-600 text-xs py-14 border-t border-slate-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-12">
        <div class="lg:col-span-4 space-y-4">
          <a href="/" class="flex items-center space-x-2.5 group">
            <div class="bg-brand-primary px-3 py-1.5 rounded-[6px] shadow-sm">
              <span class="text-white font-black text-xl tracking-wider" style="font-family:'Poppins',Impact,sans-serif;">BME</span>
            </div>
            <div class="border-l border-slate-200 pl-3">
              <span class="text-[9px] tracking-[0.22em] text-brand-primary uppercase font-bold block">Heavy Equipment</span>
              <div class="text-sm font-bold text-slate-900 tracking-tight">BookMyEquipment</div>
            </div>
          </a>
          <p class="text-slate-600 text-sm max-w-sm leading-relaxed">
            India&#39;s #1 B2B heavy equipment rental and listing platform. Zero middlemen. Complete transparency for every stakeholder.
          </p>
        </div>
        <div class="lg:col-span-2">
          <h4 class="text-brand-primary font-bold text-xs uppercase tracking-wider mb-4">Company</h4>
          <ul class="space-y-2.5">
            <li><a href="/about" class="footer-link font-bold text-slate-900">About Us</a></li>
            <li><a href="/#ecosystem" class="footer-link">How It Works</a></li>
            <li><a href="#" class="footer-link">Careers</a></li>
            <li><a href="#" class="footer-link">Press &amp; Media</a></li>
            <li><a href="#" class="footer-link">Blog</a></li>
            <li><a href="/#footer-section" class="footer-link">Contact Us</a></li>
          </ul>
        </div>
        <div class="lg:col-span-2">
          <h4 class="text-brand-primary font-bold text-xs uppercase tracking-wider mb-4">Legal</h4>
          <ul class="space-y-2.5">
            <li><a href="/customer" class="footer-link">Fleet Guidelines</a></li>
            <li><a href="/operator" class="footer-link">Operator Rules</a></li>
            <li><a href="/owner" class="footer-link">Privacy Policy</a></li>
            <li><a href="/customer" class="footer-link">Terms &amp; Conditions</a></li>
            <li><a href="#" class="footer-link">Refund Policy</a></li>
            <li><a href="#" class="footer-link">GST &amp; Invoicing Guide</a></li>
          </ul>
        </div>
        <div class="lg:col-span-4 space-y-3.5">
          <h4 class="text-brand-primary font-bold text-xs uppercase tracking-wider">Get the App</h4>
          <p class="text-slate-600 text-xs leading-relaxed">Available on iOS and Android. Free to download, transparent pricing.</p>
          
          <!-- For Customers -->
          <div class="space-y-1.5 pt-1">
            <span class="inline-block text-[11px] font-bold text-brand-primary uppercase tracking-wider">For Customers</span>
            <div class="flex flex-wrap items-center gap-2.5">
              ${BADGE_PLAY('h-9')}
              ${BADGE_APP('h-9')}
            </div>
          </div>

          <!-- For Fleet Owners & Operators -->
          <div class="space-y-1.5 pt-1">
            <span class="inline-block text-[11px] font-bold text-brand-primary uppercase tracking-wider">For Fleet Owners &amp; Operators</span>
            <div class="flex flex-wrap items-center gap-2.5">
              ${BADGE_PLAY('h-9')}
              ${BADGE_APP('h-9')}
            </div>
          </div>

          <div class="pt-2 text-xs text-slate-500 space-y-1">
            <p class="flex items-center space-x-1.5">
              <i data-lucide="mail" class="w-3.5 h-3.5 text-brand-primary"></i>
              <span>hello@bookmyequipment.in</span>
            </p>
            <p class="flex items-center space-x-1.5">
              <i data-lucide="phone" class="w-3.5 h-3.5 text-brand-primary"></i>
              <span>+91 80000 00000</span>
            </p>
          </div>
        </div>
      </div>
      <div class="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-slate-500 text-[11px] gap-2">
        <p>&copy; 2026 BookMyEquipment. All rights reserved. Made with &#x2764; in India.</p>
        <div class="flex items-center space-x-4">
          <span class="flex items-center space-x-1 text-emerald-600 font-semibold">
            <i data-lucide="shield-check" class="w-3.5 h-3.5"></i>
            <span>SSL 256-bit Encrypted</span>
          </span>
          <span>&bull;</span>
          <span>GST Registered</span>
        </div>
      </div>
    </div>
  </footer>

  <script>
    if (typeof lucide !== 'undefined') lucide.createIcons();

    // Mobile menu toggle
    const toggleBtn = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    toggleBtn?.addEventListener('click', () => {
      mobileMenu?.classList.toggle('hidden');
    });
  </script>
</body>
</html>
`;

fs.writeFileSync(path.join(__dirname, 'about.html'), html, 'utf8');

// Directory index for clean URLs (about/index.html) so Live Server never errors with "Cannot GET /about"
const aboutDir = path.join(__dirname, 'about');
if (!fs.existsSync(aboutDir)) {
  fs.mkdirSync(aboutDir, { recursive: true });
}
fs.writeFileSync(path.join(aboutDir, 'index.html'), html, 'utf8');

console.log('Successfully generated about.html and about/index.html! Bytes:', Buffer.byteLength(html));
