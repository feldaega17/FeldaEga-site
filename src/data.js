export const resume = {
  name: "Felda Ega Fadhila",
  title: "Data & AI Enthusiast",
  role: "Data Scientist · ML Engineer · ITS Computer Science",
  summary:
    "Sixth-semester Informatics Engineering student at ITS Surabaya focused on Data Science and AI. I turn data into insights through machine learning and advanced analytics for measurable results.",
  contact: {
    email: "feldaega17@gmail.com",
    phone: "+62 822-3541-9215",
    location: "Surabaya, Indonesia",
    linkedin: "https://linkedin.com/in/feldaega",
    github: "https://github.com/feldaega17",
    website: "https://felda-ega-site.vercel.app",
  },
  skills: [
    "Python",
    "SQL",
    "Pandas",
    "NumPy",
    "scikit-learn",
    "TensorFlow",
    "Tableau",
    "Jupyter",
    "ReactJS",
    "NestJS",
    "C++",
    "Git",
    "ML Modeling",
  ],
  experience: [
    {
      role: "Vice Head — Organization Development Division",
      company: "GenBI Komisariat ITS",
      period: "Sep 2025 - Present",
      icon: "star",
      highlights: [
        "Delivered 2 strategic company visits (OJK East Java, IDX East Java) with ~100 participants total.",
        "Led HR and Regeneration sub-divisions with capacity-building and leadership exposure programs.",
        "Designed NextGen Empowerment for structured regeneration and leadership readiness.",
      ],
    },
    {
      role: "Manager, Seminar Subdivision",
      company: "Schematics ITS 2025",
      period: "Jan - Dec 2025",
      icon: "workspace_premium",
      highlights: [
        "Built data-informed topic and speaker strategy for Gen Z audiences (150+ attendees).",
        "Managed a cross-functional team of 9 across speakers, concept, and participant experience.",
      ],
    },
    { role: "Internal Affairs Intern", company: "HMTC ITS", period: "Oct - Nov 2024", icon: "groups" },
    { role: "Staff, BST Division", company: "Schematics ITS 2024", period: "Mar - Dec 2024", icon: "groups" },
  ],
  education: {
    school: "Institut Teknologi Sepuluh Nopember",
    degree: "B.Sc. Computer Science",
    period: "2023 - Present",
    gpa: "3.56/4.00",
    coursework: [
      "Database Management Systems",
      "Machine Learning",
      "Multivariate Data Analysis",
      "Data Mining",
    ],
  },
  certifications: [
    "Microsoft Certified: Azure AI Engineer Associate",
    "Google IT Support Professional Certificate",
    "Meta Front-End Developer Certificate",
    "Risk Management Level 1 Certification",
  ],
  awards: ["Awardee Bank Indonesia Scholarship 2025/2026"],
  competitions: [
    {
      name: "Data Analytics Dash Competition - COMPFEST 17",
      period: "Sep 2025",
      result: "7th Place (1,000+ participants)",
      highlights: [
        "Analyzed HDI-related data (education, health, income, inequality) for development gaps.",
        "Applied correlation, multivariate regression, and clustering for pattern discovery.",
        "Delivered insights with a Tableau dashboard and policy-oriented recommendations.",
      ],
      link: "https://public.tableau.com/app/profile/dio.sacha/viz/compfest_17583069644410/EGONOMISDASHBOARD",
    },
  ],
  projects: [
    {
      name: "Task Manager Application",
      desc: "Full-stack app with NestJS + TypeORM backend and React frontend. Auth, task categorization, and integrated reminders.",
      link: "https://fp-frontend-two.vercel.app/",
      repo: "https://github.com/feldaega17/task-manager-app",
      period: "Nov 2025 - Dec 2025",
      highlights: [
        "Built a full-stack app with auth, task categories, and reminders.",
        "Designed a modular backend with NestJS + TypeORM for clean, scalable data handling.",
      ],
      tags: ["NestJS", "React", "SQLite"],
      icon: "terminal",
      accent: "blue",
    },
    {
      name: "Chest X-Ray AI Classifier",
      desc: "Deep learning classifier for chest X-rays: Atelectasis, Effusion, Infiltration. Deployed on Hugging Face Spaces.",
      link: "https://huggingface.co/spaces/feldaega17/xray-classifier-space",
      period: "Mar 2025 - Apr 2025",
      highlights: [
        "Built a deep learning web app to classify chest X-rays.",
        "Trained CNN models with TensorFlow for automated inference.",
        "Deployed on Hugging Face Spaces for real-time demos.",
      ],
      tags: ["TensorFlow", "Python", "HuggingFace"],
      icon: "psychology",
      accent: "purple",
    },
    {
      name: "Credit Card Fraud Detection",
      desc: "Real-time fraud detection web app with multiple ML models and ensemble prediction, optimized for low latency.",
      link: "https://fraud.up.railway.app/model.html",
      repo: "https://github.com/AbimanyuDA/RSBP-C",
      period: "Nov 2025 - Dec 2025",
      highlights: [
        "Analyzed 29 transaction features with correlation and feature importance.",
        "Evaluated models with precision, recall, F1-score, and ROC-AUC for imbalanced data.",
        "Achieved >99.8% accuracy (Random Forest, Gradient Boosting) for real-time risk assessment.",
      ],
      tags: ["Scikit-learn", "Python", "Railway"],
      icon: "security",
      accent: "blue",
    },
    {
      name: "Festival Nyepi - 3D Virtual Museum",
      desc: "Open-world 3D virtual museum of Indonesian cultural heritage. Ogoh-ogoh, temples, Nyepi night atmosphere with fireflies and Balinese gamelan.",
      link: "https://festival-nyepi.pages.dev",
      tags: ["WebGL", "Three.js", "Computer Graphics"],
      icon: "view_in_ar",
      accent: "purple",
    },
  ],
};

export const stats = [
  { value: "4+", label: "Live Projects", color: "#00D4FF" },
  { value: "4", label: "Certifications", color: "#9D4EDD" },
  { value: "4", label: "Org Roles", color: "#00D4FF" },
  { value: "5th", label: "ITS Semester", color: "#9D4EDD" },
];

export const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];
