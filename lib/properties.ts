import { properties as defaultProperties, Property } from './dummy-data';

const STORAGE_KEY = 'havenly-properties';

export function getStoredProperties(): Property[] {
  if (typeof window === 'undefined') {
    return defaultProperties;
  }
  
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    // Seed localStorage with default properties on first run.
    // Use a try/catch in case localStorage is unavailable (e.g. private browsing).
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultProperties));
    } catch {
      // localStorage unavailable — silently fall back to in-memory defaults.
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

export function saveStoredProperty(property: Property): Property[] {
  const properties = getStoredProperties();
  const index = properties.findIndex((p) => p.id === property.id);
  
  if (index >= 0) {
    properties[index] = property;
  } else {
    properties.push(property);
  }
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(properties));
  } catch (err: unknown) {
    // Detect QuotaExceededError (standard DOMException name across browsers)
    const isQuotaError =
      err instanceof DOMException &&
      (err.name === 'QuotaExceededError' || err.name === 'NS_ERROR_DOM_QUOTA_REACHED');

    if (isQuotaError) {
      // Surface a clear, user-friendly message instead of failing silently
      alert(
        'Could not save your listing — browser storage is full.\n\n' +
          'Tips:\n' +
          '• Reduce the number or size of uploaded images (max 10 images, 2 MB each).\n' +
          '• Remove some saved drafts from your dashboard.\n' +
          '• Try a different browser or clear site data.'
      );
    } else {
      console.error('Failed to save property to localStorage:', err);
    }
  }

  return properties;
}

export function deleteStoredProperty(id: string): Property[] {
  const properties = getStoredProperties();
  const filtered = properties.filter((p) => p.id !== id);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (err) {
    console.error('Failed to delete property from localStorage:', err);
  }
  return filtered;
}
