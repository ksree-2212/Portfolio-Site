const express = require("express");
const Project = require("../models/Project");
const { requireAdmin } = require("../middleware/auth");

const router = express.Router();

// Public — anyone visiting the portfolio can read the project list.
router.get("/", async (req, res) => {
  const projects = await Project.find().sort({ order: 1, createdAt: -1 });
  res.json(projects);
});

// Protected — only a logged-in admin can add a project.
router.post("/", requireAdmin, async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ error: "Could not create project.", details: err.message });
  }
});

// Protected — create a project by pulling details straight from a GitHub repo URL.
// Body: { "repoUrl": "https://github.com/owner/repo", "confidence": 0.9 } (confidence optional)
router.post("/from-github", requireAdmin, async (req, res) => {
  const { repoUrl, confidence } = req.body;

  if (!repoUrl) {
    return res.status(400).json({ error: "repoUrl is required." });
  }

  // Extract "owner/repo" from any common GitHub URL format.
  const match = repoUrl.match(/github\.com\/([^/]+)\/([^/]+?)(?:\.git)?\/?$/i);
  if (!match) {
    return res.status(400).json({ error: "Could not parse a GitHub repo URL from that input." });
  }
  const [, owner, repo] = match;

  try {
    const headers = { "User-Agent": "portfolio-app" };
    // Optional: set GITHUB_TOKEN in .env to raise the rate limit from 60 to 5000 requests/hour.
    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const repoRes = await fetch(`https://api.github.com/repos/${owner}/${repo}`, { headers });
    if (!repoRes.ok) {
      if (repoRes.status === 404) {
        return res.status(404).json({ error: "Repo not found. Check it's correct and public." });
      }
      if (repoRes.status === 403) {
        return res.status(429).json({ error: "GitHub API rate limit hit. Try again shortly, or add GITHUB_TOKEN to .env." });
      }
      return res.status(502).json({ error: "GitHub API request failed." });
    }
    const repoData = await repoRes.json();

    const langRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/languages`, { headers });
    const languages = langRes.ok ? Object.keys(await langRes.json()) : [];

    const project = await Project.create({
      name: repoData.name,
      tag: repoData.topics?.[0]
        ? repoData.topics[0].replace(/-/g, " ")
        : languages[0] || "Project",
      confidence: typeof confidence === "number" ? confidence : 0.9,
      description: repoData.description || "No description provided in the repo.",
      stack: languages.length > 0 ? languages : repoData.topics || [],
      highlights: [
        `${repoData.stargazers_count} stars on GitHub`,
        repoData.topics?.length ? `Topics: ${repoData.topics.join(", ")}` : undefined,
      ].filter(Boolean),
      link: repoData.html_url,
    });

    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ error: "Could not import from GitHub.", details: err.message });
  }
});

// Protected — update an existing project.
router.put("/:id", requireAdmin, async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!project) return res.status(404).json({ error: "Project not found." });
    res.json(project);
  } catch (err) {
    res.status(400).json({ error: "Could not update project.", details: err.message });
  }
});

// Protected — delete a project.
router.delete("/:id", requireAdmin, async (req, res) => {
  const project = await Project.findByIdAndDelete(req.params.id);
  if (!project) return res.status(404).json({ error: "Project not found." });
  res.json({ success: true });
});

module.exports = router;
