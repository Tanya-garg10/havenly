'use client';

import { useState, useRef } from 'react';
import { Navbar } from '@/components/Navbar';
import { PropertyCard } from '@/components/PropertyCard';
import { properties, Property } from '@/lib/dummy-data';
import Image from 'next/image';

interface PropertySectionProps {
  title: string;
  items: Property[];
  locationName: string;
}

function PropertySection({ title, items, locationName }: PropertySectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 600;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 cursor-pointer group">
          <h2 className="text-[22px] font-semibold text-foreground tracking-tight">{title}</h2>
          <span className="text-foreground transition-transform group-hover:translate-x-0.5">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
          </span>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={() => scroll('left')}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-black/10 bg-white shadow-sm hover:shadow-md hover:scale-[1.04] transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
          </button>
          <button
            onClick={() => scroll('right')}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-black/10 bg-white shadow-sm hover:shadow-md hover:scale-[1.04] transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-4 sm:gap-6 pb-4 sm:pb-6 snap-x snap-mandatory hide-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0"
      >
        {items.map((property, index) => (
          <div key={property.id} className="min-w-[85vw] sm:min-w-[45vw] md:min-w-[calc(33.333%-16px)] lg:min-w-[calc(25%-18px)] snap-start shrink-0">
            <PropertyCard
              property={{ ...property, location: { ...property.location, city: locationName } }}
              priority={index < 4}
            />
          </div>
        ))}

        {/* See All Card */}
        <div className="min-w-[85vw] sm:min-w-[45vw] md:min-w-[calc(33.333%-16px)] lg:min-w-[calc(25%-18px)] snap-start shrink-0 flex items-center justify-center pl-2">
          <div className="w-full aspect-[20/19] rounded-[14px] border border-black/5 shadow-[0_6px_16px_rgba(0,0,0,0.08)] flex flex-col items-center justify-center cursor-pointer group hover:shadow-[0_6px_20px_rgba(0,0,0,0.12)] transition-all bg-white relative overflow-hidden p-6 mx-2">
            <div className="relative w-40 h-32 mb-6">
              {/* Back Image (Left) */}
              <div className="absolute top-2 left-2 w-20 h-20 rounded-xl overflow-hidden border-2 border-white shadow-lg -rotate-[15deg] z-10 transition-transform group-hover:-translate-x-1">
                <Image src={items[0]?.image || ''} alt="See all" fill className="object-cover" />
              </div>
              {/* Back Image (Right) */}
              <div className="absolute top-2 right-2 w-20 h-20 rounded-xl overflow-hidden border-2 border-white shadow-lg rotate-[15deg] z-10 transition-transform group-hover:translate-x-1">
                <Image src={items[1]?.image || ''} alt="See all" fill className="object-cover" />
              </div>
              {/* Front Image (Center) */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-24 rounded-xl overflow-hidden border-2 border-white shadow-xl rotate-0 z-20 transition-transform group-hover:scale-105">
                <Image src={items[2]?.image || ''} alt="See all" fill className="object-cover" />
              </div>
            </div>
            <span className="text-[17px] font-semibold text-foreground group-hover:underline">See all</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();

  const filteredProperties = selectedCategory
    ? properties.filter((p) => p.category === selectedCategory)
    : properties;

  return (
    <main className="min-h-screen bg-background">
      {/* Navbar */}
      <Navbar />

      {/* Properties Sections */}
      <section className="py-6 md:py-8">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <PropertySection
            title="Popular homes in Varanasi"
            items={properties.slice(0, 6)}
            locationName="Varanasi"
          />
          <PropertySection
            title="Available in Kolkata this weekend"
            items={properties.slice(2, 8)}
            locationName="Kolkata"
          />
          <PropertySection
            title="Stay in Gautam Buddha Nagar"
            items={properties.slice(4, 9)}
            locationName="Gautam Buddha Nagar"
          />
        </div>
      </section>

      {/* Final Detailed Footer */}
      <footer className="bg-[#F7F7F7] border-t border-border pt-12 pb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Inspiration Section */}
          <div className="mb-12">
            <h2 className="text-[22px] font-semibold text-foreground mb-4">Inspiration for future getaways</h2>
            <div className="flex gap-6 border-b border-black/10 overflow-x-auto hide-scrollbar mb-8">
              {['Popular', 'Arts & culture', 'Beach', 'Mountains', 'Outdoors', 'Things to do'].map((tab, i) => (
                <button key={tab} className={`pb-4 text-sm font-medium transition-colors whitespace-nowrap ${i === 0 ? 'border-b-2 border-foreground text-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
                  {tab}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-6 gap-x-4">
              {[
                { name: 'Canmore', sub: 'Apartment rentals' },
                { name: 'Benalmádena', sub: 'Apartment rentals' },
                { name: 'Marbella', sub: 'Apartment rentals' },
                { name: 'Mijas', sub: 'House rentals' },
                { name: 'Prescott', sub: 'Pet-friendly rentals' },
                { name: 'Scottsdale', sub: 'Apartment rentals' },
                { name: 'Tucson', sub: 'Pet-friendly rentals' },
                { name: 'Jasper', sub: 'Cabin rentals' },
                { name: 'Mountain View', sub: 'Family-friendly rentals' },
                { name: 'Devonport', sub: 'Cottage rentals' },
                { name: 'Mallacoota', sub: 'Pet-friendly rentals' },
                { name: 'Ibiza', sub: 'Holiday rentals' },
              ].map((loc) => (
                <div key={loc.name} className="cursor-pointer group">
                  <div className="text-sm font-medium text-foreground group-hover:text-muted-foreground">{loc.name}</div>
                  <div className="text-sm text-muted-foreground">{loc.sub}</div>
                </div>
              ))}
              <div className="flex items-center gap-1 text-sm font-semibold text-foreground cursor-pointer hover:underline">
                Show more <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
              </div>
            </div>
          </div>

          <hr className="border-black/5 mb-12" />

          {/* Links Grid */}
          <div className="grid gap-8 grid-cols-1 md:grid-cols-3 mb-12">
            <div>
              <h3 className="font-semibold text-sm text-foreground mb-4">Support</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><a href="#" className="hover:underline">Help Centre</a></li>
                <li><a href="#" className="hover:underline">AirCover</a></li>
                <li><a href="#" className="hover:underline">Anti-discrimination</a></li>
                <li><a href="#" className="hover:underline">Disability support</a></li>
                <li><a href="#" className="hover:underline">Cancellation options</a></li>
                <li><a href="#" className="hover:underline">Report neighbourhood concern</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-sm text-foreground mb-4">Hosting</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><a href="#" className="hover:underline">Havenly your home</a></li>
                <li><a href="#" className="hover:underline">AirCover for Hosts</a></li>
                <li><a href="#" className="hover:underline">Hosting resources</a></li>
                <li><a href="#" className="hover:underline">Community forum</a></li>
                <li><a href="#" className="hover:underline">Hosting responsibly</a></li>
                <li><a href="#" className="hover:underline">Join a free hosting class</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-sm text-foreground mb-4">Havenly</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><a href="#" className="hover:underline">Newsroom</a></li>
                <li><a href="#" className="hover:underline">New features</a></li>
                <li><a href="#" className="hover:underline">Careers</a></li>
                <li><a href="#" className="hover:underline">Investors</a></li>
                <li><a href="#" className="hover:underline">Havenly.org emergency stays</a></li>
              </ul>
            </div>
          </div>

          <hr className="border-black/5 mb-6" />

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-foreground">
              <span>© 2026 Havenly, Inc.</span>
              <span>·</span>
              <a href="#" className="hover:underline">Privacy</a>
              <span>·</span>
              <a href="#" className="hover:underline">Terms</a>
              <span>·</span>
              <a href="#" className="hover:underline">Sitemap</a>
              <span>·</span>
              <a href="#" className="hover:underline">Company details</a>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4 text-sm font-semibold text-foreground cursor-pointer">
                <span className="flex items-center gap-2 hover:underline">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /><path d="M2 12h20" /></svg>
                  English (IN)
                </span>
                <span className="hover:underline">₹ INR</span>
              </div>
              <div className="flex items-center gap-3">
                {/* Social Icons Placeholder */}
                <a href="#" className="text-foreground hover:opacity-80 transition"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg></a>
                <a href="#" className="text-foreground hover:opacity-80 transition"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" /></svg></a>
                <a href="#" className="text-foreground hover:opacity-80 transition"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.981 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg></a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
