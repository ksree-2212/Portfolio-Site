export const profile = {
  name: "Sreeshanth Konda",
  title: "AI & Computer Vision Engineer",
  heroTitle: "AI & Data Science Undergraduate",
  location: "Hyderabad, India",
  email: "sreeshanthkonda2212@gmail.com",
  phone: "+91 9949282702",
  linkedin: "https://linkedin.com/in/sreeshanth-konda",
  github: "https://github.com/ksree-2212",
  tagline:
    "Engineering student building real-time computer vision and deep learning systems — with a growing focus on AI governance and secure, responsible AI.",
  bio:
    "I'm an AI & Data Science undergraduate at CBIT, Hyderabad, with hands-on experience building deep learning pipelines and full-stack applications that solve real problems — from real-time emotion recognition to crop identification for farmers. I recently interned in AI governance and data privacy, which shapes how I think about building systems that are not just accurate, but trustworthy.",
};

// Technology cards shown beside the hero code editor.
export const heroStack = [
  { name: "Python", icon: "python" },
  { name: "TensorFlow", icon: "tensorflow" },
  { name: "OpenCV", icon: "opencv" },
  { name: "Pandas", icon: "pandas" },
];

// Illustrative only — not a live training run.
export const modelTraining = {
  label: "Model Training",
  percent: 87,
};

// Interactive rows in the About panel.
export const interests = [
  "Computer Vision",
  "Deep Learning (CNN)",
  "TensorFlow / Keras",
  "OpenCV",
  "NumPy / Pandas",
];

export const education = [
  {
    degree: "B.E., AI & Data Science",
    institute: "Chaitanya Bharathi Institute of Technology (CBIT), Hyderabad",
    year: "2024 – 2028",
    score: "9.10 CGPA",
  },
  {
    degree: "Intermediate (MPC)",
    institute: "FIITJEE Junior College",
    year: "2024",
    score: "95.3%",
  },
  {
    degree: "SSC",
    institute: "FIITJEE School",
    year: "2022",
    score: "9.5 CGPA",
  },
];

export const experience = [
  {
    role: "AI, Cybersecurity & Data Privacy Intern",
    org: "E Com Security Solutions",
    period: "June 2026 – August 2026",
    points: [
      "Researched and evaluated AI platforms with a focus on AI governance, data privacy, and regulatory compliance frameworks.",
      "Built technical documentation and structured knowledge bases covering emerging AI and cybersecurity trends.",
      "Analyzed security methodologies and delivered findings on risk mitigation and data protection practices.",
    ],
  },
];

// Ordered to match the tabbed skills panel (Languages first, Core Domains last).
export const skills = {
  Languages: ["Python", "C++", "C", "Java", "JavaScript"],
  "Web & Tools": ["React.js", "Flask", "MySQL", "Git", "GitHub", "VS Code"],
  "AI & Data Science": [
    "TensorFlow",
    "Keras",
    "OpenCV",
    "NumPy",
    "Pandas",
    "Scikit-learn",
  ],
  "Core Domains": [
    "Computer Vision",
    "Deep Learning",
    "Data Analytics",
    "AI Governance",
    "Data Privacy",
  ],
};

export const certifications = [
  "NPTEL Certification — Programming, Data Structures and Algorithms using Python",
  "Data Analytics and Visualization using Microsoft Power BI",
  "Hacktoberfest — organized by COSC Club, CBIT",
];

// Default/fallback projects, shown if the backend API is unreachable or empty.
// Once the admin backend is connected, these are replaced by live data from MongoDB.
export const fallbackProjects = [
  {
    id: "face-emotion",
    name: "Real-Time Face & Emotion Detection System",
    tag: "Computer Vision",
    category: "Computer Vision",
    confidence: 0.97,
    description:
      "A real-time computer vision pipeline that localizes faces from webcam feeds and classifies 7 emotional states using a CNN trained on 35,000+ images from FER-2013.",
    stack: ["Python", "OpenCV", "TensorFlow/Keras", "CNN"],
    highlights: [
      "Trained and optimized a compact CNN on 48×48 grayscale inputs for low latency.",
      "Integrated Haar Cascade and DNN face detectors with confidence thresholding for reliable real-time inference.",
    ],
    link: "",
  },
  {
    id: "crop-recognition",
    name: "Crop Recognition System",
    tag: "Deep Learning",
    category: "Deep Learning",
    confidence: 0.94,
    description:
      "A machine learning web app that lets farmers identify crops through image recognition, pairing a responsive React UI with an image-processing backend.",
    stack: ["React.js", "Flask", "OpenCV", "NumPy", "Pandas"],
    highlights: [
      "Built the responsive front-end UI and the backend data pipelines.",
      "Used OpenCV and Pandas to process and match crop images against known properties.",
    ],
    link: "",
  },
  {
    id: "data-analytics",
    name: "Data Analytics & Visualization",
    tag: "Data Science",
    category: "Data Science",
    confidence: 0.91,
    description:
      "Exploratory data analysis and interactive dashboards built to surface trends and outliers from real-world datasets.",
    stack: ["Power BI", "Excel", "Pandas"],
    highlights: [
      "Modeled and cleaned raw datasets before building interactive Power BI dashboards.",
      "Used DAX measures and visual drill-downs to make findings easy to explore.",
    ],
    link: "",
  },
];
