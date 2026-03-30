'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Users, ArrowRight, ArrowLeft } from 'lucide-react';
import { cities, getHackathonsByCity, getAllApprovedHackathons } from '@/lib/data';

export default function CityPage() {
  const params = useParams();
  const slug = params.slug as string;
  const city = cities.find(c => c.slug === slug);
  const hackathons = getHackathonsByCity(city?.name || '');

  if (!city) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">City not found</h1>
          <Link href="/">
            <Button>Return home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const cityDescriptions: Record<string, { title: string; description: string }> = {
    berlin: {
      title: 'Berlin - Europe\'s Startup Hub',
      description: 'Berlin is home to one of Europe\'s most vibrant tech scenes with countless startups, innovation hubs, and year-round hackathons. Known for its creative culture and diverse tech community.'
    },
    munich: {
      title: 'Munich - Engineering Excellence',
      description: 'Munich combines industrial heritage with cutting-edge technology. The city is a hub for AI, machine learning, and enterprise tech with strong academic institutions.'
    },
    hamburg: {
      title: 'Hamburg - Tech Gateway',
      description: 'As Germany\'s leading media hub, Hamburg attracts innovators in digital media, logistics tech, and startup ecosystems with a strong entrepreneurial spirit.'
    },
    frankfurt: {
      title: 'Frankfurt - FinTech Capital',
      description: 'Frankfurt\'s financial prominence has made it a center for Web3, blockchain, and fintech innovation with deep industry connections and investment opportunities.'
    },
    cologne: {
      title: 'Cologne - Creative Tech',
      description: 'Cologne boasts a thriving tech scene focused on sustainability, creative industries, and digital innovation with strong community engagement.'
    },
    darmstadt: {
      title: 'Darmstadt - Hardware Innovation',
      description: 'Home to TU Darmstadt, a world-renowned technical university, the city is a hub for hardware, embedded systems, and robotics research and development.'
    },
  };

  const cityInfo = cityDescriptions[slug as keyof typeof cityDescriptions];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Navigation */}
      <nav className="border-b border-slate-800 bg-slate-950/50 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="mb-16 space-y-6">
          <Badge className="bg-blue-600 w-fit">{hackathons.length} events</Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-white">{cityInfo.title}</h1>
          <p className="text-xl text-slate-300 max-w-3xl">{cityInfo.description}</p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <Card className="bg-slate-800/50 border-slate-700 p-6">
            <div className="text-3xl font-bold text-blue-400 mb-2">{hackathons.length}</div>
            <p className="text-slate-300">Upcoming Hackathons</p>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700 p-6">
            <div className="text-3xl font-bold text-blue-400 mb-2">
              {hackathons.reduce((sum, h) => sum + h.registeredParticipants, 0)}
            </div>
            <p className="text-slate-300">Total Participants</p>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700 p-6">
            <div className="text-3xl font-bold text-blue-400 mb-2">
              €{(hackathons.reduce((sum, h) => {
                const match = h.prizes.match(/€([\d,]+)/);
                return sum + (match ? parseInt(match[1].replace(/,/g, '')) : 0);
              }, 0) / 1000).toFixed(0)}K
            </div>
            <p className="text-slate-300">Total Prize Pool</p>
          </Card>
        </div>

        {/* Events Grid */}
        <h2 className="text-3xl font-bold text-white mb-8">Hackathons in {city.name}</h2>
        
        {hackathons.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {hackathons.map((hackathon) => (
              <Link key={hackathon.id} href={`/hackathon/${hackathon.id}`}>
                <Card className="h-full bg-slate-800/50 border-slate-700 hover:border-blue-500 transition-all hover:shadow-lg hover:shadow-blue-500/10 overflow-hidden cursor-pointer group">
                  <div className="relative h-48 bg-slate-700 overflow-hidden">
                    <img 
                      src={hackathon.image} 
                      alt={hackathon.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className={hackathon.format === 'in-person' ? 'bg-blue-600' : 'bg-purple-600'}>
                        {hackathon.format === 'in-person' ? 'In-Person' : 'Hybrid'}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{hackathon.name}</h3>
                      <div className="flex flex-wrap gap-2">
                        {hackathon.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="secondary" className="bg-slate-700 text-slate-200">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm text-slate-300">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-blue-400" />
                        <span>{new Date(hackathon.date).toLocaleDateString('de-DE', { month: 'short', day: 'numeric' })} - {new Date(hackathon.endDate).toLocaleDateString('de-DE', { month: 'short', day: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-blue-400" />
                        <span>{hackathon.venue}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-blue-400" />
                        <span>{hackathon.registeredParticipants}/{hackathon.maxParticipants} registered</span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-700 flex items-center justify-between">
                      <span className="text-sm font-semibold text-blue-400">{hackathon.prizes}</span>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-400 transition-colors" />
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <Card className="bg-slate-800/50 border-slate-700 p-12 text-center">
            <p className="text-slate-300 text-lg">No hackathons scheduled in {city.name} yet.</p>
            <Link href="/submit">
              <Button className="mt-4">Submit an Event</Button>
            </Link>
          </Card>
        )}

        {/* All Cities Grid */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold text-white mb-8">Explore Other Cities</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {cities
              .filter(c => c.slug !== slug)
              .map((otherCity) => (
              <Link key={otherCity.slug} href={`/city/${otherCity.slug}`}>
                <Card className="h-20 bg-slate-800/50 hover:bg-slate-700/50 border-slate-700 cursor-pointer transition-all hover:border-blue-500 flex items-center justify-center">
                  <p className="font-semibold text-white text-center">{otherCity.name}</p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
