'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Booking, Property } from '@/lib/dummy-data';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Users, MapPin, MessageSquare } from 'lucide-react';
import { useCallback } from 'react';

interface BookingCardProps {
  booking: Booking;
  property: Property;
  priority?: boolean;
  onCancel?: (id: string) => void;
}

export function BookingCard({ booking, property, priority = false, onCancel }: BookingCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-muted text-foreground';
    }
  };

  const getStatusLabel = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const checkInDate = booking.checkIn.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const checkOutDate = booking.checkOut.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const nights = Math.ceil(
    (booking.checkOut.getTime() - booking.checkIn.getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <Card className="overflow-hidden border-border hover:shadow-lg transition-shadow">
      <div className="flex flex-col md:flex-row">
        {/* Property Image */}
        <div className="relative h-48 w-full md:h-auto md:w-48 flex-shrink-0 bg-muted">
          <Image
            src={property.image}
            alt={property.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 200px"
            priority={priority}
          />
        </div>

        {/* Content */}
        <div className="flex flex-col justify-between p-4 md:p-6 flex-1">
          {/* Title and Status */}
          <div className="mb-4">
            {/* Cancel button will be rendered in actions */}
            <div className="flex items-start justify-between gap-4 mb-2">
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-1">
                  {property.title}
                </h3>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <MapPin size={16} />
                  {property.location.city}, {property.location.state}
                </p>
              </div>
              <span
                className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                  booking.status
                )}`}
              >
                {getStatusLabel(booking.status)}
              </span>
            </div>
          </div>

          {/* Booking Details */}
          <div className="mb-4 space-y-2 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar size={16} />
              <span>
                {checkInDate} to {checkOutDate}
              </span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users size={16} />
              <span>{booking.guests} guest{booking.guests !== 1 ? 's' : ''} • {nights} night{nights !== 1 ? 's' : ''}</span>
            </div>
            <div className="text-lg font-semibold text-foreground">
              ${booking.totalPrice} total
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-4 border-t border-border">
            <Link href={`/property/${property.id}`} className="flex-1">
              <Button variant="outline" className="w-full">
                View Property
              </Button>
            </Link>
            {booking.status === 'confirmed' || booking.status === 'upcoming' ? (
              <Button
                variant="destructive"
                size="sm"
                className="flex-shrink-0"
                onClick={() => {
                  if (window.confirm('Are you sure you want to cancel this booking? This action cannot be undone.')) {
                    onCancel && onCancel(booking.id);
                  }
                }}
              >
                Cancel
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </Card>
  );
}
