// Dummy data for Havenly Rental Marketplace

export const categories = [
  { id: 'beachfront', name: 'Beachfront', icon: 'Palmtree' },
  { id: 'mountains', name: 'Mountains', icon: 'Mountain' },
  { id: 'city', name: 'City', icon: 'Building2' },
  { id: 'countryside', name: 'Countryside', icon: 'Trees' },
  { id: 'luxury', name: 'Luxury', icon: 'Crown' },
  { id: 'cozy', name: 'Cozy', icon: 'Home' },
  { id: 'unique', name: 'Unique', icon: 'Sparkles' },
  { id: 'pool', name: 'Pool', icon: 'Waves' },
];

export const amenities = [
  { id: 'wifi', name: 'WiFi', icon: 'Wifi' },
  { id: 'kitchen', name: 'Kitchen', icon: 'UtensilsCrossed' },
  { id: 'ac', name: 'Air Conditioning', icon: 'Wind' },
  { id: 'pool', name: 'Pool', icon: 'Waves' },
  { id: 'parking', name: 'Parking', icon: 'ParkingCircle' },
  { id: 'washer', name: 'Washer', icon: 'Droplet' },
  { id: 'dryer', name: 'Dryer', icon: 'Wind' },
  { id: 'heating', name: 'Heating', icon: 'Flame' },
  { id: 'tv', name: 'TV', icon: 'Tv' },
  { id: 'workspace', name: 'Workspace', icon: 'Laptop' },
  { id: 'pets', name: 'Pets Allowed', icon: 'PawPrint' },
  { id: 'garden', name: 'Garden', icon: 'Flower' },
];

export interface Property {
  id: string;
  title: string;
  description: string;
  image: string;
  images: string[];
  location: {
    city: string;
    state: string;
    country: string;
    coordinates: { lat: number; lng: number };
  };
  pricePerNight: number;
  rating: number;
  reviewCount: number;
  category: string;
  type: 'Entire Place' | 'Room' | 'Shared Room';
  capacity: {
    guests: number;
    bedrooms: number;
    beds: number;
    bathrooms: number;
  };
  amenities: string[];
  hostId: string;
  createdAt: Date;
  bookings?: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  isHost: boolean;
  joinedDate: Date;
  bio?: string;
  responseRate?: number;
  responseTime?: string;
}

export interface Booking {
  id: string;
  propertyId: string;
  guestId: string;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  totalPrice: number;
  status: 'confirmed' | 'cancelled' | 'completed' | 'upcoming' ;
  createdAt: Date;
}

export interface Review {
  id: string;
  propertyId: string;
  guestId: string;
  guestName: string;
  guestAvatar: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

// Host users
export const hosts: User[] = [
  {
    id: 'host-1',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    isHost: true,
    joinedDate: new Date('2020-01-15'),
    bio: 'Passionate about hosting and making guests feel at home.',
    responseRate: 98,
    responseTime: '1 hour',
  },
  {
    id: 'host-2',
    name: 'Michael Chen',
    email: 'michael@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
    isHost: true,
    joinedDate: new Date('2019-06-20'),
    bio: 'Luxury property specialist.',
    responseRate: 100,
    responseTime: '30 minutes',
  },
  {
    id: 'host-3',
    name: 'Emma Williams',
    email: 'emma@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
    isHost: true,
    joinedDate: new Date('2021-03-10'),
    bio: 'Love sharing my beachfront properties.',
    responseRate: 95,
    responseTime: '2 hours',
  },
];

// Guest user
export const currentUser: User = {
  id: 'guest-1',
  name: 'John Smith',
  email: 'john@example.com',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
  isHost: false,
  joinedDate: new Date('2022-05-01'),
};

// Properties
export const properties: Property[] = [
  {
    id: 'prop-1',
    title: 'Stunning Beachfront Villa',
    description: 'Beautiful modern villa with ocean views, private beach access, and luxurious amenities.',
    image: '/assets/unsplash/unsplash-9a746e442094.jpg',
    images: [
      '/assets/unsplash/unsplash-3733e1fdea5f.jpg',
      '/assets/unsplash/unsplash-0154d77aca56.jpg',
      '/assets/unsplash/unsplash-abf99d803957.jpg',
      '/assets/unsplash/unsplash-3be302818605.jpg',
    ],
    location: {
      city: 'Malibu',
      state: 'California',
      country: 'United States',
      coordinates: { lat: 34.0195, lng: -118.6814 },
    },
    pricePerNight: 450,
    rating: 4.9,
    reviewCount: 186,
    category: 'beachfront',
    type: 'Entire Place',
    capacity: {
      guests: 8,
      bedrooms: 4,
      beds: 5,
      bathrooms: 3,
    },
    amenities: ['wifi', 'kitchen', 'ac', 'pool', 'parking', 'washer', 'dryer', 'heating', 'tv', 'garden'],
    hostId: 'host-1',
    createdAt: new Date('2020-01-15'),
  },
  {
    id: 'prop-2',
    title: 'Cozy Mountain Cabin',
    description: 'Perfect retreat in the mountains with fireplace, hot tub, and hiking trails nearby.',
    image: '/assets/unsplash/unsplash-22a99cc06f00.jpg',
    images: [
      '/assets/unsplash/unsplash-88130b56482c.jpg',
      '/assets/unsplash/unsplash-b3b8ebb833de.jpg',
      'https://images.unsplash.com/photo-1510312305653-8ed496efbe75?w=1200&h=800&fit=crop',
    ],
    location: {
      city: 'Aspen',
      state: 'Colorado',
      country: 'United States',
      coordinates: { lat: 39.1911, lng: -106.8175 },
    },
    pricePerNight: 280,
    rating: 4.8,
    reviewCount: 142,
    category: 'mountains',
    type: 'Entire Place',
    capacity: {
      guests: 6,
      bedrooms: 3,
      beds: 4,
      bathrooms: 2,
    },
    amenities: ['wifi', 'kitchen', 'heating', 'tv', 'workspace'],
    hostId: 'host-2',
    createdAt: new Date('2019-06-20'),
  },
  {
    id: 'prop-3',
    title: 'Luxury Downtown Penthouse',
    description: 'Stunning city views, modern design, rooftop access, and concierge service included.',
    image: '/assets/unsplash/unsplash-8f8cfb79e558.jpg',
    images: [
      '/assets/unsplash/unsplash-a59418ad7350.jpg',
      '/assets/unsplash/unsplash-b08a8d4e4ed3.jpg',
      'https://images.unsplash.com/photo-1600566752355-3979ff696fe9?w=1200&h=800&fit=crop',
    ],
    location: {
      city: 'New York',
      state: 'New York',
      country: 'United States',
      coordinates: { lat: 40.7128, lng: -74.006 },
    },
    pricePerNight: 550,
    rating: 4.95,
    reviewCount: 234,
    category: 'luxury',
    type: 'Entire Place',
    capacity: {
      guests: 6,
      bedrooms: 3,
      beds: 3,
      bathrooms: 2.5,
    },
    amenities: ['wifi', 'kitchen', 'ac', 'pool', 'parking', 'washer', 'dryer', 'tv', 'workspace'],
    hostId: 'host-2',
    createdAt: new Date('2019-06-20'),
  },
  {
    id: 'prop-4',
    title: 'Charming Countryside Cottage',
    description: 'Rural escape with garden, farm animals, and peaceful surroundings. Perfect for families.',
    image: '/assets/unsplash/unsplash-57bf784fe60c.jpg',
    images: [
      '/assets/unsplash/unsplash-41e78ebeb8d4.jpg',
      '/assets/unsplash/unsplash-b3b8ebb833de.jpg',
      'https://images.unsplash.com/photo-1500382017468-9049fee74a62?w=1200&h=800&fit=crop',
    ],
    location: {
      city: 'Tuscany',
      state: 'Tuscany',
      country: 'Italy',
      coordinates: { lat: 43.2, lng: 11.88 },
    },
    pricePerNight: 150,
    rating: 4.7,
    reviewCount: 98,
    category: 'countryside',
    type: 'Entire Place',
    capacity: {
      guests: 4,
      bedrooms: 2,
      beds: 2,
      bathrooms: 1,
    },
    amenities: ['wifi', 'kitchen', 'heating', 'garden', 'pets'],
    hostId: 'host-3',
    createdAt: new Date('2021-03-10'),
  },
  {
    id: 'prop-5',
    title: 'Modern City Apartment',
    description: 'Stylish studio in the heart of the city. Close to restaurants, shops, and attractions.',
    image: '/assets/unsplash/unsplash-1b5c8132cdee.jpg',
    images: [
      '/assets/unsplash/unsplash-ef43f138069d.jpg',
      '/assets/unsplash/unsplash-ecf59ba37e23.jpg',
      '/assets/unsplash/unsplash-68ee7b155c60.jpg',
    ],
    location: {
      city: 'Paris',
      state: 'Île-de-France',
      country: 'France',
      coordinates: { lat: 48.8566, lng: 2.3522 },
    },
    pricePerNight: 120,
    rating: 4.6,
    reviewCount: 67,
    category: 'city',
    type: 'Room',
    capacity: {
      guests: 2,
      bedrooms: 1,
      beds: 1,
      bathrooms: 1,
    },
    amenities: ['wifi', 'kitchen', 'ac', 'tv'],
    hostId: 'host-1',
    createdAt: new Date('2020-01-15'),
  },
  {
    id: 'prop-6',
    title: 'Tropical Paradise Pool House',
    description: 'Gorgeous pool villa in tropical setting with lush gardens and private beach access.',
    image: '/assets/unsplash/unsplash-aea261a66899.jpg',
    images: [
      '/assets/unsplash/unsplash-2f8d4c30cea7.jpg',
      '/assets/unsplash/unsplash-17d4f157431f.jpg',
      '/assets/unsplash/unsplash-e738ea9b00cb.jpg',
    ],
    location: {
      city: 'Bali',
      state: 'Bali',
      country: 'Indonesia',
      coordinates: { lat: -8.6705, lng: 115.2126 },
    },
    pricePerNight: 200,
    rating: 4.85,
    reviewCount: 156,
    category: 'pool',
    type: 'Entire Place',
    capacity: {
      guests: 5,
      bedrooms: 2,
      beds: 3,
      bathrooms: 2,
    },
    amenities: ['wifi', 'kitchen', 'ac', 'pool', 'heating', 'garden', 'pets'],
    hostId: 'host-3',
    createdAt: new Date('2021-03-10'),
  },
  {
    id: 'prop-7',
    title: 'Modern Minimalist Loft',
    description: 'Industrial-style loft with high ceilings and city skyline views.',
    image: '/assets/unsplash/unsplash-870701837dc2.jpg',
    images: [
      '/assets/unsplash/unsplash-ecf59ba37e23.jpg',
      '/assets/unsplash/unsplash-68ee7b155c60.jpg',
    ],
    location: {
      city: 'Berlin',
      state: 'Berlin',
      country: 'Germany',
      coordinates: { lat: 52.52, lng: 13.405 },
    },
    pricePerNight: 110,
    rating: 4.75,
    reviewCount: 42,
    category: 'city',
    type: 'Entire Place',
    capacity: {
      guests: 3,
      bedrooms: 1,
      beds: 2,
      bathrooms: 1,
    },
    amenities: ['wifi', 'kitchen', 'heating', 'tv', 'workspace'],
    hostId: 'host-1',
    createdAt: new Date('2023-01-10'),
  },
  {
    id: 'prop-8',
    title: 'Secluded A-Frame in the Woods',
    description: 'Unique architectural gem surrounded by pine forest and mountain views.',
    image: '/assets/unsplash/unsplash-724846b0171a.jpg',
    images: [
      '/assets/unsplash/unsplash-b3b8ebb833de.jpg',
      'https://images.unsplash.com/photo-1510312305653-8ed496efbe75?w=1200&h=800&fit=crop',
    ],
    location: {
      city: 'Lake Tahoe',
      state: 'California',
      country: 'United States',
      coordinates: { lat: 39.0968, lng: -120.0324 },
    },
    pricePerNight: 220,
    rating: 4.88,
    reviewCount: 75,
    category: 'unique',
    type: 'Entire Place',
    capacity: {
      guests: 4,
      bedrooms: 2,
      beds: 2,
      bathrooms: 1,
    },
    amenities: ['wifi', 'kitchen', 'heating', 'garden', 'pets'],
    hostId: 'host-2',
    createdAt: new Date('2022-11-15'),
  },
  {
    id: 'prop-9',
    title: 'Malibu Beach Condo',
    description: 'Modern oceanfront condo with large balcony, steps from the sand and local dining.',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&h=800&fit=crop',
    images: ['/assets/unsplash/unsplash-3733e1fdea5f.jpg'],
    location: {
      city: 'Malibu',
      state: 'California',
      country: 'United States',
      coordinates: { lat: 34.0220, lng: -118.6750 },
    },
    pricePerNight: 310,
    rating: 4.78,
    reviewCount: 54,
    category: 'beachfront',
    type: 'Entire Place',
    capacity: {
      guests: 4,
      bedrooms: 2,
      beds: 2,
      bathrooms: 2,
    },
    amenities: ['wifi', 'kitchen', 'ac', 'parking', 'tv'],
    hostId: 'host-1',
    createdAt: new Date('2023-03-22'),
  },
  {
    id: 'prop-10',
    title: 'Malibu Coastal Retreat',
    description: 'Charming seaside cottage with beautiful garden, outdoor grill, and stunning ocean views.',
    image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=1200&h=800&fit=crop',
    images: ['/assets/unsplash/unsplash-0154d77aca56.jpg'],
    location: {
      city: 'Malibu',
      state: 'California',
      country: 'United States',
      coordinates: { lat: 34.0150, lng: -118.6900 },
    },
    pricePerNight: 290,
    rating: 4.85,
    reviewCount: 92,
    category: 'cozy',
    type: 'Entire Place',
    capacity: {
      guests: 5,
      bedrooms: 3,
      beds: 3,
      bathrooms: 1.5,
    },
    amenities: ['wifi', 'kitchen', 'parking', 'washer', 'dryer', 'garden', 'pets'],
    hostId: 'host-3',
    createdAt: new Date('2023-05-14'),
  },
  {
    id: 'prop-11',
    title: 'Cozy Marais Apartment',
    description: 'Charming loft in the historic Marais district. High ceilings, exposed beams, and modern amenities.',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&h=800&fit=crop',
    images: ['/assets/unsplash/unsplash-ef43f138069d.jpg'],
    location: {
      city: 'Paris',
      state: 'Île-de-France',
      country: 'France',
      coordinates: { lat: 48.8580, lng: 2.3600 },
    },
    pricePerNight: 135,
    rating: 4.82,
    reviewCount: 118,
    category: 'city',
    type: 'Entire Place',
    capacity: {
      guests: 3,
      bedrooms: 1,
      beds: 2,
      bathrooms: 1,
    },
    amenities: ['wifi', 'kitchen', 'heating', 'tv', 'workspace'],
    hostId: 'host-1',
    createdAt: new Date('2022-08-10'),
  },
  {
    id: 'prop-12',
    title: 'Montmartre Artist Studio',
    description: 'Bright and artistic studio near Sacré-Cœur with panoramic views of the city.',
    image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200&h=800&fit=crop',
    images: ['/assets/unsplash/unsplash-ecf59ba37e23.jpg'],
    location: {
      city: 'Paris',
      state: 'Île-de-France',
      country: 'France',
      coordinates: { lat: 48.8860, lng: 2.3350 },
    },
    pricePerNight: 95,
    rating: 4.69,
    reviewCount: 47,
    category: 'unique',
    type: 'Room',
    capacity: {
      guests: 2,
      bedrooms: 1,
      beds: 1,
      bathrooms: 1,
    },
    amenities: ['wifi', 'kitchen', 'heating', 'tv'],
    hostId: 'host-2',
    createdAt: new Date('2023-02-18'),
  },
];


// Bookings
export const bookings: Booking[] = [
  {
    id: 'booking-1',
    propertyId: 'prop-1',
    guestId: 'guest-1',
    checkIn: new Date('2025-06-15'),
    checkOut: new Date('2025-06-22'),
    guests: 4,
    totalPrice: 3150,
    status: 'confirmed',
    createdAt: new Date('2025-05-01'),
  },
  {
    id: 'booking-2',
    propertyId: 'prop-2',
    guestId: 'guest-1',
    checkIn: new Date('2025-07-01'),
    checkOut: new Date('2025-07-08'),
    guests: 2,
    totalPrice: 1960,
    status: 'upcoming',
    createdAt: new Date('2025-05-15'),
  },
  {
    id: 'booking-3',
    propertyId: 'prop-3',
    guestId: 'guest-1',
    checkIn: new Date('2024-12-20'),
    checkOut: new Date('2024-12-23'),
    guests: 2,
    totalPrice: 1650,
    status: 'completed',
    createdAt: new Date('2024-11-01'),
  },
  {
    id: 'booking-4',
    propertyId: 'prop-5',
    guestId: 'guest-1',
    checkIn: new Date('2025-03-10'),
    checkOut: new Date('2025-03-15'),
    guests: 1,
    totalPrice: 600,
    status: 'completed',
    createdAt: new Date('2025-02-01'),
  },

  {
    id: "booking-5",
    propertyId: "prop-5",
    guestId: "guest-1",
    checkIn: new Date("2025-08-10"),
    checkOut: new Date("2025-08-14"),
    guests: 2,
    totalPrice: 480,
    status: "upcoming",
    createdAt: new Date(),
  }
];

// Reviews
export const reviews: Review[] = [
  {
    id: 'review-1',
    propertyId: 'prop-1',
    guestId: 'guest-2',
    guestName: 'Alice Cooper',
    guestAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice',
    rating: 5,
    comment: 'Amazing property! The views are incredible and the host was very welcoming. Would definitely return.',
    createdAt: new Date('2025-04-10'),
  },
  {
    id: 'review-2',
    propertyId: 'prop-1',
    guestId: 'guest-3',
    guestName: 'Bob Wilson',
    guestAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob',
    rating: 4,
    comment: 'Great beachfront location. The property was clean and well-maintained. Minor issue with WiFi but quickly resolved.',
    createdAt: new Date('2025-04-05'),
  },
  {
    id: 'review-3',
    propertyId: 'prop-2',
    guestId: 'guest-4',
    guestName: 'Carol Davis',
    guestAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carol',
    rating: 5,
    comment: 'Perfect mountain retreat! Peaceful, beautiful, and the hot tub was a nice touch. Highly recommend!',
    createdAt: new Date('2025-04-01'),
  },
  {
    id: 'review-4',
    propertyId: 'prop-3',
    guestId: 'guest-5',
    guestName: 'David Miller',
    guestAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
    rating: 5,
    comment: 'Luxury at its finest! The penthouse is absolutely stunning with amazing city views. Will definitely book again.',
    createdAt: new Date('2025-03-25'),
  },
];
