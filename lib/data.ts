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
    id: 'kill-the-search-bar-pdm-2026',
    name: 'Kill the Search Bar - pdm Hackathon 2026',
    city: 'Berlin',
    date: '2026-05-15',
    endDate: '2026-05-17',
    venue: 'pdm solutions GmbH',
    address: 'Boxhagener Str. 78, 10245 Berlin, Germany',
    format: 'in-person',
    description: 'A builders-only hackathon to reinvent the directory ecosystem in Germany. 6 curated teams tackle real industry pain points—no panels, no small talk, just 72 hours of focused building. Challenges include AI-native interfaces, embedded booking, live-data engines, and more. Demo Day on May 20 at the VDAV Industry Meetup.',
    maxParticipants: 30,
    registeredParticipants: 5,
    website: 'https://luma.com/2e3aa6yj',
    image: 'https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,background=white,quality=90,width=800,height=400/gallery-images/fv/9ca2825f-781f-48c2-bc21-7dd90ac2d3ef',
    tags: ['AI', 'Directories', 'SMB', 'Berlin'],
    prizes: '€3,000+ curated prize package, CEO pitch sessions, industry opportunities',
    contact: 'support@luma.com',
    approved: true,
  },
  {
    id: 'healthcare-hackathon-berlin-2026',
    name: 'Healthcare Hackathon Berlin 2026',
    city: 'Berlin',
    date: '2026-07-08',
    endDate: '2026-07-10',
    venue: 'In den Ministeriengärten 8',
    address: 'In den Ministeriengärten 8, 10117 Berlin, Germany',
    format: 'in-person',
    description: 'Three days of innovation, open source, next-generation hospital information systems, and digital transformation – together with leading minds from clinics, politics, and technology. 12 interdisciplinary challenges, keynotes, panels, and over 400 participants. Organized by UKSH, PwC & Google.',
    maxParticipants: 400,
    registeredParticipants: 282,
    website: 'https://healthcare-hackathon.de/',
    image: 'https://healthcare-hackathon.de/logo-color.svg',
    tags: ['Healthcare', 'AI', 'Open Source', 'Berlin', 'Digital Health'],
    prizes: 'Material prizes, credits, licenses, networking with industry leaders',
    contact: 'berlin@healthcare-hackathon.de',
    approved: true,
  },
  {
    id: 'hackxplore-2026',
    name: 'HackXplore 2026',
    city: 'Karlsruhe',
    date: '2026-06-26',
    endDate: '2026-06-28',
    venue: 'SteamWork by GoodSpaces',
    address: 'SteamWork by GoodSpaces, Karlsruhe, Germany',
    format: 'in-person',
    description: 'A 3-day hackathon for young professionals in Karlsruhe. Interdisciplinary teams tackle real challenges from industry partners, compete for a big prize pool, and build valuable networks. Organized by NXTGN and MESH, under the patronage of the Ministry of Science, Research and Arts of Baden-Württemberg.',
    maxParticipants: 150,
    registeredParticipants: 150,
    website: 'https://hackxplore.de/',
    image: 'https://hackxplore.de/wp-content/uploads/2025/11/HackXplore2025-364-1024x683.jpg',
    tags: ['Innovation', 'Young Professionals', 'Karlsruhe', 'Industry', 'Networking'],
    prizes: 'Big prize pool (cash & more)',
    contact: 'mail@hackxplore.de',
    approved: true,
  },
  {
    id: 'tum-science-hackathon-2026',
    name: 'TUM Science Hackathon 2026',
    city: 'Munich',
    date: '2026-06-19',
    endDate: '2026-06-21',
    venue: 'Technical University of Munich',
    address: 'Arcisstrasse 21, 80333 Munich, Germany',
    format: 'in-person',
    description: 'A 3-day hackathon where interdisciplinary student teams solve real-world challenges from industry and research. Hosted by TUM Junge Akademie, the event blends rapid innovation, academic excellence, and entrepreneurial spirit.',
    maxParticipants: 150,
    registeredParticipants: 150,
    website: 'https://www.ja.tum.de/ja/sciencehackathon/',
    image: 'https://www.ja.tum.de/fileadmin/_processed_/7/4/csm_ScienceHack-25_group_header_6fcf02bbe4.png',
    tags: ['Science', 'Students', 'Munich', 'Innovation', 'TUM'],
    prizes: 'Recognition, networking, and more',
    contact: 'sciencehack@ja.tum.de',
    approved: true,
  },
  {
    id: 'big-berlin-hack-2026',
    name: 'Big Berlin Hack',
    city: 'Berlin',
    date: '2026-04-25',
    endDate: '2026-04-26',
    venue: 'The Delta Campus',
    address: 'Berlin, Germany',
    format: 'in-person',
    description: 'A weekend of innovation, collaboration, and building the future of AI. Over 300 builders, more than €50,000 in prizes, and top partners like Google DeepMind. Hosted by Tech:Europe, CODE University, and The Delta Campus.',
    maxParticipants: 300,
    registeredParticipants: 300,
    website: 'https://luma.com/bigberlinhack',
    image: 'https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,background=white,quality=90,width=800,height=400/event-covers/1l/d2466a90-f3b2-4c67-b856-4aaa6696e762.png',
    tags: ['AI', 'Berlin', 'Builders', 'Collaboration', 'Prizes'],
    prizes: 'Over €50,000 in prizes',
    contact: 'info@techeurope.io',
    approved: true,
  },
  {
    id: 'q-hackathon-2026',
    name: 'Q-Hackathon 2026',
    city: 'Mannheim',
    date: '2026-04-08',
    endDate: '2026-04-09',
    venue: 'Baroque Palace, University of Mannheim',
    address: 'Schloss Ehrenhof Ost, 68161 Mannheim, Germany',
    format: 'in-person',
    description: '24 hours of hacking, 1 big pitch battle. Compete with ambitious students from 40+ countries and Europe’s top universities. Solve real-world challenges from top partners, enjoy free Q-Summit tickets, afterparty, catering, and accommodation.',
    maxParticipants: 200,
    registeredParticipants: 200,
    website: 'https://luma.com/79ly3pds',
    image: 'https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,background=white,quality=90,width=800,height=400/event-covers/lr/bbeebf00-633f-438c-859b-42497f5aedce.jpg',
    tags: ['Students', 'Mannheim', 'Q-Summit', 'Pitch', 'Prizes'],
    prizes: 'Cash prizes, exclusive non-cash prizes, goodie bags',
    contact: 'hackathon@q-summit.com',
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
