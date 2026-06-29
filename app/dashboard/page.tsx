'use client';

import { Navbar } from '@/components/Navbar';
import { DashboardTabs } from '@/components/DashboardTabs';
import { BookingCard } from '@/components/BookingCard';
import { bookings, properties, currentUser } from '@/lib/dummy-data';
import { Card } from '@/components/ui/card';
import { useState } from 'react';

export default function DashboardPage() {
  const [bookingList, setBookingList] = useState(bookings);

  // Separate bookings by status
  const upcomingBookings = bookingList.filter((b) => b.status === 'upcoming' || b.status === 'confirmed');
  const pastBookings = bookingList.filter((b) => b.status === 'completed' || b.status === 'cancelled');

  const getTabs = () => [
    {
      id: 'upcoming',
      label: `Upcoming (${upcomingBookings.length})`,
      content: (
        <div className="space-y-4">
          {upcomingBookings.length > 0 ? (
            upcomingBookings.map((booking, index) => {
              const property = properties.find((p) => p.id === booking.propertyId);
              if (!property) return null;
              return (
                <BookingCard
                  key={booking.id}
                  booking={booking}
                  property={property}
                  priority={index < 2}
                  onCancel={(id) => {
                    setBookingList((prev) =>
                      prev.map((b) => (b.id === id ? { ...b, status: 'cancelled' } : b))
                    );
                  }}
                />
              );
            })
          ) : (
            <Card className="p-8 border-border text-center">
              <p className="text-muted-foreground">No upcoming bookings</p>
            </Card>
          )}
        </div>
      ),
    },
    {
      id: 'past',
      label: `Past (${pastBookings.length})`,
      content: (
        <div className="space-y-4">
          {pastBookings.length > 0 ? (
            pastBookings.map((booking, index) => {
              const property = properties.find((p) => p.id === booking.propertyId);
              if (!property) return null;
              return (
                <BookingCard
                  key={booking.id}
                  booking={booking}
                  property={property}
                  priority={index < 2}
                  onCancel={(id) => {
                    setBookingList((prev) =>
                      prev.map((b) => (b.id === id ? { ...b, status: 'cancelled' } : b))
                    );
                  }}
                />
              );
            })
          ) : (
            <Card className="p-8 border-border text-center">
              <p className="text-muted-foreground">No past bookings</p>
            </Card>
          )}
        </div>
      ),
    },
  ];

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            My Bookings
          </h1>
          <p className="text-muted-foreground">
            Welcome back, {currentUser.name}!
          </p>
        </div>

        {/* User Info Card */}
        <Card className="p-6 md:p-8 border-border mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-2">
                {currentUser.name}
              </h2>
              <p className="text-muted-foreground mb-4">
                Member since {currentUser.joinedDate.getFullYear()}
              </p>
              <p className="text-foreground text-sm">
                {currentUser.email}
              </p>
            </div>
            <button className="px-6 py-2 rounded-lg border border-border text-foreground hover:bg-muted transition font-medium">
              Edit Profile
            </button>
          </div>
        </Card>

        {/* Bookings Tabs */}
        <DashboardTabs tabs={getTabs()} defaultTab="upcoming" />
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
