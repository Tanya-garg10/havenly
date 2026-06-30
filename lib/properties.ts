import { properties as defaultProperties, Property } from './dummy-data';

const STORAGE_KEY = 'havenly-properties';

export function getStoredProperties(): Property[] {
  if (typeof window === 'undefined') {
    return defaultProperties;
  }
  
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultProperties));
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
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(properties));
  return properties;
}

export function deleteStoredProperty(id: string): Property[] {
  const properties = getStoredProperties();
  const filtered = properties.filter((p) => p.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  return filtered;
}
