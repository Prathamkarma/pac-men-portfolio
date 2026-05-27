/* ============================================
   PAC-Men Team Data
   ============================================ */

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string; // initials-based
  accentColor: "yellow" | "cyan" | "purple";
  skills: Skill[];
  projects: Project[];
  leadership: string[];
  wantsToLearn: string[];
  hobbies: string[];
  interests: string[];
}

export interface Skill {
  name: string;
  category: "language" | "ai-ml" | "web" | "tools" | "other";
  level: number; // 0-100
}

export interface Project {
  name: string;
  description?: string;
}

export interface NavLink {
  label: string;
  href: string;
}

/* ============================================
   Navigation Links
   ============================================ */

export const navLinks: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Team", href: "#team" },
  { label: "Skills", href: "#skills" },
  { label: "Goals", href: "#goals" },
  { label: "Open Source", href: "#opensource" },
  { label: "Workflow", href: "#workflow" },
  { label: "Fun Zone", href: "#fun" },
];

/* ============================================
   Team Members
   ============================================ */

export const teamMembers: TeamMember[] = [
  {
    id: "pratham",
    name: "Pratham Karma",
    role: "AI/ML + Problem Solving + Data Systems",
    bio: "2nd-year Dual Degree student at BITS Pilani Goa Campus pursuing Electrical & Electronics Engineering and Biological Sciences. Passionate about software engineering, competitive programming, automation systems, and machine learning.",
    avatar: "PK",
    accentColor: "yellow",
    skills: [
      { name: "C", category: "language", level: 85 },
      { name: "C++", category: "language", level: 90 },
      { name: "DSA", category: "other", level: 88 },
      { name: "Competitive Programming", category: "other", level: 85 },
      { name: "Data Processing", category: "tools", level: 80 },
      { name: "Bioinformatics", category: "ai-ml", level: 75 },
      { name: "JSON/FASTA/Excel Parsing", category: "tools", level: 82 },
    ],
    projects: [
      { name: "AlphavirusDB", description: "Comprehensive alphavirus database system" },
      { name: "Internship Station Prioritization Engine", description: "Smart prioritization system for internship stations" },
    ],
    leadership: ["Nirmaan Organization", "CEL Junior Associate"],
    wantsToLearn: ["Deep Learning", "AI Engineering", "Scalable ML Systems"],
    hobbies: ["Competitive programming", "Tech research", "Building systems"],
    interests: [],
  },
  {
    id: "amitesh",
    name: "Amitesh Garg",
    role: "AI Engineering + Future ML Research",
    bio: "Aspiring AI Engineer focused on Python, DSA, AI fundamentals, and building impactful real-world AI applications.",
    avatar: "AG",
    accentColor: "cyan",
    skills: [
      { name: "C Basics", category: "language", level: 65 },
      { name: "C++ Basics", category: "language", level: 65 },
      { name: "DSA Fundamentals", category: "other", level: 70 },
      { name: "Python", category: "language", level: 70 },
    ],
    projects: [],
    leadership: [],
    wantsToLearn: ["Machine Learning", "Deep Learning", "Computer Vision", "System Design"],
    hobbies: ["Self improvement", "Learning AI", "Problem solving"],
    interests: ["Virtual Try-On Systems", "AI Automation Tools", "Scalable AI Systems"],
  },
  {
    id: "chaitanya",
    name: "Chaitanya Chalith",
    role: "Software Development + Cloud + AI",
    bio: "BITS student passionate about software development, AI, and cloud technologies with strong interest in practical systems and real-world engineering.",
    avatar: "CC",
    accentColor: "purple",
    skills: [
      { name: "Python", category: "language", level: 78 },
      { name: "C/C++", category: "language", level: 75 },
      { name: "Git & GitHub", category: "tools", level: 80 },
      { name: "HTML/CSS/JavaScript", category: "web", level: 78 },
    ],
    projects: [
      { name: "EV Charging Aggregator App", description: "Concept for EV charging station aggregation" },
      { name: "Web Development Projects", description: "Various web development builds" },
    ],
    leadership: [],
    wantsToLearn: ["Machine Learning", "Full Stack Development", "Cloud Computing", "DevOps"],
    hobbies: ["Exploring technologies", "Building practical projects", "Learning new frameworks"],
    interests: [],
  },
];

/* ============================================
   Team Stats
   ============================================ */

export const teamStats = [
  { label: "Languages Known", value: 6, suffix: "+" },
  { label: "Projects Built", value: 4, suffix: "+" },
  { label: "Lines of Code", value: 50, suffix: "K+" },
  { label: "Coffees Consumed", value: 999, suffix: "+" },
  { label: "All-Nighters", value: 42, suffix: "" },
  { label: "Bugs Squashed", value: 200, suffix: "+" },
];

/* ============================================
   Team Description
   ============================================ */

export const teamDescription = {
  name: "PAC-Men",
  tagline: "Navigating the AI Maze, One Power-Up at a Time",
  meaning:
    "Inspired by the classic PAC-Man game. Just like PAC-Man navigates through complex mazes collecting power-ups, our team navigates through the rapidly evolving maze of AI, software engineering, and open-source innovation while continuously learning and growing.",
  description:
    "We are a team of ambitious student developers passionate about AI, software engineering, problem solving, and open-source collaboration. Our mission is to learn deeply, build impactful systems, and grow together during the Summer of AI internship.",
  funFact:
    "Despite coming from different technical backgrounds, all of us are deeply obsessed with building things that solve real-world problems.",
};
