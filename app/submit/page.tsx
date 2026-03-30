'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { FieldGroup, FieldLabel } from '@/components/ui/field';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cities } from '@/lib/data';

type FormData = {
  name: string;
  city: string;
  date: string;
  endDate: string;
  venue: string;
  address: string;
  format: 'in-person' | 'hybrid';
  description: string;
  maxParticipants: string;
  website: string;
  prizes: string;
  contact: string;
  tags: string;
};

export default function SubmitPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    city: '',
    date: '',
    endDate: '',
    venue: '',
    address: '',
    format: 'in-person',
    description: '',
    maxParticipants: '',
    website: '',
    prizes: '',
    contact: '',
    tags: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.date) newErrors.date = 'Start date is required';
    if (!formData.endDate) newErrors.endDate = 'End date is required';
    if (!formData.venue) newErrors.venue = 'Venue is required';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.description) newErrors.description = 'Description is required';
    if (!formData.maxParticipants) newErrors.maxParticipants = 'Max participants is required';
    if (!formData.website) newErrors.website = 'Website is required';
    if (!formData.contact) newErrors.contact = 'Contact is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          name: '',
          city: '',
          date: '',
          endDate: '',
          venue: '',
          address: '',
          format: 'in-person',
          description: '',
          maxParticipants: '',
          website: '',
          prizes: '',
          contact: '',
          tags: '',
        });
      }, 3000);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4">
        <div className="text-center space-y-6 max-w-md">
          <div className="flex justify-center">
            <CheckCircle className="w-20 h-20 text-green-500" />
          </div>
          <h1 className="text-4xl font-bold text-white">Submitted!</h1>
          <p className="text-lg text-slate-300">
            Thank you for submitting your hackathon event. Our team will review it and it will be published shortly.
          </p>
          <Link href="/">
            <Button className="bg-blue-600 hover:bg-blue-700">
              Return Home
            </Button>
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

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12 space-y-4">
          <h1 className="text-4xl font-bold text-white">Submit Your Hackathon</h1>
          <p className="text-xl text-slate-300">
            Share your hackathon event with Germany&apos;s vibrant tech community. Our team will review and publish your event.
          </p>
        </div>

        {/* Form */}
        <Card className="bg-slate-800/50 border-slate-700 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Event Name */}
            <FieldGroup>
              <FieldLabel htmlFor="name">Event Name *</FieldLabel>
              <Input
                id="name"
                placeholder="e.g., HackBerlin 2026"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="bg-slate-700/50 border-slate-600 text-white"
              />
              {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
            </FieldGroup>

            {/* City and Format */}
            <div className="grid md:grid-cols-2 gap-6">
              <FieldGroup>
                <FieldLabel htmlFor="city">City *</FieldLabel>
                <Select value={formData.city} onValueChange={(value) => handleChange('city', value)}>
                  <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                    <SelectValue placeholder="Select a city" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map(city => (
                      <SelectItem key={city.slug} value={city.name}>
                        {city.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.city && <p className="text-red-400 text-sm mt-1">{errors.city}</p>}
              </FieldGroup>

              <FieldGroup>
                <FieldLabel htmlFor="format">Format *</FieldLabel>
                <Select value={formData.format} onValueChange={(value) => handleChange('format', value as 'in-person' | 'hybrid')}>
                  <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="in-person">In-Person</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </FieldGroup>
            </div>

            {/* Dates */}
            <div className="grid md:grid-cols-2 gap-6">
              <FieldGroup>
                <FieldLabel htmlFor="date">Start Date *</FieldLabel>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleChange('date', e.target.value)}
                  className="bg-slate-700/50 border-slate-600 text-white"
                />
                {errors.date && <p className="text-red-400 text-sm mt-1">{errors.date}</p>}
              </FieldGroup>

              <FieldGroup>
                <FieldLabel htmlFor="endDate">End Date *</FieldLabel>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => handleChange('endDate', e.target.value)}
                  className="bg-slate-700/50 border-slate-600 text-white"
                />
                {errors.endDate && <p className="text-red-400 text-sm mt-1">{errors.endDate}</p>}
              </FieldGroup>
            </div>

            {/* Venue */}
            <FieldGroup>
              <FieldLabel htmlFor="venue">Venue Name *</FieldLabel>
              <Input
                id="venue"
                placeholder="e.g., Berlin Convention Center"
                value={formData.venue}
                onChange={(e) => handleChange('venue', e.target.value)}
                className="bg-slate-700/50 border-slate-600 text-white"
              />
              {errors.venue && <p className="text-red-400 text-sm mt-1">{errors.venue}</p>}
            </FieldGroup>

            {/* Address */}
            <FieldGroup>
              <FieldLabel htmlFor="address">Full Address *</FieldLabel>
              <Input
                id="address"
                placeholder="e.g., Messedamm 22, 14055 Berlin"
                value={formData.address}
                onChange={(e) => handleChange('address', e.target.value)}
                className="bg-slate-700/50 border-slate-600 text-white"
              />
              {errors.address && <p className="text-red-400 text-sm mt-1">{errors.address}</p>}
            </FieldGroup>

            {/* Participants */}
            <FieldGroup>
              <FieldLabel htmlFor="maxParticipants">Max Participants *</FieldLabel>
              <Input
                id="maxParticipants"
                type="number"
                placeholder="e.g., 500"
                value={formData.maxParticipants}
                onChange={(e) => handleChange('maxParticipants', e.target.value)}
                className="bg-slate-700/50 border-slate-600 text-white"
              />
              {errors.maxParticipants && <p className="text-red-400 text-sm mt-1">{errors.maxParticipants}</p>}
            </FieldGroup>

            {/* Description */}
            <FieldGroup>
              <FieldLabel htmlFor="description">Description *</FieldLabel>
              <Textarea
                id="description"
                placeholder="Describe your hackathon event..."
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                className="bg-slate-700/50 border-slate-600 text-white min-h-32"
              />
              {errors.description && <p className="text-red-400 text-sm mt-1">{errors.description}</p>}
            </FieldGroup>

            {/* Tags */}
            <FieldGroup>
              <FieldLabel htmlFor="tags">Tags (comma-separated)</FieldLabel>
              <Input
                id="tags"
                placeholder="e.g., Web3, AI, Sustainability"
                value={formData.tags}
                onChange={(e) => handleChange('tags', e.target.value)}
                className="bg-slate-700/50 border-slate-600 text-white"
              />
              <p className="text-sm text-slate-400">Enter up to 3 tags describing your hackathon</p>
            </FieldGroup>

            {/* Prizes */}
            <FieldGroup>
              <FieldLabel htmlFor="prizes">Prize Pool</FieldLabel>
              <Input
                id="prizes"
                placeholder="e.g., €50,000 in prizes"
                value={formData.prizes}
                onChange={(e) => handleChange('prizes', e.target.value)}
                className="bg-slate-700/50 border-slate-600 text-white"
              />
            </FieldGroup>

            {/* Website */}
            <FieldGroup>
              <FieldLabel htmlFor="website">Website URL *</FieldLabel>
              <Input
                id="website"
                type="url"
                placeholder="https://example.com"
                value={formData.website}
                onChange={(e) => handleChange('website', e.target.value)}
                className="bg-slate-700/50 border-slate-600 text-white"
              />
              {errors.website && <p className="text-red-400 text-sm mt-1">{errors.website}</p>}
            </FieldGroup>

            {/* Contact */}
            <FieldGroup>
              <FieldLabel htmlFor="contact">Contact Email *</FieldLabel>
              <Input
                id="contact"
                type="email"
                placeholder="contact@example.com"
                value={formData.contact}
                onChange={(e) => handleChange('contact', e.target.value)}
                className="bg-slate-700/50 border-slate-600 text-white"
              />
              {errors.contact && <p className="text-red-400 text-sm mt-1">{errors.contact}</p>}
            </FieldGroup>

            {/* Submit Button */}
            <div className="pt-4">
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-6">
                Submit Event for Review
              </Button>
            </div>

            <p className="text-sm text-slate-400 text-center">
              * Required fields. Your event will be reviewed by our team before publication.
            </p>
          </form>
        </Card>
      </div>
    </div>
  );
}
