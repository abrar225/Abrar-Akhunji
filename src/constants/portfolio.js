import { 
  Cpu, 
  Code2, 
  Layers, 
  Terminal, 
  Database, 
  Monitor, 
  ShieldCheck, 
  Trophy, 
  Award,
  GraduationCap,
  School
} from 'lucide-react';

export const PROJECTS = [
  { 
    title: "Library Management System", 
    category: "FULL STACK", 
    year: "2025", 
    description: "A high-performance ecosystem designed to bridge the gap between physical pages and digital convenience. Manage inventory, process secure payments, and build a community of readers.", 
    features: ["Inventory management system", "Secure payment processing", "Reader community platform", "Digital catalog integration"], 
    tech: ["Python", "Django", "MySQL", "HTML", "CSS", "JavaScript"], 
    image: "images/library_management.png", 
    github: "https://github.com/abrar225/Library-Management-System", 
    demo: null 
  },
  { 
    title: "Real vs AI Image Detector", 
    category: "COMPUTER VISION", 
    year: "2025", 
    description: "A deep-learning powered system that identifies whether an image is AI-generated or real using advanced image forensics and transformer-based feature extraction.", 
    features: ["AI-vs-Real image classification", "Vision Transformer–based feature embedding", "Noise & artifact pattern detection"], 
    tech: ["Python", "OpenCV", "NumPy", "Pandas", "TensorFlow/PyTorch"], 
    image: "images/Real vs AI.png", 
    github: null, 
    demo: null 
  },
  { 
    title: "Cattle Breed Identification System", 
    category: "AI/ML", 
    year: "2025", 
    description: "An ensemble-based AI tool capable of classifying 41 Indian cattle breeds using Vision Transformers and image preprocessing techniques.", 
    features: ["Recognition of 41 unique cattle breeds", "Vision Transformer (ViT) embeddings", "Clean dataset preprocessing pipeline"], 
    tech: ["Python", "OpenCV", "Vision Transformer"], 
    image: "images/Cattel Breed.png", 
    github: "https://github.com/abrar225/AI_cattle_vison", 
    demo: "https://huggingface.co/spaces/abrar225/BreedAI" 
  },
  { 
    title: "Brain Tumor Detection (MRI)", 
    category: "HEALTHCARE AI", 
    year: "2024", 
    description: "A Computer Vision model trained on MRI scan data to detect tumor presence with high accuracy using classical image processing and ML techniques.", 
    features: ["Automated MRI-based tumor detection", "Binary classification (tumor / no tumor)", "Mask processing + thresholding + contour analysis"], 
    tech: ["Python", "OpenCV", "NumPy", "Pandas"], 
    image: "images/Brain Tumor Detection.png", 
    github: "https://github.com/abrar225/Brain-Tumer-Detection-System", 
    demo: null 
  },
  { 
    title: "Kid's Space (Android App)", 
    category: "ANDROID", 
    year: "2023", 
    description: "An interactive educational Android app designed for kids, focused on simple UI/UX and modular Java development.", 
    features: ["Clean, kid-friendly UI", "Built using XML layouts", "Focused on kid's study"], 
    tech: ["Android Studio", "XML", "Java"], 
    image: "images/Kid’s Space.png", 
    github: null, 
    demo: null 
  }
];

export const EXPERIENCE = [
  { role: "Full-Stack Python Intern", date: "JAN 2026 — MAR 2026", desc: "Completed 3-month intensive Full-Stack development program at BrainyBeam focusing on Advanced Django & Python ecosystem." },
  { role: "Python Django Intern", date: "JULY 2025", desc: "Focusing on backend architecture & REST APIs." },
  { role: "Web Developer & Designer Intern", date: "JUN 2024 — AUG 2024", desc: "Designed responsive interfaces & frontend logic." }
];

export const EDUCATION = [
  { 
    degree: "Bachelor of Engineering (IT)", 
    school: "Kalol Institute of Technology & Research Center", 
    date: "AUG 2023 — PRESENT",
    icon: GraduationCap,
    color: "bg-blue-500"
  },
  { 
    degree: "Diploma in Information Technology", 
    school: "Government Polytechnic, Himmatnagar", 
    date: "2020 — 2023",
    icon: School,
    color: "bg-blue-400"
  }
];

export const SKILLS = [
  { t: "AI & Data Science", d: "Numpy, Pandas, OpenCV, Models", icon: Cpu },
  { t: "Languages", d: "Python, Java, PHP, JS", icon: Code2 },
  { t: "Web Frameworks", d: "Django, Flask, React", icon: Layers },
  { t: "Tools", d: "Git, GitHub, Linux", icon: Terminal },
  { t: "Databases", d: "MySQL, SQLite", icon: Database },
  { t: "Others", d: "VSCode, Android Studio", icon: Monitor }
];

export const CERTIFICATIONS = [
  { 
    title: "GUNIpreneur Bootcamp", 
    desc: "2nd Runner-up: Most Innovative Idea • Ganpat University SSIP", 
    icon: Award,
    color: "text-orange-500",
    file: "certificates/Ganpat University certificate SSIP/ Ganpat University SSIP.png"
  },
  { 
    title: "Full-Stack Python Internship", 
    desc: "Completion Certificate • BrainyBeam IT Solutions", 
    icon: ShieldCheck,
    color: "text-green-500",
    file: "certificates/Python full stack certificate/Completion Certificate BRNB-25-9004 Abrar Saeed Ahmad Akhunji .pdf"
  },
  { 
    title: "Web Developer & Designer Intern", 
    desc: "3-Month Internship Completion • Oct-Dec 2024", 
    icon: Code2,
    color: "text-cyan-500",
    file: "certificates/Web Developer & Designer Intern Abrar Akhunji.pdf"
  },
  { 
    title: "Google Cybersecurity", 
    desc: "Google / Coursera • Sep 2025", 
    icon: ShieldCheck,
    color: "text-yellow-500",
    file: "certificates/Certificate cyber security/Certificate of Coursera Cource 1.pdf"
  },
  { 
    title: "Smart India Hackathon", 
    desc: "Participation", 
    icon: Trophy,
    color: "text-purple-500"
  },
  { 
    title: "Python Django Certificate", 
    desc: "15 Days Intensive Internship • BrainyBeam", 
    icon: Layers,
    color: "text-blue-500"
  }
];
