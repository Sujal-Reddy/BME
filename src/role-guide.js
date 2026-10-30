import { ROLES_DATA } from './data/roles.js';

// State management
let currentRole = 'customer';
let activeCategory = 'All';
let searchQuery = '';

// DOM Elements
const roleTitleEl = document.getElementById('role-title');
const roleBadgeEl = document.getElementById('role-badge');
const roleHeadlineEl = document.getElementById('role-headline');
const roleSubheadlineEl = document.getElementById('role-subheadline');
const roleIndicatorBadgeEl = document.getElementById('role-indicator-badge');
const categoriesContainerEl = document.getElementById('categories-container');
const faqsContainerEl = document.getElementById('faqs-container');
const faqsCountEl = document.getElementById('faqs-count');
const policiesContainerEl = document.getElementById('policies-container');
const searchInputEl = document.getElementById('search-input');
const clearSearchBtnEl = document.getElementById('clear-search-btn');
const appMockupImgEl = document.getElementById('app-mockup-img');
const appRoleNameEl = document.getElementById('app-role-name');
const requestCallModalEl = document.getElementById('request-call-modal');
const requestCallFormEl = document.getElementById('request-call-form');
const requestCallSuccessEl = document.getElementById('request-call-success');

// Role visual themes
const ROLE_THEMES = {
  customer: {
    accentText: 'text-brand-primary',
    accentBg: 'bg-brand-primary',
    accentBorder: 'border-brand-primary',
    ringColor: 'ring-brand-primary',
    mockup: './images/hero_phone_mockup.png',
    badgeText: 'Customer Hub',
    badgeClass: 'bg-orange-50 text-brand-primary border-orange-200'
  },
  owner: {
    accentText: 'text-amber-500',
    accentBg: 'bg-amber-500',
    accentBorder: 'border-amber-500',
    ringColor: 'ring-amber-500',
    mockup: './images/idle.png',
    badgeText: 'Machine Owner Hub',
    badgeClass: 'bg-amber-50 text-amber-600 border-amber-200'
  },
  operator: {
    accentText: 'text-teal-600',
    accentBg: 'bg-teal-600',
    accentBorder: 'border-teal-600',
    ringColor: 'ring-teal-600',
    mockup: './images/earnings.png',
    badgeText: 'Operator Hub',
    badgeClass: 'bg-teal-50 text-teal-700 border-teal-200'
  }
};

// Initialize from URL parameters
export function initRolePage() {
  const urlParams = new URLSearchParams(window.location.search);
  const roleFromUrl = urlParams.get('role');
  if (roleFromUrl && ROLES_DATA[roleFromUrl]) {
    currentRole = roleFromUrl;
  } else {
    currentRole = 'customer';
  }

  setupEventListeners();
  renderRolePage(currentRole);
}

// Switch Role
export function setRole(newRole, updateUrl = true) {
  if (!ROLES_DATA[newRole]) return;
  currentRole = newRole;
  activeCategory = 'All';
  searchQuery = '';
  if (searchInputEl) searchInputEl.value = '';

  if (updateUrl) {
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set('role', newRole);
    window.history.pushState({ role: newRole }, '', newUrl.toString());
  }

  renderRolePage(currentRole);
}

// Render the entire page based on role data
function renderRolePage(roleKey) {
  const data = ROLES_DATA[roleKey];
  const theme = ROLE_THEMES[roleKey] || ROLE_THEMES.customer;

  // Document Title
  document.title = `${data.displayName} FAQs & Policies | BookMyEquipment`;

  // Update Role Switcher Tabs
  document.querySelectorAll('.role-nav-tab').forEach(tab => {
    const target = tab.dataset.role;
    const isActive = target === roleKey;
    if (isActive) {
      tab.className = `role-nav-tab px-4 py-2 rounded-xl text-xs sm:text-sm font-bold shadow-sm transition-all duration-200 text-white ${theme.accentBg}`;
    } else {
      tab.className = `role-nav-tab px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all duration-200 cursor-pointer`;
    }
  });

  // Header Role Indicator Badge
  if (roleIndicatorBadgeEl) {
    roleIndicatorBadgeEl.className = `hidden sm:inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold border transition-colors ${theme.badgeClass}`;
    roleIndicatorBadgeEl.innerHTML = `<span class="w-1.5 h-1.5 rounded-full ${theme.accentBg}"></span><span>${theme.badgeText}</span>`;
  }

  // Hero Section texts
  if (roleBadgeEl) roleBadgeEl.textContent = data.badgeText;
  if (roleHeadlineEl) roleHeadlineEl.textContent = data.headline;
  if (roleSubheadlineEl) roleSubheadlineEl.textContent = data.subheadline;
  if (roleTitleEl) roleTitleEl.textContent = data.displayName;

  // App Section texts & mockups
  if (appRoleNameEl) appRoleNameEl.textContent = data.displayName;
  if (appMockupImgEl) {
    appMockupImgEl.src = theme.mockup;
    appMockupImgEl.alt = `${data.displayName} Mobile App Interface`;
  }

  // Pre-select role in callback modal
  const callbackRoleSelect = document.getElementById('callback-role');
  if (callbackRoleSelect) callbackRoleSelect.value = roleKey;

  // Render Categories & Content
  renderCategories(data.categories);
  renderFaqs(data.faqs);
  renderPolicies(data.policies);

  // Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

// Render Category Filter Buttons
function renderCategories(categories) {
  if (!categoriesContainerEl) return;
  categoriesContainerEl.innerHTML = categories.map(cat => {
    const isActive = cat === activeCategory;
    const activeClass = isActive
      ? 'bg-slate-900 text-white shadow-sm'
      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200';
    return `
      <button data-category="${escapeHtml(cat)}" class="category-filter-btn px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-150 whitespace-nowrap cursor-pointer ${activeClass}">
        ${escapeHtml(cat)}
      </button>
    `;
  }).join('');

  // Re-bind category click events
  categoriesContainerEl.querySelectorAll('.category-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      activeCategory = btn.dataset.category;
      renderCategories(ROLES_DATA[currentRole].categories);
      renderFaqs(ROLES_DATA[currentRole].faqs);
    });
  });
}

// Render FAQs with Accordion
function renderFaqs(faqs) {
  if (!faqsContainerEl) return;

  // Filter FAQs based on activeCategory and searchQuery
  const filtered = faqs.filter(faq => {
    const matchesCategory = activeCategory === 'All' || faq.category === activeCategory;
    if (!matchesCategory) return false;

    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return faq.question.toLowerCase().includes(q) || faq.answer.toLowerCase().includes(q) || faq.category.toLowerCase().includes(q);
  });

  if (faqsCountEl) {
    faqsCountEl.textContent = `${filtered.length} Question${filtered.length === 1 ? '' : 's'}`;
  }

  if (filtered.length === 0) {
    faqsContainerEl.innerHTML = `
      <div class="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 text-center space-y-4">
        <div class="w-14 h-14 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
          <i data-lucide="help-circle" class="w-7 h-7"></i>
        </div>
        <h4 class="text-base font-bold text-slate-800">No matching questions found</h4>
        <p class="text-sm text-slate-500 max-w-md mx-auto">We couldn't find any FAQs matching "${escapeHtml(searchQuery)}". Try searching with different keywords or request a direct callback.</p>
        <div class="pt-2 flex justify-center gap-3">
          <button id="reset-filter-btn" class="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer">
            Reset Filters
          </button>
          <button onclick="window.openCallbackModal()" class="px-4 py-2 rounded-xl bg-brand-primary hover:bg-brand-primaryDark text-white text-xs font-bold transition-colors cursor-pointer">
            Request a Call
          </button>
        </div>
      </div>
    `;
    const resetBtn = document.getElementById('reset-filter-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        searchQuery = '';
        activeCategory = 'All';
        if (searchInputEl) searchInputEl.value = '';
        renderCategories(ROLES_DATA[currentRole].categories);
        renderFaqs(ROLES_DATA[currentRole].faqs);
      });
    }
    if (typeof lucide !== 'undefined') lucide.createIcons();
    return;
  }

  faqsContainerEl.innerHTML = filtered.map((faq, index) => {
    const isFirst = index === 0;
    const answerClass = isFirst ? '' : 'hidden';
    const iconClass = isFirst ? 'rotate-180' : '';
    const expandedAttr = isFirst ? 'true' : 'false';
    return `
      <div class="faq-item group bg-white border border-slate-200 rounded-2xl overflow-hidden transition-all duration-200 hover:border-slate-300 hover:shadow-xs" data-faq-id="${faq.id}">
        <button class="faq-toggle w-full px-5 py-4 sm:px-6 sm:py-5 flex items-center justify-between text-left cursor-pointer focus:outline-none" aria-expanded="${expandedAttr}">
          <div class="pr-4 space-y-1">
            <span class="inline-block text-[11px] font-bold text-slate-400 uppercase tracking-wider">${escapeHtml(faq.category)}</span>
            <h4 class="text-sm sm:text-base font-bold text-slate-900 group-hover:text-brand-primary transition-colors">
              ${highlightText(faq.question, searchQuery)}
            </h4>
          </div>
          <div class="faq-icon-wrapper w-8 h-8 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0 text-slate-500 transition-transform duration-200 ${iconClass}">
            <i data-lucide="chevron-down" class="w-4 h-4"></i>
          </div>
        </button>
        <div class="faq-answer ${answerClass} px-5 pb-5 sm:px-6 sm:pb-6 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4 bg-slate-50/50">
          <p>${highlightText(faq.answer, searchQuery)}</p>
          <div class="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-500">
            <span>Was this answer helpful?</span>
            <div class="flex items-center space-x-2">
              <button class="faq-feedback-btn px-2.5 py-1 rounded-md bg-white border border-slate-200 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 font-medium transition-colors" data-helpful="yes">
                👍 Yes
              </button>
              <button class="faq-feedback-btn px-2.5 py-1 rounded-md bg-white border border-slate-200 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-200 font-medium transition-colors" data-helpful="no">
                👎 No
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Attach Accordion Toggle Listeners
  faqsContainerEl.querySelectorAll('.faq-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const parent = btn.closest('.faq-item');
      const answer = parent.querySelector('.faq-answer');
      const icon = btn.querySelector('.faq-icon-wrapper');
      const isOpen = !answer.classList.contains('hidden');

      // Close other accordions for clean single-view accordion
      faqsContainerEl.querySelectorAll('.faq-answer').forEach(ans => ans.classList.add('hidden'));
      faqsContainerEl.querySelectorAll('.faq-icon-wrapper').forEach(ic => ic.classList.remove('rotate-180'));
      faqsContainerEl.querySelectorAll('.faq-toggle').forEach(tg => tg.setAttribute('aria-expanded', 'false'));

      if (!isOpen) {
        answer.classList.remove('hidden');
        icon.classList.add('rotate-180');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // Attach Feedback button responses
  faqsContainerEl.querySelectorAll('.faq-feedback-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const parent = btn.parentElement;
      parent.innerHTML = `<span class="text-xs text-brand-primary font-bold">Thank you for your feedback!</span>`;
    });
  });

  if (typeof lucide !== 'undefined') lucide.createIcons();
}

// Render Policies
function renderPolicies(policies) {
  if (!policiesContainerEl) return;

  policiesContainerEl.innerHTML = policies.map((pol) => {
    return `
      <div class="policy-card bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs hover:border-slate-300 hover:shadow-md transition-all duration-200 space-y-4">
        <div class="flex items-start justify-between gap-4">
          <div class="space-y-1.5">
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200">
              ${escapeHtml(pol.tag)}
            </span>
            <h3 class="text-lg font-bold text-slate-900">${escapeHtml(pol.title)}</h3>
          </div>
          <div class="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-brand-primary shrink-0">
            <i data-lucide="shield-check" class="w-5 h-5"></i>
          </div>
        </div>

        <p class="text-sm text-slate-600 leading-relaxed font-medium">
          ${escapeHtml(pol.summary)}
        </p>

        <div class="border-t border-slate-100 pt-3">
          <h5 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Key Clauses & Terms:</h5>
          <ul class="space-y-2">
            ${pol.points.map(pt => `
              <li class="flex items-start text-xs sm:text-sm text-slate-600 space-x-2">
                <i data-lucide="check" class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5"></i>
                <span>${escapeHtml(pt)}</span>
              </li>
            `).join('')}
          </ul>
        </div>
      </div>
    `;
  }).join('');

  if (typeof lucide !== 'undefined') lucide.createIcons();
}

// Setup Event Listeners
function setupEventListeners() {
  // Role switcher clicks
  document.querySelectorAll('.role-nav-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      setRole(tab.dataset.role);
    });
  });

  // Search input live filter
  if (searchInputEl) {
    searchInputEl.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim();
      if (clearSearchBtnEl) {
        clearSearchBtnEl.classList.toggle('hidden', searchQuery.length === 0);
      }
      renderFaqs(ROLES_DATA[currentRole].faqs);
    });
  }

  // Clear search input button
  if (clearSearchBtnEl) {
    clearSearchBtnEl.addEventListener('click', () => {
      searchQuery = '';
      if (searchInputEl) searchInputEl.value = '';
      clearSearchBtnEl.classList.add('hidden');
      renderFaqs(ROLES_DATA[currentRole].faqs);
    });
  }

  // Quick keyword tags
  document.querySelectorAll('.quick-search-tag').forEach(tag => {
    tag.addEventListener('click', () => {
      const query = tag.dataset.searchQuery || tag.textContent.replace(/[⚡💰⏱📄]/g, '').trim();
      if (searchInputEl) searchInputEl.value = query;
      searchQuery = query;
      if (clearSearchBtnEl) clearSearchBtnEl.classList.remove('hidden');
      renderFaqs(ROLES_DATA[currentRole].faqs);
      document.getElementById('faqs-section')?.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Popstate event for back/forward browser navigation
  window.addEventListener('popstate', (e) => {
    const role = e.state?.role || new URLSearchParams(window.location.search).get('role') || 'customer';
    setRole(role, false);
  });

  // Modal open/close listeners
  window.openCallbackModal = () => {
    if (requestCallModalEl) {
      requestCallModalEl.style.display = 'flex';
      requestCallModalEl.classList.remove('hidden');
      requestCallModalEl.classList.add('flex');
      if (requestCallSuccessEl) requestCallSuccessEl.classList.add('hidden');
      if (requestCallFormEl) requestCallFormEl.classList.remove('hidden');
    }
  };

  window.closeCallbackModal = () => {
    if (requestCallModalEl) {
      requestCallModalEl.style.display = 'none';
      requestCallModalEl.classList.add('hidden');
      requestCallModalEl.classList.remove('flex');
    }
  };

  document.querySelectorAll('.open-callback-modal-btn').forEach(btn => {
    btn.addEventListener('click', window.openCallbackModal);
  });

  document.querySelectorAll('.close-callback-modal-btn').forEach(btn => {
    btn.addEventListener('click', window.closeCallbackModal);
  });

  requestCallModalEl?.addEventListener('click', (e) => {
    if (e.target === requestCallModalEl) window.closeCallbackModal();
  });

  // Form submission handler
  requestCallFormEl?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('callback-name')?.value || 'Valued User';
    const phone = document.getElementById('callback-phone')?.value || '';
    
    if (requestCallFormEl) requestCallFormEl.classList.add('hidden');
    if (requestCallSuccessEl) {
      requestCallSuccessEl.classList.remove('hidden');
      const confirmPhoneEl = document.getElementById('confirmed-phone');
      if (confirmPhoneEl) confirmPhoneEl.textContent = phone;
    }
    if (typeof lucide !== 'undefined') lucide.createIcons();
  });

  // Mobile menu toggle
  const mobileToggle = document.getElementById('role-mobile-toggle');
  const mobileMenu = document.getElementById('role-mobile-menu');
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }
}

// Utility: Text highlighter for search matches
function highlightText(text, query) {
  if (!query) return escapeHtml(text);
  const regex = new RegExp(`(${escapeRegex(query)})`, 'gi');
  return escapeHtml(text).replace(regex, '<mark class="bg-amber-100 text-amber-900 rounded px-1 font-bold">$1</mark>');
}

// Escape HTML
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Auto start when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initRolePage);
} else {
  initRolePage();
}
