import { useState, useEffect, useRef } from "react";
import fotoFelda from "./assets/felda.png";
import { resume, stats, navLinks } from "./data.js";
import { motion as Motion, MotionConfig, useScroll, useSpring, useTransform } from "motion/react";
import { Tilt } from "./components/ui/tilt";
import { Magnetic } from "./components/ui/magnetic";

/* Hero stagger variants */
const heroContainer = { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } } };
const heroItem = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 90, damping: 16 } },
};

/* ── Scroll progress bar ── */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 });
  return (
    <Motion.div aria-hidden="true" style={{
      position: "fixed", top: 0, left: 0, right: 0, height: 3, zIndex: 60, transformOrigin: "0% 50%", scaleX,
      background: "linear-gradient(90deg, var(--purple), var(--blue), var(--blob-3))",
    }} />
  );
}
import { SpotlightCard } from "./components/ui/spotlight-card";
import { NumberTicker } from "./components/ui/number-ticker";
import { Marquee } from "./components/ui/marquee";
import { WordRotate } from "./components/ui/word-rotate";
import { Spotlight } from "./components/ui/spotlight";

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
  return (
    <Motion.section id={id} style={style}
      initial={{ opacity: 0, y: 48, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ type: "spring", stiffness: 70, damping: 18, mass: 0.9 }}>
      {children}
    </Motion.section>
  );
}

/* ── Theme toggle ── */
function useTheme() {
  const [theme, setTheme] = useState(() => document.documentElement.getAttribute("data-theme") || "dark");
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try { localStorage.setItem("theme", theme); } catch { /* storage unavailable */ }
  }, [theme]);
  return [theme, () => setTheme(t => (t === "dark" ? "light" : "dark"))];
}

function ThemeToggle() {
  const [theme, toggle] = useTheme();
  const isDark = theme === "dark";
  return (
    <button onClick={toggle} className="glass glow" aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
      style={{ width: 38, height: 38, borderRadius: 999, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "var(--fg)", overflow: "hidden" }}>
      <Motion.span key={theme} className="material-symbols-outlined"
        initial={{ rotate: -90, scale: 0.4, opacity: 0 }} animate={{ rotate: 0, scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        style={{ fontSize: 20, color: isDark ? "#FDB813" : "var(--purple)" }}>
        {isDark ? "light_mode" : "dark_mode"}
      </Motion.span>
    </button>
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
    position: "fixed", top: scrolled ? 10 : 18, left: 12, right: 12, zIndex: 50,
    margin: "0 auto", maxWidth: scrolled ? 980 : 1100,
    borderRadius: open ? 28 : 999,
    transition: "top .5s cubic-bezier(.34,1.56,.64,1), max-width .6s cubic-bezier(.34,1.56,.64,1), border-radius .3s",
  };

  return (
    <>
      <header style={navStyle} className="glass liquid">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 8px 8px 22px" }}>
          {/* Logo */}
          <a href="#home" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontFamily: "'Geist','Inter',sans-serif", fontWeight: 700, fontSize: 20, letterSpacing: "-.03em", color: "var(--fg)" }}>
              <span style={{ color: "var(--blue)" }}>&lt;/&gt;</span>{" "}
              FELDA<span style={{ color: "var(--purple)" }}>.DEV</span>
            </span>
          </a>

          {/* Desktop nav */}
          <nav style={{ gap: 4, alignItems: "center", padding: 4, borderRadius: 999 }} className="hidden-mobile">
            {navLinks.map(n => {
              const isActive = active === n.href.slice(1);
              return (
                <a key={n.href} href={n.href} className="mono" style={{
                  position: "relative", padding: "8px 16px", borderRadius: 999,
                  fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", textDecoration: "none",
                  color: isActive ? "var(--fg)" : "var(--muted)", transition: "color .2s",
                }}>
                  {isActive && (
                    <Motion.span layoutId="nav-pill" transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      style={{ position: "absolute", inset: 0, borderRadius: 999, background: "linear-gradient(135deg, rgba(157,78,221,.35), rgba(0,212,255,.25))", border: "1px solid var(--border-2)" }} />
                  )}
                  <span style={{ position: "relative" }}>{n.label}</span>
                </a>
              );
            })}
          </nav>

          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <ThemeToggle />
            <button onClick={() => setCvOpen(true)} className="btn-primary hidden-mobile" style={{ padding: "10px 22px", fontSize: 12 }}>
              Resume
            </button>
            <button onClick={() => setOpen(o => !o)} className="show-mobile" style={{ background: "none", border: "none", color: "var(--fg)", cursor: "pointer", padding: 4 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 28 }}>{open ? "close" : "menu"}</span>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="show-mobile" style={{ padding: "8px 22px 20px", display: "flex", flexDirection: "column", gap: 16, borderTop: "1px solid var(--border)" }}>
            {navLinks.map(n => (
              <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="mono"
                style={{ fontSize: 12, letterSpacing: ".12em", textTransform: "uppercase", textDecoration: "none", color: "var(--text-2)" }}>
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
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px", borderBottom: "1px solid var(--border)" }}>
              <span style={{ fontFamily: "'Geist',sans-serif", fontWeight: 700, fontSize: 15, color: "var(--fg)" }}>CV Preview</span>
              <div style={{ display: "flex", gap: 8 }}>
                {[["Open Tab", "/resume.pdf", true, false], ["Download", "/resume.pdf", false, true]].map(([label, href, isNew, isDl]) => (
                  <a key={label} href={href} target={isNew ? "_blank" : undefined} download={isDl || undefined} rel="noreferrer"
                    className="glass mono" style={{ padding: "6px 14px", borderRadius: 8, fontSize: 12, color: "var(--text-2)", textDecoration: "none" }}>
                    {label}
                  </a>
                ))}
                <button onClick={() => setCvOpen(false)} className="glass mono" style={{ padding: "6px 14px", borderRadius: 8, fontSize: 12, color: "var(--text-2)", background: "none", border: "1px solid var(--border)", cursor: "pointer" }}>
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
  const { scrollY } = useScroll();
  const photoY = useTransform(scrollY, [0, 700], [0, 90]);
  const textY = useTransform(scrollY, [0, 700], [0, -40]);
  return (
    <section id="home" style={{ minHeight: "100svh", display: "flex", alignItems: "center", position: "relative", paddingTop: 80, overflow: "hidden" }}>
      <div className="grid-bg" style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />
      <Spotlight fill="var(--purple)" />
      {/* Glow blobs */}
      <div style={{ position: "absolute", top: "-10%", left: "-5%", width: "45vw", height: "45vw", borderRadius: "50%", background: "rgba(157,78,221,.06)", filter: "blur(120px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-10%", right: "-5%", width: "50vw", height: "50vw", borderRadius: "50%", background: "rgba(0,212,255,.05)", filter: "blur(120px)", pointerEvents: "none" }} />

      <div className="container" style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: "clamp(40px,8vw,100px)", flexWrap: "wrap", padding: "60px 24px" }}>
        {/* Text side */}
        <Motion.div variants={heroContainer} initial="hidden" animate="show" style={{ flex: "1 1 340px", display: "flex", flexDirection: "column", gap: 24, y: textY }}>
          {/* Available badge */}
          <Motion.div variants={heroItem} className="glass liquid mono" style={{ alignSelf: "flex-start", display: "flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 999, fontSize: 11, letterSpacing: ".1em", color: "var(--blue)" }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--blue)", animation: "pulse-ring 2s ease-in-out infinite" }} />
            Available for new collaborations
          </Motion.div>

          {/* Headline */}
          <Motion.div variants={heroItem}>
            <p className="mono" style={{ fontSize: 12, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--purple)", marginBottom: 14 }}>
              Data Science & AI
            </p>
            <h1 style={{ fontFamily: "'Geist','Inter',sans-serif", fontWeight: 700, fontSize: "clamp(2.8rem,7vw,5rem)", letterSpacing: "-.04em", lineHeight: 1.05, color: "var(--fg)" }}>
              Turning<br />
              <span className="grad">Data</span> into<br />
              <WordRotate words={["Insight.", "Models.", "Impact.", "Decisions."]} />
            </h1>
          </Motion.div>

          {/* Summary */}
          <Motion.p variants={heroItem} style={{ fontSize: 16, lineHeight: 1.75, color: "var(--text-2)", maxWidth: 480 }}>
            {resume.summary}
          </Motion.p>

          {/* CTA */}
          <Motion.div variants={heroItem} style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 8 }}>
            <Magnetic>
              <a href="#projects" className="btn-primary">
                View My Work
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>arrow_forward</span>
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#contact" className="btn-ghost glass glow">
                Contact Me
              </a>
            </Magnetic>
          </Motion.div>
        </Motion.div>

        {/* Photo side */}
        <Motion.div initial={{ opacity: 0, scale: 0.8, rotate: -6 }} animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 70, damping: 14, delay: 0.3 }}
          style={{ flex: "0 0 auto", display: "flex", justifyContent: "center", y: photoY }}>
          <div style={{ position: "relative", width: "clamp(200px,28vw,320px)", height: "clamp(200px,28vw,320px)" }}>
            <div className="pulse" style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "linear-gradient(135deg,#9D4EDD,#00D4FF)", filter: "blur(32px)", opacity: .45 }} />
            <img src={fotoFelda} alt="Felda Ega Fadhila"
              style={{ position: "relative", zIndex: 1, width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover", objectPosition: "top", border: "2px solid var(--border-2)", boxShadow: "0 0 48px rgba(0,212,255,.2)" }}
              loading="eager"
            />
          </div>
        </Motion.div>
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
            <div key={s.label} style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(16px)", transition: `opacity .5s ${i * .09}s ease, transform .5s ${i * .09}s ease` }}>
            <SpotlightCard color={s.color === "var(--blue)" ? "0,212,255" : "157,78,221"} style={{ borderRadius: 22, padding: "24px 16px", textAlign: "center" }}>
              <p style={{ fontFamily: "'Geist',sans-serif", fontWeight: 700, fontSize: "clamp(1.8rem,4vw,2.5rem)", color: s.color, letterSpacing: "-.03em", lineHeight: 1 }}>
                <NumberTicker value={s.num} suffix={s.suffix} />
              </p>
              <p className="mono" style={{ fontSize: 10, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--muted)", marginTop: 6 }}>{s.label}</p>
            </SpotlightCard>
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
          <span className="section-label" style={{ color: "var(--purple)" }}>// featured work</span>
          <h2 className="section-heading">Featured Projects</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 20 }}>
          {resume.projects.map((p, pi) => {
            const c = p.accent === "blue" ? "var(--blue)" : "var(--purple)";
            return (
              <Tilt key={p.name} style={{ display: "flex" }}
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }}
                transition={{ type: "spring", stiffness: 80, damping: 16, delay: pi * 0.08 }}>
              <SpotlightCard as="article" color={p.accent === "blue" ? "0,212,255" : "157,78,221"} style={{ flex: 1, borderRadius: 26, padding: "28px", display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                  <div style={{ width: 40, height: 40, borderRadius: 14, background: `color-mix(in srgb, ${c} 12%, transparent)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 20, color: c }}>{p.icon}</span>
                  </div>
                  <a href={p.link} target="_blank" rel="noreferrer" style={{ color: "var(--muted)", transition: "color .2s", textDecoration: "none" }}
                    onMouseEnter={e => e.currentTarget.style.color = "var(--fg)"}
                    onMouseLeave={e => e.currentTarget.style.color = "var(--muted)"}>
                    <span className="material-symbols-outlined" style={{ fontSize: 18 }}>open_in_new</span>
                  </a>
                </div>
                <div>
                  <h3 style={{ fontFamily: "'Geist','Inter',sans-serif", fontWeight: 700, fontSize: 17, letterSpacing: "-.02em", color: "var(--fg)", marginBottom: 8 }}>{p.name}</h3>
                  {p.period && (
                    <p className="mono" style={{ fontSize: 11, color: "var(--muted)", marginBottom: 8 }}>{p.period}</p>
                  )}
                  <p style={{ fontSize: 14, lineHeight: 1.7, color: "var(--text-2)" }}>{p.desc}</p>
                  {p.highlights?.length ? (
                    <ul style={{ margin: "12px 0 0", paddingLeft: 18, fontSize: 12, lineHeight: 1.6, color: "var(--text-2)" }}>
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
                        style={{ fontSize: 12, letterSpacing: ".08em", color: "var(--purple)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6 }}>
                        GitHub <span className="material-symbols-outlined" style={{ fontSize: 16 }}>code</span>
                      </a>
                    )}
                  </div>
                </div>
              </SpotlightCard>
              </Tilt>
            );
          })}
        </div>
      </div>
    </FadeSection>
  );
}

/* ── Experience + Stack ── */
function Experience() {
  const timelineRef = useRef(null);
  const { scrollYProgress: tlProgress } = useScroll({ target: timelineRef, offset: ["start 75%", "end 55%"] });
  const tlScale = useSpring(tlProgress, { stiffness: 90, damping: 22 });
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
            <span className="section-label" style={{ color: "var(--blue)" }}>// career path</span>
            <h2 className="section-heading" style={{ marginBottom: 36 }}>Career Journey</h2>
            <div ref={timelineRef} style={{ position: "relative", display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ position: "absolute", left: 19, top: 0, bottom: 0, width: 1, background: "linear-gradient(to bottom, transparent, var(--border-2) 20%, var(--border-2) 80%, transparent)" }} />
              <Motion.div aria-hidden="true" style={{ position: "absolute", left: 18, top: 0, bottom: 0, width: 3, borderRadius: 3, transformOrigin: "top", scaleY: tlScale, background: "linear-gradient(to bottom, var(--purple), var(--blue))", boxShadow: "0 0 12px var(--hover-glow)" }} />
              {timelineItems.map((e, i) => {
                const c = i % 2 === 0 ? "var(--purple)" : "var(--blue)";
                return (
                  <div key={e.role} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                    <div style={{ width: 38, height: 38, borderRadius: "50%", background: "var(--surf)", border: "1px solid var(--border-2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, position: "relative", zIndex: 1, transition: "border-color .3s" }}>
                      <span className="material-symbols-outlined" style={{ fontSize: 16, color: c }}>{e.icon}</span>
                    </div>
                    <SpotlightCard color={i % 2 === 0 ? "157,78,221" : "0,212,255"} style={{ flex: 1, borderRadius: 18, padding: "14px 18px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8, flexWrap: "wrap" }}>
                        <p style={{ fontWeight: 600, fontSize: 14, color: "var(--fg)", letterSpacing: "-.01em" }}>{e.role}</p>
                        <span className="mono" style={{ fontSize: 11, color: c, whiteSpace: "nowrap" }}>{e.period}</span>
                      </div>
                      <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 3 }}>{e.company}</p>
                      {e.highlights?.length ? (
                        <ul style={{ margin: "8px 0 0", paddingLeft: 18, fontSize: 12, lineHeight: 1.6, color: "var(--text-2)" }}>
                          {e.highlights.map(h => (
                            <li key={h}>{h}</li>
                          ))}
                        </ul>
                      ) : null}
                    </SpotlightCard>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Stack */}
          <div>
            <span className="section-label" style={{ color: "var(--purple)" }}>// tools & tech</span>
            <h2 className="section-heading" style={{ marginBottom: 36 }}>Tech Stack</h2>
            <div className="glass" style={{ borderRadius: 26, padding: "28px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, margin: "0 -28px" }}>
                {[resume.skills.slice(0, Math.ceil(resume.skills.length / 2)), resume.skills.slice(Math.ceil(resume.skills.length / 2))].map((row, r) => (
                  <Marquee key={r} reverse={r === 1} duration={28}>
                    {row.map((s, i) => <span key={s} className={`chip ${(i + r) % 2 === 0 ? "chip-blue" : "chip-purple"}`} style={{ fontSize: 13, padding: "6px 14px", whiteSpace: "nowrap" }}>{s}</span>)}
                  </Marquee>
                ))}
              </div>

              <div style={{ margin: "28px 0", borderTop: "1px solid var(--border)" }} />

              <p style={{ fontWeight: 600, fontSize: 14, color: "var(--fg)", marginBottom: 12, letterSpacing: "-.01em" }}>Code Philosophy</p>
              <div className="glass" style={{ borderRadius: 14, padding: "16px 16px 16px 20px", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 3, background: "linear-gradient(to bottom, #9D4EDD, #00D4FF)", borderRadius: "3px 0 0 3px" }} />
                <pre className="mono" style={{ fontSize: 12, lineHeight: 1.8, color: "var(--text-2)", whiteSpace: "pre-wrap" }}>
                  <span style={{ color: "var(--purple)" }}>fn</span>{" "}
                  <span style={{ color: "var(--blue)" }}>build_solution</span>{"() {\n"}
                  {"  data: "}
                  <span style={{ color: "var(--code-str)" }}>"actionable"</span>{",\n"}
                  {"  model: "}
                  <span style={{ color: "var(--code-str)" }}>"interpretable"</span>{",\n"}
                  {"  impact: "}
                  <span style={{ color: "var(--code-str)" }}>"measurable"</span>{"\n}"}
                </pre>
              </div>

              <div style={{ margin: "28px 0", borderTop: "1px solid var(--border)" }} />

              <p style={{ fontWeight: 600, fontSize: 14, color: "var(--fg)", marginBottom: 14, letterSpacing: "-.01em" }}>Certifications</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {resume.certifications.map(c => (
                  <div key={c} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 16, color: "var(--purple)", flexShrink: 0 }}>verified</span>
                    <span style={{ fontSize: 13, color: "var(--text-2)", lineHeight: 1.4 }}>{c}</span>
                  </div>
                ))}
              </div>

              {resume.awards?.length ? (
                <>
                  <div style={{ margin: "28px 0", borderTop: "1px solid var(--border)" }} />
                  <p style={{ fontWeight: 600, fontSize: 14, color: "var(--fg)", marginBottom: 14, letterSpacing: "-.01em" }}>Awards & Scholarships</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {resume.awards.map(a => (
                      <div key={a} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span className="material-symbols-outlined" style={{ fontSize: 16, color: "var(--blue)", flexShrink: 0 }}>workspace_premium</span>
                        <span style={{ fontSize: 13, color: "var(--text-2)", lineHeight: 1.4 }}>{a}</span>
                      </div>
                    ))}
                  </div>
                </>
              ) : null}

              {resume.competitions?.length ? (
                <>
                  <div style={{ margin: "28px 0", borderTop: "1px solid var(--border)" }} />
                  <p style={{ fontWeight: 600, fontSize: 14, color: "var(--fg)", marginBottom: 14, letterSpacing: "-.01em" }}>Competitions</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    {resume.competitions.map(c => (
                      <div key={c.name} className="glass" style={{ borderRadius: 18, padding: "14px 16px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 8, flexWrap: "wrap" }}>
                          <p style={{ fontWeight: 600, fontSize: 13, color: "var(--fg)", letterSpacing: "-.01em" }}>{c.name}</p>
                          <span className="mono" style={{ fontSize: 11, color: "var(--purple)", whiteSpace: "nowrap" }}>{c.period}</span>
                        </div>
                        <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 4 }}>{c.result}</p>
                        {c.highlights?.length ? (
                          <ul style={{ margin: "8px 0 0", paddingLeft: 18, fontSize: 12, lineHeight: 1.6, color: "var(--text-2)" }}>
                            {c.highlights.map(h => (
                              <li key={h}>{h}</li>
                            ))}
                          </ul>
                        ) : null}
                        {c.link ? (
                          <a href={c.link} target="_blank" rel="noreferrer" className="mono"
                            style={{ fontSize: 11, letterSpacing: ".08em", color: "var(--blue)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 4, marginTop: 10 }}>
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
            <span className="section-label" style={{ color: "var(--purple)" }}>// get in touch</span>
            <h2 style={{ fontFamily: "'Geist','Inter',sans-serif", fontWeight: 700, fontSize: "clamp(2rem,5vw,3.5rem)", letterSpacing: "-.04em", lineHeight: 1.1, color: "var(--fg)", marginBottom: 16 }}>
              Let's <span className="grad">Collaborate</span>
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: "var(--text-2)", maxWidth: 440, margin: "0 auto 36px" }}>
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
                <span key={item.text} className="mono" style={{ fontSize: 12, color: "var(--muted)", display: "flex", alignItems: "center", gap: 6 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 15 }}>{item.icon}</span>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                      style={{ color: "var(--muted)", textDecoration: "none" }}
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
    <footer style={{ borderTop: "1px solid var(--border)", padding: "36px 0" }}>
      <div className="container" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 20 }}>
        <div>
          <p style={{ fontFamily: "'Geist',sans-serif", fontWeight: 700, fontSize: 18, letterSpacing: "-.03em", color: "var(--fg)" }}>
            <span style={{ color: "var(--blue)" }}>&lt;/&gt;</span> FELDA<span style={{ color: "var(--purple)" }}>.DEV</span>
          </p>
          <p className="mono" style={{ fontSize: 11, color: "var(--muted)", marginTop: 4 }}>
            © {new Date().getFullYear()} Felda Ega Fadhila — Built with React & Tailwind
          </p>
        </div>
        <div style={{ display: "flex", gap: 24 }}>
          {[
            { label: "GitHub", href: resume.contact.github },
            { label: "LinkedIn", href: resume.contact.linkedin },
            { label: "Email", href: `mailto:${resume.contact.email}` },
          ].map(l => (
            <a key={l.label} href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
              className="mono"
              style={{ fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--muted)", textDecoration: "none", transition: "color .2s, transform .2s", display: "inline-block" }}
              onMouseEnter={e => { e.currentTarget.style.color = "var(--purple)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "var(--muted)"; e.currentTarget.style.transform = "none"; }}>
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
    <MotionConfig reducedMotion="user">
    <div style={{ minHeight: "100svh", background: "var(--bg)", color: "var(--text)", overflowX: "hidden" }}>
      {/* Aurora background — gives the glass something to refract */}
      <div className="aurora" aria-hidden="true">
        <div className="aurora-blob" style={{ top: "-12%", left: "-10%", width: "48vw", height: "48vw", background: "var(--purple)", "--d": "28s" }} />
        <div className="aurora-blob" style={{ top: "30%", right: "-14%", width: "44vw", height: "44vw", background: "var(--blue)", "--d": "34s", animationDelay: "-8s" }} />
        <div className="aurora-blob" style={{ bottom: "-18%", left: "20%", width: "38vw", height: "38vw", background: "var(--blob-3)", "--d": "40s", animationDelay: "-16s" }} />
      </div>

      {/* Liquid-glass refraction filter (used via .liquid on Chromium) */}
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <filter id="liquid-glass" x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.008 0.012" numOctaves="2" seed="7" result="noise" />
          <feGaussianBlur in="noise" stdDeviation="2" result="soft" />
          <feDisplacementMap in="SourceGraphic" in2="soft" scale="38" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>
      <div style={{ position: "relative", zIndex: 1 }}>
        <ScrollProgress />
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
    </MotionConfig>
  );
}
