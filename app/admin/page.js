"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ExternalLink, LogOut, Plus, ShieldCheck, Trash2, Image as ImageIcon, Check, ImagePlus, X } from "lucide-react";

const API_BASE = "/api/admin";
const MAX_IMAGE_DIMENSION = 900; // resized client-side before upload

// Reads an image file, downsizes it on a canvas, and returns a compact
// JPEG data URL — keeps uploads small and fast without needing any
// external file storage service.
function resizeImageFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new window.Image();
      img.onload = () => {
        const scale = Math.min(1, MAX_IMAGE_DIMENSION / img.width);
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.85));
      };
      img.onerror = () => reject(new Error("Could not read that image."));
      img.src = reader.result;
    };
    reader.onerror = () => reject(new Error("Could not read that file."));
    reader.readAsDataURL(file);
  });
}

export default function AdminPage() {
  const [token, setToken] = useState(null);
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [repoUrl, setRepoUrl] = useState("");
  const [demoUrl, setDemoUrl] = useState("");
  const [projects, setProjects] = useState([]);
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const [editingDemoId, setEditingDemoId] = useState(null);
  const [demoDraft, setDemoDraft] = useState("");
  const [uploadingId, setUploadingId] = useState(null);
  const fileInputRef = useRef(null);
  const pendingUploadId = useRef(null);

  useEffect(() => {
    setToken(window.sessionStorage.getItem("portfolio_admin_token"));
  }, []);

  useEffect(() => {
    if (token) loadProjects(token);
  }, [token]);

  async function loadProjects(authToken) {
    const response = await fetch(`${API_BASE}/projects`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    if (response.ok) setProjects(await response.json());
  }

  async function login(event) {
    event.preventDefault();
    setBusy(true);
    setStatus("");
    try {
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Login failed.");
      window.sessionStorage.setItem("portfolio_admin_token", data.token);
      setToken(data.token);
      setCredentials({ username: "", password: "" });
    } catch (error) {
      setStatus(error.message);
    } finally {
      setBusy(false);
    }
  }

  async function importProject(event) {
    event.preventDefault();
    if (!repoUrl.trim()) return;
    setBusy(true);
    setStatus("");
    try {
      const response = await fetch(`${API_BASE}/projects/from-github`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ repoUrl: repoUrl.trim(), demoUrl: demoUrl.trim() || undefined }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not import project.");
      setProjects((current) => [data, ...current]);
      setRepoUrl("");
      setDemoUrl("");
      setStatus("Project imported and published.");
    } catch (error) {
      setStatus(error.message);
    } finally {
      setBusy(false);
    }
  }

  async function removeProject(id) {
    if (!window.confirm("Remove this project from the portfolio?")) return;
    const response = await fetch(`${API_BASE}/projects/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.ok) setProjects((current) => current.filter((project) => project._id !== id));
  }

  async function saveDemoUrl(id) {
    try {
      const response = await fetch(`${API_BASE}/projects/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ demoUrl: demoDraft.trim() }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not save demo URL.");
      setProjects((current) => current.map((p) => (p._id === id ? data : p)));
      setEditingDemoId(null);
      setDemoDraft("");
    } catch (error) {
      setStatus(error.message);
    }
  }

  function triggerImageUpload(projectId) {
    pendingUploadId.current = projectId;
    fileInputRef.current?.click();
  }

  async function handleImageFileSelected(event) {
    const file = event.target.files?.[0];
    const id = pendingUploadId.current;
    event.target.value = ""; // allow re-selecting the same file later
    if (!file || !id) return;

    setUploadingId(id);
    setStatus("");
    try {
      const dataUrl = await resizeImageFile(file);
      const response = await fetch(`${API_BASE}/projects/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ image: dataUrl }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not upload image.");
      setProjects((current) => current.map((p) => (p._id === id ? data : p)));
    } catch (error) {
      setStatus(error.message);
    } finally {
      setUploadingId(null);
      pendingUploadId.current = null;
    }
  }

  async function removeImage(id) {
    try {
      const response = await fetch(`${API_BASE}/projects/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ image: "" }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not remove image.");
      setProjects((current) => current.map((p) => (p._id === id ? data : p)));
    } catch (error) {
      setStatus(error.message);
    }
  }

  function logout() {
    window.sessionStorage.removeItem("portfolio_admin_token");
    setToken(null);
    setProjects([]);
  }

  if (!token) {
    return (
      <main className="admin-shell min-h-screen flex items-center justify-center px-6 py-16">
        <section className="admin-panel w-full max-w-md rounded-xl p-8 sm:p-10 shadow-2xl shadow-black/20">
          <a href="/" className="inline-flex items-center gap-2 text-sm text-muted hover:text-text transition-colors mb-12">
            <ArrowLeft size={15} /> Back to portfolio
          </a>
          <div className="flex items-center gap-3 mb-3">
            <ShieldCheck className="text-signal" size={22} />
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-signal">Private workspace</p>
          </div>
          <h1 className="font-display text-3xl font-bold mb-2">Project control room</h1>
          <p className="text-muted text-sm leading-relaxed mb-8">Sign in to publish a project directly from its GitHub repository.</p>
          <form onSubmit={login} className="space-y-4">
            <input className="admin-input" aria-label="Username" placeholder="Username" autoComplete="username" value={credentials.username} onChange={(event) => setCredentials({ ...credentials, username: event.target.value })} />
            <input className="admin-input" aria-label="Password" placeholder="Password" type="password" autoComplete="current-password" value={credentials.password} onChange={(event) => setCredentials({ ...credentials, password: event.target.value })} />
            <button className="w-full rounded-md bg-signal px-4 py-3 font-medium text-white transition hover:bg-[#6da3ff] disabled:opacity-50" disabled={busy}>
              {busy ? "Signing in..." : "Sign in"}
            </button>
          </form>
          {status && <p className="mt-4 text-sm text-amber">{status}</p>}
        </section>
      </main>
    );
  }

  return (
    <main className="admin-shell min-h-screen px-6 py-8 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-line/70 pb-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-signal mb-2">Private workspace</p>
            <h1 className="font-display text-3xl font-bold">Project control room</h1>
          </div>
          <div className="flex items-center gap-4">
            <a href="/" className="text-sm text-muted hover:text-text transition-colors">View site</a>
            <button onClick={logout} className="inline-flex items-center gap-2 text-sm text-muted hover:text-amber transition-colors"><LogOut size={15} /> Sign out</button>
          </div>
        </header>

        <section className="grid lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-8 py-10">
          <div className="admin-panel rounded-xl p-6 sm:p-8 h-fit">
            <p className="font-mono text-xs text-amber mb-3">01 / publish</p>
            <h2 className="font-display text-2xl font-bold mb-2">Import from GitHub</h2>
            <p className="text-muted text-sm leading-relaxed mb-6">Paste a public repository URL. Its name, description, languages, topics, stars, and link will become a project card.</p>
            <form onSubmit={importProject} className="space-y-3">
              <input className="admin-input" aria-label="GitHub repository URL" placeholder="https://github.com/owner/repository" type="url" value={repoUrl} onChange={(event) => setRepoUrl(event.target.value)} />
              <input className="admin-input" aria-label="Live demo URL (optional)" placeholder="Live demo URL (optional)" type="url" value={demoUrl} onChange={(event) => setDemoUrl(event.target.value)} />
              <button className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-signal px-4 py-3 font-medium text-white transition hover:bg-[#6da3ff] disabled:opacity-50" disabled={busy || !repoUrl.trim()}><Plus size={17} /> {busy ? "Importing..." : "Import project"}</button>
            </form>
            <p className="text-muted text-xs leading-relaxed mt-3">Add a card image and/or a live demo link for any project in the list below — anything left blank falls back to GitHub's repo preview image, then an icon.</p>
            {status && <p className="mt-4 text-sm text-signal">{status}</p>}
          </div>

          <div>
            <div className="flex items-end justify-between mb-4"><div><p className="font-mono text-xs text-amber mb-2">02 / live content</p><h2 className="font-display text-2xl font-bold">Published projects</h2></div><span className="font-mono text-xs text-muted">{projects.length} total</span></div>
            <div className="space-y-3">
              {projects.map((project) => (
                <article key={project._id} className="admin-panel rounded-lg p-5 flex flex-col gap-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="relative shrink-0 w-14 h-14 rounded-md overflow-hidden border border-line/60 bg-panel2/50 flex items-center justify-center">
                        {project.image ? (
                          <img src={project.image} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <ImageIcon size={18} className="text-muted/50" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-3 mb-2"><h3 className="font-display font-bold truncate">{project.name}</h3><span className="font-mono text-xs text-amber">{project.tag}</span></div>
                        <p className="text-muted text-sm line-clamp-2">{project.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <button
                        onClick={() => triggerImageUpload(project._id)}
                        aria-label={`Upload image for ${project.name}`}
                        disabled={uploadingId === project._id}
                        className="text-muted hover:text-signal transition-colors disabled:opacity-50"
                      >
                        <ImagePlus size={16} />
                      </button>
                      {project.image && (
                        <button onClick={() => removeImage(project._id)} aria-label={`Remove image for ${project.name}`} className="text-muted hover:text-amber transition-colors">
                          <X size={16} />
                        </button>
                      )}
                      <a href={project.link} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.name} on GitHub`} className="text-muted hover:text-signal transition-colors"><ExternalLink size={16} /></a>
                      <button onClick={() => removeProject(project._id)} aria-label={`Delete ${project.name}`} className="text-muted hover:text-amber transition-colors"><Trash2 size={16} /></button>
                    </div>
                  </div>
                  {uploadingId === project._id && <p className="text-muted text-xs font-mono">Uploading image...</p>}
                  {editingDemoId === project._id ? (
                    <div className="flex items-center gap-2">
                      <input
                        className="admin-input flex-1"
                        aria-label="Live demo URL"
                        placeholder="https://your-live-demo.com"
                        type="url"
                        value={demoDraft}
                        onChange={(event) => setDemoDraft(event.target.value)}
                        autoFocus
                      />
                      <button onClick={() => saveDemoUrl(project._id)} aria-label="Save demo URL" className="shrink-0 text-signal hover:text-text transition-colors"><Check size={18} /></button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setEditingDemoId(project._id);
                        setDemoDraft(project.demoUrl || "");
                      }}
                      className="text-left text-xs font-mono text-muted/70 hover:text-signal transition-colors truncate"
                    >
                      {project.demoUrl ? `Live demo: ${project.demoUrl}` : "+ Add live demo link"}
                    </button>
                  )}
                </article>
              ))}
              {projects.length === 0 && <div className="rounded-lg border border-dashed border-line p-10 text-center text-muted text-sm">No live projects yet.</div>}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageFileSelected}
              className="hidden"
              aria-hidden="true"
            />
          </div>
        </section>
      </div>
    </main>
  );
}