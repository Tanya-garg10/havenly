'use client';

import { useState } from 'react';
import { ChevronDown, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface FilterSidebarProps {
  onClose?: () => void;
  isOpen?: boolean;
  priceFilter: { min: number; max: number };
  onPriceFilterChange: (price: { min: number; max: number }) => void;
  ratingFilter: number;
  onRatingFilterChange: (rating: number) => void;
  typeFilter: string[];
  onTypeFilterChange: (types: string[]) => void;
}

export function FilterSidebar({
  onClose,
  isOpen = true,
  priceFilter,
  onPriceFilterChange,
  ratingFilter,
  onRatingFilterChange,
  typeFilter,
  onTypeFilterChange,
}: FilterSidebarProps) {
  const [expandedFilters, setExpandedFilters] = useState({
    price: true,
    rating: true,
    type: true,
  });

  const toggleFilter = (filter: keyof typeof expandedFilters) => {
    setExpandedFilters((prev) => ({
      ...prev,
      [filter]: !prev[filter],
    }));
  };

  const propertyTypes = [
    { id: 'Entire Place', label: 'Entire Place' },
    { id: 'Room', label: 'Room' },
    { id: 'Shared Room', label: 'Shared Room' },
  ];

  const ratings = [
    { value: 4.8, label: '4.8+ (Excellent)' },
    { value: 4.5, label: '4.5+ (Very Good)' },
    { value: 4.0, label: '4.0+ (Good)' },
  ];

  const handleTypeCheckboxChange = (typeLabel: string, checked: boolean) => {
    if (checked) {
      onTypeFilterChange([...typeFilter, typeLabel]);
    } else {
      onTypeFilterChange(typeFilter.filter((t) => t !== typeLabel));
    }
  };

  const handleClearAll = () => {
    onPriceFilterChange({ min: 0, max: 1000 });
    onRatingFilterChange(0);
    onTypeFilterChange([]);
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-80 border-r border-border bg-background px-6 py-4 transform transition-transform md:relative md:inset-auto md:w-64 md:transform-none ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Filters</h2>
          <button
            onClick={onClose}
            className="md:hidden p-1 hover:bg-muted rounded transition"
            aria-label="Close filters"
          >
            <X size={20} className="text-foreground" />
          </button>
        </div>

        {/* Price Range Filter */}
        <div className="mb-6 border-b border-border pb-6">
          <button
            onClick={() => toggleFilter('price')}
            className="flex w-full items-center justify-between font-semibold text-foreground hover:text-primary transition"
          >
            <span>Price Range</span>
            <ChevronDown
              size={20}
              className={`transition-transform ${
                expandedFilters.price ? 'rotate-180' : ''
              }`}
            />
          </button>

          {expandedFilters.price && (
            <div className="mt-4 space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">
                  Minimum Price ($)
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-sm">$</span>
                  <Input
                    type="number"
                    value={priceFilter.min}
                    onChange={(e) =>
                      onPriceFilterChange({
                        ...priceFilter,
                        min: Math.max(0, parseInt(e.target.value) || 0),
                      })
                    }
                    className="h-9"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">
                  Maximum Price ($)
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-sm">$</span>
                  <Input
                    type="number"
                    value={priceFilter.max}
                    onChange={(e) =>
                      onPriceFilterChange({
                        ...priceFilter,
                        max: Math.max(0, parseInt(e.target.value) || 0),
                      })
                    }
                    className="h-9"
                  />
                </div>
              </div>

              <input
                type="range"
                min="0"
                max="1000"
                value={priceFilter.max}
                onChange={(e) =>
                  onPriceFilterChange({
                    ...priceFilter,
                    max: parseInt(e.target.value) || 0,
                  })
                }
                className="w-full accent-primary cursor-pointer"
              />
            </div>
          )}
        </div>

        {/* Minimum Rating Filter */}
        <div className="mb-6 border-b border-border pb-6">
          <button
            onClick={() => toggleFilter('rating')}
            className="flex w-full items-center justify-between font-semibold text-foreground hover:text-primary transition"
          >
            <span>Rating</span>
            <ChevronDown
              size={20}
              className={`transition-transform ${
                expandedFilters.rating ? 'rotate-180' : ''
              }`}
            />
          </button>

          {expandedFilters.rating && (
            <div className="mt-4 space-y-2">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="rating"
                  value={0}
                  checked={ratingFilter === 0}
                  onChange={() => onRatingFilterChange(0)}
                  className="h-4 w-4 cursor-pointer accent-primary"
                />
                <span className="text-sm text-foreground">Any rating</span>
              </label>
              {ratings.map((rating) => (
                <label key={rating.value} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="rating"
                    value={rating.value}
                    checked={ratingFilter === rating.value}
                    onChange={() => onRatingFilterChange(rating.value)}
                    className="h-4 w-4 cursor-pointer accent-primary"
                  />
                  <span className="text-sm text-foreground">{rating.label}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Property Type Filter */}
        <div className="mb-6 pb-6 border-b border-border">
          <button
            onClick={() => toggleFilter('type')}
            className="flex w-full items-center justify-between font-semibold text-foreground hover:text-primary transition"
          >
            <span>Property Type</span>
            <ChevronDown
              size={20}
              className={`transition-transform ${
                expandedFilters.type ? 'rotate-180' : ''
              }`}
            />
          </button>

          {expandedFilters.type && (
            <div className="mt-4 space-y-2">
              {propertyTypes.map((type) => (
                <label key={type.id} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={typeFilter.includes(type.id)}
                    onChange={(e) => handleTypeCheckboxChange(type.id, e.target.checked)}
                    className="h-4 w-4 cursor-pointer accent-primary rounded"
                  />
                  <span className="text-sm text-foreground">{type.label}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Clear Filters Button */}
        <Button
          variant="outline"
          className="w-full rounded-full cursor-pointer hover:bg-muted font-medium"
          onClick={handleClearAll}
        >
          Clear All Filters
        </Button>
      </aside>
    </>
  );
}
