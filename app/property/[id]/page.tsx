'use client';

import React, { use, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Navbar } from '@/components/Navbar';
import { ImageGallery } from '@/components/ImageGallery';
import { BookingSidebar } from '@/components/BookingSidebar';
import { ReviewCard } from '@/components/ReviewCard';
import { ReviewForm } from '@/components/ReviewForm';
import {
  Property,
  reviews,
  hosts,
  amenities as allAmenities,
} from '@/lib/dummy-data';
import { getStoredProperties } from '@/lib/properties';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  Star,
  MapPin,
  Users,
  Bed,
  Bath,
  Share2,
  Heart,
} from 'lucide-react';
import {
  Wifi,
  UtensilsCrossed,
  Wind,
  Waves,
  ParkingCircle,
  Droplet,
  Flame,
  Tv,
  Laptop,
  PawPrint,
  Flower,
} from 'lucide-react';

const amenityIconMap: Record<string, React.ReactNode> = {
  wifi: <Wifi size={20} />,
  kitchen: <UtensilsCrossed size={20} />,
  ac: <Wind size={20} />,
  pool: <Waves size={20} />,
  parking: <ParkingCircle size={20} />,
  washer: <Droplet size={20} />,
  dryer: <Wind size={20} />,
  heating: <Flame size={20} />,
  tv: <Tv size={20} />,
  workspace: <Laptop size={20} />,
  pets: <PawPrint size={20} />,
  garden: <Flower size={20} />,
};

export default function PropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { toast } = useToast();
  const [property, setProperty] = useState<Property | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const allProps = getStoredProperties();
    const found = allProps.find((p) => p.id === id);
    setProperty(found);
    setLoading(false);
  }, [id]);

  const host = property ? hosts.find((h) => h.id === property.hostId) : null;
  const propertyReviews = property
    ? reviews.filter((r) => r.propertyId === property.id)
    : [];

  const [userReviews, setUserReviews] = useState<typeof propertyReviews>([]);

  useEffect(() => {
    if (!property) return;
    try {
      const stored = localStorage.getItem(`havenly-reviews-${property.id}`);
      if (stored) {
        const parsed = JSON.parse(stored).map((r: Record<string, unknown>) => ({
          ...r,
          createdAt: new Date(r.createdAt as string),
        }));
        setUserReviews(parsed);
      }
    } catch {}
  }, [property]);

  const handleReviewSubmit = useCallback(
    (review: (typeof propertyReviews)[number]) => {
      setUserReviews((prev) => {
        const updated = [review, ...prev];
        localStorage.setItem(`havenly-reviews-${review.propertyId}`, JSON.stringify(updated));
        return updated;
      });
      toast({ title: 'Review submitted!', description: 'Thank you for your feedback.' });
    },
    [toast]
  );

  const allReviews = [...userReviews, ...propertyReviews];

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center py-20">
          <p className="text-muted-foreground">Loading property details...</p>
        </div>
      </div>
    );
  }

  if (!property || !host) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center py-20">
          <h1 className="text-2xl font-bold text-foreground">
            Property not found
          </h1>
        </div>
      </div>
    );
  }

  const propertyAmenities = property.amenities
    .map((id) => allAmenities.find((a) => a.id === id))
    .filter(Boolean);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6 flex items-start justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              {property.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Star size={18} className="fill-foreground text-foreground" />
                <span className="font-semibold">
                  {property.rating.toFixed(2)}
                </span>
                <span className="text-muted-foreground">
                  ({property.reviewCount} reviews)
                </span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <MapPin size={18} />
                <span>
                  {property.location.city}, {property.location.state},{' '}
                  {property.location.country}
                </span>
              </div>
            </div>
          </div>

          {/* Share and Save Buttons */}
          <div className="flex gap-2 flex-shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                toast({ title: 'Link copied to clipboard!' });
              }}
            >
              <Share2 size={16} />
            </Button>
            <Button variant="outline" size="sm">
              <Heart size={16} />
            </Button>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="mb-12">
          <ImageGallery images={property.images} title={property.title} />
        </div>

        {/* Content Grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Property Overview */}
            <Card className="p-6 border-border">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                {property.type} hosted by {host.name}
              </h2>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                <div>
                  <div className="text-muted-foreground text-sm mb-1">Guests</div>
                  <div className="flex items-center gap-2 font-semibold text-foreground">
                    <Users size={18} />
                    {property.capacity.guests}
                  </div>
                </div>
                <div>
                  <div className="text-muted-foreground text-sm mb-1">Bedrooms</div>
                  <div className="font-semibold text-foreground">
                    {property.capacity.bedrooms}
                  </div>
                </div>
                <div>
                  <div className="text-muted-foreground text-sm mb-1">Beds</div>
                  <div className="flex items-center gap-2 font-semibold text-foreground">
                    <Bed size={18} />
                    {property.capacity.beds}
                  </div>
                </div>
                <div>
                  <div className="text-muted-foreground text-sm mb-1">Bathrooms</div>
                  <div className="flex items-center gap-2 font-semibold text-foreground">
                    <Bath size={18} />
                    {property.capacity.bathrooms}
                  </div>
                </div>
              </div>
            </Card>

            {/* Description */}
            <div>
              <h3 className="text-xl font-bold text-foreground mb-3">About</h3>
              <p className="text-base leading-relaxed text-foreground">
                {property.description}
              </p>
            </div>

            {/* Host Info */}
            <Card className="p-6 border-border">
              <h3 className="text-xl font-bold text-foreground mb-4">Meet your host</h3>
              <div className="flex items-start gap-4">
                <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full bg-muted">
                  <Image
                    src={host.avatar}
                    alt={host.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-foreground">
                    {host.name}
                  </h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Joined {host.joinedDate.getFullYear()}
                  </p>
                  <p className="text-sm text-foreground mb-4">{host.bio}</p>
                  <div className="space-y-2 text-sm">
                    {host.responseRate && (
                      <p className="text-foreground">
                        <span className="font-semibold">{host.responseRate}%</span>{' '}
                        response rate
                      </p>
                    )}
                    {host.responseTime && (
                      <p className="text-foreground">
                        Responds within{' '}
                        <span className="font-semibold">{host.responseTime}</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </Card>

            {/* Amenities */}
            <div>
              <h3 className="text-xl font-bold text-foreground mb-4">Amenities</h3>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                {propertyAmenities.map((amenity) => (
                  <div
                    key={amenity?.id}
                    className="flex items-center gap-3 rounded-lg border border-border p-4"
                  >
                    <div className="text-primary">
                      {amenityIconMap[amenity?.id || '']}
                    </div>
                    <span className="font-medium text-foreground">
                      {amenity?.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div>
              <h3 className="text-xl font-bold text-foreground mb-4">
                Reviews ({allReviews.length})
              </h3>
              <div className="space-y-4">
                {allReviews.length > 0 ? (
                  allReviews.map((review) => (
                    <ReviewCard key={review.id} review={review} />
                  ))
                ) : (
                  <p className="text-muted-foreground">No reviews yet. Be the first to share your experience!</p>
                )}
              </div>
              <ReviewForm propertyId={property.id} onSubmit={handleReviewSubmit} />
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <BookingSidebar property={property} />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-muted py-12 mt-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-muted-foreground">
            © 2026 Havenly, Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
