import os
from PIL import Image, ImageFont, ImageDraw
import numpy as np

os.makedirs('images', exist_ok=True)
os.makedirs('public/images', exist_ok=True)

w, h = 1080, 1920

# Load sources
im_hero_raw = Image.open('images/hero_phone_mockup.png')
im_idle_raw = Image.open('images/02-idle.png')
im_earn_raw = Image.open('images/03-earnings.png')

im_hero = np.array(im_hero_raw).astype(float)
im_idle = np.array(im_idle_raw).astype(float)
im_earn = np.array(im_earn_raw).astype(float)

# Background profiles
bg_hero = im_hero[:, 50, :]
bg_idle = im_idle[:, 50, :]

# Calculate alpha mask of phone
bg_diff_r = bg_hero[:, 0] - bg_idle[:, 0]
diff_r = im_hero[:, :, 0] - im_idle[:, :, 0]
one_minus_alpha = diff_r / np.maximum(bg_diff_r[:, None], 1.0)
alpha = 1.0 - one_minus_alpha
alpha = np.clip(alpha, 0.0, 1.0)

alpha[:515, :] = 0.0
alpha[550:1830, 250:820] = 1.0
alpha[:, :210] = 0.0
alpha[:, 860:] = 0.0
alpha[1875:, :] = 0.0

alpha_3d = alpha[:, :, None]
safe_alpha = np.maximum(alpha_3d, 1e-4)

# Extract foreground
fg_idle = (im_idle - (1.0 - alpha_3d) * bg_idle[:, None, :]) / safe_alpha
fg_idle = np.clip(fg_idle, 0.0, 255.0)
fg_earn = (im_earn - (1.0 - alpha_3d) * bg_idle[:, None, :]) / safe_alpha
fg_earn = np.clip(fg_earn, 0.0, 255.0)

phone_mask = (alpha_3d > 0.99)
fg_idle = np.where(phone_mask, im_idle, fg_idle)
fg_earn = np.where(phone_mask, im_earn, fg_earn)

# Load fonts
font_bold = ImageFont.truetype('scratch/fonts/Poppins-Bold.ttf', 74)
font_med = ImageFont.truetype('scratch/fonts/Poppins-Medium.ttf', 31)

def create_gradient(top_rgb, bot_rgb):
    gradient = np.zeros((h, w, 3), dtype=float)
    for i in range(3):
        col = np.linspace(top_rgb[i], bot_rgb[i], h)
        gradient[:, :, i] = col[:, None]
    return gradient

def render_mockup(fg, alpha_3d, bg_gradient, title_lines, sub_lines, sub_color):
    # Composite
    comp = alpha_3d * fg + (1.0 - alpha_3d) * bg_gradient
    comp = np.clip(comp, 0, 255).astype(np.uint8)
    img = Image.fromarray(comp, 'RGB')
    draw = ImageDraw.Draw(img)
    
    # Text coordinates based on original
    # Title line 1: y around 140
    # Title line 2: y around 230
    # Subtitle line 1: y around 325
    # Subtitle line 2: y around 375
    
    # Calculate title heights
    t_y = 115
    for line in title_lines:
        bbox = draw.textbbox((0, 0), line, font=font_bold)
        tw = bbox[2] - bbox[0]
        th = bbox[3] - bbox[1]
        draw.text(((w - tw) // 2, t_y), line, fill=(255, 255, 255), font=font_bold)
        t_y += th + 18
        
    s_y = t_y + 35
    for line in sub_lines:
        bbox = draw.textbbox((0, 0), line, font=font_med)
        sw = bbox[2] - bbox[0]
        sh = bbox[3] - bbox[1]
        draw.text(((w - sw) // 2, s_y), line, fill=sub_color, font=font_med)
        s_y += sh + 12

    return img

# 1. OWNER MOCKUP (Amber Brand Theme)
bg_amber = create_gradient((170, 75, 8), (245, 158, 11))
owner_img = render_mockup(
    fg_idle, alpha_3d, bg_amber,
    ["Idle machine = lost", "money"],
    ["Utilisation per machine, and what it costs", "you."],
    (255, 245, 230)
)
owner_img.save('images/idle.png', 'PNG')
owner_img.save('public/images/idle.png', 'PNG')
print('Saved images/idle.png & public/images/idle.png (Amber)')

# 2. OPERATOR MOCKUP (Teal Brand Theme)
bg_teal = create_gradient((15, 85, 80), (13, 148, 136))
operator_img = render_mockup(
    fg_earn, alpha_3d, bg_teal,
    ["Every rupee", "accounted for"],
    ["Commission, retention and wage —", "booking by booking."],
    (230, 255, 250)
)
operator_img.save('images/earnings.png', 'PNG')
operator_img.save('public/images/earnings.png', 'PNG')
print('Saved images/earnings.png & public/images/earnings.png (Teal)')

# 3. Also generate sleek dark versions in case user wants dark
bg_dark = create_gradient((15, 17, 23), (33, 45, 66))
owner_dark = render_mockup(
    fg_idle, alpha_3d, bg_dark,
    ["Idle machine = lost", "money"],
    ["Utilisation per machine, and what it costs", "you."],
    (200, 210, 225)
)
owner_dark.save('images/idle_dark.png', 'PNG')

operator_dark = render_mockup(
    fg_earn, alpha_3d, bg_dark,
    ["Every rupee", "accounted for"],
    ["Commission, retention and wage —", "booking by booking."],
    (200, 210, 225)
)
operator_dark.save('images/earnings_dark.png', 'PNG')
print('Saved dark variants idle_dark.png & earnings_dark.png')

