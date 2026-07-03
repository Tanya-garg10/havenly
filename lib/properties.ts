import { properties as defaultProperties, Property } from './dummy-data';

const STORAGE_KEY = 'havenly-properties';

// Dynamic Storage Adapter Pattern
// Allows seamless switching between LocalStorage (offline/demo) and a Shared Backend (Supabase/REST API).
// Synchronous calls return cached/localStorage data instantly to avoid blocking UI render,
// while background fetch keeps the client synchronized with the shared backend.

export interface StorageAdapter {
  name: string;
  getProperties(): Property[];
  saveProperty(property: Property): void;
  deleteProperty(id: string): void;
  syncBackground?(onSync: (properties: Property[]) => void): void;
}

class LocalStorageAdapter implements StorageAdapter {
  name = 'LocalStorage';

  getProperties(): Property[] {
    if (typeof window === 'undefined') {
      return defaultProperties;
    }
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultProperties));
      } catch {
        // storage disabled or full
      }
      return defaultProperties;
    }
    try {
      const parsed = JSON.parse(stored) as any[];
      return parsed.map((p) => ({
        ...p,
        createdAt: new Date(p.createdAt),
      }));
    } catch (e) {
      console.error('Failed to parse stored properties:', e);
      return defaultProperties;
    }
  }

  saveProperty(property: Property): void {
    const properties = this.getProperties();
    const index = properties.findIndex((p) => p.id === property.id);
    if (index >= 0) {
      properties[index] = property;
    } else {
      properties.push(property);
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(properties));
    } catch (err: unknown) {
      const isQuotaError =
        err instanceof DOMException &&
        (err.name === 'QuotaExceededError' || err.name === 'NS_ERROR_DOM_QUOTA_REACHED');
      if (isQuotaError) {
        alert(
          'Could not save listing locally — browser storage is full.\n\n' +
            'Tips:\n' +
            '• Reduce uploaded image size (max 2 MB each).\n' +
            '• Remove old listings from dashboard.'
        );
      }
    }
  }

  deleteProperty(id: string): void {
    const properties = this.getProperties();
    const filtered = properties.filter((p) => p.id !== id);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    } catch (err) {
      console.error('Failed to delete property:', err);
    }
  }
}

// REST/Supabase Fetch Adapter
// Uses environment variables to connect to a shared backend.
class SharedBackendAdapter implements StorageAdapter {
  name = 'SharedBackend';
  private localAdapter = new LocalStorageAdapter();
  private backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || '';
  private supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  private supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

  getProperties(): Property[] {
    // Return local cache immediately for instantaneous UI updates (Stale-While-Revalidate)
    return this.localAdapter.getProperties();
  }

  async syncBackground(onSync: (properties: Property[]) => void): Promise<void> {
    try {
      let fetched: Property[] = [];
      if (this.supabaseUrl && this.supabaseKey) {
        // Supabase REST API calls don't require heavy dependencies like @supabase/supabase-js.
        // We use native fetch to match the exact Supabase REST interface.
        const res = await fetch(`${this.supabaseUrl}/rest/v1/properties?select=*`, {
          headers: {
            apikey: this.supabaseKey,
            Authorization: `Bearer ${this.supabaseKey}`,
          },
        });
        if (res.ok) {
          fetched = await res.json();
        }
      } else if (this.backendUrl) {
        // Generic REST API endpoint
        const res = await fetch(`${this.backendUrl}/api/properties`);
        if (res.ok) {
          fetched = await res.json();
        }
      }

      if (fetched.length > 0) {
        const parsed = fetched.map((p: any) => ({
          ...p,
          createdAt: new Date(p.createdAt),
        }));
        // Update local cache
        localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
        onSync(parsed);
      }
    } catch (err) {
      console.warn('Background sync failed:', err);
    }
  }

  async saveProperty(property: Property): Promise<void> {
    // 1. Save locally first for instant feedback
    this.localAdapter.saveProperty(property);

    // 2. Persist to backend asynchronously in the background
    try {
      if (this.supabaseUrl && this.supabaseKey) {
        await fetch(`${this.supabaseUrl}/rest/v1/properties`, {
          method: 'POST',
          headers: {
            apikey: this.supabaseKey,
            Authorization: `Bearer ${this.supabaseKey}`,
            'Content-Type': 'application/json',
            Prefer: 'resolution=merge-duplicates', // Upsert logic
          },
          body: JSON.stringify(property),
        });
      } else if (this.backendUrl) {
        await fetch(`${this.backendUrl}/api/properties`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(property),
        });
      }
    } catch (err) {
      console.error('Failed to sync saved property to backend:', err);
    }
  }

  async deleteProperty(id: string): Promise<void> {
    // 1. Delete locally first
    this.localAdapter.deleteProperty(id);

    // 2. Delete from backend asynchronously
    try {
      if (this.supabaseUrl && this.supabaseKey) {
        await fetch(`${this.supabaseUrl}/rest/v1/properties?id=eq.${id}`, {
          method: 'DELETE',
          headers: {
            apikey: this.supabaseKey,
            Authorization: `Bearer ${this.supabaseKey}`,
          },
        });
      } else if (this.backendUrl) {
        await fetch(`${this.backendUrl}/api/properties/${id}`, {
          method: 'DELETE',
        });
      }
    } catch (err) {
      console.error('Failed to sync deletion to backend:', err);
    }
  }
}

// Select adapter based on available environment configuration
const getActiveAdapter = (): StorageAdapter => {
  if (
    typeof window !== 'undefined' &&
    (process.env.NEXT_PUBLIC_BACKEND_URL || process.env.NEXT_PUBLIC_SUPABASE_URL)
  ) {
    return new SharedBackendAdapter();
  }
  return new LocalStorageAdapter();
};

let isSyncing = false;

export function getStoredProperties(): Property[] {
  const adapter = getActiveAdapter();
  const properties = adapter.getProperties();

  // If backend is active and background sync is supported, trigger sync
  if (
    typeof window !== 'undefined' &&
    adapter.syncBackground &&
    !isSyncing
  ) {
    isSyncing = true;
    adapter.syncBackground((syncedProperties) => {
      isSyncing = false;
      // Dispatch a custom event to alert active pages/components that data refreshed in the background
      window.dispatchEvent(
        new CustomEvent('propertiesUpdated', { detail: syncedProperties })
      );
    }).catch(() => {
      isSyncing = false;
    });
  }

  return properties;
}

export function saveStoredProperty(property: Property): Property[] {
  const adapter = getActiveAdapter();
  adapter.saveProperty(property);
  // Return the immediate locally cached properties list
  return new LocalStorageAdapter().getProperties();
}

export function deleteStoredProperty(id: string): Property[] {
  const adapter = getActiveAdapter();
  adapter.deleteProperty(id);
  // Return the immediate locally cached properties list
  return new LocalStorageAdapter().getProperties();
}
