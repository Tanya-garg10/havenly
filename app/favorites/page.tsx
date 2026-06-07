'use client';

import { useEffect, useState } from 'react';
import { PropertyCard } from '@/components/PropertyCard';
import { Property } from '@/lib/dummy-data';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { getFavorites } from '@/components/PropertyCard';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Property[]>([]);

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-8">
          Your Favorites
        </h1>

        {favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <h2 className="text-xl font-semibold mb-2">
              No favorites yet
            </h2>
            <p className="text-muted-foreground">
              Start exploring and save properties you love 
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favorites.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
              />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
