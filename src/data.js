export const resume = {
  name: "Felda Ega Fadhila",
  title: "Data & AI Enthusiast",
  role: "Data Analyst · ML Engineer · ITS Informatics",
  summary:
    "Mahasiswa Teknik Informatika semester 6 di ITS Surabaya dengan fokus pada Data Science dan AI. Passionate dalam membangun solusi cerdas — dari analitik data hingga model machine learning production-ready.",
  contact: {
    email: "feldaega17@email.com",
    phone: "+62 822-3541-9215",
    location: "Surabaya, Indonesia",
    linkedin: "https://linkedin.com/in/feldaega",
    github: "https://github.com/feldaega17",
  },
  skills: ["Python", "ReactJS", "NestJS", "Tableau", "C++", "Git", "TensorFlow", "SQL"],
  experience: [
    { role: "Vice Head — Organization Development Division", company: "GenBI Komisariat ITS", period: "Sept 2025 – Now", icon: "star" },
    { role: "Manager, Seminar Subdivision", company: "Schematics ITS 2025", period: "Jan – Dec 2025", icon: "workspace_premium" },
    { role: "Internal Affairs Intern", company: "HMTC ITS", period: "Oct – Nov 2024", icon: "groups" },
    { role: "Staff, BST Division", company: "Schematics ITS 2024", period: "Mar – Dec 2024", icon: "groups" },
  ],
  education: { school: "Institut Teknologi Sepuluh Nopember", degree: "S1 Teknik Informatika", period: "2023 – Sekarang" },
  certifications: [
    "Microsoft Certified: Azure AI Engineer Associate",
    "Google IT Support Professional Certificate",
    "Meta Front-End Developer Certificate",
    "Risk Management Level 1 Certification",
  ],
  projects: [
    {
      name: "Task Manager Application",
      desc: "Full-stack app dengan NestJS + TypeORM backend dan React frontend. Auth, kategorisasi task, dan sistem reminder terintegrasi.",
      link: "https://fp-frontend-two.vercel.app/",
      tags: ["NestJS", "React", "SQLite"],
      icon: "terminal",
      accent: "blue",
    },
    {
      name: "Chest X-Ray AI Classifier",
      desc: "Deep learning classifier untuk X-ray dada: Atelectasis, Effusion, Infiltration. Deployed live di Hugging Face Spaces.",
      link: "https://huggingface.co/spaces/feldaega17/xray-classifier-space",
      tags: ["TensorFlow", "Python", "HuggingFace"],
      icon: "psychology",
      accent: "purple",
    },
    {
      name: "Credit Card Fraud Detection",
      desc: "Web app real-time deteksi fraud dengan multiple ML models dan ensemble prediction. Dioptimalkan untuk latensi rendah.",
      link: "https://fraud.up.railway.app/model.html",
      tags: ["Scikit-learn", "Python", "Railway"],
      icon: "security",
      accent: "blue",
    },
    {
      name: "Festival Nyepi — 3D Virtual Museum",
      desc: "Open-world virtual museum 3D warisan budaya Indonesia. Ogoh-ogoh, candi, atmosfer malam Nyepi dengan fireflies & gamelan Bali.",
      link: "https://festival-nyepi.pages.dev",
      tags: ["WebGL", "Three.js", "Computer Graphics"],
      icon: "view_in_ar",
      accent: "purple",
    },
  ],
};

export const stats = [
  { value: "4+", label: "Proyek Live", color: "#00D4FF" },
  { value: "3", label: "Sertifikasi", color: "#9D4EDD" },
  { value: "4", label: "Org. Roles", color: "#00D4FF" },
  { value: "6th", label: "Semester ITS", color: "#9D4EDD" },
];

export const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];
