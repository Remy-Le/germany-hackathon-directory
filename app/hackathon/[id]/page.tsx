'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar, Award, Mail, Globe, ArrowLeft } from 'lucide-react';
import { getHackathonById } from '@/lib/data';

export default function HackathonDetailPage() {
  const params = useParams();
  const hackathon = getHackathonById(params.id as string);

  if (!hackathon) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Event not found</h1>
          <Link href="/">
            <Button>Return home</Button>
          </Link>
        </div>
      </div>
    );
  }



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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Image */}
        <div className="relative h-96 rounded-lg overflow-hidden mb-8 border border-slate-700">
          <img 
            src={hackathon.image} 
            alt={hackathon.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4">
            <Badge className={hackathon.format === 'in-person' ? 'bg-blue-600' : 'bg-purple-600'} size="lg">
              {hackathon.format === 'in-person' ? 'In-Person' : 'Hybrid'}
            </Badge>
          </div>
        </div>

        {/* Header */}
        <div className="mb-8 space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white">{hackathon.name}</h1>
          <div className="flex flex-wrap gap-2">
            {hackathon.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="bg-slate-700 text-slate-200">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="md:col-span-2 space-y-8">
            {/* Description */}
            <Card className="bg-slate-800/50 border-slate-700 p-6">
              <h2 className="text-2xl font-bold text-white mb-4">About</h2>
              <p className="text-slate-300 leading-relaxed">{hackathon.description}</p>
            </Card>

            {/* Key Details */}
            <Card className="bg-slate-800/50 border-slate-700 p-6">
              <h2 className="text-2xl font-bold text-white mb-6">Event Details</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-400 mb-1">Date</h3>
                    <div className="flex items-center gap-2 text-white">
                      <Calendar className="w-5 h-5 text-blue-400" />
                      <span>
                        {new Date(hackathon.date).toLocaleDateString('de-DE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} - {new Date(hackathon.endDate).toLocaleDateString('de-DE', { month: 'long', day: 'numeric' })}
                      </span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-400 mb-1">Location</h3>
                    <div className="flex items-start gap-2 text-white">
                      <MapPin className="w-5 h-5 text-blue-400 mt-0.5" />
                      <div>
                        <p>{hackathon.venue}</p>
                        <p className="text-sm text-slate-400">{hackathon.address}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-400 mb-1">Prizes</h3>
                    <div className="flex items-center gap-2 text-white">
                      <Award className="w-5 h-5 text-blue-400" />
                      <span>{hackathon.prizes}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>


          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <Card className="bg-slate-800/50 border-slate-700 p-6 space-y-4">
              <h3 className="font-bold text-white">Get in Touch</h3>
              <a href={`mailto:${hackathon.contact}`} className="flex items-center gap-3 p-3 rounded-lg bg-slate-700/50 hover:bg-slate-700 transition-colors">
                <Mail className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <span className="text-sm text-slate-200 break-all">{hackathon.contact}</span>
              </a>
              <a href={hackathon.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-lg bg-slate-700/50 hover:bg-slate-700 transition-colors">
                <Globe className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <span className="text-sm text-slate-200">Visit Website</span>
              </a>
            </Card>

            {/* Venue Info */}
            <Card className="bg-slate-800/50 border-slate-700 p-6">
              <h3 className="font-bold text-white mb-4">Venue Information</h3>
              <div className="space-y-2 text-sm">
                <p className="text-slate-300">
                  <span className="font-semibold text-white">{hackathon.venue}</span>
                </p>
                <p className="text-slate-400">{hackathon.address}</p>
                <Button variant="outline" size="sm" className="w-full mt-3 text-slate-200 border-slate-600 hover:bg-slate-700">
                  View on Map
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* Related Events */}
        <div className="mt-20 mb-12">
          <h2 className="text-3xl font-bold text-white mb-8">Other Events in {hackathon.city}</h2>
          <p className="text-slate-400">No other events scheduled in this city at the moment.</p>
        </div>
      </div>
    </div>
  );
}
