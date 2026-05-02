# GitHub from zero — beginner walkthrough

This guide assumes you’ve **never used git or GitHub** before. Follow it top to bottom, exactly. Total time: ~20 minutes.

By the end, your portfolio will be live at:

```
https://YOUR-USERNAME.github.io/abdallah-elmaghawry/
```

---

## Step 1 — Install Git (one time, ~3 min)

Git is the program that talks to GitHub. You probably don’t have it.

1. Go to **https://git-scm.com/download/win**
2. The download starts automatically (the file is called something like `Git-2.xx.x-64-bit.exe`).
3. Open the downloaded file. The installer pops up.
4. Click **Next** through every screen — the defaults are fine. (Don’t worry about “editor”, “PATH”, “SSL” options — defaults work.)
5. On the last screen, click **Install**, then **Finish**.

### Verify it worked

1. Press the **Windows key**, type **PowerShell**, and click **Windows PowerShell**. A blue window opens — this is the **terminal** (also called a “shell” or “command line”). This is where you type commands.
2. In the terminal, type this and press **Enter**:

   ```powershell
   git --version
   ```

   You should see something like `git version 2.43.0.windows.1`. If you see that — git is installed correctly.

   If you get *“git is not recognized”*: close the PowerShell window and open a new one (PATH only updates for new windows). If still broken, restart your computer.

---

## Step 2 — Tell git who you are (one time, 30 sec)

Git tags every change with your name and email. Set them once:

In the same PowerShell window, type these two commands (replace with your real info):

```powershell
git config --global user.name "Abdallah Elmaghawry"
git config --global user.email "obad55.ahmed39@gmail.com"
```

Press Enter after each. No output = success.

> Use the same email you’ll use for your GitHub account in Step 3.

---

## Step 3 — Create a GitHub account (skip if you have one, ~2 min)

1. Go to **https://github.com/signup**
2. Email → use **obad55.ahmed39@gmail.com** (or whatever you used in Step 2).
3. Pick a password.
4. Pick a **username** — this becomes part of your URL forever, so choose carefully. Good options: `abdallah-elmaghawry`, `abdallahmaghawry`, `aelmaghawry`. **Write it down — you’ll need it in Step 5.**
5. Verify the puzzle/email confirmation.
6. You’re in.

> From now on in this guide, anywhere you see **YOUR-USERNAME**, replace it with the username you picked.

---

## Step 4 — Create the repository on GitHub.com (~1 min)

A “repository” (or “repo”) is just a folder of code that lives on GitHub.

1. Make sure you’re logged in to https://github.com.
2. Click the **green “New”** button (top-left after logging in), or go directly to **https://github.com/new**.
3. Fill in:
   - **Repository name:** `abdallah-elmaghawry`  ← **must match exactly** (lowercase, hyphen, no spaces, no dot). This name becomes part of your URL.
   - **Description:** *(optional)* `Personal engineering portfolio.`
   - **Public** ← keep this selected (Pages is free for public repos only).
   - **DO NOT** tick “Add a README”.
   - **DO NOT** tick “Add .gitignore”.
   - **DO NOT** tick “Choose a license”.
   *(Your project already has these files — adding them on GitHub will conflict.)*
4. Click **Create repository**.

You’ll land on a page with commands. **Don’t copy them from there** — use the ones in Step 6 below (they’re the right ones for your situation).

---

## Step 5 — Get a Personal Access Token (PAT) for authentication (one time, ~2 min)

When you push code from your computer, GitHub will ask you to sign in. They **don’t accept passwords anymore** — you need a token instead. Get it now so it’s ready when prompted.

1. Go to **https://github.com/settings/tokens**
2. Click **Generate new token → Generate new token (classic)**.
3. **Note:** type something like `Portfolio deploys`.
4. **Expiration:** pick **90 days** (or **No expiration** if you want it permanent).
5. **Select scopes** — tick the **repo** checkbox at the top (this auto-ticks all the sub-boxes under it). That’s all you need.
6. Scroll down and click **Generate token**.
7. **A token appears** — looks like `ghp_AbCdEf1234...`. **Copy it now.** Paste it somewhere safe (Notepad). **You will NOT be able to see it again** — if you lose it you’ll have to make a new one.

That token is now your “password” when git asks. Treat it like a password.

---

## Step 6 — Push your portfolio to GitHub (the actual upload, ~3 min)

Now we connect your local folder to the GitHub repo and upload everything.

### 6.1 — Open a terminal **inside the project folder**

Two easy ways:

**Way A (mouse):**
1. Open File Explorer. Go to `G:\Portfolio\blue_version`.
2. Click in the **address bar** at the top of File Explorer (where it shows the path).
3. Type `powershell` and press **Enter**. A PowerShell window opens, **already inside that folder**. ✅

**Way B (right-click):**
1. In File Explorer, navigate to `G:\Portfolio`.
2. Right-click on the `blue_version` folder.
3. Click **Open in Terminal** (or **Open PowerShell window here**).

You can confirm you’re in the right place by typing `pwd` and pressing Enter — it should print `G:\Portfolio\blue_version`.

### 6.2 — Run the upload commands

Type each command below, press **Enter**, wait for it to finish, then type the next. **Replace `YOUR-USERNAME`** with your GitHub username from Step 3.

```powershell
git init
```
Initializes git tracking in this folder. You’ll see *“Initialized empty Git repository…”*.

```powershell
git add .
```
Tells git: “track every file in this folder.” The dot is important. No output = good.

```powershell
git commit -m "Initial portfolio commit"
```
Saves a snapshot. You’ll see a list of files and a summary.

```powershell
git branch -M main
```
Renames the default branch to `main`. No output = good.

```powershell
git remote add origin https://github.com/YOUR-USERNAME/abdallah-elmaghawry.git
```
Tells git where on GitHub to upload to. No output = good.

```powershell
git push -u origin main
```
**This is the upload.** This is when it asks for your login.

### 6.3 — When it asks you to sign in

A pop-up window appears (or you’re asked in the terminal):

- **Username:** type your GitHub username (from Step 3) and press Enter.
- **Password:** paste the **token** from Step 5 (Ctrl+V or right-click → Paste). The terminal won’t show characters as you paste — that’s normal. Press Enter.

After a few seconds you should see something like:

```
Writing objects: 100% (15/15), 8.32 KiB | 4.16 MiB/s, done.
Total 15 (delta 0), reused 0 (delta 0)
To https://github.com/YOUR-USERNAME/abdallah-elmaghawry.git
 * [new branch]      main -> main
```

🎉 **Your code is now on GitHub.** Refresh your repo page on github.com — you’ll see all your files.

### Troubleshooting

| Error                                                            | Fix                                                                                                                                              |
| ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `fatal: not a git repository`                                    | You ran `git add` before `git init`. Run `git init` first.                                                                                       |
| `remote origin already exists`                                   | Run `git remote remove origin` then redo the `git remote add origin …` command.                                                                  |
| `Authentication failed`                                          | Wrong token, or you used your password instead. Generate a new token (Step 5) and try `git push` again. **Use the token in the password field.** |
| `Updates were rejected because the remote contains work…`        | You ticked one of the “Add a README/license/.gitignore” boxes in Step 4. Easiest fix: delete the GitHub repo, recreate it without ticking those, push again. |
| `src refspec main does not match any`                            | You skipped `git commit`. Run `git commit -m "init"` then push again.                                                                            |

---

## Step 7 — Deploy to GitHub Pages (the “make it live” step, ~2 min)

Your code is on GitHub but not yet a website. This step builds the site and puts it online.

In the **same terminal window** (still in `G:\Portfolio\blue_version`):

```powershell
npm install
```

Wait for it to finish (1–2 minutes the first time). It downloads all the libraries the project needs.

```powershell
npm run deploy
```

This does two things automatically:
1. Builds your site into a `dist` folder.
2. Pushes that `dist` folder to a special branch on GitHub called `gh-pages`.

When it finishes you’ll see *“Published”* near the bottom.

### Turn on GitHub Pages

1. Go to your repo on GitHub: `https://github.com/YOUR-USERNAME/abdallah-elmaghawry`
2. Click the **Settings** tab (top of the page).
3. In the **left sidebar**, click **Pages**.
4. Under **Build and deployment**:
   - **Source:** *Deploy from a branch* (this is the default).
   - **Branch:** click the dropdown → choose **gh-pages**. Folder: **/ (root)**. Click **Save**.
5. The page refreshes. Wait ~1 minute, then refresh again. At the top you’ll see:

   > **Your site is live at https://YOUR-USERNAME.github.io/abdallah-elmaghawry/**

🎉 **That URL is your portfolio.** Click it — your site loads.

---

## Step 8 — Update the site later

Whenever you change the code (or your photo, or anything):

1. Open PowerShell in `G:\Portfolio\blue_version` (Step 6.1).
2. Run these four commands:

   ```powershell
   git add .
   git commit -m "Describe what you changed"
   git push
   npm run deploy
   ```

The live site updates within ~1 minute. **You don’t repeat Steps 1–7 ever again** — git remembers your token, GitHub remembers the repo.

---

## Mini glossary (for your own reference)

- **Terminal / PowerShell / shell / command line** — all the same thing. The blue/black window where you type commands.
- **Repository / repo** — a project folder tracked by git, mirrored on GitHub.
- **Commit** — a saved snapshot of your code at a point in time. Every commit has a message describing what changed.
- **Push** — upload your local commits to GitHub.
- **Branch** — a parallel version of the code. `main` is the default. `gh-pages` is the one GitHub Pages serves the website from.
- **PAT (Personal Access Token)** — a long string that replaces your password when git talks to GitHub.
- **GitHub Pages** — GitHub’s free static-website hosting, served from your repo.

---

## One-page cheat sheet (print this)

| What you want | Command |
| --- | --- |
| Open terminal in project folder | File Explorer → address bar → type `powershell` → Enter |
| First time setup (only once ever) | `git config --global user.name "..."` and `user.email "..."` |
| First-time push (only after creating a new repo) | `git init` → `git add .` → `git commit -m "init"` → `git branch -M main` → `git remote add origin <url>` → `git push -u origin main` |
| Update the live site (any time after) | `git add .` → `git commit -m "msg"` → `git push` → `npm run deploy` |
| Check status (which files changed) | `git status` |

That’s it. After Step 7 you have a real, live portfolio at a URL you can paste into LinkedIn.
