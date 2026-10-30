"""
BookMyEquipment – Website Review PDFs
Generates 3 PDFs (English, Hindi, Telugu) documenting every screen,
section, popup and interaction on the site.
"""

import os
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.units import mm
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_RIGHT
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    HRFlowable, PageBreak, KeepTogether
)
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

# ── Output folder ──────────────────────────────────────────────────────────────
OUT_DIR = os.path.join(os.path.dirname(__file__), "..", "dist")
os.makedirs(OUT_DIR, exist_ok=True)

# ── Brand colours ──────────────────────────────────────────────────────────────
ORANGE      = colors.HexColor("#F97316")
ORANGE_DARK = colors.HexColor("#EA580C")
TEAL        = colors.HexColor("#0D9488")
AMBER       = colors.HexColor("#D97706")
SLATE_900   = colors.HexColor("#0F172A")
SLATE_600   = colors.HexColor("#475569")
SLATE_400   = colors.HexColor("#94A3B8")
SLATE_100   = colors.HexColor("#F1F5F9")
SLATE_50    = colors.HexColor("#F8FAFC")
WHITE       = colors.white
SUCCESS     = colors.HexColor("#16A34A")
ERROR       = colors.HexColor("#DC2626")
INFO        = colors.HexColor("#0284C7")

# ── Font registration (fallback to Helvetica if TTF not found) ─────────────────
FONT_NORMAL = "Helvetica"
FONT_BOLD   = "Helvetica-Bold"

def try_register(name, path):
    try:
        pdfmetrics.registerFont(TTFont(name, path))
        return True
    except Exception:
        return False

# Try to find a Unicode font for Devanagari / Telugu
UNICODE_FONT = None
candidates = [
    ("NotoSans", r"C:\Windows\Fonts\NotoSans-Regular.ttf"),
    ("NotoSans", r"C:\Windows\Fonts\arial.ttf"),
]
for fname, fpath in candidates:
    if try_register(fname, fpath):
        UNICODE_FONT = fname
        break

# ── Style helpers ──────────────────────────────────────────────────────────────
def make_styles():
    base = getSampleStyleSheet()
    add = lambda **kw: ParagraphStyle(**kw)

    cover_title = add(
        name="CoverTitle",
        fontName=FONT_BOLD, fontSize=28, leading=34,
        textColor=WHITE, alignment=TA_CENTER, spaceAfter=8
    )
    cover_sub = add(
        name="CoverSub",
        fontName=FONT_NORMAL, fontSize=13, leading=18,
        textColor=colors.HexColor("#FFEDD5"), alignment=TA_CENTER, spaceAfter=4
    )
    cover_lang = add(
        name="CoverLang",
        fontName=FONT_BOLD, fontSize=16, leading=20,
        textColor=colors.HexColor("#F59E0B"), alignment=TA_CENTER, spaceAfter=12
    )
    page_title = add(
        name="PageTitle",
        fontName=FONT_BOLD, fontSize=18, leading=22,
        textColor=ORANGE, alignment=TA_LEFT, spaceAfter=4, spaceBefore=16
    )
    section_h = add(
        name="SectionH",
        fontName=FONT_BOLD, fontSize=13, leading=17,
        textColor=SLATE_900, alignment=TA_LEFT, spaceAfter=3, spaceBefore=10
    )
    sub_h = add(
        name="SubH",
        fontName=FONT_BOLD, fontSize=11, leading=14,
        textColor=ORANGE_DARK, alignment=TA_LEFT, spaceAfter=2, spaceBefore=6
    )
    popup_h = add(
        name="PopupH",
        fontName=FONT_BOLD, fontSize=11, leading=14,
        textColor=INFO, alignment=TA_LEFT, spaceAfter=2, spaceBefore=6
    )
    body = add(
        name="BodyText2",
        fontName=FONT_NORMAL, fontSize=9.5, leading=13.5,
        textColor=SLATE_600, alignment=TA_LEFT, spaceAfter=3
    )
    desc = add(
        name="Desc",
        fontName=FONT_NORMAL, fontSize=9, leading=12.5,
        textColor=SLATE_600, alignment=TA_LEFT, spaceAfter=2
    )
    label = add(
        name="Label",
        fontName=FONT_BOLD, fontSize=8.5, leading=11,
        textColor=SLATE_400, alignment=TA_LEFT, spaceAfter=1
    )
    pill = add(
        name="Pill",
        fontName=FONT_BOLD, fontSize=8, leading=10,
        textColor=ORANGE, alignment=TA_LEFT, spaceAfter=1
    )
    toc = add(
        name="TOC",
        fontName=FONT_NORMAL, fontSize=9.5, leading=14,
        textColor=SLATE_600, leftIndent=8
    )
    toc_h = add(
        name="TOCH",
        fontName=FONT_BOLD, fontSize=10.5, leading=15,
        textColor=SLATE_900, leftIndent=0, spaceBefore=4
    )
    return dict(
        cover_title=cover_title, cover_sub=cover_sub,
        cover_lang=cover_lang, page_title=page_title,
        section_h=section_h, sub_h=sub_h, popup_h=popup_h,
        body=body, desc=desc, label=label, pill=pill,
        toc=toc, toc_h=toc_h
    )

S = make_styles()

# ── Reusable flowable builders ─────────────────────────────────────────────────
def spacer(h=4):
    return Spacer(1, h * mm)

def hr(color=SLATE_100, thickness=0.8):
    return HRFlowable(width="100%", thickness=thickness, color=color, spaceAfter=4, spaceBefore=4)

def section_badge(text, bg=ORANGE):
    """Coloured badge row acting as a section divider."""
    data = [[Paragraph(f'<font color="white"><b>{text}</b></font>', S["label"])]]
    t = Table(data, colWidths=[170*mm])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0,0), (-1,-1), bg),
        ("ROUNDEDCORNERS", [4,4,4,4]),
        ("TOPPADDING",    (0,0), (-1,-1), 4),
        ("BOTTOMPADDING", (0,0), (-1,-1), 4),
        ("LEFTPADDING",   (0,0), (-1,-1), 8),
        ("RIGHTPADDING",  (0,0), (-1,-1), 8),
    ]))
    return t

def info_box(lines, bg=SLATE_50, border=SLATE_100):
    """Light card box for structured info."""
    rows = [[Paragraph(l, S["desc"])] for l in lines]
    t = Table(rows, colWidths=[166*mm])
    t.setStyle(TableStyle([
        ("BACKGROUND",    (0,0), (-1,-1), bg),
        ("BOX",           (0,0), (-1,-1), 0.5, border),
        ("TOPPADDING",    (0,0), (-1,-1), 3),
        ("BOTTOMPADDING", (0,0), (-1,-1), 3),
        ("LEFTPADDING",   (0,0), (-1,-1), 8),
        ("RIGHTPADDING",  (0,0), (-1,-1), 8),
    ]))
    return t

def popup_box(trigger, description, contents):
    """Highlighted box for popup / modal documentation."""
    header = Paragraph(f'🔲 <b>POPUP / MODAL</b>', S["popup_h"])
    trig   = Paragraph(f'<b>Trigger:</b> {trigger}', S["desc"])
    descr  = Paragraph(f'<b>What it shows:</b> {description}', S["desc"])
    rows   = [[header], [trig], [descr]]
    for c in contents:
        rows.append([Paragraph(f'• {c}', S["desc"])])
    t = Table(rows, colWidths=[166*mm])
    t.setStyle(TableStyle([
        ("BACKGROUND",    (0,0), (-1,-1), colors.HexColor("#EFF6FF")),
        ("BOX",           (0,0), (-1,-1), 1, INFO),
        ("LEFTPADDING",   (0,0), (-1,-1), 8),
        ("RIGHTPADDING",  (0,0), (-1,-1), 8),
        ("TOPPADDING",    (0,0), (-1,-1), 3),
        ("BOTTOMPADDING", (0,0), (-1,-1), 3),
    ]))
    return t

def two_col_table(rows, w1=55, w2=111):
    data = [[Paragraph(f'<b>{k}</b>', S["label"]),
             Paragraph(v, S["desc"])] for k, v in rows]
    t = Table(data, colWidths=[w1*mm, w2*mm])
    t.setStyle(TableStyle([
        ("BACKGROUND",    (0,0), (0,-1), SLATE_50),
        ("LINEBELOW",     (0,0), (-1,-2), 0.4, SLATE_100),
        ("TOPPADDING",    (0,0), (-1,-1), 3),
        ("BOTTOMPADDING", (0,0), (-1,-1), 3),
        ("LEFTPADDING",   (0,0), (-1,-1), 6),
        ("RIGHTPADDING",  (0,0), (-1,-1), 6),
        ("VALIGN",        (0,0), (-1,-1), "TOP"),
    ]))
    return t

# ── Cover page ─────────────────────────────────────────────────────────────────
def cover_page(lang_name, lang_native, lang_code, doc_date="October 2026"):
    story = []

    # Full-bleed colour header simulation via a Table
    title_data = [
        [Paragraph("BME", ParagraphStyle("bme", fontName=FONT_BOLD,
            fontSize=36, textColor=WHITE, alignment=TA_CENTER))],
        [Paragraph("BookMyEquipment", ParagraphStyle("bme2", fontName=FONT_BOLD,
            fontSize=22, textColor=colors.HexColor("#FFEDD5"), alignment=TA_CENTER))],
        [Paragraph("India's #1 B2B Heavy Equipment Rental Platform", S["cover_sub"])],
        [spacer(3)],
        [Paragraph("WEBSITE REVIEW DOCUMENT", ParagraphStyle("wr", fontName=FONT_BOLD,
            fontSize=13, textColor=colors.HexColor("#F59E0B"), alignment=TA_CENTER))],
        [Paragraph(f"Complete Screen &amp; Feature Walkthrough", S["cover_sub"])],
        [spacer(5)],
        [Paragraph(f"Language: {lang_name}  ({lang_native})", S["cover_lang"])],
        [spacer(2)],
        [Paragraph(f"Document Date: {doc_date}", ParagraphStyle("dt", fontName=FONT_NORMAL,
            fontSize=10, textColor=SLATE_400, alignment=TA_CENTER))],
    ]
    cover_tbl = Table(title_data, colWidths=[170*mm])
    cover_tbl.setStyle(TableStyle([
        ("BACKGROUND",    (0,0), (-1,-1), ORANGE),
        ("TOPPADDING",    (0,0), (-1,-1), 5),
        ("BOTTOMPADDING", (0,0), (-1,-1), 5),
        ("LEFTPADDING",   (0,0), (-1,-1), 12),
        ("RIGHTPADDING",  (0,0), (-1,-1), 12),
    ]))
    story.append(cover_tbl)
    story.append(spacer(8))

    # Document info grid
    info_rows = [
        ("Pages",        "~40+ Comprehensive Screen Descriptions"),
        ("Pages Covered","Home, About, Contact, Customer, Machine Owner, Operator"),
        ("Modals",       "Equipment Details, Quote/Enquiry, Video Fleet, Live Search, Callback"),
        ("Languages",    "English (en) · Telugu (te) · Hindi (hi)"),
        ("Audience",     "Product review, stakeholder presentations, QA team"),
    ]
    story.append(Paragraph("Document Overview", S["section_h"]))
    story.append(hr())
    story.append(two_col_table(info_rows))
    story.append(spacer(6))

    # Table of contents
    story.append(Paragraph("Table of Contents", S["section_h"]))
    story.append(hr())
    toc_items = [
        ("1.", "Global Navigation & Header", "Navbar, Language Switcher, Role Buttons, Mobile Menu"),
        ("2.", "Home Page — Hero Section", "4-Slide Carousel with equipment categories"),
        ("3.", "Home Page — Equipment Fleet Section", "14 machines in 4 categories + filter tabs"),
        ("4.", "Home Page — How It Works Section", "3-role process flow (Customer / Owner / Operator)"),
        ("5.", "Home Page — App Download Section", "Google Play & App Store badges, stats"),
        ("6.", "Home Page — Testimonials Section", "Rotating customer reviews slider"),
        ("7.", "Home Page — CTA Section", "Final call-to-action band"),
        ("8.", "Home Page — Footer", "Links, contact info, social"),
        ("9.", "About Us Page", "Mission, Vision, Values, Market Fix, Ecosystem sections"),
        ("10.", "Contact Us Page", "Contact form, success confirmation"),
        ("11.", "Customer Role Page", "Rent-vs-Buy estimator, Why section, FAQs, App download"),
        ("12.", "Machine Owner Role Page", "Earnings calculator, listing steps, owner FAQs"),
        ("13.", "Operator Role Page", "Skill profile, job matching, pay info, operator FAQs"),
        ("14.", "POPUP: Equipment Details Modal", "Triggered by clicking any equipment card"),
        ("15.", "POPUP: Get a Quote Modal", "Triggered by 'Get Quote' / 'Book Now' buttons"),
        ("16.", "POPUP: Video Fleet Modal", "Triggered by 'Watch Fleet in Action' button"),
        ("17.", "POPUP: Live Search Modal", "Triggered by Search icon in nav"),
        ("18.", "POPUP: Callback Request Modal", "Triggered on Customer/Owner/Operator pages"),
        ("19.", "Mobile Responsive Behaviour", "Hamburger menu & stacked layout"),
        ("20.", "Multi-Language Switching", "EN / TE / HI site-wide translation"),
    ]
    for num, title, detail in toc_items:
        row_data = [[
            Paragraph(f'<b>{num}</b>', S["toc_h"]),
            Paragraph(f'<b>{title}</b><br/><font color="#94A3B8" size="8">{detail}</font>', S["toc"])
        ]]
        tbl = Table(row_data, colWidths=[12*mm, 158*mm])
        tbl.setStyle(TableStyle([
            ("VALIGN",        (0,0),(-1,-1),"TOP"),
            ("LEFTPADDING",   (0,0),(-1,-1), 0),
            ("RIGHTPADDING",  (0,0),(-1,-1), 0),
            ("TOPPADDING",    (0,0),(-1,-1), 2),
            ("BOTTOMPADDING", (0,0),(-1,-1), 2),
            ("LINEBELOW",     (0,0),(-1,-1), 0.3, SLATE_100),
        ]))
        story.append(tbl)

    story.append(PageBreak())
    return story

# ══════════════════════════════════════════════════════════════════════════════
# CONTENT SECTIONS
# ══════════════════════════════════════════════════════════════════════════════

def section_01_navbar():
    s = []
    s.append(section_badge("SCREEN 1 · GLOBAL NAVIGATION & HEADER  (All Pages)", bg=SLATE_900))
    s.append(spacer(3))
    s.append(Paragraph("Navigation Bar — Top Fixed Header", S["page_title"]))
    s.append(Paragraph(
        "This fixed header is present on <b>every page</b> of the website. "
        "It stays at the top while the user scrolls. It contains the logo, "
        "navigation links, a language selector, and three role-based CTA buttons.",
        S["body"]))
    s.append(spacer(2))

    s.append(Paragraph("Header Elements", S["section_h"]))
    s.append(two_col_table([
        ("Logo / Brand",    "Orange 'BME' badge + 'Heavy Equipment · BookMyEquipment' text. Clicking it navigates to the Home page."),
        ("Desktop Nav",     "Three text links — Home · About Us · Contact Us — highlighted with orange underline on active page."),
        ("Language Control","Globe icon + dropdown with EN / Telugu / Hindi. Changes entire site language."),
        ("Role Buttons",    "'I'm Customer' (orange border) · 'I'm Machine Owner' (amber border) · 'I'm Operator' (teal border). Each navigates to its role-specific sub-page."),
        ("Mobile Toggle",   "Hamburger ☰ icon visible on small screens (< 1024 px). Opens slide-down mobile menu."),
    ]))
    s.append(spacer(3))

    s.append(KeepTogether([
        popup_box(
            trigger="Hamburger ☰ icon (mobile, < 1024 px screens)",
            description="A slide-down panel that replaces the desktop nav. Opens below the header.",
            contents=[
                "Language switcher dropdown (same globe + select as desktop)",
                "Home · About Us · Contact Us nav links (stacked, full-width)",
                "'I'm Customer', 'I'm Machine Owner', 'I'm Operator' full-width buttons",
                "Closes automatically when a nav link is tapped",
            ]
        ),
        spacer(4),
    ]))

    s.append(Paragraph(
        "Scroll Behaviour: When the user scrolls down > 30 px, the header gains a "
        "stronger shadow (shadow-sm) and near-opaque white background (bg-white/98).",
        S["desc"]))
    s.append(spacer(4))
    return s


def section_02_hero():
    s = []
    s.append(section_badge("SCREEN 2 · HOME PAGE — HERO SECTION  (index.html)", bg=ORANGE_DARK))
    s.append(spacer(3))
    s.append(Paragraph("Hero Carousel Banner", S["page_title"]))
    s.append(Paragraph(
        "This is the first full-viewport section visitors see on the Home page. "
        "It is a 4-slide auto-cycling carousel. Each slide shows a headline, "
        "stats, download buttons and a floating machinery image on the right.",
        S["body"]))
    s.append(spacer(2))

    slides = [
        ("Slide 1 — Earthmoving Fleet",
         "Rent Heavy Machinery, Directly on Your Mobile Phone.",
         "5,000+ Verified Machines · 300+ Cities Covered · 2-4 Hours Site Delivery",
         "Floating animated Hydraulic Excavator image"),
        ("Slide 2 — Heavy Cranes & Rigging",
         "Hydra & Mobile Cranes, Delivered to Your Project Site.",
         "1,200+ Heavy Cranes · 100% Certified Riggers · 2 Hours Rapid Mobilization",
         "Floating animated Hydra Crane image"),
        ("Slide 3 — Ready-Mix Concrete Fleet",
         "Transit Mixers & Pumps, Ready for Every Concrete Pour.",
         "1,500+ Transit Mixers · 6-8 m³ Drum Capacity · 99.8% On-Time Pour",
         "Floating animated Transit Mixer Truck image"),
        ("Slide 4 — Road Construction Fleet",
         "Vibratory Compactors, Built for Tough Roads.",
         "1,800+ Compaction Units · 11.5T Dynamic Drum Force · 2,100 mm Drum Width",
         "Floating animated Vibratory Soil Compactor image"),
    ]
    for num, title, stats, img in slides:
        s.append(Paragraph(num, S["sub_h"]))
        s.append(info_box([
            f'<b>Headline:</b> {title}',
            f'<b>Stats bar:</b> {stats}',
            f'<b>Right visual:</b> {img}',
            '<b>Action buttons:</b> Google Play badge + App Store badge (both link to # placeholder)',
            '<b>Orange pill badge</b> at top with category label and pulsing dot',
        ]))
        s.append(spacer(2))

    s.append(Paragraph("Carousel Controls", S["section_h"]))
    s.append(two_col_table([
        ("Pill Dots",       "4 small dots below the carousel. Active slide shows an elongated orange pill; others show grey circles."),
        ("Prev ‹ button",   "Small white square button with left chevron. Goes to previous slide."),
        ("Next › button",   "Small white square button with right chevron. Goes to next slide."),
        ("Auto-cycle",      "Slides auto-advance every few seconds when idle."),
    ]))
    s.append(spacer(4))
    return s


def section_03_fleet():
    s = []
    s.append(section_badge("SCREEN 3 · HOME PAGE — EQUIPMENT FLEET SECTION  (#fleet)", bg=ORANGE))
    s.append(spacer(3))
    s.append(Paragraph("Equipment Fleet — Categorised Grid", S["page_title"]))
    s.append(Paragraph(
        "Below the hero, this section showcases all 14 available machine types across "
        "4 industrial categories. Users can filter by category using pill buttons, then "
        "click any card to open a detailed popup.",
        S["body"]))
    s.append(spacer(2))

    s.append(Paragraph("Section Header", S["section_h"]))
    s.append(info_box([
        '"EQUIPMENT FLEET" — orange uppercase label',
        'Headline: "The Right Machine for Every Job"',
        'Sub-text: 14 verified machinery types · 4 major categories · transparent pricing',
        '4 Feature highlight cards: Reliable Performance · 24/7 Expert Support · Flexible Rental Terms · OEM Certified & Insured',
    ]))
    s.append(spacer(2))

    s.append(Paragraph("Category Filter Tabs", S["section_h"]))
    s.append(two_col_table([
        ("All Fleet",             "Shows all 14 machines (default, orange highlighted)"),
        ("Earthmoving",           "Mini Excavator · Small Excavator · Medium Excavator · Backhoe (JCB 3DX) · Wheel Loader"),
        ("Transport & Cranes",    "Hydra · Tipper"),
        ("Concrete",              "Transit Mixer · Self-Loading Mixer · Concrete Pump"),
        ("Road & Power",          "Soil Compactor · Tandem Roller · Pneumatic Roller · Generator"),
    ]))
    s.append(spacer(2))

    s.append(Paragraph("Equipment Cards — All 14 Machines", S["section_h"]))
    machines = [
        ("Mini Excavator",      "₹2,800/day",  "1.8–3.5 T · 24.7 HP",        "Ideal for urban worksites, landscaping & trenching"),
        ("Small Excavator",     "₹4,500/day",  "8.5 T · 55 HP Turbo",         "Compact power with superior fuel economy and reach"),
        ("Medium Excavator",    "₹7,200/day",  "21.5 T · 140 HP CRDi",        "Heavy-duty quarrying, mass excavation & demolition"),
        ("Backhoe (JCB 3DX)",   "₹3,200/day",  "7.6 T · 76 HP EcoMAX",        "India's favourite multi-purpose construction legend"),
        ("Wheel Loader",        "₹5,800/day",  "11.2 T · 150 HP",             "High volume material loading and quarry bulk handling"),
        ("Hydra",               "₹3,500/day",  "14–15 T lift · 10.5 m boom",  "Versatile pick-and-carry mobile hydraulic crane"),
        ("Tipper",              "₹4,000/day",  "16–25 T payload · 250 HP",    "Heavy payload dump trucks for aggregate haulage"),
        ("Transit Mixer",       "₹4,800/day",  "6–7 m³ drum · 75 HP slave",   "Homogeneous readymix concrete transit over distance"),
        ("Self-Loading Mixer",  "₹5,200/day",  "4.0 m³/batch · 110 HP",       "Mobile batching: self-loads, mixes and pours"),
        ("Concrete Pump",       "₹6,500/day",  "36 m reach · 90–120 m³/hr",   "High-rise concrete delivery with multi-fold boom"),
        ("Soil Compactor",      "₹3,800/day",  "11.5 T · 105 HP · 2,100 mm",  "Single drum vibratory roller for sub-base compaction"),
        ("Tandem Roller",       "₹3,200/day",  "3–9 T · dual drums",          "Double drum asphalt compactor for road surfacing"),
        ("Pneumatic Roller",    "₹4,200/day",  "14–24 T · 100 HP",            "Multi-tyre kneading roller for high-density seal coating"),
        ("Generator",           "₹2,500/day",  "125 kVA · 3-phase 415 V",     "Heavy duty acoustic enclosed diesel gensets"),
    ]
    card_rows = [["Machine", "Daily Rate", "Key Spec", "Tagline"]]
    for m in machines:
        card_rows.append(list(m))
    tbl = Table(card_rows, colWidths=[38*mm, 22*mm, 44*mm, 62*mm])
    tbl.setStyle(TableStyle([
        ("BACKGROUND",    (0,0), (-1,0), ORANGE),
        ("TEXTCOLOR",     (0,0), (-1,0), WHITE),
        ("FONTNAME",      (0,0), (-1,0), FONT_BOLD),
        ("FONTSIZE",      (0,0), (-1,0), 8),
        ("BACKGROUND",    (0,1), (-1,-1), WHITE),
        ("ROWBACKGROUNDS",(0,1), (-1,-1), [WHITE, SLATE_50]),
        ("FONTSIZE",      (0,1), (-1,-1), 8),
        ("FONTNAME",      (0,1), (-1,-1), FONT_NORMAL),
        ("GRID",          (0,0), (-1,-1), 0.3, SLATE_100),
        ("TOPPADDING",    (0,0), (-1,-1), 4),
        ("BOTTOMPADDING", (0,0), (-1,-1), 4),
        ("LEFTPADDING",   (0,0), (-1,-1), 5),
        ("RIGHTPADDING",  (0,0), (-1,-1), 5),
        ("VALIGN",        (0,0), (-1,-1), "TOP"),
    ]))
    s.append(tbl)
    s.append(spacer(3))

    s.append(KeepTogether([
        popup_box(
            trigger="Click on any Equipment Card (e.g. 'Mini Excavator')",
            description="Full-screen modal overlay with detailed specs, pricing table, and enquiry action.",
            contents=[
                "Machine image (large, centred)",
                "Machine name + category tag",
                "Tagline / use-case description",
                "Specs table: Operating Weight · Engine Power · Bucket Capacity · Max Digging Depth · Fuel Type (fields vary by machine)",
                "Pricing panel: Daily Rate · Weekly Rate · Monthly Rate",
                "Inline Rental Cost Estimator: choose machine + duration → estimated cost",
                "'Book Now / Get Quote' orange button → closes this modal and opens Quote Modal",
                "Close button (✕) top-right OR clicking the dark overlay closes the modal",
            ]
        ),
        spacer(4),
    ]))
    return s


def section_04_how_it_works():
    s = []
    s.append(section_badge("SCREEN 4 · HOME PAGE — HOW IT WORKS / ROLE GUIDE SECTION  (#how-it-works)", bg=TEAL))
    s.append(spacer(3))
    s.append(Paragraph("How It Works — Three-Role Process", S["page_title"]))
    s.append(Paragraph(
        "A tabbed section explaining the platform process for each of the three user roles. "
        "Visitors click a role tab to see the relevant step-by-step flow.",
        S["body"]))
    s.append(spacer(2))

    s.append(Paragraph("Role Tabs", S["section_h"]))
    s.append(two_col_table([
        ("I'm a Customer",       "Shows the 6-step equipment booking process for project contractors."),
        ("I'm a Machine Owner",  "Shows the 6-step fleet listing and earnings process."),
        ("I'm an Operator",      "Shows the 6-step job-matching and assignment process."),
    ]))
    s.append(spacer(2))

    roles = [
        ("Customer (Contractor) — Steps", [
            "Request heavy machinery for your site with clear quote details.",
            "Ask about machines available near your site.",
            "Confirm deposits, duty hours and billing terms.",
            "Confirm operator requirements in your quote.",
            "Agree breakdown support before booking.",
            "Confirm delivery updates with your coordinator.",
            "Confirm tax and invoice details before booking.",
        ]),
        ("Machine Owner — Steps", [
            "Discuss work opportunities for your machines with clear rental terms.",
            "Fees and rental rates agreed in writing.",
            "Payment schedule agreed before dispatch.",
            "Discuss tracking requirements and available options.",
            "Confirm the hirer and deposit arrangements.",
            "Share your rental rates and machine availability.",
            "Confirm invoice requirements before dispatch.",
        ]),
        ("Operator — Steps", [
            "Discuss construction site work with clear assignment terms.",
            "Share your skills, location and work availability.",
            "Agree pay dates and payment method in writing.",
            "Confirm duty hours and overtime arrangements.",
            "Confirm insurance cover before accepting work.",
            "Provide your experience and certification details.",
            "Confirm any fees and deductions before accepting work.",
        ]),
    ]
    for role_name, steps in roles:
        s.append(Paragraph(role_name, S["sub_h"]))
        s.append(info_box([f'Step {i+1}: {st}' for i, st in enumerate(steps)]))
        s.append(spacer(2))

    s.append(spacer(4))
    return s


def section_05_app_download():
    s = []
    s.append(section_badge("SCREEN 5 · HOME PAGE — APP DOWNLOAD SECTION  (#app-download)", bg=ORANGE_DARK))
    s.append(spacer(3))
    s.append(Paragraph("Mobile App Download Section", S["page_title"]))
    s.append(Paragraph(
        "A dedicated band encouraging visitors to download the BookMyEquipment mobile app. "
        "Displays platform statistics and store download badges.",
        S["body"]))
    s.append(spacer(2))
    s.append(two_col_table([
        ("Label",           '"India\'s Heavy Equipment Mobile App"'),
        ("Headline",        '"Hiring Heavy Machinery Should Be as Easy as Booking a Cab"'),
        ("Body copy",       "BookMyEquipment helps contractors, owners and operators discuss equipment and confirm arrangements."),
        ("App Badges",      "Google Play Store badge + Apple App Store badge (links currently set to # placeholder)"),
        ("Stats shown",     "5,000+ Verified Machines · 300+ Cities · 98% Satisfaction"),
        ("Note displayed",  '"App store links will be added when confirmed. Ask the team about availability."'),
    ]))
    s.append(spacer(4))
    return s


def section_06_testimonials():
    s = []
    s.append(section_badge("SCREEN 6 · HOME PAGE — TESTIMONIALS SLIDER  (#testimonials)", bg=SLATE_900))
    s.append(spacer(3))
    s.append(Paragraph("Customer Testimonials Slider", S["page_title"]))
    s.append(Paragraph(
        "A rotating testimonial section showing 4 verified customer reviews. "
        "Users can navigate with Prev/Next arrows or pill dot indicators.",
        S["body"]))
    s.append(spacer(2))
    testimonials = [
        ("Ramesh Kumar",      "Contractor, Hyderabad",           "Excellent machines and prompt service. The team is very supportive and always available when needed."),
        ("Anita Sharma",      "Project Director, Bangalore Metro","We deployed 6 JCB excavators and 2 compactors for our highway project. Outstanding fuel efficiency and zero downtime."),
        ("Rajesh Patel",      "Infrastructure Lead, Ahmedabad",  "Flexible rental schemes and quick on-site technician response helped us deliver our warehouse foundation 2 weeks ahead of schedule."),
        ("Sunil Verma",       "Roadways Construction, Lucknow",  "Top quality machinery with verified operators. Truly India's premier heavy equipment rental partner."),
    ]
    for name, role, quote in testimonials:
        s.append(info_box([
            f'<b>{name}</b> — {role}',
            f'"{quote}"',
        ]))
        s.append(spacer(1))

    s.append(Paragraph("Controls: ← Prev arrow · ● Dot pills · Next arrow →", S["desc"]))
    s.append(spacer(4))
    return s


def section_07_cta():
    s = []
    s.append(section_badge("SCREEN 7 · HOME PAGE — CTA BANNER", bg=ORANGE))
    s.append(spacer(3))
    s.append(Paragraph("Call-to-Action Banner", S["page_title"]))
    s.append(Paragraph(
        "A full-width orange gradient banner at the bottom of the Home page. "
        "Pushes users to start their enquiry or explore the fleet.",
        S["body"]))
    s.append(spacer(2))
    s.append(two_col_table([
        ("Headline",       '"Ready to Power Your Next Project?"'),
        ("Sub-text",       "Join 10,000+ contractors and site managers who trust BookMyEquipment."),
        ("Primary Button", '"Get Free Quote" — opens Quote/Enquiry modal'),
        ("Secondary",      '"Explore Fleet" — smooth-scrolls to #fleet section'),
    ]))
    s.append(spacer(4))
    return s


def section_08_footer():
    s = []
    s.append(section_badge("SCREEN 8 · HOME PAGE — FOOTER  (All Pages)", bg=SLATE_900))
    s.append(spacer(3))
    s.append(Paragraph("Site Footer", S["page_title"]))
    s.append(Paragraph(
        "Present at the bottom of every page. Dark background (#0F172A). "
        "Contains brand info, navigation columns and legal links.",
        S["body"]))
    s.append(spacer(2))
    s.append(two_col_table([
        ("Brand Column",    "BME logo · tagline · brief mission statement · Google Play & App Store badges"),
        ("Quick Links",     "Home · About Us · Contact Us"),
        ("Role Links",      "I'm Customer · I'm Machine Owner · I'm Operator"),
        ("Fleet Links",     "Excavators · Backhoe · Transit Mixer · Soil Compactor · Generator"),
        ("Contact Details", "Phone number · Email · Operating hours"),
        ("Legal Strip",     "© 2026 BookMyEquipment · Privacy Policy · Terms & Conditions"),
    ]))
    s.append(spacer(4))
    return s


def section_09_about():
    s = []
    s.append(section_badge("SCREEN 9 · ABOUT US PAGE  (/about)", bg=TEAL))
    s.append(spacer(3))
    s.append(Paragraph("About Us — Mission & Vision", S["page_title"]))
    s.append(Paragraph(
        "Navigated via 'About Us' in the top nav. Full-page layout explaining the "
        "company's purpose, vision, values, market problem and stakeholder ecosystem.",
        S["body"]))
    s.append(spacer(2))

    about_sections = [
        ("Hero Banner",
         "Large headline: 'Our Mission & Vision'. Orange gradient pill label: 'Purpose & Direction'. "
         "Sub-text about guiding principles powering India's infrastructure growth. "
         "Two CTA buttons: 'Read Our Mission & Vision' (scrolls down) + 'Explore Fleet' (→ Home #fleet)."),
        ("Our Mission Section",
         "Headline: 'No Construction Project Should Ever Stop Because of a Missing Machine'. "
         "3 mission commitment cards: Zero-Broker Price Transparency · Machine Readiness · Clear Payment Arrangements. "
         "3 value pills: Fairness for Renters · Stability for Owners · Dignity for Operators."),
        ("Our Vision Section",
         "Headline: 'The Indispensable Operating System for South Asian Infrastructure Delivery'. "
         "Long descriptive paragraph about building South Asia's largest machinery cloud. "
         "4 milestone pills: Connected Telematics · Zero Idle Machinery · Sustainable Infrastructure · Market Transformation."),
        ("Market Fix Section",
         "Headline: 'How BookMyEquipment Fixes a Broken Industry'. "
         "Two-column comparison: OLD (Fragmented Broker Model) vs NEW (BME Cloud Platform). "
         "Problems listed: 15–25% hidden markups · 40% idle machines · Unchecked breakdowns · Payment defaults. "
         "Solutions listed: Agreed charges · Availability discussions · Machine readiness checks · Written payment arrangements."),
        ("Ecosystem Section",
         "Headline: 'Built for Every Stakeholder on the Job Site'. "
         "3 stakeholder cards: "
         "(a) Project Renters & Contractors — explore categories, discuss availability, confirm delivery; "
         "(b) Machinery Owners & Fleets — monetise idle machinery, 20+ working days/month; "
         "(c) Certified Operators — stop chasing daily-wage gigs, get verified assignments. "
         "Each card has a coloured CTA linking to the respective role page."),
        ("Core Values Section",
         "4 value cards: "
         "Radical Transparency (no hidden fees) · "
         "Uptime Obsession (idle machine = cost) · "
         "Operator Dignity (fair pay & insurance before work starts) · "
         "Ground-Level Tech (offline-first, low-bandwidth, vernacular)."),
    ]
    for name, detail in about_sections:
        s.append(Paragraph(name, S["sub_h"]))
        s.append(info_box([detail]))
        s.append(spacer(2))

    s.append(spacer(4))
    return s


def section_10_contact():
    s = []
    s.append(section_badge("SCREEN 10 · CONTACT US PAGE  (/contact)", bg=ORANGE))
    s.append(spacer(3))
    s.append(Paragraph("Contact Us — Enquiry Form", S["page_title"]))
    s.append(Paragraph(
        "Navigated via 'Contact Us' in the top nav. "
        "A single-column form page for equipment enquiries from contractors, "
        "fleet owners and machine operators.",
        S["body"]))
    s.append(spacer(2))

    s.append(Paragraph("Page Sections", S["section_h"]))
    s.append(two_col_table([
        ("Header",           '"Contact Us" page title with sub-text: "Equipment enquiries for contractors, fleet owners and machine operators."'),
        ("Left Info Panel",  "Phone · Email · Location · Operating hours · WhatsApp link"),
        ("Right Form Panel", "Full contact form (see below)"),
    ]))
    s.append(spacer(2))

    s.append(Paragraph("Contact Form Fields", S["section_h"]))
    s.append(two_col_table([
        ("Full Name *",      "Text input — placeholder: 'e.g. Ramesh Sharma'"),
        ("Phone Number *",   "Tel input — 10-digit Indian mobile validation (pattern: [6-9][0-9]{9})"),
        ("Your Role *",      "Dropdown — Customer / Machine Owner / Operator / Other"),
        ("Your Query",       "Textarea (3 rows) — placeholder: 'e.g. 20-Ton Excavator booking, weekly rate...'"),
        ("Submit Button",    "Orange 'Send Enquiry' button — submits the form"),
    ]))
    s.append(spacer(2))

    s.append(KeepTogether([
        popup_box(
            trigger="Successful form submission (clicking 'Send Enquiry')",
            description="The form is replaced in-place by a success confirmation box — no page reload.",
            contents=[
                "Green check-circle icon",
                '"Thank you! Our fleet specialist will call you at [confirmed phone number] within 15 minutes."',
                "Confirmed phone number shown in bold orange",
                "Secondary message encouraging WhatsApp if needed",
            ]
        ),
        spacer(4),
    ]))
    return s


def section_11_customer():
    s = []
    s.append(section_badge("SCREEN 11 · CUSTOMER ROLE PAGE  (/customer)", bg=ORANGE_DARK))
    s.append(spacer(3))
    s.append(Paragraph("Customer Page — Rent vs. Buy Estimator & More", S["page_title"]))
    s.append(Paragraph(
        "Accessed via 'I'm Customer' button in the header. "
        "A dedicated landing page for project contractors explaining how to hire equipment "
        "and includes a financial estimation tool.",
        S["body"]))
    s.append(spacer(2))

    cust_sections = [
        ("Customer Hero Banner",
         "Headline for customer role. Two CTAs: 'Request a Callback' (orange button — opens Callback Modal) + 'Explore Fleet' link."),
        ("Sub-Navigation Bar",
         "Sticky inner nav with four anchors: Estimation Tool · Rent vs Buy · FAQs · Download App. "
         "A 'Request Callback' button also sits here."),
        ("Section 1 — Rent vs Buy Estimator",
         "An interactive financial calculator. User selects machine type from dropdown, enters rental duration (days/weeks/months), "
         "then inputs Rental Rate, Refundable Deposit, Other Rental Costs; and on the Buy side: Down Payment, EMI, Maintenance, Other Purchase Costs. "
         "Results panel shows: Total Rental Cost vs Total Ownership Cost with a 'Verdict' comparison and savings difference highlighted."),
        ("Section 2 — Why Rent? Decision Matrix",
         "Split layout with a decision matrix table (65%) and a bold dark summary callout (35%). "
         "Lists scenarios when renting beats buying: short-term projects · variable demand · no storage · no operator · quick mobilisation needed."),
        ("Section 3 — FAQs",
         "Accordion FAQ list with common customer questions like: "
         "'How do I book?' · 'What documents are needed?' · 'Is an operator included?' · 'What are the payment terms?' "
         "Each FAQ expands on click to show the answer."),
        ("Section 4 — App Download",
         "Re-surface of the mobile app download band: Google Play + App Store badges, statistics, brief benefit points."),
    ]
    for name, detail in cust_sections:
        s.append(Paragraph(name, S["sub_h"]))
        s.append(info_box([detail]))
        s.append(spacer(2))

    s.append(KeepTogether([
        popup_box(
            trigger="'Request a Callback' button (orange, hero + sub-nav)",
            description="A modal overlay for customers to leave their contact details for a call-back.",
            contents=[
                "Name input field",
                "Phone Number input (10-digit validation)",
                "Machine/Equipment interest dropdown",
                "Preferred callback time slot select",
                "'Request Callback' submit button — shows toast on success",
                "Close button (✕) or outside-click to dismiss",
            ]
        ),
        spacer(4),
    ]))
    return s


def section_12_owner():
    s = []
    s.append(section_badge("SCREEN 12 · MACHINE OWNER ROLE PAGE  (/owner)", bg=AMBER))
    s.append(spacer(3))
    s.append(Paragraph("Machine Owner Page — List & Earn", S["page_title"]))
    s.append(Paragraph(
        "Accessed via 'I'm Machine Owner' button (amber). "
        "Targeted at people who own construction machinery and want to monetise idle assets.",
        S["body"]))
    s.append(spacer(2))

    owner_sections = [
        ("Owner Hero Banner",
         "Amber-tinted hero with headline about earning from idle machines. "
         "CTAs: 'List My Machine' (amber button — opens Callback/Listing Modal) + 'See Earnings' anchor."),
        ("Earnings Calculator",
         "Interactive earnings estimator. Owner selects machine type + enters available working days per month. "
         "Result: Estimated Monthly Gross Earnings, Platform Commission (shown), Net Earnings, Annual Projection."),
        ("How Listing Works — Steps",
         "4-step visual guide: "
         "1. Register & verify your machine (documents, photos) → "
         "2. Set your availability calendar → "
         "3. Receive booking requests with full details → "
         "4. Get paid via escrow milestone payments."),
        ("Why List with BME",
         "Feature cards: Zero broker cuts · 20+ working days/month guaranteed pipeline · Direct contractor contact · "
         "Escrow-protected payments · Telematics tracking option."),
        ("Owner FAQs",
         "Accordion FAQ: 'What commission does BME charge?' · 'How are payments secured?' · "
         "'Can I list multiple machines?' · 'What documents are required?' — each expands on click."),
    ]
    for name, detail in owner_sections:
        s.append(Paragraph(name, S["sub_h"]))
        s.append(info_box([detail]))
        s.append(spacer(2))

    s.append(KeepTogether([
        popup_box(
            trigger="'List My Machine' / 'Request Callback' button on Owner page",
            description="Modal for machine owners to register interest or request a listing consultation.",
            contents=[
                "Owner name + phone number inputs",
                "Machine type dropdown (14 options)",
                "Number of machines field",
                "City / State location input",
                "'Submit Listing Interest' button — success toast on submission",
                "Close (✕) or backdrop click to dismiss",
            ]
        ),
        spacer(4),
    ]))
    return s


def section_13_operator():
    s = []
    s.append(section_badge("SCREEN 13 · OPERATOR ROLE PAGE  (/operator)", bg=TEAL))
    s.append(spacer(3))
    s.append(Paragraph("Operator Page — Find Assignments", S["page_title"]))
    s.append(Paragraph(
        "Accessed via 'I'm Operator' button (teal). "
        "Targeted at certified heavy equipment operators seeking steady, verified work assignments.",
        S["body"]))
    s.append(spacer(2))

    op_sections = [
        ("Operator Hero Banner",
         "Teal-accented hero with headline: 'Stop Chasing Daily-Wage Gigs'. "
         "CTAs: 'Register as Operator' (teal button — opens Callback Modal) + 'See How It Works' anchor."),
        ("Operator Profile Builder",
         "Visual explainer: operators set up a digital skill profile with: machine certifications, "
         "years of experience, preferred locations, availability calendar."),
        ("Job Matching Section",
         "Explains the matching algorithm: BME connects operators to verified assignments "
         "based on machine type, location and availability. No middlemen."),
        ("Pay & Benefits",
         "Transparent pay structure explained: daily rate agreed upfront · overtime rates · "
         "digital pay slips · site insurance confirmation before assignment starts."),
        ("Operator FAQs",
         "Accordion FAQ: 'Do I need a licence?' · 'How does pay work?' · "
         "'What if the machine breaks down?' · 'Can I choose my assignments?' — expand on click."),
        ("App Download CTA",
         "Teal-themed band encouraging operators to download the BME Operator app."),
    ]
    for name, detail in op_sections:
        s.append(Paragraph(name, S["sub_h"]))
        s.append(info_box([detail]))
        s.append(spacer(2))

    s.append(KeepTogether([
        popup_box(
            trigger="'Register as Operator' / 'Request Callback' on Operator page",
            description="Modal for operators to register their skill profile and request contact.",
            contents=[
                "Operator name + phone inputs",
                "Primary machine type dropdown",
                "Years of experience input",
                "Certifications held (checkbox list)",
                "Preferred work cities input",
                "'Submit Profile' button — success toast + confirmation message",
                "Close (✕) or backdrop to dismiss",
            ]
        ),
        spacer(4),
    ]))
    return s


def section_14_equipment_modal():
    s = []
    s.append(section_badge("POPUP 14 · EQUIPMENT DETAILS MODAL", bg=INFO))
    s.append(spacer(3))
    s.append(Paragraph("Equipment Details Modal — Full Specification Overlay", S["page_title"]))
    s.append(Paragraph(
        "This is the primary interaction modal of the platform. "
        "Triggered by clicking any equipment card in the Fleet grid OR any machine result in the Live Search. "
        "It is a full-screen dark overlay with a white centred panel.",
        S["body"]))
    s.append(spacer(2))

    s.append(two_col_table([
        ("Trigger",           "Click any equipment card (e.g. 'Mini Excavator') in the Fleet section or search results"),
        ("Overlay",           "Semi-transparent dark backdrop — clicking it closes the modal"),
        ("Machine Image",     "Large high-resolution machine photo centred at the top of the modal panel"),
        ("Title & Category",  "Machine name (bold, large) + category tag pill (e.g. 'Earthmoving')"),
        ("Tagline",           "One-line use-case description (e.g. 'Ideal for urban worksites, landscaping & trenching')"),
        ("Specs Table",       "Dynamic rows populated from data: Operating Weight · Engine Power · Bucket Capacity · Max Digging Depth · Fuel Type (fields vary per machine)"),
        ("Pricing Panel",     "Three rate cards: Daily Rate · Weekly Rate · Monthly Rate — all in ₹"),
        ("Inline Estimator",  "Mini calculator inside the modal: choose equipment + duration → live cost estimate updates"),
        ("Book Now Button",   "Orange CTA 'Book Now / Get Quote' — closes this modal and immediately opens the Quote/Enquiry modal with the machine pre-selected"),
        ("Close",             "✕ button top-right OR click outside the panel"),
    ]))
    s.append(spacer(4))
    return s


def section_15_quote_modal():
    s = []
    s.append(section_badge("POPUP 15 · GET A QUOTE / ENQUIRY MODAL", bg=ORANGE))
    s.append(spacer(3))
    s.append(Paragraph("Quote & Enquiry Modal — Request Form Overlay", S["page_title"]))
    s.append(Paragraph(
        "The primary lead-capture modal. Triggered by multiple entry points across the site. "
        "Equipment is often pre-selected if triggered from a card.",
        S["body"]))
    s.append(spacer(2))

    s.append(Paragraph("Trigger Points", S["section_h"]))
    s.append(info_box([
        "• 'Get Free Quote' CTA button in the Home page CTA banner",
        "• 'Book Now / Get Quote' inside the Equipment Details modal",
        "• 'Get Quote' buttons in the Hero carousel slides",
        "• Any element with CSS class .open-quote-trigger across the site",
    ]))
    s.append(spacer(2))

    s.append(Paragraph("Modal Form Fields", S["section_h"]))
    s.append(two_col_table([
        ("Full Name *",          "Text input"),
        ("Phone Number *",       "10-digit Indian mobile number"),
        ("Equipment Required *", "Dropdown pre-populated with all 14 machine types (pre-selected if triggered from a card)"),
        ("Rental Duration",      "Number field + unit selector (Days / Weeks / Months)"),
        ("Project Location",     "Text input for site city / address"),
        ("Message",              "Textarea for additional requirements"),
        ("Submit Button",        "Orange 'Send Enquiry' — on success: modal closes + green toast notification"),
        ("Success Toast",        '"Enquiry received! Our equipment specialist will contact you within 15 minutes."'),
        ("Close",                "✕ button OR backdrop click"),
    ]))
    s.append(spacer(4))
    return s


def section_16_video_modal():
    s = []
    s.append(section_badge("POPUP 16 · FLEET VIDEO MODAL", bg=SLATE_900))
    s.append(spacer(3))
    s.append(Paragraph("Fleet Video Modal — YouTube Embed Overlay", S["page_title"]))
    s.append(Paragraph(
        "A video showcase modal. Triggered by 'Watch Fleet in Action' button "
        "(found in the Fleet or About sections).",
        S["body"]))
    s.append(spacer(2))
    s.append(two_col_table([
        ("Trigger",        "'Watch Fleet in Action' button with play icon (▶)"),
        ("Overlay",        "Full-screen near-black backdrop"),
        ("Video Player",   "YouTube iframe embed (16:9) with autoplay — showcasing JCB heavy machinery in action"),
        ("Video Source",   "youtube-nocookie.com embed with autoplay=1"),
        ("Close",          "✕ button top-right — also stops the video. Backdrop click also closes and stops."),
    ]))
    s.append(spacer(4))
    return s


def section_17_search_modal():
    s = []
    s.append(section_badge("POPUP 17 · LIVE SEARCH MODAL", bg=INFO))
    s.append(spacer(3))
    s.append(Paragraph("Live Search Modal — Equipment Search Overlay", S["page_title"]))
    s.append(Paragraph(
        "A real-time equipment search overlay. Opens from a search icon in the navigation "
        "area. Dark-themed modal panel.",
        S["body"]))
    s.append(spacer(2))
    s.append(two_col_table([
        ("Trigger",            "Search icon (🔍) button in the navigation bar"),
        ("Overlay style",      "Dark semi-transparent backdrop with a dark-card search panel"),
        ("Search Input",       "Auto-focused text input. Placeholder: 'Search equipment…'. Updates results live as user types."),
        ("Default Results",    "First 6 machines from the catalogue are shown before any input"),
        ("Search Logic",       "Filters by machine name · category · tagline — case-insensitive partial match"),
        ("Result Row",         "Machine thumbnail image · Machine name · Category (orange) · Daily rate · 'View Specs →' link"),
        ("Result Click",       "Closes the search modal and immediately opens the Equipment Details modal for that machine"),
        ("No Results",         '"No equipment found matching \'[query]\'." message shown centrally'),
        ("Close",              "✕ button OR backdrop click"),
    ]))
    s.append(spacer(4))
    return s


def section_18_callback_modal():
    s = []
    s.append(section_badge("POPUP 18 · CALLBACK REQUEST MODAL", bg=TEAL))
    s.append(spacer(3))
    s.append(Paragraph("Callback Request Modal — Role Pages", S["page_title"]))
    s.append(Paragraph(
        "Present on Customer, Machine Owner and Operator pages. "
        "Lets the user leave contact details to receive a call from the BME team.",
        S["body"]))
    s.append(spacer(2))
    s.append(two_col_table([
        ("Trigger",            "'Request a Callback' / 'List My Machine' / 'Register as Operator' buttons on role pages"),
        ("Name",               "Text input — Full name"),
        ("Phone",              "10-digit mobile (validated)"),
        ("Role/Interest",      "Pre-filled or selectable dropdown (Customer / Owner / Operator)"),
        ("Equipment Interest", "Machine type dropdown"),
        ("Message",            "Optional textarea"),
        ("Submit",             "Teal/orange 'Request Callback' button — success toast on completion"),
        ("Close",              "✕ button OR backdrop"),
    ]))
    s.append(spacer(4))
    return s


def section_19_mobile():
    s = []
    s.append(section_badge("SCREEN 19 · MOBILE RESPONSIVE BEHAVIOUR", bg=SLATE_900))
    s.append(spacer(3))
    s.append(Paragraph("Mobile & Responsive Layout", S["page_title"]))
    s.append(Paragraph(
        "The site is fully responsive. Below 1024 px width the layout adapts significantly.",
        S["body"]))
    s.append(spacer(2))
    s.append(two_col_table([
        ("Breakpoint",        "< 1024 px (lg) — tablet and mobile"),
        ("Navbar",            "Desktop links and role buttons hidden; hamburger ☰ button shown"),
        ("Mobile Menu",       "Slide-down panel with language switcher + nav links + role buttons (full width)"),
        ("Hero Section",      "Single column stacked layout — image stacks below text"),
        ("Fleet Grid",        "1 column on mobile → 2 columns on sm → 3 on lg → 4 on xl"),
        ("Modals",            "Full-width on mobile, max-w constrained on desktop"),
        ("Role Buttons",      "Hidden on mobile header; appear full-width in mobile menu"),
        ("Footer",            "Single column stacked on mobile"),
    ]))
    s.append(spacer(4))
    return s


def section_20_language():
    s = []
    s.append(section_badge("SCREEN 20 · MULTI-LANGUAGE SWITCHING  (EN / Telugu / Hindi)", bg=ORANGE))
    s.append(spacer(3))
    s.append(Paragraph("Multi-Language Site Translation", S["page_title"]))
    s.append(Paragraph(
        "The site supports three languages controlled via a language selector in the header. "
        "All text content is translated using the i18n.js module and locale JSON files.",
        S["body"]))
    s.append(spacer(2))
    s.append(two_col_table([
        ("Control Location",   "Language selector present in both desktop header and mobile menu"),
        ("UI Element",         "Globe icon (🌐) + dropdown select + chevron ▾"),
        ("English (en)",       "Default language — all text in English"),
        ("Telugu (te)",        "తెలుగు — full site translation using Noto Sans Telugu font"),
        ("Hindi (hi)",         "हिन्दी — full site translation using Noto Sans Devanagari font"),
        ("Locale Files",       "src/locales/pages.json · src/locales/common.json · src/locales/forms.json"),
        ("Scope",              "Hero slides · Fleet section · How It Works · App section · Footer · All role pages · About · Contact"),
        ("Excluded",           "Language selector itself (data-i18n-ignore attribute) — stays in its native labels always"),
        ("Persistence",        "Language selection is applied instantly to all visible text without page reload"),
    ]))
    s.append(spacer(6))

    s.append(Paragraph("Sample Translations (Key Phrases)", S["section_h"]))
    translations = [
        ("Rent Heavy Machinery, Directly on Your Mobile Phone.",
         "భారీ యంత్రాలను అద్దెకు తీసుకోండి, నేరుగా మీ మొబైల్ ఫోన్‌లో.",
         "भारी मशीनें किराये पर लें, सीधे अपने मोबाइल फोन पर।"),
        ("Explore Fleet",
         "యంత్రాలను చూడండి",
         "मशीनें देखें"),
        ("No Construction Project Should Ever Stop Because of a Missing Machine",
         "యంత్రం లేక ఏ నిర్మాణ ప్రాజెక్ట్ ఆగకూడదు",
         "मशीन की कमी से कोई निर्माण परियोजना नहीं रुकनी चाहिए"),
        ("Request a Callback",
         "కాల్‌బ్యాక్ అభ్యర్థించండి",
         "कॉलबैक का अनुरोध करें"),
    ]
    trans_rows = [["English", "Telugu (తెలుగు)", "Hindi (हिन्दी)"]]
    for row in translations:
        trans_rows.append(list(row))
    tbl = Table(trans_rows, colWidths=[56*mm, 57*mm, 57*mm])
    tbl.setStyle(TableStyle([
        ("BACKGROUND",    (0,0), (-1,0), ORANGE),
        ("TEXTCOLOR",     (0,0), (-1,0), WHITE),
        ("FONTNAME",      (0,0), (-1,0), FONT_BOLD),
        ("FONTSIZE",      (0,0), (-1,-1), 7.5),
        ("GRID",          (0,0), (-1,-1), 0.3, SLATE_100),
        ("ROWBACKGROUNDS",(0,1), (-1,-1), [WHITE, SLATE_50]),
        ("TOPPADDING",    (0,0), (-1,-1), 4),
        ("BOTTOMPADDING", (0,0), (-1,-1), 4),
        ("LEFTPADDING",   (0,0), (-1,-1), 5),
        ("RIGHTPADDING",  (0,0), (-1,-1), 5),
        ("VALIGN",        (0,0), (-1,-1), "TOP"),
    ]))
    s.append(tbl)
    s.append(spacer(4))
    return s


# ── All content assembled ──────────────────────────────────────────────────────
def build_content():
    story = []
    story += section_01_navbar()
    story += section_02_hero()
    story += section_03_fleet()
    story += section_04_how_it_works()
    story += section_05_app_download()
    story += section_06_testimonials()
    story += section_07_cta()
    story += section_08_footer()
    story.append(PageBreak())
    story += section_09_about()
    story += section_10_contact()
    story.append(PageBreak())
    story += section_11_customer()
    story += section_12_owner()
    story += section_13_operator()
    story.append(PageBreak())
    story += section_14_equipment_modal()
    story += section_15_quote_modal()
    story += section_16_video_modal()
    story += section_17_search_modal()
    story += section_18_callback_modal()
    story.append(PageBreak())
    story += section_19_mobile()
    story += section_20_language()
    return story


# ── Page number decorator ──────────────────────────────────────────────────────
def page_footer(canvas, doc, lang_label):
    canvas.saveState()
    w, h = A4
    canvas.setFont(FONT_NORMAL, 8)
    canvas.setFillColor(SLATE_400)
    canvas.drawString(20*mm, 12*mm, f"BookMyEquipment — Website Review ({lang_label})")
    canvas.drawRightString(w - 20*mm, 12*mm, f"Page {doc.page}")
    canvas.setStrokeColor(SLATE_100)
    canvas.setLineWidth(0.5)
    canvas.line(20*mm, 16*mm, w - 20*mm, 16*mm)
    canvas.restoreState()


# ── PDF builder ────────────────────────────────────────────────────────────────
LANGUAGES = [
    ("English",  "English",   "en"),
    ("Telugu",   "తెలుగు",    "te"),
    ("Hindi",    "हिन्दी",    "hi"),
]

def build_pdf(lang_name, lang_native, lang_code):
    filename = os.path.join(OUT_DIR, f"BookMyEquipment_Review_{lang_name}.pdf")

    doc = SimpleDocTemplate(
        filename,
        pagesize=A4,
        leftMargin=20*mm,
        rightMargin=20*mm,
        topMargin=20*mm,
        bottomMargin=22*mm,
        title=f"BookMyEquipment Website Review ({lang_name})",
        author="BookMyEquipment",
        subject="Complete Screen Walkthrough",
    )

    story = []
    story += cover_page(lang_name, lang_native, lang_code)
    story += build_content()

    label = f"{lang_name} ({lang_native})"
    doc.build(
        story,
        onFirstPage=lambda c, d: page_footer(c, d, label),
        onLaterPages=lambda c, d: page_footer(c, d, label),
    )
    print(f"[OK] Generated: {filename}")
    return filename


if __name__ == "__main__":
    print("=" * 60)
    print("BookMyEquipment - Website Review PDF Generator")
    print("=" * 60)
    for ln, native, code in LANGUAGES:
        build_pdf(ln, native, code)
    print("\nDone. All 3 PDFs generated in:", OUT_DIR)
