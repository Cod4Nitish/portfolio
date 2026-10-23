/*
  PORTFOLIO CONTENT SOURCE
  ------------------------
  Edit this file to add future projects, tools, events, or about photos.
  See PORTFOLIO-UPDATE-GUIDE.md for the exact format.
*/
window.PORTFOLIO_DATA = {
  profile: {
    heroPhoto: "assets/nitish-portrait.jpeg",
    profilePhoto: "assets/nitish-portrait.jpeg",
    linkedinName: "Nitish Kumar · LinkedIn",
    linkedinUrl: "https://www.linkedin.com/in/nitish-ai-engineer",
    wallPortfolioUrl: "https://www.wallofportfolios.in/",
    connections: "2,254 connections",
    focus: "Generative AI · Agentic AI · RAG",
    role: "AI Engineer & Full-Stack Developer",
    location: "Noida, Uttar Pradesh · India",
    country: "India",
    // This date makes the duration in the left rail update automatically each month, up to the target duration below.
    internshipStartDate: "2026-07-27",
    internshipStartLabel: "Started 27 July 2026",
    internshipDurationMonths: 12,
    internshipTitle: "AI Agentic Intern · private startup team",
    internship: "AI Agentic Intern · private startup team",
    experience: "Building confidential multi-agent systems, AI automation, production-ready RAG pipelines, API backends, and microservice foundations designed to scale to 1,000+ users.",
    internshipHighlights: [
      "Multi-agent systems and specialised AI agents",
      "AI automation, RAG pipelines, and API backends",
      "Microservice foundations designed for 1,000+ users",
    ],
    workbenchUpdate: {
      label: "CURRENT BUILD UPDATE",
      title: "Multi-agent systems, in progress.",
      detail: "RAG pipelines · automation · microservices",
    },
    // Add your date of birth as YYYY-MM-DD to turn the hero clock into an automatically updating age card.
    birthDate: "",
  },

  /*
    Public GitHub repositories appear automatically in Small builds. No token
    is used or exposed. Curated projects above stay in this file so private
    company work and its copy remain fully under your control.
  */
  githubSync: {
    username: "Cod4Nitish",
    maxRepos: 30,
    cacheMinutes: 30,
    // Add a public repository name here only when you do not want it shown.
    // The profile README is not a portfolio project card.
    excludeRepos: ["Cod4Nitish"],
  },

  /*
    This source controls the Education, Skills, and Certifications area on
    the website AND both PDF résumés. After editing, run
    `node scripts/build-resume.mjs` to rebuild assets/nitish-resume.pdf
    (ATS, single column) and assets/nitish-resume-designed.pdf (two column).
    `summary`, `experience`, `resumeProjects`, and `wins` are résumé-only.
  */
  resume: {
    name: "Nitish Kumar Singh",
    headline: "AI Engineer & Full-Stack Developer",
    email: "theeditornitish@gmail.com",
    phone: "+91 6206889310",
    summary: "AI Engineer focused on agentic systems: multi-agent workflows, RAG pipelines, and the APIs and web apps around them. Currently an AI Agentic Intern with a private startup team, building multi-agent systems, AI automation, and microservice foundations designed to scale to 1,000+ users. Won three awards at Claude and Cerebras community events in Bhopal in 2026, and ships public products end to end with Python (FastAPI), TypeScript, Next.js, and LangGraph.",
    experience: [
      {
        role: "AI Agentic Intern",
        company: "Private startup team",
        dates: "Jul 2026 – Present",
        bullets: [
          "Building multi-agent systems and specialised AI agents for confidential company products.",
          "Developing production-ready RAG pipelines, AI automation, and API backends.",
          "Laying microservice foundations designed to scale to 1,000+ users.",
        ],
      },
    ],
    // Résumé project order and wording (AI Engineer target). Titles must match `projects` for links.
    resumeProjects: [
      {
        title: "ForgeMind",
        subtitle: "AI software-engineer agent",
        stack: "Next.js, TypeScript, LangGraph, LangChain, Claude, Vercel",
        bullets: [
          "Built an AI software-engineer agent that triages GitHub issues and coordinates Jira and Slack work through Swytchcode, so important work does not get missed.",
          "Orchestrated the agent workflow with LangGraph and Claude in a Next.js + TypeScript app deployed on Vercel.",
        ],
      },
      {
        title: "MRStay AI",
        subtitle: "Agentic real-estate platform",
        stack: "Next.js, NestJS, FastAPI, LangChain, ChromaDB, Gemini",
        bullets: [
          "Multi-agent platform for lead qualification, property recommendations, customer support, and follow-up workflows.",
          "Property knowledge retrieval through a RAG pipeline (LangChain, ChromaDB, Gemini) served by NestJS and FastAPI services.",
        ],
      },
      {
        title: "Bhumi Help",
        subtitle: "Bilingual civic-tech RAG assistant",
        stack: "Python, FastAPI, RAG, Claude",
        bullets: [
          "Answers MP Bhumi Vikas Rules, 2012 questions in Hindi or English with the rule number, verified text, and the exact official PDF page.",
          "Declines instead of guessing when the rules do not cover a question; built with Team Nirmaan at Bhopal Impact Lab 2026 (Track 1).",
        ],
      },
      {
        title: "DropMorph",
        subtitle: "Cross-platform file converter",
        stack: "C#, .NET, Avalonia, GitHub Actions",
        bullets: [
          "Shipped a free, offline drag-and-drop converter for 254 formats on Windows, macOS, and Linux (v1.12.0); nothing is uploaded.",
          "Automated CI and releases with installers, portable builds, and a checksum-verified one-command install script.",
        ],
      },
      {
        title: "CallbackCV",
        subtitle: "AI résumé / ATS checker",
        stack: "TypeScript, LLM APIs",
        bullets: [
          "AI résumé and ATS-review product for Indian freshers that turns a résumé into role-aware feedback and a clear next step.",
        ],
      },
    ],
    wins: [
      { title: "Winner, Team GLITCH", detail: "Claude Community Impact Lab, Bhopal (2026) · awarded Claude Pro / Max access" },
      { title: "₹11,000 prize", detail: "Fable 5.1 Claude Community Build Day, Bhopal (2026) · built and presented in person" },
      { title: "Quiz Winner", detail: "Cerebras Cafe Compute Meetup, Bhopal (Sep 2026) · 2,500 Cerebras credits and winner cup" },
      { title: "Participant", detail: "Smart India Hackathon (SIH) 2025" },
    ],
    education: [
      {
        institution: "Noida Institute of Engineering and Technology (NIET), Greater Noida (AKTU)",
        qualification: "B.Tech, Computer Science & Engineering (Artificial Intelligence) · CGPA: 7.5",
        dates: "Aug 2024 – Sept 2027",
      },
      {
        institution: "Government Polytechnic, Garhwa, Jharkhand (JUT, Ranchi)",
        qualification: "Diploma in Electrical Engineering",
        dates: "2021 – 2023",
      },
    ],
    skills: [
      { label: "Languages", items: ["Python", "TypeScript", "JavaScript", "Java", "SQL", "C#", "C++"] },
      { label: "Frontend", items: ["React.js", "Next.js", "HTML5", "CSS3", "Tailwind CSS", "Responsive web design"] },
      { label: "Backend", items: ["Node.js", "Express.js", "NestJS", "FastAPI", "Spring Boot", "REST APIs", "Microservices foundations"] },
      { label: "Databases", items: ["PostgreSQL", "Supabase", "MongoDB", "MySQL", "ChromaDB (vector)"] },
      { label: "AI systems", items: ["AI agents", "Multi-agent systems", "RAG pipelines", "LangChain", "LangGraph", "OpenAI API", "Google Gemini API", "Claude"] },
      { label: "Security", items: ["JWT", "Spring Security", "Authentication"] },
      { label: "Core CS", items: ["Data Structures & Algorithms", "OOPs", "DBMS", "Operating Systems", "Computer Networks"] },
      { label: "Delivery", items: ["Git", "GitHub", "Vercel", "GitHub Actions", "CI/CD fundamentals", "Docker fundamentals"] },
    ],
    certifications: [
      { title: "Certificate of Accomplishment", issuer: "HackerRank", date: "Issued Jun 2026", credentialId: "A41853D1D66C" },
      { title: "SQL (Intermediate) Certification", issuer: "HackerRank", date: "Issued Jun 2026", skills: "SQL joins · aggregations · subqueries · window functions · data analysis" },
      { title: "Prompt to Product: The AI Feature Blueprint", issuer: "Shri Ram College of Commerce (SRCC)", date: "Issued Feb 2026", credentialId: "4f1a945e-b990-4828-b028-82e94dee6b7a", skills: "AI Prompting" },
      { title: "Certificate of Participation in Bytewars", issuer: "Department of Commerce, Delhi School of Economics, University of Delhi", date: "Issued Nov 2025", credentialId: "aeb743cc-d2a1-4f2a-a247-d0c18db98352" },
      { title: "Hands-on Workshop of IGNITRON ’25", issuer: "Maharaja Agrasen Institute of Technology, Delhi", date: "Issued Nov 2025", credentialId: "008ca6d7-ed0b-4bfb-bb13-2374315a7e46", skills: "AI workflow automation · process automation" },
      { title: "TATA Crucible Campus Quiz 2025", issuer: "Unstop", date: "Issued Nov 2025", credentialId: "c374416a-5d87-4cb0-92e9-3365542032ef" },
      { title: "ThinkBlitz — 4-Hour Ideathon", issuer: "Indraprastha Institute of Information Technology, Delhi", date: "Issued Oct 2025", credentialId: "aeb72f5a-6491-4327-a261-6462bbbcfca8", skills: "Front-end Coding" },
      { title: "Code Slayer 2K25", issuer: "National Institute of Technology Delhi", date: "Issued Oct 2025", credentialId: "457fe967-46d7-45c0-abd1-aff9a8e32568", skills: "Front-end Coding" },
      { title: "Use Canva to Create Desktop and Mobile-friendly Web Pages", issuer: "Coursera", date: "Issued Aug 2025 · Expired Aug 2025", credentialId: "4V6JYHLBZLPZ", skills: "Web Design" },
    ],
    achievements: [
      "Winner, Team GLITCH - Claude Community Bhopal Impact Lab; earned Claude Pro Max access.",
      "Quiz Winner, Cerebras Cafe Compute Meetup, Bhopal; received 2,500 Cerebras credits, a winner cup, and event goodies.",
      "Won ₹11,000 at the Fable 5.1 Claude Community Build Day in Bhopal.",
      "Participant, Smart India Hackathon (SIH) 2025.",
    ],
  },

  /*
    Add every tool you learn here. Each card is created automatically,
    remains draggable, appears in the portfolio search, and keeps its own
    tactile selected colour. See PORTFOLIO-UPDATE-GUIDE.md for the format.
  */
  tools: [
    { id: "python", label: "Python", role: "Rapid AI and backend prototypes", icon: "https://cdn.simpleicons.org/python/3776AB", fill: "#e5f1ff", strong: "#3776ab" },
    { id: "fastapi", label: "FastAPI", role: "Fast, typed APIs for product ideas", icon: "https://cdn.simpleicons.org/fastapi/009688", fill: "#dcf9f0", strong: "#009688" },
    { id: "next", label: "Next.js", role: "Full-stack product foundations", icon: "https://cdn.simpleicons.org/nextdotjs/111111", fill: "#efefef", strong: "#202124" },
    { id: "react", label: "React", role: "Responsive interface systems", icon: "https://cdn.simpleicons.org/react/149ECA", fill: "#dbf7ff", strong: "#1595b8" },
    { id: "openai", label: "OpenAI / ChatGPT", role: "Reasoning, prototyping, and useful AI product features", icon: "https://chatgpt.com/favicon.ico", fill: "#e6f5ed", strong: "#287356" },
    { id: "gemini", label: "Gemini", role: "Generative intelligence experiments and Gemini-powered product flows", icon: "https://cdn.simpleicons.org/googlegemini/4285F4", fill: "#eae6ff", strong: "#6758df" },
    { id: "claude", label: "Claude", role: "Long-context thinking and Claude-assisted product exploration", icon: "https://cdn.simpleicons.org/anthropic/D97757", fill: "#ffe8df", strong: "#b45938" },
    { id: "canva", label: "Canva Pro", role: "Quick visual work, presentations, and creator-ready assets", icon: "https://www.canva.com/favicon.ico", fill: "#dbf8fb", strong: "#00a8b5" },
    { id: "figma", label: "Figma", role: "Interface exploration, visual systems, and product-ready design handoff", icon: "https://cdn.simpleicons.org/figma/F24E1E", fill: "#ffe8ef", strong: "#dc4677" },
    { id: "langchain", label: "LangChain", role: "Agent and retrieval workflows", icon: "https://cdn.simpleicons.org/langchain/1C3C3C", fill: "#eaf1e7", strong: "#456c3e" },
    { id: "postgres", label: "PostgreSQL", role: "Reliable product memory", icon: "https://cdn.simpleicons.org/postgresql/4169E1", fill: "#e4edff", strong: "#4169a1" },
    { id: "supabase", label: "Supabase", role: "Practical backend building blocks: database, auth, and real-time foundations", icon: "https://cdn.simpleicons.org/supabase/3ECF8E", fill: "#def9ea", strong: "#249d63" },
    { id: "node", label: "Node.js", role: "Flexible server-side product work", icon: "https://cdn.simpleicons.org/nodedotjs/339933", fill: "#e7f3dd", strong: "#5d8b38" },
    { id: "typescript", label: "TypeScript", role: "Safer front-end and backend code", icon: "https://cdn.simpleicons.org/typescript/3178C6", fill: "#e0ecff", strong: "#3178c6" },
    { id: "git", label: "Git + GitHub", role: "Version control, collaboration, and public builds", icon: "https://cdn.simpleicons.org/github/181717", fill: "#f1f1f1", strong: "#252525" },
    { id: "github-actions", label: "GitHub Actions", role: "Learning practical CI/CD automation for reliable releases", icon: "https://cdn.simpleicons.org/githubactions/2088FF", fill: "#e8efff", strong: "#2088ff" },
    { id: "docker", label: "Docker", role: "Learning portable services and repeatable development environments", icon: "https://cdn.simpleicons.org/docker/2496ED", fill: "#e6f3ff", strong: "#2496ed" },
    { id: "postman", label: "Postman", role: "API testing, debugging, and product integration checks", icon: "https://cdn.simpleicons.org/postman/FF6C37", fill: "#fff0e9", strong: "#ff6c37" },
    { id: "vercel", label: "Vercel", role: "Fast, reliable launches", icon: "https://cdn.simpleicons.org/vercel/111111", fill: "#f0f0f0", strong: "#202124" },
  ],

  projects: [
    {
      title: "DropMorph",
      eyebrow: "Drag-and-drop file converter",
      description: "A free, offline desktop file converter you use by dragging: hold Ctrl, drag files, and drop them on a format in the donut that opens at your cursor. 254 formats, from images and PDF to Office, e-books, CAD, and 3D, with nothing uploaded.",
      tags: ["C#", ".NET", "Avalonia", "Windows · macOS · Linux"],
      category: "product",
      status: "Public · v1.12.0",
      href: "https://dropmorph.vercel.app/",
      repository: "https://github.com/Cod4Nitish/DropMorph",
      action: "Open DropMorph",
      accent: "mint",
      featured: true,
      featuredOrder: 1,
    },
    {
      title: "Krypton Personal AI OS",
      eyebrow: "Personal AI operating system",
      description: "A personal, private Jarvis-style AI operating system with persistent memory, multi-model intelligence, multi-agent automation, voice, and offline-capable workflows.",
      tags: ["Personal AI agent", "Persistent memory", "Voice", "Offline-capable"],
      category: "foundation",
      status: "Private",
      href: null,
      action: "Private personal build",
      accent: "blue",
    },
    {
      title: "ForgeMind",
      eyebrow: "AI software engineer",
      description: "A secure engineering command centre that triages GitHub issues and coordinates Jira and Slack workflows so important work does not get missed.",
      tags: ["Next.js", "TypeScript", "LangGraph", "Claude"],
      category: "ai",
      status: "Public",
      href: "https://forgemind-ashy.vercel.app/",
      repository: "https://github.com/Cod4Nitish/ForgeMind",
      action: "Explore ForgeMind",
      accent: "coral",
      featured: true,
      featuredOrder: 3,
    },
    {
      title: "MRStay AI",
      eyebrow: "Agentic real-estate platform",
      description: "A confidential multi-agent real-estate project for lead qualification, property knowledge retrieval, recommendations, customer support, and clear follow-up workflows.",
      tags: ["Next.js", "Python", "RAG", "Gemini", "Lead workflows"],
      category: "ai",
      status: "Confidential",
      href: null,
      action: "Confidential company project",
      accent: "violet",
      featured: true,
      featuredOrder: 4,
    },
    {
      title: "Mooncee OS",
      eyebrow: "Internal employee operations",
      description: "A confidential internal operations system for a startup team, built to help employees manage daily attendance and practical day-to-day work in one place.",
      tags: ["Internal tools", "Employee operations", "Automation", "Confidential"],
      category: "product",
      status: "Confidential",
      href: null,
      action: "Confidential company project",
      accent: "mint",
      featured: true,
      featuredOrder: 5,
    },
    {
      title: "Bhumi Help",
      eyebrow: "Civic-tech rule assistant",
      description: "A bilingual civic-tech assistant for Bhopal building-permission workflows. It answers MP Bhumi Vikas Rules, 2012 questions with the rule number, verified text, and the exact official PDF page—without guessing when the rule does not cover the question.",
      tags: ["Python", "FastAPI", "RAG", "Hindi / English"],
      category: "ai",
      status: "Public · Team Nirmaan",
      href: "https://bhumi-vikas-sahayak.vercel.app/#team",
      action: "Open Bhumi Help",
      accent: "sun",
    },
    {
      title: "PhishGuard AI",
      eyebrow: "Security UX prototype",
      description: "An interactive phishing-awareness dashboard and URL-security prototype with simulated scans and threat visualisations.",
      tags: ["React", "TypeScript", "Tailwind CSS"],
      category: "ai",
      status: "Public",
      href: "https://cod4nitish.github.io/PhishGuard-AI/",
      repository: "https://github.com/Cod4Nitish/PhishGuard-AI",
      action: "Open PhishGuard AI",
      accent: "mint",
    },
    {
      title: "Janpat AI",
      eyebrow: "Civic information platform",
      description: "A context-aware civic information experience for candidate information, facts, and local relevance.",
      tags: ["Next.js", "Express", "TypeScript", "Gemini"],
      category: "ai",
      status: "Selected build",
      href: null,
      action: "Selected build",
      accent: "sun",
    },
    {
      title: "Portfolio",
      eyebrow: "This website",
      description: "The site you are on: a hand-built static portfolio with a guided explore mode, live GitHub activity, a privacy-friendly visitor counter, and both résumés generated from one data file. Built to stay smooth on low-end phones.",
      tags: ["HTML", "CSS", "JavaScript", "Vercel Functions"],
      category: "product",
      status: "Public",
      href: "https://nitish-portfolio-bice-three.vercel.app/",
      repository: "https://github.com/Cod4Nitish/portfolio",
      action: "You are here",
      accent: "blue",
    },
    {
      title: "SmartDash",
      eyebrow: "Analytics dashboard",
      description: "A full-stack analytics dashboard with authentication, product metrics, and a practical decision layer.",
      tags: ["React", "Spring Boot", "MySQL", "JWT"],
      category: "product",
      status: "Selected build",
      href: null,
      action: "Selected build",
      accent: "mint",
    },
    {
      title: "Multimodal AI Generator",
      eyebrow: "Creative AI experience",
      description: "A multimodal AI generator that brings text, image, and expressive interactions into one responsive interface.",
      tags: ["React 19", "Vite", "Gemini", "TensorFlow.js"],
      category: "ai",
      status: "Selected build",
      href: null,
      action: "Selected build",
      accent: "violet",
    },
    {
      title: "Gen AI Chatbot",
      eyebrow: "Conversational interface",
      description: "A multi-turn Gemini chatbot with typing cues and a calmer interface for long-running conversations.",
      tags: ["JavaScript", "Gemini", "Conversation UX"],
      category: "product",
      status: "Selected build",
      href: null,
      action: "Selected build",
      accent: "coral",
    },
    {
      title: "Snapchat AR Filters",
      eyebrow: "AR / VR creative build",
      description: "Two live Snapchat AR filters made for an AR/VR competition hosted at a Microsoft Office venue. Open either filter in Snapchat to try the experience.",
      tags: ["Snapchat", "AR filters", "AR / VR", "Creative build"],
      category: "product",
      status: "Live filters",
      href: "https://www.snapchat.com/unlock/?type=SNAPCODE&uuid=c8ac1e52b8334ba8b35c03399ae5dad2&metadata=01",
      action: "Try filter 01",
      extraLinks: [
        { label: "Try filter 02", href: "https://www.snapchat.com/unlock/?type=SNAPCODE&uuid=107c9537a577493c872e73d3feada0f3&metadata=01" },
      ],
      accent: "violet",
    },
    {
      title: "CallbackCV",
      eyebrow: "AI résumé / ATS checker",
      description: "An AI résumé and ATS-review product for Indian freshers, designed to turn a résumé into practical, role-aware feedback and a clearer application next step.",
      tags: ["TypeScript", "AI", "ATS review", "Career tools"],
      category: "product",
      status: "Public",
      href: "https://callbackcv.netlify.app/",
      action: "Open CallbackCV",
      accent: "sun",
      featured: true,
      featuredOrder: 2,
    },
  ],

  /* Leave this empty until you want an About photo to appear on the site. */
  aboutPhotos: [],

  /* Add event entries here when you have the title, date, description, image, and optional link. */
  events: [
    {
      title: "Team GLITCH — Claude Impact Lab",
      date: "Bhopal · Winner",
      description: "With Team GLITCH, I took an idea through rapid iterations, debugging, and a working final build at the Claude Community Impact Lab in Bhopal.",
      highlights: ["Team GLITCH winner", "Claude Pro / Max access awarded", "Build, iterate, and present live"],
      image: "assets/team-glitch-claude-impact-lab-portfolio.png",
      alt: "Team GLITCH with their winner certificate at the Claude Impact Lab in Bhopal",
      href: "https://luma.com/claude-r61u?tk=MipAm0",
    },
    {
      title: "Cafe Compute Meetup: Bhopal — Quiz Winner",
      date: "Bhopal · 19 Sep 2026 · Quiz winner",
      description: "Won the quiz at Cerebras’ Cafe Compute Meetup—a hands-on Bhopal developer meetup for building with Cerebras and OpenAI Codex.",
      highlights: ["Quiz winner", "2,500 Cerebras credits", "Winner cup and event goodies"],
      image: "assets/cafe-compute-nitish-cutout.png",
      alt: "Nitish at the Cafe Compute Bhopal leaderboard with a fellow attendee and winner cup",
      href: "https://luma.com/2qo82a04?tk=bygp3X",
    },
    {
      title: "Claude Community Build Day — Fable 5.1",
      date: "Bhopal · Fable 5.1 · ₹11,000 prize",
      description: "Finished on the Fable 5.1 Claude Community Build Day winner board in Bhopal after an in-person build and presentation round.",
      highlights: ["₹11,000 prize", "Fable 5.1 build day", "Built and presented in person"],
      image: "assets/fable51-claude-build-day-portfolio.png",
      alt: "Nitish at the Fable 5.1 Claude Community Build Day in Bhopal",
      href: "https://luma.com/claude-z01j?tk=I7tpMp",
    },
  ],
};
