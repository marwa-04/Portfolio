// Source-of-truth profile data — content provided by Marwa.
// LinkedIn data was not directly fetched (auth-walled); the credentials section
// links straight to LinkedIn instead of listing certifications inline.

export const profile = {
  name: "Marwa El-Azzazi",
  shortName: "Marwa",
  initials: "ME",
  role: "Software Engineer",
  tagline: "Crafting interactive experiences at the intersection of code, design and curiosity.",
  longTagline:
    "Software engineering student building expressive web interfaces, a story-driven RPG and my first iOS app in React Native. Curious about quantum computing, physics and the math under every interface.",
  location: "Egypt",
  email: "marwa.elazzazi@gmail.com",
  github: "https://github.com/marwa-04",
  githubUser: "marwa-04",
  linkedin: "https://www.linkedin.com/in/marwa-el-azzazi-74971b272/",
  avatar: "https://avatars.githubusercontent.com/u/180040313?v=4",
  resume: "/resume.pdf",

  highlights: [
    "ITI Software Trainee",
    "iOS · React Native",
    "Game Dev · Godot & Unity",
    "Frontend Engineer",
  ],

  about: {
    headline: "I turn ideas into glossy, interactive software.",
    paragraphs: [
      "I'm a software engineering student who loves the seam between design and engineering — the moment a static interface starts to feel alive, the second a player picks the option that changes the story.",
      "Through ITI training I've shipped full-stack web work; through a game-dev student activity I've prototyped in Unity; with my team at Sifr Studios I co-built Astracipher, a 2D story-driven RPG in Godot. Right now I'm building my first iOS app in React Native.",
      "I'm endlessly curious about things outside the syllabus — quantum computing, physics, hardware and the kind of math that quietly powers every shader, simulation and beautiful UI animation. I don't see myself locked into a single track; I'm wide-open to learning whatever the next interesting problem asks of me.",
    ],
    facts: [
      { label: "Based in", value: "Egypt" },
      { label: "Focus", value: "Frontend · Mobile · Games" },
      { label: "Currently", value: "iOS · React Native" },
      { label: "Curious about", value: "Quantum · Hardware · Math" },
    ],
  },

  experience: [
    {
      title: "iOS App · React Native",
      org: "Personal Project",
      period: "2026 — Present",
      summary:
        "Building my first iOS mobile app in React Native — designing the UI, the navigation system, and a smooth motion language end-to-end.",
      tags: ["React Native", "iOS", "Mobile UI"],
    },
    {
      title: "Game Developer · Astracipher",
      org: "Sifr Studios",
      period: "2025",
      summary:
        "Co-developed Astracipher, a 2D story-driven RPG made in Godot as part of a dark-web awareness campaign — story branching, scenes and UI flow.",
      tags: ["Godot", "GDScript", "Storytelling", "Teamwork"],
    },
    {
      title: "Software Trainee",
      org: "Information Technology Institute (ITI)",
      period: "2025",
      summary:
        "Hands-on training across full-stack web, .NET, databases and clean OOP design. Shipped HospitalCare as a team capstone project.",
      tags: [".NET", "SQL", "Web", "Teamwork"],
    },
    {
      title: "Game Dev Student Activity · Unity",
      org: "University Student Activity",
      period: "2024 — 2025",
      summary:
        "Joined a student game-development circle focused on Unity — sketched mechanics, learned scene composition and shipped tiny prototypes with the team.",
      tags: ["Unity", "C#", "Prototyping"],
    },
    {
      title: "IEEE Web Track Assignments",
      org: "IEEE Student Branch",
      period: "2024 — 2025",
      summary:
        "Completed multi-stage web development assignments and peer-reviewed components while learning responsive design from scratch.",
      tags: ["HTML", "CSS", "JS", "Responsive"],
    },
    {
      title: "Software Engineering Student",
      org: "University · CS / Engineering",
      period: "2023 — Present",
      summary:
        "Coursework in OOP, data structures, databases and software design. Active in coding communities and student initiatives.",
      tags: ["C#", "OOP", "Algorithms", "Databases"],
    },
  ],

  education: [
    {
      school: "Information Technology Institute (ITI)",
      degree: "Software Development Track",
      period: "2025",
    },
    {
      school: "Faculty of Engineering / CS",
      degree: "B.Sc. Software Engineering",
      period: "2023 — 2027",
    },
  ],

  // Mirrored from LinkedIn. Each card links to its credential page (or to the
  // LinkedIn certifications tab as a fallback when `url` is omitted).
  certificationsNote:
    "Mirrored from my LinkedIn profile — tap any badge to open the original credential.",
  certifications: [
    {
      title: "IEEE Victoris 4.0",
      issuer: "IEEE Mansoura Student Branch",
      date: "Nov 2025",
      credentialId: "4U2VSD",
      url: "https://mansoura.ieee.org/credential/4U2VSD",
    },
    {
      title: "IEEE Camp 5.0",
      issuer: "IEEE Mansoura Student Branch",
      date: "Oct 2025",
      credentialId: "PKCX8X",
      url: "https://mansoura.ieee.org/credential/PKCX8X",
    },
    {
      title: "Web Development Using React JS",
      issuer: "Information Technology Institute (ITI)",
      date: "Sep 2025",
      description:
        "150-hour intensive program covering Client-Side Technologies, ES.Next, HTML5, Bootstrap and ReactJS. Completed a graduation project.",
      // TODO: paste the "Show credential" URL from LinkedIn here.
      url: "",
    },
    {
      title: "Career Insider 7.0",
      issuer: "IEEE Mansoura Student Branch",
      date: "Aug 2025",
      credentialId: "K62BRL",
      url: "https://mansoura.ieee.org/credential/K62BRL",
    },
    {
      title: "Python & C Programming Track",
      issuer: "Connectors Team MU",
      date: "Dec 2023",
      description:
        "Comprehensive Python/C track covering compilers, data types, conditional statements, loops and functions.",
      url: "",
    },
  ] as Array<{
    title: string;
    issuer: string;
    date?: string;
    description?: string;
    credentialId?: string;
    url?: string;
  }>,

  skills: {
    Languages: ["C#", "JavaScript", "TypeScript", "HTML", "CSS", "SQL"],
    "Frontend & Mobile": [
      "React",
      "React Native",
      "Tailwind",
      "Framer Motion",
      "Three.js",
      "Responsive UI",
    ],
    "Game Dev & Tools": ["Unity", "Godot", "Git", "GitHub", "VS Code", "Figma"],
    Exploring: [
      "iOS · React Native",
      "Hardware & Electronics",
      "Quantum Computing",
      "Physics",
      "Mathematics",
      "WebGL",
      "Open to new tracks",
    ],
  } as Record<string, string[]>,

  techConstellation: [
    { name: "React", weight: 0.95, color: "#61dafb" },
    { name: "React Native", weight: 0.7, color: "#61dafb" },
    { name: "TypeScript", weight: 0.85, color: "#3178c6" },
    { name: "JavaScript", weight: 0.92, color: "#f7df1e" },
    { name: "C#", weight: 0.86, color: "#9b4f96" },
    { name: "HTML", weight: 0.95, color: "#e34f26" },
    { name: "CSS", weight: 0.93, color: "#1572b6" },
    { name: "Tailwind", weight: 0.86, color: "#38bdf8" },
    { name: "SQL", weight: 0.7, color: "#0a78a8" },
    { name: "Godot", weight: 0.7, color: "#478cbf" },
    { name: "Unity", weight: 0.6, color: "#7c8a99" },
    { name: "Figma", weight: 0.55, color: "#f24e1e" },
  ],

  // Repos to hide from the Project Galaxy (profile readme, IEEE drills, etc.)
  excludedRepos: [
    "marwa-04",
    "Portfolio",
    "IEEE-assignment1",
    "IEEEassignments2",
    "OOP-System",
  ],

  // Hand-curated featured projects (rendered ahead of the GitHub feed).
  featuredProjects: [
    {
      name: "astracipher",
      prettyName: "Astracipher",
      tag: "Featured · Game",
      language: "Godot",
      color: "#478cbf",
      description:
        "A 2D story-driven RPG made in Godot for a dark-web awareness campaign. You follow Cipher on a journey to find his sister — and the choices you make slowly reveal the hidden dangers of the internet, sometimes past the point of return.",
      topics: ["godot", "indie-game", "rpg", "awareness", "internet-safety"],
      href: "https://lnkd.in/dUSUEDdr",
      studioHref: "https://lnkd.in/djwXBWtG",
      studioLabel: "Sifr Studios · itch.io",
    },
  ],

  // Used only when the GitHub API fails.
  projectsFallback: [
    { name: "HospitalCare-ITI-Project", description: "ITI capstone — hospital management interface built with the team." },
    { name: "biomedical-project", description: "Interactive JavaScript web experience." },
    { name: "Zakrny", description: "Arabic reminder/learning interface (forked, customized)." },
  ],
} as const;

export type Profile = typeof profile;
