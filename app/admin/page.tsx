'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { CheckCircle, XCircle, Calendar, MapPin, Mail, Globe, ArrowLeft, AlertCircle } from 'lucide-react';
import { getAllApprovedHackathons, hackathons } from '@/lib/data';
import type { Hackathon } from '@/lib/data';

export default function AdminPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const approvedHackathons = getAllApprovedHackathons();
  const pendingHackathons = hackathons.filter(h => !h.approved);

  const filteredPending = pendingHackathons.filter(h => 
    h.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    h.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredApproved = approvedHackathons.filter(h => 
    h.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    h.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Navigation */}
      <nav className="border-b border-slate-800 bg-slate-950/50 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <h2 className="text-lg font-semibold text-white">Admin Panel</h2>
          <div className="w-16" />
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8 space-y-4">
          <h1 className="text-4xl font-bold text-white">Admin Dashboard</h1>
          <p className="text-lg text-slate-300">Manage and moderate hackathon submissions</p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-slate-800/50 border-slate-700 p-6">
            <div className="text-3xl font-bold text-blue-400 mb-2">{approvedHackathons.length}</div>
            <p className="text-slate-300">Published Events</p>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700 p-6">
            <div className="text-3xl font-bold text-yellow-400 mb-2">{pendingHackathons.length}</div>
            <p className="text-slate-300">Pending Review</p>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700 p-6">
            <div className="text-3xl font-bold text-green-400 mb-2">
              {approvedHackathons.reduce((sum, h) => sum + h.registeredParticipants, 0)}
            </div>
            <p className="text-slate-300">Total Registrations</p>
          </Card>
        </div>

        {/* Search */}
        <div className="mb-8">
          <Input
            placeholder="Search by event name or city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-slate-700/50 border-slate-600 text-white max-w-md"
          />
        </div>

        {/* Tabs */}
        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList className="bg-slate-800 border border-slate-700">
            <TabsTrigger value="pending" className="text-white data-[state=active]:bg-blue-600">
              <AlertCircle className="w-4 h-4 mr-2" />
              Pending ({pendingHackathons.length})
            </TabsTrigger>
            <TabsTrigger value="published" className="text-white data-[state=active]:bg-blue-600">
              <CheckCircle className="w-4 h-4 mr-2" />
              Published ({approvedHackathons.length})
            </TabsTrigger>
          </TabsList>

          {/* Pending Tab */}
          <TabsContent value="pending" className="space-y-4">
            {pendingHackathons.length === 0 ? (
              <Card className="bg-slate-800/50 border-slate-700 p-12 text-center">
                <p className="text-slate-300 text-lg">No pending submissions to review</p>
              </Card>
            ) : (
              filteredPending.map((hackathon) => (
                <PendingEventCard key={hackathon.id} hackathon={hackathon} />
              ))
            )}
          </TabsContent>

          {/* Published Tab */}
          <TabsContent value="published" className="space-y-4">
            {approvedHackathons.length === 0 ? (
              <Card className="bg-slate-800/50 border-slate-700 p-12 text-center">
                <p className="text-slate-300 text-lg">No published events yet</p>
              </Card>
            ) : (
              filteredApproved.map((hackathon) => (
                <PublishedEventCard key={hackathon.id} hackathon={hackathon} />
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function PendingEventCard({ hackathon }: { hackathon: Hackathon }) {
  const [approved, setApproved] = useState(false);
  const [rejected, setRejected] = useState(false);

  if (approved) {
    return (
      <Card className="bg-green-500/10 border-green-500/30 p-6">
        <div className="flex items-center gap-3">
          <CheckCircle className="w-6 h-6 text-green-500" />
          <div>
            <p className="font-semibold text-white">{hackathon.name}</p>
            <p className="text-sm text-slate-400">✓ Approved</p>
          </div>
        </div>
      </Card>
    );
  }

  if (rejected) {
    return (
      <Card className="bg-red-500/10 border-red-500/30 p-6">
        <div className="flex items-center gap-3">
          <XCircle className="w-6 h-6 text-red-500" />
          <div>
            <p className="font-semibold text-white">{hackathon.name}</p>
            <p className="text-sm text-slate-400">✗ Rejected</p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="bg-slate-800/50 border-slate-700 p-6 space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-xl font-bold text-white">{hackathon.name}</h3>
          <p className="text-sm text-slate-400 mt-1">{hackathon.city}</p>
        </div>
        <Badge className="bg-yellow-600">Pending</Badge>
      </div>

      {/* Event Details */}
      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2 text-slate-300">
          <Calendar className="w-4 h-4 text-blue-400" />
          <span>{new Date(hackathon.date).toLocaleDateString('de-DE')} - {new Date(hackathon.endDate).toLocaleDateString('de-DE')}</span>
        </div>
        <div className="flex items-center gap-2 text-slate-300">
          <MapPin className="w-4 h-4 text-blue-400" />
          <span>{hackathon.venue}</span>
        </div>
        <div className="flex items-center gap-2 text-slate-300">
          <Mail className="w-4 h-4 text-blue-400" />
          <a href={`mailto:${hackathon.contact}`} className="hover:text-blue-400 transition-colors">
            {hackathon.contact}
          </a>
        </div>
        <div className="flex items-center gap-2 text-slate-300">
          <Globe className="w-4 h-4 text-blue-400" />
          <a href={hackathon.website} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
            {hackathon.website}
          </a>
        </div>
      </div>

      {/* Description Preview */}
      <div className="bg-slate-700/30 p-3 rounded text-sm text-slate-300 border border-slate-700">
        <p className="font-semibold text-white mb-2">Description</p>
        <p>{hackathon.description}</p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4">
        <Button 
          onClick={() => setApproved(true)}
          className="bg-green-600 hover:bg-green-700 flex-1"
        >
          <CheckCircle className="w-4 h-4 mr-2" />
          Approve
        </Button>
        <Button 
          onClick={() => setRejected(true)}
          variant="outline"
          className="border-red-600 text-red-400 hover:bg-red-500/10 flex-1"
        >
          <XCircle className="w-4 h-4 mr-2" />
          Reject
        </Button>
      </div>
    </Card>
  );
}

function PublishedEventCard({ hackathon }: { hackathon: Hackathon }) {
  return (
    <Card className="bg-slate-800/50 border-slate-700 p-6 space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-xl font-bold text-white">{hackathon.name}</h3>
          <p className="text-sm text-slate-400 mt-1">{hackathon.city}</p>
        </div>
        <Badge className="bg-green-600">Published</Badge>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-slate-700/30 p-3 rounded text-center">
          <div className="text-lg font-semibold text-blue-400">{hackathon.registeredParticipants}</div>
          <p className="text-xs text-slate-400">Registered</p>
        </div>
        <div className="bg-slate-700/30 p-3 rounded text-center">
          <div className="text-lg font-semibold text-blue-400">{hackathon.maxParticipants}</div>
          <p className="text-xs text-slate-400">Capacity</p>
        </div>
        <div className="bg-slate-700/30 p-3 rounded text-center">
          <div className="text-lg font-semibold text-blue-400">
            {Math.round((hackathon.registeredParticipants / hackathon.maxParticipants) * 100)}%
          </div>
          <p className="text-xs text-slate-400">Full</p>
        </div>
      </div>

      {/* Event Details */}
      <div className="space-y-2 text-sm text-slate-300">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-blue-400" />
          <span>{new Date(hackathon.date).toLocaleDateString('de-DE')} - {new Date(hackathon.endDate).toLocaleDateString('de-DE')}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-blue-400" />
          <span>{hackathon.venue}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <Link href={`/hackathon/${hackathon.id}`} className="flex-1">
          <Button variant="outline" className="w-full border-slate-600 text-white hover:bg-slate-700">
            View Event
          </Button>
        </Link>
        <Button variant="outline" className="border-red-600 text-red-400 hover:bg-red-500/10">
          Unpublish
        </Button>
      </div>
    </Card>
  );
}
