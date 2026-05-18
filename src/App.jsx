import { useState, useEffect, useRef } from "react";
import fotoFelda from "./assets/felda.png";
import { resume, stats, navLinks } from "./data.js";

/* ── Intersection observer hook ── */
function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, vis];
}

function FadeSection({ id, children, style = {} }) {
  const [ref, vis] = useInView();
  return (
    <section id={id} ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(20px)", transition: "opacity .65s ease, transform .65s ease", ...style }}>
      {children}
    </section>
  );
}

/* ── Nav ── */
function Navbar({ active }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [cvOpen, setCvOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const navStyle = {
    position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
    transition: "all .3s",
    ...(scrolled ? { background: "rgba(5,5,5,0.85)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.07)" } : {}),
  };

  return (
    <>
      <header style={navStyle}>
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 24px" }}>
          {/* Logo */}
          <a href="#home" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontFamily: "'Geist','Inter',sans-serif", fontWeight: 700, fontSize: 20, letterSpacing: "-.03em", color: "#fff" }}>
              <span style={{ color: "#00D4FF" }}>&lt;/&gt;</span>{" "}
              FELDA<span style={{ color: "#9D4EDD" }}>.DEV</span>
            </span>
          </a>

          {/* Desktop nav */}
          <nav style={{ display: "flex", gap: 32, alignItems: "center" }} className="hidden-mobile">
            {navLinks.map(n => (
              <a key={n.href} href={n.href} className="mono" style={{
                fontSize: 12, letterSpacing: ".12em", textTransform: "uppercase", textDecoration: "none",
                color: active === n.href.slice(1) ? "#fff" : "#6B7280",
                borderBottom: active === n.href.slice(1) ? "2px solid #9D4EDD" : "2px solid transparent",
                paddingBottom: 2, transition: "color .2s",
              }}>
                {n.label}
              </a>
            ))}
          </nav>

          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <button onClick={() => setCvOpen(true)} className="btn-primary hidden-mobile" style={{ padding: "10px 22px", fontSize: 12 }}>
              Resume
            </button>
            <button onClick={() => setOpen(o => !o)} className="show-mobile" style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", padding: 4 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 28 }}>{open ? "close" : "menu"}</span>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="glass show-mobile" style={{ padding: "16px 24px 24px", display: "flex", flexDirection: "column", gap: 16 }}>
            {navLinks.map(n => (
              <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="mono"
                style={{ fontSize: 12, letterSpacing: ".12em", textTransform: "uppercase", textDecoration: "none", color: "#9B9B9B" }}>
                {n.label}
              </a>
            ))}
            <button onClick={() => { setCvOpen(true); setOpen(false); }} className="btn-primary" style={{ textAlign: "center", justifyContent: "center" }}>
              Resume
            </button>
          </div>
        )}
      </header>

      {/* CV Modal */}
      {cvOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
          <div onClick={() => setCvOpen(false)} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.75)", backdropFilter: "blur(6px)" }} />
          <div className="glass" style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 900, height: "82vh", borderRadius: 16, display: "flex", flexDirection: "column", overflow: "hidden" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px", borderBottom: "1px solid rgba(255,255,255,.08)" }}>
              <span style={{ fontFamily: "'Geist',sans-serif", fontWeight: 700, fontSize: 15, color: "#fff" }}>CV Preview</span>
              <div style={{ display: "flex", gap: 8 }}>
                {[["Open Tab", "/resume.pdf", true, false], ["Download", "/resume.pdf", false, true]].map(([label, href, isNew, isDl]) => (
                  <a key={label} href={href} target={isNew ? "_blank" : undefined} download={isDl || undefined} rel="noreferrer"
                    className="glass mono" style={{ padding: "6px 14px", borderRadius: 8, fontSize: 12, color: "#ccc", textDecoration: "none" }}>
                    {label}
                  </a>
                ))}
                <button onClick={() => setCvOpen(false)} className="glass mono" style={{ padding: "6px 14px", borderRadius: 8, fontSize: 12, color: "#ccc", background: "none", border: "1px solid rgba(255,255,255,.07)", cursor: "pointer" }}>
                  Close
                </button>
              </div>
            </div>
            <iframe src="/resume.pdf" style={{ flex: 1, border: "none", width: "100%" }} title="CV Preview" />
          </div>
        </div>
      )}
    </>
  );
}

/* ── Hero ── */
function Hero() {
  return (
    <section id="home" style={{ minHeight: "100svh", display: "flex", alignItems: "center", position: "relative", paddingTop: 80 }}>
      <div className="grid-bg" style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />
      {/* Glow blobs */}
      <div style={{ position: "absolute", top: "-10%", left: "-5%", width: "45vw", height: "45vw", borderRadius: "50%", background: "rgba(157,78,221,.06)", filter: "blur(120px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-10%", right: "-5%", width: "50vw", height: "50vw", borderRadius: "50%", background: "rgba(0,212,255,.05)", filter: "blur(120px)", pointerEvents: "none" }} />

      <div className="container" style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: "clamp(40px,8vw,100px)", flexWrap: "wrap", padding: "60px 24px" }}>
        {/* Text side */}
        <div style={{ flex: "1 1 340px", display: "flex", flexDirection: "column", gap: 24 }}>
          {/* Available badge */}
          <div className="glass mono" style={{ alignSelf: "flex-start", display: "flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 999, fontSize: 11, letterSpacing: ".1em", color: "#00D4FF" }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#00D4FF", animation: "pulse-ring 2s ease-in-out infinite" }} />
            Available for new collaborations
          </div>

          {/* Headline */}
          <div>
            <p className="mono" style={{ fontSize: 12, letterSpacing: ".16em", textTransform: "uppercase", color: "#9D4EDD", marginBottom: 14 }}>
              Data Science & AI
            </p>
            <h1 style={{ fontFamily: "'Geist','Inter',sans-serif", fontWeight: 700, fontSize: "clamp(2.8rem,7vw,5rem)", letterSpacing: "-.04em", lineHeight: 1.05, color: "#fff" }}>
              Turning<br />
              <span className="grad">Data</span> into<br />
              Insight.
            </h1>
          </div>

          {/* Summary */}
          <p style={{ fontSize: 16, lineHeight: 1.75, color: "#9B9B9B", maxWidth: 480 }}>
            {resume.summary}
          </p>

          {/* CTA */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 8 }}>
            <a href="#projects" className="btn-primary">
              View My Work
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>arrow_forward</span>
            </a>
            <a href="#contact" className="btn-ghost glass glow">
              Contact Me
            </a>
          </div>
        </div>

        {/* Photo side */}
        <div style={{ flex: "0 0 auto", display: "flex", justifyContent: "center" }}>
          <div style={{ position: "relative", width: "clamp(200px,28vw,320px)", height: "clamp(200px,28vw,320px)" }}>
            <div className="pulse" style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "linear-gradient(135deg,#9D4EDD,#00D4FF)", filter: "blur(32px)", opacity: .45 }} />
            <img src={fotoFelda} alt="Felda Ega Fadhila"
              style={{ position: "relative", zIndex: 1, width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover", objectPosition: "top", border: "2px solid rgba(255,255,255,.1)", boxShadow: "0 0 48px rgba(0,212,255,.2)" }}
              loading="eager"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Stats bar ── */
function Stats() {
  const [ref, vis] = useInView();
  return (
    <div ref={ref} style={{ padding: "0 0 64px" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: 12 }}>
          {stats.map((s, i) => (
            <div key={s.label} className="glass glow" style={{ borderRadius: 14, padding: "24px 16px", textAlign: "center", opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(16px)", transition: `opacity .5s ${i * .09}s ease, transform .5s ${i * .09}s ease` }}>
              <p style={{ fontFamily: "'Geist',sans-serif", fontWeight: 700, fontSize: "clamp(1.8rem,4vw,2.5rem)", color: s.color, letterSpacing: "-.03em", lineHeight: 1 }}>{s.value}</p>
              <p className="mono" style={{ fontSize: 10, letterSpacing: ".14em", textTransform: "uppercase", color: "#6B7280", marginTop: 6 }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Projects ── */
function Projects() {
  return (
    <FadeSection id="projects" style={{ padding: "80px 0" }}>
      <div className="container">
        <div style={{ marginBottom: 48 }}>
          <span className="section-label" style={{ color: "#9D4EDD" }}>// featured work</span>
          <h2 className="section-heading">Featured Projects</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 20 }}>
          {resume.projects.map((p) => {
            const c = p.accent === "blue" ? "#00D4FF" : "#9D4EDD";
            return (
              <article key={p.name} className="glass glow" style={{ borderRadius: 18, padding: "28px", display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: `${c}18`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 20, color: c }}>{p.icon}</span>
                  </div>
                  <a href={p.link} target="_blank" rel="noreferrer" style={{ color: "#6B7280", transition: "color .2s", textDecoration: "none" }}
                    onMouseEnter={e => e.currentTarget.style.color = "#fff"}
                    onMouseLeave={e => e.currentTarget.style.color = "#6B7280"}>
                    <span className="material-symbols-outlined" style={{ fontSize: 18 }}>open_in_new</span>
                  </a>
                </div>
                <div>
                  <h3 style={{ fontFamily: "'Geist','Inter',sans-serif", fontWeight: 700, fontSize: 17, letterSpacing: "-.02em", color: "#fff", marginBottom: 8 }}>{p.name}</h3>
                  {p.period && (
                    <p className="mono" style={{ fontSize: 11, color: "#6B7280", marginBottom: 8 }}>{p.period}</p>
                  )}
                  <p style={{ fontSize: 14, lineHeight: 1.7, color: "#9B9B9B" }}>{p.desc}</p>
                  {p.highlights?.length ? (
                    <ul style={{ margin: "12px 0 0", paddingLeft: 18, fontSize: 12, lineHeight: 1.6, color: "#9B9B9B" }}>
                      {p.highlights.map(h => (
                        <li key={h}>{h}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
                <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: 12 }}>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {p.tags.map((t, ti) => <span key={t} className={`chip ${ti % 2 === 0 ? "chip-blue" : "chip-purple"}`}>{t}</span>)}
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                    <a href={p.link} target="_blank" rel="noreferrer" className="mono"
                      style={{ fontSize: 12, letterSpacing: ".08em", color: c, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 4, transition: "gap .2s" }}
                      onMouseEnter={e => e.currentTarget.style.gap = "10px"}
                      onMouseLeave={e => e.currentTarget.style.gap = "4px"}>
                      View Project <span className="material-symbols-outlined" style={{ fontSize: 16 }}>arrow_forward</span>
                    </a>
                    {p.repo && (
                      <a href={p.repo} target="_blank" rel="noreferrer" className="mono"
                        style={{ fontSize: 12, letterSpacing: ".08em", color: "#9D4EDD", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6 }}>
                        GitHub <span className="material-symbols-outlined" style={{ fontSize: 16 }}>code</span>
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </FadeSection>
  );
}

/* ── Experience + Stack ── */
function Experience() {
  const timelineItems = [
    ...resume.experience,
    {
      role: resume.education.degree,
      company: resume.education.school,
      period: resume.education.period,
      icon: "school",
      highlights: [
        resume.education.gpa ? `GPA ${resume.education.gpa}` : null,
        resume.education.coursework?.length
          ? `Relevant Coursework: ${resume.education.coursework.join(", ")}`
          : null,
      ].filter(Boolean),
    },
  ];

  return (
    <FadeSection id="experience" style={{ padding: "80px 0" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 56 }}>
          {/* Timeline */}
          <div>
            <span className="section-label" style={{ color: "#00D4FF" }}>// career path</span>
            <h2 className="section-heading" style={{ marginBottom: 36 }}>Career Journey</h2>
            <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ position: "absolute", left: 19, top: 0, bottom: 0, width: 1, background: "linear-gradient(to bottom, transparent, rgba(255,255,255,.15) 20%, rgba(255,255,255,.15) 80%, transparent)" }} />
              {timelineItems.map((e, i) => {
                const c = i % 2 === 0 ? "#9D4EDD" : "#00D4FF";
                return (
                  <div key={e.role} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                    <div style={{ width: 38, height: 38, borderRadius: "50%", background: "#0d0d0d", border: "1px solid rgba(255,255,255,.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, zIndex: 1, transition: "border-color .3s" }}>
                      <span className="material-symbols-outlined" style={{ fontSize: 16, color: c }}>{e.icon}</span>
                    </div>
                    <div className="glass glow" style={{ flex: 1, borderRadius: 12, padding: "14px 18px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8, flexWrap: "wrap" }}>
                        <p style={{ fontWeight: 600, fontSize: 14, color: "#fff", letterSpacing: "-.01em" }}>{e.role}</p>
                        <span className="mono" style={{ fontSize: 11, color: c, whiteSpace: "nowrap" }}>{e.period}</span>
                      </div>
                      <p style={{ fontSize: 12, color: "#6B7280", marginTop: 3 }}>{e.company}</p>
                      {e.highlights?.length ? (
                        <ul style={{ margin: "8px 0 0", paddingLeft: 18, fontSize: 12, lineHeight: 1.6, color: "#9B9B9B" }}>
                          {e.highlights.map(h => (
                            <li key={h}>{h}</li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Stack */}
          <div>
            <span className="section-label" style={{ color: "#9D4EDD" }}>// tools & tech</span>
            <h2 className="section-heading" style={{ marginBottom: 36 }}>Tech Stack</h2>
            <div className="glass" style={{ borderRadius: 18, padding: "28px" }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {resume.skills.map((s, i) => <span key={s} className={`chip ${i % 2 === 0 ? "chip-blue" : "chip-purple"}`} style={{ fontSize: 13, padding: "6px 14px" }}>{s}</span>)}
              </div>

              <div style={{ margin: "28px 0", borderTop: "1px solid rgba(255,255,255,.07)" }} />

              <p style={{ fontWeight: 600, fontSize: 14, color: "#fff", marginBottom: 12, letterSpacing: "-.01em" }}>Code Philosophy</p>
              <div className="glass" style={{ borderRadius: 10, padding: "16px 16px 16px 20px", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 3, background: "linear-gradient(to bottom, #9D4EDD, #00D4FF)", borderRadius: "3px 0 0 3px" }} />
                <pre className="mono" style={{ fontSize: 12, lineHeight: 1.8, color: "#9B9B9B", whiteSpace: "pre-wrap" }}>
                  <span style={{ color: "#9D4EDD" }}>fn</span>{" "}
                  <span style={{ color: "#00D4FF" }}>build_solution</span>{"() {\n"}
                  {"  data: "}
                  <span style={{ color: "#c3d000" }}>"actionable"</span>{",\n"}
                  {"  model: "}
                  <span style={{ color: "#c3d000" }}>"interpretable"</span>{",\n"}
                  {"  impact: "}
                  <span style={{ color: "#c3d000" }}>"measurable"</span>{"\n}"}
                </pre>
              </div>

              <div style={{ margin: "28px 0", borderTop: "1px solid rgba(255,255,255,.07)" }} />

              <p style={{ fontWeight: 600, fontSize: 14, color: "#fff", marginBottom: 14, letterSpacing: "-.01em" }}>Certifications</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {resume.certifications.map(c => (
                  <div key={c} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 16, color: "#9D4EDD", flexShrink: 0 }}>verified</span>
                    <span style={{ fontSize: 13, color: "#9B9B9B", lineHeight: 1.4 }}>{c}</span>
                  </div>
                ))}
              </div>

              {resume.awards?.length ? (
                <>
                  <div style={{ margin: "28px 0", borderTop: "1px solid rgba(255,255,255,.07)" }} />
                  <p style={{ fontWeight: 600, fontSize: 14, color: "#fff", marginBottom: 14, letterSpacing: "-.01em" }}>Awards & Scholarships</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {resume.awards.map(a => (
                      <div key={a} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span className="material-symbols-outlined" style={{ fontSize: 16, color: "#00D4FF", flexShrink: 0 }}>workspace_premium</span>
                        <span style={{ fontSize: 13, color: "#9B9B9B", lineHeight: 1.4 }}>{a}</span>
                      </div>
                    ))}
                  </div>
                </>
              ) : null}

              {resume.competitions?.length ? (
                <>
                  <div style={{ margin: "28px 0", borderTop: "1px solid rgba(255,255,255,.07)" }} />
                  <p style={{ fontWeight: 600, fontSize: 14, color: "#fff", marginBottom: 14, letterSpacing: "-.01em" }}>Competitions</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    {resume.competitions.map(c => (
                      <div key={c.name} className="glass" style={{ borderRadius: 12, padding: "14px 16px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 8, flexWrap: "wrap" }}>
                          <p style={{ fontWeight: 600, fontSize: 13, color: "#fff", letterSpacing: "-.01em" }}>{c.name}</p>
                          <span className="mono" style={{ fontSize: 11, color: "#9D4EDD", whiteSpace: "nowrap" }}>{c.period}</span>
                        </div>
                        <p style={{ fontSize: 12, color: "#6B7280", marginTop: 4 }}>{c.result}</p>
                        {c.highlights?.length ? (
                          <ul style={{ margin: "8px 0 0", paddingLeft: 18, fontSize: 12, lineHeight: 1.6, color: "#9B9B9B" }}>
                            {c.highlights.map(h => (
                              <li key={h}>{h}</li>
                            ))}
                          </ul>
                        ) : null}
                        {c.link ? (
                          <a href={c.link} target="_blank" rel="noreferrer" className="mono"
                            style={{ fontSize: 11, letterSpacing: ".08em", color: "#00D4FF", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 4, marginTop: 10 }}>
                            View Dashboard <span className="material-symbols-outlined" style={{ fontSize: 14 }}>open_in_new</span>
                          </a>
                        ) : null}
                      </div>
                    ))}
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </FadeSection>
  );
}

/* ── Contact ── */
function Contact() {
  const contactItems = [
    { icon: "location_on", text: resume.contact.location },
    {
      icon: "phone",
      text: resume.contact.phone,
      href: resume.contact.phone
        ? `tel:${resume.contact.phone.replace(/\s+/g, "").replace(/-/g, "")}`
        : null,
    },
    {
      icon: "alternate_email",
      text: resume.contact.email,
      href: resume.contact.email ? `mailto:${resume.contact.email}` : null,
    },
    {
      icon: "language",
      text: resume.contact.website ? resume.contact.website.replace(/^https?:\/\//, "") : null,
      href: resume.contact.website || null,
    },
  ].filter(item => item.text);

  return (
    <FadeSection id="contact" style={{ padding: "80px 0 100px" }}>
      <div className="container">
        <div className="glass" style={{ borderRadius: 24, padding: "clamp(40px,8vw,80px)", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div className="grid-bg" style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: .6 }} />
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "60%", height: "60%", borderRadius: "50%", background: "radial-gradient(circle, rgba(157,78,221,.12), transparent 70%)", pointerEvents: "none" }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <span className="section-label" style={{ color: "#9D4EDD" }}>// get in touch</span>
            <h2 style={{ fontFamily: "'Geist','Inter',sans-serif", fontWeight: 700, fontSize: "clamp(2rem,5vw,3.5rem)", letterSpacing: "-.04em", lineHeight: 1.1, color: "#fff", marginBottom: 16 }}>
              Let's <span className="grad">Collaborate</span>
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: "#9B9B9B", maxWidth: 440, margin: "0 auto 36px" }}>
              Interested in collaborating, discussing data, or have an exciting project? Feel free to reach out.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center", marginBottom: 36 }}>
              <a href={`mailto:${resume.contact.email}`} className="btn-primary">
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>mail</span>
                Email Me
              </a>
              <a href={resume.contact.linkedin} target="_blank" rel="noreferrer" className="btn-ghost glass glow">
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>open_in_new</span>
                LinkedIn
              </a>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 24 }}>
              {contactItems.map(item => (
                <span key={item.text} className="mono" style={{ fontSize: 12, color: "#6B7280", display: "flex", alignItems: "center", gap: 6 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 15 }}>{item.icon}</span>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                      style={{ color: "#6B7280", textDecoration: "none" }}
                    >
                      {item.text}
                    </a>
                  ) : (
                    item.text
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </FadeSection>
  );
}

/* ── Footer ── */
function Footer() {
  return (
    <footer style={{ borderTop: "1px solid rgba(255,255,255,.05)", padding: "36px 0" }}>
      <div className="container" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 20 }}>
        <div>
          <p style={{ fontFamily: "'Geist',sans-serif", fontWeight: 700, fontSize: 18, letterSpacing: "-.03em", color: "#fff" }}>
            <span style={{ color: "#00D4FF" }}>&lt;/&gt;</span> FELDA<span style={{ color: "#9D4EDD" }}>.DEV</span>
          </p>
          <p className="mono" style={{ fontSize: 11, color: "#6B7280", marginTop: 4 }}>
            © {new Date().getFullYear()} Felda Ega Fadhila — Built with React & Tailwind
          </p>
        </div>
        <div style={{ display: "flex", gap: 24 }}>
          {[
            { label: "GitHub",   href: resume.contact.github },
            { label: "LinkedIn", href: resume.contact.linkedin },
            { label: "Email",    href: `mailto:${resume.contact.email}` },
          ].map(l => (
            <a key={l.label} href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
              className="mono"
              style={{ fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", color: "#6B7280", textDecoration: "none", transition: "color .2s, transform .2s", display: "inline-block" }}
              onMouseEnter={e => { e.currentTarget.style.color = "#9D4EDD"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "#6B7280"; e.currentTarget.style.transform = "none"; }}>
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

/* ── Active section tracker ── */
function useActiveSection() {
  const [active, setActive] = useState("home");
  useEffect(() => {
    const ids = navLinks.map(n => n.href.slice(1));
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
    }, { threshold: .35 });
    ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);
  return active;
}

/* ── App ── */
export default function App() {
  const active = useActiveSection();
  return (
    <div style={{ minHeight: "100svh", background: "#000", color: "#F3F4F6", overflowX: "hidden" }}>
      {/* Ambient blobs */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-15%", left: "-8%", width: "50vw", height: "50vw", borderRadius: "50%", background: "rgba(157,78,221,.055)", filter: "blur(140px)" }} />
        <div style={{ position: "absolute", bottom: "-15%", right: "-8%", width: "55vw", height: "55vw", borderRadius: "50%", background: "rgba(0,212,255,.045)", filter: "blur(140px)" }} />
      </div>
      <div style={{ position: "relative", zIndex: 1 }}>
        <Navbar active={active} />
        <main>
          <Hero />
          <Stats />
          <Projects />
          <Experience />
          <Contact />
        </main>
        <Footer />
      </div>
      <style>{`
        .hidden-mobile { display: flex !important; }
        .show-mobile   { display: none  !important; }
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile   { display: flex !important; }
        }
      `}</style>
    </div>
  );
}
