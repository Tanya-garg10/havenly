import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getStoredProperties, saveStoredProperty, deleteStoredProperty } from '../properties';
import { properties as defaultProperties, Property } from '../dummy-data';

// Mock localStorage in global scope for testing in Node.js
class MockLocalStorage {
  private store: Record<string, string> = {};

  getItem(key: string): string | null {
    return this.store[key] || null;
  }

  setItem(key: string, value: string): void {
    this.store[key] = value.toString();
  }

  removeItem(key: string): void {
    delete this.store[key];
  }

  clear(): void {
    this.store = {};
  }
}

const mockLocalStorage = new MockLocalStorage();

describe('properties storage logic', () => {
  beforeEach(() => {
    mockLocalStorage.clear();
    // Stub global window and localStorage
    vi.stubGlobal('window', {});
    vi.stubGlobal('localStorage', mockLocalStorage);
  });

  it('should return default properties if localStorage is empty', () => {
    const properties = getStoredProperties();
    expect(properties.length).toBe(defaultProperties.length);
    expect(properties[0].title).toBe(defaultProperties[0].title);
  });

  it('should save a new property and retrieve it', () => {
    const mockProperty: Property = {
      id: 'test-prop-123',
      title: 'Beautiful Beach House',
      description: 'A cozy house right on the beach.',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
      images: [],
      location: {
        city: 'Malibu',
        state: 'California',
        country: 'United States',
        coordinates: { lat: 34.0259, lng: -118.7798 }
      },
      pricePerNight: 250,
      rating: 4.8,
      reviewCount: 15,
      category: 'beachfront',
      type: 'Entire Place',
      capacity: { guests: 4, bedrooms: 2, beds: 2, bathrooms: 2 },
      amenities: ['wifi', 'ac'],
      hostId: 'host-1',
      createdAt: new Date()
    };

    const updated = saveStoredProperty(mockProperty);
    expect(updated.some((p) => p.id === 'test-prop-123')).toBe(true);

    const retrieved = getStoredProperties();
    const found = retrieved.find((p) => p.id === 'test-prop-123');
    expect(found).toBeDefined();
    expect(found?.title).toBe('Beautiful Beach House');
    expect(found?.pricePerNight).toBe(250);
  });

  it('should delete a property successfully', () => {
    // First save a property
    const mockProperty: Property = {
      id: 'test-prop-delete',
      title: 'Temporary Cabin',
      description: 'To be deleted.',
      image: '',
      images: [],
      location: { city: 'Test', state: 'Test', country: 'Test', coordinates: { lat: 0, lng: 0 } },
      pricePerNight: 100,
      rating: 5,
      reviewCount: 1,
      category: 'cozy',
      type: 'Room',
      capacity: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
      amenities: [],
      hostId: 'host-1',
      createdAt: new Date()
    };

    saveStoredProperty(mockProperty);
    let current = getStoredProperties();
    expect(current.some((p) => p.id === 'test-prop-delete')).toBe(true);

    // Delete it
    const updated = deleteStoredProperty('test-prop-delete');
    expect(updated.some((p) => p.id === 'test-prop-delete')).toBe(false);

    const retrieved = getStoredProperties();
    expect(retrieved.some((p) => p.id === 'test-prop-delete')).toBe(false);
  });
});
