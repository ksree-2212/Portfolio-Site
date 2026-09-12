# Sreeshanth Konda — Portfolio

A full-stack personal portfolio built around a computer-vision "detection" visual theme: content is revealed with scroll-triggered bounding-box corner brackets, and projects display like detected objects with confidence tags.

**Stack:** Next.js (JavaScript, App Router) + Tailwind CSS + Framer Motion (frontend) · Node/Express + MongoDB Atlas + JWT (backend admin API) — all free-tier.

## Project structure

```
portfolio/
├── app/              # Next.js pages, layout, global styles
├── components/       # Hero, About, Skills, Projects, Experience, Contact, Nav
├── data/content.js   # Your resume content — edit this directly for quick changes
├── server/           # Express + MongoDB backend for the admin project API
└── public/           # Static assets (add a profile photo / resume PDF here)
```

## 1. Run the frontend locally

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`. Content comes from `data/content.js` by default — edit that file to change your bio, skills, or fallback projects instantly, no backend required.
The private project workspace is available at `http://localhost:3000/admin`. It has no public signup flow: create or update your single admin account with the backend command below, then sign in from the admin page.

## 2. Set up the backend (so you can add projects without editing code)

### a. Create a free MongoDB Atlas cluster
1. Sign up at https://www.mongodb.com/cloud/atlas/register (free tier, no card required for the M0 cluster).
2. Create a free M0 cluster, create a database user, and allow network access from anywhere (0.0.0.0/0) for now.
3. Copy your connection string — it looks like `mongodb+srv://user:password@cluster.mongodb.net/portfolio`.

### b. Configure the backend
```bash
cd server
npm install
cp .env.example .env
```
Fill in `.env`:
- `MONGODB_URI` — your Atlas connection string
- `JWT_SECRET` — any long random string (e.g. run `openssl rand -hex 32`)
- `ALLOWED_ORIGINS` — your deployed frontend URL (e.g. `https://sreeshanth.vercel.app`) — this is what makes the API only accept requests from your own site

### c. Create your admin login (one-time)
```bash
node createAdmin.js yourusername a-strong-password
```
There's no public signup page — this script is the only way to create an admin account, which keeps the login endpoint from doubling as an open registration form.
Use the same command to rotate the password later. The admin page stores the JWT only in the current browser session and uses the protected API to import or delete projects.

### d. Run the backend locally
```bash
npm run dev
```
It starts on `http://localhost:5000`. Test it: `GET http://localhost:5000/api/projects` should return `[]` initially.

### e. Add a project (example using curl)
```bash
# 1. Log in to get a token
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"yourusername","password":"a-strong-password"}'

# 2. Use the returned token to add a project
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "name": "New Project",
    "tag": "Computer Vision",
    "confidence": 0.95,
    "description": "What it does.",
    "stack": ["Python", "PyTorch"],
    "highlights": ["Key detail one.", "Key detail two."]
  }'
```

### f. Add a project automatically from a GitHub repo URL

Instead of filling out every field by hand, you can just point it at a repo:

```bash
curl -X POST http://localhost:5000/api/projects/from-github \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"repoUrl": "https://github.com/ksree-2212/your-repo-name"}'
```

This pulls the repo's name, description, primary languages, topics, and star count straight from GitHub's public API and creates the project entry automatically. Only works for **public** repos. GitHub's public API allows 60 requests/hour without a token — if you hit that limit, add a personal access token (no special scopes needed) as `GITHUB_TOKEN` in `.env` to raise it to 5000/hour.

You can still pass an optional `"confidence": 0.95` in the body if you want to override the default.

(The app also includes this workflow at `/admin`, so curl is only needed for API-level testing.)

## 3. Connect the frontend to the backend

In the frontend root, create `.env.local`:
```
BACKEND_API_URL=http://localhost:5000
```
Restart `npm run dev` — the Projects section and `/admin` use the Next.js server proxy, which fetches live records from the backend. The hardcoded list in `data/content.js` is used only if the API is empty or unreachable.
For remote use, deploy the backend first, set `ALLOWED_ORIGINS` to the exact frontend URL, and set `BACKEND_API_URL` in the frontend deployment to the backend URL. Keep `MONGODB_URI` and `JWT_SECRET` only in the backend environment.

## 4. Deploy — all free tiers

**Frontend → Vercel**
1. Push this repo to GitHub.
2. Import it at https://vercel.com/new.
3. Add the server environment variable `BACKEND_API_URL` pointing to your deployed backend (step below).
4. Deploy — you get a free `yourname.vercel.app` URL (custom domains supported later).

**Backend → Render**
1. Push the `server/` folder as its own GitHub repo (or deploy it as a subdirectory service).
2. Create a free Web Service at https://render.com, connect the repo.
3. Build command: `npm install`. Start command: `npm start`.
4. Add the environment variables from `server/.env.example` in Render's dashboard.
5. Once deployed, copy the Render URL into Vercel's `BACKEND_API_URL`.

**Database → MongoDB Atlas** (already set up in step 2a) — free M0 tier is enough for a portfolio's traffic.

## Security notes

- Helmet sets standard security headers; CORS is locked to your own frontend domain via `ALLOWED_ORIGINS`.
- Passwords are hashed with bcrypt — never stored in plain text.
- The login route is rate-limited (10 attempts / 15 minutes) to slow brute-force attempts.
- Admin routes require a valid JWT; tokens expire after 12 hours.
- There is no public signup route, by design — only `createAdmin.js`, run locally, can create an admin account.

## Customizing

- **Content:** edit `data/content.js` directly for instant changes.
- **Colors/fonts:** edit the token values in `tailwind.config.js`.
- **Add a resume download:** drop your PDF in `public/` and link to `/resume.pdf` from the Hero or Contact section.
