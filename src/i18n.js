import common from './locales/common.json' with { type: 'json' };
import pages from './locales/pages.json' with { type: 'json' };
import forms from './locales/forms.json' with { type: 'json' };

export const localeOptions = [
  ['en', 'English'],
  ['te', 'తెలుగు'],
  ['hi', 'हिन्दी']
];

const storageKey = 'bme.site-language';

function cleanText(s) {
  if (!s) return '';
  return s
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&copy;/g, '©')
    .replace(/&mdash;/g, '—')
    .replace(/&ndash;/g, '–')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&#8377;/g, '₹')
    .replace(/&#x2764;|&hearts;/g, '❤️')
    .replace(/&bull;/g, '•')
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/\s+/g, ' ')
    .trim();
}

function normalizeKey(s) {
  return cleanText(s)
    .replace(/^["']+|["']+$/g, '')
    .trim()
    .toLowerCase();
}

// Additional site-specific phrases for complete coverage
const additionalPhrases = {
  'our services': ['మా సేవలు', 'हमारी सेवाएँ'],
  'comprehensive solutions for heavy construction': ['భారీ నిర్మాణానికి సమగ్ర పరిష్కారాలు', 'भारी निर्माण के लिए संपूर्ण समाधान'],
  'from on-demand machinery hire and certified operators to fleet telematics and rapid field support.': [
    'ఆన్-డిమాండ్ యంత్రాల అద్దె, ధృవీకరించబడిన ఆపరేటర్ల నుండి ఫ్లీట్ టెలిమాటిక్స్ మరియు శీగ్ర ఫీల్డ్ మద్దతు వరకు.',
    'ऑन-डिमांड मशीन किराये और प्रमाणित ऑपरेटरों से लेकर फ्लीट टेलीमैटिक्स और त्वरित फील्ड सहायता तक।'
  ],
  'total estimated rental outlay (approx.)': [
    'మొత్తం అంచనా అద్దె వ్యయం (సుమారు)',
    'कुल अनुमानित किराया व्यय (लगभग)'
  ],
  'estimated rental cost': ['అంచనా అద్దె ఖర్చు', 'अनुमानित किराया लागत'],
  'estimated rental cost (': ['అంచనా అద్దె ఖర్చు (', 'अनुमानित किराया लागत ('],
  'direct site dispatch': ['నేరుగా సైట్ డెలివరీ', 'सीधे साइट पर डिस्पैच'],
  'where we deliver heavy machinery': [
    'మేము భారీ యంత్రాలను ఎక్కడ డెలివరీ చేస్తాము',
    'हम भारी मशीनें कहाँ डिलीवर करते हैं'
  ],
  'currently powering construction sites with live dispatch across greater hyderabad, expanding rapidly to premier infrastructure hubs across india.': [
    'గ్రేటర్ హైదరాబాద్ అంతటా ప్రత్యక్ష డెలివరీతో నిర్మాణ సైట్‌లకు సేవలు అందిస్తున్నాము, భారతదేశంలోని ప్రధాన మౌలిక సదుపాయాల కేంద్రాలకు వేగంగా విస్తరిస్తున్నాము.',
    'ग्रेटर हैदराबाद में त्वरित डिलीवरी के साथ निर्माण स्थलों को सशक्त बना रहे हैं, भारत भर के प्रमुख इंफ्रास्ट्रक्चर हब में तेज़ी से विस्तार कर रहे हैं।'
  ],
  'headquarters hub': ['ప్రధాన కార్యాలయ కేంద్రం', 'मुख्यालय केंद्र'],
  'operational coverage': ['కార్యాచరణ పరిధి', 'పరిచాలన్ కవరేజ్'],
  'instant roi & capital preservation': ['తక్షణ రాబడి & పెట్టుబడి రక్షణ', 'त्वरित रिटर्न व पूंजी संरक्षण'],
  'project requirements': ['ప్రాజెక్ట్ అవసరాలు', 'परियोजना की आवश्यकताएँ'],
  'cash outflow comparison (approximate)': ['చెల్లింపుల పోలిక (సుమారు)', 'नकद भुगतान की तुलना (लगभग)'],
  'rental cash outflow (approx.)': ['అద్దె చెల్లింపు (సుమారు)', 'किराया नकद भुगतान (लगभग)'],
  'purchase cash outflow (approx.)': ['కొనుగోలు చెల్లింపు (సుమారు)', 'खरीद नकद भुगतान (लगभग)'],
  'why renting beats buying every time': [
    'కొనుగోలు కంటే అద్దె ఎందుకు ఎల్లప్పుడూ మేలు',
    'खरीदने की तुलना में किराये पर लेना हमेशा बेहतर क्यों है'
  ],
  'renting has lower estimated cash outflow by': [
    'అద్దె తీసుకోవడం ద్వారా సుమారు పొదుపు',
    'किराये पर लेने से अनुमानित कम नकद खर्च'
  ],
  'purchasing has lower estimated cash outflow by': [
    'కొనుగోలు చేయడం ద్వారా సుమారు పొదుపు',
    'खरीदने से अनुमानित कम नकद खर्च'
  ],
  'both options have the same estimated cash outflow.': [
    'రెండు ఎంపికలు ఒకే విధమైన అంచనా వ్యయాన్ని కలిగి ఉన్నాయి.',
    'दोनों विकल्पों में समान अनुमानित नकद खर्च है।'
  ],
  'download app to list fleet': ['ఫ్లీట్‌ను నమోదు చేయడానికి యాప్ డౌన్‌లోడ్ చేయండి', 'मशीनें लिस्ट करने के लिए ऐप डाउनलोड करें'],
  'download app': ['యాప్ డౌన్‌లోడ్ చేసుకోండి', 'ऐप डाउनलोड करें'],
  'download app now': ['ఇప్పుడే యాప్‌ను డౌన్‌లోడ్ చేయండి', 'अभी ऐप डाउनलोड करें'],
  'immediate dispatch': ['తక్షణ డెలివరీ', 'तत्काल डिस्पैच'],
  'calculate': ['లెక్కించండి', 'गणना करें'],
  'learn more': ['మరింత తెలుసుకోండి', 'और जानें'],
  'request custom quotation': ['ప్రత్యేక కొటేషన్ అడగండి', 'कस्टम कोटेशन का अनुरोध करें'],
  'total rental outlay': ['మొత్తం అద్దె వ్యయం', 'कुल किराया खर्च'],
  'all-inclusive transparent rate': ['అన్నీ చేర్చబడిన పారదర్శక ధర', 'सब-शामिल पारदर्शी दर'],
  '₹0 down payment • free operator included': ['₹0 డౌన్ పేమెంట్ • ఉచిత ఆపరేటర్ చేర్చబడింది', '₹0 डाउन पेमेंट • मुफ्त ऑपरेटर शामिल'],
  'zero upfront down payment': ['జీరో డౌన్ పేమెంట్', 'शून्य डाउन पेमेंट'],
  'pay only for active hire period, ₹0 capital blocked': ['పని కాలానికి మాత్రమే చెల్లించండి, ₹0 పెట్టుబడి బ్లాక్', 'केवल काम के समय का भुगतान करें, ₹0 पूंजी ब्लॉक'],
  'verified certified operator': ['ధృవీకరించబడిన ఆపరేటర్', 'सत्यापित प्रमाणित ऑपरेटर'],
  'included with commercial driving license & 3+ yrs exp': ['కమర్షియల్ లైసెన్స్ & 3+ ఏళ్ల అనుభవం చేర్చబడింది', 'कमर्शियल लाइसेंस व 3+ वर्ष अनुभव शामिल'],
  '100% free maintenance & servicing': ['100% ఉచిత నిర్వహణ & సర్వీసింగ్', '100% मुफ्त रखरखाव व सर्विसिंग'],
  '3-hour mechanic sla with free standby replacement': ['ఉచిత రీప్లేస్‌మెంట్‌తో 3 గంటల్లో మెకానిక్ హామీ', 'फ्री रिप्लेसमेंट के साथ 3 घंटे में मैकेनिक गारंटी'],
  'flexible hire & instant return': ['సౌకర్యవంతమైన అద్దె & తక్షణ రిటర్న్', 'लचीला किराया व त्वरित रिटर्न'],
  'extend or return whenever site finishes, zero idle penalty': ['పని పూర్తయిన వెంటనే తిరిగి ఇవ్వండి, నిరుపయోగ రుసుము లేదు', 'काम पूरा होते ही वापस करें, कोई अतिरिक्त शुल्क नहीं'],
  'earn up to': ['వరకు సంపాదించండి', 'तक कमाएं'],
  'direct bank payout': ['నేరుగా బ్యాంక్ చెల్లింపు', 'सीधा बैंक भुगतान'],
  'book via bookmyequipment app': ['BookMyEquipment యాప్ ద్వారా బుక్ చేసుకోండి', 'BookMyEquipment ऐप द्वारा बुक करें'],
  'live gps tracking, verified driver & delivery in 2-4 hours.': [
    'లైవ్ జీపీఎస్ ట్రాకింగ్, ధృవీకరించబడిన డ్రైవర్ & 2-4 గంటల్లో డెలివరీ.',
    'लाइव जीपीएस ट्रैकिंग, सत्यापित ड्राइवर व 2-4 घंटे में डिलीवरी।'
  ]
};

const dictionary = new Map();

for (const [source, values] of Object.entries({ ...common, ...pages, ...forms, ...additionalPhrases })) {
  dictionary.set(normalizeKey(source), values);
}

let locale = 'en';

export const getLocale = () => locale;

export function translate(text, language = locale) {
  if (language === 'en' || !['te', 'hi'].includes(language)) return text;
  if (!text || typeof text !== 'string') return text;
  const index = language === 'te' ? 0 : 1;
  const cleaned = cleanText(text);
  if (!cleaned) return text;

  // 1. Direct dictionary match with quote preservation
  const normKey = normalizeKey(cleaned);
  let found = dictionary.get(normKey);
  if (found) {
    const leadingWs = text.match(/^\s*/)[0];
    const trailingWs = text.match(/\s*$/)[0];
    const trans = found[index];
    const hasQuotes = (cleaned.startsWith('"') && cleaned.endsWith('"')) || (cleaned.startsWith("'") && cleaned.endsWith("'"));
    if (hasQuotes && !trans.startsWith('"') && !trans.startsWith("'")) {
      return `${leadingWs}"${trans}"${trailingWs}`;
    }
    return `${leadingWs}${trans}${trailingWs}`;
  }

  // 2. Dynamic money and duration patterns
  const approxMoney = cleaned.match(/^Approx\.\s*₹\s*([\d,]+)(\s*\/\s*month)?$/i);
  if (approxMoney) {
    const word = index === 0 ? 'సుమారు' : 'लगभग';
    const month = index === 0 ? 'నెల' : 'माह';
    return `${word} ₹ ${approxMoney[1]}${approxMoney[2] ? ` / ${month}` : ''}`;
  }

  const approxMoneyMonthParen = cleaned.match(/^\(~Approx\.\s*₹\s*([\d,]+)\s*\/\s*month\)$/i);
  if (approxMoneyMonthParen) {
    const word = index === 0 ? 'సుమారు' : 'लगभग';
    const month = index === 0 ? 'నెల' : 'माह';
    return `(~${word} ₹ ${approxMoneyMonthParen[1]} / ${month})`;
  }

  const plainMoneyParen = cleaned.match(/^\(~₹\s*([\d,]+)\s*\/\s*month\)$/i);
  if (plainMoneyParen) {
    const word = index === 0 ? 'సుమారు' : 'लगभग';
    const month = index === 0 ? 'నెల' : 'माह';
    return `(~${word} ₹ ${plainMoneyParen[1]} / ${month})`;
  }

  const rentOutlayParen = cleaned.match(/^(₹\s*[\d,]+)\s*\(\s*(?:~|~Approx\.)?\s*₹\s*([\d,]+)\s*\/\s*month\s*\)$/i);
  if (rentOutlayParen) {
    const word = index === 0 ? 'సుమారు' : 'लगभग';
    const month = index === 0 ? 'నెల' : 'माह';
    return `${rentOutlayParen[1]} (~${word} ₹ ${rentOutlayParen[2]} / ${month})`;
  }

  const rentOutlayOnly = cleaned.match(/^₹\s*([\d,]+)$/);
  if (rentOutlayOnly) {
    return text; // Pure currency format unchanged
  }

  const monthsHire = cleaned.match(/^(\d+)\s*Months?\s*Hire$/i);
  if (monthsHire) {
    const unit = index === 0 ? 'నెలల అద్దె' : 'महीनों का किराया';
    return `${monthsHire[1]} ${unit}`;
  }

  const rentSavings = cleaned.match(/^Renting has lower estimated cash outflow by\s*(?:Approx\.\s*)?₹\s*([\d,]+)/i);
  if (rentSavings) {
    return index === 0
      ? `అద్దె తీసుకోవడం ద్వారా సుమారు ₹ ${rentSavings[1]} తక్కువ వ్యయం అవుతుంది`
      : `किराये पर लेने से लगभग ₹ ${rentSavings[1]} कम नकद खर्च होगा`;
  }

  const buySavings = cleaned.match(/^Purchas(?:ing|e) has lower estimated cash outflow by\s*(?:Approx\.\s*)?₹\s*([\d,]+)/i);
  if (buySavings) {
    return index === 0
      ? `కొనుగోలు చేయడం ద్వారా సుమారు ₹ ${buySavings[1]} తక్కువ వ్యయం అవుతుంది`
      : `खरीदने से लगभग ₹ ${buySavings[1]} कम नकद खर्च होगा`;
  }

  const earnMonthly = cleaned.match(/^Earn up to\s*(?:Approx\.\s*)?₹\s*([\d,]+)\s*\/\s*month/i);
  if (earnMonthly) {
    return index === 0
      ? `నెలకు సుమారు ₹ ${earnMonthly[1]} వరకు సంపాదించండి`
      : `प्रति माह लगभग ₹ ${earnMonthly[1]} तक कमाएं`;
  }

  const limit = cleaned.match(/^Use no more than (\d+) characters\.$/);
  if (limit) return index === 0 ? `${limit[1]} అక్షరాలకు మించకుండా నమోదు చేయండి.` : `अधिकतम ${limit[1]} अक्षर दर्ज करें।`;

  const details = cleaned.match(/^View (.+) details$/);
  if (details) return index === 0 ? `${translate(details[1], language)} వివరాలు చూడండి` : `${translate(details[1], language)} का विवरण देखें`;

  const service = cleaned.match(/^Enquire about (.+)$/);
  if (service) return index === 0 ? `${translate(service[1], language)} గురించి విచారించండి` : `${translate(service[1], language)} के बारे में पूछें`;

  const slide = cleaned.match(/^Slide (\d+): (.+)$/);
  if (slide) return `${index === 0 ? 'స్లైడ్' : 'स्लाइड'} ${slide[1]}: ${translate(slide[2], language)}`;

  const title = cleaned.split(' | ');
  if (title.length > 1) return title.map(part => translate(part, language)).join(' | ');

  const money = cleaned.match(/^(₹[\d, .]+)\s*(\/ day|\/month)$/);
  if (money) return `${money[1].trim()} / ${money[2] === '/month' ? (index === 0 ? 'నెల' : 'माह') : (index === 0 ? 'రోజు' : 'दिन')}`;

  return text;
}

export const hasTranslation = text => dictionary.has(normalizeKey(text));

export function initSiteLanguage() {
  const header = document.querySelector('header');
  if (!header) return;

  try {
    const saved = window.localStorage.getItem(storageKey);
    locale = localeOptions.some(([id]) => id === saved) ? saved : 'en';
  } catch {
    locale = 'en';
  }

  // Find all language select dropdowns on the page
  let selects = Array.from(document.querySelectorAll('.site-language-select, #site-language'));

  // If no language selector was statically rendered in header, insert fallback
  if (selects.length === 0) {
    const control = document.createElement('div');
    control.className = 'site-language-control';
    control.dataset.i18nIgnore = '';
    control.innerHTML = `
      <label class="sr-only" for="site-language">
        <span lang="en">Language</span> / <span lang="te">భాష</span> / <span lang="hi">भाषा</span>
      </label>
      <svg class="language-globe" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
        <circle cx="12" cy="12" r="9"/>
        <path d="M3 12h18M12 3a18 18 0 0 1 0 18 18 18 0 0 1 0-18Z"/>
      </svg>
      <select id="site-language" class="site-language-select" aria-label="Select Language">
        ${localeOptions.map(([id, label]) => `<option value="${id}" lang="${id}">${label}</option>`).join('')}
      </select>
      <svg class="language-chevron" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
        <path d="m4 6 4 4 4-4"/>
      </svg>
    `;

    header.classList.add('has-language-selector');

    const mobileToggle = header.querySelector('#mobile-menu-toggle, #mobile-toggle');
    if (mobileToggle && mobileToggle.parentElement) {
      mobileToggle.parentElement.insertBefore(control, mobileToggle);
    } else {
      const navContainer = header.querySelector('.max-w-7xl > div') || header;
      navContainer.appendChild(control);
    }

    selects = Array.from(document.querySelectorAll('.site-language-select, #site-language'));
  }

  // Bind change events to all selects and sync their values
  selects.forEach(select => {
    select.value = locale;
    select.addEventListener('change', () => apply(select.value));
  });

  if (header.classList.contains('fixed')) {
    document.body.classList.add('has-fixed-language-header');
  }

  const texts = new WeakMap();
  const attributes = new WeakMap();
  const initialTitle = document.title;

  const ignored = element => element.closest('script,style,noscript,[data-i18n-ignore]');

  function render(root = document.body) {
    if (root.nodeType === 3) {
      renderText(root);
      return;
    }
    if (root.nodeType !== 1 || ignored(root)) return;

    for (const element of [root, ...root.querySelectorAll('[placeholder],[aria-label],[title],img[alt]')]) {
      if (ignored(element)) continue;
      let cache = attributes.get(element);
      if (!cache) {
        cache = {};
        attributes.set(element, cache);
      }
      for (const name of ['placeholder', 'aria-label', 'title', 'alt']) {
        if (!element.hasAttribute(name)) continue;
        const current = element.getAttribute(name);
        const old = cache[name];
        const source = old && old.rendered === current ? old.source : current;
        const rendered = translate(source);
        cache[name] = { source, rendered };
        if (current !== rendered) element.setAttribute(name, rendered);
      }
    }

    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      renderText(node);
    }
  }

  function renderText(node) {
    if (!node.parentElement || ignored(node.parentElement) || !node.textContent.trim()) return;
    const old = texts.get(node);
    const current = node.textContent;
    const source = old && old.rendered === current ? old.source : current;
    const rendered = translate(source);
    texts.set(node, { source, rendered });
    if (current !== rendered) node.textContent = rendered;
  }

  const observer = new MutationObserver(records => {
    observer.disconnect();
    const roots = new Set(records.map(record => record.target));
    for (const root of roots) render(root);
    observe();
  });

  function observe() {
    observer.observe(document.body, {
      subtree: true,
      childList: true,
      characterData: true,
      attributes: true,
      attributeFilter: ['placeholder', 'aria-label', 'title', 'alt']
    });
  }

  function apply(next, remember = true) {
    locale = localeOptions.some(([id]) => id === next) ? next : 'en';

    // Synchronize all selects on the page
    document.querySelectorAll('.site-language-select, #site-language').forEach(sel => {
      sel.value = locale;
    });

    if (remember) {
      try {
        window.localStorage.setItem(storageKey, locale);
      } catch {
        /* storage disabled / private mode */
      }
    }

    observer.disconnect();
    document.documentElement.lang = locale;
    document.title = translate(initialTitle);
    render();
    observe();

    window.dispatchEvent(new CustomEvent('bme:language-change', { detail: locale }));
  }

  window.addEventListener('storage', event => {
    if (event.key === storageKey) apply(event.newValue, false);
  });

  window.addEventListener('pagehide', () => observer.disconnect());

  window.addEventListener('pageshow', event => {
    if (event.persisted) {
      let saved = locale;
      try {
        saved = window.localStorage.getItem(storageKey) || locale;
      } catch {
        /* Keep choice */
      }
      apply(saved, false);
    }
  });

  apply(locale, false);

  return {
    setLocale: apply,
    disconnect: () => observer.disconnect()
  };
}

// Auto-initialize when DOM is ready
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initSiteLanguage());
  } else {
    initSiteLanguage();
  }
}
