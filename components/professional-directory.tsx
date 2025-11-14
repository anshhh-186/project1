'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface Professional {
  id: string
  name: string
  specialty: string
  credentials: string
  bio: string
  availableOnline: boolean
  insurance: string[]
  rating: number
  reviews: number
}

export default function ProfessionalDirectory() {
  const [professionals] = useState<Professional[]>([
    {
      id: '1',
      name: 'Dr. Sarah Mitchell',
      specialty: 'Clinical Psychologist',
      credentials: 'Ph.D., Licensed Clinical Psychologist',
      bio: 'Specializes in anxiety, depression, and cognitive behavioral therapy. 15+ years of experience.',
      availableOnline: true,
      insurance: ['Blue Cross', 'Aetna', 'United'],
      rating: 4.9,
      reviews: 87,
    },
    {
      id: '2',
      name: 'James Rodriguez',
      specialty: 'Licensed Therapist',
      credentials: 'LCSW, Certified Mindfulness Instructor',
      bio: 'Focuses on stress management, work-life balance, and life transitions. Offers both individual and couples therapy.',
      availableOnline: true,
      insurance: ['Blue Cross', 'Cigna', 'United'],
      rating: 4.8,
      reviews: 64,
    },
    {
      id: '3',
      name: 'Dr. Emily Chen',
      specialty: 'Psychiatrist',
      credentials: 'M.D., Board Certified Psychiatrist',
      bio: 'Specializes in medication management and complex mental health conditions. Works collaboratively with therapists.',
      availableOnline: false,
      insurance: ['Blue Cross', 'Aetna', 'Cigna', 'United'],
      rating: 4.7,
      reviews: 92,
    },
    {
      id: '4',
      name: 'Lisa Thompson',
      specialty: 'Mental Health Counselor',
      credentials: 'M.A., Licensed Mental Health Counselor',
      bio: 'Helps clients with personal growth, goal-setting, and navigating life challenges. Trauma-informed practice.',
      availableOnline: true,
      insurance: ['Blue Cross', 'UnitedHealth'],
      rating: 4.9,
      reviews: 78,
    },
  ])

  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all')

  const specialties = ['all', 'Psychologist', 'Therapist', 'Psychiatrist', 'Counselor']

  const filtered = selectedSpecialty === 'all'
    ? professionals
    : professionals.filter((p) => p.specialty.includes(selectedSpecialty))

  return (
    <div className="space-y-6">
      {/* Info Section */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="text-2xl">👨‍⚕️</div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Find Professional Support</h3>
              <p className="text-sm text-muted-foreground">
                Connect with licensed mental health professionals. All professionals are verified and provide confidential, evidence-based care.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {specialties.map((specialty) => (
          <button
            key={specialty}
            onClick={() => setSelectedSpecialty(specialty)}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
              selectedSpecialty === specialty
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted hover:bg-muted/80 text-foreground'
            }`}
          >
            {specialty === 'all' ? 'All Professionals' : specialty}
          </button>
        ))}
      </div>

      {/* Professionals List */}
      <div className="space-y-4">
        {filtered.map((professional) => (
          <Card key={professional.id} className="border-primary/10 hover:border-primary/30 transition-colors">
            <CardContent className="pt-6">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground">{professional.name}</h3>
                    <p className="text-sm text-primary font-medium">{professional.specialty}</p>
                    <p className="text-xs text-muted-foreground mt-1">{professional.credentials}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1">
                      <span className="text-lg">⭐</span>
                      <span className="font-semibold text-foreground">{professional.rating}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{professional.reviews} reviews</p>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-sm text-foreground/80">{professional.bio}</p>

                {/* Details */}
                <div className="grid grid-cols-2 gap-4 py-3 border-y border-border">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-1">Availability</p>
                    <p className="text-sm text-foreground">
                      {professional.availableOnline ? '✅ Online Available' : '📍 In-Person Only'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-1">Insurance</p>
                    <p className="text-sm text-foreground">{professional.insurance.slice(0, 2).join(', ')}...</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">
                    Schedule Appointment
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Learn More
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Important Info */}
      <Card className="border-primary/10">
        <CardHeader>
          <CardTitle className="text-base">Important Information</CardTitle>
        </CardHeader>
        <CardContent className="text-sm space-y-3 text-foreground/80">
          <div>
            <p className="font-medium text-foreground mb-1">Emergency Support</p>
            <p>If you're in crisis, please call 988 (Suicide & Crisis Lifeline) or text "HELLO" to 741741 (Crisis Text Line).</p>
          </div>
          <div>
            <p className="font-medium text-foreground mb-1">Privacy & Confidentiality</p>
            <p>All therapy sessions are confidential and protected by law. Exceptions include imminent danger to self or others.</p>
          </div>
          <div>
            <p className="font-medium text-foreground mb-1">MindFlow Support</p>
            <p>MindFlow is not a substitute for professional mental health care. Always consult with licensed professionals for diagnosis and treatment.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
