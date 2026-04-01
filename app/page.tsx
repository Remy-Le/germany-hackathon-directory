import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cities, getUpcomingHackathons } from '@/lib/data';
import HackathonCalendar from '@/components/hackathon-calendar';
import { ThemeToggle } from '@/components/theme-toggle';

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
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link href="/submit">
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">Submit Event</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero + Cities Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6">
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-white text-balance">
            Germany&apos;s <span className="text-blue-400">Hackathon</span> Directory
          </h1>
          <p className="text-slate-400 mt-1 text-sm max-w-xl text-balance">
            In-person and hybrid events across Berlin, Munich, Hamburg, Frankfurt, Cologne &amp; Darmstadt.
          </p>
        </div>

        {/* Cities strip */}
        <div id="cities" className="flex flex-wrap gap-2 scroll-mt-20">
          {cities.map((city) => (
            <Link key={city.slug} href={`/city/${city.slug}`}>
              <div className="px-4 py-2 rounded-lg bg-slate-800/60 border border-slate-700 hover:border-blue-500 hover:bg-slate-700/60 transition-all cursor-pointer flex items-center gap-2">
                <span className="font-medium text-white text-sm">{city.name}</span>
                <span className="text-xs text-slate-400">
                  {upcomingHackathons.filter(h => h.city === city.name).length}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Calendar Section */}
      <section id="events" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 scroll-mt-20">
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
