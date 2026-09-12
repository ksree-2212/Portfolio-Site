"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, ExternalLink, LogOut, Plus, ShieldCheck, Trash2 } from "lucide-react";

const API_URL = "https://sree22portfolio.onrender.com";

export default function AdminPage() {
  const [token, setToken] = useState(null);
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [repoUrl, setRepoUrl] = useState("");
  const [projects, setProjects] = useState([]);
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setToken(window.sessionStorage.getItem("portfolio_admin_token"));
  }, []);

  useEffect(() => {
    if (token) loadProjects(token);
  }, [token]);

  async function loadProjects(authToken) {
    const response = await fetch(`${API_URL}/projects`);
    if (response.ok) setProjects(await response.json());
  }

  async function login(event) {
    event.preventDefault();
    setBusy(true);
    setStatus("");
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
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
      const response = await fetch(`${API_URL}/projects/from-github`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ repoUrl: repoUrl.trim() }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not import project.");
      setProjects((current) => [data, ...current]);
      setRepoUrl("");
      setStatus("Project imported and published.");
    } catch (error) {
      setStatus(error.message);
    } finally {
      setBusy(false);
    }
  }

  async function removeProject(id) {
    if (!window.confirm("Remove this project from the portfolio?")) return;
    const response = await fetch(`${API_URL}/projects/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.ok) setProjects((current) => current.filter((project) => project._id !== id));
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
              <button className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-signal px-4 py-3 font-medium text-white transition hover:bg-[#6da3ff] disabled:opacity-50" disabled={busy || !repoUrl.trim()}><Plus size={17} /> {busy ? "Importing..." : "Import project"}</button>
            </form>
            {status && <p className="mt-4 text-sm text-signal">{status}</p>}
          </div>

          <div>
            <div className="flex items-end justify-between mb-4"><div><p className="font-mono text-xs text-amber mb-2">02 / live content</p><h2 className="font-display text-2xl font-bold">Published projects</h2></div><span className="font-mono text-xs text-muted">{projects.length} total</span></div>
            <div className="space-y-3">
              {projects.map((project) => (
                <article key={project._id} className="admin-panel rounded-lg p-5 flex items-start justify-between gap-4">
                  <div className="min-w-0"><div className="flex flex-wrap items-center gap-3 mb-2"><h3 className="font-display font-bold truncate">{project.name}</h3><span className="font-mono text-xs text-amber">{project.tag}</span></div><p className="text-muted text-sm line-clamp-2">{project.description}</p></div>
                  <div className="flex items-center gap-3 shrink-0"><a href={project.link} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.name} on GitHub`} className="text-muted hover:text-signal transition-colors"><ExternalLink size={16} /></a><button onClick={() => removeProject(project._id)} aria-label={`Delete ${project.name}`} className="text-muted hover:text-amber transition-colors"><Trash2 size={16} /></button></div>
                </article>
              ))}
              {projects.length === 0 && <div className="rounded-lg border border-dashed border-line p-10 text-center text-muted text-sm">No live projects yet.</div>}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}