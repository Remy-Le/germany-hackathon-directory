export interface Hackathon {
  id: string;
  name: string;
  city: string;
  date: string;
  endDate: string;
  venue: string;
  address: string;
  format: 'in-person' | 'hybrid';
  description: string;
  maxParticipants: number;
  registeredParticipants: number;
  website: string;
  image: string;
  tags: string[];
  prizes: string;
  contact: string;
  approved: boolean;
}

export const cities = [
  { name: 'Berlin', slug: 'berlin' },
  { name: 'Munich', slug: 'munich' },
  { name: 'Hamburg', slug: 'hamburg' },
  { name: 'Frankfurt', slug: 'frankfurt' },
  { name: 'Cologne', slug: 'cologne' },
  { name: 'Darmstadt', slug: 'darmstadt' },
];

export const hackathons: Hackathon[] = [
  {
    id: 'hackberlin-2026',
    name: 'HackBerlin 2026',
    city: 'Berlin',
    date: '2026-05-15',
    endDate: '2026-05-17',
    venue: 'Berlin Convention Center',
    address: 'Messedamm 22, 14055 Berlin',
    format: 'in-person',
    description: 'Europe\'s largest hackathon with 2000+ developers, designers, and entrepreneurs competing for prizes and recognition.',
    maxParticipants: 2000,
    registeredParticipants: 1847,
    website: 'https://hackberlin.de',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop',
    tags: ['Web3', 'AI', 'Climate Tech'],
    prizes: '€50,000 in prizes',
    contact: 'info@hackberlin.de',
    approved: true,
  },
  {
    id: 'hacktech-munich-2026',
    name: 'HackTech Munich',
    city: 'Munich',
    date: '2026-06-12',
    endDate: '2026-06-14',
    venue: 'Munich Innovation Hub',
    address: 'Lothstraße 64, 80335 München',
    format: 'hybrid',
    description: 'AI and machine learning focused hackathon attracting top technical talent from across Europe.',
    maxParticipants: 500,
    registeredParticipants: 412,
    website: 'https://hacktechmunich.de',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop',
    tags: ['AI', 'Machine Learning', 'Robotics'],
    prizes: '€30,000 in prizes',
    contact: 'hello@hacktechmunich.de',
    approved: true,
  },
  {
    id: 'startup-sprint-hamburg',
    name: 'Startup Sprint Hamburg',
    city: 'Hamburg',
    date: '2026-04-20',
    endDate: '2026-04-22',
    venue: 'Hamburg Startup Hub',
    address: 'Neuer Kamp 30, 20357 Hamburg',
    format: 'in-person',
    description: 'Startup-focused hackathon emphasizing entrepreneurship, business models, and market fit.',
    maxParticipants: 300,
    registeredParticipants: 267,
    website: 'https://startupsprint-hamburg.de',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop',
    tags: ['Startups', 'Business', 'Innovation'],
    prizes: '€20,000 + mentorship',
    contact: 'contact@startupsprinthamburg.de',
    approved: true,
  },
  {
    id: 'web3-frankfurt',
    name: 'Web3 Frankfurt Hackathon',
    city: 'Frankfurt',
    date: '2026-07-10',
    endDate: '2026-07-12',
    venue: 'Frankfurt Tech Center',
    address: 'Main Tower, Neue Mainzer Str. 52, 60311 Frankfurt',
    format: 'hybrid',
    description: 'Blockchain and Web3 development hackathon with industry experts and investors.',
    maxParticipants: 600,
    registeredParticipants: 523,
    website: 'https://web3frankfurt.de',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop',
    tags: ['Web3', 'Blockchain', 'DeFi'],
    prizes: '€40,000 in prizes',
    contact: 'team@web3frankfurt.de',
    approved: true,
  },
  {
    id: 'climatetech-cologne',
    name: 'ClimateTech Cologne',
    city: 'Cologne',
    date: '2026-05-22',
    endDate: '2026-05-24',
    venue: 'Cologne Science Park',
    address: 'Aachener Str. 299, 50931 Köln',
    format: 'in-person',
    description: 'Climate and sustainability focused hackathon with impact-driven projects.',
    maxParticipants: 400,
    registeredParticipants: 356,
    website: 'https://climatechcologne.de',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop',
    tags: ['Climate Tech', 'Sustainability', 'Green Energy'],
    prizes: '€25,000 in prizes',
    contact: 'info@climatechcologne.de',
    approved: true,
  },
  {
    id: 'hardware-darmstadt',
    name: 'Hardware Hack Darmstadt',
    city: 'Darmstadt',
    date: '2026-08-05',
    endDate: '2026-08-07',
    venue: 'Darmstadt University of Technology',
    address: 'Karolinenplatz 5, 64289 Darmstadt',
    format: 'in-person',
    description: 'Hardware and embedded systems hackathon with electronics, IoT, and robotics focus.',
    maxParticipants: 250,
    registeredParticipants: 198,
    website: 'https://hardwarehackdarmstadt.de',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop',
    tags: ['Hardware', 'IoT', 'Embedded Systems'],
    prizes: '€15,000 + components',
    contact: 'hack@hardwaredarmstadt.de',
    approved: true,
  },
];

export function getHackathonsByCity(city: string): Hackathon[] {
  return hackathons.filter(h => h.city.toLowerCase() === city.toLowerCase() && h.approved);
}

export function getHackathonById(id: string): Hackathon | undefined {
  return hackathons.find(h => h.id === id && h.approved);
}

export function getAllApprovedHackathons(): Hackathon[] {
  return hackathons.filter(h => h.approved);
}

export function getUpcomingHackathons(): Hackathon[] {
  const now = new Date();
  return hackathons
    .filter(h => h.approved && new Date(h.date) > now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}
