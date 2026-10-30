// build-roles.cjs – Generates dedicated customer.html, owner.html, and operator.html
// Features:
// 1. FAQs: Removed search bar, category pills, and "Need personal guidance?" callout box (clean left title, right accordion).
// 2. Pictorial representation: Replaced 4 separate chart cards with 1 unified comparative horizontal bar graph (4 parameters on Y-axis, Green vs Red bars on X-axis with hover highlights).
// 3. Estimator: For owner and operator, aligned "Calculate" button in the same row as machine model and city dropdowns (reduced widths, clean desktop 1-row layout).
const fs = require('fs');
const path = require('path');

const ROLES = [
  {
    key: 'customer',
    file: 'customer.html',
    jsonPath: './src/data/roles/customer.json',
    faqRoleTitle: 'Customers',
    theme: {
      colorName: 'orange',
      hex: '#F97316',
      selection: 'selection:bg-orange-500 selection:text-white',
      logoBg: 'bg-brand-primary',
      logoSubText: 'text-brand-primary',
      portalBadge: 'bg-orange-50 text-orange-700 border-orange-200',
      badgeText: 'Customer Portal',
      navHover: 'hover:text-orange-600',
      ctaBtn: 'bg-orange-600 hover:bg-orange-700 text-white shadow-sm shadow-orange-600/25',
      outlineBtn: 'border-orange-600 hover:border-orange-700 text-orange-700 hover:bg-orange-50',
      ambientGlow: 'bg-orange-100/50',
      heroBadge: 'bg-orange-50 border-orange-200 text-orange-800',
      heroBadgeDot: 'bg-orange-600',
      searchFocus: 'focus:ring-orange-500 focus:border-orange-500',
      quickLinkHover: 'hover:border-orange-500 hover:text-orange-600',
      quickLinkIcon: 'text-orange-600',
      quickLinkApp: 'bg-orange-50 border-orange-200 hover:bg-orange-100 text-orange-800',
      eyebrow: 'text-orange-600',
      catBtnActive: 'bg-orange-600 text-white shadow-sm shadow-orange-600/25 active-cat',
      faqHover: 'group-hover:text-orange-600',
      noFaqBtn: 'bg-orange-600 hover:bg-orange-700 text-white',
      bannerGlow: 'bg-orange-500/20',
      bannerBadge: 'bg-orange-500/20 border-orange-500/30 text-orange-300',
      bannerHighlight: 'text-orange-400',
      bannerIcons: 'text-orange-400',
      mockupGlow: 'bg-orange-500/25',
      modalIcon: 'bg-orange-100 text-orange-600',
      modalFocus: 'focus:ring-orange-500 focus:border-orange-500',
      modalBtn: 'bg-orange-600 hover:bg-orange-700 text-white shadow-sm shadow-orange-600/25',
      modalCheck: 'bg-orange-100 text-orange-600',
      footerLogo: 'bg-brand-primary',
      footerHover: 'hover:text-orange-600',
      mockup: '/images/hero_phone_mockup.png',
      mockupAlt: 'BookMyEquipment Customer Mobile App'
    },
    customerEstimator: {
      tag: 'Approximate Cost Estimator',
      heading: 'Plan your equipment hire',
      subheading: 'Explore equipment options and example costs. Compare hire and purchase cash outflows with transparent, approximate figures.',
      machines: [
        { name: 'JCB 3DX Backhoe Loader', monthlyRent: 130000, buyPrice: 3600000, downPayment: 720000, monthlyEmi: 58000, monthlyMaint: 22000 },
        { name: 'Hydraulic Excavator (20-Ton)', monthlyRent: 250000, buyPrice: 6500000, downPayment: 1300000, monthlyEmi: 105000, monthlyMaint: 38000 },
        { name: 'Mobile Hydra Crane (14-Ton)', monthlyRent: 150000, buyPrice: 3800000, downPayment: 760000, monthlyEmi: 62000, monthlyMaint: 24000 },
        { name: 'Transit Mixer (7 Cu.m)', monthlyRent: 170000, buyPrice: 4200000, downPayment: 840000, monthlyEmi: 68000, monthlyMaint: 26000 },
        { name: 'Vibratory Soil Compactor (10-Ton)', monthlyRent: 140000, buyPrice: 3400000, downPayment: 680000, monthlyEmi: 55000, monthlyMaint: 20000 },
        { name: 'Wheel Loader (3-Ton)', monthlyRent: 180000, buyPrice: 4600000, downPayment: 920000, monthlyEmi: 74000, monthlyMaint: 28000 },
        { name: 'Mini Excavator (3-Ton)', monthlyRent: 110000, buyPrice: 2800000, downPayment: 560000, monthlyEmi: 45000, monthlyMaint: 18000 },
        { name: 'Concrete Boom Pump (36m)', monthlyRent: 380000, buyPrice: 9500000, downPayment: 1900000, monthlyEmi: 155000, monthlyMaint: 52000 },
        { name: 'Tipper / Dumper Truck (16 Cu.m)', monthlyRent: 125000, buyPrice: 3200000, downPayment: 640000, monthlyEmi: 52000, monthlyMaint: 20000 },
        { name: 'Small Excavator (8.5T)', monthlyRent: 115000, buyPrice: 3000000, downPayment: 600000, monthlyEmi: 48000, monthlyMaint: 19000 },
        { name: 'Self-Loading Mixer (4.0 m³)', monthlyRent: 135000, buyPrice: 3800000, downPayment: 760000, monthlyEmi: 61000, monthlyMaint: 24000 },
        { name: 'Tandem Roller (3.0 - 9.0T)', monthlyRent: 82000, buyPrice: 2200000, downPayment: 440000, monthlyEmi: 35000, monthlyMaint: 14000 },
        { name: 'Pneumatic Roller (14 - 24T)', monthlyRent: 110000, buyPrice: 3100000, downPayment: 620000, monthlyEmi: 50000, monthlyMaint: 19000 },
        { name: 'Generator (125 kVA)', monthlyRent: 65000, buyPrice: 1600000, downPayment: 320000, monthlyEmi: 26000, monthlyMaint: 10000 }
      ],
      durations: [
        { label: '1 Month', months: 1 },
        { label: '3 Months', months: 3 },
        { label: '6 Months', months: 6 },
        { label: '12 Months', months: 12 }
      ]
    },
    whySection: {
      id: 'rent-vs-buy-section',
      navText: 'Why Rent?',
      quickLinkText: 'Why Rent vs. Buy',
      tag: 'For Construction Contractors',
      title: 'Why Renting Beats Buying Every Time',
      subtitle: 'Renting keeps your cash in the bank and frees you from repair headaches. Buying locks up your money in heavy iron.',
      positiveCol: 'RENTING ON APP',
      negativeCol: 'BUYING MACHINE',
      rows: [
        { factor: 'Upfront Cash', positive: 'Zero down payment — start work immediately', negative: 'Heavy down payment locked in the machine' },
        { factor: 'Repairs & Service', positive: '100% free with 3-hour mechanic arrival', negative: 'All repair bills, spares & mechanics on you' },
        { factor: 'Getting to Site', positive: 'Reaches your site in 2 to 4 hours on trailer', negative: 'Weeks of loan approval and transport delays' },
        { factor: 'When Work Stops', positive: 'Stop paying the day your project finishes', negative: 'Heavy monthly EMI even when sitting idle' },
        { factor: 'Switching Machines', positive: 'Switch from JCB to Excavator anytime on app', negative: 'Stuck with one machine model forever' }
      ],
      whyCallout: {
        badge: 'The Bottom Line',
        headline: 'Preserve 95% of your bank capital, enjoy 100% free site repair coverage, and never pay for idle machines.',
        description: 'Eliminate multi-lakh down payments, unexpected breakdown losses, and heavy off-season EMIs. Get verified machinery delivered on trailer directly to your project site on demand.',
        points: [
          'Zero down payment & zero capital lock-in',
          '3-hour on-site mechanic arrival SLA',
          'Return or switch machinery anytime without penalties'
        ],
        highlight: 'Zero down payment • 3h mechanic SLA • Pay only for work'
      }
    },
    downloadBanner: {
      tag: 'Get the Customer App',
      badge: 'Equipment Hirers Official App',
      title: 'Hire & Track Heavy Machinery from Your Phone',
      description: 'Book verified excavators, backhoes, and cranes in under 2 minutes. Track trailer transit with live GPS, approve digital log sheets, and get 24/7 on-site mechanic dispatch.',
      features: [
        { icon: 'shield-check', text: '100% Escrow Protection' },
        { icon: 'map-pin', text: 'Live GPS Telemetry' },
        { icon: 'clock', text: '3-Hour Mechanic SLA' }
      ]
    }
  },
  {
    key: 'owner',
    file: 'owner.html',
    jsonPath: './src/data/roles/owner.json',
    faqRoleTitle: 'Machine Owners',
    theme: {
      colorName: 'amber',
      hex: '#F59E0B',
      selection: 'selection:bg-amber-500 selection:text-white',
      logoBg: 'bg-amber-500',
      logoSubText: 'text-amber-500',
      portalBadge: 'bg-amber-50 text-amber-700 border-amber-200',
      badgeText: 'Machine Owner Portal',
      navHover: 'hover:text-amber-600',
      ctaBtn: 'bg-amber-500 hover:bg-amber-600 text-white shadow-sm shadow-amber-500/25',
      outlineBtn: 'border-amber-500 hover:border-amber-600 text-amber-700 hover:bg-amber-50',
      ambientGlow: 'bg-amber-100/50',
      heroBadge: 'bg-amber-50 border-amber-200 text-amber-800',
      heroBadgeDot: 'bg-amber-500',
      searchFocus: 'focus:ring-amber-500 focus:border-amber-500',
      quickLinkHover: 'hover:border-amber-500 hover:text-amber-600',
      quickLinkIcon: 'text-amber-600',
      quickLinkApp: 'bg-amber-50 border-amber-200 hover:bg-amber-100 text-amber-800',
      eyebrow: 'text-amber-600',
      catBtnActive: 'bg-amber-500 text-white shadow-sm shadow-amber-500/25 active-cat',
      faqHover: 'group-hover:text-amber-600',
      noFaqBtn: 'bg-amber-500 hover:bg-amber-600 text-white',
      bannerGlow: 'bg-amber-500/20',
      bannerBadge: 'bg-amber-500/20 border-amber-500/30 text-amber-300',
      bannerHighlight: 'text-amber-400',
      bannerIcons: 'text-amber-400',
      mockupGlow: 'bg-amber-500/25',
      modalIcon: 'bg-amber-100 text-amber-600',
      modalFocus: 'focus:ring-amber-500 focus:border-amber-500',
      modalBtn: 'bg-amber-500 hover:bg-amber-600 text-white shadow-sm shadow-amber-500/25',
      modalCheck: 'bg-amber-100 text-amber-600',
      footerLogo: 'bg-amber-500',
      footerHover: 'hover:text-amber-600',
      mockup: '/images/idle.png',
      mockupAlt: 'BookMyEquipment Owner Idle & Earnings Dashboard'
    },
    earningsSection: {
      tag: 'Machine Earnings Estimator',
      heading: 'See How Much Your Machinery Can Earn',
      subheading: 'Choose your machine model and city to see how much money you can take home each month with zero broker cuts.',
      labelVehicle: 'Select Your Machine Model',
      vehicles: [
        { name: 'JCB 3DX Backhoe Loader', monthlyEarning: 130000 },
        { name: 'Hydraulic Excavator (20-Ton)', monthlyEarning: 250000 },
        { name: 'Mobile Hydra Crane (14-Ton)', monthlyEarning: 150000 },
        { name: 'Transit Mixer (7 Cu.m)', monthlyEarning: 170000 },
        { name: 'Vibratory Soil Compactor (10-Ton)', monthlyEarning: 140000 },
        { name: 'Wheel Loader (3-Ton)', monthlyEarning: 180000 },
        { name: 'Mini Excavator (3-Ton)', monthlyEarning: 110000 },
        { name: 'Concrete Boom Pump (36m)', monthlyEarning: 380000 },
        { name: 'Tipper / Dumper Truck (16 Cu.m)', monthlyEarning: 125000 }
      ],
      cities: [
        { name: 'Hyderabad', multiplier: 1.0 },
        { name: 'Bengaluru', multiplier: 1.08 },
        { name: 'Mumbai - MMR', multiplier: 1.15 },
        { name: 'Delhi NCR', multiplier: 1.12 },
        { name: 'Pune', multiplier: 1.05 },
        { name: 'Chennai', multiplier: 1.04 },
        { name: 'Ahmedabad', multiplier: 0.98 },
        { name: 'Kolkata', multiplier: 0.96 }
      ],
      resultPrefix: 'Earn up to',
      resultSuffix: '/month',
      disclaimer: '*Based on standard 20+ working days a month. Earnings may vary based on site requirements and machine upkeep.'
    },
    whySection: {
      id: 'why-list-section',
      navText: 'Why List?',
      quickLinkText: 'Why List with Us',
      tag: 'For Machine & Fleet Owners',
      title: 'Why Listing on the Marketplace Beats Offline Brokers',
      subtitle: 'Keep your fleet busy with direct customer bookings. No middlemen taking cuts or delaying your payments.',
      positiveCol: 'BOOKMYEQUIPMENT APP',
      negativeCol: 'TRADITIONAL BROKERS',
      rows: [
        { factor: 'Broker Fees', positive: '0% broker commission — keep 100% of your rate', negative: '15% to 25% taken away by offline brokers' },
        { factor: 'Monthly Work Days', positive: '20+ active working days every single month', negative: 'Weeks of idle parking waiting for broker calls' },
        { factor: 'Rental Rates', positive: 'You set your own fixed rate in the app', negative: 'Brokers force heavy discounts on you' },
        { factor: 'Getting Paid', positive: 'Money in your bank account every Monday', negative: 'Months of chasing, excuses, and bad debts' },
        { factor: 'Machine Safety', positive: 'Free live GPS & remote engine shutoff on phone', negative: 'Zero visibility once machine leaves your yard' }
      ],
      whyCallout: {
        badge: 'Fleet Owner Advantage',
        headline: 'Keep 100% of your rental rates with zero broker cuts, get 20+ active work days every month, and receive guaranteed payouts every Monday.',
        description: 'Connect directly with verified infrastructure contractors nationwide. Monitor machine run-hours and diesel levels with complimentary live GPS, and eliminate bad debts with automated weekly bank payouts.',
        points: [
          'Keep 100% of your listed rate — zero broker cuts',
          'Guaranteed escrow payouts deposited every Monday',
          'Free live GPS tracking & remote engine immobilizer'
        ],
        highlight: '0% broker commission • Direct bank pay • Free live GPS'
      }
    },
    downloadBanner: {
      tag: 'Get the Fleet Owner App',
      badge: 'Fleet Owners Partner App',
      title: 'Manage Your Machinery Fleet & Payouts 24/7',
      description: 'List your machines in seconds, accept direct hirer requests, monitor engine run-hours in real time, and receive your rental payouts directly into your bank account every Monday.',
      features: [
        { icon: 'shield-check', text: '0% Broker Cuts' },
        { icon: 'map-pin', text: 'Remote Engine Shutoff' },
        { icon: 'wallet', text: 'Guaranteed Monday Payouts' }
      ]
    }
  },
  {
    key: 'operator',
    file: 'operator.html',
    jsonPath: './src/data/roles/operator.json',
    faqRoleTitle: 'Certified Operators',
    theme: {
      colorName: 'teal',
      hex: '#0D9488',
      selection: 'selection:bg-teal-600 selection:text-white',
      logoBg: 'bg-teal-600',
      logoSubText: 'text-teal-600',
      portalBadge: 'bg-teal-50 text-teal-800 border-teal-200',
      badgeText: 'Certified Operator Portal',
      navHover: 'hover:text-teal-600',
      ctaBtn: 'bg-teal-600 hover:bg-teal-700 text-white shadow-sm shadow-teal-600/25',
      outlineBtn: 'border-teal-600 hover:border-teal-700 text-teal-700 hover:bg-teal-50',
      ambientGlow: 'bg-teal-100/50',
      heroBadge: 'bg-teal-50 border-teal-200 text-teal-800',
      heroBadgeDot: 'bg-teal-600',
      searchFocus: 'focus:ring-teal-500 focus:border-teal-500',
      quickLinkHover: 'hover:border-teal-500 hover:text-teal-600',
      quickLinkIcon: 'text-teal-600',
      quickLinkApp: 'bg-teal-50 border-teal-200 hover:bg-teal-100 text-teal-800',
      eyebrow: 'text-teal-600',
      catBtnActive: 'bg-teal-600 text-white shadow-sm shadow-teal-600/25 active-cat',
      faqHover: 'group-hover:text-teal-600',
      noFaqBtn: 'bg-teal-600 hover:bg-teal-700 text-white',
      bannerGlow: 'bg-teal-500/20',
      bannerBadge: 'bg-teal-500/20 border-teal-500/30 text-teal-300',
      bannerHighlight: 'text-teal-400',
      bannerIcons: 'text-teal-400',
      mockupGlow: 'bg-teal-500/25',
      modalIcon: 'bg-teal-100 text-teal-600',
      modalFocus: 'focus:ring-teal-500 focus:border-teal-500',
      modalBtn: 'bg-teal-600 hover:bg-teal-700 text-white shadow-sm shadow-teal-600/25',
      modalCheck: 'bg-teal-100 text-teal-600',
      footerLogo: 'bg-teal-600',
      footerHover: 'hover:text-teal-600',
      mockup: '/images/earnings.png',
      mockupAlt: 'BookMyEquipment Operator Earnings & Payout Dashboard'
    },
    earningsSection: {
      tag: 'Operator Pay Estimator',
      heading: 'Calculate Your Monthly Take-Home Pay',
      subheading: 'Select your machine specialty and city to see how much you can earn every month with on-time bank transfers.',
      labelVehicle: 'Select Your Operating Specialty',
      vehicles: [
        { name: 'JCB / Backhoe Loader Operator', monthlyEarning: 28000 },
        { name: 'Heavy Excavator (20T+) Specialist', monthlyEarning: 38000 },
        { name: 'Mobile Hydra Crane Operator', monthlyEarning: 32000 },
        { name: 'Concrete Boom Pump Operator', monthlyEarning: 42000 },
        { name: 'Transit Mixer Driver-Operator', monthlyEarning: 26000 },
        { name: 'Vibratory Soil Compactor Operator', monthlyEarning: 25000 },
        { name: 'Wheel Loader Operator', monthlyEarning: 31000 },
        { name: 'Mini Excavator Operator', monthlyEarning: 27000 },
        { name: 'Tower Crane Operator', monthlyEarning: 45000 }
      ],
      cities: [
        { name: 'Hyderabad', multiplier: 1.0 },
        { name: 'Bengaluru', multiplier: 1.08 },
        { name: 'Mumbai - MMR', multiplier: 1.15 },
        { name: 'Delhi NCR', multiplier: 1.12 },
        { name: 'Pune', multiplier: 1.05 },
        { name: 'Chennai', multiplier: 1.04 },
        { name: 'Ahmedabad', multiplier: 0.98 },
        { name: 'Kolkata', multiplier: 0.96 }
      ],
      resultPrefix: 'Earn up to',
      resultSuffix: '/month',
      disclaimer: '*Based on standard 8-hour duty shifts across 20+ working days. Overtime and site food allowances are extra.'
    },
    whySection: {
      id: 'why-join-section',
      navText: 'Why Join?',
      quickLinkText: 'Why Join as Operator',
      tag: 'For Heavy Machine Operators',
      title: 'Why Working via App Beats Daily-Wage Contractors',
      subtitle: 'Get regular site work with respected contractors. Full salary sent to your bank account with zero middleman deductions.',
      positiveCol: 'BOOKMYEQUIPMENT APP',
      negativeCol: 'DAILY-WAGE CONTRACTORS',
      rows: [
        { factor: 'Regular Work', positive: 'Steady monthly jobs on verified project sites', negative: 'Standing at chowks waiting for daily calls' },
        { factor: 'Full Salary', positive: 'Direct bank transfer with zero thekedar cuts', negative: 'Contractors take arbitrary commission cuts' },
        { factor: 'On-Time Payouts', positive: 'Money in your bank account on 1st & 16th', negative: 'Delayed cash payments and endless excuses' },
        { factor: 'Duty Hours', positive: 'Fixed 8-hour shifts with paid overtime', negative: '14+ hours of work with zero overtime pay' },
        { factor: 'Medical & Safety', positive: 'Free ₹5,00,000 accident & hospital cover', negative: 'Zero compensation if injury occurs on site' }
      ],
      whyCallout: {
        badge: 'Operator Security',
        headline: 'Get steady verified site jobs, 100% full salary directly in your bank account, and free ₹5 Lakh accident insurance while on duty.',
        description: 'Say goodbye to waiting at labour chowks and unfair thekedar commission cuts. Work fixed 8-hour shifts on tier-1 construction sites with guaranteed bi-monthly direct bank transfers and verified employer credentials.',
        points: [
          'Direct salary transfers on the 1st & 16th of every month',
          'Fixed 8-hour duty shifts with paid overtime tracking',
          'Free ₹5,00,000 on-duty accident & medical insurance'
        ],
        highlight: 'Zero thekedar cuts • Paid overtime • Digital skill badge'
      }
    },
    downloadBanner: {
      tag: 'Get the Operator App',
      badge: 'Certified Operators Official App',
      title: 'Find Verified Construction Jobs & Track Pay',
      description: 'Browse top-paying machine operating jobs near your city, punch in daily duty hours digitally, record approved overtime, and get your salary sent directly to your bank account.',
      features: [
        { icon: 'shield-check', text: 'Zero Middleman Cuts' },
        { icon: 'clock', text: '8-Hour Duty Shifts' },
        { icon: 'heart-pulse', text: 'Free ₹5L Accident Cover' }
      ]
    }
  }
];

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

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// ── CUSTOMER MATURE ESTIMATION SECTION ──
function renderCustomerEstimator(config, theme) {
  const ce = config.customerEstimator;
  if (!ce) return '';

  const machineOptionsHtml = ce.machines.map((m, i) => `
    <option value="${escapeHtml(m.name)}" 
      data-rent="${m.monthlyRent}" 
      data-buy-price="${m.buyPrice}" 
      data-down="${m.downPayment}" 
      data-emi="${m.monthlyEmi}" 
      data-maint="${m.monthlyMaint}" 
      ${i === 0 ? 'selected' : ''}>
      ${escapeHtml(m.name)}
    </option>
  `).join('');

  return `
    <!-- ===== CUSTOMER MATURE RENT VS. BUY ESTIMATION SECTION ===== -->
    <section id="estimation-section" class="pt-28 sm:pt-32 pb-16 sm:pb-20 bg-gradient-to-b from-slate-50 via-white to-white scroll-mt-20">
      <div class="customer-planner">
        
        <!-- Planner Heading -->
        <div class="customer-planner-heading">
          <div class="max-w-3xl">
            <p class="enquiry-eyebrow">For Construction Contractors</p>
            <h1>Plan your equipment hire</h1>
            <p>Explore equipment options and example costs. Compare hire and purchase cash outflows with transparent, approximate figures.</p>
          </div>
        </div>

        <!-- 2-Column Responsive Estimator -->
        <div class="customer-estimator">
          
          <!-- Column 1: Inputs & Project Requirements -->
          <div class="estimate-inputs">
            <h2>Project requirements</h2>
            
            <div class="estimate-field">
              <label for="cust-machine-select">Select Heavy Equipment Model</label>
              <select id="cust-machine-select">
                ${machineOptionsHtml}
              </select>
            </div>

            <div class="estimate-fields">
              <div class="estimate-field">
                <label for="cust-duration-select">Project duration</label>
                <input id="cust-duration-select" type="number" min="1" max="3650" step="1" value="3" inputmode="numeric">
              </div>
              <div class="estimate-field">
                <label for="cust-duration-unit">Duration unit</label>
                <select id="cust-duration-unit">
                  <option value="day">Days</option>
                  <option value="week">Weeks</option>
                  <option value="month" selected>Months</option>
                </select>
              </div>
            </div>

            <p id="estimate-source" class="estimate-help">Example inputs only. Replace them with your supplier and finance quotes.</p>

            <details class="estimate-assumptions" open>
              <summary>Edit comparison amounts</summary>
              <div class="estimate-fields">
                <div class="estimate-field">
                  <label for="cust-rate">Rental rate (INR)</label>
                  <input id="cust-rate" type="number" min="0.01" max="100000000" step="0.01" value="130000" inputmode="decimal">
                </div>
                <div class="estimate-field">
                  <label for="cust-rate-unit">Rental rate unit</label>
                  <select id="cust-rate-unit">
                    <option value="day">Per day</option>
                    <option value="week">Per week</option>
                    <option value="month" selected>Per month</option>
                  </select>
                </div>
                <div class="estimate-field">
                  <label for="cust-deposit">Refundable rental deposit (INR)</label>
                  <input id="cust-deposit" type="number" min="0" max="100000000" step="0.01" value="0" inputmode="decimal">
                </div>
                <div class="estimate-field">
                  <label for="cust-rental-extras">Other rental costs (INR)</label>
                  <input id="cust-rental-extras" type="number" min="0" max="100000000" step="0.01" value="0" inputmode="decimal">
                </div>
                <div class="estimate-field">
                  <label for="cust-down">Purchase down payment (INR)</label>
                  <input id="cust-down" type="number" min="0" max="100000000" step="0.01" value="720000" inputmode="decimal">
                </div>
                <div class="estimate-field">
                  <label for="cust-emi">Monthly loan payment (INR)</label>
                  <input id="cust-emi" type="number" min="0" max="100000000" step="0.01" value="58000" inputmode="decimal">
                </div>
                <div class="estimate-field">
                  <label for="cust-maint">Monthly ownership upkeep (INR)</label>
                  <input id="cust-maint" type="number" min="0" max="100000000" step="0.01" value="22000" inputmode="decimal">
                </div>
                <div class="estimate-field">
                  <label for="cust-buy-extras">Other purchase costs (INR)</label>
                  <input id="cust-buy-extras" type="number" min="0" max="100000000" step="0.01" value="0" inputmode="decimal">
                </div>
              </div>
            </details>
            <p id="estimate-error" class="field-error text-red-600 text-xs font-semibold mt-2" role="alert" hidden></p>
          </div>

          <!-- Column 2: Results & Comparison Cards -->
          <div class="estimate-results">
            <h2>Cash outflow comparison (Approximate)</h2>
            <p class="estimate-help">Illustrative calculation with approximate values, not a live price or booking confirmation.</p>
            
            <div class="estimate-result-card">
              <h3>Rental cash outflow (Approx.)</h3>
              <strong id="cust-rent-total" class="text-emerald-700">—</strong>
              <dl>
                <div><dt>Base rental</dt><dd id="cust-base-rental">—</dd></div>
                <div><dt>Refundable deposit</dt><dd id="cust-deposit-total">—</dd></div>
                <div><dt>Other rental costs</dt><dd id="cust-rental-extras-total">—</dd></div>
              </dl>
            </div>

            <div class="estimate-result-card">
              <h3>Purchase cash outflow (Approx.)</h3>
              <strong id="cust-buy-total" class="text-rose-700">—</strong>
              <dl>
                <div><dt>Down payment</dt><dd id="cust-buy-down">—</dd></div>
                <div><dt>Loan payments during project</dt><dd id="cust-buy-emi">—</dd></div>
                <div><dt>Ownership upkeep during project</dt><dd id="cust-buy-maint">—</dd></div>
                <div><dt>Other purchase costs</dt><dd id="cust-buy-extras-total">—</dd></div>
              </dl>
            </div>

            <p class="estimate-conclusion" role="status" aria-live="polite" aria-atomic="true">
              <span id="estimate-verdict">Enter amounts to compare cash outflows.</span> 
              <strong id="estimate-difference" class="font-extrabold ml-1"></strong>
            </p>
          </div>

        </div>

        <!-- Methodology Accordion -->
        <details class="estimate-method">
          <summary>How this comparison works</summary>
          <ul>
            <li>A week is seven days and a comparison month is thirty days. Rental rates are prorated; actual minimum hire periods may differ.</li>
            <li>Loan payments and ownership upkeep are counted in whole months, rounding partial months up.</li>
            <li>Rental cash outflow includes the deposit before any refund. Add transport, fuel, operator, tax and other agreed costs to the relevant extra-cost field.</li>
            <li>Purchase figures cover project-period cash outflow only. They exclude remaining loan balances, resale value, depreciation and tax benefits, so they are not a total cost of ownership comparison.</li>
            <li>Machine availability, operator inclusion, deposit, cancellation and replacement terms must be confirmed in your quote.</li>
          </ul>
        </details>

      </div>
    </section>`;
}

// ── OWNER & OPERATOR ESTIMATION SECTION (Aligned in 1 Single Row) ──
function renderOwnerOrOperatorEstimator(config, theme) {
  const es = config.earningsSection;
  if (!es) return '';

  const vehicleOptionsHtml = es.vehicles.map((v, i) => `
    <option value="${escapeHtml(v.name)}" data-rate="${v.monthlyEarning}" ${i === 0 ? 'selected' : ''}>
      ${escapeHtml(v.name)}
    </option>
  `).join('');

  const cityOptionsHtml = es.cities.map((c, i) => `
    <option value="${escapeHtml(c.name)}" data-mult="${c.multiplier}" ${i === 0 ? 'selected' : ''}>
      ${escapeHtml(c.name)}
    </option>
  `).join('');

  const defaultVehicle = es.vehicles[0];
  const defaultCity = es.cities[0];
  const initialEarning = Math.round(defaultVehicle.monthlyEarning * defaultCity.multiplier);

  const actionText = config.key === 'owner' ? 'Download App to List Fleet' : 'Download App to Join as Operator';

  return `
    <!-- ===== ${config.key.toUpperCase()} ESTIMATION SECTION ===== -->
    <section id="estimation-section" class="pt-28 sm:pt-32 pb-16 sm:pb-20 bg-gradient-to-b from-slate-50 via-white to-white scroll-mt-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <!-- Header -->
        <div class="space-y-3">
          <div class="max-w-3xl space-y-2">
            <div class="inline-flex items-center space-x-2 ${theme.heroBadge} rounded-full px-3.5 py-1 text-xs font-bold tracking-wide uppercase">
              <span class="w-2 h-2 rounded-full ${theme.heroBadgeDot} animate-pulse"></span>
              <span>${escapeHtml(es.tag)}</span>
            </div>
            <h1 class="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              ${escapeHtml(es.heading)}
            </h1>
            <p class="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              ${escapeHtml(es.subheading)}
            </p>
          </div>
        </div>

        <!-- 1-Row Compact Form: Model + City + Calculate Button in Same Row -->
        <div class="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-7 shadow-2xs space-y-5">
          <div class="grid grid-cols-1 md:grid-cols-12 gap-3.5 items-end">
            
            <!-- Vehicle / Specialty Select (5 Cols) -->
            <div class="md:col-span-5">
              <label for="calc-vehicle-select" class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                ${escapeHtml(es.labelVehicle)}
              </label>
              <div class="relative flex items-center">
                <span class="absolute left-3.5 text-slate-400 pointer-events-none">
                  <i data-lucide="truck" class="w-4 h-4"></i>
                </span>
                <select id="calc-vehicle-select" class="w-full pl-10 pr-10 py-3 bg-slate-50/70 border border-slate-300 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 ${theme.searchFocus} transition-all cursor-pointer appearance-none">
                  ${vehicleOptionsHtml}
                </select>
                <span class="absolute right-3.5 text-slate-400 pointer-events-none">
                  <i data-lucide="chevron-down" class="w-4 h-4"></i>
                </span>
              </div>
            </div>

            <!-- City / Location Select (4 Cols) -->
            <div class="md:col-span-4">
              <label for="calc-city-select" class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Operating City / Location
              </label>
              <div class="relative flex items-center">
                <span class="absolute left-3.5 text-slate-400 pointer-events-none">
                  <i data-lucide="map-pin" class="w-4 h-4"></i>
                </span>
                <select id="calc-city-select" class="w-full pl-10 pr-10 py-3 bg-slate-50/70 border border-slate-300 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 ${theme.searchFocus} transition-all cursor-pointer appearance-none">
                  ${cityOptionsHtml}
                </select>
                <span class="absolute right-3.5 text-slate-400 pointer-events-none">
                  <i data-lucide="chevron-down" class="w-4 h-4"></i>
                </span>
              </div>
            </div>

            <!-- Calculate Button (3 Cols - Aligned in Same Row) -->
            <div class="md:col-span-3">
              <button id="calc-check-btn" type="button" class="w-full ${theme.ctaBtn} font-extrabold text-xs uppercase tracking-wider py-3 rounded-xl transition-all shadow-sm active:scale-95 cursor-pointer flex items-center justify-center h-[46px]">
                <span>Calculate</span>
              </button>
            </div>

          </div>

          <!-- Result Display Box -->
          <div id="calc-result-box" class="pt-1">
            <div class="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              Total Estimated Monthly Take-Home (Approx.)
            </div>
            <div class="bg-emerald-50/90 border-2 border-emerald-300/80 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-2xs">
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <i data-lucide="indian-rupee" class="w-5 h-5 stroke-[2.5]"></i>
                </div>
                <div>
                  <span class="text-xs font-bold text-emerald-800 uppercase tracking-wide block">${escapeHtml(es.resultPrefix)}</span>
                  <span id="calc-result-amount" class="font-display text-2xl sm:text-3xl font-black text-emerald-950 tracking-tight">
                    Approx. ₹ ${initialEarning.toLocaleString('en-IN')}${escapeHtml(es.resultSuffix)}
                  </span>
                </div>
              </div>
              <div class="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-200/80 text-emerald-900 text-xs font-bold">
                <i data-lucide="check" class="w-3.5 h-3.5 stroke-[3]"></i>
                <span>Direct Bank Payout</span>
              </div>
            </div>
          </div>

          <!-- Action Button -->
          <div class="pt-2">
            <a href="#download-app-section" class="w-full ${theme.ctaBtn} font-extrabold text-xs sm:text-sm uppercase tracking-wider py-3.5 rounded-xl transition-all shadow-xs flex items-center justify-center space-x-2">
              <i data-lucide="smartphone" class="w-4 h-4"></i>
              <span>${actionText}</span>
            </a>
          </div>

          <!-- Footnote Disclaimer -->
          <div class="pt-2 border-t border-slate-100">
            <p class="text-xs text-slate-500 leading-relaxed font-normal">
              ${escapeHtml(es.disclaimer)}
            </p>
          </div>

        </div>

      </div>
    </section>`;
}

// ── WHY SECTION (65% Factor Matrix on Left + 35% Bold Dark Summary Callout on Right) ──
function renderWhySection(config, theme) {
  if (!config.whySection) return '';
  const ws = config.whySection;

  // Left Factor Rows with Increased, Clear Typography
  const rowsHtml = ws.rows.map(row => `
    <div class="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-slate-300 hover:shadow-xs transition-all space-y-2.5">
      <div class="text-sm sm:text-base font-black text-slate-900 flex items-center space-x-2.5">
        <span class="w-2.5 h-2.5 rounded-full ${theme.heroBadgeDot}"></span>
        <span>${escapeHtml(row.factor)}</span>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
        <div class="flex items-center space-x-2.5 bg-emerald-50/90 text-emerald-950 border border-emerald-200/90 rounded-xl px-3.5 py-2.5 font-bold">
          <i data-lucide="check" class="w-4 h-4 text-emerald-600 stroke-[3] shrink-0"></i>
          <span class="leading-snug">${escapeHtml(row.positive)}</span>
        </div>
        <div class="flex items-center space-x-2.5 bg-rose-50/80 text-rose-950 border border-rose-200/90 rounded-xl px-3.5 py-2.5 font-bold">
          <i data-lucide="x" class="w-4 h-4 text-rose-500 stroke-[3] shrink-0"></i>
          <span class="leading-snug">${escapeHtml(row.negative)}</span>
        </div>
      </div>
    </div>`).join('');

  return `
    <!-- ===== ${ws.title.toUpperCase()} DECISION MATRIX & DARK VALUE CALLOUT ===== -->
    <section id="${ws.id}" class="py-16 sm:py-24 bg-slate-50/70 scroll-mt-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <!-- Section Header -->
        <div class="max-w-3xl space-y-2">
          <div class="inline-flex items-center space-x-2 ${theme.heroBadge} rounded-full px-3.5 py-1 text-xs font-bold tracking-wide uppercase">
            <span class="w-2 h-2 rounded-full ${theme.heroBadgeDot}"></span>
            <span>${escapeHtml(ws.tag)}</span>
          </div>
          <h2 class="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            ${escapeHtml(ws.title)}
          </h2>
          <p class="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            ${escapeHtml(ws.subtitle)}
          </p>
        </div>

        <!-- 2-Column Responsive Layout: 65% Factors (Left) + 35% Bold Dark Callout (Right) -->
        <div class="flex flex-col lg:flex-row gap-8 lg:gap-10 items-stretch">
          
          <!-- Left Column (65%): Factor Matrix -->
          <div class="w-full lg:w-[65%] space-y-3.5">
            <div class="flex items-center justify-between pb-2.5 border-b border-slate-200">
              <span class="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-600">Key Decision Points</span>
              <div class="flex items-center space-x-4 text-xs sm:text-sm font-extrabold">
                <span class="text-emerald-700 flex items-center space-x-1.5">
                  <span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  <span>${escapeHtml(ws.positiveCol)}</span>
                </span>
                <span class="text-rose-600 flex items-center space-x-1.5">
                  <span class="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                  <span>${escapeHtml(ws.negativeCol)}</span>
                </span>
              </div>
            </div>

            <div class="space-y-3">
              ${rowsHtml}
            </div>
          </div>

          <!-- Right Column (35%): Dark Background Div with Bold Text & Key Points -->
          <div class="w-full lg:w-[35%] flex flex-col">
            <div class="h-full bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-slate-800/90 rounded-3xl p-7 sm:p-9 lg:p-10 text-white shadow-xl flex flex-col justify-between relative overflow-hidden group">
              <div class="absolute -right-12 -bottom-12 w-48 h-48 ${theme.bannerGlow} rounded-full blur-3xl pointer-events-none opacity-40"></div>
              
              <div class="space-y-5 relative z-10">
                <div class="inline-flex items-center space-x-2 text-xs font-black uppercase tracking-widest ${theme.eyebrow}">
                  <span class="w-2 h-2 rounded-full ${theme.heroBadgeDot} animate-pulse"></span>
                  <span>${escapeHtml(ws.whyCallout.badge)}</span>
                </div>
                
                <p class="font-display text-2xl sm:text-3xl font-black text-white leading-snug tracking-tight">
                  "${escapeHtml(ws.whyCallout.headline)}"
                </p>

                ${ws.whyCallout.description ? `
                <p class="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal pt-1">
                  ${escapeHtml(ws.whyCallout.description)}
                </p>` : ''}

                ${ws.whyCallout.points && ws.whyCallout.points.length ? `
                <div class="space-y-2.5 pt-2">
                  ${ws.whyCallout.points.map(pt => `
                    <div class="flex items-start space-x-2 text-xs sm:text-sm font-bold text-slate-200">
                      <i data-lucide="check-circle-2" class="w-4 h-4 text-emerald-400 shrink-0 mt-0.5"></i>
                      <span>${escapeHtml(pt)}</span>
                    </div>
                  `).join('')}
                </div>` : ''}
              </div>

              <div class="pt-6 mt-6 border-t border-slate-800/80 flex items-center space-x-2.5 text-xs sm:text-sm font-bold text-slate-300 relative z-10">
                <i data-lucide="shield-check" class="w-4 h-4 text-emerald-400 shrink-0"></i>
                <span>${escapeHtml(ws.whyCallout.highlight)}</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>`;
}

// ── FAQS SECTION (Full-Width Clean 2-Column: Left Title, Right Accordion) ──
function renderFaqsSection(config, theme, data) {
  const faqsHtml = data.faqs.map((faq, index) => {
    const isFirst = index === 0;
    const answerClass = isFirst ? '' : 'hidden';
    const iconRotate = isFirst ? 'rotate-180' : '';
    const expandedAttr = isFirst ? 'true' : 'false';

    return `
      <div class="faq-item group bg-white border border-slate-200 rounded-2xl overflow-hidden transition-all duration-200 hover:border-slate-300 hover:shadow-xs">
        <button class="faq-toggle w-full px-5 py-4 flex items-center justify-between text-left cursor-pointer focus:outline-none" aria-expanded="${expandedAttr}">
          <div class="pr-3 space-y-1">
            <h3 class="faq-question text-sm sm:text-base font-bold text-slate-900 ${theme.faqHover} transition-colors">
              ${escapeHtml(faq.question)}
            </h3>
          </div>
          <div class="faq-icon-wrapper w-7 h-7 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0 text-slate-500 transition-transform duration-200 ${iconRotate}">
            <i data-lucide="chevron-down" class="w-3.5 h-3.5"></i>
          </div>
        </button>
        <div class="faq-answer ${answerClass} px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3.5 bg-slate-50/50">
          <p class="faq-answer-text">${escapeHtml(faq.answer)}</p>
        </div>
      </div>`;
  }).join('');

  return `
    <!-- ===== FAQS SECTION ===== -->
    <section id="faqs-section" class="py-16 sm:py-24 bg-white scroll-mt-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
        
        <!-- Left Half Side (5 Cols: Role Heading & Description Only - Static, No Sticky Movement) -->
        <div class="lg:col-span-5 space-y-6">
          
          <div class="space-y-4">
            <div class="inline-flex items-center space-x-2 ${theme.heroBadge} rounded-full px-4 py-1.5 text-xs font-bold tracking-wide uppercase">
              <span class="w-2 h-2 rounded-full ${theme.heroBadgeDot}"></span>
              <span>FAQ's</span>
            </div>
            
            <h2 class="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.12]">
              Most frequently asked question from ${escapeHtml(config.faqRoleTitle || data.displayName)}
            </h2>
            
            <p class="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              Quick, clear answers about booking equipment on the mobile app, payouts, tracking, and on-site support.
            </p>
          </div>

          <!-- Helpful Context Pill -->
          <div class="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/90 shadow-2xs space-y-2">
            <div class="flex items-center space-x-2 text-xs font-extrabold uppercase tracking-wider text-slate-700">
              <i data-lucide="help-circle" class="w-4 h-4 text-emerald-600"></i>
              <span>Clear &amp; Transparent Answers</span>
            </div>
            <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Find answers about rates, payments, mobile tracking, and on-site guarantees. All operational support is available 24/7 inside the app.
            </p>
          </div>

        </div>

        <!-- Right Half Side (7 Cols: The FAQs Accordion List) -->
        <div class="lg:col-span-7 space-y-3">
          <div id="faqs-container" class="space-y-3">
            ${faqsHtml}
          </div>
        </div>

      </div>
    </div>
  </section>`;
}

// ── DOWNLOAD APP SECTION (2-Part Split Layout: Left Dark Card + Right White Card) ──
function renderDownloadSection(config, theme, data) {
  const banner = config.downloadBanner || {
    badge: 'BookMyEquipment Mobile App',
    title: 'Manage Heavy Machinery from Your Phone',
    description: 'Hire verified machines in minutes, track trailers with live GPS, approve duty hours, and get 24/7 on-site emergency support right on your phone.',
    features: [
      { icon: 'shield-check', text: '100% Safe Payments' },
      { icon: 'map-pin', text: 'Live GPS Tracking' },
      { icon: 'clock', text: '3-Hour Mechanic SLA' }
    ]
  };

  const featurePillsHtml = (banner.features || []).map(f => `
    <div class="flex items-center space-x-2">
      <i data-lucide="${f.icon}" class="w-4 h-4 ${theme.bannerIcons} shrink-0"></i>
      <span>${escapeHtml(f.text)}</span>
    </div>
  `).join('');

  return `
    <!-- ===== DOWNLOAD APP SECTION (2-Part Split Layout) ===== -->
    <section id="download-app-section" class="py-16 sm:py-24 bg-white scroll-mt-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

        <!-- Section Header -->
        <div class="max-w-3xl space-y-2">
          <div class="inline-flex items-center space-x-2 ${theme.heroBadge} rounded-full px-3.5 py-1 text-xs font-bold tracking-wide uppercase">
            <span class="w-2 h-2 rounded-full ${theme.heroBadgeDot}"></span>
            <span>${escapeHtml(banner.tag || 'Get the Mobile App')}</span>
          </div>
          <h2 class="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            ${escapeHtml(banner.title)}
          </h2>
          <p class="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Download the official BookMyEquipment application on Android and iOS to access instant bookings, live telemetry, and direct escrow payouts.
          </p>
        </div>

        <!-- 2-Part Responsive Grid: Left Dark Card (7 Cols) + Right Direct Image (5 Cols) Same Height -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          <!-- Left Part (7 cols): Dark Background Card (Fixed Height Matching Image on lg) -->
          <div class="lg:col-span-7 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-slate-800/90 rounded-3xl p-8 sm:p-10 lg:p-12 text-white shadow-xl flex flex-col justify-between relative overflow-hidden group lg:h-[520px]">
            <div class="absolute -right-16 -bottom-16 w-64 h-64 ${theme.bannerGlow} rounded-full blur-3xl pointer-events-none opacity-40"></div>
            <div class="absolute -left-16 -top-16 w-64 h-64 ${theme.bannerGlow} rounded-full blur-3xl pointer-events-none opacity-30"></div>

            <div class="space-y-6 relative z-10">
              <div class="inline-flex items-center space-x-2 ${theme.bannerBadge} rounded-full px-3.5 py-1 text-xs font-bold uppercase tracking-wider">
                <i data-lucide="smartphone" class="w-3.5 h-3.5"></i>
                <span>${escapeHtml(banner.badge)}</span>
              </div>

              <h3 class="font-display text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight tracking-tight">
                Everything You Need on iOS &amp; Android
              </h3>

              <p class="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl font-normal">
                ${escapeHtml(banner.description)}
              </p>

              <!-- App Store Badges -->
              <div class="flex flex-wrap items-center gap-4 pt-2">
                <a href="#" class="inline-block transition-transform duration-200 hover:scale-105 active:scale-95 drop-shadow-md rounded-[7px] overflow-hidden" aria-label="Get it on Google Play">
                  <img src="/images/google-play-badge.svg" alt="Get it on Google Play" class="h-11 w-auto block">
                </a>
                <a href="#" class="inline-block transition-transform duration-200 hover:scale-105 active:scale-95 drop-shadow-md rounded-[7px] overflow-hidden" aria-label="Download on the App Store">
                  <img src="/images/app-store-badge.svg" alt="Download on the App Store" class="h-11 w-auto block">
                </a>
              </div>
            </div>

            <!-- Features Footer Inside Left Dark Card -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 mt-6 border-t border-slate-800/80 text-xs text-slate-300 relative z-10">
              ${featurePillsHtml}
            </div>
          </div>

          <!-- Right Part (5 cols): Direct Image Pasted Directly with Exact Same Height (520px on lg) -->
          <div class="lg:col-span-5 flex items-center justify-center lg:h-[520px]">
            <img 
              src="${theme.mockup}" 
              alt="${theme.mockupAlt}" 
              class="w-auto h-auto max-h-[460px] lg:h-[520px] lg:max-h-[520px] object-contain rounded-3xl shadow-2xl drop-shadow-2xl transition-transform duration-300 hover:scale-[1.02] shrink-0"
            />
          </div>

        </div>

      </div>
    </section>`;
}

// ── FULL 4-COLUMN FOOTER (Universal Brand Theme Across Overall Website) ──
function renderRoleFooter(config, theme) {
  return `
  <!-- ===== FOOTER ===== -->
  <footer id="footer-section" class="bg-slate-50 text-slate-600 border-t border-slate-200 pt-16 pb-10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
        
        <!-- Col 1: Brand & Bio -->
        <div class="lg:col-span-4 space-y-4">
          <a href="/" class="flex items-center space-x-2.5 group" title="Return to BookMyEquipment Home">
            <div class="bg-brand-primary px-3 py-1.5 rounded-[4px] shadow-sm transition-transform group-hover:scale-105">
              <span class="text-white font-black text-xl tracking-wider" style="font-family:'Poppins',Impact,sans-serif;">BME</span>
            </div>
            <div class="border-l border-slate-300 pl-3">
              <span class="text-[9px] tracking-[0.22em] text-brand-primary uppercase font-bold block">Heavy Equipment</span>
              <div class="text-sm font-bold text-slate-900 tracking-tight">BookMyEquipment</div>
            </div>
          </a>
          <p class="text-slate-600 text-sm max-w-sm leading-relaxed">
            India&#39;s #1 B2B heavy equipment rental and listing platform. Zero middlemen. Complete transparency for every stakeholder.
          </p>
        </div>

        <!-- Col 2: Company Links -->
        <div class="lg:col-span-2">
          <h4 class="text-brand-primary font-bold text-xs uppercase tracking-wider mb-4">Company</h4>
          <ul class="space-y-2.5">
            <li><a href="/about" class="footer-link">About Us</a></li>
            <li><a href="/#ecosystem" class="footer-link">How It Works</a></li>
            <li><a href="/#fleet" class="footer-link">Fleet Categories</a></li>
            <li><a href="/#trust" class="footer-link">Trust &amp; Safety</a></li>
            <li><a href="#" class="footer-link">Careers</a></li>
            <li><a href="javascript:void(0)" onclick="openCallbackModal()" class="footer-link">Contact Us</a></li>
          </ul>
        </div>

        <!-- Col 3: Portals & Legal Links -->
        <div class="lg:col-span-2">
          <h4 class="text-brand-primary font-bold text-xs uppercase tracking-wider mb-4">Portals &amp; Legal</h4>
          <ul class="space-y-2.5">
            <li><a href="/customer" class="footer-link ${config.key === 'customer' ? 'font-bold text-slate-900' : ''}">Customer Portal</a></li>
            <li><a href="/owner" class="footer-link ${config.key === 'owner' ? 'font-bold text-slate-900' : ''}">Machine Owner</a></li>
            <li><a href="/operator" class="footer-link ${config.key === 'operator' ? 'font-bold text-slate-900' : ''}">Certified Operator</a></li>
            <li><a href="#" class="footer-link">Fleet Guidelines</a></li>
            <li><a href="#" class="footer-link">Terms &amp; Conditions</a></li>
            <li><a href="#" class="footer-link">Privacy Policy</a></li>
          </ul>
        </div>

        <!-- Col 4: App Download Badges & Support Contacts -->
        <div class="lg:col-span-4 space-y-3.5">
          <h4 class="text-brand-primary font-bold text-xs uppercase tracking-wider">Get the App</h4>
          <p class="text-slate-600 text-xs leading-relaxed">Available on iOS and Android. Free to download, transparent pricing.</p>
          
          <!-- For Customers -->
          <div class="space-y-1.5 pt-1">
            <span class="inline-block text-[11px] font-bold text-brand-primary uppercase tracking-wider">For Customers</span>
            <div class="flex flex-wrap items-center gap-2.5">
              <a href="#" class="inline-block transition-transform duration-200 hover:scale-105 active:scale-95 drop-shadow-md rounded-[7px] overflow-hidden" aria-label="Get it on Google Play">
                <img src="/images/google-play-badge.svg" alt="Get it on Google Play" class="h-9 w-auto block">
              </a>
              <a href="#" class="inline-block transition-transform duration-200 hover:scale-105 active:scale-95 drop-shadow-md rounded-[7px] overflow-hidden" aria-label="Download on the App Store">
                <img src="/images/app-store-badge.svg" alt="Download on the App Store" class="h-9 w-auto block">
              </a>
            </div>
          </div>

          <!-- For Partners -->
          <div class="space-y-1.5 pt-1">
            <span class="inline-block text-[11px] font-bold text-amber-600 uppercase tracking-wider">For Fleet Owners &amp; Operators</span>
            <div class="flex flex-wrap items-center gap-2.5">
              <a href="#" class="inline-block transition-transform duration-200 hover:scale-105 active:scale-95 drop-shadow-md rounded-[7px] overflow-hidden" aria-label="Get it on Google Play">
                <img src="/images/google-play-badge.svg" alt="Get it on Google Play" class="h-9 w-auto block">
              </a>
              <a href="#" class="inline-block transition-transform duration-200 hover:scale-105 active:scale-95 drop-shadow-md rounded-[7px] overflow-hidden" aria-label="Download on the App Store">
                <img src="/images/app-store-badge.svg" alt="Download on the App Store" class="h-9 w-auto block">
              </a>
            </div>
          </div>

          <div class="text-xs text-slate-600 space-y-1.5 pt-2 border-t border-slate-200">
            <div class="flex items-center space-x-1.5">
              <i data-lucide="mail" class="w-3.5 h-3.5 text-brand-primary"></i>
              <a href="mailto:hello@bookmyequipment.in" class="hover:text-brand-primary transition-colors">hello@bookmyequipment.in</a>
            </div>
            <div class="flex items-center space-x-1.5">
              <i data-lucide="phone" class="w-3.5 h-3.5 text-brand-primary"></i>
              <a href="tel:+918000000000" class="hover:text-brand-primary transition-colors">+91 80000 00000</a>
            </div>
          </div>

        </div>

      </div>
    </div>

    <!-- Bottom Copyright & Compliance Bar -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-200 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
      <div>&copy; 2026 BookMyEquipment. All rights reserved. Made with <span class="text-red-500">&hearts;</span> in India.</div>
      <div class="flex items-center space-x-6">
        <span class="flex items-center space-x-1.5">
          <i data-lucide="shield-check" class="w-4 h-4 text-emerald-600"></i>
          <span class="text-slate-700 font-medium">SSL 256-bit Encrypted</span>
        </span>
        <span class="text-slate-300">&bull;</span>
        <span class="text-slate-700 font-medium">GST Registered</span>
      </div>
    </div>
  </footer>`;
}

function generateRoleHtml(config) {
  const data = JSON.parse(fs.readFileSync(path.join(__dirname, config.jsonPath), 'utf8'));
  const theme = config.theme;

  const estimatorHtml = config.key === 'customer'
    ? renderCustomerEstimator(config, theme)
    : renderOwnerOrOperatorEstimator(config, theme);

  return `<!doctype html>
<html lang="en" class="scroll-smooth">
<head>
  <meta charset="UTF-8" />
  <base href="/" />
  <link rel="icon" type="image/svg+xml" href="/images/jcb_logo.svg" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="${escapeHtml(data.headline)} - BookMyEquipment." />
  <title>${escapeHtml(data.displayName)} | BookMyEquipment</title>
  
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
<body class="bg-slate-50 text-slate-900 font-sans min-h-screen flex flex-col ${theme.selection}">

  <!-- ===== TOP HEADER ===== -->
  <header class="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-2xs">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16 sm:h-20">
        
        <!-- Left: Brand Logo -->
        <div class="flex items-center">
          <a href="/" class="flex items-center space-x-2.5 group" title="Return to BookMyEquipment Home">
            <div class="${theme.logoBg} px-3 py-1.5 rounded-[6px] transition-transform group-hover:scale-105 shadow-sm">
              <span class="text-white font-black text-xl tracking-wider" style="font-family:'Poppins',Impact,sans-serif;">BME</span>
            </div>
            <div class="border-l border-slate-200 pl-3">
              <span class="text-[9px] tracking-[0.22em] ${theme.logoSubText} uppercase font-bold block">Heavy Equipment</span>
              <div class="text-sm font-bold text-slate-900 tracking-tight">BookMyEquipment</div>
            </div>
          </a>
        </div>

        <!-- Center: Primary Navigation Links -->
        <nav class="hidden md:flex items-center space-x-8 text-sm font-semibold text-slate-600" style="--role-nav-color: ${theme.hex};">
          <a href="#estimation-section" class="role-nav-link active">
            Why Us?
          </a>
          ${config.whySection ? `
          <a href="#${config.whySection.id}" class="role-nav-link">
            ${escapeHtml(config.whySection.navText)}
          </a>` : ''}
          <a href="#faqs-section" class="role-nav-link">
            FAQs
          </a>
          <a href="#download-app-section" class="role-nav-link">
            Get App
          </a>
        </nav>

        <!-- Right: Segmented Role Switcher & Request a Call Action -->
        <div class="hidden md:flex items-center space-x-3">
          <!-- Static Language Selector -->
          ${LANGUAGE_SELECTOR}

          <!-- Role Switcher Tabs -->
          <div class="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/80 text-xs font-semibold shadow-2xs">
            <a href="/customer" class="px-3.5 py-1.5 rounded-lg transition-all ${config.key === 'customer' ? 'bg-white text-orange-600 font-bold shadow-2xs' : 'text-slate-600 hover:text-slate-900'}">Customer</a>
            <a href="/owner" class="px-3.5 py-1.5 rounded-lg transition-all ${config.key === 'owner' ? 'bg-white text-amber-600 font-bold shadow-2xs' : 'text-slate-600 hover:text-slate-900'}">Owner</a>
            <a href="/operator" class="px-3.5 py-1.5 rounded-lg transition-all ${config.key === 'operator' ? 'bg-white text-teal-600 font-bold shadow-2xs' : 'text-slate-600 hover:text-slate-900'}">Operator</a>
          </div>

          <!-- Contact Us Button -->
          <button onclick="openCallbackModal()" class="inline-flex items-center space-x-1.5 ${theme.ctaBtn} active:scale-95 font-bold text-xs px-4 py-2 rounded-xl transition-all shadow-xs cursor-pointer">
            <span>Contact Us</span>
            <i data-lucide="phone-call" class="w-3.5 h-3.5 stroke-[2.2]"></i>
          </button>
        </div>

        <!-- Mobile Actions -->
        <div class="flex items-center space-x-2 md:hidden">
          ${LANGUAGE_SELECTOR}
          <button onclick="openCallbackModal()" class="border ${theme.outlineBtn} font-bold text-xs px-3 py-1.5 rounded-lg">
            Contact
          </button>
          <button id="mobile-toggle" aria-label="Toggle Navigation Menu" class="p-2 text-slate-600 hover:text-slate-950">
            <i data-lucide="menu" class="w-6 h-6"></i>
          </button>
        </div>

      </div>
    </div>

    <!-- Mobile Drawer Menu -->
    <div id="mobile-menu" class="hidden md:hidden bg-white border-t border-slate-200 px-4 py-4 space-y-3 shadow-lg">
      <div class="flex items-center justify-between pb-2 border-b border-slate-100">
        <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">Language</span>
        ${LANGUAGE_SELECTOR}
      </div>
      <div class="grid grid-cols-3 gap-2 pb-2 border-b border-slate-100 text-center text-xs font-bold">
        <a href="/customer" class="py-1.5 rounded-lg ${config.key === 'customer' ? 'bg-orange-600 text-white' : 'bg-slate-100 text-slate-700'}">Customer</a>
        <a href="/owner" class="py-1.5 rounded-lg ${config.key === 'owner' ? 'bg-amber-500 text-white' : 'bg-slate-100 text-slate-700'}">Owner</a>
        <a href="/operator" class="py-1.5 rounded-lg ${config.key === 'operator' ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-700'}">Operator</a>
      </div>
      <a href="#estimation-section" class="block text-sm font-bold text-slate-800 py-1.5 border-b border-slate-100">Why Us?</a>
      ${config.whySection ? `<a href="#${config.whySection.id}" class="block text-sm font-bold text-slate-800 py-1.5 border-b border-slate-100">${escapeHtml(config.whySection.navText)}</a>` : ''}
      <a href="#faqs-section" class="block text-sm font-bold text-slate-800 py-1.5 border-b border-slate-100">FAQs</a>
      <a href="#download-app-section" class="block text-sm font-bold text-slate-800 py-1.5 border-b border-slate-100">Download App</a>
      <button onclick="openCallbackModal()" class="w-full text-center ${theme.ctaBtn} font-bold text-xs py-2.5 rounded-xl flex items-center justify-center space-x-1.5">
        <span>Contact Us</span>
        <i data-lucide="phone-call" class="w-3.5 h-3.5"></i>
      </button>
    </div>
  </header>

  <!-- ===== MAIN CONTENT (Full-Bleed Responsive Page Bands) ===== -->
  <main class="flex-grow">
    <!-- 1. ESTIMATION SECTION -->
    ${estimatorHtml}

    <!-- 2. WHY SECTION (With 65% Decision Matrix & 35% Bold Dark Summary Callout) -->
    ${renderWhySection(config, theme)}

    <!-- 3. FAQS SECTION (Clean Left Title, Right Accordion) -->
    ${renderFaqsSection(config, theme, data)}

    <!-- 4. DOWNLOAD APP SECTION -->
    ${renderDownloadSection(config, theme, data)}
  </main>

  <!-- ===== REQUEST A CALL MODAL ===== -->
  <div id="request-call-modal" class="hidden fixed inset-0 z-50 items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm" style="display: none;">
    <div class="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-200">
      
      <button onclick="closeCallbackModal()" class="absolute top-5 right-5 p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors" aria-label="Close Modal">
        <i data-lucide="x" class="w-5 h-5"></i>
      </button>

      <div id="request-call-form-container">
        <div class="space-y-2 mb-6">
          <div class="w-10 h-10 rounded-xl ${theme.modalIcon} flex items-center justify-center">
            <i data-lucide="phone-call" class="w-5 h-5"></i>
          </div>
          <h3 class="font-display text-xl font-bold text-slate-900">Request a Callback</h3>
          <p class="text-xs text-slate-500">Need personal machinery guidance? Our coordinator will call your phone in 15 minutes.</p>
        </div>

        <form id="request-call-form" class="space-y-4" onsubmit="handleCallbackSubmit(event)">
          <div>
            <label for="callback-name" class="block text-xs font-bold text-slate-700 mb-1">Your Full Name</label>
            <input type="text" id="callback-name" required placeholder="e.g. Ramesh Sharma" class="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 ${theme.modalFocus}" />
          </div>

          <div>
            <label for="callback-phone" class="block text-xs font-bold text-slate-700 mb-1">Phone Number (+91)</label>
            <div class="relative flex items-center">
              <span class="absolute left-3.5 text-xs font-bold text-slate-400">+91</span>
              <input type="tel" id="callback-phone" required pattern="[6-9][0-9]{9}" placeholder="98765 43210" class="w-full pl-12 pr-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 ${theme.modalFocus}" />
            </div>
          </div>

          <div>
            <label for="callback-role" class="block text-xs font-bold text-slate-700 mb-1">Role</label>
            <input type="text" id="callback-role" readonly value="${escapeHtml(data.displayName)}" class="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50 text-slate-700 font-medium" />
          </div>

          <div>
            <label for="callback-query" class="block text-xs font-bold text-slate-700 mb-1">Equipment / Query Details</label>
            <input type="text" id="callback-query" placeholder="e.g. 20-Ton Excavator booking, weekly hire inquiry..." class="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 ${theme.modalFocus}" />
          </div>

          <button type="submit" class="w-full ${theme.modalBtn} font-extrabold text-xs uppercase py-3 rounded-xl transition-all cursor-pointer">
            Confirm &amp; Request Callback
          </button>
        </form>
      </div>

      <div id="request-call-success" class="hidden text-center py-6 space-y-4">
        <div class="w-14 h-14 mx-auto rounded-full ${theme.modalCheck} flex items-center justify-center">
          <i data-lucide="check-circle" class="w-8 h-8"></i>
        </div>
        <h4 class="font-display text-lg font-bold text-slate-900">Callback Requested!</h4>
        <p class="text-xs text-slate-600 max-w-xs mx-auto">
          <span>Thank you! Our fleet specialist will call you at</span> <strong id="confirmed-phone" class="text-slate-900">your number</strong> <span>within 15 minutes.</span>
        </p>
        <button onclick="closeCallbackModal()" class="px-6 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold transition-colors">
          Close Window
        </button>
      </div>

    </div>
  </div>

  <!-- ===== FOOTER ===== -->
  ${renderRoleFooter(config, theme)}

  <!-- Interactive JavaScript Logic -->
  <script>
    // Lucide Icons initialization
    if (typeof lucide !== 'undefined') lucide.createIcons();

    // Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    mobileToggle?.addEventListener('click', () => mobileMenu?.classList.toggle('hidden'));
    mobileMenu?.querySelectorAll('a').forEach(l => l.addEventListener('click', () => mobileMenu.classList.add('hidden')));

    // Modal Handlers
    const modal = document.getElementById('request-call-modal');
    const formContainer = document.getElementById('request-call-form-container');
    const successContainer = document.getElementById('request-call-success');

    function openCallbackModal() {
      if (modal) {
        modal.style.display = 'flex';
        modal.classList.remove('hidden');
        if (formContainer) formContainer.classList.remove('hidden');
        if (successContainer) successContainer.classList.add('hidden');
      }
    }

    function closeCallbackModal() {
      if (modal) {
        modal.style.display = 'none';
        modal.classList.add('hidden');
      }
    }

    modal?.addEventListener('click', (e) => {
      if (e.target === modal) closeCallbackModal();
    });

    function handleCallbackSubmit(e) {
      e.preventDefault();
      const phone = document.getElementById('callback-phone')?.value;
      if (formContainer) formContainer.classList.add('hidden');
      if (successContainer) {
        successContainer.classList.remove('hidden');
        const phoneEl = document.getElementById('confirmed-phone');
        if (phoneEl) phoneEl.textContent = phone;
      }
      if (typeof lucide !== 'undefined') lucide.createIcons();
    }

    // ── Customer Mature Estimator Calculation Engine ──
    const durationDaysMap = { day: 1, week: 7, month: 30 };
    function computeCustomerEstimate(input) {
      const amountKeys = ['rate', 'deposit', 'rentalExtras', 'down', 'emi', 'maint', 'buyExtras'];
      if (!durationDaysMap[input.durationUnit] || !durationDaysMap[input.rateUnit]) return null;
      const duration = Number(input.duration);
      if (!Number.isInteger(duration) || duration < 1 || duration > 3650) return null;
      const amounts = {};
      for (const key of amountKeys) {
        if (input[key] === '' || input[key] === null || input[key] === undefined) return null;
        const number = Number(input[key]);
        if (!Number.isFinite(number) || number < 0 || number > 100000000) return null;
        amounts[key] = number;
      }
      if (amounts.rate <= 0) return null;
      const days = duration * durationDaysMap[input.durationUnit];
      const months = Math.ceil(days / 30);
      const round = val => Math.round((val + Number.EPSILON) * 100) / 100;
      const baseRental = round(amounts.rate * days / durationDaysMap[input.rateUnit]);
      const loan = round(amounts.emi * months);
      const upkeep = round(amounts.maint * months);
      const rental = round(baseRental + amounts.deposit + amounts.rentalExtras);
      const purchase = round(amounts.down + loan + upkeep + amounts.buyExtras);
      return {
        baseRental,
        loan,
        upkeep,
        rental,
        purchase,
        depositTotal: amounts.deposit,
        rentalExtrasTotal: amounts.rentalExtras,
        downTotal: amounts.down,
        buyExtrasTotal: amounts.buyExtras,
        difference: round(Math.abs(rental - purchase)),
        lower: rental === purchase ? 'equal' : rental < purchase ? 'rental' : 'purchase'
      };
    }

    function initCustomerEstimate() {
      const machine = document.getElementById('cust-machine-select');
      if (!machine) return;
      const ids = {
        duration: 'cust-duration-select',
        durationUnit: 'cust-duration-unit',
        rate: 'cust-rate',
        rateUnit: 'cust-rate-unit',
        deposit: 'cust-deposit',
        rentalExtras: 'cust-rental-extras',
        down: 'cust-down',
        emi: 'cust-emi',
        maint: 'cust-maint',
        buyExtras: 'cust-buy-extras'
      };
      const controls = Object.fromEntries(Object.entries(ids).map(([k, id]) => [k, document.getElementById(id)]));
      const outputs = {
        rental: 'cust-rent-total',
        purchase: 'cust-buy-total',
        baseRental: 'cust-base-rental',
        depositTotal: 'cust-deposit-total',
        rentalExtrasTotal: 'cust-rental-extras-total',
        downTotal: 'cust-buy-down',
        loan: 'cust-buy-emi',
        upkeep: 'cust-buy-maint',
        buyExtrasTotal: 'cust-buy-extras-total'
      };
      const money = val => 'Approx. ₹ ' + val.toLocaleString('en-IN', { maximumFractionDigits: 0 });

      function update() {
        const input = Object.fromEntries(Object.entries(controls).map(([k, el]) => [k, el ? el.value : '']));
        const res = computeCustomerEstimate(input);
        for (const el of Object.values(controls)) {
          if (el && el.type === 'number') {
            el.setAttribute('aria-invalid', String(el.value === '' || !el.validity.valid));
          }
        }
        for (const [key, id] of Object.entries(outputs)) {
          const el = document.getElementById(id);
          if (el) el.textContent = res ? money(res[key]) : '—';
        }
        const errorEl = document.getElementById('estimate-error');
        if (errorEl) {
          errorEl.hidden = Boolean(res);
          errorEl.textContent = res ? '' : 'Enter valid amounts and a whole-number project duration to compare.';
        }
        const verdictEl = document.getElementById('estimate-verdict');
        if (verdictEl) {
          verdictEl.textContent = !res
            ? 'Enter amounts to compare cash outflows.'
            : res.lower === 'equal'
            ? 'Both options have the same estimated cash outflow.'
            : res.lower === 'rental'
            ? 'Renting has lower estimated cash outflow by'
            : 'Purchasing has lower estimated cash outflow by';
        }
        const diffEl = document.getElementById('estimate-difference');
        if (diffEl) {
          diffEl.textContent = res && res.lower !== 'equal' ? money(res.difference) : '';
        }
      }

      function loadExample() {
        const opt = machine.selectedOptions[0];
        if (!opt) return;
        const data = opt.dataset;
        for (const [k, src] of [['rate', 'rent'], ['down', 'down'], ['emi', 'emi'], ['maint', 'maint']]) {
          if (controls[k]) controls[k].value = data[src] || '';
        }
        for (const k of ['deposit', 'rentalExtras', 'buyExtras']) {
          if (controls[k]) controls[k].value = '0';
        }
        if (controls.rateUnit) controls.rateUnit.value = 'month';
        const sourceEl = document.getElementById('estimate-source');
        if (sourceEl) {
          sourceEl.textContent = data.rent
            ? 'Example inputs only. Replace them with your supplier and finance quotes.'
            : 'No example rates for this machine. Enter your quote amounts or request a site quote.';
        }
        update();
      }

      for (const el of Object.values(controls)) {
        if (el) el.addEventListener('input', update);
        if (el) el.addEventListener('change', update);
      }
      machine.addEventListener('change', loadExample);
      loadExample();
    }
    initCustomerEstimate();

    // ── Owner & Operator Interactive Earnings Estimator ──
    const calcVehicle = document.getElementById('calc-vehicle-select');
    const calcCity = document.getElementById('calc-city-select');
    const calcBtn = document.getElementById('calc-check-btn');
    const calcResultAmount = document.getElementById('calc-result-amount');

    function updateEarnings() {
      if (!calcVehicle || !calcCity || !calcResultAmount) return;
      const vehicleOpt = calcVehicle.selectedOptions[0];
      const cityOpt = calcCity.selectedOptions[0];
      const baseRate = parseFloat(vehicleOpt?.getAttribute('data-rate') || 0);
      const mult = parseFloat(cityOpt?.getAttribute('data-mult') || 1);
      const total = Math.round(baseRate * mult);
      calcResultAmount.textContent = 'Approx. ₹ ' + total.toLocaleString('en-IN') + '/month';
    }

    calcVehicle?.addEventListener('change', updateEarnings);
    calcCity?.addEventListener('change', updateEarnings);
    calcBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      updateEarnings();
    });

    // ── Accordion Expand/Collapse ──
    document.querySelectorAll('.faq-toggle').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = btn.closest('.faq-item');
        const answer = item.querySelector('.faq-answer');
        const icon = btn.querySelector('.faq-icon-wrapper');
        const isCurrentlyOpen = !answer.classList.contains('hidden');

        // Close all
        document.querySelectorAll('.faq-answer').forEach(a => a.classList.add('hidden'));
        document.querySelectorAll('.faq-icon-wrapper').forEach(ic => ic.classList.remove('rotate-180'));
        document.querySelectorAll('.faq-toggle').forEach(t => t.setAttribute('aria-expanded', 'false'));

        if (!isCurrentlyOpen) {
          answer.classList.remove('hidden');
          icon.classList.add('rotate-180');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });

    // ── Dynamic Role Page ScrollSpy Active Section Indicator ──
    const roleNavLinks = Array.from(document.querySelectorAll('.role-nav-link'));
    const roleSections = roleNavLinks.map(link => {
      const href = link.getAttribute('href');
      const id = href ? href.replace('#', '') : '';
      return { id, link, el: document.getElementById(id) };
    }).filter(s => s.el);

    function updateRoleActiveNav() {
      const scrollPos = window.scrollY + 140;
      const isAtBottom = (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 120);

      let activeSection = roleSections[0];
      if (isAtBottom && roleSections.length) {
        activeSection = roleSections[roleSections.length - 1];
      } else {
        for (const item of roleSections) {
          if (scrollPos >= item.el.offsetTop) {
            activeSection = item;
          }
        }
      }

      roleSections.forEach(item => {
        if (activeSection && item.id === activeSection.id) {
          item.link.classList.add('active');
        } else {
          item.link.classList.remove('active');
        }
      });
    }

    window.addEventListener('scroll', updateRoleActiveNav, { passive: true });
    window.addEventListener('DOMContentLoaded', updateRoleActiveNav);
    updateRoleActiveNav();

    // Smooth scroll on click
    roleNavLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          const el = document.querySelector(href);
          if (el) {
            e.preventDefault();
            const top = el.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({ top, behavior: 'smooth' });
            history.pushState(null, null, href);
            updateRoleActiveNav();
          }
        }
      });
    });
  </script>
</body>
</html>`;
}

// Generate all 3 pages (both as <role>.html and <role>/index.html for universal clean-URL support on Live Server, Vite, and production hosts)
ROLES.forEach(cfg => {
  const html = generateRoleHtml(cfg);

  // 1. Root file (e.g. customer.html)
  fs.writeFileSync(path.join(__dirname, cfg.file), html, 'utf8');

  // 2. Directory index for clean URLs (e.g. customer/index.html) so VS Code Live Server (port 5500) never errors with "Cannot GET /customer"
  const dirPath = path.join(__dirname, cfg.key);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  fs.writeFileSync(path.join(dirPath, 'index.html'), html, 'utf8');

  console.log(`Generated ${cfg.file} and ${cfg.key}/index.html (${Buffer.byteLength(html)} bytes) with ${cfg.theme.colorName} theme`);
});
