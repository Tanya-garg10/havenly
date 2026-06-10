'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, Star } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';

import type { Property } from '@/lib/dummy-data';

interface PropertyCardProps {
  property: Property;
  variant?: 'default' | 'compact';
  priority?: boolean;
}

export const getFavorites = (): Property[] => {
  if (typeof window === 'undefined') return [];

  try {
    return JSON.parse(localStorage.getItem('favorites') || '[]');
  } catch {
    return [];
  }
};

const saveFavorites = (favorites: Property[]) => {
  if (typeof window === 'undefined') return;

  localStorage.setItem('favorites', JSON.stringify(favorites));
};

  export function PropertyCard({
    property,
    variant = 'default',
    priority = false,
  }: PropertyCardProps) {
    const [isSaved, setIsSaved] = useState(false);

    const syncFavoriteStatus = useCallback(() => {
      const favorites = getFavorites();

      setIsSaved(
        favorites.some((item) => item.id === property.id)
      );
    }, [property.id]);

    useEffect(() => {
      syncFavoriteStatus();

      const handleUpdate = () => {
        syncFavoriteStatus();
      };

      window.addEventListener('storage', handleUpdate);
      window.addEventListener('favoritesUpdated', handleUpdate);

      return () => {
        window.removeEventListener('storage', handleUpdate);
        window.removeEventListener('favoritesUpdated', handleUpdate);
      };
    }, [syncFavoriteStatus]);

    const handleSave = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();

      const favorites = getFavorites();

      if (isSaved) {
        const updatedFavorites = favorites.filter(
          (item) => item.id !== property.id
        );

        saveFavorites(updatedFavorites);
        setIsSaved(false);
      } else {
        const alreadyExists = favorites.some(
          (item) => item.id === property.id
        );

        if (!alreadyExists) {
          saveFavorites([...favorites, property]);
        }

        setIsSaved(true);
      }

      window.dispatchEvent(new Event('favoritesUpdated'));
    };

    const isCompact = variant === 'compact';

    return (
      <Link
        href={`/property/${property.id}`}
        className="group block cursor-pointer border-0"
      >
        <div className="flex flex-col gap-3">
          {/* Image */}
          <div
            className={`relative overflow-hidden rounded-[14px] bg-muted ${
              isCompact ? 'aspect-square' : 'aspect-[20/19]'
            }`}
          >
            <Image
              src={property.image}
              alt={property.title}
              fill
              priority={priority}
              sizes={
                isCompact
                  ? '(max-width: 768px) 50vw, 25vw'
                  : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
              }
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />

            {/* Badge */}
            <div className="absolute left-3 top-3 rounded-full border border-black/5 bg-white px-3 py-1 text-[13px] font-medium text-foreground shadow-md">
              Guest favourite
            </div>

            {/* Favorite Button */}
            <button
              type="button"
              onClick={handleSave}
              aria-label={
                isSaved ? 'Remove from favorites' : 'Save property'
              }
              className="absolute right-3 top-3 flex items-center justify-center p-2 transition-transform hover:scale-105"
            >
              <Heart
                size={24}
                className={`drop-shadow-md transition-colors ${
                  isSaved
                    ? 'fill-primary text-primary'
                    : 'fill-black/30 text-white stroke-[1.5]'
                }`}
              />
            </button>
          </div>

          {/* Content */}
          <div className="mt-1 flex flex-col gap-0.5">
            <h3
              className={`truncate font-semibold leading-tight text-foreground ${
                isCompact ? 'text-sm' : 'text-[15px]'
              }`}
            >
              {property.title}
            </h3>

            <p
              className={`flex items-center truncate leading-tight text-muted-foreground ${
                isCompact ? 'text-sm' : 'text-[15px]'
              }`}
            >
              <span className="text-foreground">
                ₹{Math.round(property.pricePerNight*100).toLocaleString()} for 2 nights
              </span>

              <span className="mx-1.5 font-bold">·</span>

              <span className="flex items-center gap-1">
                <Star
                  size={11}
                  className="fill-foreground text-foreground"
                />
                {property.rating.toFixed(2)}
              </span>
            </p>
          </div>
        </div>
      </Link>
    );
  }
