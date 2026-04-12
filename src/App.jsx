import { useEffect, useState } from "react";
import axios from "axios";

const PINNED_REPOS = [
  "CodeForge",
  "Custom-E-Book",
  "banking_Managment_System",
  "HostelEats",
  "CinePulse",
  "QuizTracker",
];

const TECH_STACK = [
  { name: "React", color: "#61dafb" },
  { name: "Flutter", color: "#54c5f8" },
  { name: "Next.js", color: "#ffffff" },
  { name: "Node.js", color: "#68a063" },
  { name: "Firebase", color: "#ffca28" },
  { name: "MongoDB", color: "#4db33d" },
  { name: "TailwindCSS", color: "#38bdf8" },
  { name: "JavaScript", color: "#f7df1e" },
  { name: "TypeScript", color: "#3178c6" },
  { name: "Three.js", color: "#ffffff" },
  { name: "Express.js", color: "#aaaaaa" },
  { name: "Figma", color: "#f24e1e" },
];

const langColors = {
  JavaScript: "#f7df1e",
  TypeScript: "#3178c6",
  Python: "#3572a5",
  Dart: "#00b4ab",
  Rust: "#dea584",
  Go: "#00add8",
  CSS: "#563d7c",
  HTML: "#e34c26",
  Java: "#b07219",
  "C++": "#f34b7d",
  Shell: "#89e051",
};

const styles = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Inter', -apple-system, sans-serif; }

  .app { min-height: 100vh; background: #0a0a0a; color: #e0e0e0; transition: background 0.3s, color 0.3s; }
  .app.light { background: #f4f4f2; color: #1a1a1a; }

  .navbar {
    display: flex; justify-content: space-between; align-items: center;
    padding: 1.1rem 2.5rem;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    position: sticky; top: 0; z-index: 10;
    background: rgba(10,10,10,0.88); backdrop-filter: blur(14px);
  }
  .light .navbar { background: rgba(244,244,242,0.88); border-bottom: 1px solid rgba(0,0,0,0.07); }
  .logo { font-size: 0.95rem; font-weight: 600; letter-spacing: -0.01em; }
  .nav-links { display: flex; align-items: center; gap: 1.5rem; }
  .nav-link { font-size: 0.8rem; color: #555; text-decoration: none; transition: color 0.2s; letter-spacing: 0.02em; }
  .nav-link:hover { color: #e0e0e0; }
  .light .nav-link { color: #aaa; }
  .light .nav-link:hover { color: #111; }
  .toggle-btn {
    background: none; border: 1px solid rgba(255,255,255,0.12); color: #666;
    font-size: 0.75rem; padding: 0.35rem 0.85rem; border-radius: 999px;
    cursor: pointer; font-family: inherit; letter-spacing: 0.04em; transition: all 0.2s;
  }
  .toggle-btn:hover { border-color: rgba(255,255,255,0.3); color: #ccc; }
  .light .toggle-btn { border-color: rgba(0,0,0,0.15); color: #777; }
  .light .toggle-btn:hover { border-color: rgba(0,0,0,0.35); color: #222; }

  /* HERO */
  .hero { max-width: 720px; margin: 0 auto; padding: 5.5rem 2.5rem 4.5rem; }
  .hero-badge {
    display: inline-flex; align-items: center; gap: 0.4rem;
    font-size: 0.7rem; letter-spacing: 0.1em; text-transform: uppercase;
    color: #4ade80; background: rgba(74,222,128,0.08); border: 1px solid rgba(74,222,128,0.2);
    padding: 0.3rem 0.8rem; border-radius: 999px; margin-bottom: 1.5rem;
  }
  .badge-dot { width: 6px; height: 6px; border-radius: 50%; background: #4ade80; animation: blink 2s infinite; }
  @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }

  .hero h1 {
    font-size: clamp(2.6rem, 7vw, 4.2rem); font-weight: 600;
    letter-spacing: -0.04em; line-height: 1.08; margin-bottom: 1rem; color: #f0f0f0;
  }
  .light .hero h1 { color: #0f0f0f; }
  .hero-sub { font-size: 1rem; color: #555; line-height: 1.7; max-width: 520px; margin-bottom: 2rem; }
  .light .hero-sub { color: #666; }

  .hero-actions { display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap; }
  .btn-primary {
    display: inline-flex; align-items: center; gap: 0.4rem;
    background: #f0f0f0; color: #0a0a0a; font-size: 0.82rem; font-weight: 500;
    padding: 0.55rem 1.2rem; border-radius: 999px; text-decoration: none;
    transition: background 0.2s; border: none; cursor: pointer; font-family: inherit;
  }
  .btn-primary:hover { background: #fff; }
  .light .btn-primary { background: #111; color: #f5f5f5; }
  .light .btn-primary:hover { background: #000; }
  .btn-outline {
    display: inline-flex; align-items: center; gap: 0.4rem;
    background: none; color: #666; font-size: 0.82rem;
    padding: 0.55rem 1.2rem; border-radius: 999px; text-decoration: none;
    border: 1px solid rgba(255,255,255,0.1); transition: all 0.2s;
  }
  .btn-outline:hover { border-color: rgba(255,255,255,0.3); color: #ccc; }
  .light .btn-outline { border-color: rgba(0,0,0,0.12); color: #888; }
  .light .btn-outline:hover { border-color: rgba(0,0,0,0.3); color: #333; }

  .divider { width: 36px; height: 1px; background: rgba(255,255,255,0.08); margin: 2.5rem 0; }
  .light .divider { background: rgba(0,0,0,0.1); }

  /* SECTIONS */
  .section { max-width: 1100px; margin: 0 auto; padding: 0 2.5rem 5rem; }
  .section-label { font-size: 0.7rem; letter-spacing: 0.12em; text-transform: uppercase; color: #3a3a3a; font-weight: 500; margin-bottom: 1.5rem; }
  .light .section-label { color: #aaa; }

  /* GITHUB CONTRIBUTION GRID */
  .contrib-wrap { overflow-x: auto; padding-bottom: 0.5rem; }
  .contrib-grid { display: flex; gap: 3px; align-items: flex-end; min-width: max-content; }
  .contrib-col { display: flex; flex-direction: column; gap: 3px; }
  .contrib-cell {
    width: 11px; height: 11px; border-radius: 2px;
    background: rgba(255,255,255,0.05);
  }
  .light .contrib-cell { background: rgba(0,0,0,0.06); }
  .contrib-cell.l1 { background: #0e4429; }
  .contrib-cell.l2 { background: #006d32; }
  .contrib-cell.l3 { background: #26a641; }
  .contrib-cell.l4 { background: #39d353; }
  .light .contrib-cell.l1 { background: #9be9a8; }
  .light .contrib-cell.l2 { background: #40c463; }
  .light .contrib-cell.l3 { background: #30a14e; }
  .light .contrib-cell.l4 { background: #216e39; }

  .contrib-months { display: flex; gap: 3px; padding-left: 0; margin-bottom: 4px; min-width: max-content; }
  .contrib-month { font-size: 0.65rem; color: #444; width: 52px; }
  .light .contrib-month { color: #bbb; }

  .contrib-footer { display: flex; align-items: center; gap: 0.5rem; margin-top: 0.75rem; }
  .contrib-footer-label { font-size: 0.7rem; color: #444; }
  .light .contrib-footer-label { color: #aaa; }
  .contrib-legend { display: flex; gap: 3px; }
  .contrib-legend-cell { width: 11px; height: 11px; border-radius: 2px; }

  /* TECH STACK */
  .stack-wrap { display: flex; flex-wrap: wrap; gap: 0.5rem; }
  .stack-pill {
    display: inline-flex; align-items: center; gap: 0.4rem;
    font-size: 0.75rem; padding: 0.35rem 0.8rem; border-radius: 999px;
    border: 1px solid rgba(255,255,255,0.08); color: #888; transition: all 0.2s;
    background: rgba(255,255,255,0.02);
  }
  .stack-pill:hover { border-color: rgba(255,255,255,0.2); color: #ccc; background: rgba(255,255,255,0.05); }
  .light .stack-pill { border-color: rgba(0,0,0,0.1); color: #777; background: rgba(0,0,0,0.02); }
  .light .stack-pill:hover { border-color: rgba(0,0,0,0.25); color: #222; }
  .stack-dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }

  /* PROJECTS GRID */
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; overflow: hidden; }
  .light .grid { background: rgba(0,0,0,0.06); border-color: rgba(0,0,0,0.06); }
  .card { background: #0a0a0a; padding: 1.5rem 1.75rem; transition: background 0.2s; display: flex; flex-direction: column; gap: 0.5rem; min-height: 140px; }
  .card:hover { background: #111; }
  .light .card { background: #f4f4f2; }
  .light .card:hover { background: #eeeeed; }
  .card-name { font-size: 0.9rem; font-weight: 500; color: #e0e0e0; letter-spacing: -0.01em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .light .card-name { color: #111; }
  .card-desc { font-size: 0.8rem; color: #444; line-height: 1.55; flex: 1; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
  .light .card-desc { color: #777; }
  .card-footer { display: flex; align-items: center; justify-content: space-between; margin-top: 0.5rem; }
  .card-meta { display: flex; align-items: center; gap: 1rem; }
  .meta-item { display: flex; align-items: center; gap: 0.35rem; font-size: 0.72rem; color: #3a3a3a; }
  .light .meta-item { color: #aaa; }
  .lang-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
  .card-link { font-size: 0.72rem; color: #3a3a3a; text-decoration: none; letter-spacing: 0.02em; transition: color 0.15s; }
  .card-link:hover { color: #e0e0e0; }
  .light .card-link { color: #bbb; }
  .light .card-link:hover { color: #111; }

  /* CONTACT */
  .contact-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 1px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; overflow: hidden; }
  .light .contact-grid { background: rgba(0,0,0,0.06); border-color: rgba(0,0,0,0.06); }
  .contact-card { background: #0a0a0a; padding: 1.5rem 1.75rem; text-decoration: none; display: flex; flex-direction: column; gap: 0.5rem; transition: background 0.2s; }
  .contact-card:hover { background: #111; }
  .light .contact-card { background: #f4f4f2; }
  .light .contact-card:hover { background: #eeeeed; }
  .contact-type { font-size: 0.65rem; letter-spacing: 0.1em; text-transform: uppercase; color: #3a3a3a; }
  .light .contact-type { color: #bbb; }
  .contact-value { font-size: 0.85rem; color: #e0e0e0; font-weight: 500; }
  .light .contact-value { color: #111; }
  .contact-arrow { font-size: 0.75rem; color: #3a3a3a; margin-top: auto; padding-top: 0.75rem; }
  .light .contact-arrow { color: #bbb; }

  /* FOOTER */
  .footer { max-width: 1100px; margin: 0 auto; padding: 1.5rem 2.5rem 3rem; display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(255,255,255,0.05); }
  .light .footer { border-top: 1px solid rgba(0,0,0,0.07); }
  .footer-text { font-size: 0.72rem; color: #2a2a2a; }
  .light .footer-text { color: #bbb; }

  .loading { display: flex; align-items: center; gap: 0.5rem; color: #333; font-size: 0.82rem; padding: 2rem 0; }
  .light .loading { color: #bbb; }
  .dot-pulse { display: flex; gap: 4px; }
  .dot-pulse span { width: 4px; height: 4px; background: #333; border-radius: 50%; animation: pulse 1.2s ease-in-out infinite; }
  .light .dot-pulse span { background: #bbb; }
  .dot-pulse span:nth-child(2) { animation-delay: 0.2s; }
  .dot-pulse span:nth-child(3) { animation-delay: 0.4s; }
  @keyframes pulse { 0%,80%,100%{opacity:0.2;transform:scale(0.8)} 40%{opacity:1;transform:scale(1)} }
`;

function generateContribData() {
  const weeks = 52;
  const data = [];
  for (let w = 0; w < weeks; w++) {
    const col = [];
    for (let d = 0; d < 7; d++) {
      const r = Math.random();
      if (r < 0.35) col.push(0);
      else if (r < 0.55) col.push(1);
      else if (r < 0.72) col.push(2);
      else if (r < 0.87) col.push(3);
      else col.push(4);
    }
    data.push(col);
  }
  return data;
}

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function ContribGrid({ dark }) {
  const [data] = useState(() => generateContribData());
  const now = new Date();
  const monthLabels = [];
  for (let i = 11; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    monthLabels.push(MONTHS[d.getMonth()]);
  }

  return (
    <div>
      <div className="contrib-months">
        {monthLabels.map((m, i) => (
          <div key={i} className="contrib-month">
            {m}
          </div>
        ))}
      </div>
      <div className="contrib-wrap">
        <div className="contrib-grid">
          {data.map((col, wi) => (
            <div key={wi} className="contrib-col">
              {col.map((level, di) => (
                <div
                  key={di}
                  className={`contrib-cell${level > 0 ? ` l${level}` : ""}`}
                  title={`${level} contributions`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="contrib-footer">
        <span className="contrib-footer-label">Less</span>
        <div className="contrib-legend">
          {[0, 1, 2, 3, 4].map((l) => (
            <div
              key={l}
              className={`contrib-legend-cell contrib-cell${l > 0 ? ` l${l}` : ""}`}
            />
          ))}
        </div>
        <span className="contrib-footer-label">More</span>
      </div>
    </div>
  );
}

export default function App() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    axios
      .get("https://api.github.com/users/Aditya01237/repos?per_page=100")
      .then((res) => {
        const pinned = res.data.filter((r) =>
          PINNED_REPOS.map((n) => n.toLowerCase()).includes(
            r.name.toLowerCase(),
          ),
        );
        const fallback =
          pinned.length > 0
            ? pinned
            : res.data
                .sort((a, b) => b.stargazers_count - a.stargazers_count)
                .slice(0, 6);
        setRepos(fallback);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <>
      <style>{styles}</style>
      <div className={`app${dark ? "" : " light"}`}>
        {/* Navbar */}
        <nav className="navbar">
          <span className="logo">Aditya Pareek</span>
          <div className="nav-links">
            <a href="#projects" className="nav-link">
              Projects
            </a>
            <a href="#stack" className="nav-link">
              Stack
            </a>
            <a href="#contact" className="nav-link">
              Contact
            </a>
            <button className="toggle-btn" onClick={() => setDark(!dark)}>
              {dark ? "Light" : "Dark"}
            </button>
          </div>
        </nav>

        {/* Hero */}
        <div className="hero">
          <div className="hero-badge">
            <span className="badge-dot" />
            Problem Solver · he/him
          </div>
          <h1>
            Building Solutions
            <br />
          </h1>
          <p className="hero-sub">
            I'm Aditya Pareek — Passionate about solving complex problems and
            turning ideas into impactful digital solutions.
          </p>
          <div className="hero-actions">
            <a href="mailto:pareekaditya01@gmail.com" className="btn-outline">
              Get in touch
            </a>
          </div>
        </div>

        {/* Projects */}
        <div className="section" id="projects">
          <div className="section-label">Projects</div>
          {loading ? (
            <div className="loading">
              <div className="dot-pulse">
                <span />
                <span />
                <span />
              </div>
              Fetching repos
            </div>
          ) : repos.length === 0 ? (
            <p style={{ fontSize: "0.82rem", color: "#444" }}>
              No repos found.
            </p>
          ) : (
            <div className="grid">
              {repos.map((repo) => (
                <div key={repo.id} className="card">
                  <div className="card-name">{repo.name}</div>
                  <div className="card-desc">
                    {repo.description || "No description provided."}
                  </div>
                  <div className="card-footer">
                    <div className="card-meta">
                      {repo.language && (
                        <span className="meta-item">
                          <span
                            className="lang-dot"
                            style={{
                              background: langColors[repo.language] || "#888",
                            }}
                          />
                          {repo.language}
                        </span>
                      )}
                      {repo.stargazers_count > 0 && (
                        <span className="meta-item">
                          ★ {repo.stargazers_count}
                        </span>
                      )}
                    </div>
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noreferrer"
                      className="card-link"
                    >
                      View →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Tech Stack */}
        <div className="section" id="stack">
          <div className="section-label">Tech Stack</div>
          <div className="stack-wrap">
            {TECH_STACK.map((t) => (
              <div key={t.name} className="stack-pill">
                <span className="stack-dot" style={{ background: t.color }} />
                {t.name}
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        {/* Contact */}
        <div className="section" id="contact">
          <div className="section-label">Contact</div>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            {/* GitHub */}
            <a
              href="https://github.com/Aditya01237"
              target="_blank"
              rel="noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.55rem 1.1rem",
                borderRadius: "999px",
                textDecoration: "none",
                border: dark
                  ? "1px solid rgba(255,255,255,0.15)"
                  : "1px solid rgba(0,0,0,0.15)",
                color: dark ? "#e0e0e0" : "#1a1a1a",
                fontSize: "0.82rem",
                fontWeight: 500,
                transition: "all 0.2s",
                background: dark
                  ? "rgba(255,255,255,0.03)"
                  : "rgba(0,0,0,0.03)",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = dark
                  ? "rgba(255,255,255,0.1)"
                  : "rgba(0,0,0,0.08)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = dark
                  ? "rgba(255,255,255,0.03)"
                  : "rgba(0,0,0,0.03)")
              }
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
              GitHub
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com/in/aditya-pareek-36a0b6188"
              target="_blank"
              rel="noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.55rem 1.1rem",
                borderRadius: "999px",
                textDecoration: "none",
                border: "1px solid rgba(10,102,194,0.4)",
                color: "#0a66c2",
                fontSize: "0.82rem",
                fontWeight: 500,
                transition: "all 0.2s",
                background: "rgba(10,102,194,0.06)",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "rgba(10,102,194,0.14)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "rgba(10,102,194,0.06)")
              }
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </a>

            {/* Email */}
            <a
              href="mailto:pareekaditya01@gmail.com"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.55rem 1.1rem",
                borderRadius: "999px",
                textDecoration: "none",
                border: "1px solid rgba(234,67,53,0.4)",
                color: "#ea4335",
                fontSize: "0.82rem",
                fontWeight: 500,
                transition: "all 0.2s",
                background: "rgba(234,67,53,0.06)",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "rgba(234,67,53,0.14)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "rgba(234,67,53,0.06)")
              }
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.910 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
              </svg>
              Email
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="footer">
          <span className="footer-text">
            © 2026 Aditya Pareek · Sardarshahar, India
          </span>
          <span className="footer-text">Built with React</span>
        </div>
      </div>
    </>
  );
}
