# Muscle Fitness Studio — Website

Premium single-page gym website for **Muscle Fitness Studio (MU-FI)**, Saidapet, Chennai.

Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion · lucide-react

---

## 1. Run it locally

```bash
npm install     # only needed the first time
npm run dev
```

Then open **http://localhost:3000**

Other commands:

```bash
npm run build   # production build (must pass before deploying)
npm start       # run the production build locally
```

---

## 2. Deploy free on Vercel

**Step 1 — Put the code on GitHub**

```bash
git init
git add .
git commit -m "Muscle Fitness Studio website"
```

Create a new empty repository on github.com (e.g. `muscle-fitness-studio`), then:

```bash
git branch -M main
git remote add origin https://github.com/<your-username>/muscle-fitness-studio.git
git push -u origin main
```

**Step 2 — Import into Vercel**

1. Go to **https://vercel.com** and sign up / log in with your GitHub account.
2. Click **Add New… → Project**.
3. Find `muscle-fitness-studio` in the list and click **Import**.
4. Vercel auto-detects Next.js. Leave every setting as-is — no environment variables are needed.
5. Click **Deploy** and wait ~1 minute.
6. You get a live URL like `https://muscle-fitness-studio.vercel.app`.

**Step 3 — After deploying**

- Copy your live URL into `url` in `config/site.ts`, then commit and push. (This makes the
  SEO/Open Graph tags and `sitemap.xml` point at the right domain.)
- Every future `git push` to `main` redeploys automatically.

**Step 4 — Custom domain (optional)**

In Vercel: **Project → Settings → Domains → Add**, enter your domain (e.g.
`musclefitnessstudio.in`) and follow the DNS instructions shown.

---

## 3. Email setup for the enquiry form  ⚠️ needs your password

The **"Send An Enquiry"** form now emails the gym's inbox. Until you add SMTP
credentials the form shows a friendly error and offers the WhatsApp fallback —
nothing breaks, it just can't send yet.

### Step 1 — Create a Gmail App Password

A normal Gmail password will **not** work. You need a 16-character App Password:

1. Sign in to the Gmail account that should receive enquiries.
2. Turn on **2-Step Verification**: https://myaccount.google.com/security
3. Go to https://myaccount.google.com/apppasswords
4. Type a name like `Website` and click **Create**.
5. Copy the 16-character code (e.g. `abcd efgh ijkl mnop`) and **remove the spaces**.

### Step 2 — Add it locally

```bash
cp .env.local.example .env.local
```

Open `.env.local` and paste the App Password into `SMTP_PASS`. Restart `npm run dev` —
environment variables are only read at startup, so a restart is required.

**The password goes in `.env.local` ONLY.** That file is gitignored and stays on your
machine. `.env.local.example` is committed to git — never put a real password in it.

**Currently configured with a developer test account** (`ccaasdev@gmail.com`). At handover,
change these three lines in `.env.local` to the customer's Gmail and generate a fresh App
Password from *their* Google account:

```
SMTP_USER=musclefittness@gmail.com
ENQUIRY_TO=musclefittness@gmail.com
ENQUIRY_FROM=musclefittness@gmail.com
```

For Gmail, `ENQUIRY_FROM` must be the same address as `SMTP_USER` — Gmail rewrites or
rejects any other sender.

### Step 3 — Add it on Vercel

In Vercel: **Project → Settings → Environment Variables**. Add each of the six
variables above (same names, same values), tick **Production**, **Preview** and
**Development**, then **Redeploy**.

### Using a provider other than Gmail

Just change the host and port — the code doesn't care which provider you use:

| Provider | `SMTP_HOST` | `SMTP_PORT` | `SMTP_SECURE` |
| --- | --- | --- | --- |
| Gmail | `smtp.gmail.com` | `587` | `false` |
| Zoho Mail | `smtp.zoho.in` | `465` | `true` |
| Outlook / Microsoft 365 | `smtp.office365.com` | `587` | `false` |
| Brevo (Sendinblue) | `smtp-relay.brevo.com` | `587` | `false` |
| Hostinger / cPanel | `smtp.yourdomain.com` | `465` | `true` |

### What's built in

- Enquiries arrive as a gold-and-charcoal formatted email with a one-tap **Call** button
- **Reply-To** is set to the enquirer's email, so hitting Reply in Gmail answers them directly
- Honeypot field + a 5-per-10-minutes rate limit per device to block spam bots
- **Duplicate protection.** The send takes a few seconds, so an impatient visitor may click
  Send two or three times, or refresh and resubmit. Two guards stop that becoming two or
  three emails: a ref-based re-entry lock in the form (blocks the next click immediately,
  without waiting for a re-render), and server-side suppression of an identical enquiry
  from the same device within 5 minutes
- If email fails for any reason, the form shows an error with a **"Send it on WhatsApp instead"** link
- Sending state, success screen and "Send another enquiry" reset

## 4. Images and the colour grade

### Theme

The site uses a **light theme**: warm paper backgrounds, dark ink text and gold accents.
All tokens live in `tailwind.config.ts`:

| Token | Value | Used for |
| --- | --- | --- |
| `page` | `#FAF7F0` | page background |
| `panel` | `#F2ECE0` | alternating sections |
| `card` | `#FFFFFF` | cards |
| `sand` | `#EDE5D5` | inputs, table headers |
| `line` | `#DED5C1` | borders |
| `ink` | `#1F1C16` | primary text |
| `muted` | `#6B6455` | secondary text |
| `gold.dark` | `#7A5E10` | gold-coloured text (AA on every surface) |
| `gold` | `#C9A227` | fills and buttons |
| `cream` | `#FAF7F0` | light text that sits over a photo |

The hero and the gallery lightbox stay dark on purpose — they sit on photographs.

### Photo treatment

**Your gym photos are shown in their original colours.** They were briefly colour-graded to
gold/charcoal, but that was reverted — the real photos look better and more honest. They are
only resized and compressed; no colour is changed.

The four **athlete** photos in the "Strength Has No Gender" section are still gold-graded,
since they are stock images and the grade helps them blend with the site rather than looking
bolted on.

### About the athlete photos — read this

The four images in the **Strength Has No Gender** section came from
[Pexels](https://www.pexels.com/license/). The Pexels licence allows commercial use with
**no attribution required**, so you are free to use them on this site.

They are **not photos of MU-FI members**, and none of the wording on the site claims they
are. Replace them with photos of your own members and trainers (with their written
permission) when you can — real local faces convert better and help your Google ranking.
Just drop new files into `public/images/athletes/` using the same filenames.

**Celebrity photos — don't.** Arnold Schwarzenegger or any other famous bodybuilder cannot
be used to promote the gym. Their photos are copyrighted and using someone's likeness to
advertise a business implies endorsement, which is a right-of-publicity violation. It's a
genuine legal risk, not a technicality.

### Where each image is used

Everything lives in `public/images/`:

| File | What it is | Status |
| --- | --- | --- |
| `logo.webp` | MU-FI gym logo, background removed so it sits cleanly on dark | ✅ Installed |
| `hero.png` | Gold-and-charcoal gym interior, used as the hero background | ✅ Installed |
| `gallery/*.jpg` | 12 real Muscle Fitness Studio photos, **original colours** (no grade) | ✅ Installed |
| `bg/*.jpg` | 4 blurred, darkened versions used as section background texture | ✅ Installed |
| `athletes/*.jpg` | 4 motivation photos in the "Strength Has No Gender" section | ⚠️ Free-licence stock — see below |

To swap any of them, drop a new file in with the **same name** — it takes over everywhere.

After replacing `logo.webp`, regenerate the favicons so the browser tab matches:

```bash
npx sharp-cli -i public/images/logo.webp -o app/icon.png resize 48 48
npx sharp-cli -i public/images/logo.webp -o app/apple-icon.png resize 180 180
```

(Or simply replace `app/icon.png` and `app/apple-icon.png` with 48×48 and 180×180 PNGs of your logo.)

---

## 5. TODO — replace before going live

Almost everything is in **`config/site.ts`**, one file.

### In `config/site.ts`

| # | Item | Where | Notes |
| --- | --- | --- | --- |
| 1 | **Live site URL** | `site.url` | Set to your real Vercel/custom domain after the first deploy. |
| 2 | **Email spelling** | `site.email` | Currently `musclefittness@gmail.com`. Your note said `www.musclefittness@gmail.com` — emails never start with `www`, so that was dropped. Also confirm whether it's `fittness` (two t's) or `fitness`. |
| 3 | **YouTube link** | `site.socials` | Instagram and Facebook are live. YouTube is blank, so its icon is hidden — add a URL if you start a channel. |
| 4 | **All prices** | `plans` | ₹1,500 / ₹4,000 / ₹7,000 / ₹12,000 are **placeholders**. Also review each plan's feature list and which plan carries the "Best Value" badge (`popular: true`). |
| 5 | **Trainer names, roles, bios, photos** | `trainers` | Names/roles/bios are placeholders and the photos are gym shots, not people. Put real trainer photos in `public/images/trainers/` and update the `image` paths. |
| 6 | **Testimonials** | `testimonials` | **Currently clearly-labelled sample text, not real reviews.** The section shows a "Sample content — real member reviews coming soon" note. Replace with genuine member reviews (with their permission) and delete that note in `components/Testimonials.tsx`. |
| 7 | **Diet plans** | `config/site.ts` → `dietPlans`, `proteinFoods`, `nutritionTips` — written for Chennai/Tamil food habits. **Have your trainer or a dietitian review these before launch.** Protein values are approximate. |
| 8 | **More gallery photos** | `gallery` | 13 real studio photos are in. Add more any time: drop them in `public/images/gallery/` and add a line here. |

### Elsewhere

| # | Item | Where |
| --- | --- | --- |
| 9 | **Gmail App Password** | `.env.local` (local) + Vercel env vars — see section 3. The form cannot send email until this is set. |
| 10 | **Amenities list** | `config/site.ts` → `amenities` — remove anything you don't offer, add what you do. |
| 11 | **Google rating** | `config/site.ts` → `googleReview` — real rating, review count and your "write a review" link. |
| 12 | **Travel times in the locator** | `config/site.ts` → `branches[].nearby` — the walk/drive times to Saidapet Metro, bus terminus etc. are my estimates. Check them on Google Maps for your exact door. |
| 13 | **Map coordinates** | `app/layout.tsx` → `jsonLd.geo` — latitude/longitude are approximate for Saidapet. Get the exact ones from your Google Business listing for better local SEO. |
| 14 | **Google Business Profile** | Not code: claim/verify your listing on Google Maps so the embedded map and "Get Directions" resolve to your exact pin. |
| 15 | **Logo colours** | The MU-FI logo is red/cream against a gold/charcoal site. It reads well as-is, but a gold recolour is an easy follow-up if you want it. |

Find them all at any time with:

```bash
grep -rn "TODO" config app components
```

---

## 6. LocatorJS — click an element, open its code

Click-to-source is **opt-in**, because it is expensive:

```bash
npm run dev:locator     # click-to-source on  (slower)
npm run dev             # normal development  (faster)
```

With it on, every JSX element is stamped with `data-locatorjs="file.tsx:line:col"`, so the
[LocatorJS browser extension](https://www.locatorjs.com/) can take you from an element on the
page straight to its code. Hold **Alt** (**Option** on Mac) and click.

**Why it is not on by default:** the loader runs Babel over every `.tsx` file on top of SWC,
which roughly doubles dev compile time, and it adds a `data-locatorjs` attribute to every
element — about 60 KB of extra markup on every page load.

The in-page overlay is deliberately **not** installed — it drew a "Go to component code" popup
over the site, which got in the way. The extension gives the same behaviour with nothing
rendered on the page.

**How it's wired** (all in `next.config.mjs`):

- Next 14 compiles with SWC, so the usual Babel plugin can't be used. `@locator/webpack-loader`
  runs the transform instead.
- Applied to **both the client and server builds**. Most sections here are React Server
  Components whose markup comes from the server build — a client-only loader would leave them
  with no source info.
- **Development only.** Production builds carry no locator attributes and no locator code.

To remove it entirely: delete the `webpack` block from `next.config.mjs` and run
`npm uninstall @locator/webpack-loader`.

## 7. Project structure

```
app/
  layout.tsx        SEO metadata, fonts, JSON-LD (ExerciseGym schema)
  page.tsx          Section order for the single-page site
  globals.css       Tailwind layers + gold/charcoal design tokens
  icon.png          Favicon (generated from the logo)
  api/enquiry/      Email-sending endpoint for the contact form
components/
  ChatBot.tsx       Floating chat assistant (right side)
lib/
  chatbot.ts        Its intents and answers — edit replies here
  robots.ts         /robots.txt
  sitemap.ts        /sitemap.xml
components/         One file per section (Navbar, Hero, Programs, …)
config/site.ts      ★ All business info, hours, prices, content
lib/hours.ts        Asia/Kolkata open/closed logic + schema.org hours
public/images/      logo.webp, hero.png, gallery/
```

## 8. Built-in features

- Sticky navbar (transparent → blurred charcoal on scroll) with animated mobile drawer
- Full-screen hero with live **OPEN NOW / CLOSED** badge, calculated in **Asia/Kolkata**
  regardless of the visitor's timezone
- Scroll reveal animations (disabled under `prefers-reduced-motion`)
- Membership cards that open WhatsApp with a plan-specific pre-filled message
- Gallery lightbox with keyboard navigation (← → Esc)
- BMI calculator with a programme recommendation
- Timings table with today's row highlighted in gold
- Contact form that **emails the gym's inbox** (SMTP), with a WhatsApp fallback if email fails
- Amenities chip grid, Google rating block
- Diet & nutrition section: three goal-based Chennai meal plans, a protein-in-Indian-food
  table, practical tips and a medical disclaimer
- Branch locator with map, copy-address button and walk/drive times to nearby landmarks —
  add a second branch in `config/site.ts` (`branches`) and a switcher appears automatically
- Floating WhatsApp bubble, mobile call button and scroll-to-top on the **left**
- Chat assistant on the **right** — answers timings, fees, location, programmes, diet,
  free trial, ladies, facilities, trainers and beginner questions. It reads its answers
  straight from `config/site.ts`, so it can never contradict the rest of the page. No AI
  service, no API key, no monthly cost. Edit the replies in `lib/chatbot.ts`.
- Accessible: skip link, visible focus rings, aria labels, alt text, semantic headings

---

## 9. Troubleshooting

### The page won't load / "MODULE_NOT_FOUND" in the terminal

Almost always caused by running `npm run build` **while `npm run dev` is still running**.
The production build overwrites the `.next/` folder that the dev server is reading from,
and the dev server then can't find its own files.

Fix:

```bash
npm run clean
npm run dev
```

To avoid it entirely, use **`npm run build:check`** instead of `npm run build` whenever the
dev server is running. It compiles into a separate `.next-build/` folder and leaves the dev
server untouched.

| Command | Use when |
| --- | --- |
| `npm run dev` | Normal local development |
| `npm run build:check` | Verifying the site compiles, **dev server can stay running** |
| `npm run build` | Final build. Stop `npm run dev` first |
| `npm run clean` | Something is stuck — wipes both build folders |

### Does this affect the live site?

**No.** This only ever happens on a developer's machine. Vercel builds each deployment in a
fresh, isolated environment and then serves the finished output — there is no dev server in
production and nothing to overwrite. If a build ever fails on Vercel, the previous working
version stays live; a broken build is never published.

### Port 3000 already in use

```bash
pkill -f "next dev"
npm run dev
```

---

## 10. Performance

### Test speed with a production build, not `npm run dev`

`npm run dev` is **much** slower than the real site, by design — it ships unminified
JavaScript, runs React with extra development checks, re-optimises every image on request
and keeps a hot-reload connection open. Scrolling will feel heavy. That is the dev server,
not your website.

To see the real speed:

```bash
npm run build
npm start
```

Then open **http://localhost:3000**. Measured on this machine, the same page:

| | `npm run dev` | `npm start` (production) |
| --- | --- | --- |
| HTML response | ~85 ms | ~14 ms |
| JavaScript | unminified, dev React | minified, 151 KB first load |
| Images | re-optimised per request | optimised once, then cached |

On Vercel it is faster again: static HTML and images are served from a CDN close to the
visitor, and optimised images are cached permanently after the first request.

### What was optimised

**Dev refresh speed**

- **LocatorJS made opt-in.** It was the single biggest cause of slow dev refreshes: a full
  Babel pass over every `.tsx` file on each compile, plus ~60 KB of injected attributes per
  page. Cold compile 6.3 s → 4.8 s, page HTML 412 KB → 278 KB.
- **Image derivative sizes capped** to 1920 px. The widest source image is 1536 px, so
  generating 2048/3840 variants was pure waste.
- **Poppins trimmed** from 5 weights to 4 (300 was never used) — one less font file.

**Payload**

- **Hero was a 740 KB PNG.** PNG is the wrong format for a photograph — it is now a 211 KB
  JPEG, visually identical. This is the largest image on the page and the one that decides
  how fast the site *feels*.
- **Gallery sources were 1400 px** but never displayed larger than ~460 px in the grid.
  Resized to 1100 px: 2.95 MB → 1.94 MB. Athlete photos 367 KB → 191 KB.
- **`backdrop-blur` removed from every card.** It forces the browser to re-blur whatever
  sits behind the element on *every scroll frame*, which was the main cause of scroll
  stutter. The cards were effectively opaque anyway, so nothing looks different.
- The sticky navbar is now solid instead of translucent-blurred, for the same reason.

Total image payload: **4.8 MB → 2.5 MB**.

### If you add images later

Keep photos as **JPEG** (not PNG), no wider than **1400 px**, and let `next/image` do the
resizing — it automatically serves WebP/AVIF at the right size for each device.
