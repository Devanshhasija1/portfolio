export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  role: string;
  roleDetails: string;
  team: string[];
  timeline: string;
  overview: string;
  bannerImage: string;
  chapters: { id: string; label: string }[];
  originalFile: string;
}

export const projects: Project[] = [
  {
    slug: 'spyne-connect',
    title: 'Spyne Connect',
    subtitle: 'Spyne, 2024–2025',
    date: '2024',
    role: 'Product Designer',
    roleDetails: 'Product Strategy, Interaction Design, Visual Design, Prototyping, Design Systems',
    team: ['Devansh Hasija, Product Designer', 'Engineering Team, Spyne'],
    timeline: '2024–2025, Live on 3,000+ dealerships',
    overview: 'Designed an AI-powered conversational commerce widget that helps automotive dealerships engage website visitors through chat, voice calls, email, and intelligent automation — turning passive browsers into qualified leads.',
    bannerImage: '/images/spyne/chat-conversation-desktop.png',
    chapters: [
      { id: 'overview', label: 'Overview' },
      { id: 'problem', label: 'The Problem' },
      { id: 'process', label: 'Design Process' },
      { id: 'principles', label: 'Design Principles' },
      { id: 'solution', label: 'The Solution' },
      { id: 'decisions', label: 'Key Decisions' },
      { id: 'chat', label: 'Chat Experience' },
      { id: 'call', label: 'Voice Calling' },
      { id: 'email', label: 'Email & AI Writing' },
      { id: 'engagement', label: 'Smart Engagement' },
      { id: 'responsive', label: 'Responsive Design' },
      { id: 'impact', label: 'Impact & Results' },
      { id: 'retro', label: 'Retrospective' },
    ],
    originalFile: 'page1.html',
  },
  {
    slug: 'stadia-bluetooth-2',
    title: 'Stadia Bluetooth Project',
    subtitle: 'Google, Stadia - 2023',
    date: '2023',
    role: 'Designer',
    roleDetails: 'Interaction Design, Visual Design',
    team: [],
    timeline: '2023',
    overview: 'Stadia Bluetooth connectivity case study.',
    bannerImage: '/images/placeholder.webp',
    chapters: [
      { id: 'overview', label: 'Overview' },
      { id: 'highlights', label: 'Highlights' },
    ],
    originalFile: 'page.html',
  },
  {
    slug: 'project-3',
    title: 'Project 3',
    subtitle: 'Design Case Study',
    date: '2023',
    role: 'UX/UI Designer',
    roleDetails: 'Full Design Process',
    team: [],
    timeline: '2023',
    overview: 'Design case study showcasing the complete design process.',
    bannerImage: '/images/placeholder.webp',
    chapters: [{ id: 'overview', label: 'Overview' }],
    originalFile: 'page2.html',
  },
  {
    slug: 'project-4',
    title: 'Project 4',
    subtitle: 'Design Case Study',
    date: '2023',
    role: 'UX/UI Designer',
    roleDetails: 'Full Design Process',
    team: [],
    timeline: '2023',
    overview: 'Design case study.',
    bannerImage: '/images/placeholder.webp',
    chapters: [{ id: 'overview', label: 'Overview' }],
    originalFile: 'page3.html',
  },
  {
    slug: 'project-5',
    title: 'Project 5',
    subtitle: 'Design Case Study',
    date: '2023',
    role: 'UX/UI Designer',
    roleDetails: 'Full Design Process',
    team: [],
    timeline: '2023',
    overview: 'Design case study.',
    bannerImage: '/images/placeholder.webp',
    chapters: [{ id: 'overview', label: 'Overview' }],
    originalFile: 'page4.html',
  },
  {
    slug: 'project-6',
    title: 'Project 6',
    subtitle: 'Design Case Study',
    date: '2023',
    role: 'UX/UI Designer',
    roleDetails: 'Full Design Process',
    team: [],
    timeline: '2023',
    overview: 'Design case study.',
    bannerImage: '/images/placeholder.webp',
    chapters: [{ id: 'overview', label: 'Overview' }],
    originalFile: 'page5.html',
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return projects.map((p) => p.slug);
}
