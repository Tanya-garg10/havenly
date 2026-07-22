'use client';

import { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { FilterSidebar } from '@/components/FilterSidebar';
import { PropertyCard } from '@/components/PropertyCard';
import { Button } from '@/components/ui/button';
import { Property } from '@/lib/dummy-data';
import { getStoredProperties } from '@/lib/properties';
import { Menu, ArrowUpDown, Map as MapIcon, List as ListIcon, X } from 'lucide-react';
import dynamic from 'next/dynamic';
import MapPlaceholder from '@/components/MapPlaceholder';
import Link from 'next/link';

type SortOption = 'featured' | 'price-low' | 'price-high' | 'rating';

// Dynamically import map component with no SSR to bypass window object check on build time
const MapComponent = dynamic(() => import('@/components/MapComponent'), {
  ssr: false,
  loading: () => <MapPlaceholder />,
});

export default function PropertiesPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [priceFilter, setPriceFilter] = useState({ min: 0, max: 1000 });
  const [ratingFilter, setRatingFilter] = useState(0);
  const [typeFilter, setTypeFilter] = useState<string[]>([]);
  const [propertyList, setPropertyList] = useState<Property[]>(getStoredProperties());

  // Geographical Map State
  const [showMap, setShowMap] = useState(true);
  const [hoveredPropertyId, setHoveredPropertyId] = useState<string | null>(null);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);
  const [mapBounds, setMapBounds] = useState<any | null>(null);

  useEffect(() => {
    setPropertyList(getStoredProperties());

    const handleUpdate = () => {
      setPropertyList(getStoredProperties());
    };

    window.addEventListener('propertiesUpdated', handleUpdate);
    return () => {
      window.removeEventListener('propertiesUpdated', handleUpdate);
    };
  }, []);

  // Filter properties
  const filtered = propertyList.filter((p) => {
    const matchesPrice =
      p.pricePerNight >= priceFilter.min && p.pricePerNight <= priceFilter.max;
    const matchesRating = p.rating >= ratingFilter;
    const matchesType = typeFilter.length === 0 || typeFilter.includes(p.type);
    
    // Viewport bounds filter
    const matchesBounds = mapBounds
      ? mapBounds.contains([p.location.coordinates.lat, p.location.coordinates.lng])
      : true;

    return matchesPrice && matchesRating && matchesType && matchesBounds;
  });

  // Sort properties
  const sorted = [...filtered].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.pricePerNight - b.pricePerNight;
      case 'price-high':
        return b.pricePerNight - a.pricePerNight;
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  // Handle marker selection from map: Highlights listing and scrolls it into view
  const handlePropertySelect = (property: Property) => {
    setSelectedPropertyId(property.id);
    const element = document.getElementById(`property-card-${property.id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  const selectedProperty = propertyList.find((p) => p.id === selectedPropertyId);

  return (
    <main className="min-h-screen bg-background flex flex-col h-screen overflow-hidden">
      <Navbar />

      <div className="flex flex-1 h-[calc(100vh-80px)] relative overflow-hidden">
        {/* Sidebar Filter Panel */}
        <FilterSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          priceFilter={priceFilter}
          onPriceFilterChange={setPriceFilter}
          ratingFilter={ratingFilter}
          onRatingFilterChange={setRatingFilter}
          typeFilter={typeFilter}
          onTypeFilterChange={setTypeFilter}
        />

        {/* Main Workspace Layout */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Info and Control Bar */}
          <div className="border-b border-border bg-background px-6 py-4 flex items-center justify-between gap-4 flex-wrap shrink-0">
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-foreground leading-tight">
                Explore Stays
              </h1>
              <p className="text-muted-foreground text-xs mt-0.5">
                {sorted.length} homes available {mapBounds ? 'in current map area' : ''}
              </p>
            </div>

            <div className="flex gap-2.5 flex-wrap items-center">
              {/* Filter Button - Mobile */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="md:hidden rounded-full font-medium"
              >
                <Menu size={14} className="mr-1.5" />
                Filters
              </Button>

              {/* Sort Dropdown */}
              <div className="relative">
                <button className="flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-xs font-semibold text-foreground hover:bg-muted transition cursor-pointer">
                  <ArrowUpDown size={14} />
                  <span>Sort By</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rating</option>
                  </select>
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Split Pane Container */}
          <div className="flex-1 flex overflow-hidden relative">
            
            {/* Split Left Column: Listings List */}
            <div
              className={`h-full overflow-y-auto px-6 py-6 transition-all duration-300 ${
                showMap 
                  ? 'w-full md:w-[55%] lg:w-[60%] shrink-0' 
                  : 'w-full'
              } ${showMap ? 'hidden md:block' : 'block'}`}
            >
              {sorted.length > 0 ? (
                <div
                  className={`grid gap-6 ${
                    showMap
                      ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3'
                      : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
                  }`}
                >
                  {sorted.map((property, index) => (
                    <div
                      key={property.id}
                      id={`property-card-${property.id}`}
                      onMouseEnter={() => setHoveredPropertyId(property.id)}
                      onMouseLeave={() => setHoveredPropertyId(null)}
                      onClick={() => setSelectedPropertyId(property.id)}
                      className={`transition-all duration-200 rounded-[18px] p-1.5 border-2 ${
                        selectedPropertyId === property.id
                          ? 'border-primary bg-primary/5 shadow-md scale-[1.01]'
                          : 'border-transparent'
                      }`}
                    >
                      <PropertyCard property={property} priority={index < 4} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center px-4">
                  <div className="max-w-xs">
                    <h2 className="text-xl font-bold text-foreground mb-1">
                      No matches found
                    </h2>
                    <p className="text-muted-foreground text-sm">
                      Try clearing filters, searching another location, or adjusting price thresholds.
                    </p>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setPriceFilter({ min: 0, max: 1000 });
                        setRatingFilter(0);
                        setTypeFilter([]);
                        setMapBounds(null);
                      }}
                      className="mt-4 rounded-full"
                    >
                      Reset All Filters
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Split Right Column: Dynamic Leaflet Map */}
            <div
              className={`h-full relative overflow-hidden transition-all duration-300 ${
                showMap 
                  ? 'flex-1 p-4 h-full' 
                  : 'w-0 hidden pointer-events-none'
              } ${showMap ? 'block w-full h-full' : ''}`}
            >
              <MapComponent
                properties={sorted}
                hoveredPropertyId={hoveredPropertyId}
                selectedPropertyId={selectedPropertyId}
                onPropertySelect={handlePropertySelect}
                onBoundsChange={setMapBounds}
                onResetBounds={() => setMapBounds(null)}
                isBoundsFiltered={!!mapBounds}
              />

              {/* Mobile Single Property Preview Card Overlay */}
              {showMap && selectedProperty && (
                <div className="absolute bottom-6 inset-x-4 z-20 md:hidden animate-in slide-in-from-bottom-6 duration-300">
                  <div className="relative bg-background rounded-2xl border border-border shadow-2xl p-3.5 flex gap-4 max-w-md mx-auto">
                    <Link href={`/property/${selectedProperty.id}`} className="relative h-20 w-28 shrink-0 overflow-hidden rounded-xl bg-muted block">
                      <img
                        src={selectedProperty.image}
                        alt={selectedProperty.title}
                        className="h-full w-full object-cover"
                      />
                    </Link>
                    <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                      <div>
                        <Link href={`/property/${selectedProperty.id}`} className="block">
                          <h4 className="font-bold text-sm truncate text-foreground hover:underline pr-6 leading-tight">
                            {selectedProperty.title}
                          </h4>
                        </Link>
                        <p className="text-xs text-muted-foreground truncate mt-0.5">
                          {selectedProperty.location.city}, {selectedProperty.location.state}
                        </p>
                      </div>
                      <div className="flex justify-between items-end">
                        <span className="font-bold text-sm text-foreground">
                          ₹{Math.round(selectedProperty.pricePerNight * 100).toLocaleString()}{' '}
                          <span className="font-normal text-[10px] text-muted-foreground">/ night</span>
                        </span>
                        <span className="flex items-center gap-0.5 text-xs font-semibold text-foreground">
                          <span className="text-primary font-bold text-sm">★</span>{' '}
                          {selectedProperty.rating.toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedPropertyId(null)}
                      aria-label="Close preview"
                      className="absolute top-2 right-2 p-1 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              )}
            </div>
            
          </div>
        </div>
      </div>

      {/* Floating Pill Toggle Button (Airbnb Style "Show Map / Show List") */}
      <button
        onClick={() => setShowMap(!showMap)}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 shadow-xl rounded-full bg-slate-900 dark:bg-slate-100 hover:scale-[1.04] active:scale-[0.96] text-white dark:text-black font-semibold text-xs py-3 px-5 flex items-center gap-2 transition-all cursor-pointer border border-white/10 dark:border-black/5"
      >
        {showMap ? (
          <>
            <ListIcon size={14} className="stroke-[2.5]" />
            <span>Show List</span>
          </>
        ) : (
          <>
            <MapIcon size={14} className="stroke-[2.5]" />
            <span>Show Map</span>
          </>
        )}
      </button>
    </main>
  );
}
