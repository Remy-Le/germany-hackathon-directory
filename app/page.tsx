import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cities, getUpcomingHackathons } from '@/lib/data';
import HackathonCalendar from '@/components/hackathon-calendar';

export default function HomePage() {
  const upcomingHackathons = getUpcomingHackathons();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Navigation */}
      <nav className="border-b border-slate-800 bg-slate-950/50 backdrop-blur supports-[backdrop-filter]:bg-slate-950/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-white">
            HackDE
          </Link>
          <div className="hidden md:flex gap-6">
            <Link href="#cities" className="text-slate-300 hover:text-white transition-colors">
              Cities
            </Link>
            <Link href="#events" className="text-slate-300 hover:text-white transition-colors">
              Events
            </Link>
            <Link href="/submit" className="text-slate-300 hover:text-white transition-colors">
              Submit Event
            </Link>
          </div>
          <Link href="/admin">
            <Button variant="outline" size="sm">Admin</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold text-white text-balance">
            Discover Germany&apos;s Premier <span className="text-blue-400">Hackathons</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto text-balance">
            Find in-person and hybrid hackathon events across Berlin, Munich, Hamburg, Frankfurt, Cologne, and Darmstadt. Join Germany&apos;s vibrant tech community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="#cities">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Explore by City
              </Button>
            </Link>
            <Link href="/submit">
              <Button size="lg" variant="outline">
                Submit Your Event
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Cities Section */}
      <section id="cities" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-20">
        <h2 className="text-3xl font-bold text-white mb-12">Browse by City</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {cities.map((city) => (
            <Link key={city.slug} href={`/city/${city.slug}`}>
              <Card className="h-24 bg-slate-800/50 hover:bg-slate-700/50 border-slate-700 cursor-pointer transition-all hover:border-blue-500 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="font-semibold text-white">{city.name}</h3>
                  <p className="text-sm text-slate-400">
                    {upcomingHackathons.filter(h => h.city === city.name).length} events
                  </p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Calendar Section */}
      <section id="events" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-white">Hackathon Calendar</h2>
          <Link href="/submit">
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
              Submit Event
            </Button>
          </Link>
        </div>
        <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 overflow-x-auto">
          <HackathonCalendar />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-white mb-4">HackDE</h3>
              <p className="text-sm text-slate-400">Germany&apos;s premier hackathon directory for in-person and hybrid events.</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Cities</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                {cities.map(city => (
                  <li key={city.slug}>
                    <Link href={`/city/${city.slug}`} className="hover:text-white transition-colors">
                      {city.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link href="/submit" className="hover:text-white transition-colors">Submit Event</Link></li>
                <li><Link href="/admin" className="hover:text-white transition-colors">Admin Panel</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Contact</h4>
              <p className="text-sm text-slate-400">Have questions? Reach out to us at info@hackde.de</p>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8">
            <p className="text-center text-sm text-slate-400">
              © 2026 HackDE. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
