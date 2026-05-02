# Deploy your portfolio (free) + add it to LinkedIn

This guide walks you through three things:

1. Adding your photo (with a transparent background) to the portfolio.
2. Publishing the portfolio for free with **GitHub Pages**.
3. Surfacing the portfolio on your **LinkedIn profile** (including the “Visit my website” custom button).

> **About the names used here:**
> - The **local folder** on your computer stays as `G:\Portfolio\blue_version` — you don’t need to rename anything on disk.
> - The **published name** (the part of the URL after `github.io/`) will be `abdallah-elmaghawry`. That comes from the GitHub repo name you create in step 2 below, and from the `base` value already set in `vite.config.js`.
> - Final URL: `https://YOUR-USERNAME.github.io/abdallah-elmaghawry/`

---

## 1) Add your photo

I already wired the portfolio to load your photo from a single file:

```
G:\Portfolio\blue_version\src\assets\abdallah.png
```

You just need to put a file there with **exactly that name**: `abdallah.png` (lowercase, no spaces). It’s used in two places — the Hero section (round portrait) and the About section (framed photo).

### Make the background transparent — free, no install

Use one of these (any works, takes about 30 seconds):

- **remove.bg** — https://www.remove.bg/upload — upload, click download, you get a transparent PNG.
- **PhotoRoom** — https://www.photoroom.com/tools/background-remover — same idea, often higher quality on portraits.
- **Canva** — https://www.canva.com/features/background-remover/ — needs a free account, “Edit Image → BG Remover”.
- **Adobe Express** — https://www.adobe.com/express/feature/image/remove-background — free with an Adobe ID.

After it’s downloaded, rename the file to `abdallah.png` and drop it in `src\assets\`.

> **Tip:** the round portrait in the Hero section looks best when the photo is cropped to head-and-shoulders. If your transparent PNG has a lot of empty space around the head, crop it first (Photos app on Windows → Edit & Create → Crop).

### Don't want to remove the background?

That's fine — the same file (`abdallah.png`) works with a non-transparent photo too. The styling will still look good; you just won’t see the colored disc behind your head.

---

## 2) Publish for free with GitHub Pages

> **New to git/GitHub?** See **[GITHUB_GUIDE.md](GITHUB_GUIDE.md)** for a beginner-friendly, step-by-step walkthrough (where to install git, where to type commands, how to get a Personal Access Token, etc.). The section below is the condensed version.

GitHub Pages hosts static sites for free directly from a GitHub repository. Your custom URL will look like:

```
https://<your-github-username>.github.io/abdallah-elmaghawry/
```

I’ve already done the project-side setup for you:

- Added `"base": "/abdallah-elmaghawry/"` in `vite.config.js` (required so assets resolve under the subpath).
- Added `predeploy` and `deploy` scripts in `package.json`.
- Added `gh-pages` to `devDependencies`.

You just need to run a few one-time commands.

### Step A — Install the new dependency

Open a terminal in the project folder and run:

```bash
npm install
```

That installs `gh-pages` (the helper that pushes your built site to GitHub).

### Step B — Create a GitHub repository

1. Go to https://github.com/new
2. **Repository name:** `abdallah-elmaghawry` (this MUST match the `base` value in `vite.config.js`. If you pick a different name, change `base` in `vite.config.js` to `/<that-name>/`).
3. Leave it **Public** (Pages is free for public repos).
4. **Do NOT** check “Add a README” / “.gitignore” / “license” — your project already has those.
5. Click **Create repository**.

### Step C — Push your code

In the project folder run (replace `YOUR-USERNAME`):

```bash
git init
git add .
git commit -m "Initial portfolio commit"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/abdallah-elmaghawry.git
git push -u origin main
```

### Step D — Deploy to GitHub Pages

Still in the project folder:

```bash
npm run deploy
```

What this does:

1. Runs `npm run build` (the `predeploy` script) → produces a `dist/` folder.
2. Pushes `dist/` to a new branch called `gh-pages` on your GitHub repo.

### Step E — Turn on Pages in GitHub

1. Open your repo on GitHub.
2. Go to **Settings → Pages** (left sidebar).
3. Under **Build and deployment → Source**, choose **Deploy from a branch**.
4. **Branch:** `gh-pages`, **folder:** `/ (root)`. Click **Save**.
5. Wait ~1 minute. The page refreshes with your live URL at the top:
   `https://YOUR-USERNAME.github.io/abdallah-elmaghawry/`

### Updating the site later

Any time you change something:

```bash
git add .
git commit -m "Update content"
git push
npm run deploy
```

That’s it — the live site refreshes within a minute.

### Troubleshooting

- **Blank page after deploy / images don’t load** → the `base` in `vite.config.js` doesn’t match your repo name. Fix it, run `npm run deploy` again.
- **404 on the live URL** → wait 2–3 minutes after the first deploy; GitHub Pages sometimes takes a moment to propagate. Also confirm Settings → Pages shows the `gh-pages` branch.
- **`gh-pages: command not found`** → run `npm install` first.
- **Push asks for password** → use a GitHub Personal Access Token instead of your password (Settings → Developer settings → Personal access tokens → Tokens (classic) → Generate). Or set up SSH keys.

---

## 3) Add the portfolio to your LinkedIn profile

Once your live URL works (`https://YOUR-USERNAME.github.io/abdallah-elmaghawry/`), there are **four** places to surface it on LinkedIn. Do all four for maximum visibility.

### A. Add it to **Contact info → Website** (everyone can do this — free)

This is the most important spot — it’s the one that shows up under your name.

1. Go to your LinkedIn profile.
2. Click **Contact info** (right under your headline).
3. Click the pencil **Edit** icon.
4. Scroll to **Websites → Add website**.
5. Paste your URL. For **Type**, choose **Portfolio** (or **Other** and label it “Portfolio”).
6. Click **Save**.

### B. Pin it to your **Featured** section (free)

1. On your profile, scroll to **Featured** (if you don’t see it: click **Add profile section → Recommended → Add featured**).
2. Click the **+** in the Featured section → **Add a link**.
3. Paste your URL. LinkedIn will auto-pull a preview image and title.
4. Add a short caption like “My portfolio — power electronics, BMS, and embedded hardware projects.”
5. Save. It now appears as a clickable card high on your profile.

### C. Add it as a clickable link in your **About** section (free)

LinkedIn doesn’t hyperlink raw text in About, but readers can copy it. Put a line at the very top:

```
🌐 Portfolio: https://YOUR-USERNAME.github.io/abdallah-elmaghawry/
```

(Skip the emoji if you prefer.)

### D. The **“Visit my website” custom button** under your profile photo

This is the prominent CTA button right below your headline. To unlock it you need to **turn on Creator Mode** (free):

1. On your profile, scroll to the **Resources** panel on the right side.
2. Click **Creator mode → Get started** (or Settings & Privacy → Account preferences → Creator mode).
3. Add at least 5 topics (hashtags) — you can use things like `#PowerElectronics #BMS #EmbeddedHardware #PCBDesign #SMPS`.
4. Click **Done**. (Creator mode is free; it doesn’t change anything else important.)
5. Now back on your profile, click the pencil on your **intro/header** card.
6. Scroll to **Custom button** → toggle it **on**.
7. **Action:** choose **Visit my website**.
8. **URL:** paste `https://YOUR-USERNAME.github.io/abdallah-elmaghawry/`.
9. Save. The blue **“Visit my website”** button now appears under your name.

> **Note:** the **exact** label of the button in LinkedIn is **“Visit my website”** — that's the one you want. The other options (Book an appointment, View portfolio in a Service page, etc.) are tied to LinkedIn Services and aren’t needed.

### Bonus — share a launch post

After it’s live, post about it once so the link gets seen:

> 🚀 Just published my engineering portfolio — 3+ years of power electronics R&D, SMPS, EV battery research, and the BMS work I’m doing now at Pylon. Would love feedback! https://YOUR-USERNAME.github.io/abdallah-elmaghawry/

That post will live on your profile under **Activity** and is another permanent doorway to the site.

---

## Quick checklist

- [ ] Drop `abdallah.png` (transparent if possible) into `src\assets\`
- [ ] `npm install`
- [ ] Create GitHub repo named `abdallah-elmaghawry`
- [ ] `git init && git add . && git commit -m "init" && git push`
- [ ] `npm run deploy`
- [ ] Settings → Pages → branch = `gh-pages`
- [ ] Open `https://YOUR-USERNAME.github.io/abdallah-elmaghawry/`
- [ ] Add URL to LinkedIn Contact info, Featured, About, and Custom button
