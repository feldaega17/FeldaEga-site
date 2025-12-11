import React, { useState } from "react";
import fotoFelda from "./assets/felda.png";

// Resume data populated with Felda's info (from earlier)
const resume = {
  name: "Felda Ega Fadhila",
  title: "Data and AI Enthusiast | Data Analyst",
  summary:
    "I’m a third-year Informatics Engineering student at Sepuluh Nopember Institute of Technology (ITS) with a strong focus on Data Science and Artificial Intelligence. I’m passionate about turning data into actionable insights by applying machine learning, data analytics, and problem-solving to real-world challenges. I enjoy collaborating in teams, taking ownership of projects, and continuously improving through hands-on experience in technology communities and organizational roles.",
  contact: {
    email: "feldaega17@email.com",
    phone: "+62 812-3456-7890",
    location: "Surabaya, Indonesia",
    linkedin: "https://linkedin.com/in/feldaega",
    github: "https://github.com/feldaega17",
  },
  skills: ["React", "JavaScript", "Tailwind CSS", "Node.js", "Python", "C++", "Git"],
  experience: [
    {
      role: "Frontend Intern",
      company: "Perusahaan A",
      period: "Jun 2024 - Sep 2024",
      details: "Membangun komponen UI, mengintegrasikan API, meningkatkan performa bundle.",
    },
  ],
  education: [
    { school: "ITS - Teknik Informatika", period: "2023 - sekarang", details: "IPK: <3.5 (update sendiri)" },
  ],
  certifications: ["Google IT Support Professional Certificate", "Meta Front-End Developer Certificate", "AWS Cloud Practitioner"],
  languages: ["Indonesia (Native)", "English (Intermediate)"],
  projects: [
    { name: "Data Mining Project", desc: "Analisis dataset credit card fraud detection menggunakan machine learning.", link: "#" },
    { name: "Portfolio Website", desc: "Personal website dengan React dan Tailwind CSS.", link: "#" },
    { name: "Operations Research", desc: "Implementasi algoritma optimasi RBSM dalam C++.", link: "#" },
  ],
};

// JSON-LD for resume (improves search engine understanding)
const jsonLd = {
  "@context": "http://schema.org",
  "@type": "Person",
  name: resume.name,
  jobTitle: resume.title,
  email: resume.contact.email,
  telephone: resume.contact.phone,
  url: resume.contact.linkedin,
  address: { "@type": "PostalAddress", addressLocality: resume.contact.location },
};


export default function App() {
  const [openCv, setOpenCv] = useState(false);
  const pdfUrl = "/resume.pdf";

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>

      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <a href="#home" className="font-semibold text-xl">{resume.name}</a>
          <nav className="hidden md:flex gap-6 text-sm">
            <a href="#projects" className="hover:underline">Projects</a>
            <a href="#resume" className="hover:underline">Resume</a>
            <a href="#about" className="hover:underline">About</a>
            <a href="#contact" className="hover:underline">Contact</a>
            <a href="/resume.pdf" className="px-3 py-1 border rounded">Download CV</a>
          </nav>
          <button className="md:hidden p-2 rounded-md border">Menu</button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Hero */}
        <section id="home" className="grid md:grid-cols-2 gap-8 items-center py-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-2">Hai, saya <span className="text-indigo-600">{resume.name}</span></h1>
            <p className="text-lg text-gray-700 mb-4">{resume.title}</p>
            <p className="text-gray-700 mb-6">{resume.summary}</p>
            <div className="flex gap-4">
              <button
                onClick={() => setOpenCv(true)}
                className="inline-block px-5 py-3 bg-indigo-600 text-white rounded-lg"
              >
                Lihat CV
              </button>
              <a href={resume.contact.github} target="_blank" rel="noreferrer" className="inline-block px-5 py-3 border rounded-lg">GitHub</a>
            </div>
          </div>

          <div className="flex md:justify-end">
            <img
              src={fotoFelda}
              alt="Foto Felda Ega Fadhila"
              className="w-80 h-64 rounded-xl object-cover object-top shadow-lg print:hidden"
              loading="lazy"
            />
          </div>
        </section>

        {/* Resume / CV */}
        <section id="resume" className="mt-8 bg-white rounded-xl shadow p-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold">Resume</h2>
              <p className="text-sm text-gray-600">Ringkasan pengalaman, skill, dan kontak untuk keperluan kerja atau magang.</p>
            </div>
            <div className="flex gap-2">
              <a href="/resume.pdf" className="px-3 py-2 border rounded">Download PDF</a>
              <button onClick={() => window.print()} className="px-3 py-2 bg-indigo-600 text-white rounded">Cetak</button>
            </div>
          </div>

          <div className="mt-6 grid md:grid-cols-3 gap-6">
            {/* Left column: contact, skills */}
            <aside className="space-y-4 md:col-span-1">
              <div>
                <h3 className="font-semibold">Kontak</h3>
                <ul className="text-sm text-gray-700 mt-2 space-y-1">
                  <li>Email: <a href={`mailto:${resume.contact.email}`} className="text-indigo-600">{resume.contact.email}</a></li>
                  <li>Phone: {resume.contact.phone}</li>
                  <li>Lokasi: {resume.contact.location}</li>
                  <li>LinkedIn: <a href={resume.contact.linkedin} className="text-indigo-600">LinkedIn</a></li>
                  <li>GitHub: <a href={resume.contact.github} className="text-indigo-600">GitHub</a></li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold">Skills</h3>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {resume.skills.map((s) => (
                    <li key={s} className="text-xs border px-2 py-1 rounded">{s}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mt-2">Bahasa</h3>
                <ul className="text-sm text-gray-700 mt-2">
                  {resume.languages.map((l) => (
                    <li key={l}>{l}</li>
                  ))}
                </ul>
              </div>
            </aside>

            {/* Main column: experience, education */}
            <div className="md:col-span-2 space-y-6">
              <div>
                <h3 className="font-semibold">Pengalaman Kerja</h3>
                <div className="mt-3 space-y-4">
                  {resume.experience.map((e) => (
                    <div key={e.role} className="">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{e.role} — {e.company}</h4>
                        <span className="text-sm text-gray-500">{e.period}</span>
                      </div>
                      <p className="text-sm text-gray-700 mt-1">{e.details}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold">Pendidikan</h3>
                <div className="mt-3 space-y-3">
                  {resume.education.map((ed) => (
                    <div key={ed.school}>
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{ed.school}</h4>
                        <span className="text-sm text-gray-500">{ed.period}</span>
                      </div>
                      <p className="text-sm text-gray-700 mt-1">{ed.details}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold">Sertifikasi & Projek</h3>
                <div className="mt-3 text-sm text-gray-700 space-y-2">
                  <div>
                    <strong>Sertifikasi:</strong>
                    <ul className="list-disc list-inside">
                      {resume.certifications.map((c) => (
                        <li key={c}>{c}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-2">
                    <strong>Project:</strong>
                    <ul className="list-disc list-inside">
                      {resume.projects.map((p) => (
                        <li key={p.name}><a href={p.link} className="text-indigo-600">{p.name}</a> — {p.desc}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects & About (kept minimal) */}
        <section id="projects" className="mt-8">
          <h2 className="text-2xl font-bold mb-3">Projects</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {resume.projects.map((p) => (
              <article key={p.name} className="bg-white rounded-xl shadow p-4 hover:shadow-lg transition">
                <h3 className="font-semibold text-lg">{p.name}</h3>
                <p className="text-sm text-gray-600 mt-2">{p.desc}</p>
                <div className="mt-4 flex items-center justify-between">
                  <a href={p.link} className="text-indigo-600 text-sm">Lihat</a>
                  <span className="text-xs text-gray-400">React • Tailwind</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="mt-8">
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Hubungi</h3>
            <p className="text-sm text-gray-600">Tertarik bekerja sama? Kirim email atau hubungi nomor yang tersedia.</p>
            <ul className="mt-3 text-sm">
              <li>Email: <a href={`mailto:${resume.contact.email}`} className="text-indigo-600">{resume.contact.email}</a></li>
              <li>LinkedIn: <a href={resume.contact.linkedin} className="text-indigo-600">{resume.contact.linkedin}</a></li>
            </ul>
          </div>
        </section>

        <footer className="mt-12 py-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} {resume.name} — Built with React + Tailwind
        </footer>
      </main>

{/* Modal CV Preview */}
{openCv && (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center p-4"
    role="dialog"
    aria-modal="true"
  >
    {/* Background */}
    <div
      className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      onClick={() => setOpenCv(false)}
    />

    {/* Modal Box */}
    <div className="relative z-10 w-full max-w-5xl h-[80vh] bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b bg-gray-50">
        <h3 className="text-lg font-semibold">Preview CV</h3>

        <div className="flex gap-2">
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1 border rounded hover:bg-gray-100 text-sm"
          >
            Buka di Tab Baru
          </a>

          <a
            href={pdfUrl}
            download
            className="px-3 py-1 border rounded hover:bg-gray-100 text-sm"
          >
            Download
          </a>

          <button
            onClick={() => setOpenCv(false)}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm"
          >
            Tutup
          </button>
        </div>
      </div>

      {/* Isi PDF */}
      <iframe
        src={pdfUrl}
        className="w-full h-full"
        frameBorder="0"
        title="CV Preview"
      />
    </div>
  </div>
)}


      {/* Print styles (simple) */}
      <style>{`@media print { body { -webkit-print-color-adjust: exact; } .print\:hidden { display: none !important; } }`}</style>
    </div>
  );
}
