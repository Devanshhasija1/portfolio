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
    slug: 'stadia-bluetooth',
    title: 'Stadia Bluetooth',
    subtitle: 'Google, Stadia - January 2023',
    date: '2023',
    role: 'UX Lead',
    roleDetails: 'Interaction Design, Visual Design, User Flows, Rapid Prototyping',
    team: ['Austin Fisher, UXW', 'Dean Whillier, UXE', 'Bryan Coutch, SWE', 'Ben Whittaker, SWE', 'Christina Lee, PM'],
    timeline: '2 Months, Launched in January 2023',
    overview: "Following the announcement of Stadia's shutdown, questions arose about the future of Stadia controllers. The controllers could only connect wirelessly to screens through Stadia's own Wi-Fi connection.",
    bannerImage: '/images/placeholder.webp',
    chapters: [
      { id: 'overview', label: 'Overview' },
      { id: 'highlights', label: 'Highlights' },
      { id: 'context', label: 'Context' },
      { id: 'problem', label: 'The Problem' },
      { id: 'flow', label: 'Update Flow' },
      { id: 'layout', label: 'Layout' },
      { id: 'interactions', label: 'Interactions' },
      { id: 'visd', label: 'Visual Design' },
      { id: 'finaldesigns', label: 'Final Designs' },
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
