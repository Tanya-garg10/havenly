'use client';

import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';
import { Search, Menu, X, LogOut, LayoutDashboard, Home, Heart } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, Suspense } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function Navbar() {
  return (
    <Suspense fallback={
      <nav className="sticky top-0 z-40 border-b border-border bg-background pb-6 pt-5">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2 text-primary">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor">
                <path d="M16 1.333c-8.095 0-14.667 6.572-14.667 14.667 0 8.096 6.572 14.667 14.667 14.667s14.667-6.571 14.667-14.667c0-8.095-6.572-14.667-14.667-14.667zm0 2.667c6.636 0 12 5.364 12 12s-5.364 12-12 12-12-5.364-12-12 5.364-12 12-12zM12 9v14h2.667v-6.667h2.666v6.667h2.667V9h-2.667v4.667h-2.666V9H12z"/>
              </svg>
              <span className="hidden text-xl font-bold tracking-tight sm:inline">
                havenly
              </span>
            </div>
            {/* Center Tabs placeholder */}
            <div className="h-8 w-48 bg-muted animate-pulse rounded" />
            {/* Right menu placeholder */}
            <div className="h-8 w-24 bg-muted animate-pulse rounded-full" />
          </div>
        </div>
      </nav>
    }>
      <NavbarContent />
    </Suspense>
  );
}

function NavbarContent() {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchCity, setSearchCity] = useState(searchParams.get('city') || '');
  const [searchCheckIn, setSearchCheckIn] = useState(searchParams.get('checkIn') || '');
  const [searchCheckOut, setSearchCheckOut] = useState(searchParams.get('checkOut') || '');
  const [searchGuests, setSearchGuests] = useState(searchParams.get('guests') || '');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchCity) params.set('city', searchCity);
    if (searchCheckIn) params.set('checkIn', searchCheckIn);
    if (searchCheckOut) params.set('checkOut', searchCheckOut);
    if (searchGuests) params.set('guests', searchGuests);

    router.push(`/?${params.toString()}`);
  };

  const handleMobileSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchCity) params.set('city', searchCity);
    if (searchCheckIn) params.set('checkIn', searchCheckIn);
    if (searchCheckOut) params.set('checkOut', searchCheckOut);
    if (searchGuests) params.set('guests', searchGuests);

    router.push(`/?${params.toString()}`);
  };

  return (
    <nav className="sticky top-0 z-40 border-b border-border bg-background pb-6 pt-5">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-primary">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor">
              <path d="M16 1.333c-8.095 0-14.667 6.572-14.667 14.667 0 8.096 6.572 14.667 14.667 14.667s14.667-6.571 14.667-14.667c0-8.095-6.572-14.667-14.667-14.667zm0 2.667c6.636 0 12 5.364 12 12s-5.364 12-12 12-12-5.364-12-12 5.364-12 12-12zM12 9v14h2.667v-6.667h2.666v6.667h2.667V9h-2.667v4.667h-2.666V9H12z"/>
            </svg>
            <span className="hidden text-xl font-bold tracking-tight sm:inline">
              havenly
            </span>
          </Link>

          {/* Center Tabs - Hidden on mobile */}
          <div className="hidden md:flex flex-1 justify-center px-6 gap-8 text-[16px] items-center">
            <Link
              href="/"
              className={`relative flex flex-col items-center ${
                pathname === "/"
                  ? "font-semibold text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Homes
              {pathname === "/" && (
                <span className="absolute -bottom-2 w-4 border-b-2 border-foreground rounded-full"></span>
              )}
            </Link>

            <Link
              href="/experiences"
              className={`relative flex flex-col items-center ${
                pathname === "/experiences"
                  ? "font-semibold text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Experiences
              {pathname === "/experiences" && (
                <span className="absolute -bottom-2 w-4 border-b-2 border-foreground rounded-full"></span>
              )}
            </Link>

            <Link
              href="/services"
              className={`relative flex flex-col items-center ${
                pathname === "/services"
                  ? "font-semibold text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Services
              {pathname === "/services" && (
                <span className="absolute -bottom-2 w-4 border-b-2 border-foreground rounded-full"></span>
              )}
            </Link>

            <Link
              href="/favorites"
              className={`relative flex flex-col items-center ${
                pathname === "/favorites"
                  ? "font-semibold text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Favorites
              {pathname === "/favorites" && (
                <span className="absolute -bottom-2 w-4 border-b-2 border-foreground rounded-full"></span>
              )}
            </Link>
          </div>

          {/* Desktop Right Menu */}
          <div className="hidden items-center gap-2 md:flex">
            <Link href="/host">
              <Button variant="ghost" className="text-sm font-medium text-foreground rounded-full">
                Become a host
              </Button>
            </Link>
            
            <ThemeToggle />
            <Button variant="ghost" size="icon" className="rounded-full text-foreground hover:bg-muted">
              {/* Globe Icon simplified as SVG outline */}
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><path d="M2 12h20"/></svg>
            </Button>

            {/* User Menu Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-3 rounded-full border border-border px-3 py-2 hover:shadow-md transition-shadow bg-background ml-2"
              >
                <Menu size={18} className="text-foreground shrink-0" />
                <div className="h-8 w-8 shrink-0 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                  <Image
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=John"
                    alt="User"
                    width={32}
                    height={32}
                  />
                </div>
              </button>

              {/* Dropdown Menu */}
              {isUserMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 rounded-lg border border-border bg-background shadow-lg">
                  <Link href="/dashboard" className="block">
                    <button className="w-full px-4 py-2 text-left text-sm font-medium text-foreground hover:bg-muted flex items-center gap-2">
                      <LayoutDashboard size={16} />
                      My Bookings
                    </button>
                  </Link>
                  <Link href="/host" className="block">
                    <button className="w-full px-4 py-2 text-left text-sm font-medium text-foreground hover:bg-muted flex items-center gap-2">
                      <Home size={16} />
                      Host Dashboard
                    </button>
                  </Link>
                  <hr className="my-2 border-border" />
                  <button className="w-full px-4 py-2 text-left text-sm font-medium text-red-600 hover:bg-muted flex items-center gap-2">
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-muted rounded-lg transition"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X size={24} className="text-foreground" />
            ) : (
              <Menu size={24} className="text-foreground" />
            )}
          </button>
        </div>

        {/* Expanded Search Bar - Desktop */}
        <form onSubmit={handleSearchSubmit} className="hidden md:flex justify-center mt-6 mb-2">
          <div className="flex w-full max-w-[850px] items-center rounded-full border border-border bg-background shadow-md">
            {/* Where */}
            <div className="flex-[1.5] px-8 py-3 hover:bg-muted rounded-full cursor-pointer transition flex flex-col justify-center">
              <label htmlFor="search-where" className="text-[12px] font-bold text-foreground tracking-wide block">Where</label>
              <input
                id="search-where"
                type="text"
                placeholder="Search destinations"
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
                className="w-full bg-transparent text-[14px] text-foreground border-0 p-0 focus:outline-none focus:ring-0 placeholder:text-muted-foreground"
              />
            </div>
            <div className="h-8 w-[1px] bg-border shrink-0"></div>
            
            {/* Check in */}
            <div className="flex-1 px-6 py-3 hover:bg-muted rounded-full cursor-pointer transition flex flex-col justify-center">
              <label htmlFor="search-check-in" className="text-[12px] font-bold text-foreground tracking-wide block">Check in</label>
              <input
                id="search-check-in"
                type="date"
                min={new Date().toISOString().split('T')[0]}
                value={searchCheckIn}
                onChange={(e) => {
                  setSearchCheckIn(e.target.value);
                  if (searchCheckOut && searchCheckOut <= e.target.value) {
                    setSearchCheckOut('');
                  }
                }}
                className="w-full bg-transparent text-[14px] text-foreground border-0 p-0 focus:outline-none focus:ring-0 placeholder:text-muted-foreground [color-scheme:light] dark:[color-scheme:dark]"
              />
            </div>
            <div className="h-8 w-[1px] bg-border shrink-0"></div>
            
            {/* Check out */}
            <div className="flex-1 px-6 py-3 hover:bg-muted rounded-full cursor-pointer transition flex flex-col justify-center">
              <label htmlFor="search-check-out" className="text-[12px] font-bold text-foreground tracking-wide block">Check out</label>
              <input
                id="search-check-out"
                type="date"
                min={searchCheckIn || new Date().toISOString().split('T')[0]}
                value={searchCheckOut}
                onChange={(e) => setSearchCheckOut(e.target.value)}
                className="w-full bg-transparent text-[14px] text-foreground border-0 p-0 focus:outline-none focus:ring-0 placeholder:text-muted-foreground [color-scheme:light] dark:[color-scheme:dark]"
              />
            </div>
            <div className="h-8 w-[1px] bg-border shrink-0"></div>
            
            {/* Who */}
            <div className="flex-1 pl-8 pr-2 py-2 hover:bg-muted rounded-full cursor-pointer transition flex items-center justify-between">
              <div className="flex-1 min-w-0 mr-2">
                <label htmlFor="search-guests" className="text-[12px] font-bold text-foreground tracking-wide block">Who</label>
                <input
                  id="search-guests"
                  type="number"
                  min="1"
                  placeholder="Add guests"
                  value={searchGuests}
                  onChange={(e) => setSearchGuests(e.target.value)}
                  className="w-full bg-transparent text-[14px] text-foreground border-0 p-0 focus:outline-none focus:ring-0 placeholder:text-muted-foreground"
                />
              </div>
              <button
                type="submit"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white hover:bg-primary/90 shadow-md shrink-0 transition"
                aria-label="Search"
              >
                <Search size={20} className="stroke-[3]" />
              </button>
            </div>
          </div>
        </form>

        {/* Mobile Search Bar */}
        <div className="md:hidden mb-4">
          <form onSubmit={handleMobileSearchSubmit} className="flex flex-col gap-2 rounded-full border border-border bg-muted px-4 py-2">
            <div className="flex items-center gap-2">
              <Search size={18} className="text-muted-foreground shrink-0" />
              <Input
                type="text"
                placeholder="Search by destination..."
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
                className="border-0 bg-transparent placeholder:text-muted-foreground focus:outline-none focus-visible:ring-0 p-0 h-auto text-foreground flex-1"
              />
              <button
                type="button"
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="text-xs font-semibold text-primary px-2 py-1 hover:bg-foreground/10 rounded transition shrink-0 animate-in fade-in"
              >
                {showMobileFilters ? 'Less' : 'More'}
              </button>
            </div>

            {showMobileFilters && (
              <div className="mt-3 p-4 rounded-xl border border-border bg-background space-y-3 shadow-sm animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-muted-foreground uppercase">Check in</label>
                    <input
                      type="date"
                      min={new Date().toISOString().split('T')[0]}
                      value={searchCheckIn}
                      onChange={(e) => {
                        setSearchCheckIn(e.target.value);
                        if (searchCheckOut && searchCheckOut <= e.target.value) {
                          setSearchCheckOut('');
                        }
                      }}
                      className="w-full mt-1 bg-muted px-3 py-2 rounded-lg text-sm text-foreground focus:outline-none [color-scheme:light] dark:[color-scheme:dark]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-muted-foreground uppercase">Check out</label>
                    <input
                      type="date"
                      min={searchCheckIn || new Date().toISOString().split('T')[0]}
                      value={searchCheckOut}
                      onChange={(e) => setSearchCheckOut(e.target.value)}
                      className="w-full mt-1 bg-muted px-3 py-2 rounded-lg text-sm text-foreground focus:outline-none [color-scheme:light] dark:[color-scheme:dark]"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-muted-foreground uppercase">Guests</label>
                  <input
                    type="number"
                    min="1"
                    placeholder="Number of guests"
                    value={searchGuests}
                    onChange={(e) => setSearchGuests(e.target.value)}
                    className="w-full mt-1 bg-muted px-3 py-2 rounded-lg text-sm text-foreground focus:outline-none"
                  />
                </div>

                <Button type="submit" className="w-full text-xs font-bold py-2 mt-1">
                  Apply Search Filters
                </Button>
              </div>
            )}
          </form>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="border-t border-border py-4 md:hidden">
            <div className="flex items-center justify-between px-4 py-2 mb-2">
               <span className="text-foreground font-medium">Theme</span>
               <ThemeToggle />
            </div>

            <Link href="/dashboard" className="block">
              <button className="w-full px-4 py-2 text-left font-medium text-foreground hover:bg-muted rounded-lg flex items-center gap-2 mb-2">
                <LayoutDashboard size={18} />
                My Bookings
              </button>
            </Link>
            <Link href="/host" className="block">
              <button className="w-full px-4 py-2 text-left font-medium text-foreground hover:bg-muted rounded-lg flex items-center gap-2 mb-2">
                <Home size={18} />
                Host Dashboard
              </button>
            </Link>
            <Link href="/favorites" className="block">
              <Button className="w-full px-0 py-2 text-left font-medium text-foreground hover:bg-muted bg-transparent rounded-lg flex items-center gap-2 mb-2">
                <Heart size={12} className="ml-4" /> Favorites
              </Button>
            </Link>

            <Link href="/host">
              <Button variant="ghost" size="sm" className="w-full text-foreground justify-start">
                Become a host
              </Button>
            </Link>

            <hr className="my-2 border-border" />
            <button className="w-full px-4 py-2 text-left font-medium text-red-600 hover:bg-muted rounded-lg flex items-center gap-2">
              <LogOut size={18} />
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
