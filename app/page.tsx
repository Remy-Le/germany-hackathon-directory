import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cities, getUpcomingHackathons } from '@/lib/data';
import HackathonCalendar from '@/components/hackathon-calendar';

export default function HomePage() {
  const upcomingHackathons = getUpcomingHackathons();
  // Get total approved hackathons
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { getAllApprovedHackathons } = require("@/lib/data");
  const totalHackathons = getAllApprovedHackathons().length;

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
          </div>
          <Link href="/submit">
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">Submit Event</Button>
          </Link>
        </div>
      </nav>

      {/* Hero + Cities Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6">
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white text-balance">
              Germany&apos;s <span className="text-blue-400">Hackathon</span> Directory
            </h1>
            <p className="text-slate-400 mt-1 text-sm max-w-xl text-balance">
              In-person and hybrid events across Berlin, Munich, Hamburg, Frankfurt, Cologne &amp; Darmstadt.
            </p>
          </div>
          <div className="flex flex-col items-center md:ml-4 bg-blue-600 text-white rounded-2xl shadow border border-blue-400 px-8 py-2">
            <span className="text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-lg">
              {totalHackathons}
            </span>
            <span className="text-base md:text-lg font-semibold tracking-wide uppercase opacity-80 -mt-1">
              hackathons
            </span>
          </div>
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
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8">
            <p className="text-center text-sm text-slate-400">
              © 2026 HackDE. All rights reserved.
            </p>
            <div className="flex justify-center mt-2">
              <a
                href="https://remyle.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-slate-800 text-slate-200 text-xs px-3 py-1 rounded-full shadow hover:bg-slate-700 transition-colors"
                style={{ letterSpacing: '0.05em' }}
              >
                built by Remy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
